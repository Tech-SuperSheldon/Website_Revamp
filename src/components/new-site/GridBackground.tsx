"use client";

interface GridBackgroundProps {
  /** z-index of the grid layer. Negative values place it behind content. Default: -1 */
  zIndex?: number;
  /** Grid cell size in pixels. Default: 40 */
  cellSize?: number;
  /** Color of the grid lines (any valid CSS color). Default: rgba(0,0,0,0.07) */
  lineColor?: string;
  /** How far the grid extends before fading — 0% = tiny circle, 100% = full coverage. Default: 55% */
  fadeRadius?: string;
  /** Extra Tailwind / CSS classes on the wrapper */
  className?: string;
}

/**
 * GridBackground
 *
 * Usage — place inside any `relative` container:
 *
 *   <section className="relative ...">
 *     <GridBackground zIndex={0} />
 *     {children}
 *   </section>
 */
export default function GridBackground({
  zIndex = -1,
  cellSize = 40,
  lineColor = "rgba(0,0,0,0.07)",
  fadeRadius = "55%",
  className = "",
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{ zIndex }}
    >
      {/* Grid pattern layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${lineColor} 1px, transparent 1px),
            linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
          `,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          /* Radial mask — full opacity in the center, transparent at edges */
          WebkitMaskImage: `radial-gradient(ellipse ${fadeRadius} ${fadeRadius} at 50% 50%, black 0%, transparent 100%)`,
          maskImage: `radial-gradient(ellipse ${fadeRadius} ${fadeRadius} at 50% 50%, black 0%, transparent 100%)`,
        }}
      />
    </div>
  );
}
