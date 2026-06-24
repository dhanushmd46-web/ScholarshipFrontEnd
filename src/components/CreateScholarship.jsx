import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";
import Header from "./Header";
 
export default function CreateScholarshipPage() {
    const [form, setForm] = useState({ name: "", description: "", amount: "", deadline: "", eligibility: "" })
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
        await client.post("/scholarship", {
            ...form,
            amount: Number(form.amount),
        })
        navigate("/scholarship")
    } catch (err) {
        const backendError = err.response?.data?.detail;

        if (Array.isArray(backendError)) {
            // Extracts the specific field that failed and its reason
            const errorMessages = backendError.map(errObj => {
                const field = errObj.loc.slice(1).join("."); 
                return `${field ? field + ': ' : ''}${errObj.msg}`;
            }).join(", ");
            
            setError(errorMessages);
        } else {
            setError(typeof backendError === "string" ? backendError : "Failed to create scholarship");
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
                        <Link to="/scholarship" className="sam-back-link">← Back to Scholarships</Link>
                        <h2 className="sam-form-page-title">Add New Scholarship</h2>
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
                                placeholder="Enter scholarship name"
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
                                placeholder="Enter description"
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
                                placeholder="Enter amount"
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
                                placeholder="Enter eligibility criteria"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="sam-btn sam-btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Scholarship"}
                        </button>
                    </form>
                </div>
            </main>
        </>
    )
}