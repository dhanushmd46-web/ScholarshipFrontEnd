import { Link, NavLink, useNavigate } from 'react-router-dom'

export default function Header({ onLogout }) {
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    if (onLogout) onLogout()
    navigate('/', { replace: true })
  }

  return (
    <header className="sam-header">
      <div className="sam-header-brand">
        <span className="sam-header-logo">◆</span>
        <Link to="/scholarship" className="sam-header-title-link">
          Student Scholarship Management
        </Link>
      </div>
      <nav className="sam-header-nav">
        <NavLink
          to="/scholarship"
          className={({ isActive }) =>
            isActive ? 'sam-header-nav-item sam-nav-active' : 'sam-header-nav-item'}
        >
          Scholarships
        </NavLink>
        <NavLink
          to="/application"
          className={({ isActive }) =>
            isActive ? 'sam-header-nav-item sam-nav-active' : 'sam-header-nav-item'}
        >
          Applications
        </NavLink>
        <button className="sam-btn-logout" onClick={handleLogout}>
          Sign Out
        </button>
      </nav>
    </header>
  )
}