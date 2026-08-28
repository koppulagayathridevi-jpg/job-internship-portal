import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/admin-dashboard.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // PAGE
  // =====================================================

  const [page, setPage] = useState("dashboard");

  // =====================================================
  // COMPANIES
  // =====================================================

  const [companies, setCompanies] = useState([]);

  const [companiesLoading, setCompaniesLoading] =
    useState(false);

  const [companiesError, setCompaniesError] =
    useState("");

  // =====================================================
  // COMPANY FORM
  // =====================================================

  const [company, setCompany] = useState({
    name: "",
    email: "",
    location: "",
    website: "",
    description: "",
  });

  // =====================================================
  // JOBS
  // =====================================================

  const [jobs, setJobs] = useState([]);

  const [jobsLoading, setJobsLoading] =
    useState(false);

  const [jobsError, setJobsError] =
    useState("");

  const [editingJobId, setEditingJobId] =
    useState(null);

  const [jobLoading, setJobLoading] =
    useState(false);

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
    skills: "",
    salary: "",
    experience: "",
    responsibilities: "",
    eligibility: "",
    requirements: "",
    deadline: "",
  });

  // =====================================================
  // APPLICATIONS
  // =====================================================

  const [applications, setApplications] =
    useState([]);

  const [
    applicationsLoading,
    setApplicationsLoading,
  ] = useState(false);

  const [
    applicationsError,
    setApplicationsError,
  ] = useState("");

  // =====================================================
  // USERS
  // =====================================================

  const [users, setUsers] =
    useState([]);

  const [
    usersLoading,
    setUsersLoading,
  ] = useState(false);

  const [
    usersError,
    setUsersError,
  ] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const filteredUsers = users.filter((user) => {
    const search = userSearch.toLowerCase().trim();

    return (
        (user.name || "").toLowerCase().includes(search) ||
        (user.email || "").toLowerCase().includes(search) ||
        (user.role || "").toLowerCase().includes(search)
    );
});

  // =====================================================
  // APPLICATION CHART DATA
  // IMPORTANT:
  // applications is declared BEFORE this calculation
  // =====================================================

  const applicationChartData = useMemo(() => {
    const grouped = {};

    applications.forEach((application) => {
      const date = application.createdAt
        ? new Date(application.createdAt)
        : new Date();

      const label = date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      );

      grouped[label] =
        (grouped[label] || 0) + 1;
    });

    return Object.entries(grouped)
      .map(([date, count]) => ({
        date,
        applications: count,
      }))
      .sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      );
  }, [applications]);

  // =====================================================
  // FETCH JOBS
  // =====================================================

  const fetchJobs = async () => {
    try {
      setJobsLoading(true);
      setJobsError("");

      const response = await fetch(
        "http://localhost:5000/api/jobs"
      );

      const data = await response.json();

      console.log(
        "Jobs API Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to fetch jobs"
        );
      }

      const jobsData = Array.isArray(data)
        ? data
        : data.jobs || [];

      setJobs(jobsData);
    } catch (error) {
      console.error(
        "Jobs Fetch Error:",
        error
      );

      setJobsError(
        error.message ||
          "Unable to load jobs"
      );
    } finally {
      setJobsLoading(false);
    }
  };

  // =====================================================
  // ADD JOB
  // =====================================================

  const addJob = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Admin login token not found."
        );
        return;
      }

      if (
        !job.title ||
        !job.company ||
        !job.location ||
        !job.type ||
        !job.description ||
        !job.skills ||
        !job.salary ||
        !job.experience ||
        !job.responsibilities ||
        !job.eligibility ||
        !job.requirements ||
        !job.deadline
      ) {
        alert(
          "Please provide all job details."
        );
        return;
      }

      const jobData = {
        title: job.title.trim(),
        company: job.company.trim(),
        location: job.location.trim(),
        type: job.type,
        description: job.description.trim(),

        skills: job.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(
            (skill) => skill !== ""
          ),

        salary: job.salary.trim(),
        experience:
          job.experience.trim(),

        responsibilities:
          job.responsibilities.trim(),

        eligibility:
          job.eligibility.trim(),

        requirements:
          job.requirements.trim(),

        deadline: job.deadline,
      };

      console.log(
        "Sending Job Data:",
        jobData
      );

      const response = await fetch(
        "http://localhost:5000/api/jobs",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(jobData),
        }
      );

      const data =
        await response.json();

      console.log(
        "Create Job Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to create job"
        );
      }

      alert(
        "Job created successfully!"
      );

      resetJobForm();

      await fetchJobs();
    } catch (error) {
      console.error(
        "Create Job Error:",
        error
      );

      alert(
        error.message ||
          "Failed to create job"
      );
    }
  };

  // =====================================================
  // RESET JOB FORM
  // =====================================================

  const resetJobForm = () => {
    setEditingJobId(null);

    setJob({
      title: "",
      company: "",
      location: "",
      type: "",
      description: "",
      skills: "",
      salary: "",
      experience: "",
      responsibilities: "",
      eligibility: "",
      requirements: "",
      deadline: "",
    });
  };

  // =====================================================
  // EDIT JOB
  // =====================================================

  const editJob = (selectedJob) => {
    setEditingJobId(
      selectedJob._id
    );

    setJob({
      title:
        selectedJob.title || "",

      company:
        selectedJob.company || "",

      location:
        selectedJob.location || "",

      type:
        selectedJob.type || "",

      description:
        selectedJob.description || "",

      skills: Array.isArray(
        selectedJob.skills
      )
        ? selectedJob.skills.join(", ")
        : selectedJob.skills || "",

      salary:
        selectedJob.salary || "",

      experience:
        selectedJob.experience || "",

      responsibilities:
        selectedJob.responsibilities || "",

      eligibility:
        selectedJob.eligibility || "",

      requirements:
        selectedJob.requirements || "",

      deadline:
        selectedJob.deadline || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // UPDATE JOB
  // =====================================================

  const updateJob = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Admin login token not found."
        );
        return;
      }

      if (!editingJobId) {
        alert(
          "No job selected for editing."
        );
        return;
      }

      if (
        !job.title ||
        !job.company ||
        !job.location ||
        !job.type ||
        !job.description ||
        !job.skills ||
        !job.salary ||
        !job.experience ||
        !job.responsibilities ||
        !job.eligibility ||
        !job.requirements ||
        !job.deadline
      ) {
        alert(
          "Please provide all job details."
        );
        return;
      }

      setJobLoading(true);

      const jobData = {
        title: job.title.trim(),
        company: job.company.trim(),
        location: job.location.trim(),
        type: job.type,
        description:
          job.description.trim(),

        skills: job.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(
            (skill) => skill !== ""
          ),

        salary: job.salary.trim(),

        experience:
          job.experience.trim(),

        responsibilities:
          job.responsibilities.trim(),

        eligibility:
          job.eligibility.trim(),

        requirements:
          job.requirements.trim(),

        deadline: job.deadline,
      };

      console.log(
        "Updating Job:",
        jobData
      );

      const response = await fetch(
        `http://localhost:5000/api/jobs/${editingJobId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(
            jobData
          ),
        }
      );

      const data =
        await response.json();

      console.log(
        "Update Job Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to update job"
        );
      }

      if (data.job) {
        setJobs((prevJobs) =>
          prevJobs.map(
            (existingJob) =>
              existingJob._id ===
              editingJobId
                ? data.job
                : existingJob
          )
        );
      } else {
        await fetchJobs();
      }

      alert(
        "Job updated successfully!"
      );

      resetJobForm();
    } catch (error) {
      console.error(
        "Update Job Error:",
        error
      );

      alert(
        error.message ||
          "Failed to update job"
      );
    } finally {
      setJobLoading(false);
    }
  };

  // =====================================================
  // DELETE JOB
  // =====================================================
const deleteJob = async (id) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Admin login token not found.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmed) {
            return;
        }

        const response = await fetch(
            `http://localhost:5000/api/jobs/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        console.log("Delete Job Response:", data);

        if (!response.ok) {
            throw new Error(
                data.message ||
                data.error ||
                "Failed to delete job"
            );
        }

        // Remove from React state
        setJobs((prevJobs) =>
            prevJobs.filter(
                (job) => job._id !== id
            )
        );

        alert("Job deleted successfully!");

    } catch (error) {
        console.error(
            "Delete Job Error:",
            error
        );

        alert(error.message);
    }
};

  // =====================================================
  // FETCH APPLICATIONS
  // =====================================================

  const fetchApplications =
    async () => {
      try {
        setApplicationsLoading(
          true
        );

        setApplicationsError("");

        const token =
          localStorage.getItem("token");

        console.log(
          "Admin token:",
          token
        );

        if (!token) {
          throw new Error(
            "Admin login token not found."
          );
        }

        const response =
          await fetch(
            "http://localhost:5000/api/applications",
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        const data =
          await response.json();

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

        setApplications(
          Array.isArray(
            data
          )
            ? data
            : data.applications || []
        );
      } catch (error) {
        console.error(
          "Applications Fetch Error:",
          error
        );

        setApplicationsError(
          error.message ||
            "Unable to load applications"
        );
      } finally {
        setApplicationsLoading(
          false
        );
      }
    };

  // =====================================================
  // UPDATE APPLICATION STATUS
  // =====================================================

  const updateStatus = async (
    id,
    newStatus
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Admin login token not found."
        );
        return;
      }

      console.log(
        "Updating application:",
        id,
        newStatus
      );

      const response =
        await fetch(
          `http://localhost:5000/api/applications/${id}/status`,
          {
            method: "PATCH",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              status: newStatus,
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "Update Application Status Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to update application status"
        );
      }

      setApplications(
        (prevApplications) =>
          prevApplications.map(
            (application) =>
              application._id === id
                ? {
                    ...application,
                    status:
                      newStatus,
                  }
                : application
          )
      );
    } catch (error) {
      console.error(
        "Update Application Status Error:",
        error
      );

      alert(
        error.message ||
          "Failed to update status"
      );
    }
  };

  // =====================================================
  // DELETE APPLICATION
  // =====================================================

  const deleteApplication = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this application?"
      );

    if (!confirmed) {
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Admin login token not found."
        );
        return;
      }

      const response =
        await fetch(
          `http://localhost:5000/api/applications/${id}`,
          {
            method: "DELETE",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      console.log(
        "Delete Application Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to delete application"
        );
      }

      setApplications(
        (prevApplications) =>
          prevApplications.filter(
            (application) =>
              application._id !== id
          )
      );

      alert(
        "Application deleted successfully!"
      );
    } catch (error) {
      console.error(
        "Delete Application Error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete application"
      );
    }
  };

  // =====================================================
  // FETCH USERS
  // =====================================================

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      setUsersError("");

      const token =
        localStorage.getItem("token");

      console.log(
        "Admin token:",
        token
      );

      if (!token) {
        throw new Error(
          "Admin login token not found."
        );
      }

      const response =
        await fetch(
          "http://localhost:5000/api/admin/users",
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const data =
        await response.json();

      console.log(
        "Users API Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch users"
        );
      }

      setUsers(
        Array.isArray(data)
          ? data
          : data.users || []
      );
    } catch (error) {
      console.error(
        "Users Fetch Error:",
        error
      );

      setUsersError(
        error.message ||
          "Unable to load users"
      );
    } finally {
      setUsersLoading(false);
    }
  };

  // =====================================================
