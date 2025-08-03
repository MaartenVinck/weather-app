import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CurrentWeather } from "../../components/CurrentWeather"
import type { WeatherData } from "../../types/weather"

const mockWeatherData: WeatherData = {
  location: {
    name: "New York",
    country: "United States",
    region: "New York",
    localtime: "2024-01-01 12:00",
  },
  current: {
    temperature: 20,
    weather_descriptions: ["Sunny"],
    weather_icons: ["https://example.com/icon.png"],
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

describe("CurrentWeather", () => {
  it("renders current weather information correctly", () => {
    render(<CurrentWeather weather={mockWeatherData} />)

    expect(screen.getByText("New York, United States")).toBeInTheDocument()
    expect(screen.getByText("20°C")).toBeInTheDocument()
    expect(screen.getByText("Sunny")).toBeInTheDocument()
    expect(screen.getByText("22°C")).toBeInTheDocument() // Feels like
    expect(screen.getByText("10 km/h")).toBeInTheDocument() // Wind speed
    expect(screen.getByText("50%")).toBeInTheDocument() // Humidity
  })

  it("shows selected day indicator when isSelected is true", () => {
    render(<CurrentWeather weather={mockWeatherData} isSelected={true} />)

    expect(screen.getByText("Selected Day View")).toBeInTheDocument()
  })

  it("renders weather icon when available", () => {
    render(<CurrentWeather weather={mockWeatherData} />)

    const weatherIcon = screen.getByAltText("Sunny")
    expect(weatherIcon).toBeInTheDocument()
    expect(weatherIcon).toHaveAttribute("src", "https://example.com/icon.png")
  })
})
