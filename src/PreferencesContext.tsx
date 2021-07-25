import React from "react"
import { createContext } from "react"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively

// type paletteType = "default" | "accessible" | "monochrome"
// type scaleType = "compact" | "normal" | "tall"

interface Preferences {
    palette: "default" | "accessible" | "monochrome"
    scale: "compact" | "normal" | "tall"
    showTimeInMeeting: boolean
}

type Action =
    | { type: "SET_PALETTE"; payload: "default" | "accessible" | "monochrome" }
    | { type: "SET_SCALE"; payload: "compact" | "normal" | "tall" }
    | { type: "SET_SHOW_TIME_IN_MEETING"; payload: boolean }

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
    switch (action.type) {
        case "SET_PALETTE": {
            return { ...state, palette: action.payload }
        }

        case "SET_SCALE": {
            return { ...state, scale: action.payload }
        }

        case "SET_SHOW_TIME_IN_MEETING": {
            return { ...state, showTimeInMeeting: action.payload }
        }

        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

const PreferencesProvider = ({ children }: PreferencesProviderProps) => {
    const [state, dispatch] = React.useReducer(preferencesReducer, {
        palette: "default",
        scale: "normal",
        showTimeInMeeting: true,
    })

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
