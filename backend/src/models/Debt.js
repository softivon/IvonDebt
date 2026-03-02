const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0.01 },
    paymentDate: { type: Date, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

const debtSchema = new mongoose.Schema(
  {
    contactId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
    direction: {
      type: String,
      enum: ["receivable", "payable"],
      required: true,
    },
    originalAmount: { type: Number, required: true, min: 0.01 },
    remainingBalance: { type: Number },
    dueDate: { type: Date },
    description: { type: String },
    status: {
      type: String,
      enum: ["open", "partial", "settled", "overdue"],
      default: "open",
    },
    payments: [paymentSchema],
  },
  { timestamps: true }
);

// Set remainingBalance on first save
debtSchema.pre("save", function (next) {
  if (this.isNew) {
    this.remainingBalance = this.originalAmount;
  }
  next();
});

module.exports = mongoose.model("Debt", debtSchema);
