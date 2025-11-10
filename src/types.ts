// FIX: Manually define types for Vite's `import.meta.env` to resolve TypeScript errors,
// as the automatic type inclusion from 'vite/client' was failing.
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  // FIX: Defined the AIStudio interface and declared it globally on the window object.
  // This provides a single, consistent type definition across the application, resolving conflicts.
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    // FIX: Made 'aistudio' optional to resolve a declaration conflict and align with its usage.
    aistudio?: AIStudio;
  }
}
// FIX: Removed incorrect global process definition. Vite client types will handle import.meta.env.

export interface ImageData {
  data: string; // base64 data URL
  mimeType: string;
}

export interface HistoryItem {
  imageData: ImageData;
  description: string;
}
