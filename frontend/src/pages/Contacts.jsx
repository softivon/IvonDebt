import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContacts, createContact } from "../api/client";
import ContactForm from "../components/ContactForm";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const load = () => getContacts().then(({ data }) => setContacts(data));
  useEffect(() => { load(); }, []);

  const handleCreate = async (data) => {
    await createContact(data);
    setShowForm(false);
    load();
  };

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Contacts</h1>
        <button onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm bg-brand-600 text-white rounded hover:bg-brand-700">
          + New Contact
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">New Contact</h2>
          <ContactForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <input value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search contacts..."
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-500" />

      <div className="space-y-2">
        {filtered.map((c) => (
          <Link key={c._id} to={`/contacts/${c._id}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-brand-500 transition-colors">
            <div>
              <p className="font-medium text-gray-800">{c.name}</p>
              <p className="text-xs text-gray-400">{c.phone || c.email || "—"}</p>
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.type}</span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No contacts found.</p>
        )}
      </div>
    </div>
  );
}
