
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "../constants";
import { Message } from "../types";

export const getAIStylistResponse = async (chatHistory: Message[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const productList = PRODUCTS.map(p => `${p.name} (${p.category}, $${p.price})`).join(', ');
  
  const systemInstruction = `
    You are the FLAME Concierge, an AI representative for the high-end streetwear brand FLAME.
    Brand DNA: Confident, Minimal, Premium, Silent, Intense.
    Voice: Speak with authority and economy. No fluff. No excessive emojis. Use bold statements.
    Product Catalog: ${productList}.
    Goal: Assist users in acquiring DROP 001 and styling it with the collection. 
    Lumina doesn't exist anymore. There is only FLAME.
    If they ask for fashion advice, emphasize clean fits, oversized silhouettes, and "igniting the fire within".
  `;

  const contents = chatHistory.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
      },
    });

    return response.text || "Connection lost. Focus on the flame.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The silence continues. Try again shortly.";
  }
};
