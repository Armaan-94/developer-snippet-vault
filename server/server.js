const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

require("dotenv").config();

const connectDB = require("./config/db");
const snippetRoutes = require("./routes/snippetRoutes");

const app = express();

connectDB();

app.use(helmet());

app.use(cors({
  origin: [
    "http://localhost:5173",
    process.env.CLIENT_URL
  ]
}));

app.use(express.json({ limit: "10kb" }));

app.use(morgan("combined"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests. Please try again later."
  }
});

app.use("/api/", limiter);

app.get("/", (req, res) => {
  res.send("Snippet Vault API Running");
});

app.use("/api/snippets", snippetRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});