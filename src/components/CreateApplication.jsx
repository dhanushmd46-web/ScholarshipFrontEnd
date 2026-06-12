import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";
import Header from "./Header";
 
export default function CreateApplicationPage() {
    const [form, setForm] = useState({
        scholarship_id: "",
        user_id: "",
        statement: "",
        applied_at: "",
        status: "pending"
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
 
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            await client.post("/application", {
                ...form,
                scholarship_id: Number(form.scholarship_id),
                user_id: Number(form.user_id),
            })
            navigate("/application")
        } catch (err) {
            const detail = err.response?.data?.detail
            if (Array.isArray(detail)) {
                setError(detail.map(d => d.msg).join(", "))
            } else {
                setError(detail || "Failed to create application")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header />
            <main className="sam-main">
                <div className="sam-form-page">
                    <div className="sam-form-page-header">
                        <Link to="/application" className="sam-back-link">← Back to Applications</Link>
                        <h2 className="sam-form-page-title">Add Application</h2>
                    </div>
                    {error && <div className="sam-alert sam-alert-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="sam-form sam-form-wide">
                        <div className="sam-form-group">
                            <label className="sam-label">Scholarship ID</label>
                            <input
                                name="scholarship_id"
                                type="number"
                                className="sam-input"
                                value={form.scholarship_id}
                                onChange={handleChange}
                                placeholder="Enter scholarship ID"
                                required
                            />
                        </div>
                        <div className="sam-form-group">
                            <label className="sam-label">User ID</label>
                            <input
                                name="user_id"
                                type="number"
                                className="sam-input"
                                value={form.user_id}
                                onChange={handleChange}
                                placeholder="Enter user ID"
                                required
                            />
                        </div>
                        <div className="sam-form-group">
                            <label className="sam-label">Statement</label>
                            <textarea
                                name="statement"
                                className="sam-input sam-textarea"
                                value={form.statement}
                                onChange={handleChange}
                                placeholder="Write your application statement..."
                                rows={4}
                                required
                            />
                        </div>
                        <div className="sam-form-group">
                            <label className="sam-label">Applied At</label>
                            <input
                                name="applied_at"
                                type="date"
                                className="sam-input"
                                value={form.applied_at}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="sam-form-group">
                            <label className="sam-label">Status</label>
                            <select
                                name="status"
                                className="sam-input sam-select"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="sam-btn sam-btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}