import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  pulsePhase: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function HeroInteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animationFrameId: number;
      const getValidWidth = () => Math.max(320, canvas.parentElement?.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 800));
      const getValidHeight = () => Math.max(320, canvas.parentElement?.clientHeight || 600);

      let width = (canvas.width = getValidWidth());
      let height = (canvas.height = getValidHeight());

      const handleResize = () => {
        try {
          if (!canvas || !canvas.parentElement) return;
          width = canvas.width = getValidWidth();
          height = canvas.height = getValidHeight();
        } catch {}
      };

      window.addEventListener('resize', handleResize);

      // Color palette matching Optenary brand: Electric Blue, Cyan, Purple
      const colors = ['#3b82f6', '#06b6d4', '#a855f7', '#60a5fa', '#22d3ee'];

      // Initialize nodes
      const nodeCount = Math.max(12, Math.min(32, Math.floor((width * height) / 20000)));
      const nodes: Node[] = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * (width - 40) + 20,
          y: Math.random() * (height - 40) + 20,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          baseRadius: Math.random() * 1.5 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      const mouse = {
        x: width / 2,
        y: height / 2,
        targetX: width / 2,
        targetY: height / 2,
        isHovered: false,
      };

      const pulseWaves: PulseWave[] = [];

      const handleMouseMove = (e: MouseEvent) => {
        try {
          const rect = canvas.getBoundingClientRect();
          const clientX = e.clientX - rect.left;
          const clientY = e.clientY - rect.top;
          if (Number.isFinite(clientX) && Number.isFinite(clientY)) {
            mouse.targetX = clientX;
            mouse.targetY = clientY;
            mouse.isHovered = true;
          }
        } catch {}
      };

      const handleMouseLeave = () => {
        mouse.isHovered = false;
      };

      const handleClick = (e: MouseEvent) => {
        try {
          const rect = canvas.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;
          if (!Number.isFinite(clickX) || !Number.isFinite(clickY)) return;

          pulseWaves.push({
            x: clickX,
            y: clickY,
            radius: 5,
            maxRadius: Math.max(width, height) * 0.5,
            alpha: 0.8,
          });

          // Scatter nearby nodes safely
          for (const node of nodes) {
            const dx = node.x - clickX;
            const dy = node.y - clickY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180 && dist > 1) {
              const force = (180 - dist) / 180;
              node.vx += (dx / dist) * force * 3;
              node.vy += (dy / dist) * force * 3;
            }
          }
        } catch {}
      };

      const parent = canvas.parentElement;
      parent?.addEventListener('mousemove', handleMouseMove);
      parent?.addEventListener('mouseleave', handleMouseLeave);
      parent?.addEventListener('click', handleClick);

      let time = 0;

      const render = () => {
        try {
          time += 0.02;
          ctx.clearRect(0, 0, width, height);

          // Smooth mouse interpolation with NaN checks
          if (Number.isFinite(mouse.targetX) && Number.isFinite(mouse.targetY)) {
            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;
          }

          // Draw subtle ambient glow behind mouse
          if (mouse.isHovered && Number.isFinite(mouse.x) && Number.isFinite(mouse.y)) {
            try {
              const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
              mouseGlow.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
              mouseGlow.addColorStop(0.5, 'rgba(59, 130, 246, 0.04)');
              mouseGlow.addColorStop(1, 'transparent');
              ctx.fillStyle = mouseGlow;
              ctx.fillRect(0, 0, width, height);
            } catch {}
          }

          // Update and draw pulse waves
          for (let i = pulseWaves.length - 1; i >= 0; i--) {
            const wave = pulseWaves[i];
            wave.radius += 4;
            wave.alpha = Math.max(0, 0.8 * (1 - wave.radius / wave.maxRadius));

            if (wave.alpha <= 0.01 || wave.radius >= wave.maxRadius) {
              pulseWaves.splice(i, 1);
              continue;
            }

            if (Number.isFinite(wave.x) && Number.isFinite(wave.y) && Number.isFinite(wave.radius) && wave.radius > 0) {
              ctx.save();
              ctx.beginPath();
              ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
              ctx.strokeStyle = `rgba(6, 182, 212, ${wave.alpha})`;
              ctx.lineWidth = 1.5;
              ctx.stroke();
              ctx.restore();
            }
          }

          // Update node positions
          for (const node of nodes) {
            if (!Number.isFinite(node.x) || !Number.isFinite(node.y)) {
              node.x = Math.random() * (width - 40) + 20;
              node.y = Math.random() * (height - 40) + 20;
              node.vx = 0;
              node.vy = 0;
            }

            node.x += node.vx;
            node.y += node.vy;

            node.vx *= 0.985;
            node.vy *= 0.985;

            // Safe boundary checks
            if (node.x < 15) {
              node.x = 15;
              node.vx = Math.abs(node.vx);
            } else if (node.x > width - 15) {
              node.x = width - 15;
              node.vx = -Math.abs(node.vx);
            }

            if (node.y < 15) {
              node.y = 15;
              node.vy = Math.abs(node.vy);
            } else if (node.y > height - 15) {
              node.y = height - 15;
              node.vy = -Math.abs(node.vy);
            }

            // Mouse interaction
            if (mouse.isHovered && Number.isFinite(mouse.x) && Number.isFinite(mouse.y)) {
              const dx = mouse.x - node.x;
              const dy = mouse.y - node.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 140 && dist > 1) {
                const force = (140 - dist) / 140;
                node.vx += (dx / dist) * force * 0.12;
                node.vy += (dy / dist) * force * 0.12;
              }
            }
          }

          // Draw connection lines
          for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
              const n1 = nodes[i];
              const n2 = nodes[j];
              const dx = n1.x - n2.x;
              const dy = n1.y - n2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              const maxDist = 135;
              if (dist < maxDist && dist > 0) {
                const alpha = (1 - dist / maxDist) * 0.25;
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Occasional traveling data particle
                const packetPos = (time * 0.4 + (i * 7 + j)) % 1;
                const px = n1.x + (n2.x - n1.x) * packetPos;
                const py = n1.y + (n2.y - n1.y) * packetPos;
                if (Number.isFinite(px) && Number.isFinite(py)) {
                  ctx.beginPath();
                  ctx.arc(px, py, 1.2, 0, Math.PI * 2);
                  ctx.fillStyle = `rgba(34, 211, 238, ${alpha * 1.5})`;
                  ctx.fill();
                }
              }
            }
          }

          // Draw nodes
          for (const node of nodes) {
            const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.5 + 0.5;
            const currentRadius = Math.max(1, node.baseRadius + pulse * 1.5);

            ctx.beginPath();
            ctx.arc(node.x, node.y, currentRadius + 3, 0, Math.PI * 2);
            ctx.fillStyle = node.color === '#06b6d4' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(59, 130, 246, 0.15)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();
          }
        } catch (err) {
          console.warn('Canvas render caught safely:', err);
        }

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        parent?.removeEventListener('mousemove', handleMouseMove);
        parent?.removeEventListener('mouseleave', handleMouseLeave);
        parent?.removeEventListener('click', handleClick);
      };
    } catch (err) {
      console.warn('HeroInteractiveCanvas initialization error caught safely:', err);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair opacity-75"
    />
  );
}
