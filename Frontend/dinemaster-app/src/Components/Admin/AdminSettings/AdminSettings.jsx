import React, { useState, useEffect, useContext } from 'react';
import './AdminSettings.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaSave, FaStore, FaClock, FaRupeeSign, FaCheckCircle } from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';

const AdminSettings = () => {
    const { fetchSettings, saveSettings } = useContext(StoreContext);

    const [settings, setSettings] = useState({
        restaurantName: 'DineMaster',
        contactPhone: '+91 99887 76655',
        address: '123 Food Street, Flavor Town',
        currentStatus: 'Open for Business',
        taxRate: 5,
        serviceCharge: 10,
        currency: 'Indian Rupee (₹)',
        weekdayOpen: '09:00',
        weekdayClose: '22:00',
        weekendOpen: '10:00',
        weekendClose: '23:00',
    });
    const [loading, setLoading] = useState(true);
    const [saved, setSaved]     = useState(false);
    const [saving, setSaving]   = useState(false);

    useEffect(() => {
        fetchSettings()
            .then(res => setSettings(res.data))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [fetchSettings]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await saveSettings(settings);
            setSettings(res.data);
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch {
            alert("Failed to save settings.");
        } finally {
            setSaving(false);
        }
    };

    const set = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));

    if (loading) return (
        <div className="admin-container"><AdminSidebar />
            <div className="admin-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <p>Loading settings…</p>
            </div>
        </div>
    );

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div className="admin-content">
                <header className="admin-header">
                    <h1>⚙️ Restaurant Settings</h1>
                    {saved && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#27ae60', fontWeight: 600 }}>
                            <FaCheckCircle /> Settings saved!
                        </div>
                    )}
                </header>

                <div className="settings-grid">
                    <div className="setting-card">
                        <div className="s-card-header"><FaStore /> <h3>General Info</h3></div>
                        <div className="form-group">
                            <label>Restaurant Name</label>
                            <input type="text" value={settings.restaurantName} onChange={e => set('restaurantName', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Contact Phone</label>
                            <input type="text" value={settings.contactPhone} onChange={e => set('contactPhone', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" value={settings.address} onChange={e => set('address', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Current Status</label>
                            <select value={settings.currentStatus} onChange={e => set('currentStatus', e.target.value)}>
                                <option>Open for Business</option>
                                <option>Temporarily Closed</option>
                                <option>Busy (High Wait Time)</option>
                            </select>
                        </div>
                    </div>

                    <div className="setting-card">
                        <div className="s-card-header"><FaRupeeSign /> <h3>Financials</h3></div>
                        <div className="form-group">
                            <label>GST / Tax Rate (%)</label>
                            <input type="number" value={settings.taxRate} onChange={e => set('taxRate', parseFloat(e.target.value))} />
                        </div>
                        <div className="form-group">
                            <label>Service Charge (%)</label>
                            <input type="number" value={settings.serviceCharge} onChange={e => set('serviceCharge', parseFloat(e.target.value))} />
                        </div>
                        <div className="form-group">
                            <label>Currency</label>
                            <input type="text" value={settings.currency} disabled style={{ background: '#eee' }} />
                        </div>
                    </div>

                    <div className="setting-card">
                        <div className="s-card-header"><FaClock /> <h3>Operating Hours</h3></div>
                        <div className="hours-row">
                            <span>Weekdays:</span>
                            <input type="time" value={settings.weekdayOpen} onChange={e => set('weekdayOpen', e.target.value)} />
                            –
                            <input type="time" value={settings.weekdayClose} onChange={e => set('weekdayClose', e.target.value)} />
                        </div>
                        <div className="hours-row">
                            <span>Weekends:</span>
                            <input type="time" value={settings.weekendOpen} onChange={e => set('weekendOpen', e.target.value)} />
                            –
                            <input type="time" value={settings.weekendClose} onChange={e => set('weekendClose', e.target.value)} />
                        </div>
                    </div>
                </div>

                <button className="save-settings-btn" onClick={handleSave} disabled={saving}>
                    <FaSave /> {saving ? 'Saving…' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
};

export default AdminSettings;
