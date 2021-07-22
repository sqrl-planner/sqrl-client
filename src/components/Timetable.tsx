import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Center
} from "@chakra-ui/react"
import React, { FunctionComponent } from 'react';

type TimetableProps = {
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
    const DAYS: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    let tableRows = [];
    for (let hour = minHour; hour <= maxHour; hour++) {
        const hourLabel = hour.toString().padStart(2, '0');
        for (let minute = 0; minute < 60; minute += resolution) {
            const timeLabel = hourLabel + ':' + minute.toString().padStart(2, '0');
            tableRows.push((
                <Tr>
                    <Td>{timeLabel}</Td>
                </Tr>
            ))
        }
    }
    return (
        <Table variant="simple">
            <Thead>
                <Th></Th>
                {DAYS.map(day => <Th><Center>{day}</Center></Th>)}
            </Thead>
            <Tbody>
                {tableRows}
            </Tbody>
        </Table>
    )
};