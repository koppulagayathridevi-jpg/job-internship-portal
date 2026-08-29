import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/applications-page.css";

function ApplicationsPage() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // FETCH MY APPLICATIONS
    // =====================================================

    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {

                    setError(
                        "Please login to view your applications."
                    );

                    setLoading(false);

                    return;
                }


                const response = await fetch(
                    "https://job-internship-portal-o55b.onrender.com/api/applications/my",
                    {
                        method: "GET",

                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );


                const data = await response.json();


                console.log(
                    "My Applications:",
                    data
                );


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to load applications"
                    );
                }


                setApplications(
                    data.applications || []
                );


            } catch (error) {

                console.error(
                    "Applications Error:",
                    error
                );

                setError(
                    error.message ||
                    "Unable to load applications."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchApplications();

    }, []);


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        if (!status) {
            return "application-status-pending";
        }

        return `application-status-${status
            .toLowerCase()
            .replace(/\s+/g, "-")}`;

    };


    // =====================================================
    // VIEW RESUME
    // =====================================================

    const handleViewResume = (resume) => {

        if (!resume) {

            alert(
                "No resume uploaded for this application."
            );

            return;
        }


        const resumeUrl =
            `https://job-internship-portal-o55b.onrender.com/uploads/resumes/${resume}`;


        window.open(
            resumeUrl,
            "_blank",
            "noopener,noreferrer"
        );

    };


    // =====================================================
    // DOWNLOAD RESUME
    // =====================================================

    const handleDownloadResume = (
        resume,
        originalName
    ) => {

        if (!resume) {

            alert(
                "No resume uploaded for this application."
            );

            return;
        }


        const resumeUrl =
            `https://job-internship-portal-o55b.onrender.com/uploads/resumes/${resume}`;


        const link =
            document.createElement("a");


        link.href = resumeUrl;

        link.download =
            originalName || resume;

        link.target = "_blank";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="applications-page">

                <div className="applications-loading">

                    <div className="applications-loading-icon">
                        ⏳
                    </div>

                    <h2>
                        Loading Applications...
                    </h2>

                    <p>
                        Please wait while we load
                        your applications.
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="applications-page">

                <div className="applications-error">

                    <div className="applications-error-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to Load Applications
                    </h2>

                    <p>
                        {error}
                    </p>

                    <Link
                        to="/candidate-dashboard"
                        className="applications-back-button"
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            </div>

        );

    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="applications-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <header className="applications-header">

                <div>

                    <Link
                        to="/candidate-dashboard"
                        className="applications-back-link"
                    >
                        ← Dashboard
                    </Link>

                    <h1>
                        My Applications
                    </h1>

                    <p>
                        Track the jobs you have applied for.
                    </p>

                </div>


                <Link
                    to="/jobs"
                    className="applications-browse-button"
                >
                    + Browse Jobs
                </Link>

            </header>


            {/* =================================================
                APPLICATION COUNT
            ================================================= */}

            <div className="applications-summary">

                <div className="applications-summary-icon">
                    📄
                </div>

                <div>

                    <span>
                        Total Applications
                    </span>

                    <strong>
                        {applications.length}
                    </strong>

                </div>

            </div>


            {/* =================================================
                NO APPLICATIONS
            ================================================= */}

            {applications.length === 0 && (

                <div className="applications-empty">

                    <div className="applications-empty-icon">
                        📄
                    </div>

                    <h2>
                        No Applications Yet
                    </h2>

                    <p>
                        You haven't applied for any jobs yet.
                    </p>

                    <Link
                        to="/jobs"
                        className="applications-browse-button"
                    >
                        Browse Jobs
                    </Link>

                </div>

            )}


            {/* =================================================
                APPLICATION LIST
            ================================================= */}

            {applications.length > 0 && (

                <div className="applications-list">

                    {applications.map(
                        (application) => {

                            const job =
                                application.job;


                            return (

                                <div
                                    className="application-card"
                                    key={application._id}
                                >


                                    {/* JOB ICON */}

                                    <div className="application-job-icon">
                                        💼
                                    </div>


                                    {/* JOB DETAILS */}

                                    <div className="application-job-details">

                                        <h2>
                                            {job?.title ||
                                                "Job Title"}
                                        </h2>

                                        <h3>
                                            {job?.company ||
                                                "Company"}
                                        </h3>


                                        <div className="application-meta">

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

                                            <span>
                                                💼{" "}
                                                {job?.type ||
                                                    "Job Type"}
                                            </span>

                                        </div>


                                        <div className="application-date">

                                            Applied on{" "}

                                            <strong>
                                                {formatDate(
                                                    application.createdAt ||
                                                    application.appliedAt
                                                )}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* STATUS */}

                                    <div className="application-status-section">

                                        <span className="application-status-label">
                                            Application Status
                                        </span>

                                        <strong
                                            className={getStatusClass(
                                                application.status
                                            )}
                                        >
                                            {application.status ||
                                                "Pending"}
                                        </strong>

                                    </div>


                                    {/* RESUME */}

                                    <div className="application-resume-section">

                                        <span className="application-resume-label">
                                            Resume
                                        </span>


                                        {application.resume ? (

                                            <>

                                                <span className="resume-uploaded">
                                                    ✓ Uploaded
                                                </span>


                                                <div className="resume-buttons">

                                                    <button
                                                        type="button"
                                                        className="resume-view-button"
                                                        onClick={() =>
                                                            handleViewResume(
                                                                application.resume
                                                            )
                                                        }
                                                    >
                                                        👁 View
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="resume-download-button"
                                                        onClick={() =>
                                                            handleDownloadResume(
                                                                application.resume,
                                                                application.resumeOriginalName
                                                            )
                                                        }
                                                    >
                                                        ⬇ Download
                                                    </button>

                                                </div>

                                            </>

                                        ) : (

                                            <span className="resume-not-uploaded">
                                                Not uploaded
                                            </span>

                                        )}

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            )}

        </div>

    );

}

export default ApplicationsPage;