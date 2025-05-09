import express from 'express';
import cors from 'cors';

const fetch = (await import('node-fetch')).default;
const app = express();
const PORT = 5000;

// ✅ CORS configured to only allow localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET'],
  credentials: true,
}));

// 🎯 ZenQuotes API integration
app.get('/quote', async (req, res) => {
  try {
    const response = await fetch('https://zenquotes.io/api/random');
    const data = await response.json();

    console.log('ZenQuotes API Response:', data); // Log the API response for debugging

    if (!data || !data[0]) {
      throw new Error('No quote data received');
    }

    const quoteData = {
      content: data[0].q,
      author: data[0].a
    };

    res.json(quoteData);
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
