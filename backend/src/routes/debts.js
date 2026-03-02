const express = require("express");
const router = express.Router();
const Debt = require("../models/Debt");
const { computeDebtStatus } = require("../services/debtService");

// GET /api/debts?status=&direction=&contactId=
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.direction) filter.direction = req.query.direction;
    if (req.query.contactId) filter.contactId = req.query.contactId;

    const debts = await Debt.find(filter)
      .populate("contactId", "name phone email")
      .sort({ createdAt: -1 });

    res.json(debts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/debts
router.post("/", async (req, res) => {
  try {
    const debt = new Debt(req.body);
    computeDebtStatus(debt);
    await debt.save();
    res.status(201).json(debt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/debts/:id
router.get("/:id", async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id).populate("contactId", "name phone email");
    if (!debt) return res.status(404).json({ error: "Debt not found" });
    res.json(debt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/debts/:id
router.put("/:id", async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ error: "Debt not found" });

    Object.assign(debt, req.body);
    computeDebtStatus(debt);
    await debt.save();
    res.json(debt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/debts/:id
router.delete("/:id", async (req, res) => {
  try {
    const debt = await Debt.findByIdAndDelete(req.params.id);
    if (!debt) return res.status(404).json({ error: "Debt not found" });
    res.json({ message: "Debt deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
