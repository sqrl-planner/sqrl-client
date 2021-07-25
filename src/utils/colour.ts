export const courseKeyToColour = (courseKey: number, colours?: string[]) => {
    const defaultColours = [
        "efefef",
        "c9ebab",
        "d6e2eb",
        "fce4d1",
        "d1dbf5",
        "c9f7f7",
        "eeead6",
        "e6f9d9",
        "c0dcf3",
        "c1f1e7",
        "dbcfed",
    ]
    colours = colours || defaultColours
    return `#${colours[courseKey % colours.length]}`
}

// https://coolors.co/b39c4d-768948-607744-34623f-1e2f23-541388-d90368-2e294e-f7f7ff-279af1
// https://coolors.co/f6f7eb-e94f37-393e41-3f88c5-44bba4-758ecd-7189ff-bea7e5-4f772d-28afb0
// https://coolors.co/eed2cc-db5a42-393e41-3f88c5-44bba4-758ecd-afa98d-4f772d-28afb0-8c7aa9
// https://coolors.co/f1a66a-abe188-393e41-3f88c5-44bba4-758ecd-afa98d-4f772d-28afb0-8c7aa9
