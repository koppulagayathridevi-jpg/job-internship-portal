import { Link, useParams } from "react-router-dom";
import "../styles/job-details.css";
function JobDetails() {

    const { id } = useParams();

    const jobs = [
        {
            id: "1",
            title: "Frontend Developer Intern",
            company: "ABC Technologies",
            location: "Hyderabad",
            type: "Internship",
            salary: "₹25,000 / month",
            skills: [
                "HTML",
                "CSS",
                "JavaScript",
                "React",
                "Bootstrap"
            ],
            eligibility: "B.Tech / BCA / MCA",
            experience: "Fresher",
            deadline: "30 September 2026",
            description:
                "We are looking for a motivated Frontend Developer Intern to join our development team. The candidate will work on responsive web applications and gain practical experience with modern frontend technologies.",
            responsibilities: [
                "Develop responsive web pages",
                "Build reusable React components",
                "Work with frontend developers and designers",
                "Fix UI bugs and improve website performance",
                "Write clean and maintainable code"
            ]
        },

        {
            id: "2",
            title: "Python Developer",
            company: "Tech Solutions",
            location: "Bangalore",
            type: "Full Time",
            salary: "₹4,50,000 / year",
            skills: [
                "Python",
                "Django",
                "REST API",
                "MongoDB",
                "Git"
            ],
            eligibility: "B.Tech / BCA / MCA",
            experience: "0-2 years",
            deadline: "15 October 2026",
            description:
                "We are looking for a Python Developer to build and maintain backend applications and REST APIs. The candidate will work with the development team to create scalable and reliable backend services.",
            responsibilities: [
                "Develop backend applications using Python",
                "Create and maintain REST APIs",
                "Work with databases",
                "Fix bugs and improve application performance",
                "Collaborate with frontend developers"
            ]
        },

        {
            id: "3",
            title: "Backend Developer Intern",
            company: "Startup Labs",
            location: "Remote",
            type: "Internship",
            salary: "₹20,000 / month",
            skills: [
                "Node.js",
                "Express",
                "MongoDB",
                "REST API",
                "JavaScript"
            ],
            eligibility: "B.Tech / BCA / MCA",
            experience: "Fresher",
            deadline: "20 October 2026",
            description:
                "Join our backend development team and work on real-world REST API and database projects. This internship provides practical experience in backend development and API integration.",
            responsibilities: [
                "Develop REST APIs",
                "Work with Node.js and Express",
                "Integrate MongoDB databases",
                "Test backend APIs",
                "Assist in debugging backend applications"
            ]
        },

        {
            id: "4",
            title: "React Developer",
            company: "ABC Technologies",
            location: "Hyderabad",
            type: "Full Time",
            salary: "₹5,00,000 / year",
            skills: [
                "React",
                "JavaScript",
                "HTML",
                "CSS",
                "Bootstrap"
            ],
            eligibility: "B.Tech / BCA / MCA",
            experience: "1-2 years",
            deadline: "25 October 2026",
            description:
                "ABC Technologies is looking for a React Developer to build modern and responsive web applications. The developer will work closely with designers and backend developers.",
            responsibilities: [
                "Develop React applications",
                "Create reusable UI components",
                "Integrate REST APIs",
                "Optimize application performance",
                "Maintain existing web applications"
            ]
        },

        {
            id: "5",
            title: "Python Intern",
            company: "Startup Labs",
            location: "Chennai",
            type: "Internship",
            salary: "₹18,000 / month",
            skills: [
                "Python",
                "Flask",
                "SQL",
                "Git",
                "REST API"
            ],
            eligibility: "B.Tech / BCA / MCA",
            experience: "Fresher",
            deadline: "30 October 2026",
            description:
                "Startup Labs is looking for a Python Intern who is interested in backend development and software engineering. The intern will work on real-world projects under the guidance of experienced developers.",
            responsibilities: [
                "Write Python programs",
                "Assist in backend development",
                "Work with SQL databases",
                "Develop and test APIs",
                "Participate in code reviews"
            ]
        },

        {
            id: "6",
            title: "Java Developer",
            company: "Tech Solutions",
            location: "Bangalore",
            type: "Full Time",
            salary: "₹6,00,000 / year",
            skills: [
                "Java",
                "Spring Boot",
                "MySQL",
                "REST API",
                "Git"
            ],
            eligibility: "B.Tech / BCA / MCA",
            experience: "1-3 years",
            deadline: "5 November 2026",
            description:
                "Tech Solutions is looking for a Java Developer to develop scalable enterprise applications. The candidate will work with the backend development team to build and maintain reliable software solutions.",
            responsibilities: [
                "Develop Java applications",
                "Build REST APIs using Spring Boot",
                "Work with MySQL databases",
                "Debug and optimize applications",
                "Collaborate with other developers"
            ]
        }
    ];

    const job = jobs.find((job) => job.id === id);

    if (!job) {
        return (
            <div className="container py-5 text-center">

                <h2 className="fw-bold">
                    Job Not Found
                </h2>

                <p className="text-muted">
                    The job you are looking for does not exist.
                </p>

                <Link
                    to="/jobs"
                    className="btn btn-primary"
                >
                    Back to Jobs
                </Link>

            </div>
        );
    }

    return (
    <div className="job-details-page">

        <div className="container">

            {/* =====================================================
                JOB HEADER
            ===================================================== */}

            <section className="job-details-header">

                <div className="job-header-top">

                    <div>

                        <div className="job-details-badge">
                            {job.type}
                        </div>

                        <h1>
                            {job.title}
                        </h1>

                        <h4>
                            {job.company}
                        </h4>

                    </div>

                </div>


                {/* Job Summary */}

                <div className="job-summary-grid">

                    <div className="job-summary-item">

                        <span className="job-summary-icon">
                            📍
                        </span>

                        <div>

                            <small>
                                Location
                            </small>

                            <strong>
                                {job.location}
                            </strong>

                        </div>

                    </div>


                    <div className="job-summary-item">

                        <span className="job-summary-icon">
                            💼
                        </span>

                        <div>

                            <small>
                                Job Type
                            </small>

                            <strong>
                                {job.type}
                            </strong>

                        </div>

                    </div>


                    <div className="job-summary-item">

                        <span className="job-summary-icon">
                            💰
                        </span>

                        <div>

                            <small>
                                Salary / Stipend
                            </small>

                            <strong>
                                {job.salary}
                            </strong>

                        </div>

                    </div>


                    <div className="job-summary-item">

                        <span className="job-summary-icon">
                            📅
                        </span>

                        <div>

                            <small>
                                Application Deadline
                            </small>

                            <strong>
                                {job.deadline}
                            </strong>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                MAIN CONTENT
            ===================================================== */}

            <div className="job-details-layout">


                {/* =================================================
                    LEFT CONTENT
                ================================================= */}

                <div className="job-details-main">


                    {/* DESCRIPTION */}

                    <section className="job-details-card">

                        <h2>
                            Job Description
                        </h2>

                        <div className="job-section-line"></div>

                        <p>
                            {job.description}
                        </p>

                    </section>


                    {/* RESPONSIBILITIES */}

                    <section className="job-details-card">

                        <h2>
                            Responsibilities
                        </h2>

                        <div className="job-section-line"></div>

                        <ul className="job-responsibilities">

                            {job.responsibilities.map(
                                (responsibility, index) => (

                                    <li key={index}>

                                        <span>
                                            ✓
                                        </span>

                                        {responsibility}

                                    </li>

                                )
                            )}

                        </ul>

                    </section>


                    {/* SKILLS */}

                    <section className="job-details-card">

                        <h2>
                            Skills Required
                        </h2>

                        <div className="job-section-line"></div>

                        <div className="job-skills">

                            {job.skills.map((skill) => (

                                <span key={skill}>
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </section>


                    {/* ELIGIBILITY */}

                    <section className="job-details-card">

                        <h2>
                            Eligibility & Experience
                        </h2>

                        <div className="job-section-line"></div>

                        <div className="job-eligibility">

                            <div>

                                <small>
                                    Education
                                </small>

                                <strong>
                                    {job.eligibility}
                                </strong>

                            </div>


                            <div>

                                <small>
                                    Experience
                                </small>

                                <strong>
                                    {job.experience}
                                </strong>

                            </div>

                        </div>

                    </section>

                </div>


                {/* =================================================
                    RIGHT SIDEBAR
                ================================================= */}

                <aside className="job-details-sidebar">


                    {/* APPLY CARD */}

                    <div className="job-apply-card">

                        <h3>
                            Interested in this opportunity?
                        </h3>

                        <p>
                            Apply now to submit your application
                            and take the next step in your career.
                        </p>

                        <button className="job-apply-button">
                            Apply Now
                        </button>

                    </div>


                    {/* DEADLINE CARD */}

                    <div className="job-sidebar-card">

                        <h4>
                            Application Deadline
                        </h4>

                        <div className="job-deadline">

                            <span>
                                📅
                            </span>

                            <strong>
                                {job.deadline}
                            </strong>

                        </div>

                    </div>


                    {/* JOB INFORMATION */}

                    <div className="job-sidebar-card">

                        <h4>
                            Job Information
                        </h4>

                        <div className="job-info-list">

                            <div>

                                <span>
                                    Company
                                </span>

                                <strong>
                                    {job.company}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Location
                                </span>

                                <strong>
                                    {job.location}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Job Type
                                </span>

                                <strong>
                                    {job.type}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Experience
                                </span>

                                <strong>
                                    {job.experience}
                                </strong>

                            </div>

                        </div>

                    </div>

                </aside>

            </div>


            {/* =====================================================
                BACK BUTTON
            ===================================================== */}

            <div className="job-back-wrapper">

                <Link
                    to="/jobs"
                    className="job-back-button"
                >
                    ← Back to Jobs
                </Link>

            </div>

        </div>

    </div>
);
}

export default JobDetails;