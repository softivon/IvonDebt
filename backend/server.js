require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./src/db");

const authRouter = require("./src/routes/auth");
const contactsRouter = require("./src/routes/contacts");
const debtsRouter = require("./src/routes/debts");
const paymentsRouter = require("./src/routes/payments");
const reportsRouter = require("./src/routes/reports");
const authMiddleware = require("./src/middleware/auth");

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Public routes
app.use("/api/auth", authRouter);

// Protected API routes
app.use("/api/contacts", authMiddleware, contactsRouter);
app.use("/api/debts", authMiddleware, debtsRouter);
app.use("/api/payments", authMiddleware, paymentsRouter);
app.use("/api/reports", authMiddleware, reportsRouter);

// Serve React static build in production
if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {
  app.use(express.static(path.join(__dirname, "public")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`IvonDebt server running on port ${PORT}`);
});

module.exports = app;
