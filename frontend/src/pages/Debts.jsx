import { useEffect, useState } from "react";
import { getDebts, createDebt } from "../api/client";
import DebtCard from "../components/DebtCard";
import DebtForm from "../components/DebtForm";
import { useApp } from "../context/AppContext";

export default function Debts() {
  const { refreshSummary } = useApp();
  const [debts, setDebts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ status: "", direction: "" });

  const load = () => getDebts(filters).then(({ data }) => setDebts(data));
  useEffect(() => { load(); }, [filters]);

  const handleCreate = async (data) => {
    await createDebt(data);
    setShowForm(false);
    load();
    refreshSummary();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Debts</h1>
        <button onClick={() => setShowForm(true)}
          className="px-4 py-2 text-sm bg-brand-600 text-white rounded hover:bg-brand-700">
          + New Debt
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3">New Debt</h2>
          <DebtForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />
        </div>
      )}

      <div className="flex gap-2">
        <select value={filters.direction} onChange={(e) => setFilters({ ...filters, direction: e.target.value })}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none">
          <option value="">All directions</option>
          <option value="receivable">They owe me</option>
          <option value="payable">I owe them</option>
        </select>
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none">
          <option value="">All statuses</option>
          <option value="open">Open</option>
          <option value="partial">Partial</option>
          <option value="overdue">Overdue</option>
          <option value="settled">Settled</option>
        </select>
      </div>

      <div className="space-y-2">
        {debts.map((d) => <DebtCard key={d._id} debt={d} />)}
        {debts.length === 0 && <p className="text-sm text-gray-400 text-center py-8">No debts found.</p>}
      </div>
    </div>
  );
}
