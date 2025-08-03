import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { WeatherCard } from "../../components/WeatherCard"
import type { ForecastData } from "../../types/weather"

const mockForecastData: ForecastData = {
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
  hourly: [
    {
      time: "12:00",
      temperature: 20,
      wind_speed: 10,
      wind_dir: "N",
      weather_descriptions: ["Sunny"],
      weather_icons: ["https://example.com/icon.png"],
      precip: 0,
      humidity: 50,
      visibility: 10,
      pressure: 1013,
      cloudcover: 0,
      heatindex: 22,
      dewpoint: 10,
      windchill: 18,
      windgust: 15,
      feelslike: 22,
      chanceofrain: 0,
      chanceofremdry: 100,
      chanceofwindy: 20,
      chanceofovercast: 0,
      chanceofsunshine: 100,
      chanceoffrost: 0,
      chanceofhightemp: 80,
      chanceoffog: 0,
      chanceofsnow: 0,
      chanceofthunder: 0,
      uv_index: 5,
    },
  ],
}

describe("WeatherCard", () => {
  const mockOnClick = vi.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it("renders forecast card correctly", () => {
    render(
      <WeatherCard day={mockForecastData} type="forecast" onClick={mockOnClick} isSelected={false} label="Tomorrow" />,
    )

    expect(screen.getByText("Tomorrow")).toBeInTheDocument()
    expect(screen.getByText("20°C")).toBeInTheDocument()
    expect(screen.getByText("25°")).toBeInTheDocument() // Max temp
    expect(screen.getByText("15°")).toBeInTheDocument() // Min temp
    expect(screen.getByText("Sunny")).toBeInTheDocument()
  })

  it("calls onClick when card is clicked", () => {
    render(
      <WeatherCard day={mockForecastData} type="forecast" onClick={mockOnClick} isSelected={false} label="Tomorrow" />,
    )

    const card = screen.getByText("Tomorrow").closest("div")
    if (card) {
      fireEvent.click(card)
    }

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("shows selected state when isSelected is true", () => {
    const { container } = render(
      <WeatherCard day={mockForecastData} type="forecast" onClick={mockOnClick} isSelected={true} label="Tomorrow" />,
    )

    // Find the outermost div which should have the ring classes
    const cardContainer = container.firstChild as HTMLElement
    expect(cardContainer).toHaveClass("ring-2")
    expect(cardContainer).toHaveClass("ring-yellow-400")
  })

  it("displays sunrise and sunset times", () => {
    render(
      <WeatherCard day={mockForecastData} type="forecast" onClick={mockOnClick} isSelected={false} label="Tomorrow" />,
    )

    expect(screen.getByText("07:00 AM")).toBeInTheDocument()
    expect(screen.getByText("05:00 PM")).toBeInTheDocument()
  })
})
