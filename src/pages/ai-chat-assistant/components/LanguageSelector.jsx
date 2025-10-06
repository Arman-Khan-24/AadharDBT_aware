import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageSelector = ({ currentLanguage, onLanguageChange, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English', 
      flag: '🇺🇸',
      description: 'Switch to English'
    },
    { 
      code: 'hi', 
      name: 'Hindi', 
      nativeName: 'हिंदी', 
      flag: '🇮🇳',
      description: 'हिंदी में बदलें'
    },
    { 
      code: 'te', 
      name: 'Telugu', 
      nativeName: 'తెలుగు', 
      flag: '🇮🇳',
      description: 'తెలుగులోకి మార్చండి'
    }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-0"
      >
        <span className="text-base">{currentLang?.flag}</span>
        <span className="font-medium">{currentLang?.nativeName}</span>
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
          <div className="absolute top-full left-0 mt-1 w-48 bg-popover border rounded-lg shadow-elevated z-20">
            <div className="py-1">
              {languages?.map((lang) => (
                <button
                  key={lang?.code}
                  onClick={() => handleLanguageSelect(lang?.code)}
                  className={`flex items-center space-x-3 w-full px-3 py-2 text-left hover:bg-muted nav-transition ${
                    currentLanguage === lang?.code 
                      ? 'bg-muted text-primary font-medium' :'text-popover-foreground'
                  }`}
                >
                  <span className="text-base">{lang?.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{lang?.nativeName}</div>
                    <div className="text-xs text-muted-foreground">{lang?.name}</div>
                  </div>
                  {currentLanguage === lang?.code && (
                    <Icon name="Check" size={14} className="text-primary" />
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

export default LanguageSelector;