import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
    return (
        <nav className="job-navbar">

            <div className="job-navbar-container">

                {/* Logo */}
                <Link to="/" className="job-navbar-brand">

                    <span className="job-navbar-logo">
                        💼
                    </span>

                    <span>JobPortal</span>

                </Link>


                {/* Mobile Toggle */}
                <button
                    className="job-navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#jobNavbarMenu"
                    aria-controls="jobNavbarMenu"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>


                {/* Navigation */}
                <div
                    className="job-navbar-menu collapse"
                    id="jobNavbarMenu"
                >

                    <ul className="job-navbar-links">

                        <li>
                            <Link to="/" className="job-nav-link">
                                Home
                            </Link>
                        </li>

                        
                        <li>
                            <Link to="/login" className="job-nav-link">
                                Login
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/register"
                                className="job-nav-register"
                            >
                                Register
                            </Link>
                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;