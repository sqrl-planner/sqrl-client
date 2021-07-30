import { useColorMode } from "@chakra-ui/react"
import React, { Fragment } from "react"
import { MdHighlight } from "react-icons/md"
import { Ri24HoursLine } from "react-icons/ri"
import styled from "styled-components"
import { usePreferences } from "../../PreferencesContext"
import PreferencesSection from "./PreferencesSection"
import PreferencesToggle from "./PreferencesToggle"

const PreferencesApplication = () => {
    const {
        state: { twentyFour, emphasize },
    } = usePreferences()

    return (
        <Fragment>
            <PreferencesSection>
                <PreferencesToggle
                    isChecked={twentyFour}
                    actionType="SET_TWENTY_FOUR"
                    iconProps={{
                        as: Ri24HoursLine,
                    }}
                >
                    24-hour time
                </PreferencesToggle>
            </PreferencesSection>
            <PreferencesSection>
                <PreferencesToggle
                    isChecked={emphasize}
                    actionType="SET_EMPHASIZE"
                    iconProps={{
                        as: MdHighlight,
                    }}
                    helperText="Dim other courses on hover"
                >
                    Emphasize on hover
                </PreferencesToggle>
            </PreferencesSection>
        </Fragment>
    )
}

export default PreferencesApplication
