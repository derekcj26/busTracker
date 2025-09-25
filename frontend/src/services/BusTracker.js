import axios from 'axios';

class BusTrackerService {
  constructor() {
    // TransLink API endpoints (these would be the actual endpoints in production)
    this.baseURL = 'https://api.translink.com.au';
    this.apiKey = import.meta.env.VITE_TRANSLINK_API_KEY || import.meta.env.REACT_APP_TRANSLINK_API_KEY || 'demo-key';
    
    // Mock data for demonstration
    this.mockBusPositions = {};
    this.mockRouteStops = {};
  }

  // Get available routes
  async getRoutes() {
    try {
      // In production, this would call the actual TransLink API
      // const response = await axios.get(`${this.baseURL}/routes`, {
      //   headers: { 'Authorization': `Bearer ${this.apiKey}` }
      // });
      
      // Mock response for demonstration
      return {
        data: [
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
        ]
      };
    } catch (error) {
      console.error('Error fetching routes:', error);
      throw error;
    }
  }

  // Get route stops for a specific route
  async getRouteStops(routeId) {
    try {
      // In production, this would call the actual TransLink API
      // const response = await axios.get(`${this.baseURL}/routes/${routeId}/stops`, {
      //   headers: { 'Authorization': `Bearer ${this.apiKey}` }
      // });

      // Mock data for demonstration - Gold Coast area stops
      const mockStops = {
        '700': [
          { id: '700001', name: 'Gold Coast Airport', lat: -28.1644, lon: 153.5047 },
          { id: '700002', name: 'Coolangatta', lat: -28.1683, lon: 153.5361 },
          { id: '700003', name: 'Tugun', lat: -28.1500, lon: 153.5000 },
          { id: '700004', name: 'Burleigh Heads', lat: -28.1000, lon: 153.4500 },
          { id: '700005', name: 'Broadbeach', lat: -28.0333, lon: 153.4333 },
        ],
        '701': [
          { id: '701001', name: 'Gold Coast Airport', lat: -28.1644, lon: 153.5047 },
          { id: '701002', name: 'Coolangatta', lat: -28.1683, lon: 153.5361 },
          { id: '701003', name: 'Tugun', lat: -28.1500, lon: 153.5000 },
          { id: '701004', name: 'Burleigh Heads', lat: -28.1000, lon: 153.4500 },
          { id: '701005', name: 'Surfers Paradise', lat: -28.0000, lon: 153.4000 },
        ],
        '760': [
          { id: '760001', name: 'Surfers Paradise', lat: -28.0000, lon: 153.4000 },
          { id: '760002', name: 'Main Beach', lat: -27.9833, lon: 153.4167 },
          { id: '760003', name: 'Broadbeach', lat: -28.0333, lon: 153.4333 },
        ],
        '765': [
          { id: '765001', name: 'Surfers Paradise', lat: -28.0000, lon: 153.4000 },
          { id: '765002', name: 'Main Beach', lat: -27.9833, lon: 153.4167 },
          { id: '765003', name: 'Southport', lat: -27.9667, lon: 153.4000 },
        ],
        '770': [
          { id: '770001', name: 'Southport', lat: -27.9667, lon: 153.4000 },
          { id: '770002', name: 'Main Beach', lat: -27.9833, lon: 153.4167 },
          { id: '770003', name: 'Surfers Paradise', lat: -28.0000, lon: 153.4000 },
          { id: '770004', name: 'Broadbeach', lat: -28.0333, lon: 153.4333 },
        ],
      };

      return { data: mockStops[routeId] || [] };
    } catch (error) {
      console.error('Error fetching route stops:', error);
      throw error;
    }
  }

  // Get real-time bus positions for a route
  async getBusPositions(routeId) {
    try {
      // In production, this would call the actual TransLink real-time API
      // const response = await axios.get(`${this.baseURL}/routes/${routeId}/vehicles`, {
      //   headers: { 'Authorization': `Bearer ${this.apiKey}` }
      // });

      // Mock real-time data with some movement simulation
      const mockPositions = this.generateMockBusPositions(routeId);
      return { data: mockPositions };
    } catch (error) {
      console.error('Error fetching bus positions:', error);
      throw error;
    }
  }

  // Generate mock bus positions with some movement
  generateMockBusPositions(routeId) {
    const basePositions = {
      '700': [
        { vehicleId: '700-001', routeId: '700', lat: -28.1644, lon: 153.5047, status: 'IN_TRANSIT', timestamp: Date.now() },
        { vehicleId: '700-002', routeId: '700', lat: -28.1000, lon: 153.4500, status: 'IN_TRANSIT', timestamp: Date.now() },
      ],
      '701': [
        { vehicleId: '701-001', routeId: '701', lat: -28.1500, lon: 153.5000, status: 'IN_TRANSIT', timestamp: Date.now() },
      ],
      '760': [
        { vehicleId: '760-001', routeId: '760', lat: -28.0000, lon: 153.4000, status: 'IN_TRANSIT', timestamp: Date.now() },
        { vehicleId: '760-002', routeId: '760', lat: -28.0333, lon: 153.4333, status: 'IN_TRANSIT', timestamp: Date.now() },
      ],
      '765': [
        { vehicleId: '765-001', routeId: '765', lat: -27.9833, lon: 153.4167, status: 'IN_TRANSIT', timestamp: Date.now() },
      ],
      '770': [
        { vehicleId: '770-001', routeId: '770', lat: -27.9667, lon: 153.4000, status: 'IN_TRANSIT', timestamp: Date.now() },
        { vehicleId: '770-002', routeId: '770', lat: -28.0000, lon: 153.4000, status: 'IN_TRANSIT', timestamp: Date.now() },
      ],
    };

    // Add some random movement to simulate real-time updates
    return (basePositions[routeId] || []).map(bus => ({
      ...bus,
      lat: bus.lat + (Math.random() - 0.5) * 0.01,
      lon: bus.lon + (Math.random() - 0.5) * 0.01,
      timestamp: Date.now(),
    }));
  }

  // Start real-time tracking for a route
  startTracking(routeId, onUpdate) {
    const interval = setInterval(async () => {
      try {
        const response = await this.getBusPositions(routeId);
        onUpdate(response.data);
      } catch (error) {
        console.error('Error in real-time tracking:', error);
      }
    }, 5000); // Update every 5 seconds

    return interval;
  }

  // Stop real-time tracking
  stopTracking(interval) {
    if (interval) {
      clearInterval(interval);
    }
  }
}

export default new BusTrackerService();
