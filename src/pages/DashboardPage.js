import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");

  // ✅ Prevent crash if user is null (e.g. not logged in)
  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>You must be logged in to view this page.</h2>
      </div>
    );
  }

  const transfer = () => {
    const val = parseFloat(amt);
    if (!val || val <= 0) return setMsg("Enter valid amount");
    if (val > user.balance) return setMsg("Insufficient funds");

    user.balance -= val;
    user.transactions.push({
      type: "transfer",
      amount: val,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("bankUser", JSON.stringify(user));
    setMsg(`₹${val} transferred.`);
    setAmt("");
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Balance: ₹{user.balance}</p>
      <div className="transfer-form">
        <input
          type="number"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          placeholder="₹ Amount"
        />
        <button onClick={transfer}>Send Money</button>
      </div>
      {msg && <p className="message">{msg}</p>}
      <h2>Transactions</h2>
      <ul className="transaction-list">
        {user.transactions.map((t, i) => (
          <li key={i}>
            {t.date}: {t.type} ₹{t.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
