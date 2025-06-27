import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import FundDetailsPopup from "../components/FundDetailsPopup";

export default function DashboardPage() {
  const { user } = useAuth();
  const [amt, setAmt] = useState("");
  const [msg, setMsg] = useState("");
  const [recipient, setRecipient] = useState("");
  const [showPopup, setShowPopup] = useState(false);

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
    if (!recipient) return setMsg("Enter recipient name");
    if (val > user.balance) return setMsg("Insufficient funds");

    user.balance -= val;
    user.transactions.push({
      type: "transfer",
      amount: val,
      to: recipient,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("bankUser", JSON.stringify(user));
    setMsg(`₹${val} transferred.`);
    setAmt("");
    setRecipient("");
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <button onClick={() => setShowPopup(true)}>
        View KiwiSaver
      </button>
      {showPopup && (
        <FundDetailsPopup balance={user.balance} onBack={() => setShowPopup(false)} />
      )}
      <p>Balance: ₹{user.balance}</p>
      <div className="transfer-form">
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient Name"
          required
        />
        <input
          type="number"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          placeholder="₹ Amount"
          required
        />
        <button onClick={transfer}>Send Money</button>
      </div>
      {msg && <p className="message">{msg}</p>}
      <h2>Transactions</h2>
      <ul className="transaction-list">
        {user.transactions.map((t, i) => (
          <li key={i}>
            {t.date}: {t.type} ₹{t.amount}
            {t.to && ` to ${t.to}`}
          </li>
        ))}
      </ul>     
    </div>
  );
}
