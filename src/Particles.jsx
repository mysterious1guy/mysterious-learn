import React, { useEffect, useRef } from 'react';

class Particle {
  constructor(canvas, ctx, theme) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.baseSize = Math.random() * 2.5 + 0.5;
    this.size = this.baseSize;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.vx = this.speedX;
    this.vy = this.speedY;
    this.pulseSpeed = Math.random() * 0.02 + 0.01;
    this.pulseOffset = Math.random() * Math.PI * 2;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.friction = 0.95;
    this.hue = theme === 'dark'
      ? 210 + Math.random() * 40  // Blue-purple range
      : 0;
  }
  update(time, mouseX, mouseY, isClicking) {
    // Mouse interaction
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      const force = (150 - dist) / 150;
      const multiplier = isClicking ? 15 : 2;
      this.vx += (dx / dist) * force * multiplier;
      this.vy += (dy / dist) * force * multiplier;
    }

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx + this.speedX;
    this.y += this.vy + this.speedY;

    // Pulsing size
    this.size = this.baseSize + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.5;

    // Wrap around
    if (this.x > this.canvas.width + 50) this.x = -50;
    if (this.x < -50) this.x = this.canvas.width + 50;
    if (this.y > this.canvas.height + 50) this.y = -50;
    if (this.y < -50) this.y = this.canvas.height + 50;
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
    let isClicking = false;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    // Interaction listeners
    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const handleMouseDown = () => isClicking = true;
    const handleMouseUp = () => isClicking = false;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const PARTICLE_COUNT = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 10000));
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

      // Draw connections
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
        p.update(time, mouseX, mouseY, isClicking);
        p.draw(time, theme);
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default Particles;