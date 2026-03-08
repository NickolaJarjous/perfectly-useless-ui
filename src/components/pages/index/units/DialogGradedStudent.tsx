import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import type { Student } from "../../../../lib/utils";
import { motion } from "framer-motion";

interface DialogGradedStudentProps {
  setStudent: Dispatch<SetStateAction<Student | null>>;
}

const DialogGradedStudent: FC<DialogGradedStudentProps> = ({
  setStudent,
}) => {
  const [placeHolder, setPlaceHolder] = useState("Upgrade");
  const [answer, setAnswer] = useState<number | null>(null);

  const handleClick = () => {
    if (answer !== null) {
      return;
    }
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const sum = a + b;
    setAnswer(sum);
    setPlaceHolder(`What is ${a} + ${b} ?`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card rounded-lg shadow-xl max-w-sm w-full border border-border overflow-hidden py-2"
      >
        <h3 className="font-semibold text-primary text-center text-2xl px-4">
          Upgrade to premium to edit grades
        </h3>

        <div className="px-6 py-3 flex justify-between mt-8">
          <input
            placeholder={placeHolder}
            className="px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors cursor-pointer"
            onClick={handleClick}
            onChange={(e) => {
              const text = e.target.value;
              if (answer !== null && text === answer.toString()) {
                setStudent(null);
              }
            }}
          />
          <button className="px-4 py-1.5 text-sm font-medium bg-[#00ff00] rounded-md text-[#ff0000] hover:bg-transparent hover:text-transparent transition-colors">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DialogGradedStudent;
