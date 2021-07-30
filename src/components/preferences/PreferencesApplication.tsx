import {
    WarningTwoIcon,
    MoonIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from "@chakra-ui/icons"
import {
    FormControl,
    FormLabel,
    Icon,
    Select,
    Grid,
    Button,
    useColorMode,
} from "@chakra-ui/react"
import React, { Fragment } from "react"
import { BiArrowFromRight } from "react-icons/bi"
import { FaClock, FaSun, FaPalette, FaTruckMoving } from "react-icons/fa"
import { GiResize } from "react-icons/gi"
import { Ri24HoursLine } from "react-icons/ri"
import { ImSection } from "react-icons/im"
import { MdHighlight } from "react-icons/md"
import styled from "styled-components"
import { usePreferences } from "../../PreferencesContext"
import PreferencesSection from "./PreferencesSection"
import PreferencesToggle from "./PreferencesToggle"

const IconWrapper = styled.div`
    padding-right: 0.6em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PreferencesApplication = () => {
    const {
        state: {
            scale,
            start,
            end,
            showTimeInMeeting,
            showCourseSuffix,
            showCategory,
            showDelivery,
            palette,
            highlightConflicts,
            twentyFour,
            emphasize,
        },
        dispatch,
    } = usePreferences()

    const { colorMode, toggleColorMode } = useColorMode()
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
