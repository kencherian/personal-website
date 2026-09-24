import React, { useState, useEffect, useCallback } from 'react';
import { soundFX } from '../../utils/sound';

interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isOpen: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const ROWS = 9;
const COLS = 9;
const MINES_COUNT = 10;

export const MinesweeperApp: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [mineCount, setMineCount] = useState(MINES_COUNT);
  const [timer, setTimer] = useState(0);

  const initGame = useCallback(() => {
    // Generate empty board
    const newGrid: Cell[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          row: r,
          col: c,
          isMine: false,
          isOpen: false,
          isFlagged: false,
          neighborMines: 0,
        });
      }
      newGrid.push(row);
    }

    // Place mines randomly
    let placed = 0;
    while (placed < MINES_COUNT) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        placed++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameState('idle');
    setMineCount(MINES_COUNT);
    setTimer(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(t => Math.min(999, t + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const revealCell = (r: number, c: number) => {
    if (gameState === 'won' || gameState === 'lost') return;
    const cell = grid[r][c];
    if (cell.isOpen || cell.isFlagged) return;

    soundFX.playClick();
    if (gameState === 'idle') {
      setGameState('playing');
    }

    if (cell.isMine) {
      // Game over!
      soundFX.playDing();
      setGameState('lost');
      // Reveal all mines
      const revealedGrid = grid.map(row =>
        row.map(cl => (cl.isMine ? { ...cl, isOpen: true } : cl))
      );
      setGrid(revealedGrid);
      return;
    }

    // Flood fill algorithm
    const nextGrid = grid.map(row => row.map(cl => ({ ...cl })));
    const queue: [number, number][] = [[r, c]];
    nextGrid[r][c].isOpen = true;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      if (nextGrid[currR][currC].neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr;
            const nc = currC + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
              const nCell = nextGrid[nr][nc];
              if (!nCell.isOpen && !nCell.isFlagged && !nCell.isMine) {
                nCell.isOpen = true;
                if (nCell.neighborMines === 0) {
                  queue.push([nr, nc]);
                }
              }
            }
          }
        }
      }
    }

    // Check win condition
    let unrevealedSafe = 0;
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (!nextGrid[i][j].isMine && !nextGrid[i][j].isOpen) {
          unrevealedSafe++;
        }
      }
    }

    if (unrevealedSafe === 0) {
      soundFX.playMailSent();
      setGameState('won');
    }

    setGrid(nextGrid);
  };

  const handleRightClick = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameState === 'won' || gameState === 'lost') return;
    const cell = grid[r][c];
    if (cell.isOpen) return;

    soundFX.playClick();
    const nextGrid = grid.map(row => row.map(cl => ({ ...cl })));
    const flagged = !cell.isFlagged;
    nextGrid[r][c].isFlagged = flagged;
    setMineCount(prev => (flagged ? prev - 1 : prev + 1));
    setGrid(nextGrid);
  };

  const getNumberColor = (num: number) => {
    switch (num) {
      case 1: return '#0000ff';
      case 2: return '#008000';
      case 3: return '#ff0000';
      case 4: return '#000080';
      case 5: return '#800000';
      case 6: return '#008080';
      case 7: return '#000000';
      case 8: return '#808080';
      default: return '#000000';
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-3 bg-[#c0c0c0] select-none text-[12px]">
      {/* Outer Game Border */}
      <div className="win98-outset p-2 flex flex-col items-center">
        {/* Header HUD: Mine Counter, Smiley Button, Timer */}
        <div className="win98-inset w-full p-2 mb-2 flex items-center justify-between bg-[#c0c0c0]">
          {/* Mine count LED display */}
          <div className="bg-black text-[#ff0000] font-mono font-bold text-lg px-2 py-0.5 win98-well tracking-wider">
            {String(Math.max(-99, Math.min(999, mineCount))).padStart(3, '0')}
          </div>

          {/* Smiley Reset Button */}
          <button
            type="button"
            onClick={initGame}
            className="win98-btn w-8 h-8 p-0 text-base flex items-center justify-center"
            title="Restart Game"
          >
            {gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂'}
          </button>

          {/* Timer LED display */}
          <div className="bg-black text-[#ff0000] font-mono font-bold text-lg px-2 py-0.5 win98-well tracking-wider">
            {String(timer).padStart(3, '0')}
          </div>
        </div>

        {/* Minesweeper Grid */}
        <div className="win98-inset p-1 bg-[#c0c0c0]">
          <div className="grid grid-cols-9 gap-[1px]">
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => revealCell(r, c)}
                  onContextMenu={(e) => handleRightClick(e, r, c)}
                  className={`w-6 h-6 flex items-center justify-center font-bold text-[12px] p-0 outline-none ${
                    cell.isOpen
                      ? 'border border-[#7b7b7b] bg-[#c0c0c0]'
                      : 'win98-outset'
                  }`}
                >
                  {cell.isOpen ? (
                    cell.isMine ? (
                      '💣'
                    ) : cell.neighborMines > 0 ? (
                      <span style={{ color: getNumberColor(cell.neighborMines) }}>
                        {cell.neighborMines}
                      </span>
                    ) : null
                  ) : cell.isFlagged ? (
                    '🚩'
                  ) : null}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="text-[10px] text-[#555] mt-2">
        Left-click to sweep · Right-click to flag
      </div>
    </div>
  );
};
