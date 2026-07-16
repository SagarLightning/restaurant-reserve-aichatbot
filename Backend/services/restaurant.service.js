// services/restaurant.service.js

import productModel from "../models/productModels.js";
import restaurantConfig from "../config/restaurant.config.js";
/**
 * Service to retrieve dynamic restaurant context and menu items.
 */
export async function getRestaurantContext() {
    return restaurantConfig;
}

/**
 * Retrieves all currently available menu items from MongoDB with rich Phase 2 metadata.
 */
export async function getLiveMenuItems() {
    try {
        const products = await productModel.find({})
            .select("name price description category cuisine vegetarian vegan spicy calories protein ingredients tags -_id")
            .lean();
        return products || [];
    } catch (error) {
        console.error("Error fetching live menu items for chatbot:", error.message);
        return [];
    }
}

