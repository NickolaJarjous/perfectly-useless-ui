import { useState, useRef, useCallback, useEffect, type FC } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

// ─── Constants ───────────────────────────────────────────────────────────────

const DIGITS: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const STEP_ANGLE = 360 / DIGITS.length; // 36° per digit
const START_OFFSET = -54; // digit 1 starts here (degrees from top)
const STOP_ANGLE = -40; // where the stop peg sits (degrees from top)
const HOLE_ORBIT = 80; // radius where holes sit
const HOLE_R = 12;
const CENTER = 120;
const SIZE = CENTER * 2;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getDigitAngle(index: number): number {
  return START_OFFSET + index * STEP_ANGLE;
}

function getAngleFromCenter(e: PointerEvent, el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  return Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface RotaryDialProps {
  onDigitDialed?: (digit: number) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const RotaryDial: FC<RotaryDialProps> = ({ onDigitDialed }) => {
  const dialRotation = useMotionValue(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [flash, setFlash] = useState<number | null>(null);

  const isDragging = useRef<boolean>(false);
  const lastAngle = useRef<number>(0);
  const animating = useRef<boolean>(false);
  const dialRef = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isDragging.current || !dialRef.current) return;
      const angle = getAngleFromCenter(e, dialRef.current);
      let delta = angle - lastAngle.current;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      lastAngle.current = angle;

      const next = Math.max(0, Math.min(330, dialRotation.get() + delta));
      dialRotation.set(next);
    },
    [dialRotation],
  );

  const onPointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    window.removeEventListener("pointermove", onPointerMove);
    // eslint-disable-next-line react-hooks/immutability
    window.removeEventListener("pointerup", onPointerUp);

    const currentRot = dialRotation.get();

    if (currentRot < 8) {
      animate(dialRotation, 0, { type: "spring", stiffness: 200, damping: 20 });
      return;
    }

    // Find which digit was pulled to the stop peg
    const originalPos = (((STOP_ANGLE - currentRot) % 360) + 360) % 360;
    let minDist = Infinity;
    let dialedIndex = 0;

    DIGITS.forEach((_, i) => {
      const dAngle = ((getDigitAngle(i) % 360) + 360) % 360;
      let dist = Math.abs(dAngle - originalPos);
      if (dist > 180) dist = 360 - dist;
      if (dist < minDist) {
        minDist = dist;
        dialedIndex = i;
      }
    });

    const digit = DIGITS[dialedIndex];

    animating.current = true;
    animate(dialRotation, 0, {
      type: "spring",
      stiffness: 180,
      damping: 18,
      mass: 1.2,
      onComplete: () => {
        animating.current = false;
        setInputValue((v) => v + digit);
        setFlash(digit);
        onDigitDialed?.(digit);
        setTimeout(() => setFlash(null), 500);
      },
    });
  }, [dialRotation, onDigitDialed, onPointerMove]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (animating.current || !dialRef.current) return;
      e.preventDefault();
      isDragging.current = true;
      lastAngle.current = getAngleFromCenter(e.nativeEvent, dialRef.current);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
    },
    [onPointerMove, onPointerUp],
  );

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  return (
    <div
      className="w-full flex flex-col items-center gap-6 select-none"
      style={{ fontFamily: "monospace" }}
    >
      {/* Display */}
      <div className="flex flex-col w-full">
        <label className="block font-mono text-xs text-slate-400 mb-3 uppercase tracking-widest">
          Password
        </label>
        <div className="w-full px-4 h-12 bg-slate-850 border border-slate-700 rounded-lg flex flex-row items-center">
          <span className="w-full text-slate-200 placeholder-slate-600 font-mono text-sm">
            {inputValue || <span className="text-zinc-300">––––</span>}
          </span>
          {inputValue && (
            <button
              onClick={() => {
                setInputValue((v) => v.slice(0, -1));
                onDigitDialed?.(-1);
              }}
              className="text-zinc-400 hover:text-zinc-600 text-lg cursor-row-resize"
            >
              Copy
            </button>
          )}
        </div>
      </div>

      {/* Dialed digit flash */}
      <div className="h-8 flex items-center justify-center">
        {flash !== null && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-3xl font-bold text-white"
          >
            {flash}
          </motion.span>
        )}
      </div>

      {/* Dial */}
      <div style={{ position: "relative", width: SIZE, height: SIZE }}>
        {/* Stop peg */}
        <div
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#374151",
            left:
              CENTER +
              (HOLE_ORBIT + 28) * Math.sin((STOP_ANGLE * Math.PI) / 180) -
              5,
            top:
              CENTER -
              (HOLE_ORBIT + 28) * Math.cos((STOP_ANGLE * Math.PI) / 180) -
              5,
            zIndex: 10,
          }}
        />

        {/* Rotating disc */}
        <motion.div
          ref={dialRef}
          onPointerDown={onPointerDown}
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "#f3f4f6",
            border: "2px solid #d1d5db",
            cursor: "grab",
            rotate: dialRotation,
            transformOrigin: "center center",
            touchAction: "none",
          }}
          whileTap={{ cursor: "grabbing" }}
        >
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" height="100%">
            {DIGITS.map((digit, i) => {
              const angleDeg = getDigitAngle(i);
              const angleRad = (angleDeg * Math.PI) / 180;
              const cx = CENTER + HOLE_ORBIT * Math.sin(angleRad);
              const cy = CENTER - HOLE_ORBIT * Math.cos(angleRad);
              const lx = CENTER + (HOLE_ORBIT - 26) * Math.sin(angleRad);
              const ly = CENTER - (HOLE_ORBIT - 26) * Math.cos(angleRad);

              return (
                <g key={digit}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={HOLE_R}
                    fill="white"
                    stroke="#9ca3af"
                    strokeWidth="1.5"
                  />
                  <text
                    x={lx}
                    y={ly}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#374151"
                    fontSize="13"
                    fontFamily="monospace"
                    fontWeight="600"
                  >
                    {digit}
                  </text>
                </g>
              );
            })}
            <circle
              cx={CENTER}
              cy={CENTER}
              r="8"
              fill="white"
              stroke="#d1d5db"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      </div>

      <p className="text-xs text-zinc-400 uppercase tracking-widest">
        Rotate clockwise to dial
      </p>
    </div>
  );
};

export default RotaryDial;
