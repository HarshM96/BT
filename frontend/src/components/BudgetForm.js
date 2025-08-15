import React, { useState } from "react";
import axios from "axios";
import "./BudgetForm.css";

function BudgetForm({ username, onSignOut }) {
  const [month, setMonth] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:8000/add_budget", {
        username,
        month,
        income,
        expenses,
      });
      alert("Budget saved!");
      setMonth("");
      setIncome("");
      setExpenses("");
    } catch (error) {
      alert("Error saving budget");
    }
  };

return (
  <div className="budget-page">
    {/* Header */}
    <header className="top-nav">
      <div className="logo">
        <img src="https://img.icons8.com/fluency/48/money.png" alt="logo" />
        <span>Budget Tracker</span>
      </div>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <button onClick={onSignOut} className="signout-link">SignOut</button>
      </nav>
    </header>

    {/* Hero Section */}
    <section className="hero">
      <h1>Track Your Expenses & Income Effortlessly</h1>
      <p>
        Start budgeting the smart way. Stay on top of your finances and achieve your financial goals.
      </p>
    </section>

    {/* Form Section */}
    <main className="form-wrapper">
  <div className="budget-form-card">
    <div className="input-row">
      <div className="input-tile">
        <span>📅 Month</span>
        <input
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="e.g. Jan25"
        />
      </div>

      <div className="input-tile">
        <span>💰 Income</span>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="e.g. 5000"
        />
      </div>

      <div className="input-tile">
        <span>💸 Expenses</span>
        <input
          type="number"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          placeholder="e.g. 2000"
        />
      </div>
    </div>

    {/* Save button moved inside card */}
    <button className="save-btn" onClick={handleSubmit}>Save</button>
  </div>
</main>


    {/* About Image Section */}
    <section className="about-image-section">
      <img
        src="/assets/about.jpeg" // put image in public/assets folder
        alt="About Budget Tracker"
      />
    </section>

    {/* Footer */}
    <footer className="footer">
      <p>© {new Date().getFullYear()} Budget Tracker. All rights reserved.</p>
      <div className="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
      </div>
      <div className="developer-credit">
        Developed and Hosted by: <br /> Harsh Mishra
      </div>
    </footer>
  </div>
);
}

export default BudgetForm;
