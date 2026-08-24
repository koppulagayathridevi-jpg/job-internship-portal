import { Link, useNavigate } from "react-router-dom";
import "../styles/candidate-dashboard.css";

function CandidateDashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <div className="candidate-dashboard">

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <aside className="candidate-sidebar">

                {/* BRAND */}

                <div className="candidate-sidebar-brand">

                    <div className="candidate-brand-icon">
                        💼
                    </div>

                    <div>
                        <h3>JobPortal</h3>

                        <span>
                            Job & Internship Portal
                        </span>
                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="candidate-sidebar-nav">

                    <Link
                        to="/candidate-dashboard"
                        className="candidate-nav-item active"
                    >
                        <span className="candidate-nav-icon">
                            ▦
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </Link>


                    <Link
                        to="/applications"
                        className="candidate-nav-item"
                    >
                        <span className="candidate-nav-icon">
                            ▤
                        </span>

                        <span>
                            My Applications
                        </span>
                    </Link>


                    <Link
                        to="/saved-jobs"
                        className="candidate-nav-item"
                    >
                        <span className="candidate-nav-icon">
                            ♡
                        </span>

                        <span>
                            Saved Jobs
                        </span>
                    </Link>


                    <Link
                        to="/profile"
                        className="candidate-nav-item"
                    >
                        <span className="candidate-nav-icon">
                            ♙
                        </span>

                        <span>
                            Profile
                        </span>
                    </Link>


                    <Link
                        to="/change-password"
                        className="candidate-nav-item"
                    >
                        <span className="candidate-nav-icon">
                            ◉
                        </span>

                        <span>
                            Change Password
                        </span>
                    </Link>

                </nav>


                {/* LOGOUT */}

                <div className="candidate-sidebar-bottom">

                    <button
                        onClick={handleLogout}
                        className="candidate-nav-item logout"
                    >

                        <span className="candidate-nav-icon">
                            ←
                        </span>

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>


            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <main className="candidate-main">


                {/* =================================================
                    TOP BAR
                ================================================= */}

                <header className="candidate-topbar">

                    <div>

                        <h1>
                            Welcome to JobPortal 👋
                        </h1>

                        <p>
                            Start your career journey by completing your
                            profile and exploring job opportunities.
                        </p>

                    </div>


                    {/* PROFILE */}

                    <Link
                        to="/profile"
                        className="candidate-profile"
                    >

                        <div className="candidate-avatar">
                            U
                        </div>

                        <div className="candidate-profile-info">

                            <strong>
                                New User
                            </strong>

                            <span>
                                Candidate
                            </span>

                        </div>

                        <span className="candidate-profile-arrow">
                            ▼
                        </span>

                    </Link>

                </header>



                {/* =================================================
                    WELCOME CARD
                ================================================= */}

                <section className="candidate-welcome-card">

                    <div className="candidate-welcome-content">

                        <span className="candidate-welcome-label">
                            GET STARTED
                        </span>

                        <h2>
                            Build your profile and find your dream job
                        </h2>

                        <p>
                            Complete your profile to get personalized
                            job recommendations and increase your chances
                            of finding the right opportunity.
                        </p>

                        <div className="candidate-welcome-buttons">

                            <Link
                                to="/profile"
                                className="candidate-primary-button"
                            >
                                Complete Profile
                            </Link>

                            <Link
                                to="/jobs"
                                className="candidate-secondary-button"
                            >
                                Browse Jobs
                            </Link>

                        </div>

                    </div>


                    <div className="candidate-welcome-icon">
                        🚀
                    </div>

                </section>



                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="candidate-stat-grid">


                    {/* APPLICATIONS */}

                    <div className="candidate-stat-card blue">

                        <div className="candidate-stat-icon">
                            📄
                        </div>

                        <div className="candidate-stat-content">

                            <strong>
                                0
                            </strong>

                            <span>
                                Applications
                            </span>

                        </div>

                    </div>



                    {/* SHORTLISTED */}

                    <div className="candidate-stat-card green">

                        <div className="candidate-stat-icon">
                            ✓
                        </div>

                        <div className="candidate-stat-content">

                            <strong>
                                0
                            </strong>

                            <span>
                                Shortlisted
                            </span>

                        </div>

                    </div>



                    {/* INTERVIEWS */}

                    <div className="candidate-stat-card orange">

                        <div className="candidate-stat-icon">
                            👥
                        </div>

                        <div className="candidate-stat-content">

                            <strong>
                                0
                            </strong>

                            <span>
                                Interviews
                            </span>

                        </div>

                    </div>



                    {/* OFFERS */}

                    <div className="candidate-stat-card purple">

                        <div className="candidate-stat-icon">
                            ★
                        </div>

                        <div className="candidate-stat-content">

                            <strong>
                                0
                            </strong>

                            <span>
                                Offers
                            </span>

                        </div>

                    </div>

                </section>



                {/* =================================================
                    MAIN CONTENT GRID
                ================================================= */}

                <section className="candidate-content-grid">


                    {/* =================================================
                        RECENT APPLICATIONS
                    ================================================= */}

                    <div className="candidate-panel applications-panel">

                        <div className="candidate-panel-header">

                            <div>

                                <h2>
                                    Recent Applications
                                </h2>

                                <p>
                                    Track your job applications here
                                </p>

                            </div>

                        </div>


                        {/* EMPTY APPLICATION STATE */}

                        <div className="candidate-empty-state">

                            <div className="candidate-empty-icon">
                                📄
                            </div>

                            <h3>
                                No applications yet
                            </h3>

                            <p>
                                You haven't applied for any jobs yet.
                                Explore available opportunities and
                                start applying today.
                            </p>

                            <Link
                                to="/jobs"
                                className="candidate-primary-button"
                            >
                                Browse Jobs
                            </Link>

                        </div>

                    </div>



                    {/* =================================================
                        PROFILE CARD
                    ================================================= */}

                    <div className="candidate-panel profile-panel">

                        <div className="candidate-panel-header">

                            <div>

                                <h2>
                                    My Profile
                                </h2>

                                <p>
                                    Complete your profile
                                </p>

                            </div>

                        </div>


                        <div className="candidate-profile-card">

                            <div className="candidate-large-avatar">
                                U
                            </div>

                            <h3>
                                New User
                            </h3>

                            <p>
                                Complete your profile
                            </p>


                            {/* PROFILE COMPLETION */}

                            <div className="candidate-profile-progress">

                                <div className="candidate-progress-header">

                                    <span>
                                        Profile Completion
                                    </span>

                                    <strong>
                                        20%
                                    </strong>

                                </div>

                                <div className="candidate-progress-bar">

                                    <div
                                        className="candidate-progress-fill"
                                        style={{ width: "20%" }}
                                    ></div>

                                </div>

                            </div>


                            {/* PROFILE INFORMATION */}

                            <div className="candidate-profile-info-list">

                                <div>

                                    <strong>
                                        Email
                                    </strong>

                                    <span>
                                        Add your email
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Education
                                    </strong>

                                    <span>
                                        Add your education
                                    </span>

                                </div>


                                <div>

                                    <strong>
                                        Skills
                                    </strong>

                                    <span>
                                        Add your skills
                                    </span>

                                </div>

                            </div>


                            <Link
                                to="/profile"
                                className="candidate-primary-button"
                            >
                                Complete Profile
                            </Link>

                        </div>

                    </div>

                </section>



                {/* =================================================
                    RECOMMENDED JOBS
                ================================================= */}

                <section className="candidate-recommended">

                    <div className="candidate-section-heading">

                        <div>

                            <h2>
                                Recommended Jobs
                            </h2>

                            <p>
                                Start exploring opportunities that match
                                your career interests.
                            </p>

                        </div>


                        <Link to="/jobs">
                            View All Jobs →
                        </Link>

                    </div>



                    {/* JOB GRID */}

                    <div className="candidate-job-grid">


                        {/* JOB 1 */}

                        <div className="candidate-job-card">

                            <span className="candidate-job-badge">
                                Internship
                            </span>

                            <h3>
                                Frontend Developer Intern
                            </h3>

                            <h4>
                                ABC Technologies
                            </h4>

                            <p>
                                📍 Hyderabad
                            </p>

                            <div className="candidate-job-footer">

                                <span>
                                    ₹25,000 / month
                                </span>

                                <Link to="/jobs">
                                    View Jobs
                                </Link>

                            </div>

                        </div>



                        {/* JOB 2 */}

                        <div className="candidate-job-card">

                            <span className="candidate-job-badge fulltime">
                                Full Time
                            </span>

                            <h3>
                                Python Developer
                            </h3>

                            <h4>
                                Tech Solutions
                            </h4>

                            <p>
                                📍 Bangalore
                            </p>

                            <div className="candidate-job-footer">

                                <span>
                                    ₹4,50,000 / year
                                </span>

                                <Link to="/jobs">
                                    View Jobs
                                </Link>

                            </div>

                        </div>



                        {/* JOB 3 */}

                        <div className="candidate-job-card">

                            <span className="candidate-job-badge remote">
                                Remote
                            </span>

                            <h3>
                                Backend Developer Intern
                            </h3>

                            <h4>
                                Startup Labs
                            </h4>

                            <p>
                                📍 Remote
                            </p>

                            <div className="candidate-job-footer">

                                <span>
                                    ₹20,000 / month
                                </span>

                                <Link to="/jobs">
                                    View Jobs
                                </Link>

                            </div>

                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default CandidateDashboard;