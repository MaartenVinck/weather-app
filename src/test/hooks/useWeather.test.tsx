import type React from "react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { WeatherProvider } from "../../contexts/WeatherContext"
import { useWeather } from "../../hooks/useWeather"
import * as weatherApi from "../../services/weatherApi"

// Mock the weather API
vi.mock("../../services/weatherApi")

const mockGetCurrentWeather = vi.mocked(weatherApi.getCurrentWeather)
const mockGetForecast = vi.mocked(weatherApi.getForecast)
const mockGetHistoricalRange = vi.mocked(weatherApi.getHistoricalRange)

const wrapper = ({ children }: { children: React.ReactNode }) => <WeatherProvider>{children}</WeatherProvider>

describe("useWeather", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useWeather(), { wrapper })

    expect(result.current.currentWeather).toBeNull()
    expect(result.current.forecast).toEqual([])
    expect(result.current.history).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it("should search location and update state", async () => {
    const mockCurrentWeather = {
      location: { name: "New York", country: "US", region: "NY", localtime: "2024-01-01 12:00" },
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

    const mockForecast = {
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

    const mockHistory = [
      {
        date: "2023-12-31",
        date_epoch: 1703980800,
        astro: {
          sunrise: "07:00 AM",
          sunset: "05:00 PM",
          moonrise: "08:00 PM",
          moonset: "06:00 AM",
          moon_phase: "Full Moon",
          moon_illumination: "100",
        },
        mintemp: 10,
        maxtemp: 20,
        avgtemp: 15,
        totalsnow: 0,
        sunhour: 6,
        uv_index: 3,
        hourly: [],
      },
    ]

    mockGetCurrentWeather.mockResolvedValue(mockCurrentWeather)
    mockGetForecast.mockResolvedValue(mockForecast)
    mockGetHistoricalRange.mockResolvedValue(mockHistory)

    const { result } = renderHook(() => useWeather(), { wrapper })

    await act(async () => {
      await result.current.searchLocation("New York")
    })

    expect(result.current.currentWeather).toEqual(mockCurrentWeather)
    expect(result.current.forecast).toEqual(Object.values(mockForecast.forecast))
    expect(result.current.history).toEqual(mockHistory)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it("should handle search errors", async () => {
    const errorMessage = "API Error"
    mockGetCurrentWeather.mockRejectedValue(new Error(errorMessage))

    const { result } = renderHook(() => useWeather(), { wrapper })

    await act(async () => {
      await result.current.searchLocation("Invalid City")
    })

    expect(result.current.error).toBe(errorMessage)
    expect(result.current.loading).toBe(false)
  })

  it("should set selected day", () => {
    const { result } = renderHook(() => useWeather(), { wrapper })

    const mockDay = {
      date: "2024-01-01",
      type: "forecast" as const,
      avgtemp: 20,
    }

    act(() => {
      result.current.setSelectedDay(mockDay)
    })

    expect(result.current.selectedDay).toEqual(mockDay)
  })
})
