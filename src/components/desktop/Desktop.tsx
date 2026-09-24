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
import { DisplayPropertiesApp, FontSizeOption } from '../apps/DisplayPropertiesApp';
import { WALLPAPER_OPTIONS, TITLE_BAR_OPTIONS, TitleBarOption } from '../../data/displayThemes';
import { soundFX } from '../../utils/sound';
import { Sparkles, Power, RefreshCw, Palette, Settings } from 'lucide-react';

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
  {
    id: 'display',
    title: 'Display Properties',
    iconName: 'display',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    x: 160,
    y: 45,
    width: 440,
    height: 510,
  },
];

export const Desktop: React.FC<DesktopProps> = ({ onSwitchToClassic }) => {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeWindowId, setActiveWindowId] = useState<WindowId | null>('notepad');
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [showShutdownDialog, setShowShutdownDialog] = useState(false);
  const [isSystemPoweredOff, setIsSystemPoweredOff] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  // Desktop Wallpaper & Active Title Bar Theme State
  const [desktopColor, setDesktopColor] = useState<string>(() => {
    return localStorage.getItem('win98_desktop_color') || '#008080';
  });
  const [activeTitleBar, setActiveTitleBar] = useState<TitleBarOption>(() => {
    const savedId = localStorage.getItem('win98_titlebar_id');
    return TITLE_BAR_OPTIONS.find(o => o.id === savedId) || TITLE_BAR_OPTIONS[0];
  });
  const [systemFontSize, setSystemFontSize] = useState<FontSizeOption>(() => {
    return (localStorage.getItem('win98_font_size') as FontSizeOption) || 'standard';
  });

  const highestZRef = useRef<number>(20);

  // Play startup sound on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      soundFX.playStartup();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleApplyDisplayChanges = useCallback((wallpaperColor: string, titleBar: TitleBarOption, newFontSize?: FontSizeOption) => {
    setDesktopColor(wallpaperColor);
    setActiveTitleBar(titleBar);
    if (newFontSize) {
      setSystemFontSize(newFontSize);
    }
    try {
      localStorage.setItem('win98_desktop_color', wallpaperColor);
      localStorage.setItem('win98_titlebar_id', titleBar.id);
      if (newFontSize) {
        localStorage.setItem('win98_font_size', newFontSize);
      }
    } catch {
      // ignore
    }
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
      id: 'display',
      title: 'Display Settings',
      iconName: 'display',
      onOpen: () => openWindow('display'),
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
        setContextMenu(null);
      }}
      onContextMenu={(e) => {
        // Only open context menu if right clicked on desktop workspace background directly
        const target = e.target as HTMLElement;
        if (target.closest('.win98-outset, input, textarea, button, a')) {
          return;
        }
        e.preventDefault();
        soundFX.playClick();
        setContextMenu({
          x: Math.min(e.clientX, window.innerWidth - 170),
          y: Math.min(e.clientY, window.innerHeight - 230),
        });
      }}
      style={{
        backgroundColor: desktopColor,
        ['--win98-title-active-gradient' as string]: `linear-gradient(90deg, ${activeTitleBar.start} 0%, ${activeTitleBar.end} 100%)`,
      }}
      data-font-size={systemFontSize}
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none transition-colors duration-150"
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
          {win.id === 'display' && (
            <DisplayPropertiesApp
              currentWallpaperColor={desktopColor}
              currentTitleBar={activeTitleBar}
              currentFontSize={systemFontSize}
              onApplyChanges={handleApplyDisplayChanges}
              onClose={() => closeWindow('display')}
            />
          )}
        </WindowFrame>
      ))}

      {/* Desktop Right-Click Context Menu */}
      {contextMenu && (
        <div
          className="fixed win98-outset py-1 text-[11px] shadow-2xl z-[9980] select-none"
          style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px`, width: '165px' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => {
              soundFX.playClick();
              setContextMenu(null);
            }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex justify-between items-center"
          >
            <span>Arrange Icons</span>
            <span className="text-[9px]">▶</span>
          </div>
          <div
            onClick={() => {
              soundFX.playClick();
              setContextMenu(null);
            }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            Line Up Icons
          </div>
          <div
            onClick={() => {
              soundFX.playClick();
              setContextMenu(null);
            }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center justify-between"
          >
            <span><u>R</u>efresh</span>
            <RefreshCw size={11} className="opacity-60" />
          </div>
          <div className="border-t border-[#808080] border-b border-white my-1" />
          <div className="px-3 py-1 text-gray-500 cursor-default">
            Paste
          </div>
          <div className="px-3 py-1 text-gray-500 cursor-default">
            Paste Shortcut
          </div>
          <div className="border-t border-[#808080] border-b border-white my-1" />
          <div
            onClick={() => {
              soundFX.playClick();
              setContextMenu(null);
            }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex justify-between items-center"
          >
            <span>New</span>
            <span className="text-[9px]">▶</span>
          </div>
          <div className="border-t border-[#808080] border-b border-white my-1" />
          <div
            onClick={() => {
              soundFX.playClick();
              openWindow('display');
              setContextMenu(null);
            }}
            className="px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer font-bold flex items-center justify-between"
          >
            <span>P<u>r</u>operties</span>
            <Palette size={13} className="text-[#000080]" />
          </div>
        </div>
      )}

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
