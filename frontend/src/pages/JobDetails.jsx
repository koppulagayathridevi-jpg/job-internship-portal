// import { useEffect, useState } from "react";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import "../styles/job-details.css";

// function JobDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [applying, setApplying] = useState(false);
//   const [applied, setApplied] = useState(false);
//   const [resume, setResume] = useState(null);

//   // =====================================================
//   // FETCH JOB DETAILS
//   // =====================================================

//   useEffect(() => {
//     const fetchJob = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5000/api/jobs/${id}`
//         );

//         const data = await response.json();

//         if (!response.ok) {
//           throw new Error(data.message || "Failed to fetch job");
//         }

//         setJob(data.job || data);
//       } catch (err) {
//         console.error("Job Fetch Error:", err);
//         setError("Unable to load job details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJob();
//   }, [id]);

//   // =====================================================
//   // APPLY FOR JOB
//   // =====================================================

  
  
//   const handleApply = async () => {
//     // Get logged-in candidate token
//     const token = localStorage.getItem("token");

//     // -------------------------------------------------
//     // If token doesn't exist
//     // -------------------------------------------------

//     if (!token) {
//       alert("Please login to apply for this job.");
//       navigate("/login");
//       return;
//     }

//     try {
//       setApplying(true);

//       const response = await fetch(
//         "http://localhost:5000/api/applications",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({
//             jobId: id,
//           }),
//         }
//       );

//       const data = await response.json();

//       // -------------------------------------------------
//       // Handle backend errors
//       // -------------------------------------------------

//       if (!response.ok) {
//         throw new Error(
//           data.message || "Failed to apply for this job"
//         );
//       }

//       // -------------------------------------------------
//       // Application successful
//       // -------------------------------------------------

//       setApplied(true);

//       alert("Application submitted successfully! 🎉");

//     } catch (err) {
//       console.error("Application Error:", err);

//       alert(err.message);

//     } finally {
//       setApplying(false);
//     }
//   };

//   // =====================================================
//   // LOADING
//   // =====================================================

//   if (loading) {
//     return (
//       <div className="container py-5 text-center">
//         <h2>Loading Job...</h2>
//       </div>
//     );
//   }

//   // =====================================================
//   // ERROR
//   // =====================================================

//   if (error || !job) {
//     return (
//       <div className="container py-5 text-center">
//         <h2>Job Not Found</h2>

//         <p>{error}</p>

//         <Link
//           to="/jobs"
//           className="job-back-button"
//         >
//           ← Back to Jobs
//         </Link>
//       </div>
//     );
//   }

//   // =====================================================
//   // PAGE
//   // =====================================================

//   return (
//     <div className="job-details-page">

//       <div className="container">

//         {/* =================================================
//             HEADER
//         ================================================= */}

//         <section className="job-details-header">

//           <div className="job-header-top">

//             <div>

//               <div className="job-details-badge">
//                 {job.type}
//               </div>

//               <h1>{job.title}</h1>

//               <h4>{job.company}</h4>

//             </div>

//           </div>


//           {/* JOB SUMMARY */}

//           <div className="job-summary-grid">

//             <div className="job-summary-item">

//               <span className="job-summary-icon">
//                 📍
//               </span>

//               <div>

//                 <small>Location</small>

//                 <strong>
//                   {job.location}
//                 </strong>

//               </div>

//             </div>


//             <div className="job-summary-item">

//               <span className="job-summary-icon">
//                 💼
//               </span>

//               <div>

//                 <small>Job Type</small>

//                 <strong>
//                   {job.type}
//                 </strong>

//               </div>

//             </div>


//             <div className="job-summary-item">

//               <span className="job-summary-icon">
//                 💰
//               </span>

//               <div>

//                 <small>Salary</small>

//                 <strong>
//                   {job.salary}
//                 </strong>

//               </div>

//             </div>


//             <div className="job-summary-item">

//               <span className="job-summary-icon">
//                 ⭐
//               </span>

//               <div>

//                 <small>Experience</small>

//                 <strong>
//                   {job.experience}
//                 </strong>

//               </div>

//             </div>

//           </div>

//         </section>


//         {/* =================================================
//             MAIN CONTENT
//         ================================================= */}

//         <div className="job-details-layout">


//           {/* =================================================
//               LEFT SIDE
//           ================================================= */}

//           <div className="job-details-main">


//             {/* DESCRIPTION */}

//             <section className="job-details-card">

//               <h2>
//                 Job Description
//               </h2>

//               <div className="job-section-line"></div>

