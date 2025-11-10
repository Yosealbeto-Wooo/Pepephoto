

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
    const [hasApiKey, setHasApiKey] = useState(false);
    const [isCheckingApiKey, setIsCheckingApiKey] = useState(true);

    useEffect(() => {
        const checkKey = async () => {
            if (window.aistudio) {
                const hasKey = await window.aistudio.hasSelectedApiKey();
                setHasApiKey(hasKey);
            } else {
                // Fallback for local development or if aistudio is not available
                console.warn('aistudio context not found, assuming API key is set via environment.');
                setHasApiKey(true);
            }
            setIsCheckingApiKey(false);
        };
        checkKey();
    }, []);

    const handleSelectKey = async () => {
        if (window.aistudio) {
            await window.aistudio.openSelectKey();
            // Optimistically assume key selection was successful to avoid race condition.
            setHasApiKey(true);
        }
    };

    const handleGenerate = () => {
        if (prompt.trim()) {
            onGenerate(prompt);
        }
    };

    const renderContent = () => {
        if (isCheckingApiKey) {
            return <p>{t('loader.enhancing')}</p>;
        }

        if (!hasApiKey) {
            return (
                <div className="bg-gray-700 p-4 rounded-lg text-center space-y-3">
                    <h4 className="font-semibold">{t('video_generator.api_key.title')}</h4>
                    <p className="text-sm text-gray-300">{t('video_generator.api_key.description')}</p>
                    <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                        {t('video_generator.api_key.billing_link')}
                    </a>
                    <button
                        onClick={handleSelectKey}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-2"
                    >
                        {t('video_generator.api_key.button')}
                    </button>
                </div>
            );
        }

        return (
            <div className="space-y-2">
                <div className="relative">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder={t('video_generator.prompt_placeholder')}
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
        );
    };

    return (
        <ControlGroup
            title={t('video_generator.title')}
            icon={<VideoIcon />}
            isOpen={true} // Always open for this view
            onToggle={() => {}} // No toggle functionality needed
        >
            {renderContent()}
        </ControlGroup>
    );
};
