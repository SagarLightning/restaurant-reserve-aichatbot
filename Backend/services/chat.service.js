// services/chat.service.js

import groq from "../config/groq.config.js";
import { getRestaurantContext, getLiveMenuItems } from "./restaurant.service.js";
import { buildSystemPrompt } from "../prompts/assistant.prompt.js";

/**
 * Generates an AI response using dynamic restaurant context and live menu data.
 * @param {string} userMessage - The latest message from the user.
 * @param {Array} [chatHistory=[]] - Optional conversation history [{ role: 'user'|'assistant', content: string }]
 * @returns {Promise<string>} The AI assistant's reply.
 */
export async function getChatResponse(userMessage, chatHistory = []) {
    // 1. Fetch live context from database and configuration
    const [restaurantInfo, menuItems] = await Promise.all([
        getRestaurantContext(),
        getLiveMenuItems()
    ]);

    // 2. Build structured system prompt
    const systemPromptContent = buildSystemPrompt({ restaurantInfo, menuItems });

    // 3. Construct messages array with system prompt and conversation context
    const messages = [
        {
            role: "system",
            content: systemPromptContent,
        },
        ...chatHistory.map(msg => ({
            role: msg.role === "assistant" || msg.role === "user" ? msg.role : "user",
            content: msg.content
        })),
        {
            role: "user",
            content: userMessage,
        }
    ];

    // 4. Request completion from Groq Llama 3.3 70B Versatile
    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.7,
        max_tokens: 800,
    });

    return completion.choices[0]?.message?.content || "I apologize, but I am temporarily unable to process your request. Please ask again shortly!";
}