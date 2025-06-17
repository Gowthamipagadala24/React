import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">SmartBank</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="nav-right">
        {user ? (
          <>
            <span>Welcome, {user.username}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login"><button className="login-btn">Login</button></Link>
        )}
      </div>
    </nav>
  );
}
