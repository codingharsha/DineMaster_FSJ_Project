import { useState, useEffect, useCallback, useMemo } from "react";
import { StoreContext } from './StoreContext';
import axios from 'axios';
import { bank_offers, general_coupons, payment_offers } from "../assets/assets";

const DEFAULT_RESERVATION_DRAFT = {
    reservationDate: "",
    timeSlot: "",
    partySize: 2,
    selectedTable: null,
    metadata: {}
};

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [userName, setUserName] = useState(() => localStorage.getItem("userName") || "");
    const [userRole, setUserRole] = useState(() => localStorage.getItem("userRole") || "customer");
    const [kitchenTab, setKitchenTab] = useState("live");
    const [foodList, setFoodList] = useState([]);
    const [bookingDetails, setBookingDetails] = useState(() => {
        const saved = localStorage.getItem("bookingDetails");
        return saved ? JSON.parse(saved) : null;
    });
    const [reservationDraft, setReservationDraft] = useState(() => {
        const saved = localStorage.getItem("reservationDraft");
        return saved ? JSON.parse(saved) : DEFAULT_RESERVATION_DRAFT;
    });

    const [bookings, setBookings] = useState(() => {
        const saved = localStorage.getItem("bookings");
        return saved ? JSON.parse(saved) : [];
    });
    const [walletBalance, setWalletBalance] = useState(() => {
        const saved = localStorage.getItem("walletBalance");
        return saved ? Number(saved) : 0;
    });
    const [walletTransactions, setWalletTransactions] = useState(() => {
        const saved = localStorage.getItem("walletTransactions");
        return saved ? JSON.parse(saved) : [];
    });
    const [happinessCartItems, setHappinessCartItems] = useState(() => {
        const saved = localStorage.getItem("happinessCartItems");
        return saved ? JSON.parse(saved) : [];
    });
    const [happinessPurchases, setHappinessPurchases] = useState(() => {
        const saved = localStorage.getItem("happinessPurchases");
        return saved ? JSON.parse(saved) : [];
    });
    const [activeCoupon, setActiveCoupon] = useState(() => {
        const saved = localStorage.getItem("activeCoupon");
        return saved ? JSON.parse(saved) : null;
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [cartPulseToken, setCartPulseToken] = useState(0);
    const couponCatalog = useMemo(() => {
        const merged = [...general_coupons, ...bank_offers, ...payment_offers];
        const ruleMap = {
            WELCOME50: { minOrder: 299, firstOrderOnly: true, discountType: "percent", discountValue: 50, maxDiscount: 150, combinable: false },
            WEEKEND15: { minOrder: 999, discountType: "percent", discountValue: 15, maxDiscount: 250, combinable: false, limitedDays: ["FRI", "SAT", "SUN"] },
            FEAST100: { minOrder: 999, discountType: "flat", discountValue: 100, maxDiscount: 100, combinable: false, category: "family" },
            NIGHT20: { minOrder: 399, discountType: "percent", discountValue: 20, maxDiscount: 200, combinable: false, limitedTime: "23:00-03:00" },
            AXISFEAST: { minOrder: 1200, discountType: "percent", discountValue: 15, maxDiscount: 200, combinable: false, usageLimit: 2 },
            SBISUPER: { minOrder: 1500, discountType: "flat", discountValue: 150, maxDiscount: 150, combinable: false, premiumOnly: true },
            ICICITREATS: { minOrder: 799, discountType: "percent", discountValue: 10, maxDiscount: 180, combinable: false },
            HDFC5X: { minOrder: 1000, discountType: "percent", discountValue: 8, maxDiscount: 120, combinable: false },
            SAVE100: { minOrder: 499, discountType: "flat", discountValue: 100, maxDiscount: 100, combinable: true },
            HAPPY20: { minOrder: 200, discountType: "percent", discountValue: 20, maxDiscount: 250, combinable: false, walletEligible: true, happinessOnly: true },
            UPI50: { minOrder: 399, discountType: "flat", discountValue: 50, maxDiscount: 50, combinable: false },
            CREDOP: { minOrder: 799, discountType: "percent", discountValue: 12, maxDiscount: 500, combinable: false, premiumOnly: true }
        };
        return merged.map((offer) => ({ ...offer, rules: ruleMap[offer.code] || { minOrder: 300, discountType: "flat", discountValue: 30, maxDiscount: 30 } }));
    }, []);

    const showSuccess = useCallback((message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(""), 2200);
    }, []);

    const clearSuccess = useCallback(() => setSuccessMessage(""), []);

    const triggerCartPulse = useCallback(() => {
        setCartPulseToken(Date.now());
    }, []);

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

    const verifyOtp = async (credentials) => {
        try {
            const response = await axios.post(`${API_URL}/verify-otp`, credentials);
            const data = response.data || {};
            if (data?.message === "NEW_USER_REQUIRED") {
                return { authenticated: false, newUserRequired: true };
            }
            const authenticated = persistAuthSession(data);
            return { authenticated, newUserRequired: false };
        } catch (error) {
            const message = error?.response?.data?.message || "Invalid OTP or verification failed";
            throw new Error(message);
        }
    };


    const addBooking = (details) => {
        const enrichedBooking = { ...details, bookingFee: 50 };
        setBookingDetails(enrichedBooking);
        const newBooking = { ...details, id: "BKG" + Date.now(), status: "Confirmed" };
        const updatedBookings = [newBooking, ...bookings];
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
        localStorage.setItem("bookingDetails", JSON.stringify(enrichedBooking));
    };

    const finalizeBookingPayment = useCallback((paymentDetails) => {
        if (!paymentDetails?.razorpayPaymentId) return null;

        let savedBookings = [];
        try {
            savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        } catch {
            savedBookings = [];
        }

        const existingPaymentBooking = savedBookings.find(
            (booking) => booking.razorpayPaymentId === paymentDetails.razorpayPaymentId
        );
        if (existingPaymentBooking) {
            return existingPaymentBooking.id;
        }

        const matchIndex = savedBookings.findIndex(
            (booking) =>
                booking.table === paymentDetails.tableNumber &&
                booking.date === paymentDetails.date &&
                booking.time === paymentDetails.time
        );

        const enrichedBooking = {
            id: "BKG" + Date.now(),
            table: paymentDetails.tableNumber,
            date: paymentDetails.date,
            time: paymentDetails.time,
            guests: paymentDetails.guests || 2,
            status: "Completed",
            reservationStatus: "Completed",
            paymentStatus: paymentDetails.paymentStatus || "Paid",
            paymentAmount: (paymentDetails.amount || 0) / 100,
            paymentCurrency: paymentDetails.currency || "INR",
            razorpayPaymentId: paymentDetails.razorpayPaymentId,
            razorpayOrderId: paymentDetails.razorpayOrderId,
            transactionId: paymentDetails.razorpayPaymentId || paymentDetails.razorpayOrderId,
            paymentMethod: paymentDetails.paymentMethod || "Razorpay",
            items: paymentDetails.items || [],
            happinessCards: paymentDetails.happinessCards || [],
            couponCode: paymentDetails.couponCode || null,
            discountAmount: Number(paymentDetails.discount || 0),
            taxAmount: Number(paymentDetails.taxes || 0),
            finalPayable: Number(paymentDetails.finalPayable || ((paymentDetails.amount || 0) / 100)),
            orderedAt: new Date().toISOString()
        };

        if (matchIndex >= 0) {
            savedBookings[matchIndex] = {
                ...savedBookings[matchIndex],
                ...enrichedBooking,
                id: savedBookings[matchIndex].id || enrichedBooking.id
            };
        } else {
            savedBookings = [enrichedBooking, ...savedBookings];
        }

        setBookings(savedBookings);
        localStorage.setItem("bookings", JSON.stringify(savedBookings));
        if (Array.isArray(paymentDetails.happinessCards) && paymentDetails.happinessCards.length > 0) {
            setHappinessPurchases((prev) => {
                const newPurchases = paymentDetails.happinessCards.map((card, idx) => ({
                    id: `HCP-${Date.now()}-${idx}`,
                    title: card.title,
                    recipientName: card.recipientName || "Self",
                    amount: Number(card.price || 0),
                    message: card.message || "",
                    gifted: card.recipientName ? true : false,
                    paymentStatus: paymentDetails.paymentStatus || "Paid",
                    paymentMethod: paymentDetails.paymentMethod || "Razorpay",
                    transactionId: paymentDetails.razorpayPaymentId || paymentDetails.razorpayOrderId,
                    purchasedAt: new Date().toISOString()
                }));
                const next = [...newPurchases, ...prev];
                localStorage.setItem("happinessPurchases", JSON.stringify(next));
                return next;
            });
        }
        return matchIndex >= 0 ? savedBookings[matchIndex].id : enrichedBooking.id;
    }, []);

    const addHappinessCardToCart = useCallback((card) => {
        if (!card?.id) return;
        setHappinessCartItems((prev) => {
            const existing = prev.find((item) => item.id === card.id);
            let next;
            if (existing) {
                next = prev.map((item) =>
                    item.id === card.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                next = [...prev, { ...card, quantity: 1 }];
            }
            localStorage.setItem("happinessCartItems", JSON.stringify(next));
            return next;
        });
        triggerCartPulse();
        showSuccess("Happiness card added to cart");
    }, [showSuccess, triggerCartPulse]);

    const removeHappinessCardFromCart = useCallback((cardId) => {
        setHappinessCartItems((prev) => {
            const next = prev
                .map((item) => (item.id === cardId ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0);
            localStorage.setItem("happinessCartItems", JSON.stringify(next));
            return next;
        });
    }, []);

    const clearHappinessCart = useCallback(() => {
        setHappinessCartItems([]);
        localStorage.removeItem("happinessCartItems");
    }, []);

    const getHappinessCartAmount = useCallback(
        () => happinessCartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
        [happinessCartItems]
    );

    const addWalletTransaction = useCallback((entry) => {
        const txn = {
            id: entry?.id || `WTX-${Date.now()}`,
            type: entry?.type || "Wallet Recharge",
            direction: entry?.direction || "credit",
            amount: Number(entry?.amount || 0),
            status: entry?.status || "SUCCESS",
            paymentMethod: entry?.paymentMethod || "Razorpay",
            reference: entry?.reference || `RPY-${Date.now()}`,
            createdAt: entry?.createdAt || new Date().toISOString()
        };
        setWalletTransactions((prev) => {
            const next = [txn, ...prev];
            localStorage.setItem("walletTransactions", JSON.stringify(next));
            return next;
        });
        return txn;
    }, []);

    const topupWallet = useCallback((amount, paymentMeta = {}) => {
        const creditedAmount = Number(amount || 0);
        if (creditedAmount <= 0) return null;
        const nextBalance = walletBalance + creditedAmount;
        setWalletBalance(nextBalance);
        localStorage.setItem("walletBalance", String(nextBalance));
        return addWalletTransaction({
            type: "Wallet Recharge",
            direction: "credit",
            amount: creditedAmount,
            status: paymentMeta.status || "SUCCESS",
            paymentMethod: paymentMeta.paymentMethod || "Razorpay",
            reference: paymentMeta.reference || paymentMeta.razorpayPaymentId || `RPY-${Date.now()}`
        });
    }, [walletBalance, addWalletTransaction]);

    const debitWallet = useCallback((amount, type, reference) => {
        const debitAmount = Number(amount || 0);
        if (debitAmount <= 0 || walletBalance < debitAmount) return false;
        const nextBalance = walletBalance - debitAmount;
        setWalletBalance(nextBalance);
        localStorage.setItem("walletBalance", String(nextBalance));
        addWalletTransaction({
            type: type || "Food Payment",
            direction: "debit",
            amount: debitAmount,
            status: "SUCCESS",
            paymentMethod: "Happiness Wallet",
            reference: reference || `HW-${Date.now()}`
        });
        return true;
    }, [walletBalance, addWalletTransaction]);

    const updateReservationDraft = useCallback((updates) => {
        setReservationDraft((prev) => {
            const next = { ...prev, ...updates };
            const isUnchanged = JSON.stringify(prev) === JSON.stringify(next);
            if (isUnchanged) {
                return prev;
            }
            localStorage.setItem("reservationDraft", JSON.stringify(next));
            return next;
        });
    }, []);

    const clearReservationState = useCallback(() => {
        setReservationDraft(DEFAULT_RESERVATION_DRAFT);
        setBookingDetails(null);
        localStorage.removeItem("reservationDraft");
        localStorage.removeItem("bookingDetails");
        localStorage.removeItem("reservationId");
    }, []);

    const resetCustomerState = useCallback(() => {
        setToken("");
        setUserName("");
        setUserRole("customer");
        setCartItems({});
        setBookings([]);
        setBookingDetails(null);
        setReservationDraft(DEFAULT_RESERVATION_DRAFT);
        setWalletBalance(0);
        setWalletTransactions([]);
        setHappinessCartItems([]);
        setHappinessPurchases([]);
        setActiveCoupon(null);
        setSuccessMessage("");
        setCartPulseToken(0);

        [
            "token",
            "userName",
            "userRole",
            "bookings",
            "bookingDetails",
            "reservationDraft",
            "reservationId",
            "walletBalance",
            "walletTransactions",
            "happinessCartItems",
            "happinessPurchases",
            "activeCoupon",
            "cartItems"
        ].forEach((key) => localStorage.removeItem(key));
        sessionStorage.clear();
    }, []);


    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
        triggerCartPulse();
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    };

    const clearCart = useCallback(() => {
        setCartItems({});
    }, []);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = foodList.find((product) => String(product.id ?? product._id) === String(item));
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getCartMetrics = useCallback(() => {
        const foodAmount = getTotalCartAmount();
        const happinessAmount = getHappinessCartAmount();
        const reservationFee = bookingDetails ? (bookingDetails.bookingFee ?? 50) : 0;
        return {
            foodAmount,
            happinessAmount,
            reservationFee,
            subtotal: foodAmount + happinessAmount + reservationFee
        };
    }, [getTotalCartAmount, getHappinessCartAmount, bookingDetails]);

    const validateCoupon = useCallback((couponCode) => {
        const coupon = couponCatalog.find((item) => item.code.toLowerCase() === couponCode.toLowerCase());
        if (!coupon) return { valid: false, message: "Coupon does not exist." };

        const metrics = getCartMetrics();
        const now = new Date();
        const hour = now.getHours();
        const dayMap = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        const today = dayMap[now.getDay()];
        const isPremiumUser = bookings.length + happinessPurchases.length >= 3;
        const isFirstOrder = bookings.length === 0;

        if (coupon.rules.minOrder && metrics.subtotal < coupon.rules.minOrder) {
            return { valid: false, message: `Valid only above Rs.${coupon.rules.minOrder}.` };
        }
        if (coupon.rules.firstOrderOnly && !isFirstOrder) {
            return { valid: false, message: "Only valid for first order." };
        }
        if (coupon.rules.premiumOnly && !isPremiumUser) {
            return { valid: false, message: "Only for premium users." };
        }
        if (coupon.rules.happinessOnly && metrics.happinessAmount <= 0) {
            return { valid: false, message: "Add a Happiness Card to apply this coupon." };
        }
        if (coupon.rules.limitedTime && !(hour >= 23 || hour <= 3)) {
            return { valid: false, message: "This coupon is active only between 11 PM and 3 AM." };
        }
        if (coupon.rules.limitedDays && !coupon.rules.limitedDays.includes(today)) {
            return { valid: false, message: "This coupon is valid only for weekend dining." };
        }
        return { valid: true, coupon };
    }, [bookings.length, couponCatalog, getCartMetrics, happinessPurchases.length]);

    const getCouponDiscount = useCallback((coupon) => {
        if (!coupon) return 0;
        const { subtotal } = getCartMetrics();
        const rule = coupon.rules || {};
        let discount = rule.discountType === "percent"
            ? (subtotal * (rule.discountValue || 0)) / 100
            : Number(rule.discountValue || 0);
        discount = Math.min(discount, rule.maxDiscount || discount, subtotal);
        return Number(discount.toFixed(2));
    }, [getCartMetrics]);

    const applyCoupon = useCallback((couponCode) => {
        const validation = validateCoupon(couponCode);
        if (!validation.valid) {
            return validation;
        }
        const selected = validation.coupon;
        setActiveCoupon(selected);
        localStorage.setItem("activeCoupon", JSON.stringify(selected));
        showSuccess(`${selected.code} applied successfully`);
        return { valid: true, coupon: selected };
    }, [showSuccess, validateCoupon]);

    const removeCoupon = useCallback(() => {
        setActiveCoupon(null);
        localStorage.removeItem("activeCoupon");
    }, []);

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

    const promoteCustomerToStaff = ({ customerPhoneNumber, staffEmail, temporaryPassword }) =>
        axios.post(`${ADMIN_URL}/promote-staff`, { customerPhoneNumber, staffEmail, temporaryPassword }, authHeaders());

    const fetchStaffMembers = () => axios.get(`${ADMIN_URL}/staff`, authHeaders());
    const deleteStaffAccount = (id) => axios.delete(`${ADMIN_URL}/staff/${id}`, authHeaders());


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
        finalizeBookingPayment,
        couponCatalog, activeCoupon, applyCoupon, removeCoupon, validateCoupon, getCouponDiscount, getCartMetrics,
        walletBalance, walletTransactions, topupWallet, debitWallet,
        happinessCartItems, happinessPurchases, addHappinessCardToCart,
        removeHappinessCardFromCart, clearHappinessCart, getHappinessCartAmount,
        addWalletTransaction,
        successMessage, showSuccess, clearSuccess, cartPulseToken,
        resetCustomerState,
        reservationDraft, updateReservationDraft, clearReservationState,
        clearCart,
        sendOtp, verifyOtp, loginWithPassword, changePasswordOnFirstLogin,
        fetchFoodList, updateFoodItem, addFoodItem, deleteFoodItem,
        ANALYTICS_URL,
        fetchDashboardStats,
        fetchTodaySales, fetchWeeklySales, fetchMonthlySales, fetchYearlySales,
        fetchStaff, addStaffMember, updateStaffMember, deleteStaffMember, reportStaffIssue,
        submitFeedback, fetchAllFeedback, fetchFeedbackSummary,
        replyToReview, flagReview, deleteReview,
        fetchSettings, saveSettings,
        createStaffAccount, promoteCustomerToStaff, fetchStaffMembers, deleteStaffAccount,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
