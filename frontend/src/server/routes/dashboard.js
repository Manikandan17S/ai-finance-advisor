import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  // This would typically come from a database
  const data = {
    balance: 184593.21,
    monthlyIncome: 42567.89,
    monthlyExpenses: 18453.32,
    investments: 87293.45,
    balanceHistory: [
      { date: '2025-03-01', balance: 175000 },
      { date: '2025-03-05', balance: 174200 },
      { date: '2025-03-10', balance: 178500 },
      { date: '2025-03-15', balance: 177800 },
      { date: '2025-03-20', balance: 181200 },
      { date: '2025-03-25', balance: 182500 },
      { date: '2025-03-30', balance: 184593.21 }
    ],
    spendingCategories: [
      { category: 'Housing', amount: 5600 },
      { category: 'Food', amount: 2300 },
      { category: 'Transport', amount: 1800 },
      { category: 'Shopping', amount: 1500 },
      { category: 'Utilities', amount: 950 },
      { category: 'Other', amount: 1200 }
    ]
  };
  
  res.json(data);
});

export default router;