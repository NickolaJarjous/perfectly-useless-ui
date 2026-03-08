import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navItems = [
  {
    text: "Evaluations",
    route: "/",
  },
  {
    text: "Curricula",
    route: "/courses",
  },
  {
    text: "Participants",
    route: "/students",
  },
  {
    text: "Analytical Synthesis",
    route: "/reports",
  },
];

export interface Student {
  id: number;
  name: string;
  studentId: string;
  grade: number | null;
  updatedAt: Date | null;
}

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    name: "Anderson, Maria",
    studentId: "UXIa-2026-0341",
    grade: null,
    updatedAt: null,
  },
  {
    id: 2,
    name: "Chen, David",
    studentId: "UXIa-2026-0287",
    grade: null,
    updatedAt: null,
  },
  {
    id: 3,
    name: "Dubois, Claire",
    studentId: "UXIa-2026-0412",
    grade: null,
    updatedAt: null,
  },
  {
    id: 4,
    name: "García, Luis",
    studentId: "UXIa-2026-0198",
    grade: null,
    updatedAt: null,
  },
  {
    id: 5,
    name: "Holm, Erik",
    studentId: "UXIa-2026-0523",
    grade: null,
    updatedAt: null,
  },
  {
    id: 6,
    name: "Ivanova, Natalia",
    studentId: "UXIa-2026-0156",
    grade: null,
    updatedAt: null,
  },
  {
    id: 7,
    name: "Johnson, Tyler",
    studentId: "UXIa-2026-0374",
    grade: null,
    updatedAt: null,
  },
  {
    id: 8,
    name: "Kim, Soo-Yeon",
    studentId: "UXIa-2026-0445",
    grade: null,
    updatedAt: null,
  },
];
