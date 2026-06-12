import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../api/client";
import Header from "./Header";
 
export default function EditApplication() {
    const { id } = useParams()
    const navigate = useNavigate()
 
    const [form, setForm] = useState({ scholarship_id: "", user_id: "", statement: "", applied_at: "", status: "" })
    const [fetching, setFetching] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
 
    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await client.get(`/application/${id}`)
                setForm(response.data)
            } catch (err) {
                setError("Application not found.")
            } finally {
                setFetching(false)
            }
        }
        fetchApplication()
    }, [id])
 
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSaving(true)
        try {
            await client.put(`/application/${id}`, form)
            navigate("/application")
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to update application")
        } finally {
            setSaving(false)
        }
    }
 
    if (fetching) {
        return (
            <>
                <Header />
                <main className="sam-main">
                    <div className="sam-status">Loading application details...</div>
                </main>
            </>
        )
    }
 
    return (
        <>
            <Header />
            <main className="sam-main">
                <div className="sam-form-page">
                    <div className="sam-form-page-header">
                        <Link to="/application" className="sam-back-link">← Back to Applications</Link>
                        <h2 className="sam-form-page-title">Edit Application #{id}</h2>
                    </div>
                    {error && <div className="sam-alert sam-alert-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="sam-form sam-form-wide">
                        <div className="sam-form-group">
                            <label className="sam-label">Statement</label>
                            <textarea
                                name="statement"
                                className="sam-input sam-textarea"
                                value={form.statement}
                                onChange={handleChange}
                                rows={5}
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
                                <option value="Under Review">Under Review</option>
                                <option value="Approved">Approved</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="sam-btn sam-btn-primary"
                            disabled={saving}
                        >
                            {saving ? "Saving Changes..." : "Update Application"}
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}