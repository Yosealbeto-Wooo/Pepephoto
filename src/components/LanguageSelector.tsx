
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages, translations } from '../translations';
import { SparklesIcon } from './icons';

export const LanguageSelector: React.FC = () => {
  const { setLocale } = useLanguage();

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 p-4">
      <div className="text-center">
        <SparklesIcon className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to Gemini Photo Enhancer
        </h1>
        <p className="text-lg text-gray-400 mb-8">
            {translations.en['lang.select']} / {translations.es['lang.select']} / {translations.zh['lang.select']}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl">
        {Object.entries(languages).map(([code, name]) => (
          <button
            key={code}
            onClick={() => setLocale(code)}
            className="p-4 bg-gray-800 rounded-lg text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 transform hover:scale-105"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};