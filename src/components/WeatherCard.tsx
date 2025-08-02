import type { ForecastData, HistoryData } from "../types/weather"
import { getWeatherIcon, getWeatherDescription } from "../utils/weatherIcons"
import { TrendingUp, TrendingDown, Sun, Moon } from "lucide-react"

interface WeatherCardProps {
  day: ForecastData | HistoryData | any
  type: "forecast" | "history"
  onClick: () => void
  isSelected: boolean
  label: string
  isToday?: boolean
  isCurrentWeather?: boolean
}

function formatCardDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })
}

export function WeatherCard({
  day,
  type,
  onClick,
  isSelected,
  label,
  isToday = false,
  isCurrentWeather = false,
}: WeatherCardProps) {
  if (!day || !day.date) {
    return null
  }

  let description: string
  let weatherIcon: string

  if (isCurrentWeather && day.description) {
    description = day.description
    weatherIcon = getWeatherIcon(day.description)
  } else {
    description = getWeatherDescription(undefined, day.sunhour, day.avgtemp)
    weatherIcon = getWeatherIcon(undefined, day.sunhour, day.avgtemp)
  }

  const avgTemp = day.avgtemp ?? 0
  const maxTemp = day.maxtemp ?? avgTemp
  const minTemp = day.mintemp ?? avgTemp
  const sunrise = day.astro?.sunrise || "N/A"
  const sunset = day.astro?.sunset || "N/A"

  return (
    <div
      onClick={onClick}
      className={`bg-white/10 backdrop-blur-md rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:scale-105 w-full max-w-sm mx-auto weather-card ${
        isSelected ? "ring-2 ring-yellow-400 bg-white/20 shadow-lg shadow-yellow-400/20" : "hover:shadow-lg"
      } ${isToday && isSelected ? "ring-2 ring-green-400 bg-green-500/10" : ""}`}
      style={{
        minHeight: "320px",
        height: "320px",
        display: "flex",
        flexDirection: "column",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        backfaceVisibility: "hidden",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="text-center flex-1 flex flex-col h-full relative">
        <div className="flex items-center justify-between mb-3 flex-shrink-0 relative z-10">
          <span
            className={`text-xs sm:text-sm font-medium px-2 py-1 rounded-full whitespace-nowrap ${
              isToday
                ? "bg-green-500/20 text-green-200"
                : type === "forecast"
                  ? "bg-blue-500/20 text-blue-200"
                  : "bg-purple-500/20 text-purple-200"
            }`}
          >
            {label}
          </span>
          {isSelected && <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse flex-shrink-0" />}
          {isToday && isSelected && <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse flex-shrink-0" />}
        </div>

        <div className="mb-3 flex-shrink-0 relative z-10">
          <p className="text-white font-medium text-sm sm:text-base">{formatCardDate(day.date)}</p>
        </div>

        <div
          className="flex items-center justify-center mb-3 flex-shrink-0 relative z-10"
          style={{
            height: "60px",
            minHeight: "60px",
            maxHeight: "60px",
            overflow: "visible",
          }}
        >
          <span
            className="text-4xl sm:text-5xl block"
            style={{
              lineHeight: "1",
              display: "block",
              textAlign: "center",
              width: "100%",
            }}
          >
            {weatherIcon}
          </span>
        </div>

        <div
          className="mb-4 flex-shrink-0 relative z-10"
          style={{
            height: "40px",
            minHeight: "40px",
            maxHeight: "40px",
            overflow: "hidden",
          }}
        >
          <p
            className="text-blue-100 text-xs sm:text-sm px-1 flex items-center justify-center h-full text-center leading-tight"
            title={description}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordBreak: "break-word",
              hyphens: "auto",
            }}
          >
            {description}
          </p>
        </div>

        <div className="mt-auto flex-shrink-0 relative z-10">
          <div className="flex items-center justify-between text-white mb-4">
            <div className="flex items-center gap-1 flex-shrink-0">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-red-300 flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap">{Math.round(maxTemp)}°</span>
            </div>
            <div className="text-base sm:text-lg font-semibold flex-shrink-0">{Math.round(avgTemp)}°C</div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-blue-300 flex-shrink-0" />
              <span className="text-xs sm:text-sm whitespace-nowrap">{Math.round(minTemp)}°</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/20">
            <div className="flex items-center justify-between text-xs text-blue-200">
              <div className="flex items-center gap-1 flex-shrink-0">
                <Sun className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">{sunrise}</span>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <Moon className="w-3 h-3 flex-shrink-0" />
                <span className="whitespace-nowrap">{sunset}</span>
              </div>
            </div>
          </div>

          {isToday && <div className="mt-2 text-xs text-green-200 px-1 text-center">Click to view current weather</div>}
        </div>
      </div>
    </div>
  )
}