//               <p>
//                 {job.description}
//               </p>

//             </section>


//             {/* REQUIREMENTS */}

//             <section className="job-details-card">

//               <h2>
//                 Requirements
//               </h2>

//               <div className="job-section-line"></div>

//               <ul className="job-responsibilities">

//                 {job.skills?.map(
//                   (skill, index) => (
//                     <li key={index}>

//                       <span>✓</span>

//                       Knowledge of {skill}

//                     </li>
//                   )
//                 )}

//               </ul>

//             </section>


//             {/* SKILLS */}

//             {job.skills && (

//               <section className="job-details-card">

//                 <h2>
//                   Skills Required
//                 </h2>

//                 <div className="job-section-line"></div>

//                 <div className="job-skills">

//                   {job.skills.map(
//                     (skill, index) => (

//                       <span key={index}>
//                         {skill}
//                       </span>

//                     )
//                   )}

//                 </div>

//               </section>

//             )}


//             {/* ELIGIBILITY */}

//             {job.eligibility && (

//               <section className="job-details-card">

//                 <h2>
//                   Eligibility
//                 </h2>

//                 <div className="job-section-line"></div>

//                 <p>
//                   {job.eligibility}
//                 </p>

//               </section>

//             )}

//           </div>


//           {/* =================================================
//               RIGHT SIDEBAR
//           ================================================= */}

//           <aside className="job-details-sidebar">


//             {/* =================================================
//                 APPLY CARD
//             ================================================= */}

//             <div className="job-apply-card">

//               <h3>
//                 Interested in this opportunity?
//               </h3>

//               <p>
//                 Apply now to submit your application
//                 and take the next step in your career.
//               </p>


//               {/* -------------------------------------------------
//                   APPLY BUTTON
//               ------------------------------------------------- */}

//               <button
//                 className="job-apply-button"
//                 onClick={handleApply}
//                 disabled={applying || applied}
//               >

//                 {applied
//                   ? "✓ Applied"
//                   : applying
//                   ? "Applying..."
//                   : "Apply Now"}

//               </button>

//             </div>


//             {/* =================================================
//                 JOB INFORMATION
//             ================================================= */}

//             <div className="job-sidebar-card">

//               <h4>
//                 Job Information
//               </h4>


//               <div className="job-info-list">


//                 <div>

//                   <span>
//                     Company
//                   </span>

//                   <strong>
//                     {job.company}
//                   </strong>

//                 </div>


//                 <div>

//                   <span>
//                     Position
//                   </span>

//                   <strong>
//                     {job.title}
//                   </strong>

//                 </div>


//                 <div>

//                   <span>
//                     Location
//                   </span>

//                   <strong>
//                     {job.location}
//                   </strong>

//                 </div>


//                 <div>

//                   <span>
//                     Job Type
//                   </span>

//                   <strong>
//                     {job.type}
//                   </strong>

//                 </div>


//                 <div>

//                   <span>
//                     Experience
//                   </span>

//                   <strong>
//                     {job.experience}
//                   </strong>

//                 </div>


//                 <div>

//                   <span>
//                     Eligibility
//                   </span>

//                   <strong>
//                     {job.eligibility}
//                   </strong>

//                 </div>


//                 <div>

//                   <span>
//                     Salary
//                   </span>

//                   <strong>
//                     {job.salary}
//                   </strong>

//                 </div>


//                 {job.deadline && (

//                   <div>

//                     <span>
//                       Deadline
//                     </span>

//                     <strong>
//                       {job.deadline}
//                     </strong>

//                   </div>

//                 )}

//               </div>

//             </div>

//           </aside>

//         </div>


//         {/* =================================================
//             BACK BUTTON
//         ================================================= */}

//         <div className="job-back-wrapper">

