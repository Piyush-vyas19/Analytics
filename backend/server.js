const express = require('express');
const dotenv = require('dotenv');
const salesRoutes = require('./routes/salesroutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Use sales routes for sales-related operations
app.use('/sales', salesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
