import React, { useState, useEffect } from 'react';
import { WindowState, WindowId } from '../../types';
import { WindowsFlagIcon, SpeakerIcon, NetworkIcon, RenderWinIcon } from '../common/Win98Icons';
import { soundFX } from '../../utils/sound';
import { VolumeX, Sparkles } from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: WindowId | null;
  startMenuOpen: boolean;
  onToggleStartMenu: () => void;
  onTabClick: (id: WindowId) => void;
  onOpenClassicView: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  activeWindowId,
  startMenuOpen,
  onToggleStartMenu,
  onTabClick,
  onOpenClassicView,
}) => {
  const [timeStr, setTimeStr] = useState('');
  const [timeZoneMode, setTimeZoneMode] = useState<'IST' | 'LOCAL'>('IST');
  const [isMuted, setIsMuted] = useState(!soundFX.enabled);
  const [netBlink, setNetBlink] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      if (timeZoneMode === 'IST') {
        const istTime = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(now);
        setTimeStr(`${istTime} IST`);
      } else {
        const localTime = now.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' });
        setTimeStr(`${localTime} LOC`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timeZoneMode]);

  useEffect(() => {
    // Blinking network indicator
    const netInterval = setInterval(() => {
      setNetBlink(b => !b);
    }, 1800);
    return () => clearInterval(netInterval);
  }, []);

  const openWindows = windows.filter(w => w.isOpen);

  const toggleSound = () => {
    const active = soundFX.toggleMute();
    setIsMuted(!active);
    if (active) soundFX.playClick();
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-8 win98-outset flex items-center justify-between px-1 z-[9980] select-none text-[11px] border-t border-[#dfdfdf]"
      style={{ backgroundColor: '#c0c0c0' }}
    >
      {/* Left: Start Button + Divider + Quick Launch */}
      <div className="flex items-center gap-1.5 h-full py-0.5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            soundFX.playClick();
            onToggleStartMenu();
          }}
          className={`win98-btn flex items-center gap-1.5 px-2 h-[24px] font-bold text-[11.5px] ${
            startMenuOpen ? 'active' : ''
          }`}
        >
          <WindowsFlagIcon size={15} />
          <span>Start</span>
        </button>

        {/* Vertical divider */}
        <div className="w-[1px] h-5 bg-[#808080] border-r border-white mx-0.5" />

        {/* Classic Resume Safety Switch Tab on Taskbar */}
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            onOpenClassicView();
          }}
          className="win98-btn flex items-center gap-1 px-2 h-[24px] bg-yellow-100 hover:bg-yellow-200 text-[#000080] font-bold"
          title="Switch to Clean Classic Portfolio View"
        >
          <Sparkles size={12} className="text-amber-600" />
          <span className="hidden sm:inline">⚡ Resume View</span>
        </button>

        {/* Vertical divider */}
        <div className="w-[1px] h-5 bg-[#808080] border-r border-white mx-0.5 hidden sm:block" />

        {/* Open Windows Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto max-w-[50vw]">
          {openWindows.map((win) => {
            const isTabActive = activeWindowId === win.id && !win.isMinimized;
            return (
              <button
                key={win.id}
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onTabClick(win.id);
                }}
                className={`win98-taskbar-tab ${isTabActive ? 'active' : ''}`}
                title={win.title}
              >
                <RenderWinIcon name={win.iconName} size={14} className="shrink-0" />
                <span className="truncate">{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: System Tray (Inset) */}
      <div className="flex items-center gap-2 win98-well px-2 py-[2px] h-[22px] bg-[#c0c0c0]">
        {/* Audio Speaker Mute Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="cursor-pointer hover:opacity-75 flex items-center"
        >
          {isMuted ? (
            <VolumeX size={14} className="text-red-600" />
          ) : (
            <SpeakerIcon size={14} />
          )}
        </button>

        {/* Network Activity Icon */}
        <div
          title="Connection: Local Intranet & Internet Connected"
          className="cursor-default flex items-center"
        >
          <div className={netBlink ? 'opacity-100' : 'opacity-70'}>
            <NetworkIcon size={14} />
          </div>
        </div>

        {/* Clock with IST / Local toggle */}
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            setTimeZoneMode(m => (m === 'IST' ? 'LOCAL' : 'IST'));
          }}
          title={`Click to switch between IST (Nagpur, India) and Local Time. Current: ${timeZoneMode}`}
          className="font-mono text-[11px] text-black cursor-pointer hover:underline tabular-nums"
        >
          {timeStr || '12:00 PM'}
        </button>
      </div>
    </div>
  );
};
