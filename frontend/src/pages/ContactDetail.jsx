import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getContact, updateContact, deleteContact } from "../api/client";
import ContactForm from "../components/ContactForm";
import DebtCard from "../components/DebtCard";

export default function ContactDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);

  const load = () => getContact(id).then(({ data }) => setData(data));
  useEffect(() => { load(); }, [id]);

  const handleUpdate = async (form) => {
    await updateContact(id, form);
    setEditing(false);
    load();
  };

  const handleDelete = async () => {
    if (!confirm("Delete this contact and all their debts?")) return;
    await deleteContact(id);
    navigate("/contacts");
  };

  if (!data) return <p className="text-sm text-gray-400">Loading...</p>;

  const { contact, debts, totalOwed, totalOwing } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">{contact.name}</h1>
        <div className="flex gap-2">
          <button onClick={() => setEditing(!editing)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50">Edit</button>
          <button onClick={handleDelete}
            className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50">Delete</button>
        </div>
      </div>

      {editing && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <ContactForm initial={contact} onSubmit={handleUpdate} onCancel={() => setEditing(false)} />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">Owes me</p>
          <p className="text-xl font-bold text-green-700">${totalOwed?.toFixed(2)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">I owe them</p>
          <p className="text-xl font-bold text-red-700">${totalOwing?.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Debts ({debts.length})</h2>
        <div className="space-y-2">
          {debts.map((d) => <DebtCard key={d._id} debt={d} />)}
          {debts.length === 0 && <p className="text-sm text-gray-400">No debts for this contact.</p>}
        </div>
      </div>
    </div>
  );
}
