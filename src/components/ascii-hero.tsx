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

export const ASCIIHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Cell[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  const buildGrid = useCallback((cols: number, rows: number) => {
    const cells: Cell[] = [];
    // Create a scaffold-like grid structure
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
        } else if (Math.random() < 0.08) {
          // Random accent characters
          char = SCAFFOLD_CHARS[Math.floor(Math.random() * SCAFFOLD_CHARS.length)];
        }

        if (char !== " ") {
          cells.push({
            char,
            x: col,
            y: row,
            opacity: 0,
            targetOpacity: 0.15 + Math.random() * 0.35,
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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      const charSize = 16;
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

    const charSize = 16;
    let frameCount = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const cells = cellsRef.current;
      frameCount++;

      // Determine text color based on current theme
      const isDark = document.documentElement.classList.contains("dark");
      const baseColor = isDark ? "254, 251, 241" : "0, 0, 0";
      const accentColor = "255, 107, 0"; // safety orange

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const px = cell.x * charSize;
        const py = cell.y * charSize;

        // Distance from mouse for parallax
        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;
        const influence = Math.max(0, 1 - dist / maxDist);

        // Animate opacity and scale
        if (!reducedMotionRef.current) {
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.05;
          cell.scale += (cell.targetScale - cell.scale) * 0.05;
        } else {
          cell.opacity = cell.targetOpacity;
          cell.scale = cell.targetScale;
        }

        const finalOpacity = cell.opacity + influence * 0.3;
        const finalScale = cell.scale + influence * 0.2;

        if (finalOpacity < 0.01) continue;

        ctx.save();
        ctx.translate(px + charSize / 2, py + charSize / 2);
        ctx.scale(finalScale, finalScale);
        ctx.translate(-(px + charSize / 2), -(py + charSize / 2));

        // Use accent color for cells near mouse
        const isAccent = influence > 0.5 && frameCount % 60 < 30;
        const color = isAccent ? accentColor : baseColor;
        ctx.fillStyle = `rgba(${color}, ${finalOpacity})`;
        ctx.font = `${charSize}px "JetBrains Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(cell.char, px + charSize / 2, py + charSize / 2 + 1);

        ctx.restore();
      }

      if (!reducedMotionRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [buildGrid]);

  return (
    <canvas
      ref={canvasRef}
      aria-label="ASCII scaffold animation"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};
