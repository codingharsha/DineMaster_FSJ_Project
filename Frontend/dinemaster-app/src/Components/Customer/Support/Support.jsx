import React, { useState } from 'react';
import './Support.scss';
import { FaHeadset, FaPhoneAlt, FaEnvelope, FaComments, FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';

const FAQS = [
    'How to cancel reservation?',
    'How wallet refunds work?',
    'How coupons are applied?',
    'Payment failed but amount deducted?',
    'How Happiness Cards work?'
];

const Support = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        category: 'Reservation Help',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: '', email: '', category: 'Reservation Help', message: '' });
    };

    return (
        <div className="support-page customer-page-shell">
            <div className="support-hero">
                <h1><FaHeadset /> Customer Support Center</h1>
                <p>Get quick help with reservations, payments, refunds, coupons, and Happiness Cards.</p>
            </div>

            <div className="support-grid">
                <section className="support-card">
                    <h2><FaQuestionCircle /> Help Center & FAQ</h2>
                    <ul className="faq-list">
                        {FAQS.map((q) => <li key={q}>{q}</li>)}
                    </ul>
                </section>

                <section className="support-card">
                    <h2><FaComments /> Contact Support</h2>
                    <div className="contact-stack">
                        <p><FaPhoneAlt /> Phone Support: +91 98765 43210</p>
                        <p><FaEnvelope /> Email Support: support@dinemaster.com</p>
                        <p><FaComments /> Live Chat: Coming Soon</p>
                        <p>Refund Policy: Refunds are processed within 5-7 business days after validation.</p>
                    </div>
                </section>
            </div>

            <section className="support-card ticket-card">
                <h2><FaTicketAlt /> Raise a Ticket</h2>
                {submitted && <p className="support-success">Ticket submitted successfully. Our team will contact you shortly.</p>}
                <form onSubmit={handleSubmit} className="support-form">
                    <div className="support-form-grid">
                        <label>
                            Name
                            <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)} required />
                        </label>
                        <label>
                            Email
                            <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                        </label>
                        <label>
                            Issue Category
                            <select value={form.category} onChange={(e) => update('category', e.target.value)}>
                                <option>Reservation Help</option>
                                <option>Payment Issues</option>
                                <option>Refund Policy</option>
                                <option>Coupon & Offers</option>
                                <option>Happiness Cards</option>
                                <option>Other</option>
                            </select>
                        </label>
                        <label className="message-field">
                            Description / Message
                            <textarea rows={5} value={form.message} onChange={(e) => update('message', e.target.value)} required />
                        </label>
                    </div>
                    <button type="submit" className="dm-primary-btn">Submit Ticket</button>
                </form>
            </section>
        </div>
    );
};

export default Support;
