import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', project: 'strawberry-legacy-graphql-ws-r', uptime: process.uptime() });
});

app.post('/api/analyze', async (req, res) => {
  try {
    const { query } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Analyze input for competition Strawberry legacy graphql-ws retains naturally completed subscription slots: ${query}`,
    });
    res.json({ output: response.text });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server active on port ${port}`));
