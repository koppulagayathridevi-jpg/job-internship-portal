import { Link } from "react-router-dom";
import "../styles/jobcard.css";

function JobCard({ job }) {

    return (
        <div className="job-card">

            {/* Header */}

            <div className="job-card-header">

                <h3>
                    {job.title}
                </h3>

                <span className="job-type-badge">
                    {job.type}
                </span>

            </div>


            {/* Company */}

            <div className="job-company">
                {job.company}
            </div>


            {/* Location */}

            <div className="job-location">
                <span>📍</span>
                {job.location}
            </div>


            {/* Skills */}

            <div className="job-skills-preview">
                <span>⚙</span>
                {job.skills}
            </div>


            {/* Button */}

            <Link
                to={`/jobs/${job.id}`}
                className="job-view-button"
            >
                View Details
            </Link>

        </div>
    );
}

export default JobCard;