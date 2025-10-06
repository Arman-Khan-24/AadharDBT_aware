import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageSwitcher = ({ className = "" }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸', nativeLabel: 'English' },
    { code: 'hi', label: 'Hindi', flag: '🇮🇳', nativeLabel: 'हिंदी' },
    { code: 'te', label: 'Telugu', flag: '🇮🇳', nativeLabel: 'తెలుగు' },
    { code: 'ta', label: 'Tamil', flag: '🇮🇳', nativeLabel: 'தமிழ்' },
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && languages?.find(lang => lang?.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
    setIsOpen(false);
    
    // Dispatch custom event for language change
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: langCode } 
    }));
  };

  const currentLang = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-0"
      >
        <span className="text-base">{currentLang?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">
          {currentLang?.nativeLabel}
        </span>
        <Icon 
          name="ChevronDown" 
          size={14} 
          className={`nav-transition ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-40 bg-popover border rounded-md shadow-elevated z-20 animate-fade-in">
            <div className="py-1">
              {languages?.map((lang) => (
                <button
                  key={lang?.code}
                  onClick={() => handleLanguageChange(lang?.code)}
                  className={`flex items-center space-x-3 w-full px-3 py-2 text-sm text-left hover:bg-muted nav-transition ${
                    currentLanguage === lang?.code 
                      ? 'bg-muted text-primary font-medium' :'text-popover-foreground'
                  }`}
                >
                  <span className="text-base">{lang?.flag}</span>
                  <div className="flex flex-col">
                    <span className="font-medium">{lang?.nativeLabel}</span>
                    {lang?.nativeLabel !== lang?.label && (
                      <span className="text-xs text-muted-foreground">{lang?.label}</span>
                    )}
                  </div>
                  {currentLanguage === lang?.code && (
                    <Icon name="Check" size={14} className="ml-auto text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageSwitcher;