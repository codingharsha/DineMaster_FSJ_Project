import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentSuccess.scss";

const PaymentSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return (
            <div className="payment-fallback">
                <h2>No payment details found</h2>
                <button onClick={() => navigate("/")}>Go Home</button>
            </div>
        );
    }

    const {
        razorpayPaymentId,
        tableNumber,
        items,
        amount,
        date,
        time
    } = state;

    return (
        <div className="payment-success">
            <h1>🎉 Payment Successful</h1>
            <p className="subtitle">Your table is reserved & order confirmed</p>

            <div className="ticket">
                <div className="ticket-header">
                    <h2>DineMaster</h2>
                    <span className="status">CONFIRMED</span>
                </div>

                <div className="ticket-body">
                    <div className="row">
                        <span>Table</span>
                        <b>{tableNumber}</b>
                    </div>

                    <div className="row">
                        <span>Date</span>
                        <b>{date}</b>
                    </div>

                    <div className="row">
                        <span>Time</span>
                        <b>{time}</b>
                    </div>

                    <div className="divider" />

                    <div className="items">
                        <h4>Order Summary</h4>
                        {items.map((item, i) => (
                            <div key={i} className="item-row">
                                <span>{item.name} × {item.quantity}</span>
                                <span>₹{item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    <div className="divider" />

                    <div className="row total">
                        <span>Total Paid</span>
                        <b>₹{amount / 100}</b>
                    </div>
                </div>

                <div className="ticket-footer">
                    <p>Payment ID</p>
                    <small>{razorpayPaymentId}</small>
                </div>
            </div>

            <button className="home-btn" onClick={() => navigate("/")}>
                Back to Home
            </button>
        </div>
    );
};

export default PaymentSuccess;
