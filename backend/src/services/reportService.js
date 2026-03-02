const { convert } = require("json-2-csv");

/**
 * Builds dashboard summary totals from an array of debts.
 */
const buildSummary = (debts) => {
  let totalReceivable = 0;
  let totalPayable = 0;
  let overdueCount = 0;

  debts.forEach((d) => {
    if (d.direction === "receivable") totalReceivable += d.remainingBalance;
    if (d.direction === "payable") totalPayable += d.remainingBalance;
    if (d.status === "overdue") overdueCount++;
  });

  return {
    totalReceivable: +totalReceivable.toFixed(2),
    totalPayable: +totalPayable.toFixed(2),
    netBalance: +(totalReceivable - totalPayable).toFixed(2),
    overdueCount,
  };
};

/**
 * Converts an array of debt objects to CSV string.
 */
const toCSV = (debts) => {
  const rows = debts.map((d) => ({
    id: d._id.toString(),
    contact: d.contactId?.name || "",
    direction: d.direction,
    originalAmount: d.originalAmount,
    remainingBalance: d.remainingBalance,
    status: d.status,
    dueDate: d.dueDate ? d.dueDate.toISOString().split("T")[0] : "",
    description: d.description || "",
    createdAt: d.createdAt.toISOString().split("T")[0],
  }));

  return convert(rows);
};

module.exports = { buildSummary, toCSV };
