import styled from "styled-components"
import { chakra } from "@chakra-ui/react"
import Colour from "color"

export const StyledTimetableContainer = styled(chakra.div)`
    width: 100%;
    overflow-x: scroll;
    font-size: 0.625rem;
    /* background: #fafafa; */
`

export const StyledTimetable = styled.table`
    display: table;
    width: calc(100% - 0.25rem);
    min-width: 500px;
    margin: 1rem;
    margin-left: 0;
    padding: 0;
    border-collapse: collapse;
    @media print {
        width: 100vw;
        margin: 0;
    }
`

export const StyledHead = styled.tr`
    /* background-color: red; */
`

export const StyledTh = styled.th<{ dark: boolean; days?: number }>`
    border-left: 1px solid ${({ dark }) => (dark ? `#414141` : `#e2e8f0`)};
    font-size: 1rem;
    padding-bottom: 0.8em;

    &:first-of-type {
        border-left: none;
    }

    &:first-of-type:not() {
        width: ${({ days = 5 }) => `calc((100% - 4em) / ${days})`};
    }
`

export const StyledTr = styled.tr<{
    size: number
    resolution: number
    dark: boolean
}>`
    & .time {
        text-align: right;
        color: transparent;
        font-size: 1.4em;
        &::after {
            content: "-";
            color: ${({ dark }) =>
                dark ? `rgba(255,255,255, 0.2)` : `rgba(0, 0, 0, 0.2)`};
        }
    }

    /* set line height for noninteger times */
    & td {
        line-height: ${({ size = 20 }: { size?: number }) =>
            (size / 100) * 2 + "em"};

        transition: line-height 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
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
            color: ${({ dark }) => (dark ? `#dcdcdc` : `#333`)};
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
    position: relative;
    top: -0.6em;

    font-size: 1.4em;
    line-height: 1.4em;
`

export const MeetingTimeCell = styled.td<{ days: number; dark: boolean }>`
    padding: 0;
    position: relative;
    font-size: 1.2em;
    width: ${({ days = 5 }: { days: number }) => `calc((100%)  / ${days})`};
    border-left: 1px solid
        ${({ dark }: { dark: boolean }) => (dark ? `#414141` : `#e2e8f0`)};

    &:first-of-type {
        border-left: none;
    }
`

export const MeetingTime = styled.div`
    position: absolute;
    top: 0.2em;
    right: 0.3em;
    bottom: 0em;
    left: 0.3em;

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

    @media (max-width: 600px) {
        padding: 0.3rem;
        padding-left: 0.4rem;
    }
    padding-right: 0em;
    box-shadow: 1px 1px 4px -3px rgba(0, 0, 0, 0.4);
    transition: background-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: ${({
        courseKey = 0,
        palette,
        dark,
    }: {
        courseKey: number
        palette: string
        dark: boolean
    }) => courseKeyToColour(courseKey, dark, palettes[palette] as any)};
    /* color: ${({ palette }) => (palette === "accessible" ? "#fff" : "")}; */

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

// export const hexToRgb = (hex: string) => {
//     // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
//     var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
//     hex = hex.replace(shorthandRegex, function (m, r, g, b) {
//         return r + r + g + g + b + b
//     })

//     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
//     return result
//         ? {
//               r: parseInt(result[1], 16),
//               g: parseInt(result[2], 16),
//               b: parseInt(result[3], 16),
//           }
//         : null
// }

// export const rgbToHex = (r, g, b) =>
//     "#" +
//     [r, g, b]
//         .map((x) => {
//             const hex = x.toString(16)
//             return hex.length === 1 ? "0" + hex : hex
//         })
//         .join("")

export const courseKeyToColour = (
    courseKey: number,
    dark: boolean,
    colours?: string[],
    alpha: number = 1,
    lightenPercent: number = 0
) => {
    const defaultColours = palettes.default
    colours = colours || defaultColours

    if (dark) colours = HSLDarken(colours)
    // const rgb = hexToRgb(colours[courseKey % colours.length])
    // console.log(colours)

    // Darken
    // let r = Math.min((rgb.r * (100 + lightenPercent)) / 100, 255)
    // let g = Math.min((rgb.g * (100 + lightenPercent)) / 100, 255)
    // let b = Math.min((rgb.b * (100 + lightenPercent)) / 100, 255)
    // Format to css rgba value
    // return `rgba(${r}, ${g}, ${b}, ${alpha})`
    return colours[courseKey % colours.length]
}

// const makeGreyscale = (colours: string[]) => {
//     let newColours = []
//     for (const hex of colours) {
//         const rgb = hexToRgb(hex)

//         const x = 0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b
//         newColours.push(rgbToHex(x, x, x))
//     }
//     console.log(newColours)

//     return newColours
// }

const HSLGrayscale = (colours: string[]) =>
    colours.map((colour) => Colour(colour, "hsl").grayscale())

const HSLDarken = (colours: string[]) =>
    colours.map((colour) =>
        // Colour(colour, "hsl").darken(0.75).saturate(1.2).toString()
        Colour(colour, "hsl").darken(0.8).desaturate(0.6)
    )

const palettes = {
    default: [
        "hsl(0, 0%, 91.76470588235294%)",
        "hsl(43.99999999999999, 92.59259259259261%, 84.11764705882354%)",
        "hsl(205.16129032258067, 100%, 93.92156862745098%)",
        "hsl(127.24137931034483, 85.29411764705883%, 86.66666666666667%)",
        // "c9f7f7",
        "hsl(242.06896551724137, 52.72727272727269%, 89.21568627450979%)",
        "hsl(207.05882352941174, 67.99999999999997%, 85.29411764705883%)",
        "hsl(14.545454545454547, 100%, 93.52941176470588%)",
        "hsl(223.33333333333334, 64.28571428571435%, 89.01960784313725%)",
        "hsl(95.62499999999997, 72.72727272727275%, 91.37254901960785%)",
        "hsl(167.50000000000003, 63.15789473684209%, 85.09803921568627%)",
        "hsl(263.99999999999994, 45.45454545454547%, 87.05882352941177%)",
    ],
    // default: [
    //     "eaeaea",
    //     "c9ebab",
    //     "d6e2eb",
    //     "fce4d1",
    //     "d1dbf5",
    //     "c9f7f7",
    //     "eeead6",
    //     "e6f9d9",
    //     "c0dcf3",
    //     "c1f1e7",
    //     "dbcfed",
    // ],
    accessible: [
        "hsl(115, 100%, 69.41176470588235%)",
        "hsl(241.9230769230769, 100%, 69.41176470588235%)",
        "hsl(0, 100%, 50%)",
        "hsl(120, 100%, 50%)",
        "hsl(240, 100%, 50%)",
        "hsl(180, 100%, 50%)",
    ],
    // monochrome: ["hsl(0, 0%, 90%)", "hsl(0, 0%, 80%)"],
    monochrome: HSLGrayscale([
        "hsl(0, 0%, 91.76470588235294%)",
        "hsl(44, 92.59259259259261%, 84.11764705882354%)",
        "hsl(205.16129032258067, 100%, 93.92156862745098%)",
        "hsl(127.24137931034483, 85.29411764705883%, 86.66666666666667%)",
        // "c9f7f7",
        "hsl(242.06896551724137, 52.72727272727269%, 89.21568627450979%)",
        "hsl(207.05882352941174, 68%, 85.29411764705883%)",
        "hsl(14.545454545454547, 100%, 93.52941176470588%)",
        "hsl(223.33333333333334, 64.28571428571435%, 89.01960784313725%)",
        "hsl(95.625, 72.72727272727275%, 91.37254901960785%)",
        "hsl(167.5, 63.15789473684209%, 85.09803921568627%)",
        "hsl(264, 45.45454545454547%, 87.05882352941177%)",
    ]),
}
