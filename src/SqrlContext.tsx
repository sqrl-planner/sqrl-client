import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import React, { createContext, useEffect, useState } from "react"
import { GET_TIMETABLE_BY_ID } from "../operations/queries/getTimetableById"
import { Course } from "./Course"
import { usePreferences } from "./PreferencesContext"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export interface UserMeeting {
  lecture?: string
  tutorial?: string
  practical?: string
  hover?: string
}

export interface AppData {
  [key: string]: TimetableData
}

export interface TimetableData {
  // courses: { [key: string]: Course }
  // userMeetings: { [key: string]: UserMeeting }
  programs: Array<{ code: string; title: string }>
  campus: { sg: boolean; sc: boolean; ms: boolean }
  hoverMeeting: { courseIdentifier: string; meeting: string }
  sidebarCourse: string
  sidebar: number
}

export type Action =
  // | {
  //     type: "ADD_COURSE"
  //     payload: { identifier: string; course: Course }
  //   }
  // | { type: "REMOVE_COURSE"; payload: string }
  // | {
  //     type: "SET_MEETING"
  //     payload: {
  //       identifier: string
  //       meeting: string
  //       method: "lecture" | "tutorial" | "practical"
  //     }
  //   }
  // | {
  //     type: "REMOVE_MEETING"
  //     payload: {
  //       identifier: string
  //       method: "lecture" | "tutorial" | "practical" | "hover"
  //     }
  //   }
  | { type: "ADD_PROGRAM"; payload: { code: string; title: string } }
  | { type: "REMOVE_PROGRAM"; payload: string }
  | {
      type: "SET_CAMPUS"
      payload: { campus: "sg" | "sc" | "ms"; status: boolean }
    }
  | {
      type: "SET_SIDEBAR_COURSE"
      payload: string
    }
  | {
      type: "SET_HOVER_MEETING"
      payload: { courseIdentifier: string; meeting: string }
    }
  | {
      type: "SET_SIDEBAR"
      payload: number
    }

type Dispatch = (action: Action) => void

const AppContext = createContext<
  | {
      state: TimetableData
      dispatch: Dispatch
    }
  | undefined
>(undefined)

type AppContextProviderProps = { children: React.ReactNode }

const AppContextReducer = (
  state: AppData,
  action: Action,
  timetableId: string
) => {
  let newContext: TimetableData = {
    // courses: {},
    // userMeetings: {},
    programs: [],
    campus: { sg: true, sc: false, ms: false },
    sidebarCourse: "",
    hoverMeeting: { courseIdentifier: "", meeting: "" },
    sidebar: 0,
  }

  const timetableState = state[timetableId]

  const { 
    // courses, userMeetings, 
    programs, campus } = timetableState

  switch (action.type) {
    // case "ADD_COURSE": {
    //   newContext = {
    //     ...timetableState,
    //     courses: {
    //       ...courses,
    //       [action.payload.identifier]: action.payload.course,
    //     },
    //   }
    //   break
    // }

    // case "REMOVE_COURSE": {
    //   // Destructure everything, discard the course to remove
    //   const { [action.payload]: _, ...rest } = courses
    //   const { [action.payload]: __, ...restOfMeetings } = userMeetings
    //   newContext = {
    //     ...timetableState,
    //     courses: rest,
    //     userMeetings: {
    //       ...restOfMeetings,
    //     },
    //   }
    //   break
    // }

    // case "SET_MEETING": {
    //   const { identifier, meeting, method } = action.payload
    //   newContext = {
    //     ...timetableState,
    //     userMeetings: {
    //       ...userMeetings,
    //       [identifier]: {
    //         ...userMeetings[identifier],
    //         [method]: meeting,
    //       },
    //     },
    //   }
    //   break
    // }

    // case "REMOVE_MEETING": {
    //   const { identifier, method } = action.payload
    //   const { [method]: _, ...rest } = userMeetings[identifier]
    //   newContext = {
    //     ...timetableState,
    //     userMeetings: {
    //       ...userMeetings,
    //       [identifier]: {
    //         ...rest,
    //       },
    //     },
    //   }
    //   const { [identifier]: courseMeetings, ...restOfCourses } = userMeetings

    //   let allEmpty = true

    //   for (const method of Object.values(newContext.userMeetings[identifier])) {
    //     if (method !== "") {
    //       allEmpty = false
    //       break
    //     }
    //   }

    //   if (allEmpty) {
    //     newContext = {
    //       ...timetableState,
    //       userMeetings: {
    //         ...restOfCourses,
    //       },
    //     }
    //   }
    //   break
    // }

    case "ADD_PROGRAM": {
      newContext = {
        ...timetableState,
        programs: [...programs, action.payload],
      }
      break
    }

    case "REMOVE_PROGRAM": {
      newContext = {
        ...timetableState,
        programs: programs.filter((program) => program.code !== action.payload),
      }
      break
    }

    case "SET_CAMPUS": {
      newContext = {
        ...timetableState,
        campus: {
          ...campus,
          [action.payload.campus]: action.payload.status,
        },
      }
      break
    }

    case "SET_SIDEBAR_COURSE": {
      newContext = {
        ...timetableState,
        sidebarCourse: action.payload,
      }
      break
    }

    case "SET_HOVER_MEETING": {
      const { courseIdentifier, meeting } = action.payload

      newContext = {
        ...timetableState,
        hoverMeeting: { courseIdentifier, meeting },
      }

      break
    }

    case "SET_SIDEBAR": {
      newContext = {
        ...timetableState,
        sidebar: action.payload,
      }
      if (action.payload !== 1) {
        newContext = {
          ...newContext,
          // sidebarCourse: "",
          hoverMeeting: { courseIdentifier: "", meeting: "" },
        }
      }
      break
    }

    default: {
      // @ts-expect-error
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }

  const fullContext = { [timetableId]: newContext }

  if (typeof window !== "undefined") {
    localStorage.setItem("appContext", JSON.stringify(fullContext))
  }

  return fullContext
}

const AppContextProvider = ({
  children,
}: AppContextProviderProps) => {
  const router = useRouter()

  const timetableId = (router.query.id as string) || "new_timetable"

  const [lsAppContext, setLsAppContext] = useState<string | null>()

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     setLsAppContext(localStorage.getItem("appContext") as string)
  //   }
  // }, [])

  const [appContext, setAppContext] = useState<AppData>({
    [timetableId]: {
      // courses: {},
      // userMeetings: {},
      programs: [],
      campus: { sg: true, sc: false, ms: false },
      sidebarCourse: "",
      hoverMeeting: {
        courseIdentifier: "",
        meeting: "",
      },
      sidebar: 0,
    },
  })

  // useEffect(() => {
  //   console.log(appContext)
  // }, [appContext])

  useEffect(() => {
    if (!lsAppContext) return

    setAppContext({
      ...(JSON.parse(lsAppContext) as AppData),
    } as AppData)
  }, [lsAppContext])

  const [state, dispatch] = React.useReducer(
    (state: AppData, action: Action) =>
      AppContextReducer(state, action, timetableId),
    appContext
  )

  const value = { state: state[timetableId], dispatch }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const useAppContext = () => {
  const context = React.useContext(AppContext)

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppContextProvider")
  }

  return context
}

export { AppContextProvider, useAppContext }
