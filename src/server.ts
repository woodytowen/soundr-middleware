import express from 'express';
import helmet from 'helmet';
import { artistRouter, eventsRouter } from './routes/skiddle/eventsRouter';
import { eventsRouter as eventRouterTM } from './routes/ticketMaster/eventsRouter';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/skiddle', eventsRouter); //Todo to be replaced with aggregate service
app.use('/skiddle', artistRouter); //Todo to be replaced with aggregate service

app.use('/ticketmaster', eventRouterTM); //Todo to be replaced with aggregate service

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
