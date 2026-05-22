import { useState, useEffect } from "react";
import { StoreContext } from './StoreContext';
import axios from 'axios';

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
    const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || "customer");
    const [kitchenTab, setKitchenTab] = useState("live");
    const [foodList, setFoodList] = useState([]);
    const [bookingDetails, setBookingDetails] = useState(null);

    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem("bookings");
        return saved ? JSON.parse(saved) : [];
    });

    const API_URL       = "http://localhost:8080/auth";
    const ADMIN_URL     = "http://localhost:8080/admin/users";
    const BASE_URL      = "http://localhost:8081";
    const ANALYTICS_URL = "http://localhost:8084/analytics";

    const decodeRoleFromToken = (jwtToken) => {
        try {
            const payload = JSON.parse(atob(jwtToken.split(".")[1]));
            const roleClaim = payload?.roles?.[0] || "";
            return roleClaim.replace("ROLE_", "");
        } catch {
            return "";
        }
    };

    const persistAuthSession = (responseData) => {
        const jwtToken = responseData?.token;
        if (!jwtToken) return false;
        const decodedRole = decodeRoleFromToken(jwtToken);
        const resolvedRole = decodedRole || responseData?.role || "";
        const resolvedName = responseData?.name || "";

        setToken(jwtToken);
        setUserName(resolvedName);
        setUserRole(resolvedRole);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("userName", resolvedName);
        localStorage.setItem("userRole", resolvedRole);
        return true;
    };

    const checkIdentity = async (identifier) => {
        const response = await axios.post(`${API_URL}/check-identity`, { identifier });
        return response.data;
    };

    const verifyOtp = async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/verify-otp`, credentials);
            return persistAuthSession(response.data);
        } catch (error) {
            const message = error?.response?.data?.message || "Invalid OTP or verification failed";
            throw new Error(message);
        }
    };


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
                let itemInfo = foodList.find((product) => product.id === item);
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/menu/all`);
            setFoodList(response.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };

    const sendOtp = async (identifier) => {
        try {
            const response = await axios.post(`${API_URL}/send-otp`, {
                identifier
            });
            return response.data;
        } catch (error) {
            const message =
                error?.response?.data?.message || "Failed to send OTP";
            throw new Error(message);
        }
    };

    const loginWithPassword = async ({ identifier, password }) => {
        try {
            const response = await axios.post(`${API_URL}/login-password`, { identifier, password });
            persistAuthSession(response.data);
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Login failed";
            throw new Error(message);
        }
    };

    const changePasswordOnFirstLogin = async ({ currentPassword, newPassword }) => {
        try {
            const response = await axios.post(
                `${API_URL}/password/change-first`,
                { currentPassword, newPassword },
                authHeaders()
            );
            return response.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Password update failed";
            throw new Error(message);
        }
    };

    const updateFoodItem = (id, item) => axios.put(`${BASE_URL}/menu/update/${id}`, item);
    const addFoodItem = (item) => axios.post(`${BASE_URL}/menu/add`, item);
    const deleteFoodItem = (id) => axios.delete(`${BASE_URL}/menu/delete/${id}`);


    const analyticsHeaders = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    const fetchDashboardStats = () => axios.get(`${ANALYTICS_URL}/dashboard`, analyticsHeaders());

    const fetchTodaySales = () => axios.get(`${ANALYTICS_URL}/sales/today`, analyticsHeaders());
    const fetchWeeklySales = () => axios.get(`${ANALYTICS_URL}/sales/weekly`, analyticsHeaders());
    const fetchMonthlySales = () => axios.get(`${ANALYTICS_URL}/sales/monthly`, analyticsHeaders());
    const fetchYearlySales = () => axios.get(`${ANALYTICS_URL}/sales/yearly`, analyticsHeaders());
    const fetchStaff = () => axios.get(`${ANALYTICS_URL}/staff`, analyticsHeaders());
    const addStaffMember = (s) => axios.post(`${ANALYTICS_URL}/staff`, s, analyticsHeaders());
    const updateStaffMember = (id, s) => axios.put(`${ANALYTICS_URL}/staff/${id}`, s, analyticsHeaders());
    const deleteStaffMember  = (id) => axios.delete(`${ANALYTICS_URL}/staff/${id}`, analyticsHeaders());
    const reportStaffIssue = (id) => axios.post(`${ANALYTICS_URL}/staff/${id}/report-issue`, {}, analyticsHeaders());

    const submitFeedback = (f) => axios.post(`${ANALYTICS_URL}/feedback`, f);  // public
    const fetchAllFeedback = () => axios.get(`${ANALYTICS_URL}/feedback`, analyticsHeaders());
    const fetchFeedbackSummary = () => axios.get(`${ANALYTICS_URL}/feedback/summary`, analyticsHeaders());
    const replyToReview = (id, reply) => axios.put(`${ANALYTICS_URL}/feedback/${id}/reply`, { reply }, analyticsHeaders());
    const flagReview = (id, flagged) => axios.put(`${ANALYTICS_URL}/feedback/${id}/flag`, { flagged }, analyticsHeaders());
    const deleteReview = (id) => axios.delete(`${ANALYTICS_URL}/feedback/${id}`, analyticsHeaders());

    const fetchSettings = () => axios.get(`${ANALYTICS_URL}/settings`, analyticsHeaders());
    const saveSettings = (s) => axios.post(`${ANALYTICS_URL}/settings`, s, analyticsHeaders());

    const authHeaders = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    const createStaffAccount = ({ name, mobileNumber, email, role, temporaryPassword }) =>
        axios.post(`${ADMIN_URL}/create-staff`, { name, mobileNumber, email, role, temporaryPassword }, authHeaders());


    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                setUserName(localStorage.getItem("userName"));
                setUserRole(localStorage.getItem("userRole"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list: foodList,
        cartItems, addToCart, removeFromCart, getTotalCartAmount,
        token, setToken,
        userName, setUserName,
        userRole, setUserRole,
        kitchenTab, setKitchenTab,
        bookings, bookingDetails, addBooking,
        checkIdentity, sendOtp, verifyOtp, loginWithPassword, changePasswordOnFirstLogin,
        fetchFoodList, updateFoodItem, addFoodItem, deleteFoodItem,
        ANALYTICS_URL,
        fetchDashboardStats,
        fetchTodaySales, fetchWeeklySales, fetchMonthlySales, fetchYearlySales,
        fetchStaff, addStaffMember, updateStaffMember, deleteStaffMember, reportStaffIssue,
        submitFeedback, fetchAllFeedback, fetchFeedbackSummary,
        replyToReview, flagReview, deleteReview,
        fetchSettings, saveSettings,
        createStaffAccount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
