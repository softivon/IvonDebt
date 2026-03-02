import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDebt, deleteDebt, addPayment, deletePayment } from "../api/client";
import { useApp } from "../context/AppContext";
import StatusBadge from "../components/StatusBadge";
import PaymentForm from "../components/PaymentForm";

export default function DebtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { refreshSummary } = useApp();
  const [debt, setDebt] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const load = () => getDebt(id).then(({ data }) => setDebt(data));
  useEffect(() => { load(); }, [id]);

  const handlePayment = async (form) => {
    await addPayment(id, form);
    setShowPayment(false);
    load();
    refreshSummary();
  };

  const handleDeletePayment = async (paymentId) => {
    if (!confirm("Remove this payment?")) return;
    await deletePayment(id, paymentId);
    load();
    refreshSummary();
  };

  const handleDeleteDebt = async () => {
    if (!confirm("Delete this debt?")) return;
    await deleteDebt(id);
    refreshSummary();
    navigate("/debts");
  };

  if (!debt) return <p className="text-sm text-gray-400">Loading...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {debt.contactId?.name}
          </h1>
          <p className="text-sm text-gray-500">{debt.description || "No description"}</p>
        </div>
        <button onClick={handleDeleteDebt}
          className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50">
          Delete
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <StatusBadge status={debt.status} />
          <span className={`text-sm font-medium ${debt.direction === "receivable" ? "text-green-600" : "text-red-600"}`}>
            {debt.direction === "receivable" ? "They owe me" : "I owe them"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Original</span>
          <span className="font-semibold">${debt.originalAmount?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Remaining</span>
          <span className="font-bold text-lg">${debt.remainingBalance?.toFixed(2)}</span>
        </div>
        {debt.dueDate && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Due date</span>
            <span>{new Date(debt.dueDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {debt.status !== "settled" && (
        <div>
          {showPayment ? (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-3">Record Payment</h2>
              <PaymentForm maxAmount={debt.remainingBalance} onSubmit={handlePayment} onCancel={() => setShowPayment(false)} />
            </div>
          ) : (
            <button onClick={() => setShowPayment(true)}
              className="w-full py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
              + Record Payment
            </button>
          )}
        </div>
      )}

      <div>
        <h2 className="text-sm font-semibold text-gray-600 mb-2">Payment History ({debt.payments?.length || 0})</h2>
        {debt.payments?.length === 0 && <p className="text-sm text-gray-400">No payments yet.</p>}
        <div className="space-y-2">
          {debt.payments?.map((p) => (
            <div key={p._id} className="flex items-center justify-between bg-white border border-gray-200 rounded px-3 py-2">
              <div>
                <span className="text-sm font-medium text-gray-800">${p.amount?.toFixed(2)}</span>
                <span className="ml-2 text-xs text-gray-400">{new Date(p.paymentDate).toLocaleDateString()}</span>
                {p.notes && <span className="ml-2 text-xs text-gray-400">— {p.notes}</span>}
              </div>
              <button onClick={() => handleDeletePayment(p._id)}
                className="text-xs text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
