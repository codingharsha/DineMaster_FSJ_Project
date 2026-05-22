import React, { useState, useContext } from 'react';
import './FeedbackForm.scss';
import { FaStar } from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';

const StarPicker = ({ value, onChange, label }) => (
    <div className="star-picker">
        <label>{label}</label>
        <div className="stars">
            {[1, 2, 3, 4, 5].map(n => (
                <FaStar
                    key={n}
                    className={n <= value ? 'star active' : 'star'}
                    onClick={() => onChange(n)}
                />
            ))}
        </div>
    </div>
);

const FeedbackForm = () => {
    const { submitFeedback, userName } = useContext(StoreContext);

    const [form, setForm] = useState({
        customerName: userName || '',
        customerPhone: '',
        dishName: '',
        dishRating: 0,
        serviceRating: 0,
        comment: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading]     = useState(false);
    const [error, setError]         = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.dishRating || !form.serviceRating) {
            setError('Please rate both the dish and service.');
            return;
        }
        if (!form.comment.trim()) {
            setError('Please write a comment.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await submitFeedback(form);
            setSubmitted(true);
        } catch {
            setError('Failed to submit feedback. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) return (
        <div className="feedback-success">
            <div className="success-icon">🎉</div>
            <h2>Thank you for your feedback!</h2>
            <p>Your review helps us improve your dining experience.</p>
            <button onClick={() => { setSubmitted(false); setForm({ customerName: userName || '', customerPhone: '', dishName: '', dishRating: 0, serviceRating: 0, comment: '' }); }}>
                Submit Another
            </button>
        </div>
    );

    return (
        <div className="feedback-page">
            <div className="feedback-container">
                <div className="feedback-header">
                    <h1>Rate Your Experience</h1>
                    <p>Tell us how your meal was — your feedback matters!</p>
                </div>

                <form onSubmit={handleSubmit} className="feedback-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={form.customerName}
                                onChange={e => setForm({ ...form, customerName: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone (optional)</label>
                            <input
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={form.customerPhone}
                                onChange={e => setForm({ ...form, customerPhone: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Dish You Ordered</label>
                        <input
                            type="text"
                            placeholder="e.g. Chicken Biryani"
                            value={form.dishName}
                            onChange={e => setForm({ ...form, dishName: e.target.value })}
                            required
                        />
                    </div>

                    <div className="ratings-row">
                        <StarPicker
                            label="Dish Rating"
                            value={form.dishRating}
                            onChange={v => setForm({ ...form, dishRating: v })}
                        />
                        <StarPicker
                            label="Service Rating"
                            value={form.serviceRating}
                            onChange={v => setForm({ ...form, serviceRating: v })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Your Comment</label>
                        <textarea
                            placeholder="Tell us about your experience…"
                            rows={4}
                            value={form.comment}
                            onChange={e => setForm({ ...form, comment: e.target.value })}
                            required
                        />
                    </div>

                    {error && <p className="feedback-error">{error}</p>}

                    <button type="submit" className="submit-feedback-btn" disabled={loading}>
                        {loading ? 'Submitting…' : '🌟 Submit Feedback'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
