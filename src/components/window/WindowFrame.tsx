import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WindowState } from '../../types';
import { RenderWinIcon } from '../common/Win98Icons';
import { soundFX } from '../../utils/sound';

interface WindowFrameProps {
  window: WindowState;
  isActive: boolean;
  onFocus: (id: WindowState['id']) => void;
  onClose: (id: WindowState['id']) => void;
  onMinimize: (id: WindowState['id']) => void;
  onMaximize: (id: WindowState['id']) => void;
  onMove: (id: WindowState['id'], x: number, y: number) => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window: win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  children,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; winX: number; winY: number }>({
    mouseX: 0,
    mouseY: 0,
    winX: 0,
    winY: 0,
  });

  const handleMouseDownTitle = (e: React.MouseEvent) => {
    // Only drag with left click and if not maximized
    if (e.button !== 0 || win.isMaximized) return;

    onFocus(win.id);
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      winX: win.x,
      winY: win.y,
    };
    e.preventDefault();
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.mouseX;
    const deltaY = e.clientY - dragStartRef.current.mouseY;

    // Boundary constraints: ensure window title remains on screen
    const newX = Math.max(0, Math.min(window.innerWidth - 80, dragStartRef.current.winX + deltaX));
    const newY = Math.max(0, Math.min(window.innerHeight - 80, dragStartRef.current.winY + deltaY));

    onMove(win.id, newX, newY);
  }, [isDragging, onMove, win.id]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!win.isOpen || win.isMinimized) {
    return null;
  }

  const windowStyle: React.CSSProperties = win.isMaximized
    ? {
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 36px)',
        zIndex: win.zIndex,
      }
    : {
        position: 'fixed',
        left: `${win.x}px`,
        top: `${win.y}px`,
        width: `${win.width}px`,
        height: `${win.height}px`,
        zIndex: win.zIndex,
      };

  return (
    <div
      style={windowStyle}
      className="win98-outset flex flex-col p-[3px] select-none text-[12px] shadow-2xl transition-none"
      onMouseDown={() => onFocus(win.id)}
    >
      {/* Title Bar - Drag Handle */}
      <div
        onMouseDown={handleMouseDownTitle}
        onDoubleClick={() => {
          soundFX.playClick();
          onMaximize(win.id);
        }}
        className={`flex items-center justify-between px-1.5 py-[3px] cursor-default ${
          isActive ? 'win98-title-active' : 'win98-title-inactive'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-hidden pr-2">
          <RenderWinIcon name={win.iconName} size={16} className="shrink-0" />
          <span className="font-bold text-[11px] leading-tight truncate tracking-tight text-white">
            {win.title}
          </span>
        </div>

        {/* Title Bar Buttons: Minimize, Maximize, Close */}
        <div className="flex items-center gap-[2px] shrink-0" onMouseDown={(e) => e.stopPropagation()}>
          <button
            type="button"
            className="win98-ctrl-btn"
            title="Minimize"
            onClick={() => {
              soundFX.playMinimize();
              onMinimize(win.id);
            }}
          >
            _
          </button>
          <button
            type="button"
            className="win98-ctrl-btn"
            title={win.isMaximized ? 'Restore' : 'Maximize'}
            onClick={() => {
              soundFX.playMaximize();
              onMaximize(win.id);
            }}
          >
            {win.isMaximized ? '❐' : '□'}
          </button>
          <button
            type="button"
            className="win98-ctrl-btn font-extrabold"
            title="Close"
            onClick={() => {
              soundFX.playClick();
              onClose(win.id);
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Body Container */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#c0c0c0] mt-[2px]">
        {children}
      </div>
    </div>
  );
};
