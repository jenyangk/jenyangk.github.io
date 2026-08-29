import { useRef, useEffect, useCallback } from "react";

const SCAFFOLD_CHARS = ["│", "─", "┌", "┐", "└", "┘", "├", "┤", "┬", "┴", "┼"];
const JUNCTION_CHARS = ["┌", "┐", "└", "┘", "├", "┤", "┬", "┴", "┼"];

interface Cell {
  char: string;
  x: number;
  y: number;
  opacity: number;
  targetOpacity: number;
  scale: number;
  targetScale: number;
}

export function AsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Cell[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  const buildGrid = useCallback((cols: number, rows: number) => {
    const cells: Cell[] = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const isVerticalPipe = col % 4 === 0;
        const isHorizontalPipe = row % 4 === 0;
        let char = " ";

        if (isVerticalPipe && isHorizontalPipe) {
          char = JUNCTION_CHARS[Math.floor(Math.random() * JUNCTION_CHARS.length)];
        } else if (isVerticalPipe) {
          char = "│";
        } else if (isHorizontalPipe) {
          char = "─";
        } else if (Math.random() < 0.06) {
          char = SCAFFOLD_CHARS[Math.floor(Math.random() * SCAFFOLD_CHARS.length)];
        }

        if (char !== " ") {
          cells.push({
            char,
            x: col,
            y: row,
            opacity: 0,
            targetOpacity: 0.08 + Math.random() * 0.2,
            scale: 0,
            targetScale: 1,
          });
        }
      }
    }
    return cells;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
    const charSize = isMobile ? 24 : 18;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(rect.width / charSize) + 1;
      const rows = Math.ceil(rect.height / charSize) + 1;
      cellsRef.current = buildGrid(cols, rows);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let isVisible = true;
    // Follow the site theme (.dark class on <html>), not the OS preference
    let isDark = document.documentElement.classList.contains("dark");
    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const baseColor = () => isDark ? "245, 240, 230" : "42, 42, 42";

    const draw = () => {
      if (!ctx || !canvas) return;
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const cells = cellsRef.current;
      const bc = baseColor();

      ctx.font = `${charSize}px "JetBrains Mono", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const px = cell.x * charSize;
        const py = cell.y * charSize;

        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const distSq = dx * dx + dy * dy;
        const maxDist = 120;
        const mouseInfluence = distSq < maxDist * maxDist
          ? Math.max(0, 1 - Math.sqrt(distSq) / maxDist)
          : 0;

        // Pulse influence removed
        if (!reducedMotionRef.current) {
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.04;
          cell.scale += (cell.targetScale - cell.scale) * 0.04;
        } else {
          cell.opacity = cell.targetOpacity;
          cell.scale = cell.targetScale;
        }

        const finalOpacity = Math.min(1, cell.opacity + mouseInfluence * 0.25);
        const finalScale = cell.scale + mouseInfluence * 0.15;

        if (finalOpacity < 0.01) continue;

        const color = bc;
        ctx.fillStyle = `rgba(${color}, ${finalOpacity})`;

        if (finalScale !== 1) {
          ctx.save();
          ctx.translate(px + charSize / 2, py + charSize / 2);
          ctx.scale(finalScale, finalScale);
          ctx.translate(-(px + charSize / 2), -(py + charSize / 2));
          ctx.fillText(cell.char, px + charSize / 2, py + charSize / 2 + 1);
          ctx.restore();
        } else {
          ctx.fillText(cell.char, px + charSize / 2, py + charSize / 2 + 1);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    if (!reducedMotionRef.current) {
      draw();
    } else {
      // Single render for reduced motion
      draw();
      cancelAnimationFrame(rafRef.current);
    }

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      themeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [buildGrid]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="ASCII scaffold background"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.35 }}
    />
  );
}
