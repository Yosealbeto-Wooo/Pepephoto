import React from 'react';
import { ChevronDownIcon } from './icons';

interface ControlGroupProps {
  title: string;
  icon: React.ReactElement;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export const ControlGroup: React.FC<ControlGroupProps> = ({ title, icon, isOpen, onToggle, children }) => {
  return (
    <div className="border-t border-gray-700 first:border-t-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center py-4 text-left font-semibold text-lg text-gray-300 hover:bg-gray-700/50 transition-colors"
        aria-expanded={isOpen}
      >
        <div className="flex items-center">
            {React.cloneElement(icon, { className: "w-5 h-5 mr-3" })}
            <span>{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        style={{ transitionProperty: 'grid-template-rows, opacity' }}
      >
         <div className="overflow-hidden">
            <div className="pb-4">
                {children}
            </div>
         </div>
      </div>
    </div>
  );
};
