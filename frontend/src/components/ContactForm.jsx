import { useState } from "react";

export default function ContactForm({ initial = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name: initial.name || "",
    phone: initial.phone || "",
    email: initial.email || "",
    address: initial.address || "",
    notes: initial.notes || "",
    type: initial.type || "customer",
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}
      className="space-y-3"
    >
      <input name="name" value={form.name} onChange={handle} placeholder="Name *" required
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <input name="phone" value={form.phone} onChange={handle} placeholder="Phone"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <input name="email" value={form.email} onChange={handle} placeholder="Email" type="email"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <input name="address" value={form.address} onChange={handle} placeholder="Address"
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />
      <select name="type" value={form.type} onChange={handle}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500">
        <option value="customer">Customer</option>
        <option value="supplier">Supplier</option>
        <option value="both">Both</option>
      </select>
      <textarea name="notes" value={form.notes} onChange={handle} placeholder="Notes" rows={2}
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
