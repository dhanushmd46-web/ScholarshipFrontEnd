import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from '../api/client'
 
export default function RegisterForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)
    try {
      await client.post('/auth/register', { username:username, password, role: 'user' })
      setSuccess('Account created! Redirecting to login...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      if (err.response?.status === 422) {
        const details = err.response.data.detail
        if (Array.isArray(details)) {
          setError(`${details[0].loc.join('.')} : ${details[0].msg}`)
        } else {
          setError('Validation error occurred.')
        }
      } else {
        setError(err.response?.data?.detail || 'Registration failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="sam-auth-card">
      <h2 className="sam-auth-title">Create Account</h2>
      <p className="sam-auth-subtitle">Register</p>
      {error && <div className="sam-alert sam-alert-error">{error}</div>}
      {success && <div className="sam-alert" style={{ backgroundColor: '#f0fdf4', borderColor: '#86efac', color: '#166534' }}>{success}</div>}
      <form onSubmit={handleSubmit} className="sam-form">
        <div className="sam-form-group">
          <label className="sam-label">Username</label>
          <input
            type="text"
            className="sam-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
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
            placeholder="Choose a password"
            autoComplete="new-password"
            required
          />
        </div>
        <button
          type="submit"
          className="sam-btn sam-btn-primary sam-btn-full"
          disabled={loading || !username || !password}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
      <p className="sam-auth-switch">
        Already have an account?{' '}
        <Link to="/login" className="sam-auth-switch-btn">Sign in</Link>
      </p>
    </div>
  )
}