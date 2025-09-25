import axios from 'axios';
// Import the generated protobuf module (namespace import for CommonJS compatibility)
import * as gtfsRealtime from './protobufs/gtfs-realtime.js';

const GTFS_RT_URL = process.env.GTFS_RT_URL || '';

export async function getBusLocations(busNumbers: string[]): Promise<any[]> {
  if (!GTFS_RT_URL) {
    throw new Error('GTFS real-time feed URL not set');
  }

  // Fetch GTFS-realtime protobuf data
  const response = await axios.get(GTFS_RT_URL, {
    responseType: 'arraybuffer',
    headers: { 'Accept': 'application/x-protobuf' },
  });

  // Decode the protobuf data
  const buffer = new Uint8Array(response.data);
  const feed = gtfsRealtime.transit_realtime.FeedMessage.decode(buffer);

  // Filter vehicle positions by busNumbers if provided
  const vehicles = feed.entity
    .filter((entity: any) =>
      entity.vehicle &&
      (!busNumbers.length || busNumbers.includes(entity.vehicle.trip?.routeId))
    )
    .map((entity: any) => entity.vehicle);

  return vehicles;
}
