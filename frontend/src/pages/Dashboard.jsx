import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getOverdue } from "../api/client";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const { state, refreshSummary } = useApp();
  const { summary } = state;
  const [overdue, setOverdue] = useState([]);

  useEffect(() => {
    refreshSummary();
    getOverdue().then(({ data }) => setOverdue(data));
  }, []);

  const cards = [
    { label: "Total Receivable", value: summary.totalReceivable, color: "text-green-600" },
    { label: "Total Payable", value: summary.totalPayable, color: "text-red-600" },
    { label: "Net Balance", value: summary.netBalance, color: summary.netBalance >= 0 ? "text-green-700" : "text-red-700" },
    { label: "Overdue Debts", value: summary.overdueCount, color: "text-red-600", isCount: true },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, color, isCount }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>
              {isCount ? value : `$${Number(value).toFixed(2)}`}
            </p>
          </div>
        ))}
      </div>

      {/* Overdue panel */}
      {overdue.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-red-700 mb-3">
            Overdue Debts ({overdue.length})
          </h2>
          <div className="space-y-2">
            {overdue.map((d) => (
              <Link
                key={d._id}
                to={`/debts/${d._id}`}
                className="flex items-center justify-between bg-white border border-red-100 rounded px-3 py-2 hover:border-red-400 transition-colors"
              >
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    {d.contactId?.name}
                  </span>
                  <span className="ml-2 text-xs text-gray-400">
                    Due {new Date(d.dueDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={d.status} />
                  <span className="text-sm font-semibold text-gray-800">
                    ${d.remainingBalance?.toFixed(2)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {overdue.length === 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-green-700">
          No overdue debts. All clear!
        </div>
      )}
    </div>
  );
}
