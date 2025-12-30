
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { DiagnosticResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDiagnostic = async (imageB64?: string, symptoms?: string): Promise<DiagnosticResult> => {
  const model = 'gemini-3-pro-preview';
  
  const prompt = `
    As an expert avian veterinarian specializing in poultry (chickens, ducks, turkeys, etc.), analyze the provided symptoms and/or image.
    Provide a detailed diagnostic report.
    
    Symptoms described: ${symptoms || 'None provided'}
    ${imageB64 ? 'An image of the bird/symptoms is provided.' : ''}

    Rules:
    - Be scientific but accessible.
    - If specific disease is likely, name it.
    - Provide clear treatments from standard poultry medicine (mentioning generic drugs like Tylosin, Amoxicillin, Enrofloxacin or vaccines where applicable).
    - Rate the urgency.
    - EXPLICITLY state this is AI-assisted and they should consult a local vet.
  `;

  const contents: any[] = [{ text: prompt }];
  if (imageB64) {
    contents.push({
      inlineData: {
        mimeType: "image/jpeg",
        data: imageB64
      }
    });
  }

  const response = await ai.models.generateContent({
    model,
    contents: { parts: contents },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          disease: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          symptoms: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendedTreatments: { type: Type.ARRAY, items: { type: Type.STRING } },
          urgency: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Critical'] },
          explanation: { type: Type.STRING }
        },
        required: ["disease", "confidence", "symptoms", "recommendedTreatments", "urgency", "explanation"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};

export const getExpertAdvice = async (history: { role: string, text: string }[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-latest',
    config: {
      systemInstruction: "You are Dr. Cluck, a world-class avian healthcare AI assistant. You specialize in poultry pathology, pharmacology, and farm management. You provide precise, helpful, and compassionate medical advice for poultry farmers. Always mention bio-security measures and appropriate drug withdrawal periods if applicable."
    }
  });

  const lastMessage = history[history.length - 1].text;
  const result = await chat.sendMessage({ message: lastMessage });
  return result.text;
};

export const getPoultryNews = async () => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-latest',
    contents: "What are the latest poultry health trends, disease outbreaks, or medical breakthroughs globally for 2024 and 2025?",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  
  return {
    text: response.text,
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};
