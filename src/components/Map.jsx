import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CentreButton from './centreButton';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom bus icon
const busIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2" fill="#3B82F6" stroke="#1E40AF" stroke-width="2"/>
      <circle cx="7" cy="18" r="2" fill="#1E40AF"/>
      <circle cx="17" cy="18" r="2" fill="#1E40AF"/>
      <rect x="5" y="8" width="14" height="6" fill="#E5E7EB"/>
      <rect x="6" y="9" width="2" height="4" fill="#3B82F6"/>
      <rect x="16" y="9" width="2" height="4" fill="#3B82F6"/>
    </svg>
  `),
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12],
});

const Map = ({ selectedRoute, busPositions, routeStops }) => {
  const mapRef = useRef();

  // Gold Coast center coordinates
  const goldCoastCenter = [-28.0167, 153.4000];

  // Debug logging
  console.log('Map component rendered with:', { selectedRoute, busPositions, routeStops });

  // Zoom functions
  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  useEffect(() => {
    if (mapRef.current) {
      if (selectedRoute && routeStops && routeStops.length > 0) {
        // Fit map to show the entire route
        const group = new L.featureGroup(routeStops.map(stop => 
          L.marker([stop.lat, stop.lon])
        ));
        mapRef.current.fitBounds(group.getBounds().pad(0.1));
      }
    }
  }, [selectedRoute, routeStops, goldCoastCenter]);

  return (
    <div className="map-container">
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        background: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        Loading map...
      </div>
      
      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button className="zoom-button" onClick={zoomIn} title="Zoom In">
          +
        </button>
        <button className="zoom-button" onClick={zoomOut} title="Zoom Out">
          −
        </button>
      </div>

      <MapContainer
        center={goldCoastCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        key="map-container"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CentreButton center={goldCoastCenter} zoom={12} />
        
        {/* Route stops */}
        {routeStops && routeStops.map((stop, index) => (
          <Marker key={`stop-${index}`} position={[stop.lat, stop.lon]}>
            <Popup>
              <div>
                <strong>{stop.name}</strong>
                <br />
                Stop ID: {stop.id}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Bus positions */}
        {busPositions && busPositions.map((bus, index) => (
          <Marker key={`bus-${index}`} position={[bus.lat, bus.lon]} icon={busIcon}>
            <Popup>
              <div>
                <strong>Bus {bus.vehicleId}</strong>
                <br />
                Route: {bus.routeId}
                <br />
                Status: {bus.status}
                <br />
                Last Update: {new Date(bus.timestamp).toLocaleTimeString()}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route line */}
        {routeStops && routeStops.length > 1 && (
          <Polyline
            positions={routeStops.map(stop => [stop.lat, stop.lon])}
            color="#3B82F6"
            weight={4}
            opacity={0.7}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
