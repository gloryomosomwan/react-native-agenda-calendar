import { SFSymbol } from 'expo-symbols';

interface Event {
  type: string;
  course: string;
  start: Date;
  end: Date;
  location: string;
  icon: SFSymbol;
}

interface Activity {
  title: string;
  course?: string;
  due?: Date;
  priority?: string;
}

export const events: Event[] = [
  {
    type: 'Lecture',
    course: 'MATH 201',
    icon: 'function',
    start: new Date(2025, 5, 8, 7, 0),
    end: new Date(2025, 5, 8, 8, 0),
    location: 'P-101',
  },
  {
    type: 'Lab',
    course: 'PHYS 102',
    icon: 'sum',
    start: new Date(2025, 5, 8, 10, 0),
    end: new Date(2025, 5, 8, 12, 0),
    location: 'L-204',
  },
  {
    type: 'Final Exam',
    course: 'HIST 310',
    icon: 'book',
    start: new Date(2025, 5, 8, 14, 30),
    end: new Date(2025, 5, 8, 16, 0),
    location: 'S-303',
  },
];

export const assignments: Activity[] = [
  {
    title: 'Reading Assignment 3',
    course: 'CHEM 201',
    due: new Date(2025, 5, 9, 0, 0),
  },
  {
    title: 'Problem Set 4',
    course: 'MATH 201',
    due: new Date(2025, 5, 12, 23, 59),
    priority: 'high'
  },
  {
    title: 'Lab Report 2',
    course: 'MARK 218',
    due: new Date(2025, 5, 16, 17, 0),
    priority: 'low'
  }
]

