export function getWeatherIcon(description: string): string {
  const desc = description.toLowerCase()

  if (desc.includes("sunny") || desc.includes("clear")) return "☀️"
  if (desc.includes("partly cloudy")) return "⛅"
  if (desc.includes("cloudy") || desc.includes("overcast")) return "☁️"
  if (desc.includes("rain") || desc.includes("drizzle")) return "🌧️"
  if (desc.includes("snow")) return "❄️"
  if (desc.includes("thunder") || desc.includes("storm")) return "⛈️"
  if (desc.includes("fog") || desc.includes("mist")) return "🌫️"
  if (desc.includes("wind")) return "💨"

  return "🌤️" // Default
}

export function getTemperatureColor(temp: number): string {
  if (temp >= 30) return "text-red-400"
  if (temp >= 20) return "text-orange-400"
  if (temp >= 10) return "text-yellow-400"
  if (temp >= 0) return "text-blue-400"
  return "text-cyan-400"
}

export function getWindDirection(degrees: number): string {
  const directions = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ]
  const index = Math.round(degrees / 22.5) % 16
  return directions[index]
}

export function getUVIndexLevel(uvIndex: number): { level: string; color: string } {
  if (uvIndex <= 2) return { level: "Low", color: "text-green-400" }
  if (uvIndex <= 5) return { level: "Moderate", color: "text-yellow-400" }
  if (uvIndex <= 7) return { level: "High", color: "text-orange-400" }
  if (uvIndex <= 10) return { level: "Very High", color: "text-red-400" }
  return { level: "Extreme", color: "text-purple-400" }
}

export function getHumidityLevel(humidity: number): string {
  if (humidity < 30) return "Low"
  if (humidity < 60) return "Comfortable"
  if (humidity < 80) return "High"
  return "Very High"
}

export function getVisibilityLevel(visibility: number): string {
  if (visibility >= 10) return "Excellent"
  if (visibility >= 5) return "Good"
  if (visibility >= 2) return "Moderate"
  if (visibility >= 1) return "Poor"
  return "Very Poor"
}
