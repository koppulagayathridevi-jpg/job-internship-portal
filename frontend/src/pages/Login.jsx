import { Link } from "react-router-dom";
import "../styles/login.css";

function Login() {
    return (
        <div className="login-page">

            <div className="login-container">

                {/* =========================
                    LEFT SIDE
                ========================= */}

                <div className="login-left">

                    <div className="login-left-content">

                        <div className="login-illustration">
                            🔐
                        </div>

                        <h1>
                            Welcome
                            <span>Back!</span>
                        </h1>

                        <p>
                            Login to your JobPortal account and continue
                            exploring the right opportunities for your
                            career.
                        </p>


                        <div className="login-benefits">

                            <div className="login-benefit">

                                <div className="login-benefit-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Explore Opportunities
                                    </strong>

                                    <span>
                                        Find jobs and internships that match
                                        your skills.
                                    </span>
                                </div>

                            </div>


                            <div className="login-benefit">

                                <div className="login-benefit-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Manage Applications
                                    </strong>

                                    <span>
                                        Track your applications from one place.
                                    </span>
                                </div>

                            </div>


                            <div className="login-benefit">

                                <div className="login-benefit-icon">
                                    ✓
                                </div>

                                <div>
                                    <strong>
                                        Build Your Career
                                    </strong>

                                    <span>
                                        Take the next step toward your dream job.
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    RIGHT SIDE
                ========================= */}

                <div className="login-right">

                    <div className="login-form-card">

                        {/* Header */}

                        <div className="login-form-header">

                            <div className="login-form-icon">
                                🔑
                            </div>

                            <h2>
                                Welcome Back!
                            </h2>

                            <p>
                                Login to your JobPortal account
                            </p>

                        </div>


                        {/* Form */}

                        <form className="login-form">

                            {/* Email */}

                            <div className="login-field">

                                <label htmlFor="loginEmail">
                                    Email Address
                                </label>

                                <input
                                    id="loginEmail"
                                    type="email"
                                    placeholder="Enter your email"
                                />

                            </div>


                            {/* Password */}

                            <div className="login-field">

                                <label htmlFor="loginPassword">
                                    Password
                                </label>

                                <div className="login-password">

                                    <input
                                        id="loginPassword"
                                        type="password"
                                        placeholder="Enter your password"
                                    />

                                    <span>
                                        ◉
                                    </span>

                                </div>

                            </div>


                            {/* Remember / Forgot */}

                            <div className="login-options">

                                <label className="remember-me">

                                    <input
                                        type="checkbox"
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>


                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>

                            </div>


                            {/* Login Button */}

                            <button
                                type="submit"
                                className="login-button"
                            >
                                Login
                            </button>


                            {/* Register */}

                            <div className="login-register">

                                <span>
                                    Don't have an account?
                                </span>

                                <Link to="/register">
                                    Register here
                                </Link>

                            </div>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;