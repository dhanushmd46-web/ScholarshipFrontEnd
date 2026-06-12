import { Link } from 'react-router-dom'
 
export default function LandingPage() {
  return (
    <div className="sam-landing">
      <div className="sam-landing-card">
        <div className="sam-landing-logo">◆</div>
        <h1 className="sam-landing-title">Student Scholarship Management</h1>
        <p className="sam-landing-subtitle">
          Keep track of scholarships with ease. Add, view, and manage scholarship listings.
        </p>
        <div className="sam-landing-actions">
          <Link to="/login" className="sam-btn sam-btn-primary sam-btn-lg">
            Sign In
          </Link>
          <Link to="/register" className="sam-btn sam-btn-outline sam-btn-lg">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}