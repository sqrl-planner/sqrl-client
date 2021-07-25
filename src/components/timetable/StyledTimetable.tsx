import styled from "styled-components"
import { courseKeyToColour } from "../../utils/colour"

export const StyledTimetableContainer = styled.div`
    width: 100vw;
    overflow-x: scroll;
    font-size: 0.625rem;
    background: #fafafa;
`

export const StyledTimetable = styled.table`
    display: table;
    width: calc(100% - 1rem);
    min-width: 500px;
    margin: 1rem;
    border-collapse: collapse;
    /* table-layout: fixed; */
    @media print {
        width: 100vw;
        margin: 0;
    }
`

export const StyledHead = styled.tr`
    /* background-color: red; */
`

export const StyledTh = styled.th`
    border-right: 1px solid #e2e8f0;
    font-size: 1rem;
    padding-bottom: 2em;
    &:first-of-type:not() {
        width: ${({ days = 5 }: { days?: number }) =>
            `calc((100% - 4em) / ${days})`};
    }
`

export const StyledTr = styled.tr<{ size: number; resolution: number }>`
    & .time {
        text-align: right;
        color: transparent;
        font-size: 1.4em;
        &::after {
            content: "-";
            color: rgba(0, 0, 0, 0.2);
        }
    }

    /* set line height for noninteger times */
    & td {
        line-height: ${({ size = 20 }: { size?: number }) =>
            (size / 100) * 2 + "em"};

        transition: line-height 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &:nth-child(${({ resolution = 15 }: { resolution?: number }) =>
                `${60 / resolution}n - ${60 / resolution - 1}`}) {
        & td {
            line-height: var(--chakra-lineHeights-base);
        }

        position: relative;
        /* 
        &:hover::after {
            content: "";
            width: 100%;
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            height: 1px;
            top: 0.1em;
            background-color: rgba(0, 0, 0, 0.6);
            border-top: 1px solid black;
        } */

        .time {
            color: #333;
            font-weight: 500;

            &::after {
                content: "";
            }
        }
    }
`

export const StyledTbody = styled.tbody``

export const StyledTimeLabelTd = styled.td`
    width: 1px;
    font-variant-numeric: proportional-nums;
    font-family: interstate-mono, monospace;
    padding-right: 1em;
    border-right: 1px solid #e2e8f0;
    position: relative;
    top: -1em;

    font-size: 1.4em;
    line-height: 1.4em;
`

export const MeetingTimeCell = styled.td`
    /* padding: 0.3em 0.8em; */
    padding: 0;
    position: relative;
    font-size: 1.2em;
    width: ${({ days = 5 }: { days: number }) => `calc((100%)  / ${days})`};
    border-right: 1px solid #e2e8f0;
`

export const MeetingTime = styled.div`
    position: absolute;
    top: 0.2em;
    right: 0.4em;
    bottom: 0;
    left: 0.4em;

    /* border-radius: 0.3em; */

    &,
    & > * {
        /* flex: 1; */
        word-break: keep-all;
        /* white-space: nowrap; */
        overflow: hidden;
        text-overflow: ellipsis;
    }

    font-weight: 500;
    /* line-height: 1.5em; */

    padding: 0.6rem;
    padding-right: 0em;
    box-shadow: 1px 1px 4px -3px rgba(0, 0, 0, 0.4);
    background-color: ${({ courseKey = 0 }: { courseKey: number }) =>
        courseKeyToColour(courseKey)};

    @media print {
        font-size: 10pt;
        line-height: 12pt;
        border: 1px solid black;
        box-shadow: none;

        &,
        & > * {
            /* white-space: nowrap; */
            overflow: visible;
        }
    }
`

// export const TimeLabelCell = styled(MeetingTimeCell)``
