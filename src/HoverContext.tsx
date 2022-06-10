import React from "react"
import { createContext } from "react"

// https://kentcdodds.com/blog/how-to-use-react-context-effectively
interface Hover {
  hoverCourseKey: number | null
}

export type Action = { type: "SET_CURRENT_HOVER"; payload: number | null }

type Dispatch = (action: Action) => void

const HoverContext = createContext<
  | {
      state: Hover
      dispatch: Dispatch
    }
  | undefined
>(undefined)

type HoverContextProviderProps = { children: React.ReactNode }

const HoverContextReducer = (state: Hover, action: Action) => {
  switch (action.type) {
    case "SET_CURRENT_HOVER": {
      return {
        hoverCourseKey: action.payload,
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

const HoverContextProvider = ({ children }: HoverContextProviderProps) => {
  const hoverContext: Hover = {
    hoverCourseKey: null,
  }

  const [state, dispatch] = React.useReducer(HoverContextReducer, hoverContext)

  // NOTE: you *might* need to memoize this value; learn more in http://kcd.im/optimize-context

  const value = { state, dispatch }

  return <HoverContext.Provider value={value}>{children}</HoverContext.Provider>
}

const useHoverContext = () => {
  const context = React.useContext(HoverContext)

  if (context === undefined) {
    throw new Error(
      "useHoverContext must be used within a HoverContextProvider"
    )
  }

  return context
}

export { HoverContextProvider, useHoverContext }
