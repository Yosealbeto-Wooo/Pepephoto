
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ImageComparatorProps {
  original: string;
  edited: string;
}

export const ImageComparator: React.FC<ImageComparatorProps> = ({ original, edited }) => {
  const { t } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };
    
  useEffect(() => {
    // Reset slider when image changes
    setSliderPosition(50);
  }, [edited]);

  return (
    <div className="w-full h-full max-w-full max-h-full aspect-[4/3] relative select-none" ref={containerRef}>
      <img
        src={original}
        alt="Original"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none rounded-lg"
        draggable={false}
      />
      <div
        className="absolute inset-0 w-full h-full object-contain overflow-hidden pointer-events-none rounded-lg"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={edited}
          alt="Edited"
          className="w-full h-full object-contain pointer-events-none rounded-lg"
          draggable={false}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
        />
      </div>
       <div 
        className="absolute top-0 bottom-0 w-1 bg-white/50 cursor-ew-resize pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPosition}
        onChange={handleSliderChange}
        className="absolute inset-0 w-full h-full cursor-ew-resize opacity-0"
        aria-label="Image comparison slider"
      />
      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">{t('comparator.original')}</div>
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded">{t('comparator.edited')}</div>
    </div>
  );
};
