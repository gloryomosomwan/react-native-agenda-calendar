import { isSameDay } from 'date-fns';

export type ViewMode = 'month' | 'week';
export type DateRange = { start: Date; end: Date };

export class CalendarState {
  private _currentDate: Date;
  private _subscribers: Set<() => void>;
  private _daySubscribers: Set<() => void>;
  private _todayDate: Date;
  private _dateOfDisplayedMonth: Date;
  private _previousDate: Date
  private _dayPressed: boolean = false

  constructor(initialDate: Date = new Date()) {
    this._todayDate = new Date(new Date().toISOString());
    this._currentDate = initialDate;
    this._previousDate = initialDate
    this._subscribers = new Set();
    this._daySubscribers = new Set();
    this._dateOfDisplayedMonth = initialDate
  }

  daySelectDate(date: Date) {
    this._currentDate = date
    this.notifyDaySubscribers()
  }

  today() {
    this.selectDate(this.todayDate)
  }

  selectDate(date: Date, fromDayPress: boolean = false) {
    this._currentDate = date;
    this.notifySubscribers();
  }

  selectPreviousDate(date: Date) {
    this._previousDate = date
  }

  setDayOfDisplayedMonth(date: Date) {
    if (isSameDay(this._dateOfDisplayedMonth, date)) return;
    this._dateOfDisplayedMonth = date
  }

  subscribe(callback: () => void): () => void {
    this._subscribers.add(callback);
    return () => {
      this._subscribers.delete(callback);
    };
  }

  daySubscribe(callback: () => void): () => void {
    this._daySubscribers.add(callback);
    return () => {
      this._daySubscribers.delete(callback);
    };
  }

  private notifySubscribers() {
    this._subscribers.forEach(callback => callback());
  }

  private notifyDaySubscribers() {
    this._daySubscribers.forEach(callback => callback());
  }

  get currentDate() { return this._currentDate; }
  get previousDate() { return this._previousDate }
  get dateOfDisplayedMonth() { return this._dateOfDisplayedMonth }
  get todayDate() { return this._todayDate; }
  get dayPressed() { return this._dayPressed }
}