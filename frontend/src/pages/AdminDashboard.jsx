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

const API_URL = "https://job-internship-portal-055b.onrender.com";

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
  const [companiesLoading, setCompaniesLoading] = useState(false);
  const [companiesError, setCompaniesError] = useState("");

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
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");

  const [editingJobId, setEditingJobId] = useState(null);
  const [jobLoading, setJobLoading] = useState(false);

  const emptyJob = {
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
  };

  const [job, setJob] = useState(emptyJob);

  // =====================================================
  // APPLICATIONS
  // =====================================================

  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState("");

  // =====================================================
  // USERS
  // =====================================================

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");
  const [userSearch, setUserSearch] = useState("");

  // =====================================================
  // FILTER USERS
  // =====================================================

  const filteredUsers = useMemo(() => {
    const search = userSearch.toLowerCase().trim();

    if (!search) {
      return users;
    }

    return users.filter((user) => {
      return (
        (user.name || "")
          .toLowerCase()
          .includes(search) ||
        (user.username || "")
          .toLowerCase()
          .includes(search) ||
        (user.email || "")
          .toLowerCase()
          .includes(search) ||
        (user.role || "")
          .toLowerCase()
          .includes(search)
      );
    });
  }, [users, userSearch]);

  // =====================================================
  // APPLICATION CHART
  // =====================================================

  const applicationChartData = useMemo(() => {
    const grouped = {};

    applications.forEach((application) => {
      const date = application.createdAt
        ? new Date(application.createdAt)
        : application.appliedAt
        ? new Date(application.appliedAt)
        : new Date();

      const label = date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      grouped[label] = (grouped[label] || 0) + 1;
    });

    return Object.entries(grouped).map(([date, count]) => ({
      date,
      applications: count,
    }));
  }, [applications]);


  // =====================================================
// SELECTED CANDIDATES
// =====================================================
const selectedApplications = useMemo(() => {
  return applications.filter((application) => {
    const status = String(application.status || "")
      .trim()
      .toLowerCase();

    return status === "accepted";
  });
}, [applications]);

const selectedCandidates = selectedApplications.length;
  // =====================================================
  // AUTH TOKEN
  // =====================================================

  const getToken = () => {
    return localStorage.getItem("token");
  };

// =====================================================
// RESUME URL
const getResumeUrl = (application) => {
    if (!application) {
        return null;
    }

    const resume = application.resume;

    if (!resume) {
        return null;
    }

    if (
        resume.startsWith("http://") ||
        resume.startsWith("https://")
    ) {
        return resume;
    }

    const cleanResume = resume.replace(/^\/+/, "");

    return `https://job-internship-portal-055b.onrender.com/uploads/${cleanResume}`;
};
// =====================================================
// VIEW RESUME
// Opens PDF in browser without downloading
const viewResume = async (application) => {

    console.log("========== VIEW RESUME ==========");
    console.log("Application:", application);
    console.log("Resume:", application?.resume);

    const resumeUrl = getResumeUrl(application);

    console.log("Resume URL:", resumeUrl);

    if (!resumeUrl) {
        alert("Resume is not available.");
        return;
    }

    try {

        const response = await fetch(resumeUrl);

        console.log(
            "Resume response status:",
            response.status
        );

        if (!response.ok) {
            throw new Error(
                `Resume file not found. HTTP ${response.status}`
            );
        }

        const blob = await response.blob();

        console.log(
            "Resume Blob:",
            blob
        );

        // Create temporary URL for the PDF
        const blobUrl =
            window.URL.createObjectURL(blob);

        // Open PDF in a new tab
        const newTab = window.open(
            "",
            "_blank"
        );

        if (!newTab) {
            alert(
                "Please allow pop-ups in your browser to view the resume."
            );

            window.URL.revokeObjectURL(blobUrl);
            return;
        }

        // Navigate new tab to PDF
        newTab.location.href = blobUrl;

        // Release URL after browser has loaded it
        setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
        }, 60000);

    } catch (error) {

        console.error(
            "View Resume Error:",
            error
        );

        alert(
            error.message ||
            "Failed to view resume."
        );
    }
};
   
