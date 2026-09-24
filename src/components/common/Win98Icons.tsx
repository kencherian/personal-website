import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const ComputerIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* CRT Monitor */}
    <rect x="3" y="3" width="22" height="18" fill="#dcdcdc" stroke="#000000" strokeWidth="1" />
    <rect x="5" y="5" width="18" height="14" fill="#008080" />
    <rect x="7" y="7" width="14" height="10" fill="#000080" />
    <rect x="8" y="8" width="5" height="4" fill="#1084d0" />
    {/* Monitor Base */}
    <rect x="9" y="21" width="10" height="2" fill="#808080" stroke="#000000" strokeWidth="1" />
    <rect x="7" y="23" width="14" height="2" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    {/* PC Tower behind */}
    <rect x="22" y="7" width="8" height="20" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    <rect x="24" y="9" width="4" height="2" fill="#808080" />
    <rect x="24" y="13" width="4" height="1" fill="#000000" />
    <circle cx="27" cy="19" r="1" fill="#00ff00" />
  </svg>
);

export const BriefcaseIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* Classic Briefcase / Explorer */}
    <rect x="11" y="5" width="10" height="4" fill="none" stroke="#5a3d00" strokeWidth="2" />
    <rect x="4" y="9" width="24" height="18" fill="#b8860b" stroke="#000000" strokeWidth="1" />
    <rect x="5" y="10" width="22" height="7" fill="#d4af37" />
    <rect x="13" y="14" width="6" height="4" fill="#e6c65b" stroke="#5a3d00" strokeWidth="1" />
    <rect x="15" y="15" width="2" height="2" fill="#000000" />
    {/* Corner protectors */}
    <rect x="4" y="9" width="3" height="3" fill="#8b5a2b" />
    <rect x="25" y="9" width="3" height="3" fill="#8b5a2b" />
    <rect x="4" y="24" width="3" height="3" fill="#8b5a2b" />
    <rect x="25" y="24" width="3" height="3" fill="#8b5a2b" />
  </svg>
);

export const ManilaFolderIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* Back flap */}
    <path d="M3 7H13L16 10H28V24H3V7Z" fill="#d4a34b" stroke="#000000" strokeWidth="1" />
    {/* White Paper sticking out */}
    <rect x="7" y="8" width="18" height="6" fill="#ffffff" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="10" x2="20" y2="10" stroke="#000080" strokeWidth="1" />
    {/* Front folder flap */}
    <path d="M3 12H29L26 27H2L3 12Z" fill="#fcd277" stroke="#000000" strokeWidth="1" />
    <path d="M4 13L28 13" stroke="#fff1a8" strokeWidth="1" />
  </svg>
);

export const NotepadIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* Notepad Pad */}
    <rect x="6" y="4" width="18" height="24" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    {/* Spiral / Header */}
    <rect x="6" y="4" width="18" height="5" fill="#3a82f6" stroke="#000080" strokeWidth="1" />
    {/* Ruled lines */}
    <line x1="9" y1="12" x2="21" y2="12" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="15" x2="21" y2="15" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="18" x2="21" y2="18" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="21" x2="18" y2="21" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="24" x2="16" y2="24" stroke="#808080" strokeWidth="1" />
    {/* Pencil */}
    <polygon points="17,27 28,10 25,7 14,24" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
    <polygon points="17,27 14,24 12,28" fill="#e2e8f0" stroke="#000000" strokeWidth="0.8" />
    <polygon points="13,27 12,28" stroke="#000000" strokeWidth="1" />
  </svg>
);

export const DosPromptIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* Black screen */}
    <rect x="3" y="5" width="26" height="22" fill="#000000" stroke="#ffffff" strokeWidth="1" />
    <rect x="2" y="4" width="28" height="24" fill="none" stroke="#808080" strokeWidth="1" />
    {/* C:\> Prompt Text representation in pixel grid */}
    <rect x="6" y="8" width="6" height="4" fill="#3b82f6" />
    <text x="6" y="20" fill="#ffffff" fontFamily="monospace" fontSize="9" fontWeight="bold">C:\&gt;</text>
    <rect x="21" y="14" width="4" height="6" fill="#00ff00" />
  </svg>
);

