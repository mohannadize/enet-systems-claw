import { useEffect, useRef } from "react";

// ── Constants ──────────────────────────────────────────────────────────────────
const COLS = 20;
const ROWS = 20;
const N = ROWS * COLS;
const PATTERN_MS = 3000;   // ms each pattern is shown
const TRANS_MS = 500;      // ms for each cell's own fade
const MAX_DELAY = 400;     // max per-cell stagger delay
const TRAIL_MS = 600;      // ms for trail to fully fade
const TRAIL_MAX = 15;      // max trail entries kept
const WAVE_IDX = 6;        // virtual index of wave pattern
const TOTAL = 7;           // 6 static + 1 wave

// ── Types ──────────────────────────────────────────────────────────────────────
type Grid = Uint8Array; // flat row-major: index = r * COLS + c
interface TrailEntry { idx: number; ts: number }

// ── Pattern builders (computed once at module load) ────────────────────────────
function buildPatterns(): Grid[] {
  const g = () => new Uint8Array(N);
  const set = (grid: Grid, r: number, c: number) => {
    if (r >= 0 && r < ROWS && c >= 0 && c < COLS) grid[r * COLS + c] = 1;
  };
  const scale = (bmp: number[][], s: number, ro: number, co: number): Grid => {
    const grid = g();
    for (let r = 0; r < bmp.length; r++)
      for (let c = 0; c < bmp[r].length; c++)
        if (bmp[r][c])
          for (let dr = 0; dr < s; dr++)
            for (let dc = 0; dc < s; dc++)
              set(grid, ro + r * s + dr, co + c * s + dc);
    return grid;
  };

  // ── Letter e (lowercase) — 5×7 @2x → 10×14 ──────────────────────────────
  const letterE = scale(
    [[0,0,0,0,0],[0,1,1,1,0],[1,0,0,0,1],[1,1,1,1,1],[1,0,0,0,0],[0,1,1,1,0],[0,0,0,0,0]],
    2, 3, 5
  );

  // ── Letter N — 5×6 @2x → 10×12 ──────────────────────────────────────────
  const letterN = scale(
    [[1,0,0,0,1],[1,1,0,0,1],[1,0,1,0,1],[1,0,0,1,1],[1,0,0,0,1],[1,0,0,0,1]],
    2, 4, 5
  );

  // ── Diamond outline (Manhattan distance ring) ─────────────────────────────
  const diamond = g();
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const d = Math.abs(r - 9.5) + Math.abs(c - 9.5);
      if (d >= 7 && d <= 8.5) diamond[r * COLS + c] = 1;
    }

  // ── Circle ring (Euclidean) ───────────────────────────────────────────────
  const circle = g();
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const d = Math.sqrt((r - 9.5) ** 2 + (c - 9.5) ** 2);
      if (d >= 7.5 && d <= 9) circle[r * COLS + c] = 1;
    }

  // ── Double chevron ">>" ────────────────────────────────────────────────────
  const chevron = g();
  for (let r = 1; r <= 18; r++) {
    const dy = Math.abs(r - 9.5);
    const rc = Math.round(16 - dy * 0.9);
    const lc = Math.round(11 - dy * 0.9);
    if (rc >= 1 && rc <= 18) chevron[r * COLS + rc] = 1;
    if (rc - 1 >= 1) chevron[r * COLS + rc - 1] = 1;
    if (lc >= 1 && lc <= 18) chevron[r * COLS + lc] = 1;
    if (lc - 1 >= 1) chevron[r * COLS + lc - 1] = 1;
  }

  // ── Winking face ──────────────────────────────────────────────────────────
  const face = g();
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const d = Math.sqrt((r - 9.5) ** 2 + (c - 9.5) ** 2);
      if (d >= 8.5 && d <= 9.5) face[r * COLS + c] = 1;
    }
  face[7*COLS+5] = face[7*COLS+6] = face[8*COLS+5] = face[8*COLS+6] = 1;
  face[8*COLS+13] = face[8*COLS+14] = face[8*COLS+15] = 1;
  for (let c = 6; c <= 13; c++) {
    const row = Math.round(14 - 0.22 * (c - 9.5) ** 2);
    if (row >= 0 && row < ROWS) face[row * COLS + c] = 1;
  }

  return [letterE, letterN, diamond, circle, chevron, face];
}

const PATTERNS = buildPatterns();

// Per-cell stagger delays — random, stable for the lifetime of the module
const DELAYS = new Uint16Array(
  Array.from({ length: N }, () => Math.floor(Math.random() * MAX_DELAY))
);

// ── Component ──────────────────────────────────────────────────────────────────
interface PixelGridProps {
  cellSize?: number;
  gap?: number;
}

