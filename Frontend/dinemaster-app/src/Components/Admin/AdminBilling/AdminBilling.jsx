import React, { useState, useEffect, useContext } from 'react';
import './AdminBilling.scss';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { FaPrint, FaFileInvoice, FaCheckCircle, FaRegBuilding, FaRegUser } from 'react-icons/fa';
import { StoreContext } from '../../../Context/StoreContext';

const DEMO_ORDERS = [
  {
    id: 'ORD-8801',
    table: 'Table 5',
    status: 'Unbilled',
    items: [
      { name: 'Biryani', price: 280, qty: 2 },
      { name: 'Coke', price: 60, qty: 3 }
    ]
  },
  {
    id: 'ORD-8802',
    table: 'Takeaway',
    status: 'Billed',
    items: [
      { name: 'Pizza', price: 320, qty: 1 }
    ]
  },
  {
    id: 'ORD-8803',
    table: 'Table 2',
    status: 'Unbilled',
    items: [
      { name: 'Family Platter', price: 850, qty: 1 },
      { name: 'Dessert', price: 120, qty: 1 }
    ]
  }
];

const AdminBilling = () => {
  const { fetchSettings } = useContext(StoreContext);

  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [settings, setSettings] = useState({
    taxRate: 5,
    serviceCharge: 10,
    restaurantName: 'DineMaster',
    address: '123 Food Street, Chennai, India',
    contactPhone: '+91 98765 43210',
    contactEmail: 'billing@dinemaster.com',
    taxId: 'GSTIN-29ABCDE1234F1Z5'
  });

  useEffect(() => {
    fetchSettings()
      .then((res) => setSettings((prev) => ({ ...prev, ...(res?.data || {}) })))
      .catch(console.error);
  }, [fetchSettings]);

  const subtotal = (order) => order.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const calculateBill = (order) => {
    const sub = subtotal(order);
    const tax = sub * (settings.taxRate / 100);
    const service = sub * (settings.serviceCharge / 100);
    return { subtotal: sub, tax, service, grandTotal: sub + tax + service };
  };

  const formatCurrency = (amount) => `Rs. ${Number(amount).toFixed(2)}`;

  const getBillMeta = (order) => {
    const now = new Date();
    return {
      invoiceNo: `INV-${order.id}-${now.getFullYear()}`,
      issueDate: now.toLocaleDateString(),
      issueTime: now.toLocaleTimeString(),
      dueText: 'Payable immediately upon issue',
      paymentMode: order.table?.toLowerCase().includes('takeaway') ? 'UPI / Cash' : 'Card / UPI / Cash'
    };
  };

  const toTitleCase = (value) => {
    if (!value) return '';
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const markPaid = (orderId) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: 'Billed' } : o)));
    setSelectedOrder((prev) => (prev ? { ...prev, status: 'Billed' } : prev));
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Billing and Invoices</h1>
          <small style={{ color: '#888' }}>
            Tax: {settings.taxRate}% | Service: {settings.serviceCharge}% (from Settings)
          </small>
        </header>

        <div className="billing-layout">
          <aside className="order-selection no-print">
            <h3>Recent Orders</h3>
            {orders.map((order) => (
              <div
                key={order.id}
                className={`billing-order-card ${selectedOrder?.id === order.id ? 'active' : ''}`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="b-card-header">
                  <span>{order.id}</span>
                  <span className={`status-pill ${order.status.toLowerCase()}`}>{toTitleCase(order.status)}</span>
                </div>
                <p>{order.table}</p>
                <b>{formatCurrency(subtotal(order))}</b>
              </div>
            ))}
          </aside>

          <section className="invoice-preview">
            {selectedOrder ? (
              (() => {
                const bill = calculateBill(selectedOrder);
                const meta = getBillMeta(selectedOrder);
                return (
                  <article className="invoice-paper">
                    <div className="screen-invoice">
                      <div className="inv-header">
                        <div className="brand-block">
                          <h2>{settings.restaurantName}</h2>
                          <p>{settings.address}</p>
                          <p>Phone: {settings.contactPhone} | Email: {settings.contactEmail}</p>
                          <p>Tax ID: {settings.taxId}</p>
                        </div>
                        <div className="invoice-tag">
                          <h3>INVOICE</h3>
                          <span className={`status-pill ${selectedOrder.status.toLowerCase()}`}>{toTitleCase(selectedOrder.status)}</span>
                        </div>
                      </div>

                      <div className="inv-top-grid">
                        <div className="inv-card">
                          <h4><FaRegBuilding /> Invoice Details</h4>
                          <p><strong>Invoice No:</strong> {meta.invoiceNo}</p>
                          <p><strong>Order Ref:</strong> {selectedOrder.id}</p>
                          <p><strong>Issue Date:</strong> {meta.issueDate}</p>
                          <p><strong>Issue Time:</strong> {meta.issueTime}</p>
                        </div>
                        <div className="inv-card">
                          <h4><FaRegUser /> Billing Details</h4>
                          <p><strong>Service Type:</strong> {selectedOrder.table}</p>
                          <p><strong>Payment Mode:</strong> {meta.paymentMode}</p>
                          <p><strong>Payment Terms:</strong> {meta.dueText}</p>
                          <p><strong>Prepared By:</strong> DineMaster Admin</p>
                        </div>
                      </div>

                      <table className="inv-items">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Item Description</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Line Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map((item, idx) => (
                            <tr key={idx}>
                              <td>{idx + 1}</td>
                              <td>{item.name}</td>
                              <td>{formatCurrency(item.price)}</td>
                              <td>{item.qty}</td>
                              <td>{formatCurrency(item.price * item.qty)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="inv-summary">
                        <div className="row"><span>Subtotal</span><span>{formatCurrency(bill.subtotal)}</span></div>
                        <div className="row"><span>Tax ({settings.taxRate}%)</span><span>{formatCurrency(bill.tax)}</span></div>
                        <div className="row"><span>Service Charge ({settings.serviceCharge}%)</span><span>{formatCurrency(bill.service)}</span></div>
                        <div className="row total"><span>Total Payable</span><span>{formatCurrency(bill.grandTotal)}</span></div>
                      </div>

                      <div className="inv-footer-note">
                        <p>This is a computer-generated invoice and does not require a signature.</p>
                        <p>Thank you for choosing {settings.restaurantName}.</p>
                      </div>
                    </div>

                    <div className="print-invoice-simple">
                      <h2>{settings.restaurantName}</h2>
                      <p>{settings.address}</p>
                      <p>Phone: {settings.contactPhone}</p>
                      <p className="print-divider">Invoice: {meta.invoiceNo}</p>
                      <p>Order: {selectedOrder.id} | {selectedOrder.table}</p>
                      <p>Date: {meta.issueDate} {meta.issueTime}</p>
                      <table>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrder.items.map((item, idx) => (
                            <tr key={`print-${idx}`}>
                              <td>{item.name}</td>
                              <td>{item.qty}</td>
                              <td>{formatCurrency(item.price * item.qty)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="print-total-block">
                        <div><span>Subtotal</span><span>{formatCurrency(bill.subtotal)}</span></div>
                        <div><span>Tax</span><span>{formatCurrency(bill.tax)}</span></div>
                        <div><span>Service</span><span>{formatCurrency(bill.service)}</span></div>
                        <div className="grand"><span>Total</span><span>{formatCurrency(bill.grandTotal)}</span></div>
                      </div>
                      <p className="print-thanks">Thank you. Visit again.</p>
                    </div>

                    <div className="inv-actions no-print">
                      <button className="print-btn" onClick={() => window.print()}>
                        <FaPrint /> Print Bill
                      </button>
                      {selectedOrder.status === 'Unbilled' && (
                        <button className="save-btn" onClick={() => markPaid(selectedOrder.id)}>
                          <FaCheckCircle /> Mark Paid
                        </button>
                      )}
                    </div>
                  </article>
                );
              })()
            ) : (
              <div className="no-selection">
                <FaFileInvoice size={50} color="#ccc" />
                <p>Select an order to generate bill</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminBilling;