export const AcrobatIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* Document sheet */}
    <polygon points="5,3 21,3 27,9 27,29 5,29" fill="#ffffff" stroke="#808080" strokeWidth="1" />
    <polygon points="21,3 21,9 27,9" fill="#d4d4d4" stroke="#808080" strokeWidth="1" />
    {/* Adobe red banner */}
    <rect x="8" y="11" width="16" height="15" fill="#cc0000" rx="1" />
    {/* White Ribbon / A glyph */}
    <path d="M11 23L15 14L17 19H13M17 19L19 23M17 19L18 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
);

export const OutlookIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* Envelope */}
    <rect x="4" y="9" width="24" height="16" fill="#fdfbf7" stroke="#000000" strokeWidth="1" />
    <polygon points="4,9 16,19 28,9" fill="#f1ece1" stroke="#000000" strokeWidth="1" />
    {/* Postal stamp */}
    <rect x="21" y="11" width="5" height="4" fill="#3b82f6" stroke="#ef4444" strokeWidth="0.5" />
    {/* Classic Globe / Wings */}
    <circle cx="16" cy="19" r="6" fill="#000080" opacity="0.3" />
    <path d="M10 20C12 17 20 17 22 20" stroke="#f59e0b" strokeWidth="1.5" />
  </svg>
);

export const RecycleBinIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* Blue metallic recycling mesh basket */}
    <path d="M7 9H25L22 27H10L7 9Z" fill="#a0c4e2" stroke="#000080" strokeWidth="1" />
    <ellipse cx="16" cy="9" rx="9" ry="2.5" fill="#c7e1f7" stroke="#000080" strokeWidth="1" />
    {/* Mesh pattern lines */}
    <line x1="12" y1="11" x2="13" y2="25" stroke="#000080" strokeWidth="1" />
    <line x1="16" y1="11" x2="16" y2="25" stroke="#000080" strokeWidth="1" />
    <line x1="20" y1="11" x2="19" y2="25" stroke="#000080" strokeWidth="1" />
    {/* Paper in bin */}
    <rect x="13" y="7" width="5" height="3" fill="#ffffff" stroke="#808080" strokeWidth="0.5" />
  </svg>
);

export const InternetExplorerIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* Golden orbital halo */}
    <ellipse cx="16" cy="16" rx="14" ry="5" fill="none" stroke="#d97706" strokeWidth="2.5" transform="rotate(-30 16 16)" />
    {/* Blue 'e' */}
    <circle cx="15" cy="15" r="9" fill="#0284c7" />
    <circle cx="15" cy="15" r="5" fill="#008080" />
    <rect x="10" y="13" width="10" height="3" fill="#0284c7" />
    <path d="M15 15L23 20" stroke="#d97706" strokeWidth="2.5" />
  </svg>
);

export const MinesweeperIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    {/* Mine body */}
    <circle cx="16" cy="16" r="7" fill="#000000" />
    <line x1="16" y1="5" x2="16" y2="27" stroke="#000000" strokeWidth="2" />
    <line x1="5" y1="16" x2="27" y2="16" stroke="#000000" strokeWidth="2" />
    <line x1="8" y1="8" x2="24" y2="24" stroke="#000000" strokeWidth="2" />
    <line x1="8" y1="24" x2="24" y2="8" stroke="#000000" strokeWidth="2" />
    <rect x="13" y="13" width="3" height="3" fill="#ffffff" />
  </svg>
);

export const WindowsFlagIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`shrink-0 ${className}`}>
    <rect x="1" y="2" width="6" height="5" fill="#f87171" />
    <rect x="8" y="2" width="6" height="5" fill="#38bdf8" />
    <rect x="1" y="8" width="6" height="5" fill="#4ade80" />
    <rect x="8" y="8" width="6" height="5" fill="#facc15" />
    {/* Black grid lines */}
    <line x1="7" y1="1" x2="7" y2="14" stroke="#000000" strokeWidth="1" />
    <line x1="1" y1="7" x2="14" y2="7" stroke="#000000" strokeWidth="1" />
  </svg>
);

export const FloppyIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`shrink-0 ${className}`}>
    <path d="M2 1H12L15 4V15H2V1Z" fill="#3b82f6" stroke="#000000" strokeWidth="0.8" />
    <rect x="4" y="1" width="8" height="5" fill="#ffffff" />
    <rect x="5" y="2" width="2" height="3" fill="#64748b" />
    <rect x="4" y="8" width="8" height="6" fill="#e2e8f0" stroke="#000000" strokeWidth="0.8" />
  </svg>
);

