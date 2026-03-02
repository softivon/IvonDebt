/**
 * Recomputes remainingBalance and status after a payment change.
 */
const computeDebtStatus = (debt) => {
  const paid = debt.payments.reduce((sum, p) => sum + p.amount, 0);
  debt.remainingBalance = Math.max(0, debt.originalAmount - paid);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (debt.remainingBalance === 0) {
    debt.status = "settled";
  } else if (debt.remainingBalance < debt.originalAmount) {
    debt.status = "partial";
  } else if (debt.dueDate && new Date(debt.dueDate) < today) {
    debt.status = "overdue";
  } else {
    debt.status = "open";
  }

  return debt;
};

module.exports = { computeDebtStatus };
