import React from "react";

export default function HomePage() {
  return (
    <div className="container">
      <h1>Welcome to SmartBank</h1>
      <p>Your trusted partner in modern banking. Explore our services and features.</p>
      <button onClick={() => window.location.href = "/services"}>Explore Services</button>
    </div>
  );
}
