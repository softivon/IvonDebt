const colors = {
  open: "bg-blue-100 text-blue-700",
  partial: "bg-yellow-100 text-yellow-700",
  settled: "bg-green-100 text-green-700",
  overdue: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}
