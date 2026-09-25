import React, { useRef, useEffect } from 'react';

export type StarBlinkSpeed = 'none' | 'slow' | 'normal' | 'fast' | 'hyper';

interface StarfieldCanvasProps {
  className?: string;
  speed?: number;
  starCount?: number;
  starTrailing?: boolean;
  blinkSpeed?: StarBlinkSpeed;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  size: number;
  color: string;
  twinklePhase: number;
  twinkleSpeed: number;
}

export const StarfieldCanvas: React.FC<StarfieldCanvasProps> = ({
  className = '',
  speed = 4,
  starCount = 240,
  starTrailing = true,
  blinkSpeed = 'normal',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 200);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 300;
      height = canvas.height = canvas.parentElement?.clientHeight || 200;
    };

    window.addEventListener('resize', handleResize);

    const maxDepth = 1000;
    const stars: Star[] = [];

    const starColors = ['#ffffff', '#ffffff', '#e0f2fe', '#fef08a', '#ffffff', '#fed7aa'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * maxDepth,
        pz: maxDepth,
        size: Math.random() * 1.5 + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.08 + 0.04,
      });
    }

    // Blink speed multiplier
    const blinkMultiplier =
      blinkSpeed === 'none'
        ? 0
        : blinkSpeed === 'slow'
        ? 0.5
        : blinkSpeed === 'hyper'
        ? 5.0 // Twice as fast as Fast (2.5 * 2 = 5.0)
        : blinkSpeed === 'fast'
        ? 2.5
        : 1.0;

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = maxDepth;
          star.pz = maxDepth;
          star.twinklePhase = Math.random() * Math.PI * 2;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        const pk = 250 / star.pz;
        const prevX = star.x * pk + cx;
        const prevY = star.y * pk + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthRatio = 1 - star.z / maxDepth;
          let radius = Math.max(0.6, star.size * depthRatio * 2.2);

          // Calculate blink/twinkle factor
          let alpha = 1;
          if (blinkMultiplier > 0) {
            star.twinklePhase += star.twinkleSpeed * blinkMultiplier;
            const sinVal = Math.sin(star.twinklePhase);
            // Oscillate alpha between 0.25 and 1.0
            alpha = 0.25 + 0.75 * ((sinVal + 1) / 2);
            // Slight radius twinkle pulsation
            radius = radius * (0.8 + 0.3 * alpha);
          }

          ctx.save();
          ctx.globalAlpha = Math.min(1, Math.max(0.1, alpha));

          // Star Trailing Effect: only render streaks if starTrailing is enabled
          if (starTrailing) {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = radius;
            ctx.stroke();
          }

          // Star head / celestial point
          ctx.beginPath();
          ctx.arc(px, py, starTrailing ? radius * 0.7 : radius * 0.9, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.fill();

          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed, starCount, starTrailing, blinkSpeed]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
};

