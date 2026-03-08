import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { motion } from "framer-motion";
import type { Student } from "../../../../lib/utils";
import SpinWheel from "../../../base/SpinWheel";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

interface DialogWheelProps {
  selectedStudent: Student;
  setSelectedStudent: Dispatch<SetStateAction<Student | null>>;
  handleResult: (grade: number) => void;
}

const DialogWheel: FC<DialogWheelProps> = ({
  selectedStudent,
  setSelectedStudent,
  handleResult,
}) => {
  const { width, height } = useWindowSize();
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 p-4"
      onClick={() => setSelectedStudent(null)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-lg shadow-xl max-w-sm w-full border border-border overflow-hidden"
      >
        <div className="px-6 pt-5 pb-3 border-b border-border">
          <h3 className="font-semibold text-foreground">Numeric Evaluation Ingestion</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {selectedStudent.name} — {selectedStudent.studentId}
          </p>
        </div>

        <div className="p-6">
          <SpinWheel
            onClick={() => {
              setHasFailed(false);
            }}
            onResult={(grade) => {
              if (grade < 10) {
                setHasFailed(true);
              }
              handleResult(grade);
            }}
          />
        </div>

        {hasFailed && (
          <h2 className="text-lg font-bold text-green-200 text-center">
            🎉🎉🎉 Participant Achievement Threshold Breach Detected 🎉🎉🎉
          </h2>
        )}

        <div className="px-6 py-3 border-t border-border flex justify-end">
          <button
            onClick={() => setSelectedStudent(null)}
            className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dismiss Interface
          </button>
        </div>
        {hasFailed && <Confetti width={width} height={height} />}
      </motion.div>
    </motion.div>
  );
};

export default DialogWheel;
