import "../styles/admin-dashboard.css";

function AdminDashboard() {
    return (
        <div className="admin-dashboard">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="admin-sidebar">

                {/* Logo */}

                <div className="admin-sidebar-brand">

                    <div className="admin-brand-icon">
                        💼
                    </div>

                    <div>
                        <h3>JobPortal</h3>
                        <span>Management Portal</span>
                    </div>

                </div>


                {/* Navigation */}

                <nav className="admin-sidebar-nav">

                    <a
                        href="#dashboard"
                        className="admin-nav-item active"
                    >
                        <span className="admin-nav-icon">▦</span>
                        <span>Dashboard</span>
                    </a>

                    <a
                        href="#jobs"
                        className="admin-nav-item"
                    >
                        <span className="admin-nav-icon">▣</span>
                        <span>Manage Jobs</span>
                    </a>

                    <a
                        href="#applications"
                        className="admin-nav-item"
                    >
                        <span className="admin-nav-icon">▤</span>
                        <span>Applications</span>
                    </a>

                    <a
                        href="#candidates"
                        className="admin-nav-item"
                    >
                        <span className="admin-nav-icon">♙</span>
                        <span>Candidates</span>
                    </a>

                    <a
                        href="#companies"
                        className="admin-nav-item"
                    >
                        <span className="admin-nav-icon">▥</span>
                        <span>Companies</span>
                    </a>

                    <a
                        href="#users"
                        className="admin-nav-item"
                    >
                        <span className="admin-nav-icon">♙</span>
                        <span>Users</span>
                    </a>

                    <a
                        href="#reports"
                        className="admin-nav-item"
                    >
                        <span className="admin-nav-icon">◩</span>
                        <span>Reports</span>
                    </a>

                </nav>


                {/* Logout */}

                <div className="admin-sidebar-bottom">

                    <a
                        href="#logout"
                        className="admin-nav-item logout"
                    >
                        <span className="admin-nav-icon">←</span>
                        <span>Logout</span>
                    </a>

                </div>

            </aside>


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <main className="admin-main">

                {/* =================================================
                    TOP HEADER
                ================================================= */}

                <header className="admin-topbar">

                    <div>

                        <h1>
                            Admin Dashboard
                        </h1>

                        <p>
                            Welcome back, Admin! Here is the overview.
                        </p>

                    </div>


                    {/* Admin Profile */}

                    <div className="admin-profile">

                        <div className="admin-avatar">
                            A
                        </div>

                        <div className="admin-profile-info">

                            <strong>
                                Admin
                            </strong>

                            <span>
                                Administrator
                            </span>

                        </div>

                        <span className="admin-profile-arrow">
                            ▼
                        </span>

                    </div>

                </header>


                {/* =================================================
                    STATISTICS
                ================================================= */}

                <section className="admin-stat-grid">

                    {/* Total Jobs */}

                    <div className="admin-stat-card blue">

                        <div className="admin-stat-icon">
                            💼
                        </div>

                        <div className="admin-stat-content">

                            <strong>
                                0
                            </strong>

                            <span>
                                Total Jobs
                            </span>

                        </div>

                    </div>


                    {/* Total Applicants */}

                    <div className="admin-stat-card green">

                        <div className="admin-stat-icon">
                            ♙
                        </div>

                        <div className="admin-stat-content">

                            <strong>
                                0
                            </strong>

                            <span>
                                Total Applicants
                            </span>

                        </div>

                    </div>


                    {/* Companies */}

                    <div className="admin-stat-card orange">

                        <div className="admin-stat-icon">
                            ▣
                        </div>

                        <div className="admin-stat-content">

                            <strong>
                                0
                            </strong>

                            <span>
                                Companies
                            </span>

                        </div>

                    </div>


                    {/* Users */}

                    <div className="admin-stat-card purple">

                        <div className="admin-stat-icon">
                            ♙
                        </div>

                        <div className="admin-stat-content">

                            <strong>
                                0
                            </strong>

                            <span>
                                Users
                            </span>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    DASHBOARD CONTENT
                ================================================= */}

                <section className="admin-content-grid">


                    {/* =================================================
                        APPLICATIONS OVERVIEW
                    ================================================= */}

                    <div className="admin-panel applications-panel">

                        <div className="admin-panel-header">

                            <div>

                                <h2>
                                    Applications Overview
                                </h2>

                                <p>
                                    No application activity yet
                                </p>

                            </div>

                            <button className="admin-more-button">
                                ⋮
                            </button>

                        </div>


                        {/* Empty Chart */}

                        <div className="admin-chart">

                            <div className="chart-y-axis">

                                <span>100</span>
                                <span>80</span>
                                <span>60</span>
                                <span>40</span>
                                <span>20</span>
                                <span>0</span>

                            </div>


                            <div className="chart-area">

                                <div className="chart-grid-line line-1"></div>
                                <div className="chart-grid-line line-2"></div>
                                <div className="chart-grid-line line-3"></div>
                                <div className="chart-grid-line line-4"></div>
                                <div className="chart-grid-line line-5"></div>


                                {/* Zero Application Line */}

                                <svg
                                    className="application-chart"
                                    viewBox="0 0 600 250"
                                    preserveAspectRatio="none"
                                >

                                    <polyline
                                        points="
                                            0,250
                                            100,250
                                            200,250
                                            300,250
                                            400,250
                                            500,250
                                            600,250
                                        "
                                    />

                                    <circle
                                        cx="0"
                                        cy="250"
                                        r="5"
                                    />

                                    <circle
                                        cx="100"
                                        cy="250"
                                        r="5"
                                    />

                                    <circle
                                        cx="200"
                                        cy="250"
                                        r="5"
                                    />

                                    <circle
                                        cx="300"
                                        cy="250"
                                        r="5"
                                    />

                                    <circle
                                        cx="400"
                                        cy="250"
                                        r="5"
                                    />

                                    <circle
                                        cx="500"
                                        cy="250"
                                        r="5"
                                    />

                                    <circle
                                        cx="600"
                                        cy="250"
                                        r="5"
                                    />

                                </svg>


                                <div className="chart-x-axis">

                                    <span>12 Aug</span>
                                    <span>13 Aug</span>
                                    <span>14 Aug</span>
                                    <span>15 Aug</span>
                                    <span>16 Aug</span>
                                    <span>17 Aug</span>
                                    <span>18 Aug</span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        RECENT APPLICATIONS
                    ================================================= */}

                    <div className="admin-panel recent-panel">

                        <div className="admin-panel-header">

                            <div>

                                <h2>
                                    Recent Applications
                                </h2>

                                <p>
                                    No applications available
                                </p>

                            </div>

                            <button className="admin-more-button">
                                ⋮
                            </button>

                        </div>


                        <div className="admin-table-wrapper">

                            <table className="admin-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Candidate
                                        </th>

                                        <th>
                                            Job Title
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {/* Empty State */}

                                    <tr>

                                        <td colSpan="3">
                                            No applications found
                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>


                        <button className="admin-view-button">
                            View All Applications
                        </button>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;

