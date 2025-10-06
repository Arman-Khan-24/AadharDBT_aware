import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const savedProgress = localStorage.getItem('learning-progress');
    if (savedProgress) {
      setCompletedModules(JSON.parse(savedProgress));
    }

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const getProgressText = () => {
    const texts = {
      en: {
        title: 'Your Learning Progress',
        subtitle: 'Track your understanding of Aadhaar banking concepts',
        modules: 'Learning Modules',
        completed: 'Completed',
        pending: 'Pending',
        continue: 'Continue Learning',
        start: 'Start Learning'
      },
      hi: {
        title: 'आपकी शिक्षा प्रगति',
        subtitle: 'आधार बैंकिंग अवधारणाओं की अपनी समझ को ट्रैक करें',
        modules: 'शिक्षा मॉड्यूल',
        completed: 'पूर्ण',
        pending: 'लंबित',
        continue: 'सीखना जारी रखें',
        start: 'सीखना शुरू करें'
      },
      te: {
        title: 'మీ అభ్యాస పురోగతి',
        subtitle: 'ఆధార్ బ్యాంకింగ్ భావనలపై మీ అవగాహనను ట్రాక్ చేయండి',
        modules: 'అభ్యాస మాడ్యూల్స్',
        completed: 'పూర్తయింది',
        pending: 'పెండింగ్',
        continue: 'అభ్యాసం కొనసాగించండి',
        start: 'అభ్యాసం ప్రారంభించండి'
      }
    };

    return texts?.[currentLanguage] || texts?.en;
  };

  const learningModules = [
    {
      id: 'aadhaar-basics',
      title: {
        en: 'Aadhaar Basics',
        hi: 'आधार मूल बातें',
        te: 'ఆధార్ ప్రాథమికాలు'
      },
      description: {
        en: 'Understanding what Aadhaar is and its importance',
        hi: 'आधार क्या है और इसका महत्व समझना',
        te: 'ఆధార్ అంటే ఏమిటి మరియు దాని ప్రాముఖ్యత అర్థం చేసుకోవడం'
      },
      icon: 'FileText',
      estimatedTime: '10 min'
    },
    {
      id: 'bank-linking',
      title: {
        en: 'Bank Account Linking',
        hi: 'बैंक खाता लिंकिंग',
        te: 'బ్యాంక్ ఖాతా లింకింగ్'
      },
      description: {
        en: 'How to link your Aadhaar with bank account',
        hi: 'अपने आधार को बैंक खाते से कैसे लिंक करें',
        te: 'మీ ఆధార్‌ను బ్యాంక్ ఖాతతో ఎలా లింక్ చేయాలి'
      },
      icon: 'CreditCard',
      estimatedTime: '15 min'
    },
    {
      id: 'dbt-understanding',
      title: {
        en: 'DBT Enabled Accounts',
        hi: 'डीबीटी सक्षम खाते',
        te: 'DBT ఎనేబుల్డ్ ఖాతాలు'
      },
      description: {
        en: 'Understanding Direct Benefit Transfer requirements',
        hi: 'प्रत्यक्ष लाभ हस्तांतरण आवश्यकताओं को समझना',
        te: 'డైరెక్ట్ బెనిఫిట్ ట్రాన్స్‌ఫర్ అవసరాలను అర్థం చేసుకోవడం'
      },
      icon: 'ArrowRightLeft',
      estimatedTime: '20 min'
    },
    {
      id: 'scholarship-process',
      title: {
        en: 'Scholarship Process',
        hi: 'छात्रवृत्ति प्रक्रिया',
        te: 'స్కాలర్‌షిప్ ప్రక్రియ'
      },
      description: {
        en: 'Complete scholarship application and verification process',
        hi: 'पूर्ण छात्रवृत्ति आवेदन और सत्यापन प्रक्रिया',
        te: 'పూర్తి స్కాలర్‌షిప్ దరఖాస్తు మరియు ధృవీకరణ ప్రక్రియ'
      },
      icon: 'GraduationCap',
      estimatedTime: '25 min'
    }
  ];

  const progressText = getProgressText();
  const totalModules = learningModules?.length;
  const completedCount = completedModules?.length;
  const progressPercentage = Math.round((completedCount / totalModules) * 100);

  return (
    <div className="bg-card border rounded-xl p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {progressText?.title}
          </h2>
          <p className="text-muted-foreground text-sm">
            {progressText?.subtitle}
          </p>
        </div>
        
        <div className="mt-4 lg:mt-0 flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {progressPercentage}%
            </div>
            <div className="text-xs text-muted-foreground">
              {progressText?.completed}
            </div>
          </div>
          
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-muted stroke-current"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary stroke-current"
                strokeWidth="3"
                strokeDasharray={`${progressPercentage}, 100`}
                strokeLinecap="round"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {learningModules?.map((module) => {
          const isCompleted = completedModules?.includes(module.id);
          
          return (
            <div
              key={module.id}
              className={`p-4 rounded-lg border nav-transition ${
                isCompleted 
                  ? 'bg-success/5 border-success/20' :'bg-muted/30 border-border hover:border-primary/30'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {isCompleted ? (
                    <Icon name="Check" size={18} />
                  ) : (
                    <Icon name={module.icon} size={18} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium mb-1 ${
                    isCompleted ? 'text-success' : 'text-foreground'
                  }`}>
                    {module.title?.[currentLanguage] || module.title?.en}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {module.description?.[currentLanguage] || module.description?.en}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {module.estimatedTime}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      isCompleted 
                        ? 'bg-success/10 text-success' :'bg-primary/10 text-primary'
                    }`}>
                      {isCompleted ? progressText?.completed : progressText?.pending}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0">
          <Icon name="Target" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">
            {completedCount}/{totalModules} {progressText?.modules}
          </span>
        </div>
        
        <Button
          variant="default"
          iconName="ArrowRight"
          iconPosition="right"
          className="w-full sm:w-auto"
        >
          {completedCount > 0 ? progressText?.continue : progressText?.start}
        </Button>
      </div>
    </div>
  );
};

export default ProgressTracker;