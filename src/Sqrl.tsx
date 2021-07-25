import { Button } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import Header from "./components/Header"
import { EXAMPLE_MEETINGS } from "./components/timetable/Meeting"
import { Timetable } from "./components/timetable/Timetable"
import { usePreferences } from "./PreferencesContext"
import { timeToMinuteOffset } from "./utils/time"

const Sqrl = () => {
    const {
        state: { scale, start, end, showTimeInMeeting },
        dispatch,
    } = usePreferences()

    const [timetableSize, setTimetableSize] = useState(48)

    useEffect(() => {
        let size: number = 48

        if (scale === "compact") size = 20
        if (scale === "normal") size = 48
        if (scale === "tall") size = 100

        setTimetableSize(size)
    }, [timetableSize, setTimetableSize, scale])

    return (
        <div>
            <Header />
            {/* <Button
                onClick={() => {
                    dispatch({
                        type: "SET_SCALE",
                        payload: scale === "compact" ? "normal" : "compact",
                    })
                }}
                m={2}
            >
                {scale === "compact" ? "normal" : "compact"}
            </Button>

            <Button
                onClick={() => {
                    dispatch({
                        type: "SET_SHOW_TIME_IN_MEETING",
                        payload: showTimeInMeeting ? false : true,
                    })
                }}
                m={2}
            >
                show time in meeting
            </Button> */}
            <Timetable
                meetings={EXAMPLE_MEETINGS}
                scale={timetableSize}
                minTime={timeToMinuteOffset(start)}
                maxTime={timeToMinuteOffset(end)}
            />
        </div>
    )
}

export default Sqrl
