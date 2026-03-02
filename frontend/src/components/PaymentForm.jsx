import { useState } from "react";

export default function PaymentForm({ maxAmount, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    amount: "",
    paymentDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-3"
    >
      <input name="amount" value={form.amount} onChange={handle}
        placeholder={`Amount (max $${maxAmount?.toFixed(2)}) *`}
        type="number" min="0.01" max={maxAmount} step="0.01" required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <input name="paymentDate" value={form.paymentDate} onChange={handle}
        type="date" required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <input name="notes" value={form.notes} onChange={handle}
        placeholder="Notes"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button>}
        <button type="submit"
          className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">Record Payment</button>
      </div>
    </form>
  );
}
