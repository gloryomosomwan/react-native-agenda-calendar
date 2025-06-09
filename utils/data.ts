import { SFSymbol } from 'expo-symbols';

interface Event {
  type: 'lecture' | 'lab' | 'seminar' | 'assessment' | 'exam',
  course: string;
  start: Date;
  end: Date;
  location: string;
  icon: SFSymbol;
}

export const events: Event[] = [
  {
    type: 'lecture',
    course: 'MATH 201',
    icon: 'function',
    start: new Date(2025, 5, 8, 7, 0),
    end: new Date(2025, 5, 8, 8, 0),
    location: 'P-101',
  },
  {
    type: 'lecture',
    course: 'PHYS 102',
    icon: 'sum',
    start: new Date(2025, 5, 8, 10, 0),
    end: new Date(2025, 5, 8, 12, 0),
    location: 'L-204',
  },
  {
    type: 'lecture',
    course: 'HIST 310',
    icon: 'book',
    start: new Date(2025, 5, 8, 14, 30),
    end: new Date(2025, 5, 8, 16, 0),
    location: 'S-303',
  },
];

