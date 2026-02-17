import React, { useState, useContext, useMemo } from 'react'; 
import './KitchenDashboard.scss';
import { StoreContext } from '../../../Context/StoreContext';
import { FaUtensils, FaMotorcycle, FaShoppingBag, FaClock, FaCheck, FaTimes, FaBell, FaSearch, FaToggleOn, FaToggleOff, FaFilter } from "react-icons/fa";
import { kitchen_active_orders, kitchen_history_data } from '../../../assets/assets';

const KitchenDashboard = () => {

  const { kitchenTab, food_list } = useContext(StoreContext);
  const [orders, setOrders] = useState(kitchen_active_orders); 
  const [inventory, setInventory] = useState(food_list);
  const [orderFilter, setOrderFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [liveSubTab, setLiveSubTab] = useState("Incoming");
  const getSourceIcon = (source) => {
      if(source === "Dine-in") return <FaUtensils />;
      if(source === "Delivery") return <FaMotorcycle />;
      return <FaShoppingBag />;
  };

  const simulateNewOrder = () => {
      alert("DING! New Order Received!");
  };

  const toggleStock = (id) => {
      setInventory(inventory.map(item => 
          item._id === id ? { ...item, available: !item.available } : item 
      ));
  };
  const filteredOrders = useMemo(() => {
      if (orderFilter === "All") return orders;
      if (orderFilter === "Dine-in") return orders.filter(o => o.source === "Dine-in");
      if (orderFilter === "Online") return orders.filter(o => o.source === "Delivery" || o.source === "Takeaway");
      return orders;
  }, [orders, orderFilter]);
  const handleAcceptClick = (order) => { setSelectedOrder(order); setShowAcceptModal(true); };
  const handleRejectClick = (order) => { setSelectedOrder(order); setShowRejectModal(true); };
  
  const confirmAccept = (prepTime) => {
      setOrders(orders.filter(o => o.id !== selectedOrder.id));
      setShowAcceptModal(false);
      setSelectedOrder(null);
  };
  const confirmReject = (reason) => {
      setOrders(orders.filter(o => o.id !== selectedOrder.id));
      setShowRejectModal(false);
      setSelectedOrder(null);
  };


  const renderLiveOrders = () => {
      
      const currentViewOrders = filteredOrders.filter(order => {
          if (liveSubTab === "Incoming") return order.status === "Pending";
          if (liveSubTab === "Preparing") return order.status === "Cooking"; 
          if (liveSubTab === "Ready") return order.status === "Ready";
          return true;
      });

      return (
      <>
          <div className="sub-tabs">
              <button 
                  className={`sub-tab-btn ₹{liveSubTab === 'Incoming' ? 'active' : ''}`}
                  onClick={() => setLiveSubTab('Incoming')}>
                  Incoming <span className="badge">{orders.filter(o => o.status === "Pending").length}</span>
              </button>
              <button 
                  className={`sub-tab-btn ₹{liveSubTab === 'Preparing' ? 'active' : ''}`}
                  onClick={() => setLiveSubTab('Preparing')}>
                  Preparing <span className="badge">{orders.filter(o => o.status === "Cooking").length}</span>
              </button>
              <button 
                  className={`sub-tab-btn ₹{liveSubTab === 'Ready' ? 'active' : ''}`}
                  onClick={() => setLiveSubTab('Ready')}>
                  Ready for Pickup <span className="badge">{orders.filter(o => o.status === "Ready").length}</span>
              </button>
          </div>

          <div className="orders-filter-bar">
          </div>

          <div className="kds-grid">
              {currentViewOrders.length === 0 ? (
                  <div className="no-orders">
                      <h2>No orders in {liveSubTab}</h2>
                  </div>
              ) : (
                  currentViewOrders.map((order) => (
                      <div key={order.id} className={`order-card ₹{order.status === 'Ready' ? 'ready-state' : ''} ₹{order.timeElapsed > 10 ? 'urgent' : ''}`}>
                          
                          {/* HEADER */}
                          <div className="card-header">
                              <div className="order-id">
                                  <span className={`source-icon ₹{order.source === 'Dine-in' ? 'dine-in' : 'online'}`}>
                                      {getSourceIcon(order.source)}
                                  </span>
                                  {order.id}
                              </div>
                              <div className="timer"><FaClock /> {order.timeElapsed}m</div>
                          </div>
                          
                          <div className="card-info" style={{ borderLeft: order.source !== "Dine-in" ? "4px solid #f26622" : "4px solid #4caf50" }}>
                              <p className="customer-info">
                                  {order.source === "Dine-in" ? order.table : order.partner || order.customer}
                              </p>
                          </div>

                          <div className="items-list">
                              {order.items.map((item, index) => (
                                  <div key={index} className="order-item" onClick={(e) => {
                                      e.currentTarget.classList.toggle('bumped');
                                  }}>
                                      {order.status !== 'Pending' && <span className="checkbox-circle"></span>}
                                      
                                      <span className="qty">{item.qty}x</span>
                                      <span className="name">{item.name} {item.note && <span className="note">({item.note})</span>}</span>
                                  </div>
                              ))}
                          </div>

                          <div className="card-actions">
                              {order.status === "Pending" && (
                                  <>
                                      <button className="btn-reject" onClick={() => handleRejectClick(order)}><FaTimes /> Reject</button>
                                      <button className="btn-accept" onClick={() => handleAcceptClick(order)}><FaCheck /> Accept</button>
                                  </>
                              )}
                              
                              {order.status === "Cooking" && (
                                  <button className="btn-accept" style={{width: '100%'}} onClick={() => {
                                      alert("Marking Order Ready!");
                                  }}>
                                      Mark Ready
                                  </button>
                              )}

                              {order.status === "Ready" && (
                                  <button className="btn-delivered" onClick={() => {
                                      alert("Order Picked Up!");
                                  }}>
                                      <FaCheck /> Complete & Archive
                                  </button>
                              )}
                          </div>
                      </div>
                  ))
              )}
          </div>
      </>
      );
  }
  const renderHistory = () => (
  <div className="history-container">
      <table className="history-table">
          <thead>
              <tr>
                  <th>Order ID</th>
                  <th>Date & Time</th>
                  <th>Items Summary</th>
                  <th>Total</th>
                  <th>Status</th>
              </tr>
          </thead>
          <tbody>
              {kitchen_history_data.map((order, index) => (
                  <tr key={index}>
                      <td className="highlight">{order.id}</td>
                      <td>{order.date}</td>
                      <td>{order.items}</td>
                      <td>{order.total}</td>
                      <td>
                          <span className={`status-badge ₹{order.status.toLowerCase()}`}>
                              {order.status}
                          </span>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div>
);
  
  const renderInventory = () => (
  <div className="inventory-container">
      <div className="inventory-header">
          <div className="search-bar">
              <FaSearch /> <input type="text" placeholder="Search item..." />
          </div>
      </div>
      <div className="inventory-grid">
          {inventory.map((item) => (
              <div key={item._id} className={`inv-card ₹{item.available === false ? 'out-of-stock' : ''}`}>
                  <img src={item.image} alt={item.name} />
                  <div className="inv-details">
                      <h4>{item.name}</h4>
                      <p>{item.category}</p>
                  </div>
                  
                  <div className="inv-action" onClick={() => toggleStock(item._id)}>
                      {item.available === false ? 
                          <FaToggleOff className="toggle-icon off" /> : 
                          <FaToggleOn className="toggle-icon on" />
                      }
                      <span className={item.available === false ? "status-off" : "status-on"}>
                          {item.available === false ? "Sold Out" : "In Stock"}
                      </span>
                  </div>
              </div>
          ))}
      </div>
  </div>
);

  return (
    <div className="kds-container">
        
        <div className="kds-header">
            <div className="kds-title">
                {kitchenTab === 'live' && <h1>👨‍🍳 Active Orders <span className="live-indicator">● LIVE</span></h1>}
                {kitchenTab === 'history' && <h1>📜 Order History</h1>}
                {kitchenTab === 'inventory' && <h1>📦 Stock Management</h1>}
            </div>
            
            {kitchenTab === 'live' && (
                <div className="kds-actions">
                     <button className="simulate-btn" onClick={simulateNewOrder}>
                        <FaBell /> Test Alert
                     </button>
                </div>
            )}
        </div>

        <div className="dashboard-content">
            {kitchenTab === 'live' && renderLiveOrders()}
            {kitchenTab === 'history' && renderHistory()}
            {kitchenTab === 'inventory' && renderInventory()}
        </div>

        {showAcceptModal && (
            <div className="modal-overlay">
                 <div className="modal-content">
                    <h2>Accept Order</h2>
                    <div className="prep-options">
                        <button onClick={() => confirmAccept(15)}>15 mins</button>
                        <button onClick={() => confirmAccept(20)}>20 mins</button>
                    </div>
                    <button className="close-modal" onClick={() => setShowAcceptModal(false)}>Cancel</button>
                </div>
            </div>
        )}

        {showRejectModal && (
             <div className="modal-overlay">
                <div className="modal-content">
                    <h2 className="text-red">Reject Order</h2>
                    <div className="reject-options">
                        <button onClick={() => confirmReject("Out of Stock")}>Out of Stock</button>
                        <button onClick={() => confirmReject("Busy")}>Kitchen Full</button>
                    </div>
                    <button className="close-modal" onClick={() => setShowRejectModal(false)}>Cancel</button>
                </div>
            </div>
        )}

    </div>
  )
}

export default KitchenDashboard;