import React, { createContext } from "react"
import { Course } from "./Course"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export interface UserMeeting {
    lecture: string
    tutorial?: string
    practical?: string
    hover?: string
}

interface AppData {
    courses: { [key: string]: Course }
    userMeetings: { [key: string]: UserMeeting }
    programs: Array<{ code: string; title: string }>
    campus: { sg: boolean; sc: boolean; ms: boolean }
    hoverMeeting: { courseIdentifier: string; meeting: string }
    sidebarCourse: string
    sidebar: number
}

export type Action =
    | {
          type: "ADD_COURSE"
          payload: { identifier: string; course: Course }
      }
    | { type: "REMOVE_COURSE"; payload: string }
    | {
          type: "SET_MEETING"
          payload: {
              identifier: string
              meeting: string
              method: "lecture" | "tutorial" | "practical"
          }
      }
    | {
          type: "REMOVE_MEETING"
          payload: {
              identifier: string
              method: "lecture" | "tutorial" | "practical" | "hover"
          }
      }
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
          state: AppData
          dispatch: Dispatch
      }
    | undefined
>(undefined)

type AppContextProviderProps = { children: React.ReactNode }

const AppContextReducer = (state: AppData, action: Action) => {
    let newContext: AppData = {
        courses: {},
        userMeetings: {},
        programs: [],
        campus: { sg: true, sc: false, ms: false },
        sidebarCourse: "",
        hoverMeeting: { courseIdentifier: "", meeting: "" },
        sidebar: 0,
    }
    const { courses, userMeetings, programs, campus } = state

    switch (action.type) {
        case "ADD_COURSE": {
            newContext = {
                ...state,
                courses: {
                    ...courses,
                    [action.payload.identifier]: action.payload.course,
                },
            }
            break
        }

        case "REMOVE_COURSE": {
            // Destructure everything, discard the course to remove
            const { [action.payload]: _, ...rest } = courses
            const { [action.payload]: __, ...restOfMeetings } = userMeetings
            newContext = {
                ...state,
                courses: rest,
                userMeetings: {
                    ...restOfMeetings,
                },
            }
            break
        }

        case "SET_MEETING": {
            const { identifier, meeting, method } = action.payload
            newContext = {
                ...state,
                userMeetings: {
                    ...userMeetings,
                    [identifier]: {
                        ...userMeetings[identifier],
                        [method]: meeting,
                    },
                },
            }
            break
        }

        case "REMOVE_MEETING": {
            const { identifier, method } = action.payload
            const { [method]: _, ...rest } = userMeetings[identifier]
            newContext = {
                ...state,
                userMeetings: {
                    ...userMeetings,
                    [identifier]: {
                        ...rest,
                    },
                },
            }
            break
        }

        case "ADD_PROGRAM": {
            newContext = {
                ...state,
                programs: [...programs, action.payload],
            }
            break
        }

        case "REMOVE_PROGRAM": {
            newContext = {
                ...state,
                programs: programs.filter(
                    (program) => program.code !== action.payload
                ),
            }
            break
        }

        case "SET_CAMPUS": {
            newContext = {
                ...state,
                campus: {
                    ...campus,
                    [action.payload.campus]: action.payload.status,
                },
            }
            break
        }

        case "SET_SIDEBAR_COURSE": {
            newContext = {
                ...state,
                sidebarCourse: action.payload,
            }
            break
        }

        case "SET_HOVER_MEETING": {
            const { courseIdentifier, meeting } = action.payload
            newContext = {
                ...state,
                hoverMeeting: { courseIdentifier, meeting },
            }
            break
        }

        case "SET_SIDEBAR": {
            newContext = {
                ...state,
                sidebar: action.payload,
            }
            if (action.payload !== 1) {
                newContext = {
                    ...newContext,
                    sidebarCourse: "",
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

    localStorage.setItem("appContext", JSON.stringify(newContext))

    return newContext
}

const AppContextProvider = ({ children }: AppContextProviderProps) => {
    const lsAppContext = localStorage.getItem("appContext")
    let appContext: AppData
    if (lsAppContext) appContext = JSON.parse(lsAppContext) as AppData
    else {
        appContext = {
            courses: {},
            userMeetings: {},
            programs: [],
            campus: { sg: true, sc: false, ms: false },
            sidebarCourse: "",
            hoverMeeting: {
                courseIdentifier: "",
                meeting: "",
            },
            sidebar: 0,
        }
    }

    const [state, dispatch] = React.useReducer(AppContextReducer, appContext)

    const value = { state, dispatch }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const useAppContext = () => {
    const context = React.useContext(AppContext)

    if (context === undefined) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider"
        )
    }

    return context
}

export { AppContextProvider, useAppContext }
