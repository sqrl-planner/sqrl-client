import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Select,
    Tooltip,
} from "@chakra-ui/react"
import React, { Fragment } from "react"
import { MdHighlight } from "react-icons/md"
import { Ri24HoursLine } from "react-icons/ri"
import styled from "styled-components"
import MeetingsFabricator from "../../MeetingsFabricator"
import { usePreferences } from "../../PreferencesContext"
import { useAppContext } from "../../SqrlContext"
import { minuteOffsetToTime } from "../../utils/time"
import { MeetingGroup } from "../timetable/Meeting"
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

    const {
        state: { courses, userMeetings },
    } = useAppContext()

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
                                    {minuteOffsetToTime(
                                        (8 + i) * 60,
                                        twentyFour
                                    )}
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
                                    {minuteOffsetToTime(
                                        (parseInt(start + "") + 1 + i) * 60,
                                        twentyFour
                                    )}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl display="flex" alignItems="flex-end">
                        <Tooltip label="Determine earliest start and latest end">
                            <Button
                                onClick={() => {
                                    const meetings = new MeetingGroup(
                                        MeetingsFabricator(
                                            courses,
                                            userMeetings
                                        )
                                    )
                                    dispatch({
                                        type: "SET_START",
                                        payload: parseInt(
                                            minuteOffsetToTime(
                                                meetings.getMinStartTime(),
                                                true
                                            ).split(":")[0]
                                        ),
                                    })
                                    dispatch({
                                        type: "SET_END",
                                        payload: parseInt(
                                            minuteOffsetToTime(
                                                meetings.getMaxEndTime(),
                                                true
                                            ).split(":")[0]
                                        ),
                                    })
                                }}
                            >
                                Autoclamp
                            </Button>
                        </Tooltip>
                    </FormControl>
                    <FormControl alignSelf="start" gridColumn="span 3">
                        <FormHelperText>
                            You may unintentionally hide meetings if you adjust
                            the bounds manually. Autoclamp is run only once on
                            click.
                        </FormHelperText>
                    </FormControl>
                </Grid>
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