export default function PixelGrid({ cellSize = 16, gap = 2 }: PixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef  = useRef<TrailEntry[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const step = cellSize + gap;                       // pixels per cell slot
    const W    = COLS * step - gap;
    const H    = ROWS * step - gap;
    const dpr  = window.devicePixelRatio || 1;

    // Scale canvas buffer for high-DPI screens; keep CSS display size unchanged
    canvas.width  = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const rm   = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Animation state (plain vars in closure — zero React re-renders) ──────
    let patIdx       = 0;
    let prevPat: Grid = new Uint8Array(N);              // empty → fade-in from blank
    let curPat: Grid  = PATTERNS[0];
    let transStart    = performance.now();              // begin fade-in immediately
    let lastChange    = performance.now();
    const waveBuf     = new Uint8Array(N);              // reused scratch buffer
    let lastWaveTick  = -1;
    let rafId         = 0;

    // ── Mousemove trail (single listener on canvas) ───────────────────────────
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const col = Math.floor((e.clientX - rect.left) / step);
      const row = Math.floor((e.clientY - rect.top)  / step);
      if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return;
      const idx = row * COLS + col;
      const trail = trailRef.current;
      // Skip duplicate adjacent cell
      if (trail.length > 0 && trail[trail.length - 1].idx === idx) return;
      trail.push({ idx, ts: performance.now() });
      if (trail.length > TRAIL_MAX) trail.shift();
    };
    canvas.addEventListener("mousemove", onMove);

    // ── rAF draw loop ─────────────────────────────────────────────────────────
    const tick = () => {
      const now = performance.now();

      // ── Advance pattern clock ──────────────────────────────────────────────
      if (!rm && now - lastChange >= PATTERN_MS) {
        prevPat    = curPat.slice();                    // snapshot current state
        patIdx     = (patIdx + 1) % TOTAL;
        curPat     = patIdx === WAVE_IDX ? waveBuf : PATTERNS[patIdx];
        transStart = now;
        lastChange = now;
      }

      // ── Update wave buffer (inline, no alloc, only when tick advances) ──────
      if (patIdx === WAVE_IDX) {
        const t = (now / 100) | 0;                     // 100ms resolution tick
        if (t !== lastWaveTick) {
          lastWaveTick = t;
          for (let r = 0; r < ROWS; r++)
            for (let c = 0; c < COLS; c++) {
              const v = Math.sin(c * 0.7 + r * 0.5 - t * 0.45)
                      + Math.sin(c * 0.4 - r * 0.7 + t * 0.3);
              waveBuf[r * COLS + c] = v > 0.5 ? 1 : 0;
            }
        }
      }

      // ── Draw ──────────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H);

      const elapsed = now - transStart;
      const inTrans = !rm && elapsed < TRANS_MS + MAX_DELAY;

      if (inTrans) {
        // Per-cell globalAlpha draw — handles staggered ripple transition
        // One fillStyle set; only globalAlpha varies per cell
        ctx.fillStyle = "#28AFA2";
        for (let idx = 0; idx < N; idx++) {
          const t = Math.max(0, Math.min(1, (elapsed - DELAYS[idx]) / TRANS_MS));
          const fromA = prevPat[idx] ? 1 : 0.06;
          const toA   = curPat[idx]  ? 1 : 0.06;
          ctx.globalAlpha = fromA + (toA - fromA) * t;
          const r = (idx / COLS) | 0;
          const c = idx % COLS;
          ctx.fillRect(c * step, r * step, cellSize, cellSize);
        }
        ctx.globalAlpha = 1;
      } else {
        // Fast two-pass batched path — only 2 fill() calls for all 400 cells

        // Pass 1: dim (inactive) cells — no shadow
        ctx.shadowBlur = 0;
        ctx.beginPath();
        for (let idx = 0; idx < N; idx++) {
          if (!curPat[idx]) {
            const r = (idx / COLS) | 0;
            const c = idx % COLS;
            ctx.rect(c * step, r * step, cellSize, cellSize);
          }
        }
        ctx.fillStyle = "rgba(40,175,162,0.06)";
        ctx.fill();

        // Pass 2: active cells — with teal glow
        ctx.beginPath();
        for (let idx = 0; idx < N; idx++) {
          if (curPat[idx]) {
            const r = (idx / COLS) | 0;
            const c = idx % COLS;
            ctx.rect(c * step, r * step, cellSize, cellSize);
          }
        }
        ctx.shadowColor = "rgba(40,175,162,0.55)";
        ctx.shadowBlur  = 8;
        ctx.fillStyle   = "#28AFA2";
        ctx.fill();
        ctx.shadowBlur  = 0;
      }

      // ── Trail — drawn on top, oldest first so newest is brightest ──────────
      const trail = trailRef.current;
      // Compact expired entries in-place (no allocation)
      let wi = 0;
      for (let i = 0; i < trail.length; i++)
        if (now - trail[i].ts < TRAIL_MS) trail[wi++] = trail[i];
      trail.length = wi;

      if (trail.length > 0) {
        ctx.fillStyle = "#28AFA230";
        for (let i = 0; i < trail.length; i++) {
          const { idx, ts } = trail[i];
          const alpha = 1 - (now - ts) / TRAIL_MS;
          const r = (idx / COLS) | 0;
          const c = idx % COLS;
          ctx.shadowColor = "#28AFA230";
          ctx.shadowBlur  = rm ? 0 : Math.round(10 * alpha);
          ctx.globalAlpha = alpha;
          ctx.fillRect(c * step, r * step, cellSize, cellSize);
        }
        ctx.globalAlpha = 1;
        ctx.shadowBlur  = 0;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [cellSize, gap]);

  // Canvas dimensions match original 358×358px (cellSize=16, gap=2)
  const size = COLS * (cellSize + gap) - gap;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        cursor: "crosshair",
        display: "block",
        willChange: "transform",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}
