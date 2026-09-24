import React, { useState } from 'react';
import { ShutDownIcon } from '../common/Win98Icons';
import { soundFX } from '../../utils/sound';

interface ShutDownDialogProps {
  onCancel: () => void;
  onShutdown: () => void;
  onRestart: () => void;
}

export const ShutDownDialog: React.FC<ShutDownDialogProps> = ({
  onCancel,
  onShutdown,
  onRestart,
}) => {
  const [action, setAction] = useState<'shutdown' | 'restart' | 'standby'>('shutdown');

  const handleOK = () => {
    soundFX.playClick();
    if (action === 'shutdown') {
      onShutdown();
    } else if (action === 'restart') {
      onRestart();
    } else {
      onCancel();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4 select-none text-[12px]">
      <div className="win98-outset w-84 p-[3px] shadow-2xl">
        {/* Title Bar */}
        <div className="win98-title-active flex items-center justify-between px-2 py-1 mb-2">
          <span className="font-bold text-white text-[11px]">Shut Down Windows</span>
          <button type="button" className="win98-ctrl-btn" onClick={onCancel}>
            ✕
          </button>
        </div>

        {/* Dialog Content */}
        <div className="p-3 flex items-start gap-4">
          <ShutDownIcon size={36} className="shrink-0" />
          <div className="space-y-2 text-[11.5px]">
            <p className="font-semibold text-black">
              What would you like the computer to do?
            </p>
            <div className="space-y-1 pl-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shutdown_action"
                  checked={action === 'shutdown'}
                  onChange={() => setAction('shutdown')}
                  className="accent-[#000080]"
                />
                <span>Shut down</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shutdown_action"
                  checked={action === 'restart'}
                  onChange={() => setAction('restart')}
                  className="accent-[#000080]"
                />
                <span>Restart</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="shutdown_action"
                  checked={action === 'standby'}
                  onChange={() => setAction('standby')}
                  className="accent-[#000080]"
                />
                <span>Stand by</span>
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 p-2 border-t border-[#dfdfdf]">
          <button
            type="button"
            className="win98-btn px-5 py-1 font-bold"
            onClick={handleOK}
          >
            OK
          </button>
          <button
            type="button"
            className="win98-btn px-5 py-1"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
