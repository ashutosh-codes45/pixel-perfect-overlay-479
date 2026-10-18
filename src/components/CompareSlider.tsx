import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CompareSliderProps {
  before: ReactNode;
  after: ReactNode;
  className?: string;
  position?: number;
  onPositionChange?: (pos: number) => void;
  afterClassName?: string;
}

export function CompareSlider({
  before,
  after,
  className,
  position,
  onPositionChange,
  afterClassName,
}: CompareSliderProps) {
  const [internalPos, setInternalPos] = useState(50);
  const pos = position !== undefined ? position : internalPos;
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = (newPos: number) => {
    const clamped = Math.min(100, Math.max(0, newPos));
    if (position === undefined) {
      setInternalPos(clamped);
    }
    onPositionChange?.(clamped);
  };

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    updatePos(((clientX - r.left) / r.width) * 100);
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full touch-none overflow-hidden rounded-2xl border bg-card shadow-lift select-none",
        className || "aspect-[4/5] md:aspect-[4/3]",
      )}
      onPointerDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("textarea, input, button, a, select, [data-prevent-slide]")) {
          return;
        }
        dragging.current = true;
        (e.currentTarget as Element).setPointerCapture?.(e.pointerId);
        move(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={(e) => {
        dragging.current = false;
        try {
          (e.currentTarget as Element).releasePointerCapture?.(e.pointerId);
        } catch {
          // ignore
        }
      }}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-y-auto bg-card p-4 sm:p-5 md:py-5 md:pl-12 md:pr-6 select-text",
          afterClassName,
        )}
      >
        {after}
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        {before}
      </div>
      {pos > 5 && (
        <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-foreground/80 px-3 py-1 text-xs font-medium text-background z-10">
          Before
        </span>
      )}
      {pos < 95 && (
        <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground z-10">
          After
        </span>
      )}
      <div className="absolute inset-y-0 w-0.5 bg-primary z-20 pointer-events-none" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Compare before and after"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") updatePos(pos - 5);
            if (e.key === "ArrowRight") updatePos(pos + 5);
          }}
          className="pointer-events-auto absolute top-1/2 left-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-primary bg-background text-primary shadow-lift focus-visible:ring-4 focus-visible:ring-ring focus-visible:outline-none"
        >
          ⇆
        </div>
      </div>
    </div>
  );
}
