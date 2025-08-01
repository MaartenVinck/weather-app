export interface WeatherData {
  location: {
    name: string
    country: string
    region: string
    localtime: string
  }
  current: {
    temperature: number
    weather_descriptions: string[]
    weather_icons: string[]
    wind_speed: number
    wind_dir: string
    pressure: number
    precip: number
    humidity: number
    cloudcover: number
    feelslike: number
    uv_index: number
    visibility: number
  }
}

export interface ForecastData {
  date: string
  date_epoch: number
  astro: {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: string
  }
  mintemp: number
  maxtemp: number
  avgtemp: number
  totalsnow: number
  sunhour: number
  uv_index: number
  hourly: Array<{
    time: string
    temperature: number
    wind_speed: number
    wind_dir: string
    weather_descriptions: string[]
    weather_icons: string[]
    precip: number
    humidity: number
    visibility: number
    pressure: number
    cloudcover: number
    heatindex: number
    dewpoint: number
    windchill: number
    windgust: number
    feelslike: number
    chanceofrain: number
    chanceofremdry: number
    chanceofwindy: number
    chanceofovercast: number
    chanceofsunshine: number
    chanceoffrost: number
    chanceofhightemp: number
    chanceoffog: number
    chanceofsnow: number
    chanceofthunder: number
    uv_index: number
  }>
}

export interface HistoryData {
  date: string
  date_epoch: number
  astro: {
    sunrise: string
    sunset: string
    moonrise: string
    moonset: string
    moon_phase: string
    moon_illumination: string
  }
  mintemp: number
  maxtemp: number
  avgtemp: number
  totalsnow: number
  sunhour: number
  uv_index: number
  hourly: Array<{
    time: string
    temperature: number
    wind_speed: number
    wind_dir: string
    weather_descriptions: string[]
    weather_icons: string[]
    precip: number
    humidity: number
    visibility: number
    pressure: number
    cloudcover: number
    heatindex: number
    dewpoint: number
    windchill: number
    windgust: number
    feelslike: number
    chanceofrain: number
    chanceofremdry: number
    chanceofwindy: number
    chanceofovercast: number
    chanceofsunshine: number
    chanceoffrost: number
    chanceofhightemp: number
    chanceoffog: number
    chanceofsnow: number
    chanceofthunder: number
    uv_index: number
  }>
}
