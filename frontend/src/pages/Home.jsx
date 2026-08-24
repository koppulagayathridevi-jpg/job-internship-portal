import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
    return (
        <div className="home-page">

            {/* =====================================================
                HERO SECTION
            ===================================================== */}

            <section className="home-hero">

                <div className="container">

                    <div className="row align-items-center">

                        {/* LEFT CONTENT */}

                        <div className="col-lg-7">

                            <div className="home-hero-content">

                                <span className="home-hero-label">
                                    JOB & INTERNSHIP MANAGEMENT PORTAL
                                </span>

                                <h1>
                                    Find the perfect job
                                    <br />
                                    opportunity for your
                                    <span> career</span>
                                </h1>

                                <p>
                                    Explore thousands of jobs and internships
                                    from trusted companies and start your
                                    career journey today.
                                </p>

                                <div className="home-hero-buttons">

                                    {/* LOGIN FIRST */}
                                    <Link
                                        to="/login"
                                        className="home-primary-btn"
                                    >
                                        Browse Jobs
                                    </Link>

                                    {/* LOGIN FIRST */}
                                    <Link
                                        to="/login"
                                        className="home-outline-btn"
                                    >
                                        Explore Opportunities
                                    </Link>

                                </div>

                            </div>

                        </div>


                        {/* RIGHT VISUAL */}

                        <div className="col-lg-5">

                            <div className="home-hero-visual">

                                <div className="home-illustration-card">

                                    <div className="home-illustration-icon">
                                        💼
                                    </div>

                                    <div className="home-illustration-line large"></div>

                                    <div className="home-illustration-line"></div>

                                    <div className="home-illustration-line small"></div>

                                </div>


                                <div className="home-floating-card">

                                    <span className="home-floating-icon">
                                        ✓
                                    </span>

                                    <div>

                                        <strong>
                                            Career Opportunities
                                        </strong>

                                        <small>
                                            Find your next opportunity
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FEATURES SECTION
            ===================================================== */}

            <section className="home-features">

                <div className="container">

                    <div className="home-section-heading">

                        <span>
                            WHY JOBPORTAL?
                        </span>

                        <h2>
                            Everything you need to build your career
                        </h2>

                        <p>
                            Find opportunities, explore job details and
                            discover the right career path from one place.
                        </p>

                    </div>


                    <div className="row g-4">


                        {/* =================================================
                            FEATURE 1
                        ================================================= */}

                        <div className="col-md-4">

                            <div className="home-feature-card">

                                <div className="home-feature-icon">
                                    🔎
                                </div>

                                <h3>
                                    Find Opportunities
                                </h3>

                                <p>
                                    Search for jobs and internships based
                                    on your skills, interests and career goals.
                                </p>

                                {/* LOGIN FIRST */}

                                <Link
                                    to="/login"
                                    className="home-feature-link"
                                >
                                    Explore Jobs →
                                </Link>

                            </div>

                        </div>


                        {/* =================================================
                            FEATURE 2
                        ================================================= */}

                        <div className="col-md-4">

                            <div className="home-feature-card">

                                <div className="home-feature-icon">
                                    ✓
                                </div>

                                <h3>
                                    Easy Applications
                                </h3>

                                <p>
                                    Explore suitable opportunities, view
                                    complete job information and apply
                                    for the right position.
                                </p>

                                {/* LOGIN FIRST */}

                                <Link
                                    to="/login"
                                    className="home-feature-link"
                                >
                                    View Jobs →
                                </Link>

                            </div>

                        </div>


                        {/* =================================================
                            FEATURE 3
                        ================================================= */}

                        <div className="col-md-4">

                            <div className="home-feature-card">

                                <div className="home-feature-icon">
                                    📊
                                </div>

                                <h3>
                                    Track Opportunities
                                </h3>

                                <p>
                                    View available jobs and internships
                                    and check detailed information about
                                    each opportunity.
                                </p>

                                {/* LOGIN FIRST */}

                                <Link
                                    to="/login"
                                    className="home-feature-link"
                                >
                                    View Opportunities →
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CTA SECTION
            ===================================================== */}

            <section className="home-cta">

                <div className="container">

                    <div className="home-cta-box">

                        <div>

                            <h2>
                                Ready to find your next opportunity?
                            </h2>

                            <p>
                                Login to your account and start exploring
                                jobs and internships today.
                            </p>

                        </div>


                        {/* LOGIN FIRST */}

                        <Link
                            to="/login"
                            className="home-cta-button"
                        >
                            Login to Explore Jobs
                        </Link>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;