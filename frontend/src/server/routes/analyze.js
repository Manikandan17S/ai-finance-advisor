import express from 'express';
import axios from 'axios';

const router = express.Router();

// Free NLP API endpoint
const NLP_API_URL = 'https://api.meaningcloud.com/sentiment-2.1';
const API_KEY = process.env.MEANINGCLOUD_API_KEY || 'your-api-key';

router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post(NLP_API_URL, {
      key: API_KEY,
      txt: text,
      lang: 'en'
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error analyzing text' });
  }
});

export default router;