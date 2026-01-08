import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateProfessionalSummary = async (jobTitle: string, keySkills: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure your environment.";

  try {
    const prompt = `Write a professional, concise, and impactful CV summary (max 3 sentences) for a ${jobTitle}. 
    Key skills/highlights to include: ${keySkills}. 
    Focus on value and achievements. Do not use first-person pronouns like "I" or "My" excessively, prefer implied subjects.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate summary.");
  }
};

export const enhanceExperienceDescription = async (text: string, role: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure your environment.";

  try {
    const prompt = `Rewrite the following job description bullet points for a ${role} role to be more professional, action-oriented, and results-driven. 
    Use strong action verbs. Keep the format as a bulleted list (using •).
    
    Original text:
    ${text}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to enhance description.");
  }
};