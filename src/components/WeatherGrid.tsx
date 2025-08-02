import type { ForecastData, HistoryData } from "../types/weather"
import { WeatherCard } from "./WeatherCard"
import { LoadingSpinner } from "./LoadingSpinner"

interface WeatherGridProps {
  forecast: ForecastData[]
  history: HistoryData[]
  onDaySelect: (day: ForecastData | HistoryData, type: "forecast" | "history") => void
  selectedDay: any
  loading: boolean
  currentWeather: any
}

// Helper function to check if a date is today
function isToday(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

export function WeatherGrid({
  forecast,
  history,
  onDaySelect,
  selectedDay,
  loading,
  currentWeather,
}: WeatherGridProps) {
  const handleDaySelect = (day: ForecastData | HistoryData, type: "forecast" | "history") => {
    // If clicking on today's forecast, clear selection to show current weather
    if (type === "forecast" && isToday(day.date)) {
      onDaySelect(null as any, "current" as any) // Signal to show current weather
    } else {
      onDaySelect(day, type)
    }
  }

  // Merge current weather data with today's forecast astro data
  const createHybridTodayCard = (todayForecast: ForecastData) => {
    if (!currentWeather || !todayForecast) return todayForecast

    return {
      ...todayForecast,
      avgtemp: currentWeather.current?.temperature ?? todayForecast.avgtemp,
      description: currentWeather.current?.weather_descriptions?.[0] || "N/A",
      icon: currentWeather.current?.weather_icons?.[0] || null,
    }
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* 3-Day History */}
      <section>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          📅 3-Day History
        </h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 justify-items-center">
            {history.map((day, index) => (
              <WeatherCard
                key={`history-${day.date}`}
                day={day}
                type="history"
                onClick={() => handleDaySelect(day, "history")}
                isSelected={selectedDay?.date === day.date && selectedDay?.type === "history"}
                label={`${index + 1} day${index === 0 ? "" : "s"} ago`}
              />
            ))}
          </div>
        )}
      </section>

      {/* 3-Day Forecast */}
      <section>
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 flex items-center justify-center gap-2">
          🔮 3-Day Forecast
        </h3>
        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 justify-items-center">
            {forecast.map((day, index) => {
              const isTodayCard = isToday(day.date)

              // For today's card, merge current weather with forecast astro data
              const displayDay = isTodayCard ? createHybridTodayCard(day) : day

              return (
                <WeatherCard
                  key={`forecast-${day.date}`}
                  day={displayDay}
                  type="forecast"
                  onClick={() => handleDaySelect(day, "forecast")}
                  isSelected={
                    isTodayCard
                      ? selectedDay === null // Today is "selected" when no day is selected (showing current weather)
                      : selectedDay?.date === day.date && selectedDay?.type === "forecast"
                  }
                  label={isTodayCard ? "Today (Current)" : index === 1 ? "Tomorrow" : `In ${index} days`}
                  isToday={isTodayCard}
                  isCurrentWeather={isTodayCard}
                />
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
