import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/candidate-dashboard.css";

function CandidateDashboard() {
    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [applications, setApplications] = useState([]);
    const [applicationsLoading, setApplicationsLoading] = useState(true);
    const [applicationsError, setApplicationsError] = useState("");


    // =====================================================
    // FETCH CANDIDATE APPLICATIONS
    // =====================================================

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");

                // ---------------------------------------------
                // TOKEN CHECK
                // ---------------------------------------------

                if (!token) {
                    setApplicationsError(
                        "Please login to view your applications."
                    );

                    setApplicationsLoading(false);

                    return;
                }


                // ---------------------------------------------
                // API REQUEST
                // ---------------------------------------------

                const response = await fetch(
                    "https://job-internship-portal-055b.onrender.com/api/applications/my",
                    {
                        method: "GET",

                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );


                // ---------------------------------------------
                // RESPONSE
                // ---------------------------------------------

                const data = await response.json();

                console.log(
                    "Candidate Applications:",
                    data
                );


                // ---------------------------------------------
                // ERROR RESPONSE
                // ---------------------------------------------

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to fetch applications"
                    );
                }


                // ---------------------------------------------
                // SAVE APPLICATIONS
                // ---------------------------------------------

                setApplications(
                    Array.isArray(data.applications)
                        ? data.applications
                        : []
                );

            } catch (error) {

                console.error(
                    "Candidate Applications Error:",
                    error
                );

                setApplicationsError(
                    error.message ||
                    "Unable to load applications."
                );

            } finally {

                setApplicationsLoading(false);
            }
        };


        fetchApplications();

    }, []);


    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("isLoggedIn");

        localStorage.removeItem("user");

        navigate("/login");
    };


    // =====================================================
    // APPLICATION STATISTICS
    // =====================================================

    const totalApplications =
        applications.length;


    const pendingApplications =
        applications.filter(
            (application) =>
                application.status?.toLowerCase() ===
                "pending"
        ).length;


    const shortlistedApplications =
        applications.filter(
            (application) =>
                application.status?.toLowerCase() ===
                "shortlisted"
        ).length;


    const acceptedApplications =
        applications.filter(
            (application) =>
                application.status?.toLowerCase() ===
                "accepted"
        ).length;


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        if (!status) {
            return "candidate-status-pending";
        }


        return `candidate-status-${status
            .toLowerCase()
            .replace(/\s+/g, "-")}`;
    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }


        const formattedDate =
            new Date(date);


        if (isNaN(formattedDate.getTime())) {
            return "N/A";
        }


        return formattedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="candidate-dashboard">


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="candidate-sidebar">


                {/* =================================================
                    BRAND
                ================================================= */}

                <div className="candidate-sidebar-brand">

                    <div className="candidate-brand-icon">
                        💼
                    </div>


                    <div>

                        <h3>
                            JobPortal
                        </h3>

                        <span>
                            Candidate
                        </span>

                    </div>

                </div>



                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <nav className="candidate-sidebar-nav">


                    {/* DASHBOARD */}

                    <Link
                        to="/candidate-dashboard"
                        className="candidate-nav-item active"
                    >

                        <span className="candidate-nav-icon">
                            🏠
                        </span>

                        Dashboard

                    </Link>



                    {/* BROWSE JOBS */}

                    <Link
                        to="/jobs"
                        className="candidate-nav-item"
                    >

                        <span className="candidate-nav-icon">
                            💼
                        </span>

                        Browse Jobs

                    </Link>



                    {/* MY APPLICATIONS */}

                    <Link
                        to="/applications"
                        className="candidate-nav-item"
                    >

                        <span className="candidate-nav-icon">
                            📄
                        </span>

                        My Applications

                    </Link>



                    {/* PROFILE */}

                    <Link
                        to="/profile"
                        className="candidate-nav-item"
                    >

                        <span className="candidate-nav-icon">
                            👤
                        </span>

                        My Profile

                    </Link>


                </nav>



                {/* =================================================
                    SIDEBAR BOTTOM
                ================================================= */}

                <div className="candidate-sidebar-bottom">

                    <button
                        className="candidate-logout-button"
                        onClick={handleLogout}
                    >

                        <span>
                            🚪
                        </span>

                        Logout

                    </button>

                </div>


            </aside>



            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <main className="candidate-main-content">


                {/* =================================================
                    TOP BAR
                ================================================= */}

                <header className="candidate-topbar">


                    <div>

                        <h1>
                            Candidate Dashboard
                        </h1>


                        <p>
                            Track your job applications
                            and discover new opportunities.
                        </p>

                    </div>



                    <div className="candidate-topbar-actions">

                        <Link
                            to="/jobs"
                            className="candidate-primary-button"
                        >

                            + Browse Jobs

                        </Link>

                    </div>


                </header>



                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="candidate-stats-grid">


                    {/* =================================================
                        TOTAL APPLICATIONS
                    ================================================= */}

                    <div className="candidate-stat-card">


                        <div className="candidate-stat-icon applications">

                            📄

                        </div>


                        <div className="candidate-stat-info">

                            <span>
                                Applications
                            </span>


                            <strong>

                                {applicationsLoading
                                    ? "..."
                                    : totalApplications}

                            </strong>

                        </div>


                    </div>



                    {/* =================================================
                        PENDING
                    ================================================= */}

                    <div className="candidate-stat-card">


                        <div className="candidate-stat-icon pending">

                            ⏳

                        </div>


                        <div className="candidate-stat-info">

                            <span>
                                Pending
                            </span>


                            <strong>

                                {applicationsLoading
                                    ? "..."
                                    : pendingApplications}

                            </strong>

                        </div>


                    </div>



                    {/* =================================================
                        SHORTLISTED
                    ================================================= */}

                    <div className="candidate-stat-card">


                        <div className="candidate-stat-icon shortlisted">

                            ✓

                        </div>


                        <div className="candidate-stat-info">

                            <span>
                                Shortlisted
                            </span>


                            <strong>

                                {applicationsLoading
                                    ? "..."
                                    : shortlistedApplications}

                            </strong>

                        </div>


                    </div>



                    {/* =================================================
                        ACCEPTED
                    ================================================= */}

                    <div className="candidate-stat-card">


                        <div className="candidate-stat-icon offers">

                            ⭐

                        </div>


                        <div className="candidate-stat-info">

                            <span>
                                Accepted
                            </span>


                            <strong>

                                {applicationsLoading
                                    ? "..."
                                    : acceptedApplications}

                            </strong>

                        </div>


                    </div>


                </section>



                {/* =================================================
                    QUICK ACTIONS
                ================================================= */}

                <section className="candidate-quick-actions">


                    <div className="candidate-section-header">


                        <div>

                            <h2>
                                Quick Actions
                            </h2>


                            <p>
                                Manage your job search quickly.
                            </p>

                        </div>


                    </div>



                    <div className="candidate-actions-grid">


                        {/* =================================================
                            BROWSE JOBS
                        ================================================= */}

                        <Link
                            to="/jobs"
                            className="candidate-action-card"
                        >


                            <div className="candidate-action-icon">

                                🔍

                            </div>


                            <div>

                                <h3>
                                    Browse Jobs
                                </h3>


                                <p>
                                    Find your next opportunity.
                                </p>

                            </div>


                        </Link>



                        {/* =================================================
                            MY APPLICATIONS
                        ================================================= */}

                        <Link
                            to="/applications"
                            className="candidate-action-card"
                        >


                            <div className="candidate-action-icon">

                                📄

                            </div>


                            <div>

                                <h3>
                                    My Applications
                                </h3>


                                <p>
                                    Track your applications.
                                </p>

                            </div>


                        </Link>



                        {/* =================================================
                            PROFILE
                        ================================================= */}

                        <Link
                            to="/profile"
                            className="candidate-action-card"
                        >


                            <div className="candidate-action-icon">

                                👤

                            </div>


                            <div>

                                <h3>
                                    My Profile
                                </h3>


                                <p>
                                    Update your information.
                                </p>

                            </div>


                        </Link>


                    </div>


                </section>



                {/* =================================================
                    RECENT APPLICATIONS
                ================================================= */}

                <section className="candidate-applications-section">


                    {/* =================================================
                        SECTION HEADER
                    ================================================= */}

                    <div className="candidate-section-header">


                        <div>

                            <h2>
                                Recent Applications
                            </h2>


                            <p>
                                Your latest job applications.
                            </p>

                        </div>



                        {applications.length > 0 && (

                            <Link
                                to="/applications"
                                className="candidate-view-all"
                            >

                                View All →

                            </Link>

                        )}


                    </div>



                    {/* =================================================
                        LOADING
                    ================================================= */}

                    {applicationsLoading && (

                        <div className="candidate-empty-state">


                            <div className="candidate-empty-icon">

                                ⏳

                            </div>


                            <h3>
                                Loading applications...
                            </h3>


                            <p>
                                Please wait while we load
                                your applications.
                            </p>


                        </div>

                    )}



                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {!applicationsLoading &&
                        applicationsError && (

                            <div className="candidate-empty-state">


                                <div className="candidate-empty-icon">

                                    ⚠️

                                </div>


                                <h3>
                                    Unable to load applications
                                </h3>


                                <p>
                                    {applicationsError}
                                </p>


                                <button
                                    type="button"
                                    className="candidate-primary-button"
                                    onClick={() =>
                                        window.location.reload()
                                    }
                                >

                                    Try Again

                                </button>


                            </div>

                        )}



                    {/* =================================================
                        NO APPLICATIONS
                    ================================================= */}

                    {!applicationsLoading &&
                        !applicationsError &&
                        applications.length === 0 && (

                            <div className="candidate-empty-state">


                                <div className="candidate-empty-icon">

                                    📄

                                </div>


                                <h3>
                                    No applications yet
                                </h3>


                                <p>
                                    You haven't applied for any
                                    jobs yet. Explore available
                                    opportunities and start
                                    applying today.
                                </p>


                                <Link
                                    to="/jobs"
                                    className="candidate-primary-button"
                                >

                                    Browse Jobs

                                </Link>


                            </div>

                        )}



                    {/* =================================================
                        APPLICATIONS
                    ================================================= */}

                    {!applicationsLoading &&
                        !applicationsError &&
                        applications.length > 0 && (

                            <div className="candidate-applications-list">


                                {applications
                                    .slice(0, 5)
                                    .map((application) => {

                                        const job =
                                            application.job;


                                        return (

                                            <div
                                                className="candidate-application-card"
                                                key={
                                                    application._id
                                                }
                                            >


                                                {/* =================================================
                                                    JOB ICON
                                                ================================================= */}

                                                <div className="candidate-application-icon">

                                                    💼

                                                </div>



                                                {/* =================================================
                                                    JOB INFORMATION
                                                ================================================= */}

                                                <div className="candidate-application-info">


                                                    <h3>

                                                        {job?.title ||
                                                            "Job Title"}

                                                    </h3>


                                                    <p>

                                                        {job?.company ||
                                                            "Company"}

                                                    </p>


                                                    <div className="candidate-application-meta">


                                                        <span>

                                                            📍{" "}

                                                            {job?.location ||
                                                                "Location"}

                                                        </span>


                                                        <span>

                                                            💰{" "}

                                                            {job?.salary ||
                                                                "Salary not specified"}

                                                        </span>


                                                    </div>


                                                </div>



                                                {/* =================================================
                                                    APPLICATION STATUS
                                                ================================================= */}

                                                <div className="candidate-application-status">


                                                    <span>
                                                        Status
                                                    </span>


                                                    <strong
                                                        className={getStatusClass(
                                                            application.status
                                                        )}
                                                    >

                                                        {application.status ||
                                                            "Pending"}

                                                    </strong>


                                                    <small>

                                                        Applied on{" "}

                                                        {formatDate(
                                                            application.appliedAt ||
                                                            application.createdAt
                                                        )}

                                                    </small>


                                                </div>


                                            </div>

                                        );

                                    })}



                                {/* =================================================
                                    VIEW ALL BUTTON
                                ================================================= */}

                                <div className="candidate-applications-footer">


                                    <Link
                                        to="/applications"
                                        className="candidate-primary-button"
                                    >

                                        View All Applications →

                                    </Link>


                                </div>


                            </div>

                        )}


                </section>



                {/* =================================================
                    JOB SEARCH CTA
                ================================================= */}

                <section className="candidate-dashboard-cta">


                    <div>


                        <h2>
                            Looking for your next opportunity?
                        </h2>


                        <p>
                            Explore the latest jobs and find
                            the perfect opportunity for your career.
                        </p>


                    </div>



                    <Link
                        to="/jobs"
                        className="candidate-primary-button"
                    >

                        Explore Jobs →

                    </Link>


                </section>


            </main>


        </div>
    );
}


export default CandidateDashboard;