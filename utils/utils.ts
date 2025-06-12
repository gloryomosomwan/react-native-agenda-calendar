import { compareAsc } from "date-fns"
import { Event, Activity } from "./data"

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