const express = require("express");
const router = express.Router();
const Debt = require("../models/Debt");
const { computeDebtStatus } = require("../services/debtService");

// POST /api/debts/:id/payments
router.post("/debt/:id", async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.id);
    if (!debt) return res.status(404).json({ error: "Debt not found" });

    const { amount, paymentDate, notes } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Payment amount must be greater than 0" });
    }
    if (amount > debt.remainingBalance) {
      return res.status(400).json({ error: "Payment exceeds remaining balance" });
    }

    debt.payments.push({ amount, paymentDate, notes });
    computeDebtStatus(debt);
    await debt.save();

    res.status(201).json(debt);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/payments/:paymentId (within debt :debtId)
router.delete("/debt/:debtId/payment/:paymentId", async (req, res) => {
  try {
    const debt = await Debt.findById(req.params.debtId);
    if (!debt) return res.status(404).json({ error: "Debt not found" });

    const payment = debt.payments.id(req.params.paymentId);
    if (!payment) return res.status(404).json({ error: "Payment not found" });

    payment.deleteOne();
    computeDebtStatus(debt);
    await debt.save();

    res.json(debt);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
