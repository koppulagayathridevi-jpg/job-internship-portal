// // import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// // import Navbar from "./components/Navbar";
// // import Footer from "./components/Footer";

// // import Home from "./pages/Home";
// // import Login from "./pages/Login";
// // import Register from "./pages/Register";
// // import Jobs from "./pages/Jobs";
// // import JobDetails from "./pages/JobDetails";
// // import CandidateDashboard from "./pages/CandidateDashboard";
// // import ApplicationsPage from "./pages/ApplicationsPage";
// // import MyProfile from "./pages/MyProfile";
// // import AdminDashboard from "./pages/AdminDashboard";


// // function AppContent() {

// //     const location = useLocation();

// //     // Pages where Navbar and Footer should NOT appear
// //     const hideNavbarFooter =
// //         location.pathname === "/candidate-dashboard" ||
// //         location.pathname === "/admin-dashboard";


// //     return (
// //         <>

// //             {/* Navbar */}
// //             {!hideNavbarFooter && <Navbar />}


// //             {/* Main Content */}
// //             <main>

// //                 <Routes>

// //                     <Route
// //                         path="/"
// //                         element={<Home />}
// //                     />

// //                     <Route
// //                         path="/login"
// //                         element={<Login />}
// //                     />

// //                     <Route
// //                         path="/register"
// //                         element={<Register />}
// //                     />

// //                     <Route
// //                         path="/jobs"
// //                         element={<Jobs />}
// //                     />

// //                     <Route
// //                         path="/jobs/:id"
// //                         element={<JobDetails />}
// //                     />

// //                     <Route
// //                         path="/candidate-dashboard"
// //                         element={<CandidateDashboard />}
// //                     />
// //                     <Route
// //                     path="/applications"
// //                     element={<ApplicationsPage />}
// //                 />
// //                 <Route
// //     path="/profile"
// //     element={<MyProfile />}
// // />


// //                     <Route
// //                         path="/admin-dashboard"
// //                         element={<AdminDashboard />}
// //                     />

// //                 </Routes>

// //             </main>


// //             {/* Footer */}
// //             {!hideNavbarFooter && <Footer />}

// //         </>
// //     );
// // }


// // function App() {

// //     return (
// //         <BrowserRouter>

// //             <AppContent />

// //         </BrowserRouter>
// //     );
// // }


// // export default App;



// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     useLocation
// } from "react-router-dom";

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";

// import ProtectedRoute from "./components/ProtectedRoute";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Jobs from "./pages/Jobs";
// import JobDetails from "./pages/JobDetails";

// import CandidateDashboard from "./pages/CandidateDashboard";
// import ApplicationsPage from "./pages/ApplicationsPage";
// import MyProfile from "./pages/MyProfile";

// import AdminDashboard from "./pages/AdminDashboard";


// // =====================================================
// // APP CONTENT
// // =====================================================

// function AppContent() {

//     const location = useLocation();

//     // =================================================
//     // HIDE NAVBAR & FOOTER ON DASHBOARDS
//     // =================================================

//     const hideNavbarFooter =
//         location.pathname === "/candidate-dashboard" ||
//         location.pathname === "/admin-dashboard";


//     return (
//         <>

//             {/* =========================================
//                 NAVBAR
//             ========================================= */}

//             {!hideNavbarFooter && <Navbar />}


//             {/* =========================================
//                 MAIN CONTENT
//             ========================================= */}

//             <main>

//                 <Routes>


//                     {/* =================================================
//                         PUBLIC ROUTES
//                     ================================================= */}

//                     <Route
//                         path="/"
//                         element={<Home />}
//                     />

//                     <Route
//                         path="/login"
//                         element={<Login />}
//                     />

//                     <Route
//                         path="/register"
//                         element={<Register />}
//                     />


//                     {/* =================================================
//                         PUBLIC JOB DETAILS
//                     ================================================= */}

//                     <Route
//                         path="/jobs/:id"
//                         element={<JobDetails />}
//                     />


