import React, { useContext, useEffect, useMemo, useState } from 'react';
import AdminSidebar from '../AdminSidebar/AdminSidebar';
import { StoreContext } from '../../../Context/StoreContext';
import { FaArrowUp, FaWallet, FaUtensils, FaUsers, FaClock } from 'react-icons/fa';
import './AdminSalesReport.scss';

const AdminSalesReport = () => {
  const { fetchTodaySales, fetchWeeklySales } = useContext(StoreContext);
  const [todayData, setTodayData] = useState({});
  const [weekData, setWeekData] = useState([]);
  const [liveBookings, setLiveBookings] = useState([]);
  const [walletTx, setWalletTx] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [t, w] = await Promise.all([fetchTodaySales(), fetchWeeklySales()]);
        setTodayData(t.data || {});
        setWeekData(w.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [fetchTodaySales, fetchWeeklySales]);

  useEffect(() => {
    const pull = () => {
      setLiveBookings(JSON.parse(localStorage.getItem('bookings') || '[]'));
      setWalletTx(JSON.parse(localStorage.getItem('walletTransactions') || '[]'));
    };
    pull();
    const timer = setInterval(pull, 6000);
    return () => clearInterval(timer);
  }, []);

  const metrics = useMemo(() => {
    const totalRevenue = weekData.reduce((sum, d) => sum + Number(d.totalRevenue || 0), 0);
    const totalOrders = weekData.reduce((sum, d) => sum + Number(d.totalOrders || 0), 0);
    const avgOrder = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;
    const paymentSuccess = liveBookings.filter((b) => String(b.paymentStatus || '').toLowerCase() === 'paid').length;
    const paymentFailed = liveBookings.filter((b) => String(b.paymentStatus || '').toLowerCase() === 'failed').length;
    const walletRecharges = walletTx.filter((t) => t.type === 'Wallet Recharge').length;
    return {
      totalRevenue,
      totalOrders,
      avgOrder,
      paymentSuccess,
      paymentFailed,
      walletRecharges,
      occupancy: Math.min(95, Math.round((liveBookings.length / 50) * 100)),
      conversion: liveBookings.length ? Math.min(98, Math.round((paymentSuccess / liveBookings.length) * 100)) : 0
    };
  }, [weekData, liveBookings, walletTx]);

  if (loading) return <div className='admin-container'><AdminSidebar /><div className='admin-content'><p>Loading sales insights...</p></div></div>;

  return (
    <div className='admin-container'>
      <AdminSidebar />
      <div className='admin-content'>
        <header className='admin-header'>
          <h1>Sales and Operations Insights</h1>
          <p style={{ color: '#8a96a9' }}>KPI driven revenue and transaction intelligence</p>
        </header>

        <div className='stats-grid' style={{ marginBottom: 20 }}>
          <div className='stat-card'><div className='stat-icon revenue'><FaWallet /></div><div className='stat-info'><h3>Rs.{(todayData.totalRevenue || 0).toLocaleString()}</h3><p>Today Revenue</p></div></div>
          <div className='stat-card'><div className='stat-icon orders'><FaUtensils /></div><div className='stat-info'><h3>{metrics.totalOrders}</h3><p>Weekly Orders</p></div></div>
          <div className='stat-card'><div className='stat-icon users'><FaUsers /></div><div className='stat-info'><h3>{metrics.occupancy}%</h3><p>Occupancy Rate</p></div></div>
          <div className='stat-card'><div className='stat-icon pending'><FaClock /></div><div className='stat-info'><h3>Rs.{metrics.avgOrder.toLocaleString()}</h3><p>Avg Order Value</p></div></div>
        </div>

        <div className='sales-insight-grid'>
          <div className='insight-card'>
            <h3>Reservation Conversion</h3>
            <div className='meter'><div style={{ width: `${metrics.conversion}%` }} /></div>
            <p>{metrics.conversion}% paid confirmations</p>
          </div>
          <div className='insight-card'>
            <h3>Payment Split</h3>
            <p><span className='ok'>Success:</span> {metrics.paymentSuccess}</p>
            <p><span className='bad'>Failed:</span> {metrics.paymentFailed}</p>
            <p><span className='pending'>Pending:</span> {Math.max(0, liveBookings.length - metrics.paymentSuccess - metrics.paymentFailed)}</p>
          </div>
          <div className='insight-card'>
            <h3>Wallet and Card Activity</h3>
            <p>Wallet Recharges: {metrics.walletRecharges}</p>
            <p>Happiness Card Sales: {JSON.parse(localStorage.getItem('happinessPurchases') || '[]').length}</p>
            <p>Repeat Reservation Rate: {Math.min(90, Math.round(metrics.totalOrders ? (liveBookings.length / metrics.totalOrders) * 100 : 0))}%</p>
          </div>
        </div>

        <div className='dashboard-widget'>
          <div className='widget-header'><h2>Recent Revenue Events</h2></div>
          <table className='admin-table'>
            <thead><tr><th>Date</th><th>Orders</th><th>Revenue</th><th>Trend</th></tr></thead>
            <tbody>
              {weekData.slice(-7).map((day, idx) => (
                <tr key={idx}>
                  <td>{new Date(day.date).toLocaleDateString()}</td>
                  <td>{day.totalOrders || 0}</td>
                  <td>Rs.{Math.round(day.totalRevenue || 0).toLocaleString()}</td>
                  <td><span className='trend-badge'><FaArrowUp /> Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSalesReport;
