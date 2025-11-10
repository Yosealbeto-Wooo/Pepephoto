
import React, { useCallback, useState } from 'react';
import { UploadIcon, LoaderIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface FileUploadProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onImageUpload, isLoading }) => {
  const { t } = useLanguage();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].type.startsWith('image/')) {
        onImageUpload(e.dataTransfer.files[0]);
      }
    }
  }, [onImageUpload]);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <div className="flex items-center justify-center h-full max-w-2xl mx-auto">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`w-full h-80 border-4 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-blue-500 bg-gray-700/50' : 'border-gray-600 hover:border-blue-500 hover:bg-gray-800/50'}`}
      >
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
        {isLoading ? (
            <>
                <LoaderIcon className="w-16 h-16 animate-spin text-blue-500" />
                <p className="mt-4 text-lg">{t('upload.processing')}</p>
            </>
        ) : (
            <>
                <UploadIcon className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold">{t('upload.title')}</h2>
                <p className="text-gray-400 mt-2">{t('upload.or')}</p>
                <span className="mt-2 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                {t('upload.browse')}
                </span>
                <p className="text-xs text-gray-500 mt-4">{t('upload.supports')}</p>
            </>
        )}
      </label>
    </div>
  );
};
