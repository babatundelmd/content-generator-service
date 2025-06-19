import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { generateContentFlow } from './flows';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('AI Content Generator Backend is running!');
});

app.post('/api/generate-content', async (req, res) => {
  try {
    const result = await generateContentFlow(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ 
      error: 'Failed to generate content', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
  console.log(`Content generation endpoint available at http://localhost:${port}/api/generate-content`);
});