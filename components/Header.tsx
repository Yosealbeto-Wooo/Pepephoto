
import React from 'react';
import { SparklesIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-center">
        <SparklesIcon className="w-8 h-8 text-blue-400 mr-3" />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {t('app.title')}
        </h1>
      </div>
    </header>
  );
};
