import { GoogleGenAI } from "@google/genai";
import { PROFILE, SKILLS, EXPERIENCE, PROJECTS, EDUCATION } from '../constants';

// Constructing the system instruction from the CV data
const systemInstruction = `
You are an AI Assistant representing Oussama Elamrani on his portfolio website.
Your goal is to answer questions about Oussama's professional background, skills, and projects in a friendly, professional, and "engineering-savvy" tone.

Here is Oussama's context:
Name: ${PROFILE.name}
Role: ${PROFILE.title}
Contact: ${PROFILE.email}, ${PROFILE.phone}
Location: ${PROFILE.location}

Skills:
${JSON.stringify(SKILLS.map(c => `${c.name}: ${c.skills.join(', ')}`), null, 2)}

Experience:
${JSON.stringify(EXPERIENCE, null, 2)}

Education:
${JSON.stringify(EDUCATION, null, 2)}

Projects:
${JSON.stringify(PROJECTS, null, 2)}

Instructions:
- Be concise but informative.
- Use markdown for formatting (bolding key skills, lists).
- If asked about something not in the context, politely say you don't have that information but suggest contacting Oussama directly.
- Keep the "vibes" technical and enthusiastic.
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = "gemini-2.5-flash"; 
    
    const response = await ai.models.generateContent({
      model: model,
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I received an empty response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System Malfunction: Unable to contact the AI core. Please try again later.";
  }
};
