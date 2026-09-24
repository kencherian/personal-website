import React, { useEffect, useRef } from 'react';
import { StarfieldCanvas } from '../common/StarfieldCanvas';

export type ScreenSaverMode = 'none' | 'stars' | 'blank';

interface ScreenSaverOverlayProps {
  mode: ScreenSaverMode;
  onDismiss: () => void;
}

export const ScreenSaverOverlay: React.FC<ScreenSaverOverlayProps> = ({ mode, onDismiss }) => {
  const initialMousePos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Grace period of 300ms so initial trigger click doesn't dismiss instantly
    let active = false;
    const graceTimer = setTimeout(() => {
      active = true;
    }, 300);

    const handleKeyDown = () => {
      if (!active) return;
      onDismiss();
    };

    const handleMouseDown = () => {
      if (!active) return;
      onDismiss();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!active) return;
      if (!initialMousePos.current) {
        initialMousePos.current = { x: e.clientX, y: e.clientY };
        return;
      }
      const dx = Math.abs(e.clientX - initialMousePos.current.x);
      const dy = Math.abs(e.clientY - initialMousePos.current.y);
      // Only dismiss if mouse deliberately moved more than 6 pixels
      if (dx > 6 || dy > 6) {
        onDismiss();
      }
    };

    const handleTouch = () => {
      if (!active) return;
      onDismiss();
    };

    window.addEventListener('keydown', handleKeyDown, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('wheel', handleMouseDown, { passive: true });

    return () => {
      clearTimeout(graceTimer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('wheel', handleMouseDown);
    };
  }, [onDismiss]);

  if (mode === 'none') return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-[999999] select-none cursor-none overflow-hidden">
      {mode === 'stars' && <StarfieldCanvas speed={5.5} starCount={350} />}
      {mode === 'blank' && <div className="w-full h-full bg-black" />}
    </div>
  );
};
