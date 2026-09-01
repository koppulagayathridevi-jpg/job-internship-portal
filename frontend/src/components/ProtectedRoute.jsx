// import { Navigate, Outlet } from "react-router-dom";

// function ProtectedRoute({ allowedRole }) {

//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");

//     // Not logged in
//     if (!token || !userData) {
//         return <Navigate to="/login" replace />;
//     }

//     try {
//         const user = JSON.parse(userData);

//         // Role not allowed
//         if (allowedRole && user.role !== allowedRole) {
//             if (user.role === "candidate") {
//                 return <Navigate to="/candidate-dashboard" replace />;
//             }

//             if (user.role === "admin") {
//                 return <Navigate to="/admin-dashboard" replace />;
//             }

//             return <Navigate to="/login" replace />;
//         }

//         return <Outlet />;

//     } catch (error) {

//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//         localStorage.removeItem("isLoggedIn");

//         return <Navigate to="/login" replace />;
//     }
// }

// export default ProtectedRoute;


import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRole }) {

    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    // =====================================================
    // NOT LOGGED IN
    // =====================================================

    if (!token || !userData) {
        return <Navigate to="/login" replace />;
    }

    // =====================================================
    // READ USER
    // =====================================================

    let user;

    try {
        user = JSON.parse(userData);
    } catch (error) {

        console.error("Invalid user data:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("adminLoggedIn");

        return <Navigate to="/login" replace />;
    }

    // =====================================================
    // ROLE PROTECTION
    // =====================================================

    if (user.role !== allowedRole) {

        // Candidate belongs to candidate dashboard
        if (user.role === "candidate") {
            return (
                <Navigate
                    to="/candidate-dashboard"
                    replace
                />
            );
        }

        // Admin belongs to admin dashboard
        if (user.role === "admin") {
            return (
                <Navigate
                    to="/admin-dashboard"
                    replace
                />
            );
        }

        // Unknown role
        return <Navigate to="/login" replace />;
    }

    // =====================================================
    // AUTHORIZED
    // =====================================================

    return <Outlet />;
}

export default ProtectedRoute;

