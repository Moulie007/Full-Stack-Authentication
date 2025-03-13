"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
    gender: "",
  });

  const router = useRouter(); // Initialize router

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("User registered successfully!");
      router.push("/login"); // Redirect to login page
    } else {
      alert("Error signing up");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Sign Up</h2>
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

        <div className="mb-3">
          <label className="form-label">Display Name</label>
          <input 
            type="text" className="form-control" placeholder="Enter display name" required
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })} 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select 
            className="form-select" required
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
}

