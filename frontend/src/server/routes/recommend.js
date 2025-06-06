import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  const recommendations = [
    {
      type: 'savings',
      title: 'Optimize Savings',
      description: 'Based on your spending patterns, you could save 15% more by reducing discretionary expenses.'
    },
    {
      type: 'investment',
      title: 'Investment Opportunity',
      description: 'Consider diversifying your portfolio with index funds for long-term growth.'
    }
  ];
  
  res.json({ recommendations });
});

export default router;