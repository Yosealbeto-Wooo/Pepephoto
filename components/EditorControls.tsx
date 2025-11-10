import React, { useState, useMemo, useEffect } from 'react';
import { MagicWandIcon, SharpenIcon, VintageIcon, CropIcon, AdjustmentsIcon, RotateLeftIcon, RotateRightIcon, StraightenIcon, InvertIcon, ExposureIcon, BrightnessIcon, ContrastIcon, SaturationIcon, TemperatureIcon, HighlightsIcon, ShadowsIcon, EyeIcon, BlurIcon, PaletteIcon, SendIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { debounce } from '../utils';
import { ControlGroup } from './ControlGroup';

interface EditorControlsProps {
  onEdit: (prompt: string, description: string) => void;
  isDisabled: boolean;
}

type SliderType = 'exposure' | 'brightness' | 'contrast' | 'saturation' | 'temperature' | 'highlights' | 'shadows';

export const EditorControls: React.FC<EditorControlsProps> = ({ onEdit, isDisabled }) => {
  const { t } = useLanguage();
  const [straightenAngle, setStraightenAngle] = useState(0);
  const [customFilterPrompt, setCustomFilterPrompt] = useState('');
  const [sliderValues, setSliderValues] = useState({
    exposure: 0,
    brightness: 0,
    contrast: 0,
    saturation: 0,
    temperature: 0,
    highlights: 0,
    shadows: 0,
  });
  const [openSections, setOpenSections] = useState({
      enhancements: true,
      filters: false,
      transform: false,
      resizer: false,
  });

  const handleToggle = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    // Reset sliders to 0 after any edit operation is completed.
    if (!isDisabled) {
      setStraightenAngle(0);
      setSliderValues({
        exposure: 0,
        brightness: 0,
        contrast: 0,
        saturation: 0,
        temperature: 0,
        highlights: 0,
        shadows: 0,
      });
    }
  }, [isDisabled]);

  const debouncedOnEdit = useMemo(
    () =>
      debounce((prompt: string, description: string) => {
        onEdit(prompt, description);
      }, 500),
    [onEdit]
  );
  
  const handleStraightenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const angle = Number(e.target.value);
    setStraightenAngle(angle);

    if (angle === 0) return;

    const prompt = `Straighten the image by rotating it exactly ${angle} degrees. Keep the entire image visible by adding a subtle, context-aware background to fill the corners created by the rotation. Do not crop the image.`;
    const description = t('controls.straighten_desc', { degrees: angle.toString() });
    debouncedOnEdit(prompt, description);
  };
  
  const handleSliderChange = (type: SliderType, value: number) => {
    setSliderValues(prev => ({...prev, [type]: value}));
  };
  
  const handleApplyEnhancements = () => {
    const prompts: string[] = [];
    const descriptions: string[] = [];

    // FIX: Replaced Object.entries with a loop over Object.keys to ensure type safety for slider values.
    // This resolves errors where slider values were being inferred as 'unknown'.
    for (const type of Object.keys(sliderValues) as SliderType[]) {
        const value = sliderValues[type];
        if (value !== 0) {
            let promptPart = '';
            const intensity = Math.round(Math.abs(value) / 100 * 30);
            const direction = value > 0;
            
            switch(type) {
                case 'exposure':
                    promptPart = `Adjust the exposure, making the image ${direction ? 'brighter' : 'darker'} by about ${intensity}%.`;
                    break;
                case 'brightness':
                    promptPart = `Adjust the brightness, making the image ${direction ? 'brighter' : 'darker'} by about ${intensity}%.`;
                    break;
                case 'contrast':
                    promptPart = `${direction ? 'Increase' : 'Decrease'} the contrast by about ${intensity}%.`;
                    break;
                case 'saturation':
                    promptPart = `${direction ? 'Increase' : 'Decrease'} the color saturation by about ${intensity}%, making the colors ${direction ? 'more vibrant' : 'more muted'}.`;
                    break;
                case 'temperature':
                    promptPart = `Adjust the color temperature to be about ${intensity}% ${direction ? 'warmer' : 'cooler'}.`;
                    break;
                case 'highlights':
                    promptPart = `${direction ? 'Brighten' : 'Darken'} the highlights by about ${intensity}% to ${direction ? 'add punch' : 'recover details'}.`;
                    break;
                case 'shadows':
                    promptPart = `${direction ? 'Brighten' : 'Darken'} the shadows by about ${intensity}% to ${direction ? 'reveal details' : 'increase depth'}.`;
                    break;
            }
            prompts.push(promptPart);
            const label = t(`controls.${type}`);
            descriptions.push(`${label}: ${value > 0 ? '+' : ''}${value}`);
        }
    }

    if (prompts.length > 0) {
        const fullPrompt = prompts.join(' ');
        const fullDescription = `${t('controls.custom_adjustments')}: ${descriptions.join(', ')}`;
        onEdit(fullPrompt, fullDescription);
    }
  };

  const handleApplyCustomFilter = () => {
    if (customFilterPrompt.trim()) {
      onEdit(customFilterPrompt, t('controls.custom_filter.title'));
      setCustomFilterPrompt('');
    }
  };

  const enhancementButtons = [
    { 
      id: 'quality', 
      label: t('controls.quality'), 
      prompt: 'Enhance the quality of this image. Make it sharper, clearer, and with better resolution, as if it were taken with a professional camera. Fix any compression artifacts.',
      icon: <MagicWandIcon className="w-6 h-6" /> 
    },
    { 
      id: 'sharpen', 
      label: t('controls.sharpen'), 
      prompt: 'Sharpen the image, focusing on the main subject. Make the details crisper without adding excessive noise.',
      icon: <SharpenIcon className="w-6 h-6" /> 
    },
    { 
      id: 'invert', 
      label: t('controls.invert'), 
      prompt: 'Invert the colors of the image.',
      icon: <InvertIcon className="w-6 h-6" /> 
    },
  ];
  
  const sliderControls: {name: SliderType, icon: React.ReactElement, label: string}[] = [
      { name: 'exposure', label: t('controls.exposure'), icon: <ExposureIcon className="w-5 h-5 mr-2" /> },
      { name: 'brightness', label: t('controls.brightness'), icon: <BrightnessIcon className="w-5 h-5 mr-2" /> },
      { name: 'contrast', label: t('controls.contrast'), icon: <ContrastIcon className="w-5 h-5 mr-2" /> },
      { name: 'saturation', label: t('controls.saturation'), icon: <SaturationIcon className="w-5 h-5 mr-2" /> },
      { name: 'temperature', label: t('controls.temperature'), icon: <TemperatureIcon className="w-5 h-5 mr-2" /> },
      { name: 'highlights', label: t('controls.highlights'), icon: <HighlightsIcon className="w-5 h-5 mr-2" /> },
      { name: 'shadows', label: t('controls.shadows'), icon: <ShadowsIcon className="w-5 h-5 mr-2" /> },
  ];

  const filters = [
    { 
        id: 'redeye', 
        label: t('controls.redeye'), 
        prompt: 'Remove any red-eye effect from the eyes of the people in this photo.',
        icon: <EyeIcon className="w-6 h-6" /> 
    },
    { 
        id: 'blur', 
        label: t('controls.blur'), 
        prompt: 'Apply a gentle gaussian blur to the entire image to soften it.',
        icon: <BlurIcon className="w-6 h-6" /> 
    },
    { 
        id: 'vintage', 
        label: t('controls.vintage'), 
        prompt: 'Apply a vintage film effect to this image, with slightly faded colors, warm tones, and subtle grain.',
        icon: <VintageIcon className="w-6 h-6" /> 
    },
    { 
        id: 'bw', 
        label: t('controls.bw'), 
        prompt: 'Convert this image to a high-contrast, dramatic black and white.',
        icon: <SharpenIcon className="w-6 h-6" /> 
    },
    { 
        id: 'watercolor', 
        label: t('controls.watercolor'), 
        prompt: 'Transform this image to look like a watercolor painting.',
        icon: <PaletteIcon className="w-6 h-6" /> 
    },
    { 
        id: 'oil_painting', 
        label: t('controls.oil_painting'), 
        prompt: 'Transform this image to look like an oil painting.',
        icon: <PaletteIcon className="w-6 h-6" /> 
    },
    { 
        id: 'cartoon', 
        label: t('controls.cartoon'), 
        prompt: 'Convert this image into a fun, vibrant cartoon style with bold outlines.',
        icon: <AdjustmentsIcon className="w-6 h-6" /> 
    },
    { 
        id: 'manga', 
        label: t('controls.manga'), 
        prompt: 'Redraw this image in a dramatic black and white manga art style, with screentones and sharp lines.',
        icon: <ContrastIcon className="w-6 h-6" /> 
    },
  ];


  const transformTools = [
    { 
      id: 'rotate_left', 
      label: t('controls.rotate_left'), 
      prompt: 'Rotate the image 90 degrees counter-clockwise.',
      icon: <RotateLeftIcon className="w-6 h-6" /> 
    },
    { 
      id: 'rotate_right', 
      label: t('controls.rotate_right'), 
      prompt: 'Rotate the image 90 degrees clockwise.',
      icon: <RotateRightIcon className="w-6 h-6" /> 
    },
  ];

  const resizerTools = [
    { 
        id: 'square', 
        label: t('controls.resize.square'), 
        prompt: 'Crop the image to a 1:1 square aspect ratio. Intelligently frame the most important part of the image, ensuring the main subject is centered and well-composed.',
        icon: <ContrastIcon className="w-6 h-6" /> 
    },
    { 
        id: 'portrait_sm', 
        label: t('controls.resize.portrait_sm'), 
        prompt: 'Crop the image to a 4:5 vertical aspect ratio. Intelligently frame the most important part of the image, ensuring the main subject is centered and well-composed.',
        icon: <AdjustmentsIcon className="w-6 h-6" style={{transform: 'scaleX(0.85)'}} />
    },
    { 
        id: 'story', 
        label: t('controls.resize.story'), 
        prompt: 'Crop the image to a 9:16 vertical aspect ratio, suitable for a story. Intelligently frame the most important part of the image, ensuring the main subject is centered and well-composed.',
        icon: <AdjustmentsIcon className="w-6 h-6" /> 
    },
    { 
        id: 'landscape', 
        label: t('controls.resize.landscape'), 
        prompt: 'Crop the image to a 16:9 landscape aspect ratio. Intelligently frame the most important part of the image, ensuring the main subject is centered and well-composed.',
        icon: <VintageIcon className="w-6 h-6" /> 
    },
  ];

  // FIX: Use React.FC to correctly type the component and allow for React's `key` prop.
  const ControlButton: React.FC<{ id: string; label: string; prompt: string; icon: React.ReactElement }> = ({ id, label, prompt, icon }) => (
    <button
      onClick={() => onEdit(prompt, label)}
      disabled={isDisabled}
      className="flex items-center space-x-3 p-3 w-full text-left bg-gray-700 hover:bg-blue-600 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      title={label}
    >
      <span className="text-blue-300">{icon}</span>
      <span className="font-medium text-sm">{label}</span>
    </button>
  );

  // FIX: Use React.FC to correctly type the component and allow for React's `key` prop.
  const SliderControl: React.FC<{name: SliderType, label: string, icon: React.ReactElement}> = ({name, label, icon}) => (
    <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium text-gray-300">
            <label htmlFor={`${name}-slider`} className="flex items-center">
                {icon}
                {label}
            </label>
            <span className="bg-gray-900 px-2 py-0.5 rounded text-xs font-mono w-12 text-center">{sliderValues[name]}</span>
        </div>
        <input
            id={`${name}-slider`}
            type="range"
            min="-100"
            max="100"
            step="1"
            value={sliderValues[name]}
            onChange={(e) => handleSliderChange(name, Number(e.target.value))}
            disabled={isDisabled}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            title={label}
        />
    </div>
  );
  
  const areSlidersChanged = useMemo(() => {
    return Object.values(sliderValues).some(value => value !== 0);
  }, [sliderValues]);


  return (
    <div>
        <ControlGroup
            title={t('enhancements.title')}
            icon={<MagicWandIcon />}
            isOpen={openSections.enhancements}
            onToggle={() => handleToggle('enhancements')}
        >
            <div className="grid grid-cols-2 gap-3">
                {enhancementButtons.slice(0, 2).map(button => <ControlButton key={button.id} {...button} />)}
            </div>
            <div className="mt-3">
                 <ControlButton {...enhancementButtons[2]} />
            </div>
            <div className="space-y-4 mt-4 pt-4 border-t border-gray-700/50">
                {sliderControls.map(control => <SliderControl key={control.name} name={control.name} label={control.label} icon={control.icon} />)}
                 <button
                    onClick={handleApplyEnhancements}
                    disabled={isDisabled || !areSlidersChanged}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                >
                    {t('actions.apply')}
                </button>
            </div>
        </ControlGroup>
        
        <ControlGroup
            title={t('filters.title')}
            icon={<PaletteIcon />}
            isOpen={openSections.filters}
            onToggle={() => handleToggle('filters')}
        >
            <div className="grid grid-cols-2 gap-3">
                {filters.map(filter => <ControlButton key={filter.id} {...filter} />)}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-2">
                <h4 className="text-sm font-semibold text-gray-300">{t('controls.custom_filter.title')}</h4>
                 <div className="relative">
                    <textarea
                        value={customFilterPrompt}
                        onChange={(e) => setCustomFilterPrompt(e.target.value)}
                        placeholder={t('controls.custom_filter.placeholder')}
                        disabled={isDisabled}
                        rows={2}
                        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-2 pr-10 text-sm focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
                        aria-label={t('controls.custom_filter.title')}
                    />
                    <button
                        onClick={handleApplyCustomFilter}
                        disabled={isDisabled || customFilterPrompt.trim() === ''}
                        className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                        title={t('controls.custom_filter.apply')}
                        aria-label={t('controls.custom_filter.apply')}
                    >
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </ControlGroup>

        <ControlGroup
            title={t('transform.title')}
            icon={<AdjustmentsIcon />}
            isOpen={openSections.transform}
            onToggle={() => handleToggle('transform')}
        >
            <div className="grid grid-cols-2 gap-3">
                {transformTools.map(tool => <ControlButton key={tool.id} {...tool} />)}
            </div>
            <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-sm font-medium text-gray-300">
                    <label htmlFor="straighten-slider" className="flex items-center">
                        <StraightenIcon className="w-5 h-5 mr-2" />
                        {t('controls.straighten')}
                    </label>
                    <span className="bg-gray-900 px-2 py-0.5 rounded text-xs font-mono w-12 text-center">{straightenAngle}°</span>
                </div>
                <input
                    id="straighten-slider"
                    type="range"
                    min="-45"
                    max="45"
                    step="1"
                    value={straightenAngle}
                    onChange={handleStraightenChange}
                    disabled={isDisabled}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={t('controls.straighten')}
                />
            </div>
        </ControlGroup>

        <ControlGroup
            title={t('resizer.title')}
            icon={<CropIcon />}
            isOpen={openSections.resizer}
            onToggle={() => handleToggle('resizer')}
        >
            <div className="grid grid-cols-2 gap-3">
                {resizerTools.map(tool => <ControlButton key={tool.id} {...tool} />)}
            </div>
        </ControlGroup>
    </div>
  );
};