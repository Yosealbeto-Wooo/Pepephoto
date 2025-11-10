
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MagicWandIcon, VideoIcon } from './icons';

interface ModeSwitcherProps {
  mode: 'photo' | 'video';
  onModeChange: (mode: 'photo' | 'video') => void;
  isDisabled: boolean;
}

export const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ mode, onModeChange, isDisabled }) => {
  const { t } = useLanguage();
  
  const baseClasses = "flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const activeClasses = "bg-blue-600 text-white shadow-md";
  const inactiveClasses = "bg-gray-700 hover:bg-gray-600 text-gray-300";

  return (
    <div className="bg-gray-900/50 rounded-xl p-1 flex gap-1">
      <button 
        onClick={() => onModeChange('photo')} 
        disabled={isDisabled}
        className={`${baseClasses} ${mode === 'photo' ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === 'photo'}
      >
        <MagicWandIcon className="w-5 h-5" />
        {t('app.mode.photo')}
      </button>
      <button 
        onClick={() => onModeChange('video')}
        disabled={isDisabled}
        className={`${baseClasses} ${mode === 'video' ? activeClasses : inactiveClasses}`}
        aria-pressed={mode === 'video'}
      >
        <VideoIcon className="w-5 h-5" />
        {t('app.mode.video')}
      </button>
    </div>
  );
};
