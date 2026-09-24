import { useState, useEffect } from 'react';
import { Desktop } from './components/desktop/Desktop';
import { ClassicResumeView } from './components/classic/ClassicResumeView';

export default function App() {
  // Mobile auto-detection: if screen width < 768px, default to Classic Resume View
  const [viewMode, setViewMode] = useState<'os' | 'classic'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return 'classic';
    }
    return 'os';
  });

  // Listen to window resize for first-time orientation changes
  useEffect(() => {
    const handleResize = () => {
      // If user hasn't explicitly chosen yet or if viewport becomes tiny
      // we maintain user's explicit choice, but keep body overflow consistent
      if (viewMode === 'os') {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  return (
    <div className="w-full min-h-screen">
      {viewMode === 'os' ? (
        <Desktop onSwitchToClassic={() => setViewMode('classic')} />
      ) : (
        <ClassicResumeView onSwitchToDesktopOS={() => setViewMode('os')} />
      )}
    </div>
  );
}
