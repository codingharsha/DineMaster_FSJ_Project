import React, { useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './KitchenDashboard.scss';
import { StoreContext } from '../../../Context/StoreContext';
import { FaCheckCircle, FaClock, FaExclamationTriangle, FaFire, FaSearch, FaTimesCircle } from 'react-icons/fa';
import { kitchen_active_orders, kitchen_history_data } from '../../../assets/assets';

const ORDER_API_URL = 'http://localhost:8082/orders';
const POLL_INTERVAL_MS = 15000;

const STATUS = {
  PLACED: 'PLACED',
  COOKING: 'COOKING',
  READY: 'READY',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED'
};

const KitchenDashboard = () => {
  const { kitchenTab, food_list } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [kitchenError, setKitchenError] = useState('');
  const [liveStatusFilter, setLiveStatusFilter] = useState('ALL');
  const [searchText, setSearchText] = useState('');
  const [inventorySearch, setInventorySearch] = useState('');
  const [inventoryMap, setInventoryMap] = useState({});
  const [updatingOrderId, setUpdatingOrderId] = useState('');

  const getMenuItemId = (item) => item?.id ?? item?._id;

  useEffect(() => {
    const map = {};
    food_list.forEach((item) => {
      map[getMenuItemId(item)] = item.available !== false;
    });
    setInventoryMap(map);
  }, [food_list]);

  const fetchKitchenOrders = async () => {
    setLoadingOrders(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${ORDER_API_URL}/kitchen`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setOrders(Array.isArray(response.data) ? response.data : []);
      setKitchenError('');
    } catch {
      setKitchenError('Unable to load live orders. Showing offline demo queue.');
      setOrders(
        kitchen_active_orders.map((o) => ({
          id: o.id,
          customerName: o.customer || o.partner || 'Walk-in',
          tableNumber: Number.parseInt((o.table || '').replace(/\D/g, ''), 10) || 0,
          items: o.items.map((item) => ({ name: item.name, quantity: item.qty, price: 0, foodItemId: '' })),
          totalAmount: 0,
          status: o.status === 'Pending' ? STATUS.PLACED : o.status === 'Cooking' ? STATUS.COOKING : STATUS.READY,
          orderTime: new Date(Date.now() - o.timeElapsed * 60000).toISOString()
        }))
      );
    } finally {
      setLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (kitchenTab !== 'live' && kitchenTab !== 'history') return undefined;
    fetchKitchenOrders();
    const intervalId = setInterval(fetchKitchenOrders, POLL_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, [kitchenTab]);

  const updateOrderStatus = async (orderId, nextStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${ORDER_API_URL}/update/${orderId}/${nextStatus}`, {}, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus } : o)));
    } catch {
      setKitchenError('Unable to update order status. Please retry.');
    } finally {
      setUpdatingOrderId('');
    }
  };

  const getElapsedMinutes = (orderTime) => {
    if (!orderTime) return 0;
    const diff = Date.now() - new Date(orderTime).getTime();
    return Math.max(0, Math.floor(diff / 60000));
  };

  const prettyStatus = (status) => status?.replace('_', ' ') || 'UNKNOWN';

  const searchedOrders = useMemo(() => {
    const keyword = searchText.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesStatus = liveStatusFilter === 'ALL' ? true : order.status === liveStatusFilter;
      if (!matchesStatus) return false;
      if (!keyword) return true;
      const byId = order.id?.toLowerCase().includes(keyword);
      const byCustomer = order.customerName?.toLowerCase().includes(keyword);
      const byItem = order.items?.some((it) => it.name?.toLowerCase().includes(keyword));
      return byId || byCustomer || byItem;
    });
  }, [orders, liveStatusFilter, searchText]);

  const historyOrders = useMemo(
    () => orders.filter((o) => o.status === STATUS.DELIVERED || o.status === STATUS.CANCELLED),
    [orders]
  );

  const liveCounts = useMemo(() => ({
    [STATUS.PLACED]: orders.filter((o) => o.status === STATUS.PLACED).length,
    [STATUS.COOKING]: orders.filter((o) => o.status === STATUS.COOKING).length,
    [STATUS.READY]: orders.filter((o) => o.status === STATUS.READY).length
  }), [orders]);

  const filteredInventory = useMemo(() => {
    const keyword = inventorySearch.trim().toLowerCase();
    return food_list.filter((item) => {
      if (!keyword) return true;
      return item.name?.toLowerCase().includes(keyword) || item.category?.toLowerCase().includes(keyword);
    });
  }, [food_list, inventorySearch]);

  const toggleInventoryStock = (foodId) => {
    setInventoryMap((prev) => ({ ...prev, [foodId]: !prev[foodId] }));
  };

  const renderActionButtons = (order) => {
    if (order.status === STATUS.PLACED) {
      return (
        <div className="k-card-actions">
          <button
            className="btn-danger"
            onClick={() => updateOrderStatus(order.id, STATUS.CANCELLED)}
            disabled={updatingOrderId === order.id}
          >
            Reject
          </button>
          <button
            className="btn-primary"
            onClick={() => updateOrderStatus(order.id, STATUS.COOKING)}
            disabled={updatingOrderId === order.id}
          >
            Start Cooking
          </button>
        </div>
      );
    }

    if (order.status === STATUS.COOKING) {
      return (
        <div className="k-card-actions">
          <button
            className="btn-primary full"
            onClick={() => updateOrderStatus(order.id, STATUS.READY)}
            disabled={updatingOrderId === order.id}
          >
            Mark Ready
          </button>
        </div>
      );
    }

    if (order.status === STATUS.READY) {
      return (
        <div className="k-card-actions">
          <button
            className="btn-success full"
            onClick={() => updateOrderStatus(order.id, STATUS.DELIVERED)}
            disabled={updatingOrderId === order.id}
          >
            Complete Order
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="kitchen-page">
      <div className="kitchen-hero">
        <div>
          <h1>Kitchen Command Center</h1>
          <p>Live queue control, prep tracking, and stock visibility in one workflow.</p>
        </div>
        <button className="refresh-btn" onClick={fetchKitchenOrders} disabled={loadingOrders}>
          {loadingOrders ? 'Refreshing...' : 'Refresh Queue'}
        </button>
      </div>

      {kitchenError && <div className="kitchen-alert">{kitchenError}</div>}

      {kitchenTab === 'live' && (
        <>
          <div className="k-summary-row">
            <div className="k-summary-card placed"><FaClock /><span>{liveCounts[STATUS.PLACED]} Placed</span></div>
            <div className="k-summary-card cooking"><FaFire /><span>{liveCounts[STATUS.COOKING]} Cooking</span></div>
            <div className="k-summary-card ready"><FaCheckCircle /><span>{liveCounts[STATUS.READY]} Ready</span></div>
            <div className="k-summary-card risk"><FaExclamationTriangle /><span>{orders.filter((o) => getElapsedMinutes(o.orderTime) >= 20).length} Delayed</span></div>
          </div>

          <div className="k-filter-bar">
            <div className="k-status-pills">
              {['ALL', STATUS.PLACED, STATUS.COOKING, STATUS.READY].map((state) => (
                <button
                  key={state}
                  className={liveStatusFilter === state ? 'pill active' : 'pill'}
                  onClick={() => setLiveStatusFilter(state)}
                >
                  {state === 'ALL' ? 'All' : prettyStatus(state)}
                </button>
              ))}
            </div>
            <div className="k-search-box">
              <FaSearch />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search by order id, customer, item..."
              />
            </div>
          </div>

          <div className="k-order-grid">
            {searchedOrders.length === 0 && (
              <div className="k-empty-state">No orders for the selected filter.</div>
            )}
            {searchedOrders.map((order) => {
              const elapsed = getElapsedMinutes(order.orderTime);
              return (
                <article
                  key={order.id}
                  className={`k-order-card ${elapsed >= 20 ? 'delay' : ''} ${order.status?.toLowerCase()}`}
                >
                  <header>
                    <div>
                      <h3>#{order.id}</h3>
                      <small>{order.customerName || `Table ${order.tableNumber || '-'}`}</small>
                    </div>
                    <span className="status-chip">{prettyStatus(order.status)}</span>
                  </header>

                  <div className="k-meta-line">
                    <span><FaClock /> {elapsed} min</span>
                    <span>Table {order.tableNumber || '-'}</span>
                  </div>

                  <ul className="k-item-list">
                    {order.items?.map((item, idx) => (
                      <li key={`${order.id}-${idx}`}>
                        <strong>{item.quantity}x</strong> {item.name}
                      </li>
                    ))}
                  </ul>

                  {renderActionButtons(order)}
                </article>
              );
            })}
          </div>
        </>
      )}

      {kitchenTab === 'history' && (
        <div className="k-history-block">
          <h2>Kitchen History</h2>
          <p>Completed and cancelled orders from the current queue cycle.</p>
          <table className="k-history-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer/Table</th>
                <th>Items</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {(historyOrders.length > 0 ? historyOrders : kitchen_history_data).map((entry, index) => (
                <tr key={entry.id || index}>
                  <td>{entry.id}</td>
                  <td>{entry.customerName || entry.date || `Table ${entry.tableNumber || '-'}`}</td>
                  <td>{Array.isArray(entry.items) ? entry.items.map((i) => `${i.quantity}x ${i.name}`).join(', ') : entry.items}</td>
                  <td>
                    <span className={`history-status ${(entry.status || '').toLowerCase()}`}>
                      {prettyStatus(entry.status)}
                    </span>
                  </td>
                  <td>{entry.orderTime ? new Date(entry.orderTime).toLocaleTimeString() : entry.total || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {kitchenTab === 'inventory' && (
        <div className="k-inventory-wrap">
          <div className="k-filter-bar">
            <div className="k-status-pills static">
              <button className="pill active">Inventory Snapshot</button>
            </div>
            <div className="k-search-box">
              <FaSearch />
              <input
                type="text"
                value={inventorySearch}
                onChange={(e) => setInventorySearch(e.target.value)}
                placeholder="Search menu stock..."
              />
            </div>
          </div>

          <div className="k-inventory-grid">
            {filteredInventory.map((item) => {
              const menuItemId = getMenuItemId(item);
              const inStock = inventoryMap[menuItemId] !== false;
              return (
                <article key={menuItemId} className={inStock ? 'inv-card in' : 'inv-card out'}>
                  <img src={item.image} alt={item.name} />
                  <div className="inv-copy">
                    <h4>{item.name}</h4>
                    <p>{item.category}</p>
                  </div>
                  <button
                    className={inStock ? 'stock-btn in' : 'stock-btn out'}
                    onClick={() => toggleInventoryStock(menuItemId)}
                  >
                    {inStock ? <FaCheckCircle /> : <FaTimesCircle />}
                    {inStock ? 'In Stock' : 'Sold Out'}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default KitchenDashboard;
