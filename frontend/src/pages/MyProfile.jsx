import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";

const MyProfile = () => {
    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        location: "",
        education: "",
        skills: ""
    });

    // =====================================================
    // LOAD PROFILE
    // =====================================================

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login first.");
                return;
            }

            console.log("========== GET PROFILE ==========");
            console.log("Token exists:", !!token);

            const response = await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log("GET profile status:", response.status);

            const data = await response.json();

            console.log("GET profile response:", data);

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    `Failed to load profile. Status: ${response.status}`
                );
            }

            if (!data.user) {
                throw new Error("User data not found.");
            }

            setUser(data.user);

            // Fill edit form
            setFormData({
                name: data.user.name || "",
                phone: data.user.phone || "",
                location: data.user.location || "",
                education: data.user.education || "",
                skills: Array.isArray(data.user.skills)
                    ? data.user.skills.join(", ")
                    : data.user.skills || ""
            });

        } catch (error) {
            console.error("Load Profile Error:", error);

            setError(
                error.message || "Failed to load profile."
            );
        } finally {
            setLoading(false);
        }
    };

    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    // =====================================================
    // EDIT PROFILE
    // =====================================================

    const handleEdit = () => {
        setSuccess("");
        setError("");

        setFormData({
            name: user?.name || "",
            phone: user?.phone || "",
            location: user?.location || "",
            education: user?.education || "",
            skills: Array.isArray(user?.skills)
                ? user.skills.join(", ")
                : user?.skills || ""
        });

        setIsEditing(true);
    };

    // =====================================================
    // CANCEL EDIT
    // =====================================================

    const handleCancel = () => {
        setIsEditing(false);
        setError("");
        setSuccess("");

        setFormData({
            name: user?.name || "",
            phone: user?.phone || "",
            location: user?.location || "",
            education: user?.education || "",
            skills: Array.isArray(user?.skills)
                ? user.skills.join(", ")
                : user?.skills || ""
        });
    };

    // =====================================================
    // SAVE PROFILE
    // =====================================================

    const handleSave = async () => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const token = localStorage.getItem("token");

            if (!token) {
                setError("Please login first.");
                setSaving(false);
                return;
            }

            // ---------------------------------------------
            // VALIDATION
            // ---------------------------------------------

            if (!formData.name.trim()) {
                setError("Full name is required.");
                setSaving(false);
                return;
            }

            console.log("========== UPDATE PROFILE ==========");
            console.log("Sending data:", formData);

            // ---------------------------------------------
            // PUT REQUEST
            // ---------------------------------------------

            const response = await fetch(
                "http://localhost:5000/api/profile",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                body: JSON.stringify({
    name: formData.name.trim(),
    phone: formData.phone.trim(),
    location: formData.location.trim(),
    education: formData.education.trim(),
    skills: formData.skills.trim()
})
                }
            );

            console.log(
                "PUT profile status:",
                response.status
            );

            const data = await response.json();

            console.log(
                "PUT profile response:",
                data
            );

            // ---------------------------------------------
            // ERROR
            // ---------------------------------------------

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    `Failed to update profile. Status: ${response.status}`
                );
            }

            // ---------------------------------------------
            // UPDATE SCREEN
            // ---------------------------------------------

            if (data.user) {
                setUser(data.user);

                setFormData({
                    name: data.user.name || "",
                    phone: data.user.phone || "",
                    location: data.user.location || "",
                    education: data.user.education || "",
                    skills: Array.isArray(data.user.skills)
                        ? data.user.skills.join(", ")
                        : data.user.skills || ""
                });

                // Optional: update localStorage user
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
            }

            setIsEditing(false);

            setSuccess(
                data.message ||
                "Profile updated successfully!"
            );

        } catch (error) {
            console.error(
                "Update Profile Error:",
                error
            );

            setError(
                error.message ||
                "Failed to update profile."
            );

        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // LOGOUT
    // =====================================================

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("candidateLoggedIn");

        navigate("/login");
    };

    // =====================================================
    // DASHBOARD
    // =====================================================

    const handleDashboard = () => {
        navigate("/candidate-dashboard");
    };

    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-container">

                    <div className="profile-loading">
                        <div className="spinner"></div>

                        <h3>
                            Loading Profile...
                        </h3>

                        <p>
                            Please wait while we fetch your profile.
                        </p>
                    </div>

                </div>
            </div>
        );
    }

    // =====================================================
    // ERROR
    // =====================================================

    if (error && !user) {
        return (
            <div className="profile-page">

                <div className="profile-container">

                    <div className="profile-error">

                        <div className="error-icon">
                            ⚠️
                        </div>

                        <h2>
                            Unable to Load Profile
                        </h2>

                        <p>
                            {error}
                        </p>

                        <div className="error-buttons">

                            <button
                                className="btn-primary"
                                onClick={loadProfile}
                            >
                                Try Again
                            </button>

                            <button
                                className="btn-secondary"
                                onClick={() => navigate("/login")}
                            >
                                Go to Login
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        );
    }

    // =====================================================
    // PROFILE PAGE
    // =====================================================

    return (
        <div className="profile-page">

            <div className="profile-container">

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="profile-header">

                    <button
                        className="back-button"
                        onClick={handleDashboard}
                    >
                        ← Back to Dashboard
                    </button>

                    <div className="profile-title">
                        <h1>My Profile</h1>

                        <p>
                            View and manage your account information
                        </p>
                    </div>

                </div>


                {/* ================================================= */}
                {/* SUCCESS MESSAGE */}
                {/* ================================================= */}

                {success && (
                    <div className="profile-success">
                        ✓ {success}
                    </div>
                )}


                {/* ================================================= */}
                {/* ERROR MESSAGE */}
                {/* ================================================= */}

                {error && user && (
                    <div className="profile-form-error">
                        ⚠️ {error}
                    </div>
                )}


                {/* ================================================= */}
                {/* PROFILE CARD */}
                {/* ================================================= */}

                <div className="profile-card">

                    {/* ================================================= */}
                    {/* PROFILE HEADER */}
                    {/* ================================================= */}

                    <div className="profile-top">

                        <div className="profile-avatar">
                            {user?.name
                                ? user.name.charAt(0).toUpperCase()
                                : "U"
                            }
                        </div>

                        <div className="profile-heading">

                            <h2>
                                {user?.name || "User"}
                            </h2>

                            <p>
                                ✉ {user?.email || "No email"}
                            </p>

                            <span className="role-badge candidate-role">
                                {user?.role
                                    ? user.role.charAt(0).toUpperCase() +
                                      user.role.slice(1)
                                    : "Candidate"
                                }
                            </span>

                        </div>

                        <div className="profile-status">

                            <span
                                className={`status-badge ${
                                    user?.isActive === false
                                        ? "inactive"
                                        : "active"
                                }`}
                            >
                                ●{" "}
                                {user?.isActive === false
                                    ? "Inactive"
                                    : "Active"
                                }
                            </span>

                            <small>
                                Account Status
                            </small>

                        </div>

                    </div>


                    {/* ================================================= */}
                    {/* PERSONAL INFORMATION */}
                    {/* ================================================= */}

                    <div className="profile-section">

                        <h3>
                            👤 Personal Information
                        </h3>

                        {!isEditing ? (

                            <div className="profile-grid">

                                <div className="profile-field">
                                    <label>
                                        Full Name
                                    </label>

                                    <div className="field-value">
                                        {user?.name || "Not provided"}
                                    </div>
                                </div>


                                <div className="profile-field">
                                    <label>
                                        Email Address
                                    </label>

                                    <div className="field-value">
                                        {user?.email || "Not provided"}
                                    </div>
                                </div>


                                <div className="profile-field">
                                    <label>
                                        Account Role
                                    </label>

                                    <div className="field-value">
                                        {user?.role
                                            ? user.role
                                                .charAt(0)
                                                .toUpperCase() +
                                              user.role.slice(1)
                                            : "Candidate"
                                        }
                                    </div>
                                </div>


                                <div className="profile-field">
                                    <label>
                                        Account Status
                                    </label>

                                    <div className="field-value">
                                        <span
                                            className={`status-badge ${
                                                user?.isActive === false
                                                    ? "inactive"
                                                    : "active"
                                            }`}
                                        >
                                            {user?.isActive === false
                                                ? "Inactive"
                                                : "Active"
                                            }
                                        </span>
                                    </div>
                                </div>

                            </div>

                        ) : (

                            <div className="edit-grid">

                                {/* NAME */}

                                <div className="edit-field">

                                    <label>
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                    />

                                </div>


                                {/* EMAIL - READ ONLY */}

                                <div className="edit-field">

                                    <label>
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                    />

                                    <small>
                                        Email cannot be changed.
                                    </small>

                                </div>


                                {/* PHONE */}

                                <div className="edit-field">

                                    <label>
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />

                                </div>


                                {/* LOCATION */}

                                <div className="edit-field">

                                    <label>
                                        Location
                                    </label>

                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Enter your location"
                                    />

                                </div>


                                {/* EDUCATION */}

                                <div className="edit-field">

                                    <label>
                                        Education
                                    </label>

                                    <input
                                        type="text"
                                        name="education"
                                        value={formData.education}
                                        onChange={handleChange}
                                        placeholder="Enter your education"
                                    />

                                </div>


                                {/* SKILLS */}

                                <div className="edit-field">

                                    <label>
                                        Skills
                                    </label>

                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="Python, Django, React"
                                    />

                                    <small>
                                        Separate skills with commas.
                                    </small>

                                </div>

                            </div>

                        )}

                    </div>


                    {/* ================================================= */}
                    {/* ADDITIONAL INFORMATION */}
                    {/* ================================================= */}

                    {!isEditing && (
                        <div className="profile-section">

                            <h3>
                                📋 Additional Information
                            </h3>

                            <div className="profile-grid">

                                <div className="profile-field">
                                    <label>
                                        Phone
                                    </label>

                                    <div className="field-value">
                                        {user?.phone ||
                                            user?.mobile ||
                                            "Not provided"
                                        }
                                    </div>
                                </div>


                                <div className="profile-field">
                                    <label>
                                        Location
                                    </label>

                                    <div className="field-value">
                                        {user?.location ||
                                            user?.city ||
                                            "Not provided"
                                        }
                                    </div>
                                </div>


                                <div className="profile-field">
                                    <label>
                                        Education
                                    </label>

                                    <div className="field-value">
                                        {user?.education ||
                                            user?.qualification ||
                                            "Not provided"
                                        }
                                    </div>
                                </div>


                                <div className="profile-field">
                                    <label>
                                        Skills
                                    </label>

                                    <div className="field-value">

                                        {Array.isArray(user?.skills)
                                            ? user.skills.join(", ")
                                            : user?.skills ||
                                              "Not provided"
                                        }

                                    </div>
                                </div>

                            </div>

                        </div>
                    )}


                    {/* ================================================= */}
                    {/* EDIT BUTTON */}
                    {/* ================================================= */}

                    {!isEditing && (
                        <div className="profile-edit-action">

                            <button
                                className="edit-profile-button"
                                onClick={handleEdit}
                            >
                                ✏️ Edit Profile
                            </button>

                        </div>
                    )}


                    {/* ================================================= */}
                    {/* SAVE / CANCEL */}
                    {/* ================================================= */}

                    {isEditing && (
                        <div className="profile-actions">

                            <button
                                className="save-button"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "✓ Save Changes"
                                }
                            </button>

                            <button
                                className="cancel-button"
                                onClick={handleCancel}
                                disabled={saving}
                            >
                                ✕ Cancel
                            </button>

                        </div>
                    )}


                    {/* ================================================= */}
                    {/* ACCOUNT INFORMATION */}
                    {/* ================================================= */}

                    {!isEditing && (
                        <div className="profile-section">

                            <h3>
                                🔐 Account Information
                            </h3>

                            <div className="profile-grid">

                                <div className="profile-field">

                                    <label>
                                        User ID
                                    </label>

                                    <div className="field-value small-text">
                                        {user?._id || "Not available"}
                                    </div>

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Account Created
                                    </label>

                                    <div className="field-value">
                                        {user?.createdAt
                                            ? new Date(
                                                user.createdAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric"
                                                }
                                            )
                                            : "Not available"
                                        }
                                    </div>

                                </div>


                                <div className="profile-field">

                                    <label>
                                        Last Updated
                                    </label>

                                    <div className="field-value">
                                        {user?.updatedAt
                                            ? new Date(
                                                user.updatedAt
                                            ).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric"
                                                }
                                            )
                                            : "Not available"
                                        }
                                    </div>

                                </div>

                            </div>

                        </div>
                    )}


                    {/* ================================================= */}
                    {/* BOTTOM ACTIONS */}
                    {/* ================================================= */}

                    {!isEditing && (
                        <div className="profile-bottom-actions">

                            <button
                                className="dashboard-button"
                                onClick={handleDashboard}
                            >
                                🏠 Go to Dashboard
                            </button>

                            <button
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                🚪 Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
};

export default MyProfile;