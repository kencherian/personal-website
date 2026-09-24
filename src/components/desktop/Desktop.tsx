import React, { useState, useRef, useEffect, useCallback } from 'react';
import { WindowId, WindowState } from '../../types';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { WindowFrame } from '../window/WindowFrame';
import { NotepadApp } from '../apps/NotepadApp';
import { DosPromptApp } from '../apps/DosPromptApp';
import { ExplorerApp } from '../apps/ExplorerApp';
import { ResumePdfApp } from '../apps/ResumePdfApp';
import { OutlookApp } from '../apps/OutlookApp';
import { MinesweeperApp } from '../apps/MinesweeperApp';
import { ShutDownDialog } from '../apps/ShutDownDialog';
import { soundFX } from '../../utils/sound';
import { Sparkles, Power, RefreshCw } from 'lucide-react';

interface DesktopProps {
  onSwitchToClassic: () => void;
}

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: 'notepad',
    title: 'About_Ken.txt - Notepad',
    iconName: 'notepad',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    x: 40,
    y: 35,
    width: 580,
    height: 440,
  },
  {
    id: 'explorer',
    title: 'My Briefcase - C:\\Ken\\Projects',
    iconName: 'briefcase',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 5,
    x: 180,
    y: 70,
    width: 660,
    height: 460,
  },
  {
    id: 'terminal',
    title: 'MS-DOS Prompt (C:\\KEN>)',
    iconName: 'terminal',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 6,
    x: 120,
    y: 110,
    width: 620,
    height: 420,
  },
  {
    id: 'resume',
    title: 'Acrobat Reader - [Resume_Ken_Cherian.pdf]',
    iconName: 'resume',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 7,
    x: 220,
    y: 40,
    width: 720,
    height: 520,
  },
  {
    id: 'mail',
    title: 'Outlook Express - New Message to kencherian16@gmail.com',
    iconName: 'mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    x: 150,
    y: 80,
    width: 580,
    height: 460,
  },
  {
    id: 'minesweeper',
    title: 'Minesweeper',
    iconName: 'minesweeper',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    x: 300,
    y: 120,
    width: 290,
    height: 350,
  },
];

