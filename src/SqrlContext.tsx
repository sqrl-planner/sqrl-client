import React from "react"
import { createContext } from "react"
import { Course } from "./Course"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export interface UserMeeting {
    lecture: string
    tutorial?: string
}

interface AppData {
    courses: Course[]
    userMeetings: { [key: string]: UserMeeting }
}

export type Action =
    | { type: "ADD_COURSE"; payload: Course }
    | { type: "REMOVE_COURSE"; payload: string }
    | { type: "ADD_LECTURE"; payload: { courseId: string; lecture: string } }
    | {
          type: "ADD_LECTURE_BY_COURSE_NAME"
          payload: { courseName: string; lecture: string }
      }
    | { type: "ADD_TUTORIAL"; payload: { courseId: string; tutorial: string } }
    | {
          type: "ADD_TUTORIAL_BY_COURSE_NAME"
          payload: { courseName: string; tutorial: string }
      }
    | { type: "REMOVE_LECTURE"; payload: { courseId: string; lecture: string } }
    | {
          type: "REMOVE_TUTORIAL"
          payload: { courseId: string; tutorial: string }
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
    let newContext: AppData
    const { courses, userMeetings } = state

    switch (action.type) {
        case "ADD_COURSE": {
            newContext = {
                ...state,
                courses: [...courses, action.payload],
            }
            break
        }

        case "REMOVE_COURSE": {
            newContext = {
                ...state,
                courses: courses.filter(
                    (course: Course) => course.courseId !== action.payload
                ),
            }
            break
        }

        case "ADD_LECTURE_BY_COURSE_NAME": {
            let courseId: string | null = null

            const course = courses.find(
                (course) => course.code === action.payload.courseName
            )
            if (!course) break

            courseId = course.courseId
            newContext = {
                ...state,
                userMeetings: {
                    ...userMeetings,
                    [courseId]: {
                        ...userMeetings[courseId],
                        lecture: action.payload.lecture,
                    },
                },
            }
            break
        }

        case "ADD_LECTURE": {
            const courseId = action.payload.courseId
            newContext = {
                ...state,
                userMeetings: {
                    ...userMeetings,
                    [courseId]: {
                        ...userMeetings[courseId],
                        lecture: action.payload.lecture,
                    },
                },
            }
            break
        }

        case "ADD_TUTORIAL": {
            newContext = {
                ...state,
                userMeetings: {
                    ...userMeetings,
                    [action.payload.courseId]: {
                        ...userMeetings[action.payload.courseId],
                        tutorial: action.payload.tutorial,
                    },
                },
            }
            break
        }

        case "ADD_TUTORIAL_BY_COURSE_NAME": {
            let courseId: string | null = null

            const course = courses.find(
                (course) => course.code === action.payload.courseName
            )
            if (!course) break

            courseId = course.courseId
            newContext = {
                ...state,
                userMeetings: {
                    ...userMeetings,
                    [courseId]: {
                        ...userMeetings[courseId],
                        tutorial: action.payload.tutorial,
                    },
                },
            }
            break
        }

        case "REMOVE_LECTURE": {
            newContext = {
                ...state,
                userMeetings: {
                    ...userMeetings,
                    [action.payload.courseId]: {
                        ...userMeetings[action.payload.courseId],
                        lecture: "",
                    },
                },
            }
            break
        }

        case "REMOVE_TUTORIAL": {
            newContext = {
                ...state,
                userMeetings: {
                    ...userMeetings,
                    [action.payload.courseId]: {
                        ...userMeetings[action.payload.courseId],
                        tutorial: "",
                    },
                },
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
    // const lsAppContext = localStorage.getItem("appContext")
    let appContext: AppData
    // if (lsAppContext) appContext = JSON.parse(lsAppContext) as AppData
    // else {
    appContext = {
        courses: [],
        userMeetings: {},
    }
    // }

    const [state, dispatch] = React.useReducer(AppContextReducer, appContext)

    // NOTE: you *might* need to memoize this value; learn more in http://kcd.im/optimize-context

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
