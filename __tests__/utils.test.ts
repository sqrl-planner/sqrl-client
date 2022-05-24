import { minuteOffsetToTime, timeToMinuteOffset } from "../src/utils/time"
import {
    breakdownCourseCode,
    breakdownCourseIdentifier,
} from "../src/utils/course"
import course from "./course"
import { getMeetingTypes } from "../src/utils/course"

describe("time utility", () => {
    it("should convert time to minutes offset", () => {
        expect(timeToMinuteOffset(2, 30)).toBe(150)
    })

    it("should round to nearest resolution", () => {
        expect(timeToMinuteOffset(2, 36, 15)).toBe(150)
        expect(timeToMinuteOffset(2, 0, 15)).toBe(120)
        expect(timeToMinuteOffset(9, 59, 30)).toBe(600)
    })

    it("should not modulus over 24 hours", () => {
        expect(timeToMinuteOffset(25)).toBe(1500)
    })

    it("should convert minutes offset to time string", () => {
        expect(minuteOffsetToTime(150, true)).toBe("02:30")
        expect(minuteOffsetToTime(600, false)).toBe("10:00\u00a0AM")
        expect(minuteOffsetToTime(1320, false)).toBe("10:00\u00a0PM")
        expect(minuteOffsetToTime(1320, true)).toBe("22:00")
    })
})

describe("course utility", () => {
    it("should break down course code", () => {
        const { department, numeral, suffix } = breakdownCourseCode("MAT137Y1")
        expect(department).toBe("MAT")
        expect(numeral).toBe("137")
        expect(suffix).toBe("Y1")
    })

    it("should break down course identifier", () => {
        const { department, numeral, suffix, term, terminal } =
            breakdownCourseIdentifier("BMS100H1-F-20219")
        expect(department).toBe("BMS")
        expect(numeral).toBe("100")
        expect(suffix).toBe("H1")
        expect(term).toBe("F")
        expect(terminal).toBe("20219")
    })

    it("should get meeting types", () => {
        const { lecture } = getMeetingTypes(course)

        expect(lecture).toBe(true)
    })
})
