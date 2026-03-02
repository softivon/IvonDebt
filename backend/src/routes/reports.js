const express = require("express");
const router = express.Router();
const Debt = require("../models/Debt");
const { buildSummary, toCSV } = require("../services/reportService");

// GET /api/reports/summary
router.get("/summary", async (req, res) => {
  try {
    const debts = await Debt.find({ status: { $ne: "settled" } });
    res.json(buildSummary(debts));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reports/overdue
router.get("/overdue", async (req, res) => {
  try {
    const debts = await Debt.find({ status: "overdue" })
      .populate("contactId", "name phone email")
      .sort({ dueDate: 1 });
    res.json(debts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/reports/export
router.get("/export", async (req, res) => {
  try {
    const debts = await Debt.find().populate("contactId", "name").sort({ createdAt: -1 });
    const csv = toCSV(debts);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=debts.csv");
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