//           <Link
//             to="/jobs"
//             className="job-back-button"
//           >
//             ← Back to Jobs
//           </Link>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default JobDetails;

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../styles/job-details.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const [resume, setResume] = useState(null);

  // =====================================================
  // FETCH JOB DETAILS
  // =====================================================

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/jobs/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch job"
          );
        }

        setJob(data.job || data);
      } catch (err) {
        console.error("Job Fetch Error:", err);

        setError(
          err.message || "Unable to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // =====================================================
  // APPLY FOR JOB + RESUME UPLOAD
  // =====================================================

  const handleApply = async () => {
    // -------------------------------------------------
    // GET TOKEN
    // -------------------------------------------------

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to apply for this job.");
      navigate("/login");
      return;
    }

    // -------------------------------------------------
    // CREATE FILE INPUT
    // -------------------------------------------------

    const input = document.createElement("input");

    input.type = "file";

    input.accept = ".pdf,.doc,.docx";

    // -------------------------------------------------
    // WHEN USER SELECTS RESUME
    // -------------------------------------------------

    input.onchange = async (event) => {
      const selectedFile =
        event.target.files?.[0];

      // User cancelled file picker
      if (!selectedFile) {
        return;
      }

      // -------------------------------------------------
      // CHECK FILE TYPE
      // -------------------------------------------------

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        alert(
          "Please upload a PDF, DOC, or DOCX resume."
        );

        return;
      }

      // -------------------------------------------------
      // CHECK FILE SIZE
      // Maximum 5 MB
      // -------------------------------------------------

      const maxSize =
        5 * 1024 * 1024;

      if (selectedFile.size > maxSize) {
        alert(
          "Resume must be less than 5 MB."
        );

        return;
      }

      try {
        setApplying(true);

        // =================================================
        // STEP 1
        // CREATE APPLICATION
        // =================================================

        console.log(
          "Submitting application..."
        );

        const applicationResponse =
          await fetch(
            "http://localhost:5000/api/applications",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`
              },

              body: JSON.stringify({
                jobId: id
              })
            }
          );

        const applicationData =
          await applicationResponse.json();

        // -------------------------------------------------
        // APPLICATION ERROR
        // -------------------------------------------------

        if (!applicationResponse.ok) {
          throw new Error(
            applicationData.message ||
            "Failed to submit application"
          );
        }

        console.log(
          "Application created:",
          applicationData.application
        );

        // -------------------------------------------------
        // GET APPLICATION ID
        // -------------------------------------------------

        const applicationId =
          applicationData.application?._id;

        if (!applicationId) {
          throw new Error(
            "Application ID was not returned by the server."
          );
        }

        // =================================================
        // STEP 2
        // UPLOAD RESUME
        // =================================================

        console.log(
          "Uploading resume..."
        );

        const formData =
          new FormData();

        formData.append(
          "resume",
          selectedFile
        );

        const resumeResponse =
          await fetch(
            `http://localhost:5000/api/applications/${applicationId}/resume`,
            {
              method: "PATCH",

              headers: {
                Authorization:
                  `Bearer ${token}`
              },

              body: formData
            }
          );

        const resumeData =
          await resumeResponse.json();

        // -------------------------------------------------
        // RESUME UPLOAD ERROR
        // -------------------------------------------------

        if (!resumeResponse.ok) {
          throw new Error(
            resumeData.message ||
            "Failed to upload resume"
          );
        }

        // =================================================
        // SUCCESS
        // =================================================

        console.log(
          "Resume uploaded successfully:",
          resumeData
        );

        setResume(selectedFile);

        setApplied(true);

        alert(
          "Application submitted successfully! 🎉\n\nYour resume has also been uploaded."
        );

      } catch (err) {
        console.error(
          "Application Error:",
          err
        );

        alert(
          err.message ||
          "Something went wrong while applying."
        );

      } finally {
        setApplying(false);
      }
    };

    // -------------------------------------------------
    // OPEN FILE SELECTOR
    // -------------------------------------------------

    input.click();
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h2>Loading Job...</h2>
      </div>
    );
  }

  // =====================================================
  // ERROR
  // =====================================================

  if (error || !job) {
    return (
      <div className="container py-5 text-center">

        <h2>
          Job Not Found
        </h2>

        <p>
          {error}
        </p>

        <Link
          to="/jobs"
          className="job-back-button"
        >
          ← Back to Jobs
        </Link>

      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="job-details-page">

      <div className="container">

        {/* =================================================
            HEADER
        ================================================= */}

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


          {/* =================================================
              JOB SUMMARY
          ================================================= */}

          <div className="job-summary-grid">

            {/* LOCATION */}

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


            {/* JOB TYPE */}

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


            {/* SALARY */}

            <div className="job-summary-item">

              <span className="job-summary-icon">
                💰
              </span>

              <div>

                <small>
                  Salary
                </small>

                <strong>
                  {job.salary}
                </strong>

              </div>

            </div>


            {/* EXPERIENCE */}

            <div className="job-summary-item">

              <span className="job-summary-icon">
                ⭐
              </span>

              <div>

                <small>
                  Experience
                </small>

                <strong>
                  {job.experience}
                </strong>

              </div>

            </div>

          </div>

        </section>


        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="job-details-layout">


          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div className="job-details-main">


            {/* =================================================
                JOB DESCRIPTION
            ================================================= */}

            <section className="job-details-card">

              <h2>
                Job Description
              </h2>

              <div className="job-section-line"></div>

              <p>
                {job.description}
              </p>

            </section>


            {/* =================================================
                REQUIREMENTS
            ================================================= */}

            <section className="job-details-card">

              <h2>
                Requirements
              </h2>

              <div className="job-section-line"></div>

              <ul className="job-responsibilities">

                {job.skills?.map(
                  (skill, index) => (
                    <li key={index}>

                      <span>
                        ✓
                      </span>

                      Knowledge of {skill}

                    </li>
                  )
                )}

              </ul>

            </section>


            {/* =================================================
                SKILLS
            ================================================= */}

            {job.skills &&
              job.skills.length > 0 && (

                <section className="job-details-card">

                  <h2>
                    Skills Required
                  </h2>

                  <div className="job-section-line"></div>

                  <div className="job-skills">

                    {job.skills.map(
                      (skill, index) => (

                        <span key={index}>
                          {skill}
                        </span>

                      )
                    )}

                  </div>

                </section>

              )}


            {/* =================================================
                ELIGIBILITY
            ================================================= */}

            {job.eligibility && (

              <section className="job-details-card">

                <h2>
                  Eligibility
                </h2>

                <div className="job-section-line"></div>

                <p>
                  {job.eligibility}
                </p>

              </section>

            )}

          </div>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="job-details-sidebar">


            {/* =================================================
                APPLY CARD
            ================================================= */}

            <div className="job-apply-card">

              <h3>
                Interested in this opportunity?
              </h3>

              <p>
                Apply now to submit your application
                and take the next step in your career.
              </p>


              {/* =================================================
                  RESUME INFORMATION
              ================================================= */}

              {!applied && (

                <small
                  style={{
                    display: "block",
                    marginBottom: "12px",
                    color: "#666"
                  }}
                >
                  📄 Resume required
                  <br />
                  PDF, DOC or DOCX • Maximum 5 MB
                </small>

              )}


              {/* =================================================
                  SELECTED RESUME
              ================================================= */}

              {resume && (

                <div
                  style={{
                    marginBottom: "15px",
                    padding: "10px",
                    borderRadius: "8px",
                    background: "#f5f5f5"
                  }}
                >

                  <strong>
                    📄 Resume:
                  </strong>

                  <br />

                  <span>
                    {resume.name}
                  </span>

                </div>

              )}


              {/* =================================================
                  APPLY BUTTON
              ================================================= */}

              <button
                className="job-apply-button"
                onClick={handleApply}
                disabled={
                  applying ||
                  applied
                }
              >

                {applied
                  ? "✓ Applied"
                  : applying
                  ? "Uploading..."
                  : "Apply Now"}

              </button>

            </div>


            {/* =================================================
                JOB INFORMATION
            ================================================= */}

            <div className="job-sidebar-card">

              <h4>
                Job Information
              </h4>


              <div className="job-info-list">


                {/* COMPANY */}

                <div>

                  <span>
                    Company
                  </span>

                  <strong>
                    {job.company}
                  </strong>

                </div>


                {/* POSITION */}

                <div>

                  <span>
                    Position
                  </span>

                  <strong>
                    {job.title}
                  </strong>

                </div>


                {/* LOCATION */}

                <div>

                  <span>
                    Location
                  </span>

                  <strong>
                    {job.location}
                  </strong>

                </div>


                {/* JOB TYPE */}

                <div>

                  <span>
                    Job Type
                  </span>

                  <strong>
                    {job.type}
                  </strong>

                </div>


                {/* EXPERIENCE */}

                <div>

                  <span>
                    Experience
                  </span>

                  <strong>
                    {job.experience}
                  </strong>

                </div>


                {/* ELIGIBILITY */}

                <div>

                  <span>
                    Eligibility
                  </span>

                  <strong>
                    {job.eligibility}
                  </strong>

                </div>


                {/* SALARY */}

                <div>

                  <span>
                    Salary
                  </span>

                  <strong>
                    {job.salary}
                  </strong>

                </div>


                {/* DEADLINE */}

                {job.deadline && (

                  <div>

                    <span>
                      Deadline
                    </span>

                    <strong>
                      {job.deadline}
                    </strong>

                  </div>

                )}

              </div>

            </div>

          </aside>

        </div>


        {/* =================================================
            BACK BUTTON
        ================================================= */}

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