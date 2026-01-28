import React, { useEffect, useRef } from 'react';

interface BackgroundProps {
  sectionColor: string; // Hex color expected
}

// Helper to interpolate colors
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

const Background: React.FC<BackgroundProps> = ({ sectionColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetColorRef = useRef(sectionColor);
  const currentColorRef = useRef(sectionColor);

  useEffect(() => {
    targetColorRef.current = sectionColor;
  }, [sectionColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: Particle[] = [];

    // Configuration
    const particleCount = Math.min(100, Math.floor((width * height) / 15000));
    const connectionDistance = 150;
    const mouseDistance = 200;

    // Mouse State
    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.baseAlpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(rgbColor: { r: number, g: number, b: number }) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${this.baseAlpha})`;
        ctx.fill();

        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)`;
      }
    }

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate global color towards target
      const targetRgb = hexToRgb(targetColorRef.current) || { r: 14, g: 165, b: 233 }; // Default Blue
      const currentRgb = hexToRgb(currentColorRef.current) || { r: 14, g: 165, b: 233 };

      // Smooth lerp for color transition (0.05 factor for smooth fade)
      const nextR = lerp(currentRgb.r, targetRgb.r, 0.05);
      const nextG = lerp(currentRgb.g, targetRgb.g, 0.05);
      const nextB = lerp(currentRgb.b, targetRgb.b, 0.05);

      // Update ref hex for next frame
      const toHex = (n: number) => Math.round(n).toString(16).padStart(2, '0');
      currentColorRef.current = `#${toHex(nextR)}${toHex(nextG)}${toHex(nextB)}`;

      const animatedRgb = { r: Math.round(nextR), g: Math.round(nextG), b: Math.round(nextB) };

      // Optional: Draw subtle grid with current tint
      ctx.strokeStyle = `rgba(${animatedRgb.r}, ${animatedRgb.g}, ${animatedRgb.b}, 0.05)`;
      ctx.lineWidth = 0.5;

      particles.forEach((p, index) => {
        p.update();
        p.draw(animatedRgb);

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const opacity = 1 - distance / connectionDistance;
            ctx.strokeStyle = `rgba(${animatedRgb.r}, ${animatedRgb.g}, ${animatedRgb.b}, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        // Connect to mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distMouse = Math.sqrt(dx * dx + dy * dy);

        if (distMouse < mouseDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = 1 - distMouse / mouseDistance;
          ctx.strokeStyle = `rgba(${animatedRgb.r}, ${animatedRgb.g}, ${animatedRgb.b}, ${opacity * 0.5})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          if (distMouse > 50) {
            p.x -= dx * 0.01;
            p.y -= dy * 0.01;
          }
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []); // Color dep intentionally omitted from effect, handled via refs for animation loop

  return (
    <div className="fixed inset-0 z-0 w-full h-full pointer-events-none bg-[#02040a] transition-colors duration-1000">
      {/* Dynamic Background Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-20 transition-colors duration-1000 ease-in-out"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${sectionColor} 0%, transparent 70%)`
        }}
      />
      <canvas
        ref={canvasRef}
        className="block relative z-10"
      />
    </div>
  );
};

export default Background;
