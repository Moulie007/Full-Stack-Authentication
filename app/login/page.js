"use client";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Import Bootstrap

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Login successful! Welcome " + data.displayName);
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="container mt-5">
    <h1>Login<h1>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input 
            type="text" className="form-control" placeholder="Enter username" required
            onChange={(e) => setFormData({ ...formData, username: e.target.value })} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" className="form-control" placeholder="Enter password" required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>

        {/* Sign Up Link */}
        <p className="mt-3 text-center">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
