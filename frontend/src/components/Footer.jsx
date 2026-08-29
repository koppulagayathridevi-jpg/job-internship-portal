import "../styles/footer.css";

function Footer() {
    return (
        <footer className="job-footer">

            <div className="job-footer-container">

                {/* Brand */}
                <div className="job-footer-brand">

                    <a href="/" className="job-footer-logo">
                        <span className="job-footer-logo-icon">
                            💼
                        </span>

                        <span>JobPortal</span>
                    </a>

                    <p>
                        Connecting talented job seekers with
                        exciting career opportunities and internships.
                    </p>

                </div>


                {/* Quick Links */}
                <div className="job-footer-column">

                    <h4>Quick Links</h4>

                    <a href="/">Home</a>

                    <a href="/jobs">Jobs</a>

                    <a href="/internships">Internships</a>

                    <a href="/about">About Us</a>

                </div>


                {/* For Candidates */}
                <div className="job-footer-column">

                    <h4>For Candidates</h4>

                    <a href="/jobs">Find Jobs</a>

                    <a href="/internships">Find Internships</a>

                    <a href="/register">Create Account</a>

                    <a href="/login">Login</a>

                </div>


                {/* Support */}
                <div className="job-footer-column">

                    <h4>Support</h4>

                    <a href="/contact">Contact Us</a>

                    <a href="/privacy">Privacy Policy</a>

                    <a href="/terms">Terms & Conditions</a>

                    <a href="/help">Help Center</a>

                </div>


                {/* Social */}
                <div className="job-footer-column">

                    <h4>Follow Us</h4>

                    <div className="job-social-links">

                        <a href="#" aria-label="Facebook">
                            f
                        </a>

                        <a href="#" aria-label="Instagram">
                            ◎
                        </a>

                        <a href="#" aria-label="LinkedIn">
                            in
                        </a>

                    </div>

                </div>

            </div>


            {/* Footer Bottom */}
            <div className="job-footer-bottom">

                <p>
                    © 2026 JobPortal. All rights reserved.
                    &nbsp; | &nbsp;
                    Job & Internship Management Portal
                </p>

            </div>

        </footer>
    );
}

export default Footer;