import React, { useState } from "react";
import "./FundDetailsPopup.css";
import flower from "../assets/flower.jpg";

export default function FundDetailsPopup({ balance, onBack }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <div className="popup-header">
          <span className="back-button" onClick={onBack}>
            &lt; Back to dashboard
          </span>
        </div>

        <div className="popup-top">
          <img src={flower} alt="KiwiSaver" className="popup-image" />
          <div className="popup-title">
            <h2>KiwiSaver</h2>
            <p className="popup-subtext">02-0500-0000000-000</p>
          </div>
          <div className="popup-amount">
            <h2>₹{balance.toFixed(2)}</h2>
            <p className="popup-balance-label">Net balance</p>
          </div>
        </div>

        <div className="popup-content">
          <div className="transaction-card">
            <div className="transactions-placeholder">
              Transactions Placeholder
            </div>
          </div>

          <div className="fund-card">
            <div className="fund-section-header" onClick={() => setIsExpanded(!isExpanded)}>
              <span>Fund details</span>
              <span className="arrow">{isExpanded ? "▲" : "▼"}</span>
            </div>

            {isExpanded && (
              <div className="fund-details">
                <p><strong>PIE tax accrual:</strong> 28.10</p>
                <p><strong>Balance date:</strong> 15 March 2025</p>
                <p><strong>Fund Type:</strong> Growth Fund</p>
                <p><strong>Units:</strong> 14156.7599347</p>
                <p><strong>Tax amount:</strong> -$2,000.00</p>
                <button className="change-btn">Change Fund</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
