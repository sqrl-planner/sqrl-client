import { Flex } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import React, { FunctionComponent, useMemo } from "react"
import { useHoverContext } from "../../src/HoverContext"
import { useAppContext } from "../../src/SqrlContext"
import {
    Day,
    minuteOffsetToTime,
    timeToMinuteOffset,
    WEEK_DAYS,
} from "../../src/utils/time"
import { Meeting, MeetingGroup, partitionMeetingsByDay } from "./Meeting"
import MeetingComponent from "./MeetingComponent"
import {
    MeetingTime,
    MeetingTimeCell,
    Palettes,
    StyledHead,
    StyledTbody,
    StyledTh,
    StyledThead,
    StyledTimeLabelTd,
    StyledTimetable,
    StyledTimetableContainer,
    StyledTr,
} from "./StyledTimetable"

type TimetableProps = {
    /**
     * The meetings to display on the timetable.
     */
    meetings: Meeting[]
    /**
     * The earliest time displayed on the timetable, given in minutes offset from midnight.
     */
    minTime?: number
    /**
     * The latest time displayed on the timetable, given in minutes offset from midnight.
     */
    maxTime?: number
    /**
     * The minute resolution of the timetable (in the range (0, 60]).
     */
    resolution?: number
    /**
     * The scale of the timetable
     */
    scale?: number
    /**
     * The palette of the timetable
     */
    palette?: keyof Palettes
    /**
     * Whether to highlight conflicts
     */
    highlightConflicts?: boolean
    /**
     * Clock: 12 or 24?
     */
    twentyFour?: boolean
    /**
     * Dark mode
     */
    dark?: boolean

    /**
     * Emphasize on hover
     */
    emphasizeOnHover?: boolean
    /**
     * The days of the week to include on the timetable.
     */
    days?: Day[]
}

