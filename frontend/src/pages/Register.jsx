import { Link } from "react-router-dom";
import "../styles/register.css";

function Register() {
    return (
        <div className="register-page">

            <div className="register-container">

                {/* =========================
                    LEFT SIDE
                ========================= */}

                <div className="register-left">

                    <div className="register-left-content">

                        <div className="register-illustration">
                            👨‍💻
                        </div>

                        <h1>
                            Start Your Career
                            <span>Journey Today</span>
                        </h1>

                        <p>
                            Create your account and discover jobs and
                            internships that match your skills and
                            career goals.
                        </p>


                        <div className="register-benefits">

                            <div className="register-benefit">

                                <div className="benefit-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Find the Right Opportunities
                                    </strong>

                                    <span>
                                        Discover jobs that match your skills.
                                    </span>
                                </div>

                            </div>


                            <div className="register-benefit">

                                <div className="benefit-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Easy Job Applications
                                    </strong>

                                    <span>
                                        Apply to jobs with just a few clicks.
                                    </span>
                                </div>

                            </div>


                            <div className="register-benefit">

                                <div className="benefit-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Track Your Progress
                                    </strong>

                                    <span>
                                        Manage applications from your dashboard.
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    RIGHT SIDE
                ========================= */}

                <div className="register-right">

                    <div className="register-form-card">

                        {/* Header */}

                        <div className="register-form-header">

                            <div className="register-form-icon">
                                ✎
                            </div>

                            <h2>
                                Create Account
                            </h2>

                            <p>
                                Register to get started with JobPortal
                            </p>

                        </div>


                        {/* Form */}

                        <form className="register-form">

                            {/* Full Name */}

                            <div className="register-field">

                                <label htmlFor="fullName">
                                    Full Name
                                </label>

                                <input
                                    id="fullName"
                                    type="text"
                                    placeholder="Enter your full name"
                                />

                            </div>


                            {/* Email */}

                            <div className="register-field">

                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                />

                            </div>


                            {/* Password */}

                            <div className="register-field">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div className="register-password">

                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="Create a password"
                                    />

                                    <span>
                                        ◉
                                    </span>

                                </div>

                            </div>


                            {/* Confirm Password */}

                            <div className="register-field">

                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>

                                <div className="register-password">

                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                    />

                                    <span>
                                        ◉
                                    </span>

                                </div>

                            </div>


                            {/* Terms */}

                            <div className="register-terms">

                                <input
                                    type="checkbox"
                                    id="terms"
                                />

                                <label htmlFor="terms">
                                    I agree to the Terms & Conditions
                                </label>

                            </div>


                            {/* Register Button */}

                            <button
                                type="submit"
                                className="register-button"
                            >
                                Create Account
                            </button>


                            {/* Login */}

                            <div className="register-login">

                                <span>
                                    Already have an account?
                                </span>

                                <Link to="/login">
                                    Login here
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;