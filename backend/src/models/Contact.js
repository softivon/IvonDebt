const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String },
    notes: { type: String },
    type: {
      type: String,
      enum: ["customer", "supplier", "both"],
      default: "customer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