// ACTIVATE / DEACTIVATE USER
// =====================================================

const toggleUserStatus = async (userId, currentStatus) => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Admin login token not found.");
            return;
        }

        const response = await fetch(
            `http://localhost:5000/api/admin/users/${userId}/status`,
            {
                method: "PATCH",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                    isActive: !currentStatus,
                }),
            }
        );

        const data = await response.json();

        console.log("User Status Response:", data);

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to update user status"
            );
        }

        // Update user in React state
        setUsers((prevUsers) =>
            prevUsers.map((user) =>
                user._id === userId
                    ? {
                          ...user,
                          isActive: data.user.isActive,
                      }
                    : user
            )
        );

        alert(data.message);

    } catch (error) {

        console.error(
            "Toggle User Status Error:",
            error
        );

        alert(error.message);
    }
};

  // =====================================================
  // DELETE USER
  // =====================================================
// =====================================================
// DELETE USER
// =====================================================

const deleteUser = async (id) => {

    try {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "Admin login token not found."
            );

            return;
        }


        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmDelete) {
            return;
        }


        const response =
            await fetch(
                `http://localhost:5000/api/admin/users/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


        const data =
            await response.json();


        console.log(
            "Delete User Response:",
            data
        );


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Failed to delete user"
            );

        }


        // Remove from frontend state

        setUsers(
            (prevUsers) =>
                prevUsers.filter(
                    (user) =>
                        user._id !== id
                )
        );


        alert(
            "User deleted successfully"
        );


    } catch (error) {

        console.error(
            "Delete User Error:",
            error
        );

        alert(
            error.message
        );
    }
};
 

  // =====================================================
  // FETCH COMPANIES
  // Companies are generated from posted jobs
  // =====================================================

  const fetchCompanies = async () => {
    try {
      setCompaniesLoading(true);
      setCompaniesError("");

      const response =
        await fetch(
          "http://localhost:5000/api/jobs"
        );

      const data =
        await response.json();

      console.log(
        "Jobs for Companies:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch companies"
        );
      }

      const jobsData =
        Array.isArray(data)
          ? data
          : data.jobs || [];

      const companyMap = {};

      jobsData.forEach((jobItem) => {
        const companyName =
          jobItem.company?.trim();

        if (!companyName) {
          return;
        }

        if (!companyMap[companyName]) {
          companyMap[companyName] = {
            id: companyName,
            name: companyName,
            jobs: 0,
            locations: [],
          };
        }

        companyMap[companyName].jobs +=
          1;

        if (
          jobItem.location &&
          !companyMap[
            companyName
          ].locations.includes(
            jobItem.location
          )
        ) {
          companyMap[
            companyName
          ].locations.push(
            jobItem.location
          );
        }
      });

      setCompanies(
        Object.values(companyMap)
      );
    } catch (error) {
      console.error(
        "Fetch Companies Error:",
        error
      );

      setCompaniesError(
        error.message ||
          "Unable to load companies"
      );
    } finally {
      setCompaniesLoading(false);
    }
  };

  // =====================================================
  // ADD COMPANY
  // =====================================================

  const addCompany = async () => {
    try {
      if (
        !company.name ||
        !company.email ||
        !company.location
      ) {
        alert(
          "Please provide company name, email and location."
        );
        return;
      }

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Admin login token not found."
        );
        return;
      }

      const response =
        await fetch(
          "http://localhost:5000/api/companies",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              company
            ),
          }
        );

      const data =
        await response.json();

      console.log(
        "Create Company Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create company"
        );
      }

      if (data.company) {
        setCompanies(
          (prevCompanies) => [
            data.company,
            ...prevCompanies,
          ]
        );
      }

      setCompany({
        name: "",
        email: "",
        location: "",
        website: "",
        description: "",
      });

      alert(
        "Company added successfully!"
      );

      /*
        Since your Companies page currently
        displays companies based on jobs,
        refresh the company list after adding.
      */
      await fetchCompanies();
    } catch (error) {
      console.error(
        "Create Company Error:",
        error
      );

      alert(
        error.message ||
          "Failed to create company"
      );
    }
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // =====================================================
  // FETCH DATA WHEN PAGE CHANGES
  // =====================================================

  useEffect(() => {
    if (page === "dashboard") {
      fetchJobs();
      fetchApplications();
      fetchUsers();
      fetchCompanies();
    }

    if (page === "users") {
      fetchUsers();
    }

    if (page === "jobs") {
      fetchJobs();
    }

    if (page === "applications") {
      fetchApplications();
    }

    if (page === "companies") {
      fetchCompanies();
    }
  }, [page]);

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
          className={
            page === "dashboard"
              ? "active"
              : ""
          }
          onClick={() =>
            setPage("dashboard")
          }
        >
          Dashboard
        </button>

        <button
          className={
            page === "companies"
              ? "active"
              : ""
          }
          onClick={() =>
            setPage("companies")
          }
        >
          Companies
        </button>

        <button
          className={
            page === "jobs"
              ? "active"
              : ""
          }
          onClick={() =>
            setPage("jobs")
          }
        >
          Jobs
        </button>

        <button
          className={
            page === "applications"
              ? "active"
              : ""
          }
          onClick={() =>
            setPage("applications")
          }
        >
          Applications
        </button>

        <button
          className={
            page === "users"
              ? "active"
              : ""
          }
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
          <div className="dashboard-content">

            {/* SUMMARY CARDS */}

            <div className="cards">

              {/* Companies */}

              <div className="card blue">

                <div className="card-icon">
                  🏢
                </div>

                <div>
                  <h2>
                    {companies.length}
                  </h2>

                  <p>
                    Companies
                  </p>
                </div>

              </div>

              {/* Jobs */}

              <div className="card green">

                <div className="card-icon">
                  💼
                </div>

                <div>
                  <h2>
                    {jobs.length}
                  </h2>

                  <p>
                    Jobs
                  </p>
                </div>

              </div>

              {/* Applications */}

              <div className="card orange">

                <div className="card-icon">
                  📄
                </div>

                <div>
                  <h2>
                    {applications.length}
                  </h2>

                  <p>
                    Applications
                  </p>
                </div>

              </div>

              {/* Users */}

              <div className="card purple">

                <div className="card-icon">
                  👥
                </div>

                <div>
                  <h2>
                    {users.length}
                  </h2>

                  <p>
                    Users
                  </p>
                </div>

              </div>

            </div>

            {/* GRAPH + RECENT APPLICATIONS */}

            <div className="dashboard-grid">

              {/* APPLICATION OVERVIEW */}

              <div className="dashboard-panel">

                <div className="panel-title">

                  <div>
                    <h2>
                      Applications Overview
                    </h2>

                    <p>
                      Application activity
                    </p>
                  </div>

                  <span className="chart-icon">
                    📈
                  </span>

                </div>

                <div className="chart-container">

                  {applications.length >
                  0 ? (
                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >
                      <LineChart
                        data={
                          applicationChartData
                        }
                        margin={{
                          top: 10,
                          right: 20,
                          left: 0,
                          bottom: 10,
                        }}
                      >

                        <CartesianGrid
                          strokeDasharray="3 3"
                        />

                        <XAxis
                          dataKey="date"
                        />

                        <YAxis
                          allowDecimals={false}
                        />

                        <Tooltip />

                        <Line
                          type="monotone"
                          dataKey="applications"
                          stroke="#2563eb"
                          strokeWidth={3}
                          dot={{
                            r: 5,
                          }}
                          activeDot={{
                            r: 7,
                          }}
                        />

                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="empty-chart">

                      <div>
                        📊
                      </div>

                      <p>
                        No application data available
                      </p>

                    </div>
                  )}

                </div>

              </div>

              {/* RECENT APPLICATIONS */}

              <div className="dashboard-panel">

                <div className="panel-title">

                  <div>
                    <h2>
                      Recent Applications
                    </h2>

                    <p>
                      Latest candidate applications
                    </p>
                  </div>

                </div>

                <div className="recent-applications">

                  {applications.length >
                  0 ? (
                    [...applications]
                      .sort(
                        (a, b) =>
                          new Date(
                            b.createdAt || 0
                          ) -
                          new Date(
                            a.createdAt || 0
                          )
                      )
                      .slice(0, 5)
                      .map(
                        (application) => (
                          <div
                            className="recent-application"
                            key={
                              application._id
                            }
                          >

                            <div className="candidate-avatar">

                              {(
                                application
                                  .candidate
                                  ?.name ||
                                application
                                  .candidate
                                  ?.username ||
                                "U"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            <div className="application-info">

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

                              <span>
                                {
                                  application
                                    .job
                                    ?.title ||
                                  "Unknown Job"
                                }
                              </span>

                            </div>

                            <span
                              className={`status ${(
                                application.status ||
                                "Pending"
                              ).toLowerCase()}`}
                            >
                              {
                                application.status ||
                                "Pending"
                              }
                            </span>

                          </div>
                        )
                      )
                  ) : (
                    <div className="no-applications">

                      <div>
                        📄
                      </div>

                      <p>
                        No applications found
                      </p>

                    </div>
                  )}

                </div>

                <button
                  className="view-all-btn"
                  onClick={() =>
                    setPage(
                      "applications"
                    )
                  }
                >
                  View All Applications →
                </button>

              </div>

            </div>

          </div>
        )}

        {/* =================================================
            COMPANIES
        ================================================= */}

        {page === "companies" && (
          <div className="panel">

            <div className="panel-header">

              <div>
                <h2>
                  Companies
                </h2>

                <p>
                  Companies available through posted jobs
                </p>
              </div>

              <button
                type="button"
                onClick={
                  fetchCompanies
                }
              >
                Refresh
              </button>

            </div>

            {companiesLoading && (
              <div
                style={{
                  textAlign:
                    "center",
                  padding: "30px",
                }}
              >
                <p>
                  Loading companies...
                </p>
              </div>
            )}

            {companiesError && (
              <div
                style={{
                  textAlign:
                    "center",
                  padding: "30px",
                  color: "red",
                }}
              >

                <p>
                  {companiesError}
                </p>

                <button
                  type="button"
                  onClick={
                    fetchCompanies
                  }
                >
                  Try Again
                </button>

              </div>
            )}

            {!companiesLoading &&
              !companiesError && (
                <>
                  {companies.length >
                  0 ? (
                    <table>

                      <thead>
                        <tr>

                          <th>
                            Company
                          </th>

                          <th>
                            Jobs
                          </th>

                          <th>
                            Locations
                          </th>

                        </tr>
                      </thead>

                      <tbody>

                        {companies.map(
                          (companyItem) => (
                            <tr
                              key={
                                companyItem.id
                              }
                            >

                              <td>
                                <strong>
                                  {
                                    companyItem.name
                                  }
                                </strong>
                              </td>

                              <td>
                                {
                                  companyItem.jobs
                                }{" "}
                                {
                                  companyItem.jobs ===
                                  1
                                    ? "Job"
                                    : "Jobs"
                                }
                              </td>

                              <td>
                                {companyItem
                                  .locations
                                  ?.length >
                                0
                                  ? companyItem.locations.join(
                                      ", "
                                    )
                                  : "Not specified"}
                              </td>

                            </tr>
                          )
                        )}

                      </tbody>

                    </table>
                  ) : (
                    <div
                      style={{
                        textAlign:
                          "center",
                        padding:
                          "40px",
                      }}
                    >

                      <h3>
                        No Companies Found
                      </h3>

                      <p>
                        Companies will appear here
                        automatically when jobs are added.
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setPage("jobs")
                        }
                      >
                        Go to Jobs
                      </button>

                    </div>
                  )}
                </>
              )}

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

            {jobsLoading && (
              <p>
                Loading jobs...
              </p>
            )}

            {jobsError && (
              <p
                style={{
                  color: "red",
                }}
              >
                {jobsError}
              </p>
            )}

            {/* JOB FORM */}

            <div className="form">

              <input
                type="text"
                placeholder="Job Title"
                value={job.title}
                onChange={(e) =>
                  setJob({
                    ...job,
                    title:
                      e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Company"
                value={job.company}
                onChange={(e) =>
                  setJob({
                    ...job,
                    company:
                      e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Location"
                value={job.location}
                onChange={(e) =>
                  setJob({
                    ...job,
                    location:
                      e.target.value,
                  })
                }
              />

              <select
                value={job.type}
                onChange={(e) =>
                  setJob({
                    ...job,
                    type:
                      e.target.value,
                  })
                }
              >

                <option value="">
                  Select Job Type
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

              <input
                type="text"
                placeholder="Salary"
                value={job.salary}
                onChange={(e) =>
                  setJob({
                    ...job,
                    salary:
                      e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Experience"
                value={job.experience}
                onChange={(e) =>
                  setJob({
                    ...job,
                    experience:
                      e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={job.skills}
                onChange={(e) =>
                  setJob({
                    ...job,
                    skills:
                      e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Job Description"
                value={
                  job.description
                }
                onChange={(e) =>
                  setJob({
                    ...job,
                    description:
                      e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Responsibilities"
                value={
                  job.responsibilities
                }
                onChange={(e) =>
                  setJob({
                    ...job,
                    responsibilities:
                      e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Eligibility"
                value={
                  job.eligibility
                }
                onChange={(e) =>
                  setJob({
                    ...job,
                    eligibility:
                      e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Requirements"
                value={
                  job.requirements
                }
                onChange={(e) =>
                  setJob({
                    ...job,
                    requirements:
                      e.target.value,
                  })
                }
              />

              <input
                type="date"
                value={job.deadline}
                onChange={(e) =>
                  setJob({
                    ...job,
                    deadline:
                      e.target.value,
                  })
                }
              />

              {/* BUTTONS */}

              {editingJobId ? (
                <>

                  <button
                    type="button"
                    onClick={updateJob}
                    disabled={jobLoading}
                  >
                    {jobLoading
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={
                      resetJobForm
                    }
                  >
                    Cancel
                  </button>

                </>
              ) : (
                <button
                  type="button"
                  onClick={addJob}
                >
                  Add Job
                </button>
              )}

            </div>

            {/* JOB TABLE */}

            {!jobsLoading &&
              !jobsError && (
                <table>

                  <thead>
                    <tr>

                      <th>
                        Title
                      </th>

                      <th>
                        Company
                      </th>

                      <th>
                        Salary
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {jobs.length > 0 ? (
                      jobs.map(
                        (jobItem) => (
                          <tr
                            key={
                              jobItem._id
                            }
                          >

                            <td>
                              {
                                jobItem.title
                              }
                            </td>

                            <td>
                              {
                                jobItem.company
                              }
                            </td>

                            <td>
                              {
                                jobItem.salary
                              }
                            </td>

                            <td>

                              <button
                                type="button"
                                onClick={() =>
                                  editJob(
                                    jobItem
                                  )
                                }
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                className="delete"
                                onClick={() =>
                                  deleteJob(
                                    jobItem._id
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
                            textAlign:
                              "center",
                            padding:
                              "30px",
                          }}
                        >
                          No jobs found.
                        </td>

                      </tr>
                    )}

                  </tbody>

                </table>
              )}

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

            {applicationsLoading && (
              <p>
                Loading applications...
              </p>
            )}

            {applicationsError && (
              <p
                style={{
                  color: "red",
                  marginTop:
                    "15px",
                }}
              >
                {applicationsError}
              </p>
            )}

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

                    {applications.length >
                    0 ? (
                      applications.map(
                        (application) => (
                          <tr
                            key={
                              application._id
                            }
                          >

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

                            <td>

                              <select
                                value={
                                  application.status ||
                                  "Pending"
                                }
                                onChange={(
                                  e
                                ) =>
                                  updateStatus(
                                    application._id,
                                    e.target
                                      .value
                                  )
                                }
                              >

                                <option value="Pending">
                                  Pending
                                </option>

                                <option value="Shortlisted">
                                  Shortlisted
                                </option>

                                <option value="Rejected">
                                  Rejected
                                </option>

                                <option value="Accepted">
                                  Accepted
                                </option>

                              </select>

                            </td>

                            <td>

                              <button
                                type="button"
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
                            textAlign:
                              "center",
                            padding:
                              "30px",
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

        {/* HEADER */}

        <div className="panel-header">

            <div>

                <h2>
                    Users
                </h2>

                <p>
                    Manage registered users
                </p>

            </div>

            <button
                type="button"
                onClick={fetchUsers}
            >
                Refresh
            </button>

        </div>


        {/* LOADING */}

        {usersLoading && (

            <p>
                Loading users...
            </p>

        )}


        {/* ERROR */}

        {usersError && (

            <p
                style={{
                    color: "red",
                    marginTop: "15px",
                }}
            >
                {usersError}
            </p>

        )}
        <div className="user-search">
    <input
        type="text"
        placeholder="Search by name, email or role..."
        value={userSearch}
        onChange={(e) => setUserSearch(e.target.value)}
    />
</div>


        {/* USERS TABLE */}

        {!usersLoading &&
            !usersError && (

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
                            Status
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>


                <tbody>

                    {filteredUsers.length > 0 ? (

                        filteredUsers.map((u) => (

                            <tr
                                key={u._id}
                            >

                                {/* NAME */}

                                <td>

                                    {u.name ||
                                        u.username ||
                                        "No Name"}

                                </td>


                                {/* EMAIL */}

                                <td>

                                    {u.email}

                                </td>


                                {/* ROLE */}

                                <td>

                                    <span
                                        className={
                                            u.role === "admin"
                                                ? "role-admin"
                                                : "role-candidate"
                                        }
                                    >
                                        {u.role}
                                    </span>

                                </td>


                                {/* STATUS */}

                                <td>

                                    {u.role === "admin" ? (

                                        <span className="status-badge active">
                                            Active
                                        </span>

                                    ) : (

                                        <span
                                            className={
                                                u.isActive
                                                    ? "status-badge active"
                                                    : "status-badge inactive"
                                            }
                                        >
                                            {u.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    )}

                                </td>


                                {/* ACTION */}

                                <td>

                                    {u.role !== "admin" ? (

                                        <div
                                            className="user-actions"
                                        >

                                            {/* ACTIVATE / DEACTIVATE */}

                                            <button
                                                type="button"
                                                className={
                                                    u.isActive
                                                        ? "deactivate-btn"
                                                        : "activate-btn"
                                                }
                                                onClick={() =>
                                                    toggleUserStatus(
                                                        u._id,
                                                        u.isActive
                                                    )
                                                }
                                            >
                                                {u.isActive
                                                    ? "Deactivate"
                                                    : "Activate"}
                                            </button>


                                            {/* DELETE */}

                                            <button
                                                type="button"
                                                className="delete"
                                                onClick={() =>
                                                    deleteUser(
                                                        u._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    ) : (

                                        <span
                                            className="admin-protected"
                                        >
                                            Protected
                                        </span>

                                    )}

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                style={{
                                    textAlign: "center",
                                    padding: "30px",
                                }}
                            >
                                No users found.
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        )}

    </div>

)}
      </main>

    </div>
  );
}

export default AdminDashboard;