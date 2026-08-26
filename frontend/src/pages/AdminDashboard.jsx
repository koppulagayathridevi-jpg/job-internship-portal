import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin-dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [page, setPage] = useState("dashboard");

  // =====================================================
  // COMPANIES
  // =====================================================

  const [companies, setCompanies] = useState([
    {
      id: 1,
      name: "TCS",
      email: "hr@tcs.com",
      location: "Mumbai",
    },
    {
      id: 2,
      name: "Infosys",
      email: "hr@infosys.com",
      location: "Bangalore",
    },
  ]);

  const [company, setCompany] = useState({
    name: "",
    email: "",
    location: "",
  });

  const addCompany = () => {
    setCompanies([
      ...companies,
      {
        id: Date.now(),
        ...company,
      },
    ]);

    setCompany({
      name: "",
      email: "",
      location: "",
    });
  };

  const deleteCompany = (id) => {
    setCompanies(
      companies.filter((c) => c.id !== id)
    );
  };


  // =====================================================
  // JOBS
  // =====================================================

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      company: "TCS",
      salary: "6 LPA",
    },
  ]);

  const [job, setJob] = useState({
    title: "",
    company: "",
    salary: "",
  });

  const addJob = () => {
    setJobs([
      ...jobs,
      {
        id: Date.now(),
        ...job,
      },
    ]);

    setJob({
      title: "",
      company: "",
      salary: "",
    });
  };

  const deleteJob = (id) => {
    setJobs(
      jobs.filter((j) => j.id !== id)
    );
  };


  // =====================================================
  // APPLICATIONS
  // =====================================================

  const [applications, setApplications] = useState([]);

  const [applicationsLoading, setApplicationsLoading] =
    useState(false);

  const [applicationsError, setApplicationsError] =
    useState("");


  // =====================================================
  // FETCH APPLICATIONS FROM BACKEND
  // =====================================================

  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true);
      setApplicationsError("");

      // Your login stores JWT as "token"
      const token = localStorage.getItem("token");

      console.log("Admin token:", token);

      if (!token) {
        setApplicationsError(
          "Admin login token not found."
        );
        return;
      }


      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      const data = await response.json();

      console.log(
        "Applications API Response:",
        data
      );


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch applications"
        );
      }


      // Backend returns:
      //
      // {
      //   success: true,
      //   applications: [...]
      // }

      setApplications(
        data.applications || []
      );

    } catch (error) {

      console.error(
        "Applications Fetch Error:",
        error
      );

      setApplicationsError(
        error.message
      );

    } finally {

      setApplicationsLoading(false);

    }
  };


  // =====================================================
  // FETCH APPLICATIONS WHEN APPLICATION PAGE OPENS
  // =====================================================

  useEffect(() => {

    if (page === "applications") {
      fetchApplications();
    }

  }, [page]);


  // =====================================================
  // UPDATE APPLICATION STATUS
  // =====================================================

  const updateStatus = (id, status) => {

    setApplications(
      applications.map((application) =>
        application._id === id
          ? {
              ...application,
              status: status,
            }
          : application
      )
    );

  };


  // =====================================================
  // DELETE APPLICATION
  // =====================================================

  const deleteApplication = (id) => {

    setApplications(
      applications.filter(
        (application) =>
          application._id !== id
      )
    );

  };


  // =====================================================
  // USERS
  // =====================================================

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin",
      email: "admin@gmail.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Nitin",
      email: "nitin@gmail.com",
      role: "Candidate",
    },
  ]);

  const deleteUser = (id) => {
    setUsers(
      users.filter((u) => u.id !== id)
    );
  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="admin-dashboard">


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="sidebar">

        <div className="logo">

          <h2>
            💼 JobPortal
          </h2>

          <p>
            Admin Panel
          </p>

        </div>


        <button
          onClick={() =>
            setPage("dashboard")
          }
        >
          Dashboard
        </button>


        <button
          onClick={() =>
            setPage("companies")
          }
        >
          Companies
        </button>


        <button
          onClick={() =>
            setPage("jobs")
          }
        >
          Jobs
        </button>


        <button
          onClick={() =>
            setPage("applications")
          }
        >
          Applications
        </button>


        <button
          onClick={() =>
            setPage("users")
          }
        >
          Users
        </button>


        <button
          className="logout"
          onClick={logout}
        >
          Logout
        </button>

      </aside>


      {/* =================================================
          MAIN
      ================================================= */}

      <main className="main">


        {/* TOPBAR */}

        <div className="topbar">

          <h1>
            Admin Dashboard
          </h1>

          <div className="admin">
            👤 Admin
          </div>

        </div>


        {/* =================================================
            DASHBOARD
        ================================================= */}

        {page === "dashboard" && (

          <div className="cards">


            <div className="card blue">

              <h2>
                {companies.length}
              </h2>

              <p>
                Companies
              </p>

            </div>


            <div className="card green">

              <h2>
                {jobs.length}
              </h2>

              <p>
                Jobs
              </p>

            </div>


            <div className="card orange">

              <h2>
                {applications.length}
              </h2>

              <p>
                Applications
              </p>

            </div>


            <div className="card purple">

              <h2>
                {users.length}
              </h2>

              <p>
                Users
              </p>

            </div>

          </div>

        )}


        {/* =================================================
            COMPANIES
        ================================================= */}

        {page === "companies" && (

          <div className="panel">

            <div className="panel-header">

              <h2>
                Companies
              </h2>

            </div>


            <div className="form">

              <input
                placeholder="Company"
                value={company.name}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    name: e.target.value,
                  })
                }
              />


              <input
                placeholder="Email"
                value={company.email}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    email: e.target.value,
                  })
                }
              />


              <input
                placeholder="Location"
                value={company.location}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    location: e.target.value,
                  })
                }
              />


              <button onClick={addCompany}>
                Add Company
              </button>

            </div>


            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Location</th>

                  <th>Delete</th>

                </tr>

              </thead>


              <tbody>

                {companies.map((c) => (

                  <tr key={c.id}>

                    <td>
                      {c.name}
                    </td>

                    <td>
                      {c.email}
                    </td>

                    <td>
                      {c.location}
                    </td>

                    <td>

                      <button
                        className="delete"
                        onClick={() =>
                          deleteCompany(c.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}


        {/* =================================================
            JOBS
        ================================================= */}

        {page === "jobs" && (

          <div className="panel">

            <h2>
              Manage Jobs
            </h2>


            <div className="form">

              <input
                placeholder="Job Title"
                value={job.title}
                onChange={(e) =>
                  setJob({
                    ...job,
                    title: e.target.value,
                  })
                }
              />


              <input
                placeholder="Company"
                value={job.company}
                onChange={(e) =>
                  setJob({
                    ...job,
                    company: e.target.value,
                  })
                }
              />


              <input
                placeholder="Salary"
                value={job.salary}
                onChange={(e) =>
                  setJob({
                    ...job,
                    salary: e.target.value,
                  })
                }
              />


              <button onClick={addJob}>
                Add Job
              </button>

            </div>


            <table>

              <thead>

                <tr>

                  <th>Title</th>

                  <th>Company</th>

                  <th>Salary</th>

                  <th>Delete</th>

                </tr>

              </thead>


              <tbody>

                {jobs.map((j) => (

                  <tr key={j.id}>

                    <td>
                      {j.title}
                    </td>

                    <td>
                      {j.company}
                    </td>

                    <td>
                      {j.salary}
                    </td>

                    <td>

                      <button
                        className="delete"
                        onClick={() =>
                          deleteJob(j.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}


        {/* =================================================
            APPLICATIONS
        ================================================= */}

        {page === "applications" && (

          <div className="panel">

            <h2>
              Applications
            </h2>


            {/* LOADING */}

            {applicationsLoading && (

              <p>
                Loading applications...
              </p>

            )}


            {/* ERROR */}

            {applicationsError && (

              <p
                style={{
                  color: "red",
                  marginTop: "15px",
                }}
              >
                {applicationsError}
              </p>

            )}


            {/* TABLE */}

            {!applicationsLoading &&
              !applicationsError && (

                <table>

                  <thead>

                    <tr>

                      <th>
                        Candidate
                      </th>

                      <th>
                        Job
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {applications.length > 0 ? (

                      applications.map(
                        (application) => (

                          <tr
                            key={
                              application._id
                            }
                          >

                            {/* CANDIDATE */}

                            <td>

                              <strong>
                                {
                                  application
                                    .candidate
                                    ?.name ||
                                  application
                                    .candidate
                                    ?.username ||
                                  "Unknown Candidate"
                                }
                              </strong>

                              <br />

                              <small>
                                {
                                  application
                                    .candidate
                                    ?.email ||
                                  ""
                                }
                              </small>

                            </td>


                            {/* JOB */}

                            <td>

                              <strong>
                                {
                                  application
                                    .job
                                    ?.title ||
                                  "Unknown Job"
                                }
                              </strong>

                              <br />

                              <small>
                                {
                                  application
                                    .job
                                    ?.company ||
                                  ""
                                }
                              </small>

                            </td>


                            {/* STATUS */}

                            <td>

                              <select
                                value={
                                  application.status ||
                                  "Applied"
                                }
                                onChange={(e) =>
                                  updateStatus(
                                    application._id,
                                    e.target.value
                                  )
                                }
                              >

                                <option value="Applied">
                                  Applied
                                </option>

                                <option value="Under Review">
                                  Under Review
                                </option>

                                <option value="Shortlisted">
                                  Shortlisted
                                </option>

                                <option value="Selected">
                                  Selected
                                </option>

                                <option value="Rejected">
                                  Rejected
                                </option>

                              </select>

                            </td>


                            {/* DELETE */}

                            <td>

                              <button
                                className="delete"
                                onClick={() =>
                                  deleteApplication(
                                    application._id
                                  )
                                }
                              >
                                Delete
                              </button>

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="4"
                          style={{
                            textAlign: "center",
                            padding: "30px",
                          }}
                        >
                          No applications found.
                        </td>

                      </tr>

                    )}

                  </tbody>

                </table>

              )}

          </div>

        )}


        {/* =================================================
            USERS
        ================================================= */}

        {page === "users" && (

          <div className="panel">

            <h2>
              Users
            </h2>


            <table>

              <thead>

                <tr>

                  <th>
                    Name
                  </th>

                  <th>
                    Email
                  </th>

                  <th>
                    Role
                  </th>

                  <th>
                    Delete
                  </th>

                </tr>

              </thead>


              <tbody>

                {users.map((u) => (

                  <tr key={u.id}>

                    <td>
                      {u.name}
                    </td>

                    <td>
                      {u.email}
                    </td>

                    <td>
                      {u.role}
                    </td>

                    <td>

                      {u.role !== "Admin" && (

                        <button
                          className="delete"
                          onClick={() =>
                            deleteUser(u.id)
                          }
                        >
                          Delete
                        </button>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </main>

    </div>
  );
}

export default AdminDashboard;