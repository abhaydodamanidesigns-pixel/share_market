"use client";

import { useEffect, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Particle {
  x: number; // 0-1 normalised
  y: number; // 0-1 normalised
  speed: number;
  size: number;
  opacity: number;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CANDLE_WIDTH = 8;
const CANDLE_GAP = 14; // step per candle
const SCROLL_SPEED = 18; // px/s
const PRICE_MIN = 0.2;
const PRICE_MAX = 0.8;
const PROFIT_COLOR = "#22C55E";
const LOSS_COLOR = "#EF4444";
const LINE_COLOR = "#3B82F6";
const GRID_COLOR = "rgba(42,52,74,0.7)"; // --color-border at 70%
const PARTICLE_COLOR = "rgba(34,211,238,0.4)"; // brand-accent
const PARTICLE_COUNT = 18;
const TICKERS = ["NIFTY", "AAPL", "BTC"];

// ── Candle generator ──────────────────────────────────────────────────────────

function makeCandle(prev?: Candle): Candle {
  const base = prev ? prev.close : 0.5;
  const move = (Math.random() - 0.48) * 0.08;
  const open = Math.max(PRICE_MIN, Math.min(PRICE_MAX, base));
  const close = Math.max(PRICE_MIN, Math.min(PRICE_MAX, open + move));
  const hi = Math.max(open, close) + Math.random() * 0.04;
  const lo = Math.min(open, close) - Math.random() * 0.04;
  return {
    open,
    close,
    high: Math.min(PRICE_MAX + 0.05, hi),
    low: Math.max(PRICE_MIN - 0.05, lo),
  };
}

function initCandles(count: number): Candle[] {
  const candles: Candle[] = [];
  for (let i = 0; i < count; i++) {
    candles.push(makeCandle(candles[candles.length - 1]));
  }
  return candles;
}

// ── Particle generator ────────────────────────────────────────────────────────

function makeParticle(): Particle {
  return {
    x: Math.random(),
    y: Math.random(),
    speed: 0.04 + Math.random() * 0.06, // normalised per second
    size: 1 + Math.random() * 2,
    opacity: 0.3 + Math.random() * 0.5,
  };
}

// ── Main component ────────────────────────────────────────────────────────────

export default function HeroMarketAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── State ──────────────────────────────────────────────────────────────
    let rafId: number;
    let lastTime = 0;
    let scrollPx = 0;

    // Pre-fill enough candles to cover max width + buffer
    const maxCandles = Math.ceil(600 / CANDLE_GAP) + 10;
    let candles = initCandles(maxCandles);

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, makeParticle);

    // ── Resize handling ────────────────────────────────────────────────────
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // ── Price → pixel ──────────────────────────────────────────────────────
    const priceToY = (p: number, h: number) =>
      h * (1 - (p - (PRICE_MIN - 0.05)) / (PRICE_MAX - PRICE_MIN + 0.1));

    // ── Draw grid ──────────────────────────────────────────────────────────
    const drawGrid = (w: number, h: number) => {
      ctx.save();
      ctx.strokeStyle = GRID_COLOR;
      ctx.lineWidth = 0.5;
      const rows = 5;
      const cols = 7;
      for (let r = 0; r <= rows; r++) {
        const y = (r / rows) * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      for (let c = 0; c <= cols; c++) {
        const x = (c / cols) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      ctx.restore();
    };

    // ── Draw candles ───────────────────────────────────────────────────────
    const drawCandles = (w: number, h: number) => {
      const visible = Math.ceil(w / CANDLE_GAP) + 2;
      // Ensure we have enough candles
      while (candles.length < visible + 2) {
        candles.push(makeCandle(candles[candles.length - 1]));
      }

      const start = Math.max(0, candles.length - visible);
      const slice = candles.slice(start);

      slice.forEach((c, i) => {
        // x from right edge, accounting for scroll offset
        const x = w - (slice.length - 1 - i) * CANDLE_GAP - scrollPx;
        if (x < -CANDLE_GAP || x > w + CANDLE_GAP) return;

        const bullish = c.close >= c.open;
        const color = bullish ? PROFIT_COLOR : LOSS_COLOR;

        const openY = priceToY(c.open, h);
        const closeY = priceToY(c.close, h);
        const highY = priceToY(c.high, h);
        const lowY = priceToY(c.low, h);

        const bodyTop = Math.min(openY, closeY);
        const bodyH = Math.max(1, Math.abs(openY - closeY));

        ctx.save();

        // Wick
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, highY);
        ctx.lineTo(x, lowY);
        ctx.stroke();

        // Body
        ctx.fillStyle = color;
        ctx.globalAlpha = bullish ? 0.9 : 0.8;
        ctx.fillRect(x - CANDLE_WIDTH / 2, bodyTop, CANDLE_WIDTH, bodyH);

        // Glow on body
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.fillRect(x - CANDLE_WIDTH / 2, bodyTop, CANDLE_WIDTH, bodyH);

        ctx.restore();
      });

      // Advance scroll
      return slice;
    };

    // ── Draw price line ────────────────────────────────────────────────────
    const drawPriceLine = (
      slice: Candle[],
      w: number,
      h: number,
      sliceLen: number
    ) => {
      if (slice.length < 2) return;

      ctx.save();
      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = 1.5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.shadowColor = LINE_COLOR;
      ctx.shadowBlur = 8;
      ctx.globalAlpha = 0.7;

      ctx.beginPath();
      slice.forEach((c, i) => {
        const x = w - (sliceLen - 1 - i) * CANDLE_GAP - scrollPx;
        const y = priceToY(c.close, h);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Dot at last close
      const last = slice[slice.length - 1];
      const lx = w - scrollPx;
      const ly = priceToY(last.close, h);

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 12;
      ctx.fillStyle = LINE_COLOR;
      ctx.beginPath();
      ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    // ── Draw particles ─────────────────────────────────────────────────────
    const drawParticles = (w: number, h: number, dt: number) => {
      particles.forEach((p) => {
        p.y -= p.speed * dt;
        if (p.y < 0) {
          p.y = 1;
          p.x = Math.random();
          p.opacity = 0.3 + Math.random() * 0.5;
        }

        ctx.save();
        ctx.fillStyle = PARTICLE_COLOR;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = PARTICLE_COLOR;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    // ── Animation loop ─────────────────────────────────────────────────────
    const draw = (ts: number) => {
      if (!canvas) return;

      const dt = Math.min((ts - lastTime) / 1000, 0.05); // seconds, cap at 50ms
      lastTime = ts;

      const W = canvas.getBoundingClientRect().width;
      const H = canvas.getBoundingClientRect().height;

      ctx.clearRect(0, 0, W, H);

      drawGrid(W, H);

      // Advance scroll
      scrollPx += SCROLL_SPEED * dt;
      if (scrollPx >= CANDLE_GAP) {
        scrollPx -= CANDLE_GAP;
        candles.push(makeCandle(candles[candles.length - 1]));
        // Trim old candles to avoid unbounded growth
        if (candles.length > maxCandles + 20) {
          candles = candles.slice(candles.length - maxCandles - 5);
        }
      }

      const slice = drawCandles(W, H);
      drawPriceLine(slice, W, H, slice.length);
      drawParticles(W, H, dt);

      rafId = requestAnimationFrame(draw);
    };

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    lastTime = performance.now();
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="relative w-full h-full select-none" aria-hidden="true">
      {/* Canvas chart */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full rounded-2xl"
        style={{ opacity: 0.85 }}
      />

      {/* Floating ticker badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        {TICKERS.map((ticker, i) => (
          <TickerBadge key={ticker} ticker={ticker} index={i} />
        ))}
      </div>

      {/* Subtle vignette overlay to blend edges */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(11,15,26,0.6) 100%)",
        }}
      />
    </div>
  );
}

// ── Ticker badge sub-component ────────────────────────────────────────────────

const TICKER_DATA: Record<string, { change: string; positive: boolean }> = {
  NIFTY: { change: "+1.24%", positive: true },
  AAPL:  { change: "-0.38%", positive: false },
  BTC:   { change: "+2.71%", positive: true },
};

function TickerBadge({
  ticker,
  index,
}: {
  ticker: string;
  index: number;
}) {
  const { change, positive } = TICKER_DATA[ticker];

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold backdrop-blur-sm"
      style={{
        background: "rgba(20,27,45,0.85)",
        border: "1px solid rgba(42,52,74,0.8)",
        animation: `heroTickerPulse ${2.5 + index * 0.7}s ease-in-out infinite`,
        animationDelay: `${index * 0.4}s`,
      }}
    >
      <span className="text-gray-300">{ticker}</span>
      <span
        className="font-bold"
        style={{ color: positive ? PROFIT_COLOR : LOSS_COLOR }}
      >
        {change}
      </span>
    </div>
  );
}
