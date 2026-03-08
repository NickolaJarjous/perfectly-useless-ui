import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BookOpen, Users, ClipboardList, LogOut } from "lucide-react";
import NavBar from "../../base/navbar/NavBar";
import { INITIAL_STUDENTS, navItems, type Student } from "../../../lib/utils";
import ItemStudent from "./items/ItemStudent";
import DialogGradedStudent from "./units/DialogGradedStudent";
import DialogWheel from "./units/DialogWheel";
import { useAuthRedirect } from "../../../hooks/useAuthRedirect";

const Index = () => {
  const { redirectIfNotLoggedIn } = useAuthRedirect();

  useEffect(() => {
    redirectIfNotLoggedIn();
  }, [redirectIfNotLoggedIn]);

  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [gradedStudent, setGradedStudent] = useState<Student | null>(null);

  const handleResult = (grade: number) => {
    if (!selectedStudent) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id
          ? { ...s, grade, updatedAt: new Date() }
          : s,
      ),
    );
  };

  const handleStudentClick = (student: Student) => {
    if (student.updatedAt) {
      setGradedStudent(student);
      return;
    }
    setSelectedStudent(student);
  };

  const gradedCount = students.filter((s) => s.grade !== null).length;
  const average =
    gradedCount > 0
      ? (
          students.reduce((a, s) => a + (s.grade || 0), 0) / gradedCount
        ).toFixed(1)
      : "—";

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar items={navItems} />

      <div className="flex-1 p-6 max-w-6xl mx-auto w-full mt-20">
        {/* Course header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <BookOpen size={14} />
            <span>Cycle γ.2026 — Cohort Ω</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            UXIa — [subject.fullName]
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Summative Evaluation Metric Allocation Protocol
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: Users,
              label: "Matriculated",
              value: students.length.toString(),
            },
            {
              icon: ClipboardList,
              label: "Evaluated",
              value: `${gradedCount}/${students.length}`,
            },
            { icon: BookOpen, label: "Mean Distribution", value: average },
            {
              icon: LogOut,
              label: "State Vector",
              value:
                gradedCount === students.length ? "Finalized" : "Pending Completion",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-card border border-border rounded-lg p-4"
            >
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <stat.icon size={13} />
                {stat.label}
              </div>
              <p className="text-xl font-semibold text-foreground">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Grade table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Assessment Data Repository
            </h3>
            <span className="text-xs text-muted-foreground">
              Activate scoring matrix cell for numeric input
            </span>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground">
                  Seq
                </th>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground">
                  Identifier-Nominal
                </th>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground hidden md:table-cell">
                  Matriculation Token
                </th>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground w-32">
                  Rank (0-20)
                </th>
                <th className="text-left px-5 py-2.5 font-medium text-muted-foreground w-24">
                  State Vector
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, i) => (
                <ItemStudent
                  key={student.id}
                  student={student}
                  i={students.length - i}
                  onClick={() => {
                    handleStudentClick(student);
                  }}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Submit button */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => setStudents(INITIAL_STUDENTS)}
            className="px-4 py-2 text-sm font-medium text-muted-foreground border border-border rounded-md
              hover:bg-muted transition-colors"
          >
            Transmit Evaluations
          </button>
          <button
            disabled={gradedCount < students.length}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md
              hover:opacity-90 transition-opacity disabled:opacity-40"
            onClick={() => {
              setStudents(INITIAL_STUDENTS);
            }}
          >
            Reinitialize Data Structure
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedStudent && (
          <DialogWheel
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
            handleResult={handleResult}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {gradedStudent && <DialogGradedStudent setStudent={setGradedStudent} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
