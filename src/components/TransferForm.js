import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function TransferForm() {
  const { user } = useAuth();
  const [amount, setAmount] = useState("");

  const handleTransfer = () => {
    const amt = parseFloat(amount);
    if (amt > 0 && amt <= user.balance) {
      const newUser = { ...user };
      newUser.balance -= amt;
      newUser.transactions = [
        ...newUser.transactions,
        { type: "transfer", amount: amt, date: new Date().toISOString().split("T")[0] },
      ];
      localStorage.setItem("bankUser", JSON.stringify(newUser));
      window.location.reload();
    } else {
      alert("Invalid amount");
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Send</button>
    </div>
  );
}

export default TransferForm;
