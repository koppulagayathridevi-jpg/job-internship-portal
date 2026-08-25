// import "../styles/admin-dashboard.css";

// function AdminDashboard() {
//     return (
//         <div className="admin-dashboard">

//             {/* =================================================
//                 SIDEBAR
//             ================================================= */}

//             <aside className="admin-sidebar">

//                 {/* Logo */}

//                 <div className="admin-sidebar-brand">

//                     <div className="admin-brand-icon">
//                         💼
//                     </div>

//                     <div>
//                         <h3>JobPortal</h3>
//                         <span>Management Portal</span>
//                     </div>

//                 </div>


//                 {/* Navigation */}

//                 <nav className="admin-sidebar-nav">

//                     <a
//                         href="#dashboard"
//                         className="admin-nav-item active"
//                     >
//                         <span className="admin-nav-icon">▦</span>
//                         <span>Dashboard</span>
//                     </a>

//                     <a
//                         href="#jobs"
//                         className="admin-nav-item"
//                     >
//                         <span className="admin-nav-icon">▣</span>
//                         <span>Manage Jobs</span>
//                     </a>

//                     <a
//                         href="#applications"
//                         className="admin-nav-item"
//                     >
//                         <span className="admin-nav-icon">▤</span>
//                         <span>Applications</span>
//                     </a>

//                     <a
//                         href="#candidates"
//                         className="admin-nav-item"
//                     >
//                         <span className="admin-nav-icon">♙</span>
//                         <span>Candidates</span>
//                     </a>

//                     <a
//                         href="#companies"
//                         className="admin-nav-item"
//                     >
//                         <span className="admin-nav-icon">▥</span>
//                         <span>Companies</span>
//                     </a>

//                     <a
//                         href="#users"
//                         className="admin-nav-item"
//                     >
//                         <span className="admin-nav-icon">♙</span>
//                         <span>Users</span>
//                     </a>

//                     <a
//                         href="#reports"
//                         className="admin-nav-item"
//                     >
//                         <span className="admin-nav-icon">◩</span>
//                         <span>Reports</span>
//                     </a>

//                 </nav>


//                 {/* Logout */}

//                 <div className="admin-sidebar-bottom">

//                     <a
//                         href="#logout"
//                         className="admin-nav-item logout"
//                     >
//                         <span className="admin-nav-icon">←</span>
//                         <span>Logout</span>
//                     </a>

//                 </div>

//             </aside>


//             {/* =================================================
//                 MAIN CONTENT
//             ================================================= */}

//             <main className="admin-main">

//                 {/* =================================================
//                     TOP HEADER
//                 ================================================= */}

//                 <header className="admin-topbar">

//                     <div>

//                         <h1>
//                             Admin Dashboard
//                         </h1>

//                         <p>
//                             Welcome back, Admin! Here is the overview.
//                         </p>

//                     </div>


//                     {/* Admin Profile */}

//                     <div className="admin-profile">

//                         <div className="admin-avatar">
//                             A
//                         </div>

//                         <div className="admin-profile-info">

//                             <strong>
//                                 Admin
//                             </strong>

//                             <span>
//                                 Administrator
//                             </span>

//                         </div>

//                         <span className="admin-profile-arrow">
//                             ▼
//                         </span>

//                     </div>

//                 </header>


//                 {/* =================================================
//                     STATISTICS
//                 ================================================= */}

//                 <section className="admin-stat-grid">

//                     {/* Total Jobs */}

//                     <div className="admin-stat-card blue">

//                         <div className="admin-stat-icon">
//                             💼
//                         </div>

//                         <div className="admin-stat-content">

//                             <strong>
//                                 0
//                             </strong>

//                             <span>
//                                 Total Jobs
//                             </span>

//                         </div>

//                     </div>


//                     {/* Total Applicants */}

//                     <div className="admin-stat-card green">

//                         <div className="admin-stat-icon">
//                             ♙
//                         </div>

//                         <div className="admin-stat-content">

//                             <strong>
//                                 0
//                             </strong>

//                             <span>
//                                 Total Applicants
//                             </span>

//                         </div>

//                     </div>


//                     {/* Companies */}

//                     <div className="admin-stat-card orange">

//                         <div className="admin-stat-icon">
//                             ▣
//                         </div>

//                         <div className="admin-stat-content">

//                             <strong>
//                                 0
//                             </strong>

//                             <span>
//                                 Companies
//                             </span>

//                         </div>

//                     </div>


//                     {/* Users */}

//                     <div className="admin-stat-card purple">

//                         <div className="admin-stat-icon">
//                             ♙
//                         </div>

