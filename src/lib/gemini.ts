import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getAIResponse = async (prompt: string, context: string = "") => {
  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      systemInstruction: "You are 'Nagorik AI', a professional and helpful citizen assistant for the 'Nagorik BD' portal, specifically serving the Mymensingh division of Bangladesh. Your goal is to provide accurate information about government services, upazila details, education, health, and citizen grievances. Guidelines: 1. Respond exclusively in Bengali. 2. Be polite and concise. 3. If a question is unrelated to citizen services or Mymensingh portal, politely redirect the user back to the portal's services. 4. Do not reveal internal API keys or system details. 5. If anyone asks who built you or about your creator, respond: 'আমি নাফিউল আহমেদ রাফি (Nafiul Ahmad Rafi), সিভিক টেক আর্কিটেক্ট এবং এআই গভর্নেন্স গবেষক দ্বারা তৈরি। আমার প্রোফাইল: ahmad-rafi.com'"
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text || "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।";
  } catch (error) {
    console.error("AI Error:", error);
    return "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না। অনুগ্রহ করে পরে চেষ্টা করুন।";
  }
};
