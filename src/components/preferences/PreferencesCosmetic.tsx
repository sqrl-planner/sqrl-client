import {
    MoonIcon,
    TriangleDownIcon,
    TriangleUpIcon,
    WarningTwoIcon,
} from "@chakra-ui/icons"
import {
    Button,
    FormControl,
    FormLabel,
    Grid,
    Icon,
    Select,
    useColorMode,
} from "@chakra-ui/react"
import React, { Fragment } from "react"
import { BiArrowFromRight } from "react-icons/bi"
import { FaClock, FaPalette, FaSun, FaTruckMoving } from "react-icons/fa"
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

const PreferencesTimetable = () => {
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
        },
        dispatch,
    } = usePreferences()

    const { colorMode, toggleColorMode } = useColorMode()
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
                    helperText="Show course credit designator (Y1, H1, H5, etc.)"
                >
                    Course suffix
                </PreferencesToggle>
                <PreferencesToggle
                    isChecked={showDelivery}
                    actionType="SET_SHOW_DELIVERY"
                    iconProps={{
                        as: FaTruckMoving,
                    }}
                    helperText="Show medium of delivery (OS, OA, IP)"
                >
                    Delivery method
                </PreferencesToggle>

                <PreferencesToggle
                    isChecked={showCategory}
                    actionType="SET_SHOW_CATEGORY"
                    iconProps={{
                        as: ImSection,
                    }}
                    helperText="Show meeting type (TUT, LEC)"
                >
                    Meeting category
                </PreferencesToggle>
            </PreferencesSection>

            <PreferencesSection>
                <PreferencesToggle
                    isChecked={colorMode === "dark"}
                    onToggle={toggleColorMode}
                    id="mode_toggle"
                    iconProps={{
                        as: colorMode === "light" ? MoonIcon : FaSun,
                    }}
                >
                    Dark mode
                </PreferencesToggle>
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
                <FormControl>
                    <FormLabel htmlFor="palette">
                        <IconWrapper>
                            <Icon as={FaPalette} />
                        </IconWrapper>
                        Palette
                    </FormLabel>
                    <Select
                        id="palette"
                        value={palette}
                        onChange={(e) => {
                            const payload = e.target.value as any

                            dispatch({
                                type: "SET_PALETTE",
                                payload,
                            })
                        }}
                    >
                        <option value="default">Default</option>
                        <option value="monochrome">Monochrome</option>
                        <option value="rainbow">Rainbow</option>
                        {/* <option value="accessible">High contrast</option> */}
                    </Select>
                </FormControl>

                <Grid gridTemplateColumns="1fr 1fr auto" gap={3} pb={2}>
                    <FormControl mr={3}>
                        <FormLabel htmlFor="start">
                            <IconWrapper>
                                <TriangleDownIcon />
                            </IconWrapper>
                            Start
                        </FormLabel>
                        <Select
                            id="start"
                            value={start}
                            onChange={(e) => {
                                const payload = e.target.value as any

                                dispatch({
                                    type: "SET_START",
                                    payload,
                                })
                            }}
                        >
                            {[...Array(15)].map((_, i) => (
                                <option key={i} value={8 + i}>
                                    {8 + i}:00
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl mr={3}>
                        <FormLabel htmlFor="end">
                            <IconWrapper>
                                <TriangleUpIcon />
                            </IconWrapper>
                            End
                        </FormLabel>
                        <Select
                            id="end"
                            value={end}
                            onChange={(e) => {
                                const payload = e.target.value as any

                                dispatch({
                                    type: "SET_END",
                                    payload,
                                })
                            }}
                        >
                            {[...Array(22 - start)].map((_, i) => (
                                <option
                                    key={i}
                                    value={parseInt(start + "") + 1 + i}
                                >
                                    {parseInt(start + "") + 1 + i}
                                    :00
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl display="flex" alignItems="flex-end">
                        <Button>Auto</Button>
                    </FormControl>
                </Grid>
            </PreferencesSection>
        </Fragment>
    )
}

export default PreferencesTimetable
