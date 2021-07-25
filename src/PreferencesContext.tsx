import React from "react"
import { createContext } from "react"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

// type paletteType = "default" | "accessible" | "monochrome"
// type scaleType = "compact" | "normal" | "tall"

interface Preferences {
    palette: "default" | "accessible" | "monochrome"
    scale: "compact" | "normal" | "tall"
    showTimeInMeeting: boolean
    showCourseSuffix: boolean
    start: number
    end: number
    highlightConflicts: boolean
}

type Action =
    | { type: "SET_PALETTE"; payload: "default" | "accessible" | "monochrome" }
    | { type: "SET_SCALE"; payload: "compact" | "normal" | "tall" }
    | { type: "SET_SHOW_TIME_IN_MEETING"; payload: boolean }
    | { type: "SET_SHOW_COURSE_SUFFIX"; payload: boolean }
    | { type: "SET_START"; payload: number }
    | { type: "SET_END"; payload: number }
    | { type: "SET_HIGHLIGHT_CONFLICTS"; payload: boolean }

type Dispatch = (action: Action) => void

const PreferencesContext = createContext<
    | {
          state: Preferences
          dispatch: Dispatch
      }
    | undefined
>(undefined)

type PreferencesProviderProps = { children: React.ReactNode }

const preferencesReducer = (state: Preferences, action: Action) => {
    let newPreferences: Preferences
    switch (action.type) {
        case "SET_PALETTE": {
            newPreferences = { ...state, palette: action.payload }
            break
        }

        case "SET_SCALE": {
            newPreferences = { ...state, scale: action.payload }
            break
        }

        case "SET_SHOW_TIME_IN_MEETING": {
            newPreferences = { ...state, showTimeInMeeting: action.payload }
            break
        }

        case "SET_SHOW_COURSE_SUFFIX": {
            newPreferences = { ...state, showCourseSuffix: action.payload }
            break
        }

        case "SET_START": {
            newPreferences = { ...state, start: action.payload }
            break
        }

        case "SET_END": {
            newPreferences = { ...state, end: action.payload }
            break
        }

        case "SET_HIGHLIGHT_CONFLICTS": {
            newPreferences = { ...state, highlightConflicts: action.payload }
            break
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }

    localStorage.setItem("preferences", JSON.stringify(newPreferences))

    return newPreferences
}

const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
    const lsPreferences = localStorage.getItem("preferences")
    let preferences: Preferences
    if (lsPreferences) preferences = JSON.parse(lsPreferences) as Preferences
    else {
        preferences = {
            palette: "default",
            scale: "normal",
            showTimeInMeeting: true,
            showCourseSuffix: true,
            start: 9,
            end: 22,
            highlightConflicts: true,
        }
    }

    const [state, dispatch] = React.useReducer(preferencesReducer, preferences)

    // NOTE: you *might* need to memoize this value; learn more in http://kcd.im/optimize-context

    const value = { state, dispatch }

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    )
}

const usePreferences = () => {
    const context = React.useContext(PreferencesContext)

    if (context === undefined) {
        throw new Error(
            "usePreferences must be used within a PreferencesProvider"
        )
    }

    return context
}

export { PreferencesProvider, usePreferences }
