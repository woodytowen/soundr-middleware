import express from 'express';
import helmet from 'helmet';
import { eventsRouter as eventRouterSoundr } from './routes/soundr/eventsRouter';
import dotenv from 'dotenv';
import { deduplicateAndMergeEvents } from './services/util/serviceUtils';
import { MOCK_SOUND_EVENT } from './builder/responseBuilders/mocks/mockSoundrEvent';
import packageJson from '../package.json';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.json({
    message: 'Soundr API is running',
    version: '1.0.0',
    endpoints: '/api/info',
  });
});

// Detailed API info
app.get('/api/info', (req, res) => {
  res.json({
    application: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
    endpoints: [
      {
        path: 'POST /soundr/events',
        description: 'Aggregates event data from multiple ticketing APIs',
        method: 'POST',
        contentType: 'application/json',
        body: {
          optional: ['offset', 'genres', 'location'],
          example: {
            genres: ['DRUM_AND_BASS'],
            offset: 0,
            location: {
              latitude: 0,
              longitude: -0,
              radius: 40,
            },
          },
        },
      },
    ],
    status: 'healthy',
    uptime: process.uptime(),
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.use('/TestEndPoint', (req, res) => {
  const result = deduplicateAndMergeEvents(MOCK_SOUND_EVENT);
  console.log(result);
  res.json(result);
});

app.use('/soundr', eventRouterSoundr);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
