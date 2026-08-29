import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import "../styles/jobs.css";

function Jobs() {

    // =====================================================
    // JOB DATA
    // =====================================================

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // FILTER STATES
    // =====================================================

    const [search, setSearch] = useState("");

    const [location, setLocation] = useState("");

    const [type, setType] = useState("");

    const [company, setCompany] = useState("");


    // =====================================================
    // FETCH JOBS FROM BACKEND
    // =====================================================

    useEffect(() => {

        const fetchJobs = async () => {

            try {

                setLoading(true);

                setError("");

                const response = await fetch(
                    "https://job-internship-portal-055b.onrender.com/api/jobs"
                );

                const data = await response.json();

                console.log(
                    "Jobs API Response:",
                    data
                );


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Failed to fetch jobs"
                    );

                }


                setJobs(
                    Array.isArray(data.jobs)
                        ? data.jobs
                        : []
                );


            } catch (error) {

                console.error(
                    "Fetch Jobs Error:",
                    error
                );

                setError(
                    "Unable to load jobs. Please try again."
                );


            } finally {

                setLoading(false);

            }

        };


        fetchJobs();

    }, []);


    // =====================================================
    // GET UNIQUE COMPANIES FROM MONGODB JOBS
    // =====================================================

    const companies = [
        ...new Set(
            jobs
                .map((job) => job.company)
                .filter(
                    (companyName) =>
                        companyName &&
                        companyName.trim() !== ""
                )
        )
    ].sort();


    // =====================================================
    // GET UNIQUE LOCATIONS FROM MONGODB JOBS
    // =====================================================

    const locations = [
        ...new Set(
            jobs
                .map((job) => job.location)
                .filter(
                    (locationName) =>
                        locationName &&
                        locationName.trim() !== ""
                )
        )
    ].sort();


    // =====================================================
    // FILTER JOBS
    // =====================================================

    const filteredJobs = jobs.filter((job) => {

        const searchValue =
            search
                .toLowerCase()
                .trim();


        // -------------------------------------------------
        // SAFE SKILLS
        // -------------------------------------------------

        const jobSkills = Array.isArray(job.skills)
            ? job.skills.join(" ")
            : String(job.skills || "");


        // -------------------------------------------------
        // SEARCH
        // -------------------------------------------------

        const matchesSearch =
            searchValue === "" ||

            String(job.title || "")
                .toLowerCase()
                .includes(searchValue) ||

            String(job.company || "")
                .toLowerCase()
                .includes(searchValue) ||

            String(job.location || "")
                .toLowerCase()
                .includes(searchValue) ||

            jobSkills
                .toLowerCase()
                .includes(searchValue);


        // -------------------------------------------------
        // LOCATION
        // -------------------------------------------------

        const matchesLocation =
            location === "" ||
            job.location === location;


        // -------------------------------------------------
        // JOB TYPE
        // -------------------------------------------------

        const matchesType =
            type === "" ||
            job.type === type;


        // -------------------------------------------------
        // COMPANY
        // -------------------------------------------------

        const matchesCompany =
            company === "" ||
            job.company === company;


        return (
            matchesSearch &&
            matchesLocation &&
            matchesType &&
            matchesCompany
        );

    });


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const clearFilters = () => {

        setSearch("");

        setLocation("");

        setType("");

        setCompany("");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="jobs-page">

                <div className="container">

                    <div className="jobs-loading">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                        </div>

                        <p>
                            Loading jobs...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="jobs-page">

                <div className="container">

                    <div className="jobs-no-results">

                        <div className="jobs-no-results-icon">
                            ⚠️
                        </div>

                        <h5>
                            Unable to Load Jobs
                        </h5>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            className="jobs-clear-button"
                            onClick={() =>
                                window.location.reload()
                            }
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="jobs-page">

            <div className="container">


                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div className="jobs-page-header">

                    <h1>
                        Jobs & Internships
                    </h1>

                    <p>
                        Find the right job or internship
                        opportunity for your career.
                    </p>

                </div>


                {/* =================================================
                    FILTER SECTION
                ================================================= */}

                <div className="jobs-filter-card">

                    <div className="row g-3">


                        {/* =================================================
                            SEARCH
                        ================================================= */}

                        <div className="col-md-3">

                            <label className="jobs-filter-label">
                                Search
                            </label>

                            <input
                                type="text"
                                className="jobs-filter-input"
                                placeholder="Search jobs, skills..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* =================================================
                            LOCATION
                        ================================================= */}

                        <div className="col-md-3">

                            <label className="jobs-filter-label">
                                Location
                            </label>

                            <select
                                className="jobs-filter-select"
                                value={location}
                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Locations
                                </option>


                                {locations.map(
                                    (locationName) => (

                                        <option
                                            key={locationName}
                                            value={locationName}
                                        >
                                            {locationName}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* =================================================
                            JOB TYPE
                        ================================================= */}

                        <div className="col-md-3">

                            <label className="jobs-filter-label">
                                Job Type
                            </label>

                            <select
                                className="jobs-filter-select"
                                value={type}
                                onChange={(e) =>
                                    setType(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Types
                                </option>

                                <option value="Full-Time">
                                    Full Time
                                </option>

                                <option value="Part-Time">
                                    Part Time
                                </option>

                                <option value="Internship">
                                    Internship
                                </option>

                                <option value="Contract">
                                    Contract
                                </option>

                            </select>

                        </div>


                        {/* =================================================
                            COMPANY
                        ================================================= */}

                        <div className="col-md-3">

                            <label className="jobs-filter-label">
                                Company
                            </label>

                            <select
                                className="jobs-filter-select"
                                value={company}
                                onChange={(e) =>
                                    setCompany(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">
                                    All Companies
                                </option>


                                {companies.map(
                                    (companyName) => (

                                        <option
                                            key={companyName}
                                            value={companyName}
                                        >
                                            {companyName}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>

                    </div>


                    {/* =================================================
                        ACTIVE FILTERS
                    ================================================= */}

                    {(search ||
                        location ||
                        type ||
                        company) && (

                        <div className="jobs-clear-wrapper">

                            <button
                                type="button"
                                className="jobs-clear-button"
                                onClick={
                                    clearFilters
                                }
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}

                </div>


                {/* =================================================
                    RESULTS HEADER
                ================================================= */}

                <div className="jobs-results-header">

                    <h5>
                        Available Jobs
                    </h5>

                    <span className="jobs-results-count">

                        {filteredJobs.length}{" "}

                        {filteredJobs.length === 1
                            ? "job"
                            : "jobs"
                        }{" "}

                        found

                    </span>

                </div>


                {/* =================================================
                    JOB CARDS
                ================================================= */}

                {filteredJobs.length > 0 ? (

                    <div className="jobs-grid">

                        {filteredJobs.map(
                            (job) => (

                                <div
                                    key={job._id}
                                >

                                    <JobCard
                                        job={job}
                                    />

                                </div>

                            )
                        )}

                    </div>

                ) : (

                    /* =================================================
                       NO RESULTS
                    ================================================= */

                    <div className="jobs-no-results">

                        <div className="jobs-no-results-icon">
                            🔍
                        </div>

                        <h5>
                            No Jobs Found
                        </h5>

                        <p>
                            No jobs found matching
                            your current filters.
                        </p>

                        <button
                            type="button"
                            className="jobs-clear-button"
                            onClick={
                                clearFilters
                            }
                        >
                            Clear Filters
                        </button>

                    </div>

                )}

            </div>

        </div>

    );

}

export default Jobs;