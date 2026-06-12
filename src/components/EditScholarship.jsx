import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import client from "../api/client";
import Header from "./Header";
 
export default function EditScholarship() {
    const { id } = useParams()
    const navigate = useNavigate()
 
    const [form, setForm] = useState({ name: "", description: "", amount: "", deadline: "", eligibility: "" })
    const [fetching, setFetching] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
 
    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const response = await client.get(`/scholarship/${id}`)
                const s = response.data
                setForm({
                    name: s.name,
                    description: s.description,
                    amount: s.amount,
                    deadline: s.deadline,
                    eligibility: s.eligibility,
                })
            } catch (err) {
                setError("Scholarship not found.")
            } finally {
                setFetching(false)
            }
        }
        fetchScholarship()
    }, [id])
 
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setSaving(true)
        try {
            await client.put(`/scholarship/${id}`, {
                ...form,
                amount: Number(form.amount),
            })
            navigate("/scholarship")
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to update scholarship")
        } finally {
            setSaving(false)
        }
    }
 
    if (fetching) {
        return (
            <>
                <Header />
                <main className="sam-main">
                    <div className="sam-status">Loading scholarship...</div>
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
                        <Link to="/scholarship" className="sam-back-link">← Back to Scholarships</Link>
                        <h2 className="sam-form-page-title">Edit Scholarship</h2>
                    </div>
                    {error && <div className="sam-alert sam-alert-error">{error}</div>}
                    <form onSubmit={handleSubmit} className="sam-form sam-form-wide">
                        <div className="sam-form-group">
                            <label className="sam-label">Scholarship Name</label>
                            <input
                                name="name"
                                type="text"
                                className="sam-input"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="sam-form-group">
                            <label className="sam-label">Description</label>
                            <input
                                name="description"
                                type="text"
                                className="sam-input"
                                value={form.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="sam-form-group">
                            <label className="sam-label">Amount (₹)</label>
                            <input
                                name="amount"
                                type="number"
                                className="sam-input"
                                value={form.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="sam-form-group">
                            <label className="sam-label">Deadline</label>
                            <input
                                name="deadline"
                                type="date"
                                className="sam-input"
                                value={form.deadline}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="sam-form-group">
                            <label className="sam-label">Eligibility</label>
                            <input
                                name="eligibility"
                                type="text"
                                className="sam-input"
                                value={form.eligibility}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="sam-btn sam-btn-primary"
                            disabled={saving}
                        >
                            {saving ? "Saving Changes..." : "Update Scholarship"}
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}