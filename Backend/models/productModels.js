import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Number, required: true },
    // Phase 2: Recommendation Engine Metadata
    cuisine: { type: String, default: "General" },
    vegetarian: { type: Boolean, default: false },
    vegan: { type: Boolean, default: false },
    spicy: { type: Boolean, default: false },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    ingredients: { type: [String], default: [] },
    tags: { type: [String], default: [] }
});

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

// Indexes for optimization
productSchema.index({ category: 1 });
productSchema.index({ name: 'text' });

export default productModel;