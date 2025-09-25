import React, { useState, useEffect, useRef } from 'react';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import BusTrackerService from './services/BusTracker';
import './App.css';

function App() {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeStops, setRouteStops] = useState([]);
  const [busPositions, setBusPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  // Debug logging
  console.log('App - isSearchExpanded:', isSearchExpanded);
  const trackingInterval = useRef(null);

  // Handle route selection
  const handleRouteSelect = async (route) => {
    setSelectedRoute(route);
    setIsLoading(true);
    setError(null);
    

    try {
      // Stop any existing tracking
      if (trackingInterval.current) {
        BusTrackerService.stopTracking(trackingInterval.current);
        trackingInterval.current = null;
      }

      // Fetch route stops
      const stopsResponse = await BusTrackerService.getRouteStops(route.id);
      setRouteStops(stopsResponse.data);

      // Fetch initial bus positions
      const positionsResponse = await BusTrackerService.getBusPositions(route.id);
      setBusPositions(positionsResponse.data);

      // Start real-time tracking
      trackingInterval.current = BusTrackerService.startTracking(
        route.id,
        (newPositions) => {
          setBusPositions(newPositions);
        }
      );
    } catch (err) {
      setError('Failed to load route data. Please try again.');
      console.error('Error loading route:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle route clearing
  const handleClearRoute = () => {
    setSelectedRoute(null);
    setRouteStops([]);
    setBusPositions([]);
    setError(null);
    
    // Stop any existing tracking
    if (trackingInterval.current) {
      BusTrackerService.stopTracking(trackingInterval.current);
      trackingInterval.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (trackingInterval.current) {
        BusTrackerService.stopTracking(trackingInterval.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Gold Coast Bus Tracker</h1>
        <p>Track buses in real-time across the Gold Coast</p>
      </header>

      <div className="app-content">
        <div className={`search-section ${isSearchExpanded ? 'expanded' : ''}`}>
          <SearchBar 
            onRouteSelect={handleRouteSelect}
            selectedRoute={selectedRoute}
            onExpandedChange={setIsSearchExpanded}
            onClearRoute={handleClearRoute}
          />
          
          {isLoading && (
            <div className="loading-message">
              Loading route data...
            </div>
          )}
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          {selectedRoute && (
            <div className="route-info">
                <h3>Selected Route: {selectedRoute.name}</h3>
                <p>{selectedRoute.description}</p>
                <div className="route-stats">
                  <span>Stops: {routeStops.length}</span>
                  <span>Active Buses: {busPositions.length}</span>
                </div>
            </div>
          )}
        </div>

        <div className="map-section">
          <Map 
            selectedRoute={selectedRoute}
            busPositions={busPositions}
            routeStops={routeStops}
          />
        </div>
      </div>

    </div>
  );
}

export default App;