export const SpeakerIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`shrink-0 ${className}`}>
    <polygon points="2,5 5,5 9,2 9,14 5,11 2,11" fill="#eab308" stroke="#000000" strokeWidth="0.8" />
    <path d="M11 5C12 6.5 12 9.5 11 11" stroke="#000000" strokeWidth="1" fill="none" />
    <path d="M13 3C14.5 5.5 14.5 10.5 13 13" stroke="#000000" strokeWidth="1" fill="none" />
  </svg>
);

export const NetworkIcon: React.FC<IconProps> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={`shrink-0 ${className}`}>
    <rect x="1" y="2" width="6" height="5" fill="#000080" stroke="#000000" strokeWidth="0.8" />
    <rect x="9" y="7" width="6" height="5" fill="#008080" stroke="#000000" strokeWidth="0.8" />
    <path d="M4 7V13H12V12" stroke="#000000" strokeWidth="1" fill="none" />
    <circle cx="4" cy="13" r="1" fill="#00ff00" />
    <circle cx="12" cy="13" r="1" fill="#00ff00" />
  </svg>
);

export const ShutDownIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    <circle cx="16" cy="16" r="12" fill="#ef4444" stroke="#000000" strokeWidth="1" />
    <path d="M12 10C9 13 9 19 12 22C15 25 21 24 23 20" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <line x1="16" y1="6" x2="16" y2="15" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const DisplaySettingsIcon: React.FC<IconProps> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`shrink-0 ${className}`}>
    {/* CRT Monitor */}
    <rect x="2" y="3" width="22" height="18" fill="#dcdcdc" stroke="#000000" strokeWidth="1" />
    <rect x="4" y="5" width="18" height="14" fill="#008080" />
    {/* Mini screen preview */}
    <rect x="6" y="7" width="14" height="3" fill="#000080" />
    <rect x="6" y="10" width="8" height="7" fill="#ffffff" />
    <rect x="14" y="10" width="6" height="7" fill="#c0c0c0" />
    {/* Stand */}
    <rect x="8" y="21" width="10" height="2" fill="#808080" stroke="#000000" strokeWidth="1" />
    <rect x="5" y="23" width="16" height="2" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    {/* Color Palette Overlay */}
    <ellipse cx="23" cy="21" rx="8" ry="7" fill="#fcd277" stroke="#000000" strokeWidth="1" />
    <circle cx="19" cy="19" r="1.5" fill="#ef4444" />
    <circle cx="23" cy="17" r="1.5" fill="#3b82f6" />
    <circle cx="27" cy="19" r="1.5" fill="#10b981" />
    <circle cx="22" cy="24" r="1.5" fill="#a855f7" />
    <ellipse cx="27" cy="24" rx="2" ry="1.5" fill="#c0c0c0" stroke="#000000" strokeWidth="0.8" />
  </svg>
);

export const RenderWinIcon: React.FC<{ name: string; size?: number; className?: string }> = ({ name, size = 32, className = '' }) => {
  switch (name) {
    case 'computer':
      return <ComputerIcon size={size} className={className} />;
    case 'briefcase':
      return <BriefcaseIcon size={size} className={className} />;
    case 'folder':
      return <ManilaFolderIcon size={size} className={className} />;
    case 'notepad':
      return <NotepadIcon size={size} className={className} />;
    case 'terminal':
      return <DosPromptIcon size={size} className={className} />;
    case 'resume':
      return <AcrobatIcon size={size} className={className} />;
    case 'mail':
      return <OutlookIcon size={size} className={className} />;
    case 'recycle':
      return <RecycleBinIcon size={size} className={className} />;
    case 'ie':
      return <InternetExplorerIcon size={size} className={className} />;
    case 'minesweeper':
      return <MinesweeperIcon size={size} className={className} />;
    case 'shutdown':
      return <ShutDownIcon size={size} className={className} />;
    case 'display':
      return <DisplaySettingsIcon size={size} className={className} />;
    default:
      return <NotepadIcon size={size} className={className} />;
  }
};
