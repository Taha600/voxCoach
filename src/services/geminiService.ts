import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateScript = async (goal: string, context: string, duration: number) => {
  const prompt = `Generate a speech script for the following goal: "${goal}". 
  Context: ${context}. 
  Target duration: ${duration} seconds.
  The script should be professional, engaging, and tailored to the context. 
  Format the response as a clean script with clear sections if necessary.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating script:", error);
    throw error;
  }
};
