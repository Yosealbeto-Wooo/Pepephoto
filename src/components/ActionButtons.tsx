
import React from 'react';
import type { ImageData } from '../types';
import { DownloadIcon, ResetIcon, ShareIcon, NewImageIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface ActionButtonsProps {
  currentImage: ImageData | undefined;
  onReset: () => void;
  onNewImage: () => void;
  isDisabled: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ currentImage, onReset, onNewImage, isDisabled }) => {
  const { t } = useLanguage();
  
  const handleDownload = () => {
    const link = document.createElement('a');
    
    if (currentImage) {
      link.href = currentImage.data;
      link.download = `edited-image-${Date.now()}.png`;
    } else {
      return;
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    // A real implementation would use the Web Share API if available
    if (navigator.share && currentImage) {
      fetch(currentImage.data)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'edited-image.png', { type: blob.type });
          navigator.share({
            title: 'Image edited with Gemini',
            text: 'Check out this image I enhanced!',
            files: [file],
          })
          .catch(error => console.log('Error sharing:', error));
        });
    } else {
        console.log("Share functionality placeholder. A real app could connect to social media APIs.");
        alert("Share feature is not fully implemented in this demo.");
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg mt-4 p-4 flex items-center justify-between flex-wrap gap-2">
      <div className="flex items-center gap-2">
        <button
            onClick={onNewImage}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            title="Upload a different image"
        >
            <NewImageIcon className="w-5 h-5" />
            {t('actions.new')}
        </button>
        <button
            onClick={onReset}
            disabled={isDisabled}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Revert all changes to original"
        >
            <ResetIcon className="w-5 h-5" />
            {t('actions.reset')}
        </button>
      </div>
      <div className="flex items-center gap-2">
         <button
            onClick={handleShare}
            disabled={!currentImage}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            title="Share on social media"
        >
            <ShareIcon className="w-5 h-5" />
            {t('actions.share')}
        </button>
        <button
            onClick={handleDownload}
            disabled={!currentImage}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
            title={t('actions.download')}
        >
            <DownloadIcon className="w-5 h-5" />
            {t('actions.download')}
        </button>
      </div>
    </div>
  );
};