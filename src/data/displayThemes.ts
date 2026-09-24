export interface WallpaperOption {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface TitleBarOption {
  id: string;
  name: string;
  start: string;
  end: string;
  textColor?: string;
  description: string;
}

export interface SchemePreset {
  id: string;
  name: string;
  wallpaperId: string;
  titleBarId: string;
}

export const WALLPAPER_OPTIONS: WallpaperOption[] = [
  { id: 'classic-teal', name: 'Windows 98 Teal', color: '#008080', description: 'Original Classic Default' },
  { id: 'windows-navy', name: 'Windows Navy', color: '#000080', description: 'Deep Microsoft Navy Blue' },
  { id: 'emerald-green', name: 'Emerald Forest', color: '#005030', description: 'Rich Forest Pine' },
  { id: 'slate-blue', name: 'Slate Blue', color: '#2c3e50', description: 'Subtle Modern Dark Slate' },
  { id: 'midnight-plum', name: 'Midnight Plum', color: '#4a154b', description: 'Deep Royal Purple' },
  { id: 'desert-clay', name: 'Desert Burgundy', color: '#702929', description: 'Warm Terracotta Brick' },
  { id: 'cyberpunk-dark', name: 'Cyberpunk Charcoal', color: '#141416', description: 'Terminal Stealth Black' },
  { id: 'windows-olive', name: 'Windows 95 Olive', color: '#556b2f', description: 'Classic Vintage Khaki' },
  { id: 'periwinkle', name: 'Soft Periwinkle', color: '#486581', description: 'Calm Dusty Blue' },
  { id: 'vapor-magenta', name: 'Vaporwave Magenta', color: '#6d28d9', description: 'Retro Synth Accent' },
  { id: 'amber-bronze', name: 'Amber Bronze', color: '#78350f', description: 'Vintage Amber Glow' },
];

export const TITLE_BAR_OPTIONS: TitleBarOption[] = [
  {
    id: 'win-standard',
    name: 'Windows Standard (Navy → Azure)',
    start: '#000080',
    end: '#1084d0',
    textColor: '#ffffff',
    description: 'Classic Windows 98 Dual Gradient',
  },
  {
    id: 'desert-crimson',
    name: 'Desert Crimson (Wine → Red)',
    start: '#800000',
    end: '#cc3333',
    textColor: '#ffffff',
    description: 'Warm Desert Red Palette',
  },
  {
    id: 'emerald-forest',
    name: 'Emerald Forest (Pine → Green)',
    start: '#004d20',
    end: '#10b981',
    textColor: '#ffffff',
    description: 'Lush Pine Gradient',
  },
  {
    id: 'royal-purple',
    name: 'Royal Velvet (Plum → Purple)',
    start: '#4a0072',
    end: '#8e24aa',
    textColor: '#ffffff',
    description: 'Majestic Regal Purple',
  },
  {
    id: 'amber-gold',
    name: 'Cyber Amber (Bronze → Gold)',
    start: '#78350f',
    end: '#f59e0b',
    textColor: '#ffffff',
    description: 'Retro Amber Monitor',
  },
  {
    id: 'slate-steel',
    name: 'Slate Steel (Obsidian → Steel)',
    start: '#1e293b',
    end: '#64748b',
    textColor: '#ffffff',
    description: 'Modern Minimalist Slate',
  },
  {
    id: 'matrix-terminal',
    name: 'Matrix Terminal (Dark → Neon Green)',
    start: '#022c22',
    end: '#15803d',
    textColor: '#ffffff',
    description: 'Cybersecurity Hacker Green',
  },
  {
    id: 'neon-cyan',
    name: 'Ocean Cyan (Deep Sea → Electric Cyan)',
    start: '#083344',
    end: '#06b6d4',
    textColor: '#ffffff',
    description: 'Vibrant Cool Ocean',
  },
  {
    id: 'rose-magenta',
    name: 'Rose Quartz (Berry → Rose)',
    start: '#831843',
    end: '#f43f5e',
    textColor: '#ffffff',
    description: 'Soft Vintage Rose',
  },
  {
    id: 'monochrome',
    name: 'Monochrome (Black → Zinc)',
    start: '#18181b',
    end: '#52525b',
    textColor: '#ffffff',
    description: 'High Contrast Neutral',
  },
];

export const SCHEME_PRESETS: SchemePreset[] = [
  { id: 'classic', name: 'Windows 98 Default', wallpaperId: 'classic-teal', titleBarId: 'win-standard' },
  { id: 'desert', name: 'Desert 98', wallpaperId: 'desert-clay', titleBarId: 'desert-crimson' },
  { id: 'emerald', name: 'Emerald Isle', wallpaperId: 'emerald-green', titleBarId: 'emerald-forest' },
  { id: 'matrix', name: 'Matrix Hacker', wallpaperId: 'cyberpunk-dark', titleBarId: 'matrix-terminal' },
  { id: 'royal', name: 'Royal Amethyst', wallpaperId: 'midnight-plum', titleBarId: 'royal-purple' },
  { id: 'cyber', name: 'Cyberpunk Neon', wallpaperId: 'slate-blue', titleBarId: 'neon-cyan' },
  { id: 'steel', name: 'High Tech Slate', wallpaperId: 'cyberpunk-dark', titleBarId: 'slate-steel' },
  { id: 'vintage', name: 'Amber Terminal', wallpaperId: 'amber-bronze', titleBarId: 'amber-gold' },
];
