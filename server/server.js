const express = require("express");
const connectDB = require("./config/db");
const snippetRoutes = require("./routes/snippetRoutes");

const app = express();

const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://developer-snippet-vault.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");

require("dotenv").config();

connectDB();

app.use(helmet());

app.use(express.json({ limit: "10kb" }));

app.use(morgan("combined"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
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

// const express = require("express");
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// const morgan = require("morgan");

// require("dotenv").config();

// const connectDB = require("./config/db");
// const snippetRoutes = require("./routes/snippetRoutes");

// const app = express();

// connectDB();

// /* CORS — allow for demo */
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

// app.use(helmet());
// app.use(express.json({ limit: "10kb" }));
// app.use(morgan("combined"));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });

// app.use("/api/", limiter);

// app.get("/", (req, res) => {
//   res.send("Snippet Vault API Running");
// });

// app.use("/api/snippets", snippetRoutes);

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });