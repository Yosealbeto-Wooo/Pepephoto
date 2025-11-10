
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { DownloadIcon } from './icons';

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
    const { t } = useLanguage();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = `animated-image-${Date.now()}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4">
            <video 
                src={src} 
                controls 
                autoPlay 
                loop
                className="max-w-full max-h-[calc(100%-60px)] object-contain rounded-lg shadow-lg"
                aria-label="Generated video"
            />
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
                <DownloadIcon className="w-5 h-5" />
                {t('actions.download_video')}
            </button>
        </div>
    );
}
