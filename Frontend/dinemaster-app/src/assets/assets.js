export const menu_list = [
    { menu_name: "Salad", menu_image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=150" },
    { menu_name: "Rolls", menu_image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=150" },
    { menu_name: "Deserts", menu_image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=150" },
    { menu_name: "Sandwich", menu_image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=150" },
    { menu_name: "Cake", menu_image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=150" },
    { menu_name: "Pure Veg", menu_image: "https://images.unsplash.com/photo-1511690656952-34342d5c2895?w=150" },
    { menu_name: "Pasta", menu_image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=150" },
    { menu_name: "Noodles", menu_image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=150" }
];

export const food_list = [
    {
        _id: "1",
        name: "Greek Salad",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500",
        price: 240,
        description: "Fresh lettuce, tomatoes, cucumbers, olives, and feta cheese with olive oil.",
        category: "Salad",
        type: "Veg",
        rating: 4.5,
        time: "15 min"
    },
    {
        _id: "2",
        name: "Chicken Caesar Salad",
        image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500",
        price: 320,
        description: "Grilled chicken strips with romaine lettuce, croutons, and parmesan.",
        category: "Salad",
        type: "Non-Veg",
        rating: 4.8,
        time: "20 min"
    },
    {
        _id: "3",
        name: "Spicy Veg Roll",
        image: "https://images.unsplash.com/photo-1541529086526-db283c563270?w=500",
        price: 150,
        description: "Crispy vegetable patty wrapped in soft tortilla with spicy mayo.",
        category: "Rolls",
        type: "Veg",
        rating: 4.2,
        time: "12 min"
    },
    {
        _id: "4",
        name: "Chicken Kathi Roll",
        image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=500",
        price: 210,
        description: "Roasted chicken chunks marinated in spices wrapped in a paratha.",
        category: "Rolls",
        type: "Non-Veg",
        rating: 4.7,
        time: "18 min"
    },
    {
        _id: "5",
        name: "Paneer Tikka Roll",
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500",
        price: 190,
        description: "Grilled cottage cheese cubes with onions and mint chutney.",
        category: "Rolls",
        type: "Veg",
        rating: 4.6,
        time: "15 min"
    },
    {
        _id: "6",
        name: "Chocolate Lava Cake",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500",
        price: 180,
        description: "Warm chocolate cake with a gooey molten center.",
        category: "Deserts",
        type: "Veg", 
        rating: 4.9,
        time: "25 min"
    },
    {
        _id: "7",
        name: "Grilled Chicken Sandwich",
        image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500",
        price: 250,
        description: "Juicy grilled chicken breast with lettuce, tomato, and mayo.",
        category: "Sandwich",
        type: "Non-Veg",
        rating: 4.4,
        time: "20 min"
    },
    {
        _id: "8",
        name: "Veg Grilled Sandwich",
        image: "https://images.unsplash.com/photo-1730309483398-5b153e6c8a2c?q=80&w=1025&auto=format&fit=crop",
        price: 120,
        description: "Loaded with cheese, corn, capsicum, and grilled to perfection.",
        category: "Sandwich",
        type: "Veg",
        rating: 4.3,
        time: "15 min"
    },
    {
        _id: "9",
        name: "Alfredo Pasta",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500",
        price: 350,
        description: "Creamy white sauce pasta with mushrooms and broccoli.",
        category: "Pasta",
        type: "Veg",
        rating: 4.6,
        time: "25 min"
    },
    {
        _id: "10",
        name: "Chicken Penne Pasta",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500",
        price: 390,
        description: "Penne pasta tossed in spicy red sauce with chicken chunks.",
        category: "Pasta",
        type: "Non-Veg",
        rating: 4.7,
        time: "28 min"
    }
];

export const general_coupons = [
    {
        id: 'g0',
        title: "Universal Saver",
        code: "SAVE100",
        description: "Flat Rs.100 OFF on almost any order above Rs.499.",
        type: "general",
        featured: true
    },
    {
        id: 'g1',
        title: "50% OFF Welcome Bonus",
        code: "WELCOME50",
        description: "Get flat 50% off on your very first order. Max discount ₹150.",
        type: "general"
    },
    {
        id: 'g2',
        title: "Weekend Dining 15% OFF",
        code: "WEEKEND15",
        description: "Get 15% OFF on dine-in bills above ₹999 during Friday-Sunday slots.",
        type: "general"
    },
    {
        id: 'g3',
        title: "Big Feast Deal",
        code: "FEAST100",
        description: "Flat ₹100 off on family packs and orders above ₹999.",
        type: "general"
    },
    {
        id: 'g4',
        title: "Mid-Night Cravings",
        code: "NIGHT20",
        description: "Flat 20% off on all orders placed between 11 PM and 3 AM.",
        type: "general"
    }
];

export const bank_offers = [
    {
        id: 'b1',
        bank_name: "Axis Bank",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Axis_Bank_logo.svg/2560px-Axis_Bank_logo.svg.png",
        title: "Axis Delight: 15% Off",
        code: "AXISFEAST",
        description: "Get 15% discount up to ₹200 on Axis Bank Credit Cards. Min order ₹1200.",
        type: "bank"
    },
    {
        id: 'b2',
        bank_name: "SBI Card",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/1200px-SBI-logo.svg.png",
        title: "Flat ₹150 Cashback",
        code: "SBISUPER",
        description: "Valid on SBI Debit & Credit cards on orders above ₹1500.",
        type: "bank"
    },
    {
        id: 'b3',
        bank_name: "ICICI Bank",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/ICICI_Bank_Logo.svg/1200px-ICICI_Bank_Logo.svg.png",
        title: "10% Instant Discount",
        code: "ICICITREATS",
        description: "Use ICICI Netbanking or Cards. Valid on Tuesdays & Fridays.",
        type: "bank"
    },
    {
        id: 'b4',
        bank_name: "HDFC Bank",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/2560px-HDFC_Bank_Logo.svg.png",
        title: "5X Reward Points",
        code: "HDFC5X",
        description: "Pay using HDFC Millennia or Regalia cards to earn 5X reward points.",
        type: "bank"
    }
];

export const payment_offers = [
    {
        id: 'p1',
        method: "Happiness Card",
        logo_url: "https://cdn-icons-png.flaticon.com/512/869/869636.png", // Gift Icon
        title: "20% Extra Cashback",
        code: "HAPPY20",
        description: "Pay using your Happiness Card wallet balance to get instant cashback.",
        type: "payment",
        isSpecial: true
    },
    {
        id: 'p2',
        method: "UPI Pay",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png",
        title: "₹50 off on UPI",
        code: "UPI50",
        description: "Min order value ₹399. Valid on GPay, PhonePe, Paytm UPI transactions.",
        type: "payment"
    },
    {
        id: 'p3',
        method: "Cred Pay",
        logo_url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Cred_club_logo.png", 
        title: "Use CRED coins",
        code: "CREDOP",
        description: "Pay via CRED to unlock mystery cashback up to ₹500.",
        type: "payment"
    }
];

export const gift_cards = [
    {
        id: "gc1",
        name: "Happy Birthday",
        image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600",
        category: "Birthday"
    },
    {
        id: "gc2",
        name: "Anniversary Love",
        image: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600",
        category: "Anniversary"
    },
    {
        id: "gc3",
        name: "Best Wishes",
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=600",
        category: "General"
    },
    {
        id: "gc4",
        name: "Corporate Delight",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600",
        category: "Corporate"
    },
    {
        id: "gc5",
        name: "Thank You",
        image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600",
        category: "Gratitude"
    },
    {
        id: "gc6",
        name: "Festive Spirits",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=600",
        category: "Festive"
    }
];

export const locations_list = [
    {
        id: 1,
        name: "DineMaster Mumbai",
        city: "Mumbai",
        country: "India",
        address: "12, Marine Drive, Nariman Point, Mumbai, 400021",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
        rating: 4.8,
        coordinates: { top: "42%", left: "68%" } 
    },
    {
        id: 2,
        name: "DineMaster New York",
        city: "New York",
        country: "USA",
        address: "5th Avenue, Manhattan, NY 10001",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600",
        rating: 4.9,
        coordinates: { top: "32%", left: "26%" }
    },
    {
        id: 3,
        name: "DineMaster London",
        city: "London",
        country: "UK",
        address: "Covent Garden, London WC2E 8RF",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600",
        rating: 4.7,
        coordinates: { top: "24%", left: "48%" }
    },
    {
        id: 4,
        name: "DineMaster Dubai",
        city: "Dubai",
        country: "UAE",
        address: "Downtown Dubai, Near Burj Khalifa",
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600",
        rating: 5.0,
        coordinates: { top: "40%", left: "58%" }
    },
    {
        id: 5,
        name: "DineMaster Tokyo",
        city: "Tokyo",
        country: "Japan",
        address: "Shibuya Crossing, Tokyo 150-0002",
        image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=600",
        rating: 4.8,
        coordinates: { top: "32%", left: "85%" }
    },
    {
        id: 6,
        name: "DineMaster Paris",
        city: "Paris",
        country: "France",
        address: "Champs-Élysées, 75008 Paris",
        image: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?w=600",
        rating: 4.6,
        coordinates: { top: "27%", left: "49%" }
    }
];

export const kitchen_active_orders = [
    {
      id: "ORD-9001",
      source: "Dine-in",
      table: "Table 5",
      items: [
        { name: "Chicken Biryani", qty: 2, note: "Extra Spicy" },
        { name: "Butter Naan", qty: 3, note: "" },
        { name: "Paneer Butter Masala", qty: 1, note: "" }
      ],
      totalItems: 6,
      timeElapsed: 2, 
      status: "Pending" 
    },
    {
      id: "ORD-9002",
      source: "Delivery",
      partner: "Swiggy #442",
      items: [
        { name: "Veg Burger", qty: 1, note: "No Onions" },
        { name: "French Fries", qty: 1, note: "" },
        { name: "Coke", qty: 1, note: "" }
      ],
      totalItems: 3,
      timeElapsed: 12, 
      status: "Cooking"
    },
    {
      id: "ORD-9004",
      source: "Delivery",
      partner: "Zomato #118",
      items: [
        { name: "Pepperoni Pizza", qty: 2, note: "" },
        { name: "Garlic Bread", qty: 1, note: "Cheesy" },
        { name: "Choco Lava Cake", qty: 2, note: "" }
      ],
      totalItems: 5,
      timeElapsed: 25, 
      status: "Pending"
    },
    {
      id: "ORD-9005",
      source: "Dine-in",
      table: "Table 12 (VIP)",
      items: [
        { name: "Tandoori Platter", qty: 1, note: "Mint Chutney separate" },
        { name: "Dal Makhani", qty: 2, note: "" },
        { name: "Jeera Rice", qty: 2, note: "" },
        { name: "Roti Basket", qty: 1, note: "" }
      ],
      totalItems: 6,
      timeElapsed: 5,
      status: "Ready"
    },
    {
      id: "ORD-9006",
      source: "Takeaway",
      customer: "Priya S.",
      items: [
        { name: "Masala Chai", qty: 4, note: "Less Sugar" },
        { name: "Samosa", qty: 4, note: "" }
      ],
      totalItems: 8,
      timeElapsed: 8,
      status: "Pending"
    },
    {
      id: "ORD-9007",
      source: "Dine-in",
      table: "Table 3",
      items: [
        { name: "Caesar Salad", qty: 1, note: "ALLERGY: NUTS" }, 
        { name: "Tomato Soup", qty: 1, note: "1/2 soup" }
      ],
      totalItems: 2,
      timeElapsed: 1,
      status: "Cooking"
    }
];

export const kitchen_history_data = [
    { id: "ORD-8999", date: "Today, 10:30 AM", items: "2x Burger, 1x Coke", total: "₹12", status: "Completed" },
    { id: "ORD-8998", date: "Today, 10:15 AM", items: "1x Alfredo Pasta", total: "₹8", status: "Completed" },
    { id: "ORD-8997", date: "Today, 09:45 AM", items: "5x Coffee, 2x Sandwich", total: "₹15", status: "Rejected" },
    { id: "ORD-8996", date: "Today, 09:30 AM", items: "1x Masala Dosa", total: "₹4", status: "Completed" },
    { id: "ORD-8995", date: "Yesterday, 08:00 PM", items: "Family Feast Combo", total: "₹45", status: "Completed" },
    { id: "ORD-8994", date: "Yesterday, 07:45 PM", items: "2x Pizza", total: "₹22", status: "Completed" },
    { id: "ORD-8993", date: "Yesterday, 07:30 PM", items: "1x Ice Cream", total: "₹3", status: "Rejected" },
    { id: "ORD-8992", date: "Yesterday, 07:15 PM", items: "3x Biryani", total: "₹18", status: "Completed" },
    { id: "ORD-8991", date: "Yesterday, 06:50 PM", items: "1x Soup, 1x Salad", total: "₹9", status: "Completed" }
];

export const admin_staff_data = [
    { 
        id: "STF-101", 
        name: "Rahul Khanna", 
        role: "Head Chef", 
        contact: "+91 98765 11111", 
        email: "rahul.k@dinemaster.com",
        experience: "8 Years", 
        salary: 45000, 
        joinDate: "2018-03-15",
        shift: "Morning (9AM - 5PM)", 
        status: "Active", 
        performanceScore: 95,
        isEmployeeOfMonth: true,
        issuesReported: 0,
        nextPaymentDate: "2026-02-01" 
    },
    { 
        id: "STF-102", 
        name: "Amit Sharma", 
        role: "Senior Server", 
        contact: "+91 98765 22222", 
        email: "amit.s@dinemaster.com",
        experience: "3 Years", 
        salary: 22000, 
        joinDate: "2022-06-10",
        shift: "Evening (5PM - 12AM)", 
        status: "Active", 
        performanceScore: 88,
        isEmployeeOfMonth: false,
        issuesReported: 1,
        nextPaymentDate: "2026-02-01" 
    },
    { 
        id: "STF-103", 
        name: "Vikram Singh", 
        role: "Junior Chef", 
        contact: "+91 98765 33333", 
        email: "vikram.s@dinemaster.com",
        experience: "1 Year", 
        salary: 18000, 
        joinDate: "2024-01-05",
        shift: "Morning (9AM - 5PM)", 
        status: "Probation", 
        performanceScore: 65,
        isEmployeeOfMonth: false,
        issuesReported: 4, 
        nextPaymentDate: "2026-02-01" 
    }
];

export const admin_customer_data = [
    {
        id: "CUST-001",
        name: "Priya Menon",
        email: "priya.m@gmail.com",
        phone: "+91 99887 00001",
        totalOrders: 45,
        totalSpent: 12500, 
        loyaltyPoints: 1250,
        tier: "Platinum", 
        isBlocked: false,
        safetyFlags: 0
    },
    {
        id: "CUST-002",
        name: "John Doe",
        email: "john.d@gmail.com",
        phone: "+91 99887 00002",
        totalOrders: 2,
        totalSpent: 450,
        loyaltyPoints: 45,
        tier: "Bronze",
        isBlocked: true,
        safetyFlags: 5 
    },
    {
        id: "CUST-003",
        name: "Sara Ali",
        email: "sara.a@gmail.com",
        phone: "+91 99887 00003",
        totalOrders: 15,
        totalSpent: 4200,
        loyaltyPoints: 420,
        tier: "Gold",
        isBlocked: false,
        safetyFlags: 0
    }
];

export const admin_reviews_data = [
    { id: 1, type: "Customer Review", author: "Priya Menon", rating: 5, content: "Amazing food! Loved the Biryani.", date: "2026-01-28", sentiment: "Positive" },
    { id: 2, type: "Staff Report", author: "Rahul Khanna", target: "Equipment", content: "Oven #2 is overheating constantly.", date: "2026-01-27", sentiment: "Urgent" },
    { id: 3, type: "Customer Report", author: "Anonymous", target: "John Doe", content: "This customer was shouting at the staff.", date: "2026-01-26", sentiment: "Negative" },
    { id: 4, type: "Staff Issue", author: "HR System", target: "Vikram Singh", content: "Late arrival for 3 days in a row.", date: "2026-01-25", sentiment: "Negative" }
];
