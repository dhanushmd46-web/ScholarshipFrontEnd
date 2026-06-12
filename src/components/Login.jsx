import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from '../api/client'
 
export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)  
    try {
      const response = await client.post('/auth/login', { username, password })
      localStorage.setItem('token', response.data.access_token)
      if (onLoginSuccess) onLoginSuccess()
      navigate('/scholarship', { replace: true })
    } catch (err) {
      if (err.response?.status === 422) {
        const details = err.response.data.detail
        if (Array.isArray(details)) {
          setError(`${details[0].loc.join('.')} : ${details[0].msg}`)
        } else {
          setError('Validation error occurred.')
        }
      } else if (err.response) {
        setError(err.response.data.detail || 'Login failed')
      } else {
        setError('Cannot reach the server. Is FastAPI running?')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sam-auth-card">
      <h2 className="sam-auth-title">Welcome Back</h2>
      <p className="sam-auth-subtitle">Sign in to manage scholarships</p>
      {error && <div className="sam-alert sam-alert-error">{error}</div>}
      <form onSubmit={handleSubmit} className="sam-form">
        <div className="sam-form-group">
          <label className="sam-label">Username</label>
          <input
            type="text"
            className="sam-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            autoComplete="username"
            required
          />
        </div>
        <div className="sam-form-group">
          <label className="sam-label">Password</label>
          <input
            type="password"
            className="sam-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          className="sam-btn sam-btn-primary sam-btn-full"
          disabled={loading || !username || !password}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
      <p className="sam-auth-switch">
        No account?{' '}
        <Link to="/register" className="sam-auth-switch-btn">Sign Up</Link>
      </p>
    </div>
  )
}