export const Timetable: FunctionComponent<TimetableProps> = ({
    meetings,
    minTime = timeToMinuteOffset(8),
    maxTime = timeToMinuteOffset(22),
    resolution = 15,
    scale = 45,
    palette = "default",
    highlightConflicts = true,
    twentyFour = true,
    dark = false,
    emphasizeOnHover = true,
    days = WEEK_DAYS,
}) => {
    const {
        state: { hoverCourseKey },
        dispatch,
    } = useHoverContext()

    const {
        state: { sidebarCourse, hoverMeeting },
        dispatch: dispatchAppContext,
    } = useAppContext()

    const setHoverCourseKey = (courseKey: number | null) => {
        dispatch({ type: "SET_CURRENT_HOVER", payload: courseKey })
    }

    const { t } = useTranslation("common")

    // TODO: Ensure 0 < minTime < maxTime <= 60 * 24
    // TODO: Ensure that 0 < resolution <= 60

    const JSONMeetings = JSON.stringify(meetings)

    // Disabled because meetings is expressed as a dependency as the JSON string
    const groupsByDay = useMemo(
        () => partitionMeetingsByDay(meetings, days),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [JSONMeetings, days]
    )
    const tableRows: Array<React.ReactNode> = []
    for (
        let currentTime = minTime;
        currentTime <= maxTime;
        currentTime += resolution
    ) {
        const timeLabel = minuteOffsetToTime(currentTime, twentyFour)
        const cells = [
            <StyledTimeLabelTd key={currentTime} className="time">
                {timeLabel}
            </StyledTimeLabelTd>,
        ]

        for (const day of days) {
            let isOccupied = false
            for (const group of groupsByDay!.get(day) as any) {
                const groupStartTime = group.getMinStartTime()
                const groupEndTime = group.getMaxEndTime()
                if (
                    groupStartTime <= currentTime &&
                    currentTime < groupEndTime
                ) {
                    isOccupied = true
                }

                const rowspan = Math.ceil(
                    (groupEndTime - groupStartTime) / resolution
                )

                if (groupStartTime !== currentTime) continue

                if (group.meetings.length === 1) {
                    // No conflicts
                    const meeting = group.meetings[0] as Meeting

                    const isSameCourseAndCategory =
                        hoverMeeting.courseIdentifier === meeting.identifier &&
                        hoverMeeting.meeting.substring(0, 3) ===
                            meeting.category.substring(0, 3).toUpperCase()

                    // Should dim when hovered meeting is same category as this but codes dont match
                    const shouldDim =
                        isSameCourseAndCategory &&
                        hoverMeeting.meeting !==
                            `${meeting.category
                                .substring(0, 3)
                                .toUpperCase()}-${meeting.section}`

                    // Should indicate positive when hovered meeting is this
                    const shouldIndicatePositive =
                        isSameCourseAndCategory &&
                        hoverMeeting.meeting ===
                            `${meeting.category
                                .substring(0, 3)
                                .toUpperCase()}-${meeting.section}`

                    cells.push(
                        <MeetingTimeCell
                            key={day}
                            days={days.length}
                            rowSpan={rowspan}
                            dark={dark}
                        >
                            <MeetingTime
                                tabIndex={0}
                                courseKey={meeting.courseKey}
                                palette={palette}
                                dark={dark}
                                highlight={
                                    hoverCourseKey === meeting.courseKey &&
                                    emphasizeOnHover
                                }
                                onMouseEnter={() =>
                                    setHoverCourseKey(meeting.courseKey)
                                }
                                onMouseLeave={() => setHoverCourseKey(null)}
                                onClick={() => {
                                    dispatchAppContext({
                                        type: "SET_SIDEBAR_COURSE",
                                        payload: meeting.identifier,
                                    })
                                    dispatchAppContext({
                                        type: "SET_SIDEBAR",
                                        payload: 1,
                                    })
                                }}
                                style={{
                                    boxShadow:
                                        meeting.identifier === sidebarCourse
                                            ? `${
                                                  shouldIndicatePositive
                                                      ? ""
                                                      : "inset"
                                              } 0 0 0 0.1rem ${
                                                  shouldIndicatePositive
                                                      ? "rgba(85, 206, 69, 0.7)"
                                                      : "rgba(60, 142, 230, 0.7)"
                                              }`
                                            : "",
                                    cursor:
                                        meeting.identifier === sidebarCourse
                                            ? "default"
                                            : "",
                                    opacity: shouldDim ? "0.3" : "",
                                }}
                            >
                                <MeetingComponent
                                    darkText={!dark}
                                    meeting={meeting}
                                    twentyFour={twentyFour}
                                />
                            </MeetingTime>
                        </MeetingTimeCell>
                    )
                } else {
                    // Conflicts
                    const percent = 100 / group.meetings.length

                    const items: Array<React.ReactNode> = []
                    group.meetings.forEach(
                        (meeting: Meeting, index: number) => {
                            const height =
                                ((meeting.endTime - meeting.startTime) /
                                    (groupEndTime - groupStartTime)) *
                                100

                            const isSameCourseAndCategory =
                                hoverMeeting.courseIdentifier ===
                                    meeting.identifier &&
                                hoverMeeting.meeting.substring(0, 3) ===
                                    meeting.category
                                        .substring(0, 3)
                                        .toUpperCase()

                            // Should dim when hovered meeting is same category as this but codes dont match
                            const shouldDim =
                                isSameCourseAndCategory &&
                                hoverMeeting.meeting !==
                                    `${meeting.category
                                        .substring(0, 3)
                                        .toUpperCase()}-${meeting.section}`

                            // Should indicate positive when hovered meeting is this
                            const shouldIndicatePositive =
                                isSameCourseAndCategory &&
                                hoverMeeting.meeting ===
                                    `${meeting.category
                                        .substring(0, 3)
                                        .toUpperCase()}-${meeting.section}`

                            items.push(
                                <MeetingTime
                                    key={index}
                                    tabIndex={0}
                                    onMouseEnter={() =>
                                        setHoverCourseKey(meeting.courseKey)
                                    }
                                    onMouseLeave={() => setHoverCourseKey(null)}
                                    style={{
                                        position: "absolute",
                                        width: `calc(${percent}% - 0.4em)`,
                                        height: `calc(${height}% - 0.1em)`,
                                        left: `calc(${index * percent}% + ${
                                            !index ? "0.3em" : "0.1em"
                                        })`,
                                        // top position is percent of meeting starttime of group starttime
                                        top: `calc(${
                                            ((meeting.startTime -
                                                groupStartTime) /
                                                (groupEndTime -
                                                    groupStartTime)) *
                                            100
                                        }% + 0.1rem)`,
                                        backgroundColor:
                                            highlightConflicts &&
                                            // meeting.identifier !== sidebarCourse &&
                                            (!(
                                                hoverCourseKey ===
                                                meeting.courseKey
                                            ) ||
                                                !emphasizeOnHover) &&
                                            !(
                                                meeting.identifier ===
                                                    hoverMeeting.courseIdentifier &&
                                                hoverMeeting.meeting.substring(
                                                    0,
                                                    3
                                                ) ===
                                                    meeting.category
                                                        .substring(0, 3)
                                                        .toUpperCase()
                                            )
                                                ? "#c53030"
                                                : "",
                                        lineHeight:
                                            "var(--chakra-lineHeights-base)",
                                        boxShadow:
                                            meeting.identifier === sidebarCourse
                                                ? `${
                                                      shouldIndicatePositive
                                                          ? ""
                                                          : "inset"
                                                  } 0 0 0 0.1rem ${
                                                      shouldIndicatePositive
                                                          ? "rgba(85, 206, 69, 0.7)"
                                                          : "rgba(60, 142, 230, 0.7)"
                                                  }`
                                                : "",
                                        cursor:
                                            meeting.identifier === sidebarCourse
                                                ? "default"
                                                : "",
                                        opacity: shouldDim ? "0.3" : "",
                                    }}
                                    courseKey={meeting.courseKey}
                                    palette={palette}
                                    dark={dark}
                                    highlight={
                                        hoverCourseKey === meeting.courseKey &&
                                        emphasizeOnHover
                                    }
                                    conflict={highlightConflicts}
                                    onClick={() => {
                                        dispatchAppContext({
                                            type: "SET_SIDEBAR_COURSE",
                                            payload: meeting.identifier,
                                        })
                                        dispatchAppContext({
                                            type: "SET_SIDEBAR",
                                            payload: 1,
                                        })
                                    }}
                                >
                                    <MeetingComponent
                                        darkText={
                                            !(dark || highlightConflicts) ||
                                            (emphasizeOnHover &&
                                                hoverCourseKey ===
                                                    meeting.courseKey &&
                                                !dark) ||
                                            (meeting.identifier ===
                                                hoverMeeting.courseIdentifier &&
                                                hoverMeeting.meeting.substring(
                                                    0,
                                                    3
                                                ) ===
                                                    meeting.category
                                                        .substring(0, 3)
                                                        .toUpperCase() &&
                                                !dark)
                                            //  || meeting.identifier === sidebarCourse
                                        }
                                        meeting={meeting}
                                        twentyFour={twentyFour}
                                    />
                                </MeetingTime>
                            )
                        }
                    )
                    cells.push(
                        <MeetingTimeCell
                            key={day}
                            days={days.length}
                            rowSpan={rowspan}
                            dark={dark}
                        >
                            <Flex>{items}</Flex>
                        </MeetingTimeCell>
                    )
                }
                break
            }

            if (!isOccupied) {
                cells.push(
                    <MeetingTimeCell key={day} days={days.length} dark={dark} />
                )
            }
        }
        tableRows.push(
            <StyledTr
                key={currentTime}
                size={scale}
                resolution={resolution}
                dark={dark}
            >
                {cells}
            </StyledTr>
        )
    }

    return (
        <StyledTimetableContainer>
            <StyledTimetable>
                <StyledThead dark={dark}>
                    <StyledHead>
                        <StyledTh dark={dark}></StyledTh>
                        {days.map((day, index) => (
                            <StyledTh key={index} dark={dark}>
                                {t(day.toString().substr(0, 3).toLowerCase())}
                            </StyledTh>
                        ))}
                    </StyledHead>
                </StyledThead>
                <StyledTbody>{tableRows}</StyledTbody>
            </StyledTimetable>
        </StyledTimetableContainer>
    )
}

// yellow dog
