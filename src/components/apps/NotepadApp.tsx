import React, { useState } from 'react';
import { KEN_BIO } from '../../data/portfolioData';
import { soundFX } from '../../utils/sound';

interface NotepadAppProps {
  onClose?: () => void;
}

export const NotepadApp: React.FC<NotepadAppProps> = ({ onClose }) => {
  const [content, setContent] = useState(KEN_BIO);
  const [wordWrap, setWordWrap] = useState(true);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);

  const handleDownload = () => {
    soundFX.playClick();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'About_Ken.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setActiveMenu(null);
  };

  const handlePrint = () => {
    soundFX.playClick();
    window.print();
    setActiveMenu(null);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#c0c0c0] text-[12px] relative" onClick={() => setActiveMenu(null)}>
      {/* Menu Bar */}
      <div className="flex items-center gap-1 border-b border-[#808080] bg-[#c0c0c0] px-1 py-[2px] text-[11px] relative">
        <div className="relative">
          <button
            type="button"
            className={`px-2 py-[2px] cursor-default hover:bg-[#000080] hover:text-white ${
              activeMenu === 'file' ? 'bg-[#000080] text-white' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              setActiveMenu(activeMenu === 'file' ? null : 'file');
            }}
          >
            <u>F</u>ile
          </button>
          {activeMenu === 'file' && (
            <div className="absolute left-0 top-full z-50 win98-outset w-44 py-1 text-black shadow-lg">
              <div
                className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex justify-between"
                onClick={handleDownload}
              >
                <span><u>S</u>ave</span>
                <span className="text-[10px] opacity-75">Ctrl+S</span>
              </div>
              <div
                className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex justify-between"
                onClick={handlePrint}
              >
                <span><u>P</u>rint...</span>
                <span className="text-[10px] opacity-75">Ctrl+P</span>
              </div>
              <div className="border-t border-[#808080] my-1" />
              <div
                className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                onClick={() => {
                  soundFX.playClick();
                  onClose?.();
                }}
              >
                E<u>x</u>it
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className={`px-2 py-[2px] cursor-default hover:bg-[#000080] hover:text-white ${
              activeMenu === 'edit' ? 'bg-[#000080] text-white' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              setActiveMenu(activeMenu === 'edit' ? null : 'edit');
            }}
          >
            <u>E</u>dit
          </button>
          {activeMenu === 'edit' && (
            <div className="absolute left-0 top-full z-50 win98-outset w-48 py-1 text-black shadow-lg">
              <div
                className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex justify-between"
                onClick={() => {
                  setContent(KEN_BIO);
                  setActiveMenu(null);
                }}
              >
                <span><u>R</u>eset Original</span>
              </div>
              <div
                className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex justify-between"
                onClick={() => {
                  navigator.clipboard.writeText(content);
                  setActiveMenu(null);
                }}
              >
                <span><u>C</u>opy All</span>
                <span className="text-[10px] opacity-75">Ctrl+C</span>
              </div>
              <div
                className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex justify-between"
                onClick={() => {
                  setContent(prev => prev + `\n[Log Timestamp: ${new Date().toLocaleString()}]`);
                  setActiveMenu(null);
                }}
              >
                <span>Time/<u>D</u>ate</span>
                <span className="text-[10px] opacity-75">F5</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className={`px-2 py-[2px] cursor-default hover:bg-[#000080] hover:text-white ${
              activeMenu === 'format' ? 'bg-[#000080] text-white' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              setActiveMenu(activeMenu === 'format' ? null : 'format');
            }}
          >
            F<u>o</u>rmat
          </button>
          {activeMenu === 'format' && (
            <div className="absolute left-0 top-full z-50 win98-outset w-40 py-1 text-black shadow-lg">
              <div
                className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer flex items-center gap-2"
                onClick={() => {
                  setWordWrap(!wordWrap);
                  setActiveMenu(null);
                }}
              >
                <span className="w-3 text-center">{wordWrap ? '✓' : ''}</span>
                <span><u>W</u>ord Wrap</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            className={`px-2 py-[2px] cursor-default hover:bg-[#000080] hover:text-white ${
              activeMenu === 'help' ? 'bg-[#000080] text-white' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              soundFX.playClick();
              setActiveMenu(activeMenu === 'help' ? null : 'help');
            }}
          >
            <u>H</u>elp
          </button>
          {activeMenu === 'help' && (
            <div className="absolute left-0 top-full z-50 win98-outset w-44 py-1 text-black shadow-lg">
              <div
                className="px-4 py-1 hover:bg-[#000080] hover:text-white cursor-pointer"
                onClick={() => {
                  setShowAbout(true);
                  setActiveMenu(null);
                }}
              >
                About Notepad
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="flex-1 p-[2px] overflow-hidden flex flex-col">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          wrap={wordWrap ? 'soft' : 'off'}
          spellCheck={false}
          className="w-full h-full win98-sunken p-3 text-[13px] leading-relaxed font-mono outline-none resize-none selection:bg-[#000080] selection:text-white text-black bg-white"
        />
      </div>

      {/* Notepad Status Bar */}
      <div className="grid grid-cols-12 gap-1 px-1 py-[2px] bg-[#c0c0c0] text-[11px] border-t border-[#dfdfdf]">
        <div className="col-span-6 win98-well px-2 py-[1px] text-[#444] truncate">
          File: C:\Ken\About_Ken.txt
        </div>
        <div className="col-span-2 win98-well px-2 py-[1px] text-center">
          Ln 1, Col 1
        </div>
        <div className="col-span-2 win98-well px-2 py-[1px] text-center">
          100%
        </div>
        <div className="col-span-2 win98-well px-2 py-[1px] text-center truncate">
          Windows (CRLF)
        </div>
      </div>

      {/* About Dialog Modal */}
      {showAbout && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-4 z-50">
          <div className="win98-outset w-80 p-2 shadow-2xl">
            <div className="win98-title-active flex items-center justify-between px-2 py-1 mb-3">
              <span className="font-bold text-white text-[11px]">About Notepad</span>
              <button
                type="button"
                className="win98-ctrl-btn"
                onClick={() => setShowAbout(false)}
              >
                ✕
              </button>
            </div>
            <div className="px-3 py-2 space-y-2">
              <p className="font-bold text-[13px]">Windows 98 Notepad</p>
              <p className="text-[11px] text-[#333]">
                About_Ken.txt viewer and editor for Ken Cherian&apos;s Web OS Portfolio.
              </p>
              <p className="text-[10px] text-[#666]">
                Author: Ken Cherian · SVPCET Nagpur · 1998 GUI Edition
              </p>
            </div>
            <div className="flex justify-end pt-2 pr-2">
              <button
                type="button"
                className="win98-btn px-6"
                onClick={() => setShowAbout(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
