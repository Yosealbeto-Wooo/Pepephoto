
import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';
import { translations } from '../translations';

interface LanguageContextType {
  locale: string | null;
  setLocale: (locale: string) => void;
  t: (key: string, params?: { [key: string]: string }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<string | null>(null);

  const t = useCallback((key: string, params?: { [key: string]: string }) => {
    if (!locale) return key;

    const langTranslations = translations[locale as keyof typeof translations] || translations.en;
    let translation = (langTranslations as any)[key] || (translations.en as any)[key];

    if (!translation) {
      console.warn(`Translation not found for key: ${key} in locale: ${locale}`);
      return key;
    }

    if (params) {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{${paramKey}}`, params[paramKey]);
      });
    }

    return translation;
  }, [locale]);

  const value = useMemo(() => ({
    locale,
    setLocale,
    t
  }), [locale, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};