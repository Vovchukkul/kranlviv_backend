require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/kranlviv";

// Middleware
app.use(cors());
app.use(express.json());

// Підключення до MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Підключено до MongoDB"))
  .catch(err => console.error("❌ Помилка MongoDB:", err));

// Модель товарів
const Product = mongoose.model("Product", new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  image: String
}));

// 📌 **Маршрут для отримання товарів**
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Помилка отримання товарів" });
  }
});

// Запуск сервера
app.listen(PORT, () => console.log(`🚀 Сервер працює на http://localhost:${PORT}`));