////download
const downloadResume = async (application) => {

    console.log("========== DOWNLOAD RESUME ==========");

    const resumeUrl = getResumeUrl(application);

    console.log("Resume URL:", resumeUrl);

    if (!resumeUrl) {
        alert("Resume is not available.");
        return;
    }

    try {

        const response = await fetch(resumeUrl);

        console.log(
            "Resume response status:",
            response.status
        );

        if (!response.ok) {
            throw new Error(
                `Resume file not found. HTTP ${response.status}`
            );
        }

        const blob = await response.blob();

        const blobUrl =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = blobUrl;

        link.download =
            application.resumeOriginalName ||
            "resume.pdf";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(blobUrl);

    } catch (error) {

        console.error(
            "Download Resume Error:",
            error
        );

        alert(
            "Failed to download resume."
        );
    }
};
  // =====================================================
  // FETCH JOBS
  // =====================================================

  const fetchJobs = async () => {
    try {
      setJobsLoading(true);
      setJobsError("");

      const response = await fetch(
        `${API_URL}/api/jobs`
      );

      const data = await response.json();

      console.log("Jobs API Response:", data);

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
      console.error("Jobs Fetch Error:", error);

      setJobsError(
        error.message || "Unable to load jobs"
      );
    } finally {
      setJobsLoading(false);
    }
  };

  // =====================================================
  // RESET JOB FORM
  // =====================================================

  const resetJobForm = () => {
    setEditingJobId(null);
    setJob(emptyJob);
  };

  // =====================================================
  // ADD JOB
  // =====================================================

  const addJob = async () => {
    try {
      const token = getToken();

      if (!token) {
        alert("Admin login token not found.");
        return;
      }

      if (
        !job.title.trim() ||
        !job.company.trim() ||
        !job.location.trim() ||
        !job.type ||
        !job.description.trim() ||
        !job.skills.trim() ||
        !job.salary.trim() ||
        !job.experience.trim() ||
        !job.responsibilities.trim() ||
        !job.eligibility.trim() ||
        !job.requirements.trim() ||
        !job.deadline
      ) {
        alert("Please provide all job details.");
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
          .filter(Boolean),

        salary: job.salary.trim(),
        experience: job.experience.trim(),
        responsibilities: job.responsibilities.trim(),
        eligibility: job.eligibility.trim(),
        requirements: job.requirements.trim(),
        deadline: job.deadline,
      };

      const response = await fetch(
        `${API_URL}/api/jobs`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(jobData),
        }
      );

      const data = await response.json();

      console.log("Create Job Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to create job"
        );
      }

      alert("Job created successfully!");

      resetJobForm();

      await fetchJobs();
      await fetchCompanies();
    } catch (error) {
      console.error("Create Job Error:", error);

      alert(
        error.message ||
          "Failed to create job"
      );
    }
  };

  // =====================================================
  // EDIT JOB
  // =====================================================

  const editJob = (selectedJob) => {
    setEditingJobId(selectedJob._id);

    setJob({
      title: selectedJob.title || "",
      company: selectedJob.company || "",
      location: selectedJob.location || "",
      type: selectedJob.type || "",
      description: selectedJob.description || "",

      skills: Array.isArray(selectedJob.skills)
        ? selectedJob.skills.join(", ")
        : selectedJob.skills || "",

      salary: selectedJob.salary || "",
      experience: selectedJob.experience || "",
      responsibilities:
        selectedJob.responsibilities || "",
      eligibility:
        selectedJob.eligibility || "",
      requirements:
        selectedJob.requirements || "",
      deadline: selectedJob.deadline || "",
    });

    setPage("jobs");

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
      const token = getToken();

      if (!token) {
        alert("Admin login token not found.");
        return;
      }

      if (!editingJobId) {
        alert("No job selected for editing.");
        return;
      }

      if (
        !job.title.trim() ||
        !job.company.trim() ||
        !job.location.trim() ||
        !job.type ||
        !job.description.trim() ||
        !job.skills.trim() ||
        !job.salary.trim() ||
        !job.experience.trim() ||
        !job.responsibilities.trim() ||
        !job.eligibility.trim() ||
        !job.requirements.trim() ||
        !job.deadline
      ) {
        alert("Please provide all job details.");
        return;
      }

      setJobLoading(true);

      const jobData = {
        title: job.title.trim(),
        company: job.company.trim(),
        location: job.location.trim(),
        type: job.type,
        description: job.description.trim(),

        skills: job.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),

        salary: job.salary.trim(),
        experience: job.experience.trim(),
        responsibilities:
          job.responsibilities.trim(),
        eligibility: job.eligibility.trim(),
        requirements: job.requirements.trim(),
        deadline: job.deadline,
      };

      const response = await fetch(
        `${API_URL}/api/jobs/${editingJobId}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(jobData),
        }
      );

      const data = await response.json();

      console.log("Update Job Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Failed to update job"
        );
      }

      if (data.job) {
        setJobs((prevJobs) =>
          prevJobs.map((existingJob) =>
            existingJob._id === editingJobId
              ? data.job
              : existingJob
          )
        );
      } else {
        await fetchJobs();
      }

      alert("Job updated successfully!");

      resetJobForm();
      await fetchCompanies();
    } catch (error) {
      console.error("Update Job Error:", error);

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
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        alert("Admin login token not found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/jobs/${id}`,
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

      setJobs((prevJobs) =>
        prevJobs.filter(
          (jobItem) => jobItem._id !== id
        )
      );

      alert("Job deleted successfully!");

      await fetchCompanies();
    } catch (error) {
      console.error("Delete Job Error:", error);

      alert(
        error.message ||
          "Failed to delete job"
      );
    }
  };

  // =====================================================
  // FETCH APPLICATIONS
  // =====================================================

  const fetchApplications = async () => {
    try {
      setApplicationsLoading(true);
      setApplicationsError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin login token not found."
        );
      }

      const response = await fetch(
        `${API_URL}/api/applications`,
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

      setApplications(
        Array.isArray(data)
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
      setApplicationsLoading(false);
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
      const token = getToken();

      if (!token) {
        alert("Admin login token not found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/applications/${id}/status`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

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
                    status: newStatus,
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

  const deleteApplication = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        alert("Admin login token not found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/applications/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

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

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin login token not found."
        );
      }

      const response = await fetch(
        `${API_URL}/api/admin/users`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

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

  const toggleUserStatus = async (
    userId,
    currentStatus
  ) => {
    try {
      const token = getToken();

      if (!token) {
        alert("Admin login token not found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/users/${userId}/status`,
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

      console.log(
        "User Status Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update user status"
        );
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                isActive:
                  data.user?.isActive ??
                  !currentStatus,
              }
            : user
        )
      );

      alert(
        data.message ||
          "User status updated successfully"
      );
    } catch (error) {
      console.error(
        "Toggle User Status Error:",
        error
      );

      alert(
        error.message ||
          "Failed to update user status"
      );
    }
  };

  // =====================================================
  // DELETE USER
  // =====================================================

  const deleteUser = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getToken();

      if (!token) {
        alert("Admin login token not found.");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/admin/users/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

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

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) => user._id !== id
        )
      );

      alert("User deleted successfully!");
    } catch (error) {
      console.error(
        "Delete User Error:",
        error
      );

      alert(
        error.message ||
          "Failed to delete user"
      );
    }
  };

  // =====================================================
  // FETCH COMPANIES
  // =====================================================

  const fetchCompanies = async () => {
    try {
      setCompaniesLoading(true);
      setCompaniesError("");

      const response = await fetch(
        `${API_URL}/api/jobs`
      );

      const data = await response.json();

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

      const jobsData = Array.isArray(data)
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

        companyMap[companyName].jobs += 1;

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
        !company.name.trim() ||
        !company.email.trim() ||
        !company.location.trim()
      ) {
        alert(
          "Please provide company name, email and location."
        );
        return;
      }

      const token = getToken();

      if (!token) {
        alert("Admin login token not found.");
        return;
      }

      const companyData = {
        name: company.name.trim(),
        email: company.email.trim(),
        location: company.location.trim(),
        website: company.website.trim(),
        description:
          company.description.trim(),
      };

      const response = await fetch(
        `${API_URL}/api/companies`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(companyData),
        }
      );

      const data = await response.json();

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
    localStorage.removeItem("token");
    localStorage.removeItem("adminLoggedIn");

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
          <h2>💼 JobPortal</h2>
          <p>Admin Panel</p>
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
          📊 Dashboard
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
          🏢 Companies
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
          💼 Jobs
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
          📄 Applications
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
          👥 Users
        </button>

        <button
          className="logout"
          onClick={logout}
        >
          🚪 Logout
        </button>

      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="main">

        {/* =================================================
            TOPBAR
        ================================================= */}

        <div className="topbar">

          <h1>Admin Dashboard</h1>

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

              <div className="card blue clickable-card"
              onClick={()=>setPage("selected")}>
                <div className="card-icon">
                  ✅
                  
                </div>

                <div>
                  <h2>
                    {selectedCandidates}
                  </h2>

                  <p>
                    Selected Candidates
                  </p>
                </div>
              </div>

              <div 
              className="card green clickable-card"
    onClick={() => setPage("jobs")}
