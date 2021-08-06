import React from "react"
import { createContext } from "react"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

// type paletteType = "default" | "accessible" | "monochrome"
// type scaleType = "compact" | "normal" | "tall"

export interface Preferences {
    palette: "default" | "accessible" | "monochrome" | "rainbow"
    scale: number
    showTimeInMeeting: boolean
    showCourseSuffix: boolean
    showCategory: boolean
    showSection: boolean
    showDelivery: boolean
    start: number
    end: number
    highlightConflicts: boolean
    twentyFour: boolean
    emphasize: boolean
    showSemester: "first" | "second" | "both"
    currentPrefTab: number
}

export type Action =
    | {
          type: "SET_PALETTE"
          payload: "default" | "accessible" | "monochrome" | "rainbow"
      }
    | { type: "SET_SCALE"; payload: number }
    | { type: "SET_SHOW_TIME_IN_MEETING"; payload: boolean }
    | { type: "SET_SHOW_COURSE_SUFFIX"; payload: boolean }
    | { type: "SET_SHOW_CATEGORY"; payload: boolean }
    | { type: "SET_SHOW_SECTION"; payload: boolean }
    | { type: "SET_SHOW_DELIVERY"; payload: boolean }
    | { type: "SET_START"; payload: number }
    | { type: "SET_END"; payload: number }
    | { type: "SET_HIGHLIGHT_CONFLICTS"; payload: boolean }
    | { type: "SET_TWENTY_FOUR"; payload: boolean }
    | { type: "SET_EMPHASIZE"; payload: boolean }
    | { type: "SET_SHOW_SEMESTER"; payload: "first" | "second" | "both" }
    | { type: "SET_CURRENT_PREF_TAB"; payload: number }

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

        case "SET_SHOW_CATEGORY": {
            newPreferences = { ...state, showCategory: action.payload }
            break
        }

        case "SET_SHOW_SECTION": {
            newPreferences = { ...state, showSection: action.payload }
            break
        }

        case "SET_SHOW_DELIVERY": {
            newPreferences = { ...state, showDelivery: action.payload }
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

        case "SET_TWENTY_FOUR": {
            newPreferences = { ...state, twentyFour: action.payload }
            break
        }

        case "SET_EMPHASIZE": {
            newPreferences = { ...state, emphasize: action.payload }
            break
        }

        case "SET_SHOW_SEMESTER": {
            newPreferences = { ...state, showSemester: action.payload }
            break
        }

        case "SET_CURRENT_PREF_TAB": {
            newPreferences = { ...state, currentPrefTab: action.payload }
            break
        }

        default: {
            // @ts-expect-error
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }

    localStorage.setItem("preferences", JSON.stringify(newPreferences))

    return newPreferences
}

const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
    const lsPreferences = localStorage.getItem("preferences")

    let preferences: Preferences = {
        palette: "default",
        scale: 40,
        showTimeInMeeting: false,
        showCourseSuffix: true,
        showCategory: true,
        showSection: false,
        showDelivery: false,
        start: 9,
        end: 22,
        highlightConflicts: true,
        twentyFour: true,
        emphasize: false,
        showSemester: "both",
        currentPrefTab: 0,
    }

    if (lsPreferences) {
        const parsed = JSON.parse(lsPreferences) as Preferences

        preferences = {
            ...preferences,
            ...parsed,
            start: parseInt(parsed.start as any),
            end: parseInt(parsed.end as any),
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
