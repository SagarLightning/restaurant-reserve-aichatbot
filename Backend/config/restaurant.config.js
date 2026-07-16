// config/restaurant.config.js

export const restaurantConfig = {
    name: "Lightning Ristorané",
    tagline: "Eat n Repeat | Never Feel Enough",
    contact: {
        phone: "+91 98765 43210",
        email: "reservations@gourmethaven.com",
        address: "1st Floor, Orion Tower, LBS Marg, Mulund West, Mumbai, Maharashtra 400080 India",
    },
    openingHours: {
        mondayToFriday: "11:00 AM - 10:00 PM",
        saturdayToSunday: "9:00 AM - 11:00 PM",
    },
    policies: {
        reservations: "Table reservations can be booked online through our website or by phone. We recommend booking at least 2 hours in advance.",
        cancellation: "Cancellations or modifications to reservations should be made at least 1 hour before the reserved time.",
        dressCode: "Smart Casual. We kindly request guests to avoid beachwear or gym attire.",
        paymentMethods: "We accept Cash, Visa, MasterCard, American Express, and UPI.",
        takeawayAndDelivery: "Takeaway is available during all open hours. Delivery is available through our official partners within a 10 km radius."
    },
    ambiance: "Warm, elegant, and family-friendly dining atmosphere with indoor and outdoor patio seating options."
};

export default restaurantConfig;
