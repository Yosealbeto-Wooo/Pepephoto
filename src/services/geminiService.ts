
import { GoogleGenAI, Modality } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";

const getApiKey = (): string => {
  const apiKey = import.meta.env.VITE_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    // Este es el nuevo mensaje de error claro.
    throw new Error("La clave de API no está configurada. Revisa la variable de entorno VITE_API_KEY en tu configuración de Netlify y asegúrate de que tenga un valor válido.");
  }
  return apiKey;
};


export const editImage = async (
  base64ImageDataUrl: string,
  mimeType: string,
  prompt: string
): Promise<string> => {
  const apiKey = getApiKey();
  const ai = new GoogleGenAI({ apiKey });
  
  const base64Data = base64ImageDataUrl.split(',')[1];
  
  if (!base64Data) {
      throw new Error("Invalid base64 image data URL");
  }

  const response: GenerateContentResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData?.data) {
      return part.inlineData.data;
    }
  }

  throw new Error("No image data found in Gemini API response.");
};


export const generateVideoFromImage = async (
    base64ImageDataUrl: string,
    mimeType: string,
    prompt: string
): Promise<Blob> => {
    const apiKey = getApiKey();
    // Create a new instance for each call to ensure the latest API key is used
    const ai = new GoogleGenAI({ apiKey });
    
    const base64Data = base64ImageDataUrl.split(',')[1];

    if (!base64Data) {
        throw new Error("Invalid base64 image data URL");
    }

    let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        image: {
            imageBytes: base64Data,
            mimeType: mimeType,
        },
        config: {
            numberOfVideos: 1,
            resolution: '720p',
            aspectRatio: '16:9'
        }
    });

    // Poll for the result every 10 seconds
    while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
        throw new Error("Video generation failed or returned no data.");
    }
    
    const response = await fetch(`${downloadLink}&key=${apiKey}`);
    if (!response.ok) {
        throw new Error(`Failed to download video: ${response.statusText}`);
    }

    return response.blob();
};
