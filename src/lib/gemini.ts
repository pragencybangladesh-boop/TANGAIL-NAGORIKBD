import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getAIResponse = async (prompt: string, context: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${context}\n\nUser Question: ${prompt}\n\nPlease respond in Bengali. Keep it helpful, concise, and related to Nagorik BD (Citizen Portal) district information.`,
    });
    
    return response.text || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";
  } catch (error) {
    console.error("AI Error:", error);
    return "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে পরে চেষ্টা করুন।";
  }
};
