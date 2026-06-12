import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

export default function ApplicationList() {
    const [applications, setApplications] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchApplication = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await client.get("/application");
            setApplications(response.data);
        } catch(err) {
            setError("Failed To Load Applications. Please Try Again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplication();
    }, []);

    if (loading) {
        return (
            <div className="sam-status">
                <div className="sam-spinner"></div>
                Loading Applications...
            </div>
        );
    }

    if (error) {
        return (
            <div className="sam-status sam-status-error">
                {error}
                <button className="sam-btn sam-btn-outline" onClick={fetchApplication}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <section className="sam-section">
            <div className="sam-section-header">
                <div>
                    <h2 className="sam-section-title">All Applications</h2>
                    <p className="sam-section-sub">{applications.length} listing{applications.length !== 1 ? "s" : ""}</p>
                </div>
                <Link to="/application/new" className="sam-btn sam-btn-primary">+ Add Application</Link>
            </div>
            
            {applications.length === 0 ? (
                <div className="sam-empty">
                    <div className="sam-empty-icon">📋</div>
                    <div className="sam-empty-title">No Application Yet</div>
                    <p className="sam-empty-text">Add The First Application To Get Started.</p>
                    <Link to="/application/new" className="sam-btn sam-btn-primary">Add Application</Link>
                </div>
            ) : (
                <div className="sam-scholarship-grid">
                    {applications.map((item) => (
                        <div key={item.id} className="sam-scholarship-card">
                            <div className="sam-scholarship-card-accent"></div>
                            <div className="sam-scholarship-card-body">
                                <div className="sam-scholarship-card-header">
                                    <h3 className="sam-scholarship-card-name">Application #{item.id}</h3>
                                    <span className="sam-scholarship-amount" style={{ fontSize: "0.85rem", padding: "4px 8px" }}>
                                        {item.status}
                                    </span>
                                </div>
                                <p className="sam-scholarship-desc">{item.statement}</p>
                                <div className="sam-scholarship-meta">
                                    <div className="sam-scholarship-meta-item">
                                        <span className="sam-scholarship-meta-dot"></span>
                                        Applied On: {new Date(item.applied_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            
                            {/* THIS SECTION ADDS THE ACTION BUTTON VISUALLY */}
                            <div className="sam-scholarship-card-actions">
                                <Link
                                    to={`/application/edit/${item.id}`}
                                    className="sam-btn sam-btn-outline"
                                    style={{ fontSize: "0.8125rem", padding: "0.375rem 0.875rem", width: "100%", textAlign: "center" }}
                                >
                                    Edit Application
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}