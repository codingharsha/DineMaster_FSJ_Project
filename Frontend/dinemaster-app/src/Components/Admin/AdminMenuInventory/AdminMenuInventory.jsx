
import React, { useContext, useEffect, useMemo, useState } from 'react';
import './AdminMenuInventory.scss';
import { FaEdit, FaPlus, FaBoxOpen, FaUtensils, FaTrash, FaHistory, FaRedo } from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';

const INVENTORY_KEY = 'dinemaster_inventory_records_v1';
const HISTORY_KEY = 'dinemaster_inventory_history_v1';

const todayISO = () => new Date().toISOString().slice(0, 10);
const toNumber = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);
const formatPrice = (v) => `Rs.${toNumber(v).toFixed(2)}`;
const formatDate = (v) => (v ? v : 'N/A');

const getStatus = (item) => {
    if (item?.status) return item.status;
    return item?.isAvailable === false ? 'Inactive' : 'Active';
};

const getAlerts = (row) => {
    const now = new Date();
    const alerts = [];
    if (toNumber(row.currentStock) <= toNumber(row.minStock)) alerts.push('Low Stock');
    if (row.expiryDate) {
        const days = Math.ceil((new Date(row.expiryDate) - now) / 86400000);
        if (days < 0) alerts.push('Expired');
        else if (days <= 3) alerts.push('Near Expiry');
    }
    return alerts;
};

const defaultRecord = (item, index) => ({
    itemId: item?.id || null,
    itemName: item?.name || '',
    sku: item?.id ? `SKU-${String(item.id).slice(-6).toUpperCase()}` : `SKU-${Date.now()}-${index}`,
    category: item?.category || 'General',
    unit: 'kg',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: toNumber(item?.price),
    costPrice: toNumber(item?.price) * 0.65,
    stockIn: 0,
    stockOut: 0,
    adjustment: 0,
    purchaseDate: todayISO(),
    expiryDate: '',
    lastUpdated: todayISO(),
    supplierName: '',
    supplierContact: '',
    supplierId: '',
});

const mergeInventory = (menuItems, saved) => {
    const byItem = new Map(saved.filter((r) => r.itemId).map((r) => [r.itemId, r]));
    const fromMenu = menuItems.map((item, idx) => {
        const rec = byItem.get(item.id);
        return rec
            ? { ...rec, itemName: item.name || rec.itemName, category: item.category || rec.category, unitPrice: toNumber(item.price) }
            : defaultRecord(item, idx);
    });
    const extra = saved.filter((r) => !r.itemId || !menuItems.some((m) => m.id === r.itemId));
    return [...fromMenu, ...extra];
};

const EMPTY_MENU_FORM = {
    name: '', description: '', category: '', price: '', imgUrl: '', rating: '', isVeg: true, status: 'Active',
};

const EMPTY_INV_FORM = {
    itemName: '', sku: '', category: '', unit: 'kg',
    currentStock: 0, minStock: 0, maxStock: 0, unitPrice: 0, costPrice: 0,
    stockIn: 0, stockOut: 0, adjustment: 0,
    purchaseDate: todayISO(), expiryDate: '', supplierName: '', supplierContact: '', supplierId: '',
};

