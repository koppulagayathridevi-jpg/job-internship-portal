import { Link } from "react-router-dom";
import "../styles/jobcard.css";

function JobCard({ job }) {

    return (
        <div className="job-card">

            <div className="job-card-header">

                <h3>
                    {job.title}
                </h3>

                <span className="job-type-badge">
                    {job.type}
                </span>

            </div>


            <div className="job-company">
                {job.company}
            </div>


            <div className="job-location">
                <span>📍</span>
                {job.location}
            </div>


            <div className="job-skills-preview">

                <span>⚙</span>

                {Array.isArray(job.skills)
                    ? job.skills.join(", ")
                    : job.skills
                }

            </div>


            <Link
                to={`/jobs/${job._id}`}
                className="job-view-button"
            >
                View Details
            </Link>

        </div>
    );
}

export default JobCard;