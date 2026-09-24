import React from 'react';
import { RenderWinIcon } from '../common/Win98Icons';
import { soundFX } from '../../utils/sound';

interface DesktopIconProps {
  id: string;
  title: string;
  iconName: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  title,
  iconName,
  isSelected,
  onSelect,
  onOpen,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        soundFX.playClick();
        onSelect(id);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        soundFX.playClick();
        onOpen();
      }}
      className={`w-20 flex flex-col items-center p-1.5 cursor-pointer rounded-none group select-none transition-none ${
        isSelected ? 'outline-1 outline-dotted outline-white/80' : ''
      }`}
    >
      <div className={`p-1 ${isSelected ? 'brightness-75' : ''}`}>
        <RenderWinIcon name={iconName} size={34} />
      </div>
      <span
        className={`text-[11px] text-center px-1 mt-0.5 line-clamp-2 leading-tight ${
          isSelected
            ? 'bg-[#000080] text-white'
            : 'text-white drop-shadow-[1px_1px_1px_rgba(0,0,0,1)]'
        }`}
      >
        {title}
      </span>
    </div>
  );
};
