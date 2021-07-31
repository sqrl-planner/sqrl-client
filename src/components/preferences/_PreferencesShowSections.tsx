import { useRadioGroup, HStack, Grid } from "@chakra-ui/react"
import React from "react"
import RadioTextCard from "./RadioTextCard"
import { capitalize } from "../../utils/misc"
import { usePreferences } from "../../PreferencesContext"

const PreferencesShowSections = () => {
    const options = ["both", "first", "second"]

    const {
        state: { showSemester },
        dispatch,
    } = usePreferences()

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "showSections",
        defaultValue: showSemester,
        onChange: (semester: string) => {
            dispatch({ type: "SET_SHOW_SEMESTER", payload: semester })
        },
    })

    const group = getRootProps()

    return (
        // <HStack {...group}>
        <Grid gridTemplateColumns="repeat(3, auto)" {...group} gap={4}>
            {options.map((value) => {
                const radio = getRadioProps({ value, enterKeyHint: "enter" })
                return (
                    <RadioTextCard key={value} {...radio}>
                        {capitalize(value)}
                    </RadioTextCard>
                )
            })}
            {/* </HStack> */}
        </Grid>
    )
}

export default PreferencesShowSections
