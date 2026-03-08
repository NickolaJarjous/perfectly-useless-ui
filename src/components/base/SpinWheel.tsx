import { useState } from "react";
import { motion } from "framer-motion";

const SEGMENTS = Array.from({ length: 21 }, (_, i) => i);
const SEGMENT_ANGLE = 360 / SEGMENTS.length;

const SEGMENT_COLORS = [
  "hsl(348.9, 70%, 50%)",
  "hsl(348.9, 60%, 60%)",
  "hsl(348.9, 50%, 45%)",
  "hsl(348.9, 65%, 50%)",
  "hsl(348.9, 55%, 55%)",
  "hsl(348.9, 60%, 48%)",
];

interface SpinWheelProps {
  onResult: (grade: number) => void;
  onClick?: () => void;
}

const SpinWheel = ({ onResult, onClick }: SpinWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [didSpin, setDidSpin] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const spin = () => {
    if (spinning) return;
    onClick?.call(null);
    setSpinning(true);
    setResult(null);

    const extraSpins = 5 + Math.random() * 5;
    const randomAngle = Math.random() * 360;
    const totalRotation = rotation + extraSpins * 360 + randomAngle;
    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedAngle = (360 - (totalRotation % 360)) % 360;
      const adjustedAngle = (((normalizedAngle - 90) % 360) + 360) % 360;
      const segmentIndex = Math.floor(adjustedAngle / SEGMENT_ANGLE);
      const grade = SEGMENTS[segmentIndex];
      setResult(grade);
      setSpinning(false);
      onResult(grade);
      setDidSpin(true);
    }, 3500);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl">▼</div>
      <div className="relative w-64 h-64">
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          animate={{ rotate: rotation }}
          transition={{ duration: 3.5, ease: [0.17, 0.67, 0.12, 0.99] }}
        >
          {SEGMENTS.map((num, i) => {
            const startAngle = i * SEGMENT_ANGLE;
            const endAngle = (i + 1) * SEGMENT_ANGLE;
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const x1 = 100 + 95 * Math.cos(startRad);
            const y1 = 100 + 95 * Math.sin(startRad);
            const x2 = 100 + 95 * Math.cos(endRad);
            const y2 = 100 + 95 * Math.sin(endRad);
            const midRad = ((startAngle + endAngle) / 2) * (Math.PI / 180);
            const textX = 100 + 70 * Math.cos(midRad);
            const textY = 100 + 70 * Math.sin(midRad);

            return (
              <g key={num}>
                <path
                  d={`M100,100 L${x1},${y1} A95,95 0 0,1 ${x2},${y2} Z`}
                  fill={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                  stroke="white"
                  strokeWidth="0.5"
                />
                <text
                  x={textX}
                  y={textY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="white"
                  fontSize="7"
                  fontWeight="600"
                >
                  {num}
                </text>
              </g>
            );
          })}
          <circle
            cx="100"
            cy="100"
            r="10"
            fill="white"
            stroke="hsl(220,15%,88%)"
            strokeWidth="1"
          />
        </motion.svg>
      </div>

      {!didSpin && (
        <button
          onClick={spin}
          disabled={spinning}
          className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md
          hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {spinning ? "Calculating grade..." : "Generate Grade"}
        </button>
      )}

      {result !== null && !spinning && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-foreground"
        >
          Result: {result}/20
        </motion.p>
      )}
    </div>
  );
};

export default SpinWheel;
