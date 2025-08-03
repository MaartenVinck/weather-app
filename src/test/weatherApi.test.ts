import { describe, it, expect, vi, beforeEach } from "vitest"
import { getCurrentWeather, getForecast, getHistoricalRange, clearWeatherCache } from "../services/weatherApi"

// Mock fetch
const mockFetch = vi.fn()
global.fetch = mockFetch

describe("Weather API", () => {
  beforeEach(() => {
    mockFetch.mockClear()
    // Clear the weather cache before each test
    clearWeatherCache()
  })

  describe("getCurrentWeather", () => {
    it("should fetch current weather data successfully", async () => {
      const mockResponse = {
        location: {
          name: "New York",
          country: "United States",
          region: "New York",
          localtime: "2024-01-01 12:00",
        },
        current: {
          temperature: 20,
          weather_descriptions: ["Sunny"],
          weather_icons: ["icon.png"],
          wind_speed: 10,
          wind_dir: "N",
          pressure: 1013,
          precip: 0,
          humidity: 50,
          cloudcover: 0,
          feelslike: 22,
          uv_index: 5,
          visibility: 10,
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getCurrentWeather("New York")

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/current"))
      expect(result).toEqual(mockResponse)
    })

    it("should handle API errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          error: {
            info: "Invalid API key",
          },
        }),
      })

      await expect(getCurrentWeather("Invalid City")).rejects.toThrow("Invalid API key")
    })

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network error"))

      await expect(getCurrentWeather("Network Error City")).rejects.toThrow("Network error")
    })
  })

  describe("getForecast", () => {
    it("should fetch forecast data successfully", async () => {
      const mockResponse = {
        forecast: {
          "2024-01-01": {
            date: "2024-01-01",
            date_epoch: 1704067200,
            astro: {
              sunrise: "07:00 AM",
              sunset: "05:00 PM",
              moonrise: "08:00 PM",
              moonset: "06:00 AM",
              moon_phase: "Full Moon",
              moon_illumination: "100",
            },
            mintemp: 15,
            maxtemp: 25,
            avgtemp: 20,
            totalsnow: 0,
            sunhour: 8,
            uv_index: 5,
            hourly: [],
          },
        },
      }

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getForecast("Test City", 3)

      expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("/forecast"))
      expect(result).toEqual(mockResponse)
    })
  })

  describe("getHistoricalRange", () => {
    it("should fetch historical data for multiple days", async () => {
      const mockResponse = {
        historical: {
          "2024-01-01": {
            date: "2024-01-01",
            date_epoch: 1704067200,
            astro: {
              sunrise: "07:00 AM",
              sunset: "05:00 PM",
              moonrise: "08:00 PM",
              moonset: "06:00 AM",
              moon_phase: "Full Moon",
              moon_illumination: "100",
            },
            mintemp: 15,
            maxtemp: 25,
            avgtemp: 20,
            totalsnow: 0,
            sunhour: 8,
            uv_index: 5,
            hourly: [],
          },
        },
      }

      // Mock successful responses for all 3 calls
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await getHistoricalRange("Historical City", 3)

      expect(mockFetch).toHaveBeenCalledTimes(3)
      expect(result).toHaveLength(3)
      expect(result[0]).toEqual(mockResponse.historical["2024-01-01"])
    })

    it("should handle errors gracefully and return empty array", async () => {
      mockFetch.mockRejectedValue(new Error("API Error"))

      const result = await getHistoricalRange("Error City", 3)

      expect(result).toEqual([])
    })
  })
})
