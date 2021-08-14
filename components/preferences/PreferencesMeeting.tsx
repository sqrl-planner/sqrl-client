import { WarningTwoIcon } from "@chakra-ui/icons"
import { FormControl, FormLabel, Icon, Select } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import React, { Fragment, useEffect } from "react"
import { BiArrowFromRight } from "react-icons/bi"
import { FaClock, FaGlassMartiniAlt, FaTruckMoving } from "react-icons/fa"
import { GiResize } from "react-icons/gi"
import { ImSection } from "react-icons/im"
import styled from "styled-components"
import { usePreferences } from "../../src/PreferencesContext"
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
            showSection,
            showDelivery,
            highlightConflicts,
        },
        dispatch,
    } = usePreferences()

    useEffect(() => {
        dispatch({ type: "SET_CURRENT_PREF_TAB", payload: 2 })
    }, [dispatch])

    const { t } = useTranslation("preferences")

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
                    {t("meeting-times")}
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
                    {t("course-suffix")}
                </PreferencesToggle>
                <PreferencesToggle
                    isChecked={showDelivery}
                    actionType="SET_SHOW_DELIVERY"
                    iconProps={{
                        as: FaTruckMoving,
                    }}
                    helperText="Show medium of delivery (OS, OA, IP)."
                >
                    {t("delivery-method")}
                </PreferencesToggle>

                <PreferencesToggle
                    isChecked={showCategory}
                    actionType="SET_SHOW_CATEGORY"
                    iconProps={{
                        as: FaGlassMartiniAlt,
                    }}
                    helperText="Show meeting category (LEC, TUT, PRA)."
                >
                    {t("meeting-category")}
                </PreferencesToggle>

                <PreferencesToggle
                    isChecked={showSection}
                    actionType="SET_SHOW_SECTION"
                    iconProps={{
                        as: ImSection,
                    }}
                    helperText="Show meeting section (e.g. 0101)."
                >
                    {t("meeting-section")}
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
                    {t("highlight-conflicts")}
                </PreferencesToggle>
            </PreferencesSection>

            <PreferencesSection>
                <FormControl>
                    <FormLabel htmlFor="scale">
                        <IconWrapper>
                            <Icon as={GiResize} />
                        </IconWrapper>
                        {t("scale")}
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
                        <option value="20"> {t("compact")}</option>
                        <option value="40"> {t("normal")}</option>
                        <option value="100"> {t("tall")}</option>
                    </Select>
                </FormControl>
            </PreferencesSection>
        </Fragment>
    )
}

export default PreferencesMeeting
