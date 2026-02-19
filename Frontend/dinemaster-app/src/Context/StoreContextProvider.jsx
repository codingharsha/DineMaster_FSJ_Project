import { useState } from "react";
import { food_list } from '../assets/assets';
import { StoreContext } from './StoreContext';

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
    const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || "customer");
    const [kitchenTab, setKitchenTab] = useState("live");
    
    const [bookingDetails, setBookingDetails] = useState(null);

    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem("bookings");
        return saved ? JSON.parse(saved) : [];
    });

    const addBooking = (details) => {
        setBookingDetails({ ...details, bookingFee: 50 });
        
        const newBooking = { ...details, id: "BKG" + Date.now(), status: "Confirmed" };
        const updatedBookings = [newBooking, ...bookings];
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    };

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token, setToken,
        userName, setUserName,
        userRole, setUserRole,
        kitchenTab, setKitchenTab,
        bookings,
        bookingDetails,
        addBooking
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;