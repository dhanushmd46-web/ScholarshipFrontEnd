import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";
import ScholarshipCard from "./ScholarshipCard";
 
export default function ScholarshipList() {
    const [scholarships, setScholarships] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
 
    const fetchScholarships = async () => {
        setLoading(true)
        setError("")
        try {
            const response = await client.get("/scholarship")
            setScholarships(response.data)
        } catch (err) {
            setError("Failed to load scholarships. Please try again.")
        } finally {
            setLoading(false)
        }
    }
 
    useEffect(() => {
        fetchScholarships()
    }, [])
 
    const handleDelete = async (id) => {
        if (!window.confirm("Delete this scholarship? This cannot be undone.")) return
        try {
            await client.delete(`/scholarship/${id}`)
            fetchScholarships()
        } catch (err) {
            alert("Delete failed. Please try again.")
        }
    }
 
    if (loading) {
        return (
            <div className="sam-status">
                <div className="sam-spinner"></div>
                Loading scholarships...
            </div>
        )
    }
 
    if (error) {
        return (
            <div className="sam-status sam-status-error">
                {error}
                <button className="sam-btn sam-btn-outline" onClick={fetchScholarships}>Retry</button>
            </div>
        )
    }
 
    return (
        <section className="sam-section">
            <div className="sam-section-header">
                <div>
                    <h2 className="sam-section-title">All Scholarships</h2>
                    <p className="sam-section-sub">{scholarships.length} listing{scholarships.length !== 1 ? "s" : ""}</p>
                </div>
                <Link to="/scholarship/new" className="sam-btn sam-btn-primary">
                    + Add Scholarship
                </Link>
            </div>
 
            {scholarships.length === 0 ? (
                <div className="sam-empty">
                    <div className="sam-empty-icon">🎓</div>
                    <div className="sam-empty-title">No scholarships yet</div>
                    <p className="sam-empty-text">Add the first scholarship to get started.</p>
                    <Link to="/scholarship/new" className="sam-btn sam-btn-primary">Add Scholarship</Link>
                </div>
            ) : (
                <div className="sam-scholarship-grid">
                    {scholarships.map((scholarship) => (
                        <ScholarshipCard
                            key={scholarship.id}
                            scholarship={scholarship}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}