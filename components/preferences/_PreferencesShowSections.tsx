import { Grid, useRadioGroup } from "@chakra-ui/react"
import React from "react"
import { usePreferences } from "../../PreferencesContext"
import { capitalize } from "../../utils/misc"
import RadioTextCard from "./RadioTextCard"

const PreferencesShowSections = () => {
    const options = ["both", "first", "second"]

    const {
        state: { showSemester },
        dispatch,
    } = usePreferences()

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "showSections",
        defaultValue: showSemester,
        onChange: (semester: "first" | "second" | "both") => {
            dispatch({ type: "SET_SHOW_SEMESTER", payload: semester })
        },
    })

    const group = getRootProps()

    return (
        <Grid gridTemplateColumns="repeat(3, auto)" {...group} gap={4}>
            {options.map((value) => {
                const radio = getRadioProps({ value, enterKeyHint: "enter" })
                return (
                    <RadioTextCard key={value} {...radio}>
                        {capitalize(value)}
                    </RadioTextCard>
                )
            })}
        </Grid>
    )
}

export default PreferencesShowSections
