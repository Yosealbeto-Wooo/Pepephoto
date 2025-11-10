
// FIX: Defined the AIStudio interface and declared it globally on the window object.
// This provides a single, consistent type definition across the application, resolving conflicts.
export interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

declare global {
  interface Window {
    aistudio: AIStudio;
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
