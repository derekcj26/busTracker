import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ onRouteSelect, selectedRoute, onExpandedChange, onClearRoute }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRouteSelected, setIsRouteSelected] = useState(false);

  // Mock data for demonstration - in production, this would come from TransLink API
  const mockRoutes = [
    { id: '700', name: '700 - Gold Coast Airport to Broadbeach', description: 'Express service via Pacific Motorway' },
    { id: '701', name: '701 - Gold Coast Airport to Surfers Paradise', description: 'Via Pacific Motorway and Surfers Paradise' },
    { id: '705', name: '705 - Gold Coast Airport to Robina', description: 'Via Pacific Motorway and Robina Town Centre' },
    { id: '750', name: '750 - Gold Coast Airport to Coolangatta', description: 'Local service via Coolangatta' },
    { id: '760', name: '760 - Surfers Paradise to Broadbeach', description: 'Local service along the coast' },
    { id: '765', name: '765 - Surfers Paradise to Southport', description: 'Local service via Main Beach' },
    { id: '770', name: '770 - Southport to Broadbeach', description: 'Local service via Surfers Paradise' },
    { id: '775', name: '775 - Southport to Robina', description: 'Local service via Ashmore' },
    { id: '780', name: '780 - Robina to Broadbeach', description: 'Local service via Mermaid Beach' },
    { id: '785', name: '785 - Robina to Surfers Paradise', description: 'Local service via Bundall' },
  ];

  useEffect(() => {
    setRoutes(mockRoutes);
    setFilteredRoutes(mockRoutes);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRoutes(routes);
    } else {
      const filtered = routes.filter(route =>
        route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        route.id.includes(searchTerm)
      );
      setFilteredRoutes(filtered);
    }
  }, [searchTerm, routes]);

  // Expand search section when dropdown is shown, but not when route is selected
  useEffect(() => {
    console.log('SearchBar useEffect - showDropdown:', showDropdown, 'selectedRoute:', selectedRoute);
    const shouldExpand = showDropdown || selectedRoute !== null;
    
    if (shouldExpand !== isExpanded) {
      setIsExpanded(shouldExpand);
      if (onExpandedChange) onExpandedChange(shouldExpand);
    }
  }, [showDropdown, selectedRoute, isExpanded, onExpandedChange]);


  const handleRouteSelect = (route) => {
    console.log('Route selected, collapsing search section...');
    // First collapse the search section
    setShowDropdown(false);
    setIsExpanded(false);
    setIsRouteSelected(true);
    if (onExpandedChange) onExpandedChange(false);
    
    // Then set the search term and call the route selection
    setSearchTerm(route.name);
    onRouteSelect(route);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowDropdown(true);
    setIsRouteSelected(false); // User is actively typing, so route is no longer "selected"
    
    // If search is cleared, clear route
    if (value.trim() === '') {
      if (onClearRoute) onClearRoute();
    }
  };

  const handleInputFocus = () => {
    console.log('SearchBar - Input focused, expanding...');
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    // Delay hiding dropdown to allow for clicks
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <div className="search-container">
      <div className="search-header">
        <h3>Search Routes</h3>
      </div>
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search bus routes..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="search-input"
        />
        {isLoading && <div className="loading-spinner"></div>}
        {searchTerm && (
          <button
            className="clear-button"
            onClick={() => {
              setSearchTerm('');
              setShowDropdown(false);
              setIsRouteSelected(false);
              if (onClearRoute) onClearRoute();
            }}
            type="button"
          >
            ×
          </button>
        )}
      </div>
      
      {showDropdown && filteredRoutes.length > 0 && (
        <div className="search-dropdown">
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              className={`search-option ${selectedRoute?.id === route.id ? 'selected' : ''}`}
              onClick={() => handleRouteSelect(route)}
            >
              <div className="route-name">{route.name}</div>
              <div className="route-description">{route.description}</div>
            </div>
          ))}
        </div>
      )}
      
      {showDropdown && filteredRoutes.length === 0 && searchTerm.trim() !== '' && (
        <div className="search-dropdown">
          <div className="no-results">No routes found</div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
