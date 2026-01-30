const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce_simple")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error", err));

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String },
  rating: { type: Number },
  description: { type: String }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

app.get("/", (req, res) => {
  res.send("WebMart Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
