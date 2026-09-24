export type WindowId = 
  | 'notepad' 
  | 'terminal' 
  | 'explorer' 
  | 'resume' 
  | 'mail' 
  | 'minesweeper' 
  | 'shutdown';

export interface WindowState {
  id: WindowId;
  title: string;
  iconName: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
}

export type ProjectCategory = 
  | 'Cybersecurity'
  | 'Full-Stack'
  | 'Machine-Learning'
  | 'Data-Visualization';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  repoUrl: string;
  liveUrl?: string;
  tags: string[];
  fileSize: string;
  dateModified: string;
  highlights: string[];
  iconType: 'exe' | 'folder' | 'doc' | 'code';
}

export interface DesktopIconItem {
  id: string;
  title: string;
  iconName: string;
  targetWindow?: WindowId;
  action?: () => void;
  x?: number;
  y?: number;
}