const AdminMenuInventory = () => {
    const { food_list, fetchFoodList, updateFoodItem, addFoodItem, deleteFoodItem } = useContext(StoreContext);
    const menuItems = useMemo(() => (Array.isArray(food_list) ? food_list : []), [food_list]);

    const [activeTab, setActiveTab] = useState('menu');
    const [isSaving, setIsSaving] = useState(false);

    const [menuModalOpen, setMenuModalOpen] = useState(false);
    const [menuModalMode, setMenuModalMode] = useState('add');
    const [selectedItem, setSelectedItem] = useState(null);
    const [menuForm, setMenuForm] = useState(EMPTY_MENU_FORM);

    const [inventoryRows, setInventoryRows] = useState([]);
    const [invModalOpen, setInvModalOpen] = useState(false);
    const [invModalMode, setInvModalMode] = useState('add');
    const [invForm, setInvForm] = useState(EMPTY_INV_FORM);
    const [historyMap, setHistoryMap] = useState(() => {
        try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}'); }
        catch { return {}; }
    });
    const [historySku, setHistorySku] = useState('');

    useEffect(() => {
        let saved = [];
        try { saved = JSON.parse(localStorage.getItem(INVENTORY_KEY) || '[]'); }
        catch { saved = []; }
        setInventoryRows(mergeInventory(menuItems, Array.isArray(saved) ? saved : []));
    }, [menuItems]);

    useEffect(() => {
        localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventoryRows));
    }, [inventoryRows]);

    useEffect(() => {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(historyMap));
    }, [historyMap]);

    const analytics = useMemo(() => {
        const dailyStockUsage = inventoryRows.reduce((s, r) => s + toNumber(r.stockOut), 0);
        const wasteTracking = inventoryRows.reduce((s, r) => (toNumber(r.adjustment) < 0 ? s + Math.abs(toNumber(r.adjustment)) : s), 0);
        const costAnalysis = inventoryRows.reduce((s, r) => s + toNumber(r.currentStock) * toNumber(r.costPrice), 0);
        const mostUsed = inventoryRows.length ? [...inventoryRows].sort((a, b) => toNumber(b.stockOut) - toNumber(a.stockOut))[0] : null;
        return { dailyStockUsage, wasteTracking, costAnalysis, mostUsed };
    }, [inventoryRows]);

    const openMenuModal = (mode, item = null) => {
        setMenuModalMode(mode);
        setSelectedItem(item);
        if (mode === 'edit' && item) {
            setMenuForm({
                name: item.name || '', description: item.description || '', category: item.category || '', price: item.price ?? '',
                imgUrl: item.imgUrl || '', rating: item.rating ?? '', isVeg: item.isVeg !== false, status: getStatus(item),
            });
        } else setMenuForm(EMPTY_MENU_FORM);
        setMenuModalOpen(true);
    };

    const handleMenuSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...(selectedItem || {}),
            name: menuForm.name.trim(), description: menuForm.description.trim(), category: menuForm.category.trim(),
            price: toNumber(menuForm.price), imgUrl: menuForm.imgUrl.trim(), rating: toNumber(menuForm.rating),
            isVeg: menuForm.isVeg, isAvailable: menuForm.status === 'Active',
        };

        if (!payload.name || !payload.category || payload.price < 0) {
            alert('Please provide valid Name, Category and Price.');
            return;
        }

        try {
            setIsSaving(true);
            if (menuModalMode === 'edit' && selectedItem?.id) await updateFoodItem(selectedItem.id, payload);
            else await addFoodItem(payload);
            await fetchFoodList();
            setMenuModalOpen(false);
            setSelectedItem(null);
        } catch (error) {
            console.error('Error saving food item:', error);
            alert('Failed to save food item');
        } finally { setIsSaving(false); }
    };

    const openInvModal = (mode, row = null) => {
        setInvModalMode(mode);
        if (mode === 'edit' && row) setInvForm({ ...row, stockIn: 0, stockOut: 0, adjustment: 0 });
        else setInvForm({ ...EMPTY_INV_FORM, sku: `SKU-${Date.now().toString().slice(-6)}` });
        setInvModalOpen(true);
    };

    const saveHistory = (sku, entries) => {
        if (!entries.length) return;
        setHistoryMap((prev) => ({ ...prev, [sku]: [...(prev[sku] || []), ...entries] }));
    };

    const handleInvSubmit = (e) => {
        e.preventDefault();
        const inQty = toNumber(invForm.stockIn);
        const outQty = toNumber(invForm.stockOut);
        const adjust = toNumber(invForm.adjustment);
        const now = todayISO();

        if (!invForm.itemName.trim() || !invForm.sku.trim()) {
            alert('Item name and SKU are required.');
            return;
        }

        setInventoryRows((rows) => {
            const idx = rows.findIndex((r) => r.sku === invForm.sku);
            if (idx >= 0) {
                const current = rows[idx];
                const next = Math.max(0, toNumber(current.currentStock) + inQty - outQty + adjust);
                const updated = {
                    ...current, ...invForm, currentStock: next, minStock: toNumber(invForm.minStock), maxStock: toNumber(invForm.maxStock),
                    unitPrice: toNumber(invForm.unitPrice), costPrice: toNumber(invForm.costPrice),
                    stockIn: toNumber(current.stockIn) + inQty, stockOut: toNumber(current.stockOut) + outQty,
                    adjustment: toNumber(current.adjustment) + adjust, lastUpdated: now,
                };
                const copy = [...rows];
                copy[idx] = updated;
                return copy;
            }
            return [...rows, {
                ...invForm, currentStock: toNumber(invForm.currentStock), minStock: toNumber(invForm.minStock), maxStock: toNumber(invForm.maxStock),
                unitPrice: toNumber(invForm.unitPrice), costPrice: toNumber(invForm.costPrice), stockIn: inQty, stockOut: outQty, adjustment: adjust, lastUpdated: now,
            }];
        });

        const entries = [];
        if (inQty > 0) entries.push({ date: now, type: 'Stock IN', qty: inQty, note: 'Purchase/Restock' });
        if (outQty > 0) entries.push({ date: now, type: 'Stock OUT', qty: outQty, note: 'Used/Wastage' });
        if (adjust !== 0) entries.push({ date: now, type: 'Adjustment', qty: adjust, note: 'Manual correction' });
        saveHistory(invForm.sku, entries);
        setInvModalOpen(false);
    };

    const deleteInvItem = (sku) => window.confirm('Delete this inventory item?') && setInventoryRows((rows) => rows.filter((r) => r.sku !== sku));

    const quickRestock = (row) => {
        const qty = Math.max(1, toNumber(row.minStock) || 10);
        const now = todayISO();
        setInventoryRows((rows) => rows.map((r) => r.sku === row.sku ? { ...r, currentStock: toNumber(r.currentStock) + qty, stockIn: toNumber(r.stockIn) + qty, lastUpdated: now } : r));
        saveHistory(row.sku, [{ date: now, type: 'Restock', qty, note: 'Quick restock' }]);
    };

    const removeMenuItem = async (id) => {
        if (!window.confirm('Delete this menu item?')) return;
        try { await deleteFoodItem(id); await fetchFoodList(); }
        catch (error) {
            console.error('Delete failed:', error);
            alert('Failed to delete menu item');
        }
    };

    return (
        <div className="admin-content">
            <div className="mi-header">
                <h1>Menu & Inventory Control</h1>
                <div className="mi-tabs">
                    <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}><FaUtensils /> Menu Items</button>
                    <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}><FaBoxOpen /> Stock Inventory</button>
                </div>
            </div>

            <div className="mi-body">
                {activeTab === 'menu' ? (
                    <div className="menu-view">
                        <div className="view-actions">
                            <h2>Restaurant Menu</h2>
                            <button className="add-btn" onClick={() => openMenuModal('add')}><FaPlus /> Add Item</button>
                        </div>
                        <table className="admin-table">
                            <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
                            <tbody>
                                {menuItems.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td><span className="cat-badge">{item.category}</span></td>
                                        <td>{formatPrice(item.price)}</td>
                                        <td><span className={`status-pill ${getStatus(item).toLowerCase().replace(/\s+/g, '-')}`}>{getStatus(item)}</span></td>
                                        <td className="action-group">
                                            <button className="icon-btn" onClick={() => openMenuModal('edit', item)}><FaEdit /></button>
                                            <button className="icon-btn danger" onClick={() => removeMenuItem(item.id)}><FaTrash /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="inventory-view">
                        <div className="view-actions">
                            <h2>In-Stock Inventory</h2>
                            <button className="add-btn" onClick={() => openInvModal('add')}><FaPlus /> Add Item</button>
                        </div>

                        <div className="report-cards">
                            <div className="report-card"><span>Daily Stock Usage</span><strong>{analytics.dailyStockUsage}</strong></div>
                            <div className="report-card"><span>Most Used Item</span><strong>{analytics.mostUsed?.itemName || 'N/A'}</strong></div>
                            <div className="report-card"><span>Waste Tracking</span><strong>{analytics.wasteTracking}</strong></div>
                            <div className="report-card"><span>Cost Analysis</span><strong>{formatPrice(analytics.costAnalysis)}</strong></div>
                        </div>

                        <div className="inventory-table-wrap">
                            <table className="admin-table inventory-table">
                                <thead>
                                    <tr><th>Item Details</th><th>Stock Quantity</th><th>Stock Movement</th><th>Dates</th><th>Supplier Info</th><th>Alerts</th><th>Actions</th></tr>
                                </thead>
                                <tbody>
                                    {inventoryRows.map((row) => {
                                        const alerts = getAlerts(row);
                                        return (
                                            <tr key={row.sku}>
                                                <td><div className="stack-cell"><strong>{row.itemName}</strong><span>ID/SKU: {row.sku}</span><span>Category: {row.category}</span><span>Unit: {row.unit}</span></div></td>
                                                <td><div className="stack-cell"><span>Current: {row.currentStock}</span><span>Min: {row.minStock}</span><span>Max: {row.maxStock || 'N/A'}</span><span>Unit Price: {formatPrice(row.unitPrice)}</span><span>Cost Price: {formatPrice(row.costPrice)}</span></div></td>
                                                <td><div className="stack-cell"><span>IN: +{row.stockIn}</span><span>OUT: -{row.stockOut}</span><span>Adjustment: {row.adjustment}</span></div></td>
                                                <td><div className="stack-cell"><span>Purchase: {formatDate(row.purchaseDate)}</span><span>Expiry: {formatDate(row.expiryDate)}</span><span>Updated: {formatDate(row.lastUpdated)}</span></div></td>
                                                <td><div className="stack-cell"><span>{row.supplierName || 'N/A'}</span><span>{row.supplierContact || 'N/A'}</span><span>Supplier ID: {row.supplierId || 'N/A'}</span></div></td>
                                                <td>
                                                    {alerts.length ? <div className="alert-group">{alerts.map((a) => <span key={a} className={`alert-pill ${a.toLowerCase().replace(/\s+/g, '-')}`}>{a}</span>)}</div> : <span className="alert-pill healthy">Healthy</span>}
                                                </td>
                                                <td className="action-group">
                                                    <button className="icon-btn" onClick={() => openInvModal('edit', row)} title="Update Stock"><FaEdit /></button>
                                                    <button className="icon-btn" onClick={() => quickRestock(row)} title="Restock Item"><FaRedo /></button>
                                                    <button className="icon-btn" onClick={() => setHistorySku(row.sku)} title="View Stock History"><FaHistory /></button>
                                                    <button className="icon-btn danger" onClick={() => deleteInvItem(row.sku)} title="Delete Item"><FaTrash /></button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            {menuModalOpen && (
                <div className="edit-modal-backdrop" onClick={() => setMenuModalOpen(false)}>
                    <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>{menuModalMode === 'edit' ? 'Edit Food Item' : 'Add Food Item'}</h3>
                        <form onSubmit={handleMenuSubmit}>
                            <label>Name<input type="text" value={menuForm.name} onChange={(e) => setMenuForm((p) => ({ ...p, name: e.target.value }))} required /></label>
                            <label>Description<input type="text" value={menuForm.description} onChange={(e) => setMenuForm((p) => ({ ...p, description: e.target.value }))} /></label>
                            <label>Category<input type="text" value={menuForm.category} onChange={(e) => setMenuForm((p) => ({ ...p, category: e.target.value }))} required /></label>
                            <label>Price<input type="number" min="0" step="0.01" value={menuForm.price} onChange={(e) => setMenuForm((p) => ({ ...p, price: e.target.value }))} required /></label>
                            <label>Image URL<input type="text" value={menuForm.imgUrl} onChange={(e) => setMenuForm((p) => ({ ...p, imgUrl: e.target.value }))} /></label>
                            <label>Rating<input type="number" min="0" max="5" step="0.1" value={menuForm.rating} onChange={(e) => setMenuForm((p) => ({ ...p, rating: e.target.value }))} /></label>
                            <label>Type<select value={menuForm.isVeg ? 'Veg' : 'Non-Veg'} onChange={(e) => setMenuForm((p) => ({ ...p, isVeg: e.target.value === 'Veg' }))}><option value="Veg">Veg</option><option value="Non-Veg">Non-Veg</option></select></label>
                            <label>Status<select value={menuForm.status} onChange={(e) => setMenuForm((p) => ({ ...p, status: e.target.value }))}><option value="Active">Active</option><option value="Inactive">Inactive</option></select></label>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setMenuModalOpen(false)}>Cancel</button>
                                <button type="submit" className="save-btn" disabled={isSaving}>{isSaving ? 'Saving...' : menuModalMode === 'edit' ? 'Save' : 'Add Item'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {invModalOpen && (
                <div className="edit-modal-backdrop" onClick={() => setInvModalOpen(false)}>
                    <div className="edit-modal wide" onClick={(e) => e.stopPropagation()}>
                        <h3>{invModalMode === 'edit' ? 'Update Stock' : 'Add Inventory Item'}</h3>
                        <form onSubmit={handleInvSubmit} className="inventory-form-grid">
                            <label>Item Name<input type="text" value={invForm.itemName} onChange={(e) => setInvForm((p) => ({ ...p, itemName: e.target.value }))} required /></label>
                            <label>Item ID / SKU<input type="text" value={invForm.sku} onChange={(e) => setInvForm((p) => ({ ...p, sku: e.target.value }))} required /></label>
                            <label>Category<input type="text" value={invForm.category} onChange={(e) => setInvForm((p) => ({ ...p, category: e.target.value }))} /></label>
                            <label>Unit<input type="text" value={invForm.unit} onChange={(e) => setInvForm((p) => ({ ...p, unit: e.target.value }))} /></label>
                            <label>Current Stock Quantity<input type="number" min="0" value={invForm.currentStock} onChange={(e) => setInvForm((p) => ({ ...p, currentStock: e.target.value }))} /></label>
                            <label>Minimum Stock Level<input type="number" min="0" value={invForm.minStock} onChange={(e) => setInvForm((p) => ({ ...p, minStock: e.target.value }))} /></label>
                            <label>Maximum Stock Level<input type="number" min="0" value={invForm.maxStock} onChange={(e) => setInvForm((p) => ({ ...p, maxStock: e.target.value }))} /></label>
                            <label>Unit Price<input type="number" min="0" step="0.01" value={invForm.unitPrice} onChange={(e) => setInvForm((p) => ({ ...p, unitPrice: e.target.value }))} /></label>
                            <label>Cost Price<input type="number" min="0" step="0.01" value={invForm.costPrice} onChange={(e) => setInvForm((p) => ({ ...p, costPrice: e.target.value }))} /></label>
                            <label>Stock IN<input type="number" min="0" value={invForm.stockIn} onChange={(e) => setInvForm((p) => ({ ...p, stockIn: e.target.value }))} /></label>
                            <label>Stock OUT<input type="number" min="0" value={invForm.stockOut} onChange={(e) => setInvForm((p) => ({ ...p, stockOut: e.target.value }))} /></label>
                            <label>Adjustment<input type="number" value={invForm.adjustment} onChange={(e) => setInvForm((p) => ({ ...p, adjustment: e.target.value }))} /></label>
                            <label>Purchase Date<input type="date" value={invForm.purchaseDate} onChange={(e) => setInvForm((p) => ({ ...p, purchaseDate: e.target.value }))} /></label>
                            <label>Expiry Date<input type="date" value={invForm.expiryDate} onChange={(e) => setInvForm((p) => ({ ...p, expiryDate: e.target.value }))} /></label>
                            <label>Supplier Name<input type="text" value={invForm.supplierName} onChange={(e) => setInvForm((p) => ({ ...p, supplierName: e.target.value }))} /></label>
                            <label>Supplier Contact Number<input type="text" value={invForm.supplierContact} onChange={(e) => setInvForm((p) => ({ ...p, supplierContact: e.target.value }))} /></label>
                            <label>Supplier ID<input type="text" value={invForm.supplierId} onChange={(e) => setInvForm((p) => ({ ...p, supplierId: e.target.value }))} /></label>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setInvModalOpen(false)}>Cancel</button>
                                <button type="submit" className="save-btn">{invModalMode === 'edit' ? 'Update Stock' : 'Add Item'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {historySku && (
                <div className="edit-modal-backdrop" onClick={() => setHistorySku('')}>
                    <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>Stock History - {historySku}</h3>
                        <div className="history-list">
                            {(historyMap[historySku] || []).length ? (
                                historyMap[historySku].map((entry, i) => (
                                    <div key={`${entry.date}-${i}`} className="history-row"><strong>{entry.type}</strong><span>Qty: {entry.qty}</span><span>{entry.date}</span><span>{entry.note}</span></div>
                                ))
                            ) : <p>No history available for this item.</p>}
                        </div>
                        <div className="modal-actions"><button type="button" className="cancel-btn" onClick={() => setHistorySku('')}>Close</button></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminMenuInventory;