export const Desktop: React.FC<DesktopProps> = ({ onSwitchToClassic }) => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('notepad');
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [isSystemPoweredOff, setIsSystemPoweredOff] = useState(false);
  const highestZRef = useRef<number>(20);

  // Play startup sound on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      soundFX.playStartup();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const bringToFront = useCallback((id: WindowId) => {
    highestZRef.current += 1;
    const newZ = highestZRef.current;
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w))
    );
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    highestZRef.current += 1;
    const newZ = highestZRef.current;
    setActiveWindowId(id);
    setWindows(prev =>
      prev.map(w => {
        if (w.id === id) {
          return { ...w, isOpen: true, isMinimized: false, zIndex: newZ };
        }
        return w;
      })
    );
  }, []);

  const closeWindow = useCallback((id: WindowId) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isOpen: false } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  }, [activeWindowId]);

  const toggleMaximizeWindow = useCallback((id: WindowId) => {
    setWindows(prev =>
      prev.map(w => {
        if (w.id === id) {
          return { ...w, isMaximized: !w.isMaximized };
        }
        return w;
      })
    );
  }, []);

  const moveWindow = useCallback((id: WindowId, x: number, y: number) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, x, y } : w))
    );
  }, []);

  const handleTabClick = (id: WindowId) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;

    if (activeWindowId === id && !win.isMinimized) {
      // Minimize if already active
      minimizeWindow(id);
    } else {
      // Unminimize and focus
      bringToFront(id);
    }
  };

  const desktopIcons = [
    {
      id: 'computer',
      title: 'My Computer',
      iconName: 'computer',
      onOpen: () => openWindow('explorer'),
    },
    {
      id: 'briefcase',
      title: 'My Briefcase (Projects)',
      iconName: 'briefcase',
      onOpen: () => openWindow('explorer'),
    },
    {
      id: 'notepad',
      title: 'About_Ken.txt',
      iconName: 'notepad',
      onOpen: () => openWindow('notepad'),
    },
    {
      id: 'terminal',
      title: 'MS-DOS Prompt',
      iconName: 'terminal',
      onOpen: () => openWindow('terminal'),
    },
    {
      id: 'resume',
      title: 'Resume_Ken.pdf',
      iconName: 'resume',
      onOpen: () => openWindow('resume'),
    },
    {
      id: 'mail',
      title: 'Outlook Express',
      iconName: 'mail',
      onOpen: () => openWindow('mail'),
    },
    {
      id: 'minesweeper',
      title: 'Minesweeper',
      iconName: 'minesweeper',
      onOpen: () => openWindow('minesweeper'),
    },
    {
      id: 'ie',
      title: 'Ken on GitHub',
      iconName: 'ie',
      onOpen: () => window.open('https://github.com/kencherian', '_blank'),
    },
    {
      id: 'recycle',
      title: 'Recycle Bin',
      iconName: 'recycle',
      onOpen: () => {
        soundFX.playDing();
        alert('Recycle Bin is currently empty. Zero bugs found in production!');
      },
    },
  ];

  // If computer was shut down: show CRT power-off screen
  if (isSystemPoweredOff) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-center p-6 select-none z-[99999]">
        <div className="max-w-md space-y-4">
          <p
            className="text-[#ff9900] font-sans font-bold text-2xl tracking-wide uppercase drop-shadow-[0_0_10px_rgba(255,153,0,0.5)]"
            style={{ fontFamily: '"Courier New", monospace' }}
          >
            It&apos;s now safe to turn off your computer.
          </p>
          <p className="text-gray-500 text-sm">
            Windows 98 subsystem halted. All threads safely terminated.
          </p>
          <div className="pt-6 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                setIsSystemPoweredOff(false);
                soundFX.playStartup();
              }}
              className="win98-btn px-6 py-2 font-bold text-sm flex items-center gap-2"
            >
              <Power size={16} className="text-green-600" />
              <span>Power On System</span>
            </button>

            <button
              type="button"
              onClick={onSwitchToClassic}
              className="win98-btn px-6 py-2 text-sm flex items-center gap-2"
            >
              <Sparkles size={16} className="text-amber-600" />
              <span>Classic Resume View</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => {
        setSelectedIconId(null);
        setStartMenuOpen(false);
      }}
      className="fixed inset-0 w-screen h-screen bg-[#008080] overflow-hidden select-none"
    >
      {/* Recruiter Safety Net Button - Prominent High-Contrast Floating Header Control */}
      <div className="absolute top-3 right-4 z-[9950] flex items-center gap-2">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playClick();
            onSwitchToClassic();
          }}
          className="win98-outset px-3.5 py-1.5 bg-[#ffff99] hover:bg-[#ffff77] active:bg-[#e6e600] font-bold text-[12px] text-[#000080] flex items-center gap-2 shadow-2xl cursor-pointer transition-transform hover:scale-105 active:scale-95"
          title="Instant switch to standard, clean modern portfolio view"
        >
          <Sparkles size={16} className="text-amber-600 fill-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="tracking-wide uppercase font-extrabold">
            ⚡ CLASSIC RESUME VIEW
          </span>
        </button>
      </div>

      {/* Desktop Watermark Title / Student Badge */}
      <div className="absolute bottom-12 right-4 text-right pointer-events-none select-none opacity-40 hidden sm:block">
        <div className="font-extrabold text-white text-lg tracking-wider drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]">
          KEN CHERIAN
        </div>
        <div className="text-white text-xs drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]">
          SVPCET · Computer Engineering · Windows 98 Edition
        </div>
      </div>

      {/* Desktop Icons Column */}
      <div className="absolute top-4 left-4 grid grid-flow-col grid-rows-6 gap-y-4 gap-x-2 z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            title={icon.title}
            iconName={icon.iconName}
            isSelected={selectedIconId === icon.id}
            onSelect={(id) => setSelectedIconId(id)}
            onOpen={icon.onOpen}
          />
        ))}
      </div>

      {/* Windows Manager Layer */}
      {windows.map((win) => (
        <WindowFrame
          key={win.id}
          window={win}
          isActive={activeWindowId === win.id}
          onFocus={bringToFront}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={toggleMaximizeWindow}
          onMove={moveWindow}
        >
          {win.id === 'notepad' && <NotepadApp onClose={() => closeWindow('notepad')} />}
          {win.id === 'explorer' && <ExplorerApp />}
          {win.id === 'terminal' && (
            <DosPromptApp
              onClose={() => closeWindow('terminal')}
              onOpenWindow={openWindow}
            />
          )}
          {win.id === 'resume' && <ResumePdfApp />}
          {win.id === 'mail' && <OutlookApp onClose={() => closeWindow('mail')} />}
          {win.id === 'minesweeper' && <MinesweeperApp />}
        </WindowFrame>
      ))}

      {/* Start Menu Popup */}
      <StartMenu
        isOpen={startMenuOpen}
        onClose={() => setStartMenuOpen(false)}
        onOpenWindow={openWindow}
        onOpenClassicView={onSwitchToClassic}
        onOpenShutdown={() => setShowShutdownDialog(true)}
      />

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        startMenuOpen={startMenuOpen}
        onToggleStartMenu={() => setStartMenuOpen(prev => !prev)}
        onTabClick={handleTabClick}
        onOpenClassicView={onSwitchToClassic}
      />

      {/* Shut Down Windows Dialog */}
      {showShutdownDialog && (
        <ShutDownDialog
          onCancel={() => setShowShutdownDialog(false)}
          onShutdown={() => {
            setShowShutdownDialog(false);
            setIsSystemPoweredOff(true);
          }}
          onRestart={() => {
            setShowShutdownDialog(false);
            soundFX.playStartup();
            setWindows(INITIAL_WINDOWS);
            setActiveWindowId('notepad');
          }}
        />
      )}
    </div>
  );
};
