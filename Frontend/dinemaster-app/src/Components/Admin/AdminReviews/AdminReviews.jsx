import React, { useState, useEffect, useContext, useCallback } from 'react';
import './AdminReviews.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaStar, FaRegStar, FaStarHalfAlt, FaUserTie, FaComments, FaArrowLeft, FaCheckCircle, FaTrash, FaReply } from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';

const AdminReviews = () => {
    const { fetchAllFeedback, fetchFeedbackSummary, replyToReview, flagReview, deleteReview } = useContext(StoreContext);

    const [activeSection, setSection]     = useState('overview');
    const [reviews, setReviews]           = useState([]);
    const [summary, setSummary]           = useState(null);
    const [filterSentiment, setFilter]    = useState('all');
    const [replyingId, setReplyingId]     = useState(null);
    const [replyText, setReplyText]       = useState('');
    const [loading, setLoading]           = useState(true);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const load = useCallback(async () => {
        try {
            const [revRes, sumRes] = await Promise.all([fetchAllFeedback(), fetchFeedbackSummary()]);
            setReviews(revRes.data);
            setSummary(sumRes.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [fetchAllFeedback, fetchFeedbackSummary]);

    useEffect(() => { load(); }, [load]);

    const handleReply = async (id) => {
        if (!replyText.trim()) return;
        await replyToReview(id, replyText);
        setReplyingId(null);
        setReplyText('');
        load();
    };

    const handleFlag = async (id, flagged) => {
        await flagReview(id, flagged);
        load();
    };

    const handleDelete = async (id) => {
        await deleteReview(id);
        load();
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) =>
            i < rating ? <FaStar key={i} className="star filled" /> : <FaRegStar key={i} className="star" />
        );
    };

    const filtered = filterSentiment === 'all' ? reviews : reviews.filter(r => r.sentiment === filterSentiment);
    const ratingBuckets = [5, 4, 3, 2, 1].map((r) => ({
        rating: r,
        count: reviews.filter((x) => (x.dishRating || 0) === r).length
    }));
    const maxBucket = Math.max(...ratingBuckets.map(b => b.count), 1);

    if (loading) return (
        <div className="admin-container"><AdminSidebar />
            <div className="admin-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading reviews…</p>
            </div>
        </div>
    );

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <div className="reviews-header">
                    <h1>Reports & Reviews Center</h1>
                    {activeSection !== 'overview' && (
                        <button className="back-btn" onClick={() => setSection('overview')}>
                            <FaArrowLeft /> Back
                        </button>
                    )}
                </div>

                {activeSection === 'overview' && (
                    <div className="overview-container">
                        <div className="rating-hero-card">
                            <div className="rating-left">
                                <span className="rating-label">Overall Restaurant Rating</span>
                                <div className="rating-score">
                                    {summary?.averageRating?.toFixed(1) ?? '–'}
                                    <span className="max-score"> / 5.0</span>
                                </div>
                                <div className="stars-row">
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                                    <span className="review-count">({summary?.total ?? 0} Reviews)</span>
                                </div>
                            </div>
                            <div className="rating-right">
                                <div className="stat-pill positive">
                                    <FaCheckCircle /> {summary
                                    ? Math.round((summary.positive / Math.max(summary.total, 1)) * 100)
                                    : 0}% Positive Feedback
                                </div>
                                <div className="sentiment-breakdown">
                                    <span className="s-pill positive">✅ {summary?.positive ?? 0} Positive</span>
                                    <span className="s-pill neutral">⚠️ {summary?.neutral ?? 0} Neutral</span>
                                    <span className="s-pill negative">❌ {summary?.negative ?? 0} Negative</span>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-widget" style={{ marginTop: 14 }}>
                            <div className="widget-header"><h2>Rating Distribution</h2></div>
                            {ratingBuckets.map((b) => (
                                <div key={b.rating} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 50px', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                                    <span>{b.rating} Star</span>
                                    <div style={{ height: 10, background: '#2a323f', borderRadius: 20, overflow: 'hidden' }}>
                                        <div style={{ width: `${(b.count / maxBucket) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#f26622,#ffb760)' }} />
                                    </div>
                                    <b>{b.count}</b>
                                </div>
                            ))}
                        </div>

                        <div className="split-cards-row">
                            <div className="category-card customers" onClick={() => setSection('customer')}>
                                <div className="icon-wrapper"><FaComments /></div>
                                <div className="card-info">
                                    <h2>Customer Feedback</h2>
                                    <p>View ratings, comments and complaints from dining customers.</p>
                                    <div className="mini-stats">
                                        <span><strong>{summary?.total ?? 0}</strong> Total</span>
                                        <span><strong>{summary?.negative ?? 0}</strong> Critical</span>
                                    </div>
                                </div>
                                <button className="enter-btn">View Reviews</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'customer' && (
                    <div className="detail-section animate-fade">
                        <div className="section-title">
                            <h2>Customer Feedback Log</h2>
                            <div className="filter-pills">
                                {['all', 'positive', 'neutral', 'negative'].map(s => (
                                    <button key={s} className={filterSentiment === s ? 'active' : ''} onClick={() => setFilter(s)}>
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {filtered.length === 0 && <p style={{ color: '#aaa', textAlign: 'center', padding: 40 }}>No reviews found.</p>}

                        <div className="reviews-list centered-grid">
                            {filtered.map(review => (
                                <div key={review.id} className={`review-item ${review.sentiment} ${review.flagged ? 'flagged-review' : ''}`}>
                                    <div className="r-head">
                                        <div className="r-user">
                                            <div className="avatar">{review.customerName?.charAt(0) ?? '?'}</div>
                                            <div>
                                                <h4>{review.customerName}</h4>
                                                <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                                                {review.flagged && <span style={{ color: 'red', marginLeft: 8, fontSize: 12 }}>🚩 Flagged</span>}
                                            </div>
                                        </div>
                                        <div className="r-stars">{renderStars(review.dishRating)}</div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 16, margin: '6px 0', fontSize: 13, color: '#666' }}>
                                        <span>🍽 Dish: <b>{review.dishName}</b></span>
                                        <span>⭐ Service: {review.serviceRating}/5</span>
                                    </div>

                                    <p className="r-text">"{review.comment}"</p>

                                    {review.adminReply && (
                                        <div style={{ background: '#f0f9ff', borderLeft: '3px solid #3498db', padding: '8px 12px', borderRadius: 6, marginTop: 8 }}>
                                            <strong style={{ fontSize: 12, color: '#3498db' }}>Admin Reply:</strong>
                                            <p style={{ margin: 0, fontSize: 13 }}>{review.adminReply}</p>
                                        </div>
                                    )}

                                    {replyingId === review.id && (
                                        <div style={{ marginTop: 8 }}>
                                            <textarea
                                                placeholder="Write your reply…"
                                                value={replyText}
                                                onChange={e => setReplyText(e.target.value)}
                                                style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ddd', resize: 'none' }}
                                                rows={3}
                                            />
                                            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                                                <button style={{ background: '#f26622', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}
                                                        onClick={() => handleReply(review.id)}>Submit</button>
                                                <button style={{ background: '#eee', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }}
                                                        onClick={() => { setReplyingId(null); setReplyText(''); }}>Cancel</button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="r-actions">
                                        <button className="reply-btn" onClick={() => setReplyingId(review.id)}><FaReply /> Reply</button>
                                        <button className="flag-btn" onClick={() => handleFlag(review.id, !review.flagged)}>
                                            {review.flagged ? '🔓 Unflag' : '🚩 Flag'}
                                        </button>
                                        <button className="flag-btn" style={{ background: '#fee', color: '#e74c3c' }}
                                                onClick={() => setDeleteTarget(review)}><FaTrash /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {deleteTarget && (
                    <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 420 }}>
                            <h3>Delete Review</h3>
                            <p>Are you sure you want to delete review from <b>{deleteTarget.customerName}</b>?</p>
                            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                                <button className="flag-btn" onClick={() => setDeleteTarget(null)}>Cancel</button>
                                <button
                                    className="reply-btn"
                                    style={{ background: '#e74c3c' }}
                                    onClick={async () => {
                                        await handleDelete(deleteTarget.id);
                                        setDeleteTarget(null);
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminReviews;
