import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  Select,
  ToastId,
  useToast,
} from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import React, { Fragment, useEffect, useRef, useState } from "react"
import { BsFillCalendarFill } from "react-icons/bs"
import { FaPalette } from "react-icons/fa"
import { MdHighlight } from "react-icons/md"
import { Ri24HoursLine } from "react-icons/ri"
import styled from "styled-components"
import MeetingsFabricator from "../../src/MeetingsFabricator"
import { usePreferences } from "../../src/PreferencesContext"
import { useAppContext } from "../../src/SqrlContext"
import useCourses from "../../src/useCourses"
import useSections from "../../src/useSections"
import { capitalize } from "../../src/utils/misc"
import { minuteOffsetToTime } from "../../src/utils/time"
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
    state: { sidebarCourse },
  } = useAppContext()

  const router = useRouter()
  const { sections } = useSections()
  const { courses, userMeetings } = useCourses({
    sections,
  })

  const [meetingGroup, setMeetingGroup] = useState<MeetingGroup | null>(null)
  const [times, setTimes] = useState<{ start: number; end: number } | null>(
    null
  )

  useEffect(() => {
    if (!Object.entries(userMeetings).length) return
    const meetings = new MeetingGroup(
      MeetingsFabricator(courses, userMeetings, "FULL_YEAR")
    )

    setMeetingGroup(meetings)
  }, [setMeetingGroup, courses, userMeetings])

  useEffect(() => {
    if (!meetingGroup || !meetingGroup.meetings.length) return

    setTimes({
      start: parseInt(
        minuteOffsetToTime(meetingGroup.getMinStartTime(), true).split(":")[0]
      ),
      end: parseInt(
        minuteOffsetToTime(meetingGroup.getMaxEndTime(), true).split(":")[0]
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
      // description: "Run Autoclamp to fit timetable to meetings.",
      description: "Adjust your times to fit your meetings.",
      status: "warning",
      variant: "subtle",
      isClosable: true,
      duration: null,
    })
  }, [start, times, end, toast])

  const { t } = useTranslation("preferences")

  return (
    <Fragment>
      <PreferencesSection>
        <FormControl>
          <FormLabel mb={4}>
            <IconWrapper>
              <Icon as={BsFillCalendarFill} />
            </IconWrapper>
            {t("show-semester")}
          </FormLabel>
          <PreferencesShowSections />
          {showSemester !== "both" && (
            <FormHelperText mt={4}>
              Showing only the {showSemester} semester limits search to{" "}
              {showSemester} ({capitalize(showSemester)[0]}) semester courses
              and full section (Y) courses.
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
          {t("twenty-four")}
        </PreferencesToggle>
        <Grid gridTemplateColumns="1fr 1fr auto" gap={3} pb={2}>
          <FormControl mr={3}>
            <FormLabel htmlFor="start">
              <IconWrapper>
                <TriangleDownIcon />
              </IconWrapper>
              {t("start")}
            </FormLabel>
            <Select
              id="start"
              value={start}
              onChange={(e: React.ChangeEvent<any>) => {
                const payload = parseInt(e.target.value as any)

                dispatch({
                  type: "SET_START",
                  payload,
                })
              }}
            >
              {[...Array(15)].map((_, i) => (
                <option key={i} value={8 + i}>
                  {minuteOffsetToTime((8 + i) * 60, twentyFour)}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl mr={3}>
            <FormLabel htmlFor="end">
              <IconWrapper>
                <TriangleUpIcon />
              </IconWrapper>
              {t("end")}
            </FormLabel>
            <Select
              id="end"
              value={end}
              onChange={(e: React.ChangeEvent<any>) => {
                const payload = parseInt(e.target.value as any)

                dispatch({
                  type: "SET_END",
                  payload,
                })
              }}
            >
              {[...Array(22 - start)].map((_, i) => (
                <option key={i} value={parseInt(start as any) + 1 + i}>
                  {minuteOffsetToTime(
                    (parseInt(start as any) + 1 + i) * 60,
                    twentyFour
                  )}
                </option>
              ))}
            </Select>
          </FormControl>
          {/* <FormControl display="flex" alignItems="flex-end">
                        <Tooltip label="Determine earliest start and latest end">
                            <Button
                                colorScheme="green"
                                disabled={
                                    (meetingGroup &&
                                        !meetingGroup.meetings.length) ||
                                    (!!times &&
                                        start === times.start &&
                                        end === times.end)
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
                                {t("autoclamp")}
                            </Button>
                        </Tooltip>
                    </FormControl> */}
          {/* <FormControl alignSelf="start" gridColumn="span 3">
                        <FormHelperText>
                            Autoclamp is run only once on click. Autoclamps
                            based on both semesters' meeting times.
                        </FormHelperText>
                    </FormControl> */}
        </Grid>
      </PreferencesSection>
      <PreferencesSection>
        <PreferencesToggle
          isChecked={emphasize}
          actionType="SET_EMPHASIZE"
          iconProps={{
            as: MdHighlight,
          }}
          helperText={`Draw a box around a course's meetings on ${
            window.matchMedia("(hover: none)").matches ? "tap" : "hover"
          }.`}
        >
          {/* Emphasize on{" "}
                    {window.matchMedia("(hover: none)").matches
                        ? "tap"
                        : "hover"} */}
          {t("emphasize-on-hover")}
        </PreferencesToggle>
      </PreferencesSection>
      <PreferencesSection>
        <FormControl>
          <FormLabel htmlFor="palette">
            <IconWrapper>
              <Icon as={FaPalette} />
            </IconWrapper>
            {t("palette")}
          </FormLabel>
          <Select
            id="palette"
            value={palette}
            onChange={(e: React.ChangeEvent<any>) => {
              const payload = e.target.value as any

              dispatch({
                type: "SET_PALETTE",
                payload,
              })
            }}
          >
            <option value="default">Default</option>
            <option value="rainbow">Rainbow</option>
            <option value="monochrome">Monochrome</option>
            {/* <option value="accessible">High contrast</option> */}
          </Select>
        </FormControl>
      </PreferencesSection>
    </Fragment>
  )
}

export default PreferencesTimetable
