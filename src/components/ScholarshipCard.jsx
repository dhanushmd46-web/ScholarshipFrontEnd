import { Link } from "react-router-dom";
 
export default function ScholarshipCard({ scholarship, onDelete }) {
    const { id, name, description, amount, deadline, eligibility } = scholarship
 
    return (
        <div className="sam-scholarship-card">
            <div className="sam-scholarship-card-accent"></div>
            <div className="sam-scholarship-card-body">
                <div className="sam-scholarship-card-header">
                    <h3 className="sam-scholarship-card-name">{name}</h3>
                    <span className="sam-scholarship-amount">₹{Number(amount).toLocaleString()}</span>
                </div>
                <p className="sam-scholarship-desc">{description}</p>
                <div className="sam-scholarship-meta">
                    <div className="sam-scholarship-meta-item">
                        <span className="sam-scholarship-meta-dot"></span>
                        Deadline: {deadline}
                    </div>
                    <div className="sam-scholarship-meta-item">
                        <span className="sam-scholarship-meta-dot"></span>
                        {eligibility}
                    </div>
                </div>
            </div>
            <div className="sam-scholarship-card-actions">
                <Link
                    to={`/scholarship/edit/${id}`}
                    className="sam-btn sam-btn-outline"
                    style={{ fontSize: "0.8125rem", padding: "0.375rem 0.875rem" }}
                >
                    Edit
                </Link>
                <button
                    className="sam-btn"
                    onClick={() => onDelete(id)}
                    style={{ fontSize: "0.8125rem", padding: "0.375rem 0.875rem", background: "white", border: "1px solid #e8edf2", color: "#c0392b" }}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}