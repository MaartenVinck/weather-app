# Weather App

A responsive weather application built with React, TypeScript, and Vite that displays current weather, 3-day forecast, and 3-day historical data.

## Features

- Current weather conditions with detailed metrics (temperature, humidity, wind speed, pressure, etc.)
- 3-day weather forecast
- 3-day historical weather data
- Responsive design optimized for mobile and desktop
- Interactive weather cards with selection functionality
- Location search functionality
- Smooth animations and transitions

## Setup Instructions

1. Clone the repository

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Get the API key from me (I needed to get a paid tier to include historical and forecast data)
   - Replace `your_api_key_here` with the actual API key in `.env`

4. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

## Environment Variables

- `VITE_WEATHERSTACK_API_KEY`: WeatherStack API key (required - get from developer)

## Available Scripts

- `npm run dev` - Start development server
- `npm run test` - Run tests with Vitest

## How to Use

1. **Search for a location**: Use the search bar at the top to enter any city name
2. **View current weather**: The main card shows current weather conditions with detailed metrics
3. **Browse history**: Click on any of the 3-day history cards to view past weather data
4. **Check forecast**: Click on forecast cards to see upcoming weather predictions
5. **Today's weather**: The "Today (Current)" card shows live weather data and can be clicked to return to current view

## Design Decisions and Trade-offs

### Architecture Decisions

**Context + Custom Hooks Pattern**
- **Decision**: Used React Context with custom hooks for state management instead of Redux
- **Rationale**: For this app's scope, Context API provides sufficient state management without the complexity of Redux
- **Trade-off**: Less scalable for very large applications, but simpler and more maintainable for this use case

**Component Structure**
- **Decision**: Separated concerns into distinct components (CurrentWeather, WeatherCard, WeatherGrid)
- **Rationale**: Promotes reusability and maintainability
- **Trade-off**: More files to manage, but cleaner separation of concerns

### API Integration

**WeatherStack API Choice**
- **Decision**: Used WeatherStack over alternatives like OpenWeatherMap
- **Rationale**: Provides historical data, forecast, and current weather in a unified API
- **Trade-off**: Requires paid tier for full features, but offers better data consistency

**Caching Strategy**
- **Decision**: Implemented 10-minute client-side caching
- **Rationale**: Reduces API calls and improves performance while keeping data reasonably fresh
- **Trade-off**: Slightly stale data possible, but significant performance improvement

### UI/UX Decisions

**Mobile-First Responsive Design**
- **Decision**: Prioritized mobile experience with responsive breakpoints
- **Rationale**: Weather apps are frequently used on mobile devices
- **Trade-off**: More complex CSS, but better user experience across devices

**Card-Based Interface**
- **Decision**: Used card layout for weather data instead of list or table format
- **Rationale**: More visually appealing and easier to scan information
- **Trade-off**: Takes more screen space, but improves readability

**Emoji Weather Icons**
- **Decision**: Used emoji icons instead of custom SVGs or icon fonts
- **Rationale**: Universal compatibility, no additional assets to load, consistent across platforms
- **Trade-off**: Less customizable styling, but zero loading time and universal support

### Performance Optimizations

**Hardware Acceleration**
- **Decision**: Added CSS transforms and will-change properties for mobile
- **Rationale**: Prevents rendering issues on mobile browsers, especially iOS Safari
- **Trade-off**: Slightly more memory usage, but smoother animations and interactions

**Component Memoization**
- **Decision**: Avoided React.memo for most components
- **Rationale**: App is small enough that premature optimization would add complexity without significant benefit
- **Trade-off**: Potential unnecessary re-renders, but simpler code maintenance

### Testing Strategy

**Vitest + React Testing Library**
- **Decision**: Used Vitest instead of Jest for testing
- **Rationale**: Better integration with Vite, faster test execution
- **Trade-off**: Smaller ecosystem than Jest, but better performance and modern tooling

**Test Coverage Focus**
- **Decision**: Focused on testing core functionality rather than 100% coverage
- **Rationale**: Prioritized testing user-facing features and critical business logic
- **Trade-off**: Some edge cases may be untested, but core functionality is well-covered

### Development Experience

**TypeScript Integration**
- **Decision**: Full TypeScript implementation with strict mode
- **Rationale**: Better developer experience, catch errors at compile time, improved maintainability
- **Trade-off**: Longer initial development time, but fewer runtime errors and better code quality

**Tailwind CSS**
- **Decision**: Used Tailwind for styling instead of CSS modules or styled-components
- **Rationale**: Rapid development, consistent design system, smaller bundle size
- **Trade-off**: Learning curve and potential class name verbosity, but faster development and consistent styling

## Project Structure

- `src/components/` - React components (Header, CurrentWeather, WeatherCard, etc.)
- `src/contexts/` - React context for state management
- `src/hooks/` - Custom React hooks
- `src/services/` - API service layer
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions for weather icons and formatting
- `src/test/` - Test files

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Tailwind CSS** - Styling and responsive design
- **Vitest** - Testing framework
- **WeatherStack API** - Weather data provider
- **Lucide React** - Icons

## API Features

This app uses WeatherStack's paid tier to access:
- Current weather data
- 3-day historical weather data
- 3-day weather forecasts
- Detailed weather metrics and astronomical data

## Browser Support

- Modern browsers with ES2022 support
- Mobile browsers (iOS Safari, Android Chrome)
- Optimized for both desktop and mobile viewing
