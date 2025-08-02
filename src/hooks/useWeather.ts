import { useCallback } from "react"
import { useWeatherContext } from "../contexts/WeatherContext"
import { getCurrentWeather, getForecast, getHistoricalRange } from "../services/weatherApi"

export function useWeather() {
  const { state, dispatch } = useWeatherContext()

  const searchLocation = useCallback(
    async (location: string) => {
      dispatch({ type: "SET_LOADING", payload: true })
      dispatch({ type: "SET_ERROR", payload: null })
      dispatch({ type: "SET_SELECTED_DAY", payload: null })

      try {
        // Fetch current weather
        const currentWeather = await getCurrentWeather(location)
        dispatch({ type: "SET_CURRENT_WEATHER", payload: currentWeather })
        dispatch({ type: "SET_LOCATION", payload: location })

        // Fetch forecast and history in parallel
        const [forecastData, historyData] = await Promise.allSettled([
          getForecast(location, 3),
          getHistoricalRange(location, 3),
        ])

        if (forecastData.status === "fulfilled") {
          const forecastArray = Object.values(forecastData.value.forecast)
          dispatch({ type: "SET_FORECAST", payload: forecastArray })
        } else {
          console.warn("Forecast data failed:", forecastData.reason)
        }

        if (historyData.status === "fulfilled") {
          dispatch({ type: "SET_HISTORY", payload: historyData.value })
        } else {
          console.warn("History data failed:", historyData.reason)
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to fetch weather data"
        dispatch({ type: "SET_ERROR", payload: errorMessage })
      } finally {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    },
    [dispatch],
  )

  const setSelectedDay = useCallback(
    (day: any) => {
      // If day is null or type is "current", clear the selection to show current weather
      if (day === null || day?.type === "current") {
        dispatch({ type: "SET_SELECTED_DAY", payload: null })
      } else {
        dispatch({ type: "SET_SELECTED_DAY", payload: day })
      }
    },
    [dispatch],
  )

  return {
    ...state,
    searchLocation,
    setSelectedDay,
  }
}
