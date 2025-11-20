
import React, { useEffect, useRef } from 'react';

const Background: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Starfield Warp Speed Effect
    const stars: { x: number; y: number; z: number; size: number }[] = [];
    const numStars = 800;
    const speed = 8; // Increased speed from 2 to 8 for Warp Effect
    const focalLength = canvas.width;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5
      });
    }

    let animationFrameId: number;

    const animate = () => {
      // Clear with fade effect for trails
      ctx.fillStyle = "rgba(2, 4, 10, 0.5)"; // Matches new Dark Navy bg
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        // Move star closer
        star.z -= speed;

        // Reset star if it passes camera
        if (star.z <= 0) {
          star.z = width;
          star.x = Math.random() * width - width / 2;
          star.y = Math.random() * height - height / 2;
        }

        // Project 3D to 2D
        const scale = focalLength / star.z;
        const x = cx + star.x * scale;
        const y = cy + star.y * scale;
        
        // Calculate radius based on depth (perspective)
        const radius = star.size * scale * 0.005;

        // Safety check to prevent IndexSizeError (negative or infinite radius)
        if (radius > 0 && Number.isFinite(radius) && x > -100 && x < width + 100 && y > -100 && y < height + 100) {
            ctx.beginPath();
            // Electric Blue / Cyan / White mix for stars
            const alpha = Math.min(1, scale * 0.001);
            ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '0, 136, 255' : '0, 217, 255'}, ${alpha})`; 
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#02040a]" 
    />
  );
};

export default Background;
