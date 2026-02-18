import React, { useEffect, useRef } from 'react';

class Particle {
  constructor(canvas, ctx, theme) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseSize = Math.random() * 2.5 + 0.5;
    this.size = this.baseSize;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
    this.pulseOffset = Math.random() * Math.PI * 2;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.hue = theme === 'dark'
      ? 210 + Math.random() * 40  // Blue-purple range
      : 0;
  }
  update(time, mouseX, mouseY) {
    // Mouse repulsion
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      const force = (150 - dist) / 150;
      this.x += (dx / dist) * force * 2;
      this.y += (dy / dist) * force * 2;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    // Pulsing size
    this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.5;

    // Wrap around
    if (this.x > this.canvas.width + 10) this.x = -10;
    if (this.x < -10) this.x = this.canvas.width + 10;
    if (this.y > this.canvas.height + 10) this.y = -10;
    if (this.y < -10) this.y = this.canvas.height + 10;
  }
  draw(time, theme) {
    const pulsedOpacity = this.opacity + Math.sin(time * 0.003 + this.pulseOffset) * 0.1;
    if (theme === 'dark') {
      this.ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, ${pulsedOpacity})`;
    } else {
      this.ctx.fillStyle = `rgba(0, 0, 0, ${pulsedOpacity * 0.3})`;
    }
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

const Particles = ({ theme }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesList = [];
    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Mouse interaction
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const PARTICLE_COUNT = 120;
    const CONNECTION_DISTANCE = 120;

    const initParticles = () => {
      particlesList = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesList.push(new Particle(canvas, ctx, theme));
      }
    };
    initParticles();

    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections (constellation effect)
      for (let i = 0; i < particlesList.length; i++) {
        for (let j = i + 1; j < particlesList.length; j++) {
          const dx = particlesList[i].x - particlesList[j].x;
          const dy = particlesList[i].y - particlesList[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15;
            ctx.strokeStyle = theme === 'dark'
              ? `rgba(99, 130, 246, ${opacity})`
              : `rgba(0, 0, 0, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesList[i].x, particlesList[i].y);
            ctx.lineTo(particlesList[j].x, particlesList[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particlesList.forEach(p => {
        p.update(time, mouseX, mouseY);
        p.draw(time, theme);
      });

      // Draw mouse attraction zone (subtle glow)
      if (mouseX > 0 && mouseY > 0) {
        const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(mouseX - 100, mouseY - 100, 200, 200);
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default Particles;