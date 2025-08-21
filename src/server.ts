import express from 'express';
import helmet from 'helmet';
import { dataRouter } from './routes/sampleDataRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/data', dataRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
