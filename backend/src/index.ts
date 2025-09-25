import express from 'express';
import { getBusLocations } from './translinkService.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api/buses', async (req: any, res:any) => {
  try {
    // Example: busNumbers=123,456
    const busNumbers = (req.query.busNumbers as string)?.split(',') || [];
    const locations = await getBusLocations(busNumbers);
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bus locations' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
