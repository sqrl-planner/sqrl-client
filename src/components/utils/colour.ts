// interface Hsl {
//     h?: number
//     s?: number
//     l?: number
// }

// // Adapted from https://gist.github.com/xenozauros/f6e185c8de2a04cdfecf
// export const hexToHSL = (hex: string): Hsl => {
//     const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
//     let r = parseInt(result![1], 16)
//     let g = parseInt(result![2], 16)
//     let b = parseInt(result![3], 16)
//     r /= 255
//     g /= 255
//     b /= 255

//     const max = Math.max(r, g, b),
//         min = Math.min(r, g, b)
//     let h,
//         s,
//         l = (max + min) / 2
//     if (max === min) {
//         h = s = 0 // achromatic
//     } else {
//         const d = max - min
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
//         switch (max) {
//             case r:
//                 h = (g - b) / d + (g < b ? 6 : 0)
//                 break
//             case g:
//                 h = (b - r) / d + 2
//                 break
//             case b:
//                 h = (r - g) / d + 4
//                 break
//         }
//         ;(h as number) /= 6
//     }
//     const HSL: Hsl = {}

//     HSL["h"] = h
//     HSL["s"] = s
//     HSL["l"] = l

//     return HSL
// }

// export const stringToColour = (str: string): string => {
//     let hash = 0
//     for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash)
//     }
//     let colour = "#"
//     for (let i = 0; i < 3; i++) {
//         const value = (hash >> (i * 8)) & 0xff
//         colour += ("00" + value.toString(16)).substr(-2)
//     }
//     return colour
// }

export const stringToLightColour = (str: string) => {
    // const hsl = hexToHSL(stringToColour(str))
    // hsl["s"] = hsl["s"]! / 1.5
    // hsl["l"] = Math.min(hsl["l"]! * 1.8, 0.7)

    // return `hsl(${(hsl.h as number) * 100}, ${(hsl.s as number) * 100}%, ${
    //     (hsl.l as number) * 100
    // }%)`
    return "#efefef"
}
