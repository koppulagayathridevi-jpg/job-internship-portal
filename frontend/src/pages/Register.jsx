


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("https://job-internship-portal-055b.onrender.com/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: "candidate", // Always register as candidate
      });

      alert("Registered Successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">

        {/* LEFT SIDE */}
        <div className="register-left">
          <div className="register-left-content">
            <div className="register-illustration">👨‍💻</div>

            <h1>
              Start Your Career
              <span>Journey Today</span>
            </h1>

            <p>
              Create your account and discover jobs and internships that match
              your skills and career goals.
            </p>

            <div className="register-benefits">
              <div className="register-benefit">
                <div className="benefit-icon">✓</div>
                <div>
                  <strong>Find the Right Opportunities</strong>
                  <span>Discover jobs that match your skills.</span>
                </div>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">✓</div>
                <div>
                  <strong>Easy Job Applications</strong>
                  <span>Apply to jobs with just a few clicks.</span>
                </div>
              </div>

              <div className="register-benefit">
                <div className="benefit-icon">✓</div>
                <div>
                  <strong>Track Your Progress</strong>
                  <span>Manage applications from your dashboard.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="register-right">
          <div className="register-form-card">

            <div className="register-form-header">
              <div className="register-form-icon">✎</div>
              <h2>Create Account</h2>
              <p>Register as a Candidate</p>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>

              <div className="register-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-field">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="register-field">
                <label>Password</label>
                <div className="register-password">
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <span>◉</span>
                </div>
              </div>

              <div className="register-field">
                <label>Confirm Password</label>
                <div className="register-password">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span>◉</span>
                </div>
              </div>

              <div className="register-terms">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the Terms & Conditions
                </label>
              </div>

              <button type="submit" className="register-button">
                Create Account
              </button>

              <div className="register-login">
                <span>Already have an account?</span>
                <Link to="/login">Login here</Link>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;