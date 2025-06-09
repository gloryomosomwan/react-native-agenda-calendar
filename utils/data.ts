import { SFSymbol } from 'expo-symbols';

interface Event {
  id: number;
  type: string;
  course: string;
  start: Date;
  end: Date;
  location: string;
  icon: SFSymbol;
}

interface Activity {
  id: number
  title: string;
  course?: string;
  description?: string;
  due?: Date;
  priority?: string;
}

export const events: Event[] = [
  {
    id: 1,
    type: 'Lecture',
    course: 'MATH 119',
    icon: 'function',
    start: new Date(2025, 5, 8, 7, 0),
    end: new Date(2025, 5, 8, 8, 0),
    location: 'P-101',
  },
  {
    id: 2,
    type: 'Lab',
    course: 'PHYS 102',
    icon: 'sum',
    start: new Date(2025, 5, 8, 10, 0),
    end: new Date(2025, 5, 8, 12, 0),
    location: 'L-204',
  },
  {
    id: 3,
    type: 'Midterm',
    course: 'HIST 211',
    icon: 'book',
    start: new Date(2025, 5, 8, 14, 30),
    end: new Date(2025, 5, 8, 16, 0),
    location: 'S-303',
  },
];

export const assignments: Activity[] = [
  {
    id: 1,
    title: 'Reading Assignment 3',
    course: 'MARK 161',
    due: new Date(2025, 5, 9, 16, 0),
  },
  {
    id: 2,
    title: 'Lab Report 2',
    course: 'PHYS 102',
    due: new Date(2025, 5, 16, 18, 0),
  },
  {
    id: 3,
    title: 'Problem Set 4',
    course: 'MATH 119',
    description: 'Problems 1 & 2',
    due: new Date(2025, 5, 12, 23, 59),
  },
];

export const tasks: Activity[] = [
  {
    id: 1,
    title: 'Buy lab coat',
    course: 'CHEM 105',
    due: new Date(2025, 5, 9, 9, 0),
    priority: 'high',
  },
  {
    id: 2,
    title: 'Check out extra resources',
    course: 'MARK 161',
    due: new Date(2025, 5, 9, 9, 0),
    priority: 'low',
  },
  {
    id: 3,
    title: 'Talk to Prof. Brown',
    course: 'PHYS 102',
    due: new Date(2025, 5, 9, 16, 0),
    priority: 'medium',
  },
];

