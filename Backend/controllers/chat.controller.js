// controllers/chat.controller.js

import { getChatResponse } from "../services/chat.service.js";

export async function handleChat(req, res) {
    try {
        const { message, history } = req.body;
        
        if (!message || typeof message !== "string" || !message.trim()) {
            return res.status(400).json({ 
                success: false, 
                message: "A valid message string is required" 
            });
        }

        // Validate and format optional history if provided by frontend
        const validHistory = Array.isArray(history) ? history : [];

        const reply = await getChatResponse(message.trim(), validHistory);
        
        return res.json({ 
            success: true, 
            reply 
        });
    } catch (error) {
        console.error("Error in handleChat controller:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error occurred while processing your chat request",
        });
    }
}
