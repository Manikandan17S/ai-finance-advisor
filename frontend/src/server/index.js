import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import analyzeRouter from './routes/analyze.js';
import recommendRouter from './routes/recommend.js';
import dashboardRouter from './routes/dashboard.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/analyze', analyzeRouter);
app.use('/api/recommend', recommendRouter);
app.use('/api/dashboard', dashboardRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});