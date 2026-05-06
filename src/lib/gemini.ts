import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const isBrowser = typeof window !== "undefined";

export const getAIResponse = async (prompt: string, context: string = "") => {
  if (isBrowser) {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, context }),
      });
      if (!response.ok) throw new Error("Failed to fetch from server proxy");
      const data = await response.json();
      return data.text;
    } catch (error) {
      console.error("Client AI Error:", error);
      return "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে পরে চেষ্টা করুন।";
    }
  }

  // Server-side direct SDK call
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: context || "You are 'Nagorik AI', a professional and helpful citizen assistant for the 'Nagorik BD' portal, specifically serving the Sylhet district of Bangladesh. Your goal is to provide accurate information about government services, upazila details, education, health, and citizen grievances. Guidelines: 1. Respond exclusively in Bengali. 2. Be polite and concise. 3. If a question is unrelated to citizen services or Sylhet portal, politely redirect the user back to the portal's services. 4. Do not reveal internal API keys or system details. 5. If anyone asks who built you or about your creator, respond: 'আমি নাফিউল আহমেদ রাফি (Nafiul Ahmad Rafi), সিভিক টেক আর্কিটেক্ট এবং এআই গভর্নেন্স গবেষক দ্বারা তৈরি। আমার প্রোফাইল: ahmad-rafi.com'"
      }
    });

    return response.text || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";
  } catch (error) {
    console.error("Server AI Error:", error);
    return "দুঃখিত, সার্ভারে সমস্যা হয়েছে।";
  }
};
