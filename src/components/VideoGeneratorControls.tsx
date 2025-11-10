
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ControlGroup } from './ControlGroup';
import { SendIcon, VideoIcon } from './icons';

interface VideoGeneratorControlsProps {
    onGenerate: (prompt: string) => void;
    isDisabled: boolean;
}

export const VideoGeneratorControls: React.FC<VideoGeneratorControlsProps> = ({ onGenerate, isDisabled }) => {
    const { t } = useLanguage();
    const [prompt, setPrompt] = useState('');
    
    // This component assumes the global API key check in App.tsx has already run.
    // The UI for selecting a key is handled there as a full-screen modal.
    // This control is simply enabled or disabled based on the `isDisabled` prop from App.tsx.

    const handleGenerate = () => {
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    return (
        <ControlGroup
            title={t('video_generator.title')}
            icon={<VideoIcon />}
            isOpen={true}
            onToggle={() => {}} // No-op as this panel should always be open in video mode
        >
            <div className="space-y-3">
                <p className="text-sm text-gray-400">
                    {t('video_generator.prompt_placeholder')}
                </p>
                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., 'subtle zoom in'"
                        disabled={isDisabled}
                        rows={4}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 pr-10 text-sm focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
                        aria-label={t('video_generator.title')}
                    />
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isDisabled || prompt.trim() === ''}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <SendIcon className="w-5 h-5" />
                    {t('video_generator.generate_button')}
                </button>
            </div>
        </ControlGroup>
    );
};