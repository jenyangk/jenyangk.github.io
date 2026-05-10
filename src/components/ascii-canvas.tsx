import { useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";

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
  pulseIntensity: number;
}

export interface AsciiCanvasRef {
  pulseAt: (x: number, y: number, intensity?: number) => void;
  setActivityZone: (zone: string | null) => void;
}

export const AsciiCanvas = forwardRef<AsciiCanvasRef>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cellsRef = useRef<Cell[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);
  const activityZoneRef = useRef<string | null>(null);
  const pulsesRef = useRef<Array<{ x: number; y: number; intensity: number; time: number }>>([]);

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
            pulseIntensity: 0,
          });
        }
      }
    }
    return cells;
  }, []);

  useImperativeHandle(ref, () => ({
    pulseAt: (x: number, y: number, intensity = 1) => {
      pulsesRef.current.push({ x, y, intensity, time: performance.now() });
    },
    setActivityZone: (zone: string | null) => {
      activityZoneRef.current = zone;
    },
  }));

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

      const charSize = 18;
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

    const charSize = 18;
    const now = () => performance.now();

    const draw = () => {
      if (!ctx || !canvas) return;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const mouse = mouseRef.current;
      const cells = cellsRef.current;
      const currentTime = now();

      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const baseColor = isDark ? "245, 240, 230" : "42, 42, 42";
      const zoneColors: Record<string, string> = {
        navigator: "108, 140, 191",
        archivist: "184, 149, 106",
        builder: "255, 107, 107",
        curator: "122, 158, 126",
      };
      const activeZone = activityZoneRef.current;
      const zoneColor = activeZone ? zoneColors[activeZone] || baseColor : baseColor;

      // Clean up old pulses
      pulsesRef.current = pulsesRef.current.filter((p) => currentTime - p.time < 2000);

      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const px = cell.x * charSize;
        const py = cell.y * charSize;

        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 120;
        const mouseInfluence = Math.max(0, 1 - dist / maxDist);

        // Pulse influence from agent activity
        let pulseInfluence = 0;
        for (const pulse of pulsesRef.current) {
          const pdx = pulse.x - px;
          const pdy = pulse.y - py;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          const pmax = 200;
          const age = (currentTime - pulse.time) / 2000;
          const decay = 1 - age;
          if (pdist < pmax && decay > 0) {
            pulseInfluence += Math.max(0, 1 - pdist / pmax) * pulse.intensity * decay;
          }
        }

        if (!reducedMotionRef.current) {
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.04;
          cell.scale += (cell.targetScale - cell.scale) * 0.04;
        } else {
          cell.opacity = cell.targetOpacity;
          cell.scale = cell.targetScale;
        }

        const finalOpacity = Math.min(1, cell.opacity + mouseInfluence * 0.25 + pulseInfluence * 0.4);
        const finalScale = cell.scale + mouseInfluence * 0.15 + pulseInfluence * 0.2;

        if (finalOpacity < 0.01) continue;

        ctx.save();
        ctx.translate(px + charSize / 2, py + charSize / 2);
        ctx.scale(finalScale, finalScale);
        ctx.translate(-(px + charSize / 2), -(py + charSize / 2));

        const color = pulseInfluence > 0.3 || mouseInfluence > 0.5 ? zoneColor : baseColor;
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
      aria-label="ASCII scaffold background"
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.35 }}
    />
  );
});

AsciiCanvas.displayName = "AsciiCanvas";