>
                <div className="card-icon">
                  💼
                </div>

                <div>
                  <h2>
                    {jobs.length}
                  </h2>

                  <p>Jobs</p>
                </div>
              </div>

              <div className="card orange clickable-card"
    onClick={() => setPage("applications")}>
                <div className="card-icon">
                  📄
                </div>

                <div>
                  <h2>
                    {applications.length}
                  </h2>

                  <p>Applications</p>
                </div>
              </div>

              <div className="card purple clickable-card"
    onClick={() => setPage("users")}>
                <div className="card-icon">
                  👥
                </div>

                <div>
                  <h2>
                    {users.length}
                  </h2>

                  <p>Users</p>
                </div>
              </div>

            </div>

            {/* GRAPH + RECENT APPLICATIONS */}

            <div className="dashboard-grid">

              {/* APPLICATION CHART */}

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

                  {applications.length > 0 ? (

                    <ResponsiveContainer
                      width="100%"
                      height={300}
                    >

                      <LineChart
                        data={
                          applicationChartData
                        }
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

                      <div>📊</div>

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

                  {applications.length > 0 ? (

                    [...applications]
                      .sort(
                        (a, b) =>
                          new Date(
                            b.createdAt ||
                              b.appliedAt ||
                              0
                          ) -
                          new Date(
                            a.createdAt ||
                              a.appliedAt ||
                              0
                          )
                      )
                      .slice(0, 5)
                      .map(
                        (application) => {

                          const candidateName =
                            application
                              .candidate
                              ?.name ||
                            application
                              .candidate
                              ?.username ||
                            "Unknown Candidate";

                          return (
                            <div
                              className="recent-application"
                              key={
                                application._id
                              }
                            >

                              <div className="candidate-avatar">
                                {candidateName
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <div className="application-info">

                                <strong>
                                  {candidateName}
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
                                className={`status ${
                                  (
                                    application.status ||
                                    "Pending"
                                  ).toLowerCase()
                                }`}
                              >
                                {
                                  application.status ||
                                  "Pending"
                                }
                              </span>

                            </div>
                          );
                        }
                      )

                  ) : (

                    <div className="no-applications">

                      <div>📄</div>

                      <p>
                        No applications found
                      </p>

                    </div>

                  )}

                </div>

                <button
                  className="view-all-btn"
                  onClick={() =>
                    setPage("applications")
                  }
                >
                  View All Applications →
                </button>

              </div>

            </div>

          </div>
        )}

{/* =====================================================
    SELECTED CANDIDATES
===================================================== */}

{page === "selected" && (
  <div className="dashboard-content">

    <div className="panel">

      <div className="panel-header">

        <div>
          <h2>Selected Candidates</h2>
          <p>
            Candidates whose applications were accepted
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPage("dashboard")}
        >
          ← Back to Dashboard
        </button>

      </div>

      {applications
        .filter(
          (application) =>
            String(application.status || "")
              .trim()
              .toLowerCase() === "accepted"
        )
        .length === 0 ? (

        <div className="empty-state">
          <h3>No Selected Candidates</h3>

          <p>
            There are no accepted applications yet.
          </p>
        </div>

      ) : (

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Candidate</th>
                <th>Email</th>
                <th>Job</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {applications
                .filter(
                  (application) =>
                    String(application.status || "")
                      .trim()
                      .toLowerCase() === "accepted"
                )
                .map((application) => (

                  <tr key={application._id}>

                    <td>
                      {application.candidate?.name ||
                        application.candidate?.username ||
                        "Candidate"}
                    </td>

                    <td>
                      {application.candidate?.email ||
                        "N/A"}
                    </td>

                    <td>
                      {application.job?.title ||
                        "Job"}
                    </td>

                    <td>
                      <span className="status-badge accepted">
                        Accepted
                      </span>
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      )}

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
                <h2>Companies</h2>

                <p>
                  Companies available through posted jobs
                </p>
              </div>

              <button
                type="button"
                onClick={fetchCompanies}
              >
                Refresh
              </button>

            </div>

            {companiesLoading && (
              <p>Loading companies...</p>
            )}

            {companiesError && (
              <div>

                <p
                  style={{
                    color: "red",
                  }}
                >
                  {companiesError}
                </p>

                <button
                  type="button"
                  onClick={fetchCompanies}
                >
                  Try Again
                </button>

              </div>
            )}

            {!companiesLoading &&
              !companiesError && (

                companies.length > 0 ? (

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
                              {
                                companyItem
                                  .locations
                                  ?.length > 0
                                  ? companyItem.locations.join(
                                      ", "
                                    )
                                  : "Not specified"
                              }
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                ) : (

                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px",
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

                )

              )}

          </div>

        )}

        {/* =================================================
            JOBS
        ================================================= */}

        {page === "jobs" && (

          <div className="panel">

            <div className="panel-header">

              <div>
                <h2>Manage Jobs</h2>

                <p>
                  Create, edit and delete job postings
                </p>
              </div>

              <button
                type="button"
                onClick={fetchJobs}
              >
                Refresh
              </button>

            </div>

            {jobsLoading && (
              <p>Loading jobs...</p>
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
                    title: e.target.value,
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
                    company: e.target.value,
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
                    location: e.target.value,
                  })
                }
              />

              <select
                value={job.type}
                onChange={(e) =>
                  setJob({
                    ...job,
                    type: e.target.value,
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
                    salary: e.target.value,
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
                    skills: e.target.value,
                  })
                }
              />

              <textarea
                placeholder="Job Description"
                value={job.description}
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
                value={job.responsibilities}
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
                value={job.eligibility}
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
                value={job.requirements}
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

              {editingJobId ? (

                <div className="form-actions">

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
                    onClick={resetJobForm}
                  >
                    Cancel
                  </button>

                </div>

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

            <div className="panel-header">

              <div>

                <h2>
                  Applications
                </h2>

                <p>
                  Manage candidate applications
                </p>

              </div>

              <button
                type="button"
                onClick={fetchApplications}
              >
                Refresh
              </button>

            </div>

            {applicationsLoading && (
              <p>
                Loading applications...
              </p>
            )}

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
                        Resume
                      </th>

                      <th>
                        Action
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {applications.length > 0 ? (

                      applications.map(
                        (application) => {

                          const candidateName =
                            application
                              .candidate
                              ?.name ||
                            application
                              .candidate
                              ?.username ||
                            "Unknown Candidate";

                          const resumeUrl =
                            getResumeUrl(
                              application
                            );

                          return (

                            <tr
                              key={
                                application._id
                              }
                            >

                              {/* CANDIDATE */}

                              <td>

                                <strong>
                                  {
                                    candidateName
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
                                    "Pending"
                                  }
                                  onChange={(e) =>
                                    updateStatus(
                                      application._id,
                                      e.target.value
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
{/* RESUME */}

<td>

  {application.resume ? (

    <div className="resume-actions">

      <button
        type="button"
        className="view-resume-btn"
        onClick={() =>
          viewResume(application)
        }
      >
        👁 View Resume
      </button>

      <button
        type="button"
        className="download-resume-btn"
        onClick={() =>
          downloadResume(application)
        }
      >
        ⬇ Download
      </button>

    </div>

  ) : (

    <span className="no-resume">
      No Resume
    </span>

  )}

</td>


{/* ACTION */}

<td>

  <button
    type="button"
    className="delete"
    onClick={() =>
      deleteApplication(application._id)
    }
  >
    Delete
  </button>

</td>
                    
  

                            </tr>

                          );
                        }
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="5"
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

            {/* SEARCH */}

            <div className="user-search">

              <input
                type="text"
                placeholder="Search by name, email or role..."
                value={userSearch}
                onChange={(e) =>
                  setUserSearch(
                    e.target.value
                  )
                }
              />

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

                      filteredUsers.map(
                        (u) => (

                          <tr
                            key={
                              u._id
                            }
                          >

                            {/* NAME */}

                            <td>

                              {
                                u.name ||
                                u.username ||
                                "No Name"
                              }

                            </td>

                            {/* EMAIL */}

                            <td>
                              {u.email}
                            </td>

                            {/* ROLE */}

                            <td>

                              <span
                                className={
                                  u.role ===
                                  "admin"
                                    ? "role-admin"
                                    : "role-candidate"
                                }
                              >
                                {u.role}
                              </span>

                            </td>

                            {/* STATUS */}

                            <td>

                              {u.role ===
                              "admin" ? (

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

                              {u.role !==
                              "admin" ? (

                                <div className="user-actions">

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

                                <span className="admin-protected">
                                  Protected
                                </span>

                              )}

                            </td>

                          </tr>

                        )
                      )

                    ) : (

                      <tr>

                        <td
                          colSpan="5"
                          style={{
                            textAlign:
                              "center",
                            padding:
                              "30px",
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