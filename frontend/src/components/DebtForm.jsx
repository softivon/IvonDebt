import { useState, useEffect } from "react";
import { getContacts } from "../api/client";

export default function DebtForm({ initial = {}, onSubmit, onCancel }) {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    contactId: initial.contactId?._id || initial.contactId || "",
    direction: initial.direction || "receivable",
    originalAmount: initial.originalAmount || "",
    dueDate: initial.dueDate ? initial.dueDate.split("T")[0] : "",
    description: initial.description || "",
  });

  useEffect(() => {
    getContacts().then(({ data }) => setContacts(data));
  }, []);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-3"
    >
      <select name="contactId" value={form.contactId} onChange={handle} required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
        <option value="">Select contact *</option>
        {contacts.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      <select name="direction" value={form.direction} onChange={handle}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
        <option value="receivable">They owe me (Receivable)</option>
        <option value="payable">I owe them (Payable)</option>
      </select>
      <input name="originalAmount" value={form.originalAmount} onChange={handle}
        placeholder="Amount *" type="number" min="0.01" step="0.01" required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <input name="dueDate" value={form.dueDate} onChange={handle}
        type="date"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <textarea name="description" value={form.description} onChange={handle}
        placeholder="Description / notes" rows={2}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <div className="flex gap-2 justify-end">
        {onCancel && <button type="button" onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded">Cancel</button>}
        <button type="submit"
          className="px-4 py-2 text-sm bg-brand-600 text-white rounded hover:bg-brand-700">Save</button>
      </div>
    </form>
  );
}
