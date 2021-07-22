import {
    Box,
    Center, Table, Tbody, Td, Th, Thead, Tr, useToast
} from "@chakra-ui/react";
import React, { FunctionComponent, useEffect } from 'react';
import { Meeting, Day, meetings } from "./Meeting"


type TimetableProps = {
    // meetings: Meeting[];
    /**
     * The earliest hour displayed on the timetable (between 0 and 24).
     */
    minHour?: number;
    /**
     * The latest hour displayed on the timetable (between 0 and 24).
     */
    maxHour?: number;
    /**
     * The minute resolution of the timetable (in the range (0, 60]).
     */
    resolution?: number;
}

export const Timetable: FunctionComponent<TimetableProps> = ({
    minHour = 8,
    maxHour = 22,
    resolution = 15
}) => {
    // TODO: Ensure that 0 <= minHour < maxHour <= 24
    // TODO: Ensure that 0 < resolution <= 60

    // For now, let's only support week days! Fuck the kids who want to do classes on the weekends.
    const DAYS = [Day.MONDAY, Day.TUESDAY, Day.WEDNESDAY, Day.THURSDAY, Day.FRIDAY];
    let tableRows: Array<any> = [];
    for (let hour = minHour; hour <= maxHour; hour++) {
        const hourLabel = hour.toString().padStart(2, '0');
        for (let minute = 0; minute < 60; minute += resolution) {
            // Find all meetings that start on/near the current time
            const currentTime = Meeting.timeToMinuteOffset(hour, minute, resolution);
            const timeLabel = hourLabel + ':' + minute.toString().padStart(2, '0');
            console.log(timeLabel, currentTime);

            // Map meetings by day
            const meetingsByDay = new Map();
            for (const meeting of meetings) {
                if (meeting.startTime !== currentTime) continue;
                if (!meetingsByDay.has(meeting.day)) {
                    meetingsByDay.set(meeting.day, []);
                }
                meetingsByDay.get(meeting.day).push(meeting);
            }

            let cells = [(<td>{timeLabel}</td>)];
            for (const day of DAYS) {
                const hasMeetings = meetingsByDay.has(day) && meetingsByDay.get(day).length > 0;
                if (hasMeetings) {
                    // Compute rowspan lmao
                    // Assume there is only one meeting for now
                    const meeting = meetingsByDay.get(day)[0];
                    const rowspan = Math.ceil((meeting.endTime - meeting.startTime) / resolution);
                    cells.push((<td rowSpan={rowspan}><div>test</div></td>));
                } else {
                    cells.push((<td />));
                }
            }
            tableRows.push((<tr>{cells}</tr>))
        }
    }

    const toast = useToast()

    useEffect(() => {
        if (Math.random() < 0.2) toast({ title: "nut" })
    }, [])

    return (
        <table style={{ tableLayout: "fixed" }}>
            <thead>
                <th></th>
                {DAYS.map(day => <th>{day.toString().substr(0, 3)}</th>)}
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
    )
};