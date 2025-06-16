import React from "react";

function TransactionList({ transactions }) {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions yet.</p>;
  }

  return (
    <ul>
      {transactions.map((t, i) => (
        <li key={i}>
          {t.date}: {t.type} ${t.amount}
        </li>
      ))}
    </ul>
  );
}

export default TransactionList;
