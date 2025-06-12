import { compareAsc, isSameDay } from "date-fns"
import { Event, Activity } from "./data"
import { useCalendar } from "@/components/CalendarContext"

export const compareEventTimes = (eventA: Event, eventB: Event): number => {
  return compareAsc(eventA.start, eventB.start)
}

export const compareActivityTimes = (activityA: Activity, activityB: Activity): number => {
  if (!activityA.due || !activityB.due) {
    return 0
  }
  const result = compareAsc(activityA.due, activityB.due)
  if (result !== 0) {
    return result
  }
  return activityA.title.localeCompare(activityB.title)
}

export const isActivityCurrent = (activity: Activity) => {
  const { calendarState } = useCalendar()
  if (activity.due) {
    if (isSameDay(activity.due, calendarState.currentDate)) {
      return true
    }
  }
  return false
}