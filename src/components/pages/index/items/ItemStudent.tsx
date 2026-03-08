import type { FC } from "react";
import type { Student } from "../../../../lib/utils";

interface ItemStudentProps {
  student: Student;
  i: number;
  onClick: () => void;
}

const ItemStudent: FC<ItemStudentProps> = ({ student, i, onClick }) => {
  return (
    <tr className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
      <td className="px-5 py-3 text-muted-foreground">{i}</td>
      <td className="px-5 py-3 font-medium text-foreground">{student.name}</td>
      <td className="px-5 py-3 text-muted-foreground hidden md:table-cell font-mono text-xs">
        {student.studentId}
      </td>
      <td className="px-5 py-3">
        <div
          onClick={onClick}
          className="flex w-20 px-3 h-8 justify-center items-center border border-input rounded-md bg-card text-foreground
                        cursor-text hover:border-ring transition-colors text-center
                        focus:outline-none select-none"
          tabIndex={0}
          role="button"
          aria-label={`Enter grade for ${student.name}`}
        >
          {student.grade !== null ? student.grade : ""}
        </div>
      </td>
      <td className="px-5 py-3">
        {student.grade !== null ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
            Processed
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
            Unprocessed
          </span>
        )}
      </td>
    </tr>
  );
};

export default ItemStudent;