//                         <div className="admin-stat-content">

//                             <strong>
//                                 0
//                             </strong>

//                             <span>
//                                 Users
//                             </span>

//                         </div>

//                     </div>

//                 </section>


//                 {/* =================================================
//                     DASHBOARD CONTENT
//                 ================================================= */}

//                 <section className="admin-content-grid">


//                     {/* =================================================
//                         APPLICATIONS OVERVIEW
//                     ================================================= */}

//                     <div className="admin-panel applications-panel">

//                         <div className="admin-panel-header">

//                             <div>

//                                 <h2>
//                                     Applications Overview
//                                 </h2>

//                                 <p>
//                                     No application activity yet
//                                 </p>

//                             </div>

//                             <button className="admin-more-button">
//                                 ⋮
//                             </button>

//                         </div>


//                         {/* Empty Chart */}

//                         <div className="admin-chart">

//                             <div className="chart-y-axis">

//                                 <span>100</span>
//                                 <span>80</span>
//                                 <span>60</span>
//                                 <span>40</span>
//                                 <span>20</span>
//                                 <span>0</span>

//                             </div>


//                             <div className="chart-area">

//                                 <div className="chart-grid-line line-1"></div>
//                                 <div className="chart-grid-line line-2"></div>
//                                 <div className="chart-grid-line line-3"></div>
//                                 <div className="chart-grid-line line-4"></div>
//                                 <div className="chart-grid-line line-5"></div>


//                                 {/* Zero Application Line */}

//                                 <svg
//                                     className="application-chart"
//                                     viewBox="0 0 600 250"
//                                     preserveAspectRatio="none"
//                                 >

//                                     <polyline
//                                         points="
//                                             0,250
//                                             100,250
//                                             200,250
//                                             300,250
//                                             400,250
//                                             500,250
//                                             600,250
//                                         "
//                                     />

//                                     <circle
//                                         cx="0"
//                                         cy="250"
//                                         r="5"
//                                     />

//                                     <circle
//                                         cx="100"
//                                         cy="250"
//                                         r="5"
//                                     />

//                                     <circle
//                                         cx="200"
//                                         cy="250"
//                                         r="5"
//                                     />

//                                     <circle
//                                         cx="300"
//                                         cy="250"
//                                         r="5"
//                                     />

//                                     <circle
//                                         cx="400"
//                                         cy="250"
//                                         r="5"
//                                     />

//                                     <circle
//                                         cx="500"
//                                         cy="250"
//                                         r="5"
//                                     />

//                                     <circle
//                                         cx="600"
//                                         cy="250"
//                                         r="5"
//                                     />

//                                 </svg>


//                                 <div className="chart-x-axis">

//                                     <span>12 Aug</span>
//                                     <span>13 Aug</span>
//                                     <span>14 Aug</span>
//                                     <span>15 Aug</span>
//                                     <span>16 Aug</span>
//                                     <span>17 Aug</span>
//                                     <span>18 Aug</span>

//                                 </div>

//                             </div>

//                         </div>

//                     </div>


//                     {/* =================================================
//                         RECENT APPLICATIONS
//                     ================================================= */}

//                     <div className="admin-panel recent-panel">

//                         <div className="admin-panel-header">

//                             <div>

//                                 <h2>
//                                     Recent Applications
//                                 </h2>

//                                 <p>
//                                     No applications available
//                                 </p>

//                             </div>

//                             <button className="admin-more-button">
//                                 ⋮
//                             </button>

//                         </div>


//                         <div className="admin-table-wrapper">

//                             <table className="admin-table">

//                                 <thead>

//                                     <tr>

//                                         <th>
//                                             Candidate
//                                         </th>

//                                         <th>
//                                             Job Title
//                                         </th>

//                                         <th>
//                                             Status
//                                         </th>

//                                     </tr>

//                                 </thead>


//                                 <tbody>

//                                     {/* Empty State */}

//                                     <tr>

//                                         <td colSpan="3">
//                                             No applications found
//                                         </td>

//                                     </tr>

//                                 </tbody>

//                             </table>

//                         </div>


//                         <button className="admin-view-button">
//                             View All Applications
//                         </button>

//                     </div>

//                 </section>

//             </main>

//         </div>
//     );
// }

