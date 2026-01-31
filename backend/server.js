const express = require('express');
const cors = require('cors');
const connectDB = require('./db'); // Fixed: removed /backend/
const authRoutes = require('./routes/auth'); // Fixed: removed /backend/
const Product = require('./models/Product'); // Fixed: removed /backend/

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

// Get all products or search by title
app.get('/api/products', async (req, res) => {
  try {
    const { q } = req.query;
    // Professional search logic: case-insensitive regex
    const query = q ? { title: { $regex: q, $options: 'i' } } : {};
    const products = await Product.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});