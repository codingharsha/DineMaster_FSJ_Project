import React, { useContext, useMemo, useState } from 'react';
import './Cart.scss';
import { StoreContext } from '../../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaChair, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { formatINR, getFoodId, getFoodImageSrc, withFallbackImage } from '../../../utils/customerUi';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    bookingDetails,
    happinessCartItems,
    getHappinessCartAmount,
    removeHappinessCardFromCart,
    couponCatalog,
    activeCoupon,
    applyCoupon,
    removeCoupon,
    getCouponDiscount,
    showSuccess
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState(activeCoupon?.code || '');

  const foodTotal = getTotalCartAmount();
  const happinessTotal = getHappinessCartAmount();
  const reservationFee = bookingDetails?.bookingFee ?? (bookingDetails ? 50 : 0);
  const subtotal = foodTotal + happinessTotal + reservationFee;
  const discount = activeCoupon ? getCouponDiscount(activeCoupon) : 0;
  const taxableBase = Math.max(subtotal - discount, 0);
  const taxes = Number((taxableBase * 0.05).toFixed(2));
  const finalPayable = Number((taxableBase + taxes).toFixed(2));

  const hasFoodItems = food_list.some((item) => cartItems[getFoodId(item)] > 0);
  const ORDER_SERVICE_URL = 'http://localhost:8082';

  const availableCoupons = useMemo(() => couponCatalog.slice(0, 8), [couponCatalog]);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      showSuccess('Please enter a coupon code.');
      return;
    }
    const result = applyCoupon(couponInput.trim());
    if (!result.valid) {
      showSuccess(result.message);
      return;
    }
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${ORDER_SERVICE_URL}/orders/place-and-pay`,
        {
          tableNumber: bookingDetails.table,
          couponCode: activeCoupon?.code || null,
          discount,
          taxAmount: taxes,
          finalAmount: finalPayable,
          items: Object.keys(cartItems)
            .filter((id) => cartItems[id] > 0)
            .map((id) => ({
              foodId: Number(id),
              quantity: cartItems[id]
            }))
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const { razorpayOrderId, amount, currency } = response.data;
      const paymentStatuses = ['Paid', 'Paid', 'Paid', 'Failed', 'Pending'];

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        order_id: razorpayOrderId,
        name: 'DineMaster',
        description: 'Table Reservation, Food & Happiness Cards',
        handler: function (responseData) {
          navigate('/payment-success', {
            state: {
              razorpayPaymentId: responseData.razorpay_payment_id,
              razorpayOrderId: responseData.razorpay_order_id,
              tableNumber: bookingDetails.table,
              date: bookingDetails.date,
              time: bookingDetails.time,
              amount,
              currency,
              paymentMethod: 'Razorpay',
              paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
              couponCode: activeCoupon?.code || null,
              discount,
              taxes,
              finalPayable,
              items: food_list
                .filter((item) => cartItems[getFoodId(item)] > 0)
                .map((item) => ({
                  name: item.name,
                  price: item.price,
                  quantity: cartItems[getFoodId(item)]
                })),
              happinessCards: happinessCartItems.map((card) => ({
                id: card.id,
                title: card.title,
                recipientName: card.recipientName,
                message: card.message,
                price: Number(card.price || 0) * Number(card.quantity || 0),
                quantity: card.quantity || 1
              }))
            }
          });
        },
        theme: { color: '#ff4500' }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment failed:', error);
      showSuccess('Payment initiation failed');
    }
  };

  return (
    <div className='cart customer-page-shell'>
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Item</p><p>Title</p><p>Price</p><p>Qty</p><p>Total</p><p></p>
        </div>
        <hr />

        {food_list.map((item, index) => {
          const itemId = getFoodId(item);
          if (cartItems[itemId] > 0) {
            return (
              <div key={index} className='cart-row'>
                <img src={getFoodImageSrc(item)} alt={item.name} onError={withFallbackImage} />
                <p className='item-name'>{item.name}</p>
                <p>{formatINR(item.price)}</p>
                <p>{cartItems[itemId]}</p>
                <p className='item-total'>{formatINR(item.price * cartItems[itemId])}</p>
                <FaTrash className='cross' onClick={() => removeFromCart(itemId)} />
              </div>
            );
          }
          return null;
        })}

        {!hasFoodItems && <p className='cart-list-empty'>No food items added yet. You can still continue with table reservation checkout.</p>}

        {happinessCartItems.length > 0 && (
          <>
            <div className='cart-items-title card-items-title'>
              <p>Card</p><p>Recipient</p><p>Price</p><p>Qty</p><p>Total</p><p></p>
            </div>
            <hr />
            {happinessCartItems.map((card) => (
              <div key={card.id} className='cart-row card-row'>
                <p className='hc-badge'>HC</p>
                <p className='item-name'>{card.title}</p>
                <p>{formatINR(Number(card.price || 0))}</p>
                <p>{card.quantity}</p>
                <p className='item-total'>{formatINR(Number(card.price || 0) * Number(card.quantity || 0))}</p>
                <FaTrash className='cross' onClick={() => removeHappinessCardFromCart(card.id)} />
              </div>
            ))}
          </>
        )}

        <div className='coupon-panel'>
          <h4>Coupons</h4>
          <div className='coupon-input-row'>
            <input value={couponInput} onChange={(e) => setCouponInput(e.target.value.toUpperCase())} placeholder='Enter coupon code' />
            <button className='dm-primary-btn' onClick={handleApplyCoupon}>Apply</button>
            {activeCoupon && <button className='remove' onClick={removeCoupon}>Remove</button>}
          </div>
          {activeCoupon && <p className='active-coupon'>Applied: <b>{activeCoupon.code}</b> ({activeCoupon.title}) {activeCoupon.featured ? '• Featured Universal Coupon' : ''}</p>}
          <div className='available-coupons'>
            {availableCoupons.map((coupon) => (
              <button key={coupon.id} className={coupon.featured ? 'featured-coupon-chip' : ''} onClick={() => { setCouponInput(coupon.code); applyCoupon(coupon.code); }}>
                {coupon.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className='checkout-card'>
        <h2>Final Checkout</h2>

        <div className='table-info'>
          <h4><FaCalendarAlt /> Reservation</h4>
          {bookingDetails ? (
            <>
              <p><FaChair /> Table <b>{bookingDetails.table}</b></p>
              <span>{bookingDetails.date} | {bookingDetails.time}</span>
            </>
          ) : (
            <button className='assign-btn dm-primary-btn' onClick={() => navigate('/book-table')}>Reserve a Table to Continue</button>
          )}
        </div>

        <div className='bill'>
          <div className='bill-row'><span>Food Total</span><span>{formatINR(foodTotal)}</span></div>
          <div className='bill-row'><span>Reservation Fee</span><span>{formatINR(reservationFee)}</span></div>
          <div className='bill-row'><span>Happiness Cards</span><span>{formatINR(happinessTotal)}</span></div>
          <div className='bill-row'><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
          <div className='bill-row discount-row'><span>Discount</span><span>- {formatINR(discount)}</span></div>
          <div className='bill-row'><span>Taxes (5%)</span><span>{formatINR(taxes)}</span></div>
          <div className='bill-row total'><span>Final Total</span><span>{formatINR(finalPayable)}</span></div>
        </div>

        {bookingDetails && foodTotal === 0 && <p className='cart-empty-note'>Food is optional. You are paying reservation fee only.</p>}
        {!bookingDetails && <p className='no-table-note'>Please reserve a table before proceeding to payment.</p>}

        <button className='pay-btn dm-primary-btn' disabled={!bookingDetails} onClick={handlePayment}>Pay via Razorpay</button>
        <p className='secure-text'>Secure payment powered by Razorpay</p>
      </div>
    </div>
  );
};

export default Cart;
