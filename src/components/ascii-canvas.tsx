import { useEffect, useRef } from "react";

// Ascending ink density. Rung 0 (space) is never drawn; the empty look
// comes from skipping cells rather than clearing them.
const LADDER = [" ", ".", "·", ":", "+", "*", "▒", "▓", "█"];

// Per-frame drift: lattice knots ease toward a fresh random target each
// tick. mulberry32 keeps the whole field deterministic per page load.
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function AsciiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const rand = mulberry32((Date.now() * 2654435761) >>> 0);

    let cell = 10;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    // Coarse noise lattice at 1/8 the cell-grid resolution, two octaves.
    let latticeW = 0;
    let latticeH = 0;
    let lattice: Float32Array = new Float32Array(0);
    let latticeTarget: Float32Array = new Float32Array(0);
    // Per-cell current rung: lets us skip unchanged cells between frames.
    let rungs: Uint8Array = new Uint8Array(0);

    let isDark = document.documentElement.classList.contains("dark");
    let px = -1e4;
    let py = -1e4;
    let bump = 0; // 1 → 0 decay after the cursor stops feeding it

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cell = window.innerWidth < 768 ? 12 : 10;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / cell);
      rows = Math.ceil(h / cell);
      rungs = new Uint8Array(cols * rows);
      latticeW = Math.floor(cols / 8) + 2;
      latticeH = Math.floor(rows / 8) + 2;
      lattice = new Float32Array(latticeW * latticeH);
      latticeTarget = new Float32Array(latticeW * latticeH);
      for (let i = 0; i < lattice.length; i++) {
        lattice[i] = rand();
        latticeTarget[i] = rand();
      }

      draw(0);
    };

    // Sample the lattice bilinearly at cell (cx, cy) mapped into lattice
    // space, adding octave 2 at 2x frequency / 0.5 weight.
    const sample = (cx: number, cy: number) => {
      const v =
        0.667 * sampleOctave(cx / 8, cy / 8, latticeW, latticeH, 0) +
        0.333 * sampleOctave(cx / 4, cy / 4, latticeW, latticeH, 0);
      return v;
    };

    const sampleOctave = (
      fx: number,
      fy: number,
      lw: number,
      lh: number,
      _o: number,
    ) => {
      const x0 = Math.floor(fx);
      const y0 = Math.floor(fy);
      const tx = fx - x0;
      const ty = fy - y0;
      // Wrap instead of clamping so the right edge has knots to blend to.
      const x1 = (x0 + 1) % lw;
      const y1 = (y0 + 1) % lh;
      const xs = x0 % lw;
      const ys = y0 % lh;
      const v00 = lattice[ys * lw + xs];
      const v10 = lattice[ys * lw + x1];
      const v01 = lattice[y1 * lw + xs];
      const v11 = lattice[y1 * lw + x1];
      // Smoothstep for softer pools.
      const sx = tx * tx * (3 - 2 * tx);
      const sy = ty * ty * (3 - 2 * ty);
      const a = v00 + (v10 - v00) * sx;
      const b = v01 + (v11 - v01) * sx;
      return a + (b - a) * sy;
    };

    const draw = (dt: number) => {
      const color = isDark ? "245, 240, 230" : "42, 42, 42";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${cell}px "JetBrains Mono", monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";

      // Cursor bump: rises while the pointer is inside r=80px, decays
      // with a ~1s time constant once it moves on.
      if (!reducedMotion && px > -100) {
        bump += (1 - bump) * Math.min(1, dt * 6);
      } else {
        bump *= Math.exp(-dt / 1);
      }

      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          let noise = sample(cx, cy);

          if (bump > 0.01) {
            const dx = cx * cell - px;
            const dy = cy * cell - py;
            const d2 = dx * dx + dy * dy;
            const R = 80;
            if (d2 < R * R) {
              noise += 0.2 * bump * Math.exp((-d2 / (R * R)) * 3);
            }
          }

          let rung = Math.floor(noise * LADDER.length);
          if (rung < 0) rung = 0;
          if (rung > 8) rung = 8;
          if (rung === 0) continue;
          const i = cy * cols + cx;
          if (rung === rungs[i]) continue;

          rungs[i] = rung;
          ctx.fillStyle = `rgba(${color}, ${(rung / 8) * 0.25})`;
          ctx.fillText(LADDER[rung], cx * cell, cy * cell);
        }
      }
    };

    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      // Lattice knots lerp toward their targets; new targets each frame
      // keep the drift from ever settling.
      for (let i = 0; i < lattice.length; i++) {
        latticeTarget[i] += (rand() - 0.5) * 0.08;
        if (latticeTarget[i] < 0) latticeTarget[i] = 0;
        if (latticeTarget[i] > 1) latticeTarget[i] = 1;
        lattice[i] += (latticeTarget[i] - lattice[i]) * 0.06;
      }

      draw(dt);
    };

    const onMove = (e: MouseEvent) => {
      px = e.clientX;
      py = e.clientY;
    };

    const applyTheme = () => {
      const dark =
        document.documentElement.classList.contains("dark") ||
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      // The toggle sets .light/.dark explicitly, so class first; the
      // matchMedia branch only fires before a class is set.
      isDark = document.documentElement.classList.contains("dark")
        ? true
        : document.documentElement.classList.contains("light")
          ? false
          : dark;
    };

    applyTheme();

    // Full redraw on theme flip: unchanged-rung cells may still need a
    // new ink color.
    const repaintAll = () => {
      rungs.fill(0);
      draw(0);
    };

    const themeObserver = new MutationObserver(() => {
      applyTheme();
      repaintAll();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemTheme = () => {
      applyTheme();
      repaintAll();
    };
    darkQuery.addEventListener("change", onSystemTheme);

    resize();

    let interval: ReturnType<typeof setInterval> | null = null;
    if (!reducedMotion) {
      interval = setInterval(tick, 100);
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    let debounce: ReturnType<typeof setTimeout> | null = null;
    const onResize = () => {
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        rungs.fill(0); // new grid shape: force full redraw
        resize();
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (interval) clearInterval(interval);
      if (debounce) clearTimeout(debounce);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      themeObserver.disconnect();
      darkQuery.removeEventListener("change", onSystemTheme);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="ASCII density field background"
      className="fixed inset-0 z-0 h-full w-full pointer-events-none"
      style={{ opacity: 0.35 }}
    />
  );
}