import express from 'express';
import helmet from 'helmet';
import { eventsRouter as eventRouterSoundr } from './routes/soundr/eventsRouter';
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

app.use('/soundr', eventRouterSoundr);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
