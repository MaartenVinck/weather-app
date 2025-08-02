import type React from "react"

import { Search, MapPin } from "lucide-react"

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  onSearch: (query: string) => void
  loading: boolean
}

export function Header({ searchQuery, setSearchQuery, onSearch, loading }: HeaderProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  return (
    <header className="mb-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <MapPin className="w-8 h-8" />
          Weather App
        </h1>
        <p className="text-blue-100">Get current weather, 3-day forecast, and 3-day history</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter city name..."
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            disabled={loading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-1.5 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
    </header>
  )
}
