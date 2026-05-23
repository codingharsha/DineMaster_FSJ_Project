import React, { useState, useEffect, useContext } from 'react';
import './AdminSettings.scss';
import { FaSave, FaCheckCircle } from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';
import AdminPageLayout from '../AdminPageLayout/AdminPageLayout';

const Toggle = ({ label, checked, onChange }) => (
    <label className="setting-toggle">
        <span>{label}</span>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
);

const AdminSettings = () => {
    const { fetchSettings, saveSettings } = useContext(StoreContext);

    const [settings, setSettings] = useState({
        restaurantName: 'DineMaster',
        contactPhone: '+91 99887 76655',
        address: '123 Food Street, Flavor Town',
        currentStatus: 'Open for Business',
        taxRate: 5,
        serviceCharge: 10,
        currency: 'Indian Rupee (Rs.)',
        weekdayOpen: '09:00',
        weekdayClose: '22:00',
        weekendOpen: '10:00',
        weekendClose: '23:00',
        deliveryRadius: 8,
        reservationLimit: 120,
        inventoryThreshold: 15,
        autoPayroll: true,
        paymentCOD: true,
        paymentCard: true,
        paymentUPI: true,
        notifyLowStock: true,
        notifyNegativeReviews: true
    });
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saveError, setSaveError] = useState('');

    useEffect(() => {
        fetchSettings()
            .then(res => setSettings((prev) => ({ ...prev, ...(res.data || {}) })))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [fetchSettings]);

    const handleSave = async () => {
        setSaving(true);
        setSaveError('');
        try {
            const payload = {
                restaurantName: settings.restaurantName,
                contactPhone: settings.contactPhone,
                address: settings.address,
                currentStatus: settings.currentStatus,
                taxRate: Number(settings.taxRate),
                serviceCharge: Number(settings.serviceCharge),
                currency: settings.currency,
                weekdayOpen: settings.weekdayOpen,
                weekdayClose: settings.weekdayClose,
                weekendOpen: settings.weekendOpen,
                weekendClose: settings.weekendClose
            };
            const res = await saveSettings(payload);
            setSettings((prev) => ({ ...prev, ...(res.data || {}) }));
            setSaved(true);
            setTimeout(() => setSaved(false), 2200);
        } catch {
            setSaveError("Failed to save settings. Please retry.");
        } finally {
            setSaving(false);
        }
    };

    const set = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));

    if (loading) return <AdminPageLayout><p>Loading settings...</p></AdminPageLayout>;

    return (
        <AdminPageLayout contentClassName="settings-page-content">
                <header className="admin-header admin-settings-header">
                    <h1>Admin Settings</h1>
                    {saved && <div className="settings-message success"><FaCheckCircle /> Settings saved</div>}
                    {saveError && <div className="settings-message error">{saveError}</div>}
                </header>

                <div className="settings-grid">
                    <div className="setting-card">
                        <h3>Restaurant Information</h3>
                        <div className="form-group"><label>Name</label><input type="text" value={settings.restaurantName} onChange={e => set('restaurantName', e.target.value)} /></div>
                        <div className="form-group"><label>Phone</label><input type="text" value={settings.contactPhone} onChange={e => set('contactPhone', e.target.value)} /></div>
                        <div className="form-group"><label>Address</label><input type="text" value={settings.address} onChange={e => set('address', e.target.value)} /></div>
                    </div>

                    <div className="setting-card">
                        <h3>Opening Hours</h3>
                        <div className="hours-row"><span>Weekdays</span><input type="time" value={settings.weekdayOpen} onChange={e => set('weekdayOpen', e.target.value)} /> - <input type="time" value={settings.weekdayClose} onChange={e => set('weekdayClose', e.target.value)} /></div>
                        <div className="hours-row"><span>Weekends</span><input type="time" value={settings.weekendOpen} onChange={e => set('weekendOpen', e.target.value)} /> - <input type="time" value={settings.weekendClose} onChange={e => set('weekendClose', e.target.value)} /></div>
                        <div className="form-group"><label>Current Status</label><select value={settings.currentStatus} onChange={e => set('currentStatus', e.target.value)}><option>Open for Business</option><option>Temporarily Closed</option><option>Busy (High Wait Time)</option></select></div>
                    </div>

                    <div className="setting-card">
                        <h3>Tax & Charges</h3>
                        <div className="form-group"><label>Tax Rate (%)</label><input type="number" value={settings.taxRate} onChange={e => set('taxRate', e.target.value)} /></div>
                        <div className="form-group"><label>Service Charge (%)</label><input type="number" value={settings.serviceCharge} onChange={e => set('serviceCharge', e.target.value)} /></div>
                        <div className="form-group"><label>Delivery Radius (km)</label><input type="number" value={settings.deliveryRadius} onChange={e => set('deliveryRadius', e.target.value)} /></div>
                    </div>

                    <div className="setting-card">
                        <h3>Notification Preferences</h3>
                        <Toggle label="Low stock alerts" checked={settings.notifyLowStock} onChange={(v) => set('notifyLowStock', v)} />
                        <Toggle label="Negative review alerts" checked={settings.notifyNegativeReviews} onChange={(v) => set('notifyNegativeReviews', v)} />
                        <Toggle label="Auto payroll reminders" checked={settings.autoPayroll} onChange={(v) => set('autoPayroll', v)} />
                    </div>

                    <div className="setting-card">
                        <h3>Payment Settings</h3>
                        <Toggle label="Cash on Delivery" checked={settings.paymentCOD} onChange={(v) => set('paymentCOD', v)} />
                        <Toggle label="Card Payments" checked={settings.paymentCard} onChange={(v) => set('paymentCard', v)} />
                        <Toggle label="UPI Payments" checked={settings.paymentUPI} onChange={(v) => set('paymentUPI', v)} />
                    </div>

                    <div className="setting-card">
                        <h3>Kitchen & Inventory Rules</h3>
                        <div className="form-group"><label>Reservation Limit / Day</label><input type="number" value={settings.reservationLimit} onChange={e => set('reservationLimit', e.target.value)} /></div>
                        <div className="form-group"><label>Inventory Threshold Alert</label><input type="number" value={settings.inventoryThreshold} onChange={e => set('inventoryThreshold', e.target.value)} /></div>
                    </div>
                </div>

                <button className="save-settings-btn" onClick={handleSave} disabled={saving}>
                    <FaSave /> {saving ? 'Saving...' : 'Save All Settings'}
                </button>
        </AdminPageLayout>
    );
};

export default AdminSettings;
