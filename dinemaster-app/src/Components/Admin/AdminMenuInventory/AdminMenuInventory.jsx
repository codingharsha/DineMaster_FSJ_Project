import React, { useState } from 'react';
import './AdminMenuInventory.scss';
import { FaEdit, FaTrash, FaPlus, FaBoxOpen, FaUtensils } from 'react-icons/fa';

const AdminMenuInventory = () => {
    const [activeTab, setActiveTab] = useState('menu'); 

    const menuItems = [
        { id: 1, name: "Chicken Biryani", price: "₹280", category: "Main Course", status: "Active" },
        { id: 2, name: "Paneer Butter Masala", price: "₹220", category: "Curry", status: "Active" },
        { id: 3, name: "Butter Naan", price: "₹45", category: "Breads", status: "Active" },
        { id: 4, name: "Tandoori Chicken (Full)", price: "₹550", category: "Starters", status: "Active" },
        { id: 5, name: "Mutton Rogan Josh", price: "₹380", category: "Curry", status: "Active" },
        { id: 6, name: "Veg Pulao", price: "₹180", category: "Main Course", status: "Active" },
        { id: 7, name: "Gulab Jamun (2 pcs)", price: "₹60", category: "Dessert", status: "Active" },
        { id: 8, name: "Masala Chai", price: "₹30", category: "Beverage", status: "Active" },
        { id: 9, name: "Paneer Tikka", price: "₹240", category: "Starters", status: "Active" },
        { id: 10, name: "Dal Makhani", price: "₹190", category: "Curry", status: "Inactive" },
        { id: 11, name: "Fresh Lime Soda", price: "₹80", category: "Beverage", status: "Active" },
        { id: 12, name: "Chocolate Brownie", price: "₹120", category: "Dessert", status: "Out of Stock" },
    ];

    const inventoryItems = [
        { id: 1, item: "Basmati Rice", stock: "45 kg", unit: "kg", alert: "Low" },
        { id: 2, item: "Chicken", stock: "12 kg", unit: "kg", alert: "Good" },
        { id: 3, item: "Paneer (Fresh)", stock: "8 kg", unit: "kg", alert: "Medium" },
        { id: 4, item: "Tomatoes", stock: "5 kg", unit: "kg", alert: "Critical" },
        { id: 5, item: "Onions", stock: "50 kg", unit: "kg", alert: "Good" },
        { id: 6, item: "Cooking Oil", stock: "80 L", unit: "L", alert: "Good" },
        { id: 7, item: "Milk (Full Cream)", stock: "4 L", unit: "L", alert: "Low" },
        { id: 8, item: "Atta (Flour)", stock: "100 kg", unit: "kg", alert: "Good" },
        { id: 9, item: "Spices (Mix)", stock: "2 kg", unit: "kg", alert: "Medium" },
        { id: 10, item: "Sugar", stock: "25 kg", unit: "kg", alert: "Good" },
        { id: 11, item: "Potatoes", stock: "60 kg", unit: "kg", alert: "Good" },
        { id: 12, item: "Mutton", stock: "0 kg", unit: "kg", alert: "Out of Stock" },
    ];

    return (
        <div className="admin-content">
            <div className="mi-header">
                <h1>Menu & Inventory Control</h1>
                <div className="mi-tabs">
                    <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>
                        <FaUtensils /> Menu Items
                    </button>
                    <button className={activeTab === 'inventory' ? 'active' : ''} onClick={() => setActiveTab('inventory')}>
                        <FaBoxOpen /> Stock Inventory
                    </button>
                </div>
            </div>

            <div className="mi-body">
                {activeTab === 'menu' ? (
                    <div className="menu-view">
                        <div className="view-actions">
                            <h2>Restaurant Menu</h2>
                            <button className="add-btn"><FaPlus /> Add Item</button>
                        </div>
                        <table className="admin-table">
                            <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Status</th><th>Edit</th></tr></thead>
                            <tbody>
                                {menuItems.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td><span className="cat-badge">{item.category}</span></td>
                                        <td>{item.price}</td>
                                        <td><span className="status-active">● {item.status}</span></td>
                                        <td><button className="icon-btn"><FaEdit /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="inventory-view">
                        <div className="view-actions">
                            <h2>Raw Material Stock</h2>
                            <button className="add-btn"><FaPlus /> Add Stock</button>
                        </div>
                        <div className="stock-grid">
                            {inventoryItems.map(inv => (
                                <div key={inv.id} className="stock-card">
                                    <div className="s-top">
                                        <h4>{inv.item}</h4>
                                        <span className={`alert-badge ${inv.alert.toLowerCase()}`}>{inv.alert} Stock</span>
                                    </div>
                                    <div className="s-middle">
                                        <h1>{inv.stock}</h1>
                                    </div>
                                    <button className="update-stock-btn">Update Stock</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default AdminMenuInventory;