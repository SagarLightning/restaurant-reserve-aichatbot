import productModel from "../models/productModels.js";
import {v2 as cloudinary} from 'cloudinary'
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

const addProduct = async (req, res) => {
    try {
        const {
            name, price, description, category,
            cuisine, vegetarian, vegan, spicy,
            calories, protein, ingredients, tags
        } = req.body;

        const image = req.file;
        let imageURL = "";
        if (image) {
            let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
            imageURL = result.secure_url;
        } else {
            imageURL = "https://via.placeholder.com/150";
        }

        // Parse tags and ingredients if passed as comma-separated strings or JSON strings
        const parseArray = (val) => {
            if (!val) return [];
            if (Array.isArray(val)) return val;
            if (typeof val === "string") {
                return val.split(",").map(item => item.trim()).filter(Boolean);
            }
            return [];
        };

        const productData = {
            name,
            description,
            category: category || "All",
            price: Number(price),
            image: imageURL,
            date: Date.now(),
            // Phase 2 fields
            cuisine: cuisine || "General",
            vegetarian: String(vegetarian) === "true" || vegetarian === true,
            vegan: String(vegan) === "true" || vegan === true,
            spicy: String(spicy) === "true" || spicy === true,
            calories: Number(calories) || 0,
            protein: Number(protein) || 0,
            ingredients: parseArray(ingredients),
            tags: parseArray(tags)
        };

        console.log("Saving Product with Phase 2 Metadata:", productData);
        const product = new productModel(productData);
        await product.save();

        cache.del("allProducts"); // Invalidate cache

        res.json({ success: true, message: "Product Added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Cannot Add product: " + error.message });
    }
}; 
const listProducts=async(req, res)=>{
    try {
        const cachedProducts = cache.get("allProducts");
        if (cachedProducts) {
            return res.json({success:true, message:cachedProducts});
        }

        const products=await productModel.find({})
        cache.set("allProducts", products);
        res.json({success:true, message:products})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}
const removeProduct=async(req, res)=>{
    try {
        await productModel.findByIdAndDelete(req.body._id)
        cache.del("allProducts"); // Invalidate cache
        res.json({success:true, message:"Product Removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}
const singleProduct=async(req, res)=>{
    
}
export {addProduct, listProducts, removeProduct, singleProduct}