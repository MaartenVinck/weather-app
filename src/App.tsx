import { useState, useEffect } from "react"
import { WeatherProvider } from "./contexts/WeatherContext"
import { Header } from "./components/Header"
import { CurrentWeather } from "./components/CurrentWeather"
import { WeatherGrid } from "./components/WeatherGrid"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { ErrorMessage } from "./components/ErrorMessage"
import { useWeather } from "./hooks/useWeather"
import "./App.css"

function WeatherApp() {
  const { currentWeather, forecast, history, selectedDay, loading, error, searchLocation, setSelectedDay } =
    useWeather()

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Load default location on app start
    searchLocation("Pretoria")
  }, [searchLocation])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      searchLocation(query.trim())
      setSearchQuery("")
    }
  }

  const handleDaySelect = (day: any, type: "forecast" | "history") => {
    setSelectedDay(day ? { ...day, type } : null)
  }

  if (loading && !currentWeather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} loading={loading} />

        {error && <ErrorMessage message={error} />}

        {currentWeather && (
          <div className="space-y-8">
            {/* Show current weather when no day is selected, or selected day when one is chosen */}
            <CurrentWeather weather={selectedDay || currentWeather} isSelected={!!selectedDay} />

            <WeatherGrid
              forecast={forecast}
              history={history}
              onDaySelect={handleDaySelect}
              selectedDay={selectedDay}
              loading={loading}
              currentWeather={currentWeather}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  )
}

export default App
