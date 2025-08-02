// Unified weather icon system for consistency across all components
export function getWeatherIcon(description?: string, sunHours?: number, temperature?: number): string {
  // If we have a description from the API, use it
  if (description) {
    const desc = description.toLowerCase()

    // Map WeatherStack descriptions to consistent icons
    if (desc.includes("sunny") || desc.includes("clear")) return "☀️"
    if (desc.includes("partly cloudy") || desc.includes("partly sunny")) return "⛅"
    if (desc.includes("cloudy") || desc.includes("overcast")) return "☁️"
    if (desc.includes("rain") || desc.includes("drizzle") || desc.includes("shower")) return "🌧️"
    if (desc.includes("snow") || desc.includes("blizzard")) return "❄️"
    if (desc.includes("thunder") || desc.includes("storm")) return "⛈️"
    if (desc.includes("fog") || desc.includes("mist") || desc.includes("haze")) return "🌫️"
    if (desc.includes("wind")) return "💨"
    if (desc.includes("hot")) return "🌡️"
    if (desc.includes("cold") || desc.includes("freezing")) return "🥶"
  }

  // Fallback to sun hours and temperature for forecast/historical data
  if (sunHours !== undefined && temperature !== undefined) {
    if (sunHours > 10) {
      if (temperature > 30) return "🌡️" // Hot and sunny
      if (temperature > 25) return "☀️" // Hot and sunny
      if (temperature > 15) return "☀️" // Sunny
      return "🌤️" // Cool and sunny
    } else if (sunHours > 6) {
      if (temperature > 25) return "⛅" // Partly cloudy and warm
      return "⛅" // Partly cloudy
    } else if (sunHours > 3) {
      return "☁️" // Cloudy
    } else {
      return "🌫️" // Overcast
    }
  }

  // Default fallback
  return "🌤️"
}

// Get weather condition text for consistency
export function getWeatherDescription(description?: string, sunHours?: number, temperature?: number): string {
  // If we have API description, use it
  if (description) {
    return description
  }

  // Generate description for forecast/historical data
  const avgTemp = temperature ?? 0
  const hours = sunHours ?? 8

  if (hours > 10) {
    if (avgTemp > 30) return "Hot and Sunny"
    if (avgTemp > 25) return "Sunny and Warm"
    if (avgTemp > 15) return "Sunny"
    return "Cool and Sunny"
  } else if (hours > 6) {
    if (avgTemp > 25) return "Partly Cloudy and Warm"
    if (avgTemp > 15) return "Partly Cloudy"
    return "Cool and Partly Cloudy"
  } else if (hours > 3) {
    if (avgTemp > 20) return "Mostly Cloudy and Warm"
    return "Mostly Cloudy"
  } else {
    return "Overcast"
  }
}