//                     {/* =================================================
//                         CANDIDATE PROTECTED ROUTES
//                     ================================================= */}

//                     <Route
//                         element={
//                             <ProtectedRoute
//                                 allowedRole="candidate"
//                             />
//                         }
//                     >

//                         {/* Candidate Dashboard */}

//                         <Route
//                             path="/candidate-dashboard"
//                             element={<CandidateDashboard />}
//                         />


//                         {/* Browse Jobs */}

//                         <Route
//                             path="/jobs"
//                             element={<Jobs />}
//                         />


//                         {/* Applications */}

//                         <Route
//                             path="/applications"
//                             element={<ApplicationsPage />}
//                         />


//                         {/* Candidate Profile */}

//                         <Route
//                             path="/profile"
//                             element={<MyProfile />}
//                         />

//                     </Route>


//                     {/* =================================================
//                         ADMIN PROTECTED ROUTES
//                     ================================================= */}

//                     <Route
//                         element={
//                             <ProtectedRoute
//                                 allowedRole="admin"
//                             />
//                         }
//                     >

//                         <Route
//                             path="/admin-dashboard"
//                             element={<AdminDashboard />}
//                         />

//                     </Route>


//                 </Routes>

//             </main>


//             {/* =========================================
//                 FOOTER
//             ========================================= */}

//             {!hideNavbarFooter && <Footer />}

//         </>
//     );
// }


// // =====================================================
// // MAIN APP
// // =====================================================

// function App() {

//     return (

//         <BrowserRouter>

//             <AppContent />

//         </BrowserRouter>

//     );
// }


// export default App;


import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

import CandidateDashboard from "./pages/CandidateDashboard";
import ApplicationsPage from "./pages/ApplicationsPage";
import MyProfile from "./pages/MyProfile";

import AdminDashboard from "./pages/AdminDashboard";


// =====================================================
// APP CONTENT
// =====================================================

function AppContent() {

    const location = useLocation();

    // =================================================
    // HIDE NAVBAR / FOOTER ON DASHBOARDS
    // =================================================

    const hideNavbarFooter =
        location.pathname === "/candidate-dashboard" ||
        location.pathname === "/admin-dashboard";


    return (
        <>

            {/* =================================================
                NAVBAR
            ================================================= */}

            {!hideNavbarFooter && <Navbar />}


            {/* =================================================
                MAIN
            ================================================= */}

            <main>

                <Routes>


                    {/* =================================================
                        PUBLIC ROUTES
                    ================================================= */}

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />


                    {/* =================================================
                        PUBLIC JOB DETAILS
                    ================================================= */}

                    <Route
                        path="/jobs/:id"
                        element={<JobDetails />}
                    />


                    {/* =================================================
                        CANDIDATE PROTECTED AREA
                    ================================================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRole="candidate"
                            />
                        }
                    >

                        {/* Candidate Dashboard */}

                        <Route
                            path="/candidate-dashboard"
                            element={<CandidateDashboard />}
                        />


                        {/* Browse Jobs */}

                        <Route
                            path="/jobs"
                            element={<Jobs />}
                        />


                        {/* Applications */}

                        <Route
                            path="/applications"
                            element={<ApplicationsPage />}
                        />


                        {/* Profile */}

                        <Route
                            path="/profile"
                            element={<MyProfile />}
                        />

                    </Route>


                    {/* =================================================
                        ADMIN PROTECTED AREA
                    ================================================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                allowedRole="admin"
                            />
                        }
                    >

                        <Route
                            path="/admin-dashboard"
                            element={<AdminDashboard />}
                        />

                    </Route>


                </Routes>

            </main>


            {/* =================================================
                FOOTER
            ================================================= */}

            {!hideNavbarFooter && <Footer />}

        </>
    );
}


// =====================================================
// APP
// =====================================================

function App() {

    return (
        <BrowserRouter>

            <AppContent />

        </BrowserRouter>
    );
}


export default App;

