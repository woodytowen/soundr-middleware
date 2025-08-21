import express from 'express';
import { fetchSampleData } from '../controllers/sampleDataController';

export const dataRouter = express.Router();

dataRouter.get('/fetchData', fetchSampleData);
