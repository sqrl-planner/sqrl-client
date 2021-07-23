import React from "react"
import styled from "styled-components"
import { stringToLightColour } from "./utils/colour"

export const StyledTimetable = styled.table`
    /* background-color: red; */
    display: table;
    width: calc(100vw - 2rem);
    min-width: 800px;
    margin: 2rem;
    border-collapse: collapse;
    /* table-layout: fixed; */
    /* max-width: 100vw; */
`

export const StyledHead = styled.tr`
    /* background-color: red; */
`

export const StyledTh = styled.th`
    border-right: 1px solid #e2e8f0;
    padding-bottom: 2rem;
    /* width: calc(100vw / 4); */
    /* width: 100rem; */
    &:first-of-type:not() {
        width: ${({ days = 5 }: { days?: number }) =>
            `calc((100vw - 4rem) / ${days})`};
    }
`

export const StyledTr = styled.tr`
    /* height: 100%;
    min-height: 100%; */

    & .time {
        text-align: right;
        color: transparent;
        &::after {
            content: "-";
            color: rgba(0, 0, 0, 0.3);
        }
    }

    /* set line height for noninteger times */
    & td {
        line-height: 0.5rem;
    }

    &:nth-child(${({ resolution = 15 }: { resolution: number }) =>
                `${60 / resolution}n - ${60 / resolution - 1}`}) {
        & td {
            line-height: var(--chakra-lineHeights-base);
        }

        .time {
            color: #333;
            font-weight: 500;

            &::after {
                content: "";
            }
        }
    }
`

export const StyledTbody = styled.tbody`
    /* background-color: red; */
`

export const StyledTimeLabelTd = styled.td`
    width: 1px;
    font-variant-numeric: proportional-nums;
    font-family: monospace;
    padding-right: 2rem;
    border-right: 1px solid #e2e8f0;
    position: relative;
    top: -1rem;

    &:last-of-type {
        border-right: none;
    }

    font-size: 1.4rem;
`

export const MeetingTimeCell = styled.td`
    padding: 0.3rem 0.8rem;
    position: relative;
    font-size: 1.2rem;
    width: ${({ days = 5 }: { days: number }) =>
        `calc((100vw - 8rem) / ${days})`};
    border-right: 1px solid #e2e8f0;
`

export const MeetingTime = styled.div<{ meeting: string }>`
    position: absolute;
    top: 0.1rem;
    right: 0.4rem;
    bottom: 0.1rem;
    left: 0.4rem;
    font-weight: 500;
    /* min-height: 400%; */
    /* border-radius: 0.5rem; */
    border-radius: 0;
    padding: 0.8rem;
    box-shadow: 1px 1px 4px -3px rgba(0, 0, 0, 0.4);
    background-color: ${({ meeting = "1" }: { meeting: string }) =>
        stringToLightColour(meeting)};

    /* border: 1px solid #e2e8f0; */
`

// export const TimeLabelCell = styled(MeetingTimeCell)``