// export default AdminDashboard;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin-dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState("dashboard");

  // ---------- Companies ----------
  const [companies, setCompanies] = useState([
    { id: 1, name: "TCS", email: "hr@tcs.com", location: "Mumbai" },
    { id: 2, name: "Infosys", email: "hr@infosys.com", location: "Bangalore" }
  ]);

  const [company, setCompany] = useState({
    name: "",
    email: "",
    location: ""
  });

  const addCompany = () => {
    setCompanies([...companies, { id: Date.now(), ...company }]);
    setCompany({ name: "", email: "", location: "" });
  };

  const deleteCompany = (id) => {
    setCompanies(companies.filter(c => c.id !== id));
  };

  // ---------- Jobs ----------
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "TCS", salary: "6 LPA" }
  ]);

  const [job, setJob] = useState({
    title: "",
    company: "",
    salary: ""
  });

  const addJob = () => {
    setJobs([...jobs, { id: Date.now(), ...job }]);
    setJob({ title: "", company: "", salary: "" });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
  };

  // ---------- Applications ----------
  const [applications, setApplications] = useState([
    { id: 1, name: "Rahul", job: "Frontend Developer", status: "Pending" }
  ]);

  const updateStatus = (id, status) => {
    setApplications(
      applications.map(a =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(a => a.id !== id));
  };

  // ---------- Users ----------
  const [users, setUsers] = useState([
    { id: 1, name: "Admin", email: "admin@gmail.com", role: "Admin" },
    { id: 2, name: "Nitin", email: "nitin@gmail.com", role: "Candidate" }
  ]);

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <h2>💼 JobPortal</h2>
          <p>Admin Panel</p>
        </div>

        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("companies")}>Companies</button>
        <button onClick={() => setPage("jobs")}>Jobs</button>
        <button onClick={() => setPage("applications")}>Applications</button>
        <button onClick={() => setPage("users")}>Users</button>

        <button className="logout" onClick={logout}>
          Logout
        </button>

      </aside>

      {/* Main */}
      <main className="main">

        <div className="topbar">
          <h1>Admin Dashboard</h1>
          <div className="admin">👤 Admin</div>
        </div>

        {/* Dashboard */}
        {page === "dashboard" && (
          <>
            <div className="cards">

              <div className="card blue">
                <h2>{companies.length}</h2>
                <p>Companies</p>
              </div>

              <div className="card green">
                <h2>{jobs.length}</h2>
                <p>Jobs</p>
              </div>

              <div className="card orange">
                <h2>{applications.length}</h2>
                <p>Applications</p>
              </div>

              <div className="card purple">
                <h2>{users.length}</h2>
                <p>Users</p>
              </div>

            </div>
          </>
        )}

        {/* Companies CRUD */}
        {page === "companies" && (
          <div className="panel">
            <div className="panel-header">
              <h2>Companies</h2>
            </div>

            <div className="form">
              <input
                placeholder="Company"
                value={company.name}
                onChange={(e) =>
                  setCompany({ ...company, name: e.target.value })
                }
              />

              <input
                placeholder="Email"
                value={company.email}
                onChange={(e) =>
                  setCompany({ ...company, email: e.target.value })
                }
              />

              <input
                placeholder="Location"
                value={company.location}
                onChange={(e) =>
                  setCompany({ ...company, location: e.target.value })
                }
              />

              <button onClick={addCompany}>Add Company</button>
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
                {companies.map(c => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.location}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteCompany(c.id)}
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

        {/* Jobs CRUD */}
        {page === "jobs" && (
          <div className="panel">
            <h2>Manage Jobs</h2>

            <div className="form">
              <input
                placeholder="Job Title"
                value={job.title}
                onChange={(e) =>
                  setJob({ ...job, title: e.target.value })
                }
              />

              <input
                placeholder="Company"
                value={job.company}
                onChange={(e) =>
                  setJob({ ...job, company: e.target.value })
                }
              />

              <input
                placeholder="Salary"
                value={job.salary}
                onChange={(e) =>
                  setJob({ ...job, salary: e.target.value })
                }
              />

              <button onClick={addJob}>Add Job</button>
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
                {jobs.map(j => (
                  <tr key={j.id}>
                    <td>{j.title}</td>
                    <td>{j.company}</td>
                    <td>{j.salary}</td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteJob(j.id)}
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

        {/* Applications */}
        {page === "applications" && (
          <div className="panel">
            <h2>Applications</h2>

            <table>
              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Job</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {applications.map(a => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>{a.job}</td>
                    <td>
                      <select
                        value={a.status}
                        onChange={(e) =>
                          updateStatus(a.id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Selected</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="delete"
                        onClick={() => deleteApplication(a.id)}
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

        {/* Users */}
        {page === "users" && (
          <div className="panel">
            <h2>Users</h2>

            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Delete</th>
                </tr>
              </thead>

              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      {u.role !== "Admin" && (
                        <button
                          className="delete"
                          onClick={() => deleteUser(u.id)}
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