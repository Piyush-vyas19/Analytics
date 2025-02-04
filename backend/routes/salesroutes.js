const express = require('express');
const router = express.Router();
const supabase = require('../config/dbconfig');

const monthMapping = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};

router.get('/total-sales', async (req, res) => {
  try {
    const { startMonth, endMonth } = req.query;

    if (!startMonth || !endMonth) {
      return res.status(400).json({ error: 'startMonth and endMonth query parameters are required' });
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('Month, Total_Amount');

    if (error) throw error;

    const startMonthNum = monthMapping[startMonth];
    const endMonthNum = monthMapping[endMonth];

    if (!startMonthNum || !endMonthNum) {
      return res.status(400).json({ error: 'Invalid month names provided' });
    }

    const filteredData = data.filter(row => {
      const rowMonthNum = monthMapping[row.Month];
      return rowMonthNum >= startMonthNum && rowMonthNum <= endMonthNum;
    });

    const aggregatedData = filteredData.reduce((acc, row) => {
      if (!acc[row.Month]) {
        acc[row.Month] = { month: row.Month, total_sales: 0 };
      }
      acc[row.Month].total_sales += row.Total_Amount;
      return acc;
    }, {});

    res.json(Object.values(aggregatedData));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/categorysales',async (req, res) => {
  try {
    const { startMonth, endMonth } = req.query;
    const startMonthNum = monthMapping[startMonth];
    const endMonthNum = monthMapping[endMonth];

    if (!startMonthNum || !endMonthNum) {
      throw new Error('Invalid month names provided');
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('Product_Category, Total_Amount, Month');

    if (error) {
      throw error;
    }

    const filteredData = data.filter(row => {
      const rowMonthNum = monthMapping[row.Month];
      return rowMonthNum >= startMonthNum && rowMonthNum <= endMonthNum;
    });

    const aggregatedData = filteredData.reduce((acc, row) => {
      if (!acc[row.Product_Category]) {
        acc[row.Product_Category] = { category: row.Product_Category, total_sales: 0 };
      }
      acc[row.Product_Category].total_sales += row.Total_Amount;
      return acc;
    }, {});

    res.json(Object.values(aggregatedData));
  } catch (error) {
    res.status(500).json({ error: error.message });
    throw error;
  }
});


module.exports = router;
