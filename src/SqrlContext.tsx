import React, { createContext } from "react"
import { StandardCourse } from "./Course"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

export interface UserMeeting {
    lecture: string
    tutorial?: string
    practical?: string
}

interface AppData {
    courses: { [key: string]: StandardCourse }
    userMeetings: { [key: string]: UserMeeting }
}

/**
 * TODO IMPORTANT
 * Identifying courses by courseId is unreliable across sections (F, S, Y)
 * Change to identification of courses by other means, i.e. entire code: CSC263H1-F-20219
 * Requires restructure of AppData store and associated reducers
 */

export type Action =
    | {
          type: "ADD_COURSE"
          payload: { identifier: string; course: StandardCourse }
      }
    | { type: "REMOVE_COURSE"; payload: string }
    | {
          type: "ADD_MEETING"
          payload: {
              identifier: string
              meeting: string
              method: "lecture" | "tutorial" | "practical"
          }
      }
// | {
//       type: "ADD_LECTURE_BY_COURSE_NAME"
//       payload: { courseName: string; lecture: string }
//   }
// | { type: "ADD_TUTORIAL"; payload: { courseId: string; tutorial: string } }
// | {
//       type: "ADD_TUTORIAL_BY_COURSE_NAME"
//       payload: { courseName: string; tutorial: string }
//   }
// | { type: "REMOVE_LECTURE"; payload: { courseId: string; lecture: string } }
// | {
//       type: "REMOVE_TUTORIAL"
//       payload: { courseId: string; tutorial: string }
//   }

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
    let newContext: AppData = { courses: {}, userMeetings: {} }
    const { courses, userMeetings } = state

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
            newContext = {
                ...state,
                courses: rest,
            }
            break
        }

        // case "ADD_LECTURE_BY_COURSE_NAME": {
        //     let courseId: string | null = null

        //     const course = courses.find(
        //         (course) => course.code === action.payload.courseName
        //     )
        //     if (!course) break

        //     courseId = course.courseId
        //     newContext = {
        //         ...state,
        //         userMeetings: {
        //             ...userMeetings,
        //             [courseId]: {
        //                 ...userMeetings[courseId],
        //                 lecture: action.payload.lecture,
        //             },
        //         },
        //     }
        //     break
        // }

        case "ADD_MEETING": {
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

        // case "ADD_TUTORIAL": {
        //     newContext = {
        //         ...state,
        //         userMeetings: {
        //             ...userMeetings,
        //             [action.payload.courseId]: {
        //                 ...userMeetings[action.payload.courseId],
        //                 tutorial: action.payload.tutorial,
        //             },
        //         },
        //     }
        //     break
        // }

        // case "ADD_TUTORIAL_BY_COURSE_NAME": {
        //     let courseId: string | null = null

        //     const course = courses.find(
        //         (course) => course.code === action.payload.courseName
        //     )
        //     if (!course) break

        //     courseId = course.courseId
        //     newContext = {
        //         ...state,
        //         userMeetings: {
        //             ...userMeetings,
        //             [courseId]: {
        //                 ...userMeetings[courseId],
        //                 tutorial: action.payload.tutorial,
        //             },
        //         },
        //     }
        //     break
        // }

        // case "REMOVE_LECTURE": {
        //     newContext = {
        //         ...state,
        //         userMeetings: {
        //             ...userMeetings,
        //             [action.payload.courseId]: {
        //                 ...userMeetings[action.payload.courseId],
        //                 lecture: "",
        //             },
        //         },
        //     }
        //     break
        // }

        // case "REMOVE_TUTORIAL": {
        //     newContext = {
        //         ...state,
        //         userMeetings: {
        //             ...userMeetings,
        //             [action.payload.courseId]: {
        //                 ...userMeetings[action.payload.courseId],
        //                 tutorial: "",
        //             },
        //         },
        //     }
        //     break
        // }

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
        courses: {},
        userMeetings: {},
    }
    // }

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
