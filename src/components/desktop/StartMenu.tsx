import React from 'react';
import { WindowId } from '../../types';
import { RenderWinIcon, WindowsFlagIcon } from '../common/Win98Icons';
import { soundFX } from '../../utils/sound';
import { ExternalLink, Sparkles } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenWindow: (id: WindowId) => void;
  onOpenClassicView: () => void;
  onOpenShutdown: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({
  isOpen,
  onClose,
  onOpenWindow,
  onOpenClassicView,
  onOpenShutdown,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed left-0 bottom-8 z-[9990] win98-outset flex shadow-2xl select-none text-[12px]"
      style={{ width: '230px' }}
    >
      {/* Left Blue Gradient Banner */}
      <div className="w-8 win98-title-active flex flex-col justify-end items-center pb-3">
        <span
          className="text-white font-extrabold tracking-widest text-[15px] select-none uppercase -rotate-90 whitespace-nowrap mb-6 origin-center"
          style={{ letterSpacing: '4px' }}
        >
          Windows<span className="text-[#80d0ff] ml-1">98</span>
        </span>
      </div>

      {/* Menu Options List */}
      <div className="flex-1 bg-[#c0c0c0] py-1 flex flex-col justify-between">
        <div className="space-y-0.5">
          {/* Recruiter Quick Link in Start Menu */}
          <div
            onClick={() => {
              soundFX.playClick();
              onOpenClassicView();
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer font-bold text-[#000080]"
          >
            <div className="w-6 flex justify-center text-amber-500">
              <Sparkles size={18} />
            </div>
            <span>⚡ Classic Resume</span>
          </div>

          <div className="border-t border-[#808080] border-b border-white my-1" />

          {/* Programs */}
          <div
            onClick={() => {
              soundFX.playClick();
              onOpenWindow('explorer');
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <RenderWinIcon name="briefcase" size={20} />
            <span><u>P</u>rojects Explorer</span>
          </div>

          <div
            onClick={() => {
              soundFX.playClick();
              onOpenWindow('notepad');
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <RenderWinIcon name="notepad" size={20} />
            <span><u>A</u>bout Ken (Notepad)</span>
          </div>

          <div
            onClick={() => {
              soundFX.playClick();
              onOpenWindow('terminal');
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <RenderWinIcon name="terminal" size={20} />
            <span><u>M</u>S-DOS Prompt</span>
          </div>

          <div
            onClick={() => {
              soundFX.playClick();
              onOpenWindow('resume');
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <RenderWinIcon name="resume" size={20} />
            <span><u>R</u>esume PDF Reader</span>
          </div>

          <div
            onClick={() => {
              soundFX.playClick();
              onOpenWindow('mail');
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <RenderWinIcon name="mail" size={20} />
            <span><u>O</u>utlook Mail Client</span>
          </div>

          <div
            onClick={() => {
              soundFX.playClick();
              onOpenWindow('minesweeper');
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <RenderWinIcon name="minesweeper" size={20} />
            <span>Mines<u>w</u>eeper</span>
          </div>

          <div
            onClick={() => {
              soundFX.playClick();
              onOpenWindow('display');
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <RenderWinIcon name="display" size={20} />
            <span><u>D</u>isplay Properties</span>
          </div>

          <div className="border-t border-[#808080] border-b border-white my-1" />

          {/* Social Links */}
          <a
            href="https://github.com/kencherian"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
            onClick={() => onClose()}
          >
            <div className="w-5 text-center">🐙</div>
            <span className="flex-1">Ken&apos;s GitHub</span>
            <ExternalLink size={11} className="opacity-60" />
          </a>

          <a
            href="https://www.linkedin.com/in/ken-cherian/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-3 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
            onClick={() => onClose()}
          >
            <div className="w-5 text-center">💼</div>
            <span className="flex-1">Ken&apos;s LinkedIn</span>
            <ExternalLink size={11} className="opacity-60" />
          </a>
        </div>

        {/* Shut Down row */}
        <div className="pt-1 mt-1 border-t border-[#808080] border-b-0">
          <div
            onClick={() => {
              soundFX.playClick();
              onClose();
              onOpenShutdown();
            }}
            className="flex items-center gap-3 px-3 py-1.5 hover:bg-[#000080] hover:text-white cursor-pointer"
          >
            <RenderWinIcon name="shutdown" size={20} />
            <span className="font-semibold">Sh<u>u</u>t Down...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
