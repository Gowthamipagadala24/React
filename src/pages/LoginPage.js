import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { login } = useAuth();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handle = (e) => {
    e.preventDefault();
    if (login(u, p)) nav("/dashboard");
    else setErr("Invalid credentials");
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handle}>
        <input value={u} onChange={e => setU(e.target.value)} placeholder="Username" required />
        <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      {err && <p className="error">{err}</p>}
    </div>
  );
}
