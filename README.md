# Gold Coast Bus Tracker

A React-based web application that tracks bus movements in real-time across the Gold Coast, Australia using OpenStreetMap and TransLink's public transport data.

## Features

- 🗺️ **Interactive Map**: OpenStreetMap integration showing Gold Coast streets and landmarks
- 🔍 **Route Search**: Search and select from available bus routes
- 🚌 **Real-time Tracking**: Live bus position updates every 5 seconds
- 📍 **Route Visualization**: Display bus stops and route paths on the map
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful, intuitive interface with smooth animations

## Technology Stack

- **Frontend**: React 18 with Vite
- **Maps**: Leaflet with React-Leaflet
- **Styling**: Modern CSS with gradients and glassmorphism effects
- **API**: TransLink Queensland public transport data (GTFS/GTFS-RT)
- **Icons**: Custom SVG bus icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd BusTracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. **Search for Routes**: Use the search bar to find bus routes by number, name, or description
2. **Select a Route**: Click on a route from the dropdown to view it on the map
3. **View Route Details**: See bus stops, active buses, and route information
4. **Track Buses**: Watch real-time bus movements with automatic updates

## Available Routes

The application includes mock data for popular Gold Coast bus routes:

- **700**: Gold Coast Airport to Broadbeach (Express)
- **701**: Gold Coast Airport to Surfers Paradise
- **705**: Gold Coast Airport to Robina
- **750**: Gold Coast Airport to Coolangatta
- **760**: Surfers Paradise to Broadbeach
- **765**: Surfers Paradise to Southport
- **770**: Southport to Broadbeach
- **775**: Southport to Robina
- **780**: Robina to Broadbeach
- **785**: Robina to Surfers Paradise

## API Integration

Currently using mock data for demonstration. To integrate with real TransLink data:

1. Register for TransLink API access at [translink.com.au](https://translink.com.au/about-translink/open-data)
2. Add your API key to environment variables:
```bash
REACT_APP_TRANSLINK_API_KEY=your_api_key_here
```
3. Update the `BusTrackerService` to use real API endpoints

## Project Structure

```
src/
├── components/
│   ├── Map.jsx          # OpenStreetMap integration
│   └── SearchBar.jsx    # Route search functionality
├── services/
│   └── BusTracker.js    # API service and data management
├── App.jsx              # Main application component
├── App.css              # Application styles
└── index.css            # Global styles
```

## Making Changes & Updates

### Development Workflow

1. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

2. **Hot Reload**: Changes to source files automatically refresh the browser

3. **Build for Production**:
   ```bash
   npm run build
   ```
   Creates optimized build in `dist/` folder

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

### Common Updates

#### Adding New Bus Routes
1. Edit `src/components/SearchBar.jsx`:
   ```javascript
   const mockRoutes = [
     // Add new route here
     { id: 'XXX', name: 'XXX - Route Name', description: 'Route description' },
   ];
   ```

2. Add corresponding stops in `src/services/BusTracker.js`:
   ```javascript
   const mockStops = {
     'XXX': [
       { id: 'XXX001', name: 'Stop Name', lat: -28.0000, lon: 153.4000 },
       // Add more stops...
     ],
   };
   ```

#### Updating Map Center
Edit `src/components/Map.jsx`:
```javascript
const goldCoastCenter = [-28.0167, 153.4000]; // Change coordinates
```

#### Modifying Styles
- **Main styles**: `src/App.css`
- **Global styles**: `src/index.css`
- **Component-specific**: Add CSS classes in component files

#### Changing API Integration
1. Update `src/services/BusTracker.js`:
   - Replace mock data with real API calls
   - Update endpoints and authentication
   - Modify data transformation logic

2. Add environment variables in `.env`:
   ```bash
   VITE_TRANSLINK_API_KEY=your_api_key_here
   ```

### File Structure for Updates

```
src/
├── components/
│   ├── Map.jsx          # Map display and zoom controls
│   └── SearchBar.jsx    # Search functionality and route selection
├── services/
│   └── BusTracker.js    # API calls and data management
├── App.jsx              # Main app logic and state management
├── App.css              # Main application styles
└── index.css            # Global styles and resets
```

## Customization

### Adding New Routes

Edit the `mockRoutes` array in `SearchBar.jsx` and add corresponding stop data in `BusTracker.js`.

### Styling

The application uses modern CSS with:
- CSS Grid and Flexbox for layout
- CSS custom properties for theming
- Glassmorphism effects
- Responsive design patterns

### Map Configuration

Modify the map center coordinates and zoom level in `Map.jsx`:
```javascript
const goldCoastCenter = [-28.0167, 153.4000]; // Latitude, Longitude
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [TransLink Queensland](https://translink.com.au) for public transport data
- [OpenStreetMap](https://openstreetmap.org) contributors for map data
- [Leaflet](https://leafletjs.com) for the mapping library
- [React](https://reactjs.org) for the frontend framework

## Future Enhancements

- [ ] Real-time arrival predictions
- [ ] Route planning and trip optimization
- [ ] Favorites and saved routes
- [ ] Push notifications for bus arrivals
- [ ] Offline map support
- [ ] Accessibility improvements
- [ ] Dark mode theme