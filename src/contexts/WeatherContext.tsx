import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { WeatherData, ForecastData, HistoryData } from "../types/weather"

interface WeatherState {
  currentWeather: WeatherData | null
  forecast: ForecastData[]
  history: HistoryData[]
  selectedDay: ((ForecastData | HistoryData) & { type: "forecast" | "history" }) | null
  loading: boolean
  error: string | null
  location: string
}

type WeatherAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_CURRENT_WEATHER"; payload: WeatherData }
  | { type: "SET_FORECAST"; payload: ForecastData[] }
  | { type: "SET_HISTORY"; payload: HistoryData[] }
  | { type: "SET_SELECTED_DAY"; payload: ((ForecastData | HistoryData) & { type: "forecast" | "history" }) | null }
  | { type: "SET_LOCATION"; payload: string }

const initialState: WeatherState = {
  currentWeather: null,
  forecast: [],
  history: [],
  selectedDay: null,
  loading: false,
  error: null,
  location: "",
}

function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false }
    case "SET_CURRENT_WEATHER":
      return { ...state, currentWeather: action.payload, error: null }
    case "SET_FORECAST":
      return { ...state, forecast: action.payload }
    case "SET_HISTORY":
      return { ...state, history: action.payload }
    case "SET_SELECTED_DAY":
      return { ...state, selectedDay: action.payload }
    case "SET_LOCATION":
      return { ...state, location: action.payload }
    default:
      return state
  }
}

const WeatherContext = createContext<{
  state: WeatherState
  dispatch: React.Dispatch<WeatherAction>
} | null>(null)

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  return <WeatherContext.Provider value={{ state, dispatch }}>{children}</WeatherContext.Provider>
}

export function useWeatherContext() {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider")
  }
  return context
}
