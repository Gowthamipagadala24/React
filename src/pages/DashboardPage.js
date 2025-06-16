import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import TransactionList from "../components/TransactionList";
import TransferForm from "../components/TransferForm";

function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="dashboard">
      <h2>Welcome, {user.username}</h2>
      <p>Balance: ${user.balance.toFixed(2)}</p>
      <button onClick={logout}>Logout</button>

      <h3>Transfer Money</h3>
      <TransferForm />

      <h3>Transaction History</h3>
      <TransactionList transactions={user.transactions} />
    </div>
  );
}

export default DashboardPage;
