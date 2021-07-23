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
 * 
 * @param time Convert a minute offset (from midnight) to an HH:MM time.
 * @returns A string representing the given time in the format HH:MM.
 */
export function minuteOffsetToTime(time: number): string {
    const hour = Math.floor(time / 60)
    const minute = time % 60
    return (
        hour.toString().padStart(2, "0") +
        ":" +
        minute.toString().padStart(2, "0")
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
