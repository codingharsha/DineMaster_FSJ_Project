import React, { useState } from 'react';
import './AdminBilling.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaPrint, FaFileInvoice, FaCheckCircle } from 'react-icons/fa';

const AdminBilling = () => {

  const completedOrders = [
      { id: "ORD-8801", table: "Table 5", total: 45, status: "Unbilled", items: [{name: "Biryani", price: 15, qty: 2}, {name: "Coke", price: 5, qty: 3}] },
      { id: "ORD-8802", table: "Takeaway", total: 22, status: "Billed", items: [{name: "Pizza", price: 22, qty: 1}] },
      { id: "ORD-8803", table: "Table 2", total: 120, status: "Unbilled", items: [{name: "Family Platter", price: 100, qty: 1}, {name: "Dessert", price: 20, qty: 1}] },
  ];

  const [selectedOrder, setSelectedOrder] = useState(null);

  const TAX_RATE = 0.05; 
  const SERVICE_CHARGE = 0.10; 

  const calculateBill = (order) => {
      const subtotal = order.total;
      const tax = subtotal * TAX_RATE;
      const service = subtotal * SERVICE_CHARGE;
      const grandTotal = subtotal + tax + service;
      return { subtotal, tax, service, grandTotal };
  };

  return (
    <div className="admin-container">
        <AdminSidebar />
        <div className="admin-content">
            <header className="admin-header">
                <h1>🧾 Billing & Invoices</h1>
            </header>

            <div className="billing-layout">
                <div className="order-selection">
                    <h3>Recent Orders</h3>
                    {completedOrders.map(order => (
                        <div 
                            key={order.id} 
                            className={`billing-order-card ₹{selectedOrder?.id === order.id ? 'active' : ''}`}
                            onClick={() => setSelectedOrder(order)}
                        >
                            <div className="b-card-header">
                                <span>{order.id}</span>
                                <span className={`status-pill ₹{order.status.toLowerCase()}`}>{order.status}</span>
                            </div>
                            <p>{order.table}</p>
                            <b>₹{order.total.toFixed(2)}</b>
                        </div>
                    ))}
                </div>

                <div className="invoice-preview">
                    {selectedOrder ? (
                        <div className="invoice-paper">
                            <div className="inv-header">
                                <h2>DineMaster</h2>
                                <p>123 Food Street, Flavor Town</p>
                                <p>Tel: +91 98765 43210</p>
                            </div>
                            <hr />
                            <div className="inv-details">
                                <p><b>Bill No:</b> {selectedOrder.id}</p>
                                <p><b>Date:</b> {new Date().toLocaleDateString()}</p>
                                <p><b>Table:</b> {selectedOrder.table}</p>
                            </div>
                            
                            <table className="inv-items">
                                <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
                                <tbody>
                                    {selectedOrder.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{item.name}</td>
                                            <td>{item.qty}</td>
                                            <td>₹{(item.price * item.qty).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="inv-summary">
                                <div className="row"><span>Subtotal:</span> <span>₹{calculateBill(selectedOrder).subtotal.toFixed(2)}</span></div>
                                <div className="row"><span>Tax (5%):</span> <span>₹{calculateBill(selectedOrder).tax.toFixed(2)}</span></div>
                                <div className="row"><span>S. Charge (10%):</span> <span>₹{calculateBill(selectedOrder).service.toFixed(2)}</span></div>
                                <hr />
                                <div className="row total"><span>Grand Total:</span> <span>₹{calculateBill(selectedOrder).grandTotal.toFixed(2)}</span></div>
                            </div>

                            <div className="inv-actions">
                                <button className="print-btn" onClick={() => window.print()}><FaPrint /> Print Bill</button>
                                <button className="save-btn"><FaCheckCircle /> Mark Paid</button>
                            </div>
                        </div>
                    ) : (
                        <div className="no-selection">
                            <FaFileInvoice size={50} color="#ccc"/>
                            <p>Select an order to generate bill</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminBilling;