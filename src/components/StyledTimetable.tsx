import React from "react"
import styled from "styled-components"

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

export const StyledHead = styled.thead`
    /* background-color: red; */
`

export const StyledTh = styled.th`
    border-right: 1px solid #e2e8f0;
`

export const StyledTr = styled.tr`
    height: 100%;
    min-height: 100%;

    & .time {
        text-align: right;
        color: transparent;
        &::after {
            content: "-";
            color: rgba(0, 0, 0, 0.3);
        }
    }

    &:nth-child(${({ resolution = 15 }: { resolution: number }) =>
                `${60 / resolution}n - ${60 / resolution - 1}`}) {
        .time {
            color: inherit;

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
    width: 8rem;
    font-variant-numeric: proportional-nums;
    font-family: monospace;
    padding-right: 2rem;
    border-right: 1px solid #e2e8f0;
`

export const MeetingTimeCell = styled.td`
    padding: 0.3rem 0.8rem;
    /* min-height: 1px; */
    /* height: 100%; */
    height: ${() => {
        if (navigator.userAgent.indexOf("Firefox") !== -1) return "100%"
        return "1px"
    }};
    width: ${({ days = 5 }: { days: number }) =>
        `calc((100vw - 8rem) / ${days})`};
    border-right: 1px solid #e2e8f0;
`

export const MeetingTime = styled.div`
    width: 100%;
    height: 100%;
    /* min-height: 400%; */
    position: relative;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 1px 1px 6px -2px rgba(0, 0, 0, 0.3);
    // background-color: red;
    border: 1px solid #e2e8f0;
`

// export const TimeLabelCell = styled(MeetingTimeCell)``
