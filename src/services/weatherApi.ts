import type { WeatherData, ForecastData, HistoryData } from "../types/weather"

const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY || "your_api_key_here"
const BASE_URL = "http://api.weatherstack.com"

// Cache implementation
class WeatherCache {
  private cache = new Map<string, { data: any; timestamp: number }>()
  private readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  get(key: string) {
    const cached = this.cache.get(key)
    if (!cached) return null

    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key)
      return null
    }

    return cached.data
  }

  clear() {
    this.cache.clear()
  }
}

const cache = new WeatherCache()

async function fetchWeatherData(endpoint: string, params: Record<string, string>) {
  const cacheKey = `${endpoint}-${JSON.stringify(params)}`
  const cached = cache.get(cacheKey)

  if (cached) {
    return cached
  }

  const url = new URL(endpoint, BASE_URL)
  url.searchParams.append("access_key", API_KEY)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  try {
    console.log("Fetching weather data from:", url.toString())
    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("Weather API response:", data)

    if (data.error) {
      console.error("Weather API error:", data.error)
      throw new Error(data.error.info || "API Error")
    }

    cache.set(cacheKey, data)
    return data
  } catch (error) {
    console.error("Weather API Error:", error)
    throw error instanceof Error ? error : new Error("Failed to fetch weather data")
  }
}

export async function getCurrentWeather(location: string): Promise<WeatherData> {
  return fetchWeatherData("/current", { query: location })
}

export async function getForecast(location: string, days = 3): Promise<{ forecast: Record<string, ForecastData> }> {
  try {
    return await fetchWeatherData("/forecast", {
      query: location,
      forecast_days: days.toString(),
    })
  } catch (error) {
    console.warn("Forecast not available (requires Professional tier):", error)
    // Return empty forecast if not available
    return { forecast: {} }
  }
}

export async function getHistoricalWeather(
  location: string,
  date: string,
): Promise<{ historical: Record<string, HistoryData> }> {
  try {
    return await fetchWeatherData("/historical", {
      query: location,
      historical_date: date,
    })
  } catch (error) {
    console.warn("Historical data not available (requires Professional tier):", error)
    // Return empty historical data if not available
    return { historical: {} }
  }
}

// Utility function to get multiple historical dates
export async function getHistoricalRange(location: string, days = 3): Promise<HistoryData[]> {
  const promises = []
  const today = new Date()

  for (let i = 1; i <= days; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split("T")[0]
    promises.push(getHistoricalWeather(location, dateString))
  }

  try {
    const results = await Promise.allSettled(promises)
    const successfulResults = results
      .filter(
        (result): result is PromiseFulfilledResult<{ historical: Record<string, HistoryData> }> =>
          result.status === "fulfilled" && Object.keys(result.value.historical).length > 0,
      )
      .map((result) => {
        const dateKey = Object.keys(result.value.historical)[0]
        return result.value.historical[dateKey]
      })

    return successfulResults
  } catch (error) {
    console.error("Error fetching historical data:", error)
    return []
  }
}

// Clear cache function for testing or manual refresh
export function clearWeatherCache() {
  cache.clear()
}
