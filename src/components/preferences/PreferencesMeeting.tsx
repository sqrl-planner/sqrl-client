import { WarningTwoIcon } from "@chakra-ui/icons"
import { FormControl, FormLabel, Icon, Select } from "@chakra-ui/react"
import React, { Fragment, useEffect } from "react"
import { BiArrowFromRight } from "react-icons/bi"
import { FaClock, FaTruckMoving } from "react-icons/fa"
import { GiResize } from "react-icons/gi"
import { ImSection } from "react-icons/im"
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

const PreferencesMeeting = () => {
    const {
        state: {
            scale,
            showTimeInMeeting,
            showCourseSuffix,
            showCategory,
            showDelivery,
            highlightConflicts,
        },
        dispatch,
    } = usePreferences()

    useEffect(() => {
        dispatch({ type: "SET_CURRENT_PREF_TAB", payload: 2 })
    }, [dispatch])

    return (
        <Fragment>
            <PreferencesSection>
                <PreferencesToggle
                    isChecked={showTimeInMeeting}
                    actionType="SET_SHOW_TIME_IN_MEETING"
                    iconProps={{
                        as: FaClock,
                    }}
                >
                    Meeting times
                </PreferencesToggle>
                <PreferencesToggle
                    isChecked={showCourseSuffix}
                    actionType="SET_SHOW_COURSE_SUFFIX"
                    iconProps={{
                        as: BiArrowFromRight,
                        transform: "rotate(180deg) scale(1.2)",
                    }}
                    helperText="Show course credit designator (Y1, H1, H5, etc.)."
                >
                    Course suffix
                </PreferencesToggle>
                <PreferencesToggle
                    isChecked={showDelivery}
                    actionType="SET_SHOW_DELIVERY"
                    iconProps={{
                        as: FaTruckMoving,
                    }}
                    helperText="Show medium of delivery (OS, OA, IP)."
                >
                    Delivery method
                </PreferencesToggle>

                <PreferencesToggle
                    isChecked={showCategory}
                    actionType="SET_SHOW_CATEGORY"
                    iconProps={{
                        as: ImSection,
                    }}
                    helperText="Show meeting section (e.g. LEC 0101)."
                >
                    Meeting section
                </PreferencesToggle>
            </PreferencesSection>

            <PreferencesSection>
                <PreferencesToggle
                    isChecked={highlightConflicts}
                    actionType="SET_HIGHLIGHT_CONFLICTS"
                    iconProps={{
                        as: WarningTwoIcon,
                    }}
                >
                    Highlight conflicts
                </PreferencesToggle>
            </PreferencesSection>

            <PreferencesSection>
                <FormControl>
                    <FormLabel htmlFor="scale">
                        <IconWrapper>
                            <Icon as={GiResize} />
                        </IconWrapper>
                        Scale
                    </FormLabel>
                    <Select
                        id="scale"
                        value={scale}
                        onChange={(e) => {
                            const payload = parseInt(e.target.value)

                            dispatch({
                                type: "SET_SCALE",
                                payload,
                            })
                        }}
                    >
                        <option value="20">Compact</option>
                        <option value="40">Normal</option>
                        <option value="100">Tall</option>
                    </Select>
                </FormControl>
            </PreferencesSection>
        </Fragment>
    )
}

export default PreferencesMeeting
