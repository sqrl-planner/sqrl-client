/**
 * Convert a HH:MM time to minutes from midnight.
 * @param hour Hour component of time
 * @param minute Minute component of time
 * @returns The time given as an offset in minutes from midnight.
 */
export function timeToMinuteOffset(
    hour: number,
    minute: number = 0,
    resolution: number = 15
): number {
    minute = Math.min(Math.round(minute / resolution) * resolution, 60)
    return hour * 60 + minute
}

/**
 * Convert a minute offset (from midnight) to an HH:MM time.
 * @param time Minutes from midnight
 * @returns A string representing the given time in the format HH:MM.
 */
export function minuteOffsetToTime(time: number, twentyFour: boolean): string {
    const hour = Math.floor(time / 60)
    let h = hour
    let suffix: string = ""

    if (!twentyFour) {
        h = hour % 12 || 12
        suffix = hour < 12 || hour === 24 ? "\u00a0AM" : "\u00a0PM"
    }

    const minute = time % 60
    return (
        h.toString().padStart(2, "0") +
        ":" +
        minute.toString().padStart(2, "0") +
        suffix
    )
}

/**
 * An enum containing days of the week.
 */
export enum Day {
    MONDAY = "Monday",
    TUESDAY = "Tuesday",
    WEDNESDAY = "Wednesday",
    THURSDAY = "Thursday",
    FRIDAY = "Friday",
    // SATURDAY = 'Saturday',
    // SUNDAY = 'Sunday'
}

/**
 * An array containing the week days (Monday to Friday).
 */
export const WEEK_DAYS: Day[] = [
    Day.MONDAY,
    Day.TUESDAY,
    Day.WEDNESDAY,
    Day.THURSDAY,
    Day.FRIDAY,
]

export type StandardDayOfWeek = "MO" | "TU" | "WE" | "TH" | "FR"
