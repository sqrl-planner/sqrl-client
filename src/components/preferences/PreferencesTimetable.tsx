import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Grid,
    Icon,
    Select,
    ToastId,
    Tooltip,
    useToast,
} from "@chakra-ui/react"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { BsFillCalendarFill } from "react-icons/bs"
import { FaPalette } from "react-icons/fa"
import { MdHighlight } from "react-icons/md"
import { Ri24HoursLine } from "react-icons/ri"
import styled from "styled-components"
import MeetingsFabricator from "../../MeetingsFabricator"
import { usePreferences } from "../../PreferencesContext"
import { useAppContext } from "../../SqrlContext"
import { capitalize } from "../../utils/misc"
import { minuteOffsetToTime } from "../../utils/time"
import { MeetingGroup } from "../timetable/Meeting"
import PreferencesSection from "./PreferencesSection"
import PreferencesToggle from "./PreferencesToggle"
import PreferencesShowSections from "./_PreferencesShowSections"

const IconWrapper = styled.div`
    padding-right: 0.6em;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PreferencesTimetable = () => {
    const {
        state: { start, end, twentyFour, emphasize, showSemester, palette },
        dispatch,
    } = usePreferences()

    const {
        state: { courses, userMeetings },
    } = useAppContext()

    const [meetingGroup, setMeetingGroup] = useState<MeetingGroup | null>(null)
    const [times, setTimes] = useState<{ start: number; end: number } | null>(
        null
    )

    useEffect(() => {
        const meetings = new MeetingGroup(
            MeetingsFabricator(courses, userMeetings, "Y")
        )

        setMeetingGroup(meetings)
    }, [setMeetingGroup, courses, userMeetings])

    useEffect(() => {
        if (!meetingGroup) return

        setTimes({
            start: parseInt(
                minuteOffsetToTime(meetingGroup.getMinStartTime(), true).split(
                    ":"
                )[0]
            ),
            end: parseInt(
                minuteOffsetToTime(meetingGroup.getMaxEndTime(), true).split(
                    ":"
                )[0]
            ),
        })
    }, [meetingGroup])

    useEffect(() => {
        dispatch({ type: "SET_CURRENT_PREF_TAB", payload: 1 })
    }, [dispatch])

    const toast = useToast()
    const toastRef = useRef<ToastId>()

    useEffect(() => {
        if (!times) return
        if (!(start > times.start || end < times.end))
            return toast.close(toastRef.current as ToastId)

        if (toast.isActive("warn-hidden")) return
        toastRef.current = toast({
            id: "warn-hidden",
            title: "Some meetings may be unintentionally hidden.",
            description: "Run Autoclamp to fit timetable to meetings.",
            status: "warning",
            variant: "subtle",
            isClosable: true,
            duration: null,
        })
    }, [start, times, end, toast])

    return (
        <Fragment>
            <PreferencesSection>
                <FormControl>
                    <FormLabel mb={4}>
                        <IconWrapper>
                            <Icon as={BsFillCalendarFill} />
                        </IconWrapper>
                        Show semester
                    </FormLabel>
                    <PreferencesShowSections />
                    {showSemester !== "both" && (
                        <FormHelperText mt={4}>
                            Showing only the {showSemester} semester limits
                            search to {showSemester} (
                            {capitalize(showSemester)[0]}) semester courses and
                            full section (Y) courses.
                        </FormHelperText>
                    )}
                </FormControl>
            </PreferencesSection>

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
                                const payload = parseInt(e.target.value as any)

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
                                const payload = parseInt(e.target.value as any)

                                dispatch({
                                    type: "SET_END",
                                    payload,
                                })
                            }}
                        >
                            {[...Array(22 - start)].map((_, i) => (
                                <option
                                    key={i}
                                    value={parseInt(start as any) + 1 + i}
                                >
                                    {minuteOffsetToTime(
                                        (parseInt(start as any) + 1 + i) * 60,
                                        twentyFour
                                    )}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl display="flex" alignItems="flex-end">
                        <Tooltip label="Determine earliest start and latest end">
                            <Button
                                colorScheme="green"
                                disabled={
                                    !!times &&
                                    start === times.start &&
                                    end === times.end
                                }
                                onClick={() => {
                                    if (!meetingGroup || !times) return

                                    dispatch({
                                        type: "SET_START",
                                        payload: times.start,
                                    })
                                    dispatch({
                                        type: "SET_END",
                                        payload: times.end,
                                    })
                                }}
                            >
                                Autoclamp
                            </Button>
                        </Tooltip>
                    </FormControl>
                    <FormControl alignSelf="start" gridColumn="span 3">
                        <FormHelperText>
                            Autoclamp is run only once on click. Autoclamps
                            based on both semesters' meeting times.
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
                    helperText={`Dim other courses on ${
                        window.matchMedia("(hover: none)").matches
                            ? "tap"
                            : "hover"
                    }.`}
                >
                    Emphasize on{" "}
                    {window.matchMedia("(hover: none)").matches
                        ? "tap"
                        : "hover"}
                </PreferencesToggle>
            </PreferencesSection>
            <PreferencesSection>
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
            </PreferencesSection>
        </Fragment>
    )
}

export default PreferencesTimetable
