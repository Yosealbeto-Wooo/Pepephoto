
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { EditorControls } from './components/EditorControls';
import { ImageComparator } from './components/ImageComparator';
import { HistoryPanel } from './components/HistoryPanel';
import { ActionButtons } from './components/ActionButtons';
import { fileToBase64 } from './utils';
import { editImage } from './services/geminiService';
import type { HistoryItem, ImageData } from './types';
import { LoaderIcon } from './components/icons';
import { useLanguage } from './contexts/LanguageContext';
import { LanguageSelector } from './components/LanguageSelector';

// FIX: Removed the global declaration for window.aistudio to avoid conflicts. It is now defined centrally in types.ts.

export default function App() {
  const { locale, t } = useLanguage();
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [isCheckingApiKey, setIsCheckingApiKey] = useState(true);

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        if (window.aistudio) {
          setHasApiKey(await window.aistudio.hasSelectedApiKey());
        } else if (process.env.API_KEY) {
          setHasApiKey(true);
        } else {
          setHasApiKey(false);
        }
      } catch (e) {
        console.error("Error checking API key", e);
        setHasApiKey(false);
      } finally {
        setIsCheckingApiKey(false);
      }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageData = await fileToBase64(file);
      setOriginalImage(imageData);
      const initialHistoryItem: HistoryItem = {
        imageData: imageData,
        description: t('history.original'),
      };
      setHistory([initialHistoryItem]);
      setCurrentHistoryIndex(0);
    } catch (err) {
      setError(t('error.load'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = useCallback(async (prompt: string, description: string) => {
    if (!history.length) return;

    setIsLoading(true);
    setError(null);

    try {
      const currentImage = history[currentHistoryIndex].imageData;
      const newBase64 = await editImage(currentImage.data, currentImage.mimeType, prompt);
      
      const newImageData: ImageData = {
          data: `data:${currentImage.mimeType};base64,${newBase64}`,
          mimeType: currentImage.mimeType,
      };

      const newHistoryItem: HistoryItem = {
        imageData: newImageData,
        description,
      };

      const newHistory = [...history.slice(0, currentHistoryIndex + 1), newHistoryItem];
      
      setHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);

    } catch (err: any) {
      // Handle potential API key errors from the SDK
      if (err.message.includes("API key not valid") || err.message.includes("Requested entity was not found")) {
        setError(t('error.apiKey.description'));
        // In AI Studio, we can re-trigger the key selection
        if (window.aistudio) {
            setHasApiKey(false);
        }
      } else {
        setError(t('error.edit', { message: err.message }));
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [history, currentHistoryIndex, t]);

  const handleRevert = (index: number) => {
    setCurrentHistoryIndex(index);
  };
    
  const handleReset = () => {
    if(originalImage) {
        const initialHistoryItem: HistoryItem = {
            imageData: originalImage,
            description: t('history.original'),
        };
        setHistory([initialHistoryItem]);
        setCurrentHistoryIndex(0);
    }
  };

  const handleNewImage = () => {
    setOriginalImage(null);
    setHistory([]);
    setCurrentHistoryIndex(0);
    setError(null);
  };

  const currentImage = history[currentHistoryIndex]?.imageData;

  if (!locale) {
    return <LanguageSelector />;
  }
  
  if (isCheckingApiKey) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
        <LoaderIcon className="w-16 h-16 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!hasApiKey) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
            {window.aistudio ? (
                 <div className="bg-gray-800 p-8 rounded-lg text-center space-y-4 max-w-md shadow-xl">
                    <h2 className="text-2xl font-bold">{t('video_generator.api_key.title')}</h2>
                    <p className="text-gray-300">{t('video_generator.api_key.description')}</p>
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                        {t('video_generator.api_key.billing_link')}
                    </a>
                    <button
                        onClick={handleSelectKey}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-2"
                    >
                        {t('video_generator.api_key.button')}
                    </button>
                </div>
            ) : (
                <div className="bg-red-900/50 border border-red-700 p-8 rounded-lg text-center space-y-4 max-w-lg shadow-xl">
                    <h2 className="text-2xl font-bold text-red-200">{t('error.apiKey.title')}</h2>
                    <p className="text-red-200">
                        {t('error.apiKey.description')}
                    </p>
                </div>
            )}
        </main>
      </div>
    );
  }


  const isBusy = isLoading;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        {!originalImage ? (
          <FileUpload onImageUpload={handleImageUpload} isLoading={isLoading} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
            {/* Image Panel */}
            <div className="lg:col-span-9 flex flex-col h-full">
              <div className="relative flex-grow bg-gray-800 rounded-xl shadow-lg p-4 flex justify-center min-h-[50vh] lg:min-h-0">
                {isBusy && (
                  <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-20 rounded-xl text-center p-4">
                    <LoaderIcon className="w-16 h-16 animate-spin text-blue-500" />
                    <p className="mt-4 text-lg font-semibold">{t('loader.enhancing')}</p>
                  </div>
                )}
                {error && (
                  <div className="absolute top-4 left-4 right-4 bg-red-500 text-white p-3 rounded-lg z-30 text-center">
                    {error}
                  </div>
                )}

                {originalImage && currentImage && (
                  <ImageComparator
                    original={originalImage.data}
                    edited={currentImage.data}
                  />
                )}
              </div>
              <ActionButtons
                currentImage={currentImage}
                onReset={handleReset}
                onNewImage={handleNewImage}
                isDisabled={isBusy || history.length <= 1}
              />
            </div>

            {/* Controls Panel */}
            <div className="lg:col-span-3 bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col space-y-6 h-full">
              <EditorControls onEdit={handleEdit} isDisabled={isBusy} />
              <HistoryPanel 
                history={history} 
                currentIndex={currentHistoryIndex} 
                onRevert={handleRevert} 
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
