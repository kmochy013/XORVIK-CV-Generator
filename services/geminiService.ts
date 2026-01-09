import { GoogleGenAI } from "@google/genai";

// Helper to safely access the API Key in various environments (Vite, Webpack, Node)
const getApiKey = (): string => {
  let key = '';

  // 1. Try safe process.env access (Standard Node/Webpack/Vercel)
  try {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.API_KEY) {
        key = process.env.API_KEY;
      } else if (process.env.VITE_API_KEY) {
        key = process.env.VITE_API_KEY;
      }
    }
  } catch (e) {
    // Ignore error if process is not defined
  }

  // 2. Try Vite's import.meta.env (Modern Client-side)
  if (!key) {
    try {
      // @ts-ignore: Suppress TS error for import.meta in non-module contexts
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
        // @ts-ignore
        key = import.meta.env.VITE_API_KEY;
      }
    } catch (e) {
      // Ignore error
    }
  }

  return key;
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

export const generateProfessionalSummary = async (jobTitle: string, keySkills: string): Promise<string> => {
  if (!apiKey) {
    console.error("API Key is missing.");
    return "API Key is missing. Please check your .env file (or env.txt) and ensure VITE_API_KEY is set in Vercel.";
  }

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
    throw new Error("Failed to generate summary. Verify your API Key.");
  }
};

export const enhanceExperienceDescription = async (text: string, role: string): Promise<string> => {
  if (!apiKey) {
    console.error("API Key is missing.");
    return "API Key is missing. Please check your .env file (or env.txt) and ensure VITE_API_KEY is set in Vercel.";
  }

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
    throw new Error("Failed to enhance description. Verify your API Key.");
  }
};