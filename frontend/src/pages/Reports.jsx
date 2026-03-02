import { useEffect } from "react";
import { useApp } from "../context/AppContext";
import { exportCSV } from "../api/client";

export default function Reports() {
  const { state, refreshSummary } = useApp();
  const { summary } = state;

  useEffect(() => { refreshSummary(); }, []);

  const handleExport = async () => {
    const { data } = await exportCSV();
    const url = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "debts.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const rows = [
    { label: "Total Receivable (they owe me)", value: `$${summary.totalReceivable?.toFixed(2)}`, color: "text-green-700" },
    { label: "Total Payable (I owe them)", value: `$${summary.totalPayable?.toFixed(2)}`, color: "text-red-700" },
    { label: "Net Balance", value: `$${summary.netBalance?.toFixed(2)}`, color: summary.netBalance >= 0 ? "text-green-700" : "text-red-700" },
    { label: "Overdue Debts", value: summary.overdueCount, color: "text-red-600" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Reports</h1>
        <button onClick={handleExport}
          className="px-4 py-2 text-sm bg-brand-600 text-white rounded hover:bg-brand-700">
          Export CSV
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
        {rows.map(({ label, value, color }) => (
          <div key={label} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-gray-600">{label}</span>
            <span className={`font-bold ${color}`}>{value}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 text-center print:hidden">
        Use your browser's Print function for a print-friendly summary.
      </p>
    </div>
  );
}
