import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import LanguageSwitcher from '../../../components/ui/LanguageSwitcher';

const WelcomeHeader = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);

    return () => {
      clearInterval(timer);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    const greetings = {
      en: {
        morning: 'Good Morning',
        afternoon: 'Good Afternoon', 
        evening: 'Good Evening'
      },
      hi: {
        morning: 'सुप्रभात',
        afternoon: 'नमस्कार',
        evening: 'शुभ संध्या'
      },
      te: {
        morning: 'శుభోదయం',
        afternoon: 'నమస్కారం',
        evening: 'శుభ సాయంత్రం'
      }
    };

    let timeOfDay = 'morning';
    if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17) timeOfDay = 'evening';

    return greetings?.[currentLanguage]?.[timeOfDay] || greetings?.en?.[timeOfDay];
  };

  const getWelcomeText = () => {
    const texts = {
      en: {
        title: 'Welcome to AadhaarAware',
        subtitle: 'Your guide to understanding Aadhaar banking for scholarships',
        description: 'Learn the difference between Aadhaar linked and DBT enabled accounts to ensure smooth scholarship disbursement.'
      },
      hi: {
        title: 'आधारअवेयर में आपका स्वागत है',
        subtitle: 'छात्रवृत्ति के लिए आधार बैंकिंग को समझने का आपका गाइड',
        description: 'छात्रवृत्ति के सुचारू वितरण के लिए आधार लिंक्ड और डीबीटी सक्षम खातों के बीच अंतर जानें।'
      },
      te: {
        title: 'ఆధార్‌అవేర్‌కు స్వాగతం',
        subtitle: 'స్కాలర్‌షిప్‌ల కోసం ఆధార్ బ్యాంకింగ్‌ను అర్థం చేసుకోవడానికి మీ గైడ్',
        description: 'స్కాలర్‌షిప్ మంజూరు సజావుగా జరిగేలా ఆధార్ లింక్డ్ మరియు DBT ఎనేబుల్డ్ ఖాతాల మధ్య తేడాను తెలుసుకోండి।'
      }
    };

    return texts?.[currentLanguage] || texts?.en;
  };

  const welcomeText = getWelcomeText();

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Icon name="Shield" size={24} color="white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{getGreeting()}</p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                {welcomeText?.title}
              </h1>
            </div>
          </div>
          
          <p className="text-lg text-primary font-medium mb-2">
            {welcomeText?.subtitle}
          </p>
          
          <p className="text-muted-foreground text-sm lg:text-base max-w-2xl">
            {welcomeText?.description}
          </p>
        </div>

        <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-0 lg:space-y-3">
          <LanguageSwitcher />
          
          <div className="text-right">
            <p className="text-xs text-muted-foreground">
              {currentTime?.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentTime?.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;