import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function DebtCard({ debt }) {
  const contact = debt.contactId;
  return (
    <Link
      to={`/debts/${debt._id}`}
      className="block bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-500 transition-colors"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-gray-800">{contact?.name || "Unknown"}</span>
        <StatusBadge status={debt.status} />
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span className={debt.direction === "receivable" ? "text-green-600" : "text-red-600"}>
          {debt.direction === "receivable" ? "They owe me" : "I owe them"}
        </span>
        <span className="font-semibold text-gray-800">
          ${debt.remainingBalance?.toFixed(2)} / ${debt.originalAmount?.toFixed(2)}
        </span>
      </div>
      {debt.dueDate && (
        <p className="text-xs text-gray-400 mt-1">
          Due: {new Date(debt.dueDate).toLocaleDateString()}
        </p>
      )}
    </Link>
  );
}
