export class CalendarState {
  private _currentDate: Date;
  private _daySubscribers: Set<() => void>;
  private _weekSubscribers: Set<() => void>;
  private _monthSubscribers: Set<() => void>;
  private _todaySubscribers: Set<() => void>;
  private _todayDate: Date;
  private _previousDate: Date

  constructor(initialDate: Date = new Date()) {
    this._todayDate = new Date()
    this._todayDate.setHours(0, 0, 0, 0)
    this._currentDate = initialDate;
    this._previousDate = initialDate;
    this._daySubscribers = new Set();
    this._weekSubscribers = new Set();
    this._monthSubscribers = new Set();
    this._todaySubscribers = new Set();
  }

  daySelectDate(date: Date) {
    this._currentDate = date
    this.notifyDaySubscribers()
  }

  weekSelectDate(date: Date) {
    this._currentDate = date;
    this.notifyWeekSubscribers();
  }

  monthSelectDate(date: Date) {
    this._currentDate = date;
    this.notifyMonthSubscribers();
  }

  selectToday() {
    this._currentDate = this._todayDate
    this.notifyTodaySubscribers();
  }

  selectPreviousDate(date: Date) {
    this._previousDate = date
  }

  daySubscribe(callback: () => void): () => void {
    this._daySubscribers.add(callback);
    return () => {
      this._daySubscribers.delete(callback);
    };
  }

  weekSubscribe(callback: () => void): () => void {
    this._weekSubscribers.add(callback);
    return () => {
      this._weekSubscribers.delete(callback);
    };
  }

  monthSubscribe(callback: () => void): () => void {
    this._monthSubscribers.add(callback);
    return () => {
      this._monthSubscribers.delete(callback);
    };
  }

  todaySubscribe(callback: () => void): () => void {
    this._todaySubscribers.add(callback);
    return () => {
      this._todaySubscribers.delete(callback);
    };
  }

  private notifyDaySubscribers() {
    this._daySubscribers.forEach(callback => callback());
  }

  private notifyWeekSubscribers() {
    this._weekSubscribers.forEach(callback => callback());
  }

  private notifyMonthSubscribers() {
    this._monthSubscribers.forEach(callback => callback());
  }

  private notifyTodaySubscribers() {
    this._todaySubscribers.forEach(callback => callback());
  }

  get currentDate() { return this._currentDate; }
  get previousDate() { return this._previousDate }
  get todayDate() { return this._todayDate; }
}