import type { WeatherData, ForecastData } from "../types/weather"
import { getWeatherIcon, getWeatherDescription } from "../utils/weatherIcons"
import {
  Thermometer,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Cloud,
  Calendar,
  Sun,
  Moon,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

interface CurrentWeatherProps {
  weather: WeatherData | (ForecastData & { type: "forecast" | "history" })
  isSelected?: boolean
}

// Helper function to format date in DD/MM/YYYY format
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-GB") // British format: DD/MM/YYYY
}

export function CurrentWeather({ weather, isSelected = false }: CurrentWeatherProps) {
  const isCurrentWeather = "current" in weather
  const isForecastOrHistory = "date" in weather

  const getDisplayData = () => {
    if (isCurrentWeather) {
      const description = weather.current?.weather_descriptions?.[0] || "N/A"
      const icon = getWeatherIcon(description)

      return {
        location: `${weather.location?.name || "Unknown"}, ${weather.location?.country || "Unknown"}`,
        temperature: weather.current?.temperature ?? 0,
        description: description,
        icon: icon,
        windSpeed: weather.current?.wind_speed ?? 0,
        humidity: weather.current?.humidity ?? 0,
        pressure: weather.current?.pressure ?? 0,
        visibility: weather.current?.visibility ?? 0,
        feelsLike: weather.current?.feelslike ?? weather.current?.temperature ?? 0,
        cloudCover: weather.current?.cloudcover ?? 0,
        date: weather.location?.localtime ? formatDate(weather.location.localtime) : "N/A",
        time: weather.location?.localtime
          ? new Date(weather.location.localtime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
          : "N/A",
        hasDetailedData: true,
      }
    } else if (isForecastOrHistory) {
      // Use consistent icon system for forecast/historical data
      const description = getWeatherDescription(undefined, weather.sunhour, weather.avgtemp)
      const icon = getWeatherIcon(undefined, weather.sunhour, weather.avgtemp)

      return {
        location: isSelected ? `Selected ${weather.type === "forecast" ? "Forecast" : "History"} Day` : "",
        temperature: weather.avgtemp ?? 0,
        description: description,
        icon: icon,
        feelsLike: weather.avgtemp ?? 0,
        date: formatDate(weather.date),
        time: weather.type === "forecast" ? "Forecast" : "Historical",
        hasDetailedData: false, // Flag to indicate limited data
        // Additional data available for forecast/historical
        minTemp: weather.mintemp ?? weather.avgtemp ?? 0,
        maxTemp: weather.maxtemp ?? weather.avgtemp ?? 0,
        sunHours: weather.sunhour ?? 0,
        uvIndex: weather.uv_index ?? 0,
        sunrise: weather.astro?.sunrise || "N/A",
        sunset: weather.astro?.sunset || "N/A",
        moonPhase: weather.astro?.moon_phase || "N/A",
        moonIllumination: weather.astro?.moon_illumination || "N/A",
      }
    }
    return null
  }

  const data = getDisplayData()
  if (!data) return null

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div
        className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 lg:p-8 mb-8 text-white transition-all duration-300 min-h-[400px] ${
          isSelected ? "ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20" : ""
        }`}
        style={{
          transform: "translateZ(0)", // Force hardware acceleration
          willChange: "transform", // Optimize for animations
        }}
      >
        {isSelected && (
          <div className="flex items-center justify-center gap-2 mb-4 text-yellow-300">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">Selected Day View</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 lg:gap-8">
          <div className="text-center flex-1 min-w-0">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 break-words">{data.location}</h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light">{Math.round(data.temperature)}°C</div>
              {/* Use consistent emoji icons for all weather displays */}
              <div className="text-4xl sm:text-5xl lg:text-6xl flex-shrink-0">{data.icon}</div>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-2 break-words">{data.description}</p>
            <p className="text-blue-200 text-base sm:text-lg">
              {data.date} • {data.time}
            </p>
          </div>

          {/* Conditional metrics grid based on data availability */}
          <div className="w-full lg:w-auto lg:min-w-[400px] flex-shrink-0">
            {data.hasDetailedData ? (
              // Current weather - show all available metrics
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Thermometer className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-xs sm:text-sm text-blue-200">Feels like</p>
                  <p className="text-base sm:text-lg font-semibold">{Math.round(data.feelsLike)}°C</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Wind className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-xs sm:text-sm text-blue-200">Wind</p>
                  <p className="text-base sm:text-lg font-semibold">{data.windSpeed} km/h</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Droplets className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-xs sm:text-sm text-blue-200">Humidity</p>
                  <p className="text-base sm:text-lg font-semibold">{data.humidity}%</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Gauge className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-xs sm:text-sm text-blue-200">Pressure</p>
                  <p className="text-base sm:text-lg font-semibold">{data.pressure} mb</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Eye className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-xs sm:text-sm text-blue-200">Visibility</p>
                  <p className="text-base sm:text-lg font-semibold">{data.visibility} km</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Cloud className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-blue-200" />
                  <p className="text-xs sm:text-sm text-blue-200">Cloud Cover</p>
                  <p className="text-base sm:text-lg font-semibold">{data.cloudCover}%</p>
                </div>
              </div>
            ) : (
              // Forecast/Historical - show only available metrics
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <TrendingUp className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-red-300" />
                  <p className="text-xs sm:text-sm text-blue-200">High</p>
                  <p className="text-base sm:text-lg font-semibold">{Math.round(data.maxTemp ?? data.temperature)}°C</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <TrendingDown className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-blue-300" />
                  <p className="text-xs sm:text-sm text-blue-200">Low</p>
                  <p className="text-base sm:text-lg font-semibold">{Math.round(data.minTemp ?? data.temperature)}°C</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Sun className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-yellow-300" />
                  <p className="text-xs sm:text-sm text-blue-200">Sun Hours</p>
                  <p className="text-base sm:text-lg font-semibold">{data.sunHours}h</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <div className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-purple-300 flex items-center justify-center text-xs sm:text-sm font-bold">
                    UV
                  </div>
                  <p className="text-xs sm:text-sm text-blue-200">UV Index</p>
                  <p className="text-base sm:text-lg font-semibold">{data.uvIndex}</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Sun className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-orange-300" />
                  <p className="text-xs sm:text-sm text-blue-200">Sunrise</p>
                  <p className="text-base sm:text-lg font-semibold">{data.sunrise}</p>
                </div>

                <div className="bg-white/10 rounded-lg p-3 sm:p-4 text-center">
                  <Moon className="w-5 sm:w-6 h-5 sm:h-6 mx-auto mb-2 text-blue-300" />
                  <p className="text-xs sm:text-sm text-blue-200">Sunset</p>
                  <p className="text-base sm:text-lg font-semibold">{data.sunset}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
