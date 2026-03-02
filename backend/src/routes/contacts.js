const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const Debt = require("../models/Debt");

// GET /api/contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ name: 1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/contacts
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/contacts/:id
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });

    const debts = await Debt.find({ contactId: req.params.id }).sort({ createdAt: -1 });
    const totalOwed = debts
      .filter((d) => d.direction === "receivable")
      .reduce((sum, d) => sum + d.remainingBalance, 0);
    const totalOwing = debts
      .filter((d) => d.direction === "payable")
      .reduce((sum, d) => sum + d.remainingBalance, 0);

    res.json({ contact, debts, totalOwed, totalOwing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/contacts/:id
router.put("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/contacts/:id
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ error: "Contact not found" });
    // Also remove associated debts
    await Debt.deleteMany({ contactId: req.params.id });
    res.json({ message: "Contact and associated debts deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
