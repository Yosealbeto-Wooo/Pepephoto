// FIX: Defined the AIStudio interface and declared it globally on the window object.
// This provides a single, consistent type definition across the application, resolving conflicts.
declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // FIX: Made 'aistudio' optional to resolve a declaration conflict and align with its usage.
    aistudio?: AIStudio;
  }
}

export interface ImageData {
  data: string; // base64 data URL
  mimeType: string;
}

export interface HistoryItem {
  imageData: ImageData;
  description: string;
}