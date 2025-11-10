
import React from 'react';
import type { HistoryItem } from '../types';
import { HistoryIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface HistoryPanelProps {
  history: HistoryItem[];
  currentIndex: number;
  onRevert: (index: number) => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, currentIndex, onRevert }) => {
  const { t } = useLanguage();
  return (
    <div className="flex-grow flex flex-col min-h-0">
      <h3 className="text-lg font-semibold mb-4 text-gray-300 flex items-center">
        <HistoryIcon className="w-5 h-5 mr-2" />
        {t('history.title')}
      </h3>
      <div className="overflow-y-auto pr-2 flex-grow">
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onRevert(index)}
                className={`w-full text-left p-3 rounded-md transition-colors text-sm ${
                  currentIndex === index
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {item.description}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};