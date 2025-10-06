import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessCards = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const getCardText = () => {
    const texts = {
      en: {
        title: 'Quick Access',
        subtitle: 'Choose what you want to do today',
        cards: {
          learn: {
            title: 'Interactive Learning',
            description: 'Step-by-step guides to understand Aadhaar banking concepts',
            action: 'Start Learning',
            badge: 'Educational'
          },
          chat: {
            title: 'AI Assistant',
            description: 'Get instant help with your Aadhaar and scholarship questions',
            action: 'Chat Now',
            badge: 'AI Powered'
          },
          verify: {
            title: 'Account Verification',
            description: 'Check your Aadhaar linking and DBT status quickly',
            action: 'Verify Now',
            badge: 'Secure'
          },
          faq: {
            title: 'FAQ Resources',
            description: 'Find answers to commonly asked questions about scholarships',
            action: 'Browse FAQ',
            badge: 'Helpful'
          }
        }
      },
      hi: {
        title: 'त्वरित पहुंच',
        subtitle: 'चुनें कि आज आप क्या करना चाहते हैं',
        cards: {
          learn: {
            title: 'इंटरैक्टिव लर्निंग',
            description: 'आधार बैंकिंग अवधारणाओं को समझने के लिए चरण-दर-चरण गाइड',
            action: 'सीखना शुरू करें',
            badge: 'शैक्षणिक'
          },
          chat: {
            title: 'AI सहायक',
            description: 'अपने आधार और छात्रवृत्ति प्रश्नों के लिए तुरंत सहायता प्राप्त करें',
            action: 'अभी चैट करें',
            badge: 'AI संचालित'
          },
          verify: {
            title: 'खाता सत्यापन',
            description: 'अपने आधार लिंकिंग और डीबीटी स्थिति को जल्दी जांचें',
            action: 'अभी सत्यापित करें',
            badge: 'सुरक्षित'
          },
          faq: {
            title: 'FAQ संसाधन',
            description: 'छात्रवृत्ति के बारे में आम तौर पर पूछे जाने वाले प्रश्नों के उत्तर खोजें',
            action: 'FAQ ब्राउज़ करें',
            badge: 'सहायक'
          }
        }
      },
      te: {
        title: 'త్వరిత యాక్సెస్',
        subtitle: 'ఈరోజు మీరు ఏమి చేయాలనుకుంటున్నారో ఎంచుకోండి',
        cards: {
          learn: {
            title: 'ఇంటరాక్టివ్ లెర్నింగ్',
            description: 'ఆధార్ బ్యాంకింగ్ భావనలను అర్థం చేసుకోవడానికి దశల వారీ గైడ్‌లు',
            action: 'అభ్యాసం ప్రారంభించండి',
            badge: 'విద్యాపరమైన'
          },
          chat: {
            title: 'AI అసిస్టెంట్',
            description: 'మీ ఆధార్ మరియు స్కాలర్‌షిప్ ప్రశ్నలకు తక్షణ సహాయం పొందండి',
            action: 'ఇప్పుడే చాట్ చేయండి',
            badge: 'AI శక్తితో'
          },
          verify: {
            title: 'ఖాతా ధృవీకరణ',
            description: 'మీ ఆధార్ లింకింగ్ మరియు DBT స్థితిని త్వరగా తనిఖీ చేయండి',
            action: 'ఇప్పుడే ధృవీకరించండి',
            badge: 'సురక్షితమైన'
          },
          faq: {
            title: 'FAQ వనరులు',
            description: 'స్కాలర్‌షిప్‌ల గురించి సాధారణంగా అడిగే ప్రశ్నలకు సమాధానాలు కనుగొనండి',
            action: 'FAQ బ్రౌజ్ చేయండి',
            badge: 'సహాయకరమైన'
          }
        }
      }
    };

    return texts?.[currentLanguage] || texts?.en;
  };

  const quickAccessItems = [
    {
      id: 'learn',
      icon: 'BookOpen',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-500',
      route: '/interactive-learning-hub',
      stats: '4 Modules'
    },
    {
      id: 'chat',
      icon: 'MessageCircle',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconBg: 'bg-green-500',
      route: '/ai-chat-assistant',
      stats: '24/7 Available'
    },
    {
      id: 'verify',
      icon: 'Shield',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-500',
      route: '/account-verification-tool',
      stats: 'Instant Check'
    },
    {
      id: 'faq',
      icon: 'HelpCircle',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconBg: 'bg-orange-500',
      route: '/faq-knowledge-base',
      stats: '50+ Questions'
    }
  ];

  const cardText = getCardText();

  const handleCardClick = (route) => {
    navigate(route);
  };

  return (
    <div className="mb-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">
          {cardText?.title}
        </h2>
        <p className="text-muted-foreground text-sm">
          {cardText?.subtitle}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickAccessItems?.map((item) => {
          const cardData = cardText?.cards?.[item?.id];
          
          return (
            <div
              key={item?.id}
              className="group bg-card border rounded-xl p-6 hover:shadow-elevated nav-transition cursor-pointer"
              onClick={() => handleCardClick(item?.route)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${item?.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 nav-transition`}>
                  <Icon name={item?.icon} size={24} color="white" />
                </div>
                
                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                  {cardData?.badge}
                </span>
              </div>
              {/* Content */}
              <div className="mb-4">
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary nav-transition">
                  {cardData?.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cardData?.description}
                </p>
              </div>
              {/* Stats */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-muted-foreground">
                  {item?.stats}
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 nav-transition" 
                />
              </div>
              {/* Action Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
                iconName="Play"
                iconPosition="left"
              >
                {cardData?.action}
              </Button>
            </div>
          );
        })}
      </div>
      {/* Additional Quick Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-primary mb-1">1000+</div>
          <div className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ? 'छात्र सहायता प्राप्त' : currentLanguage === 'te' ? 'విద్యార్థులకు సహాయం' : 'Students Helped'}
          </div>
        </div>
        
        <div className="text-center p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-success mb-1">95%</div>
          <div className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ? 'सफलता दर' : currentLanguage === 'te' ? 'విజయ రేటు' : 'Success Rate'}
          </div>
        </div>
        
        <div className="text-center p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-accent mb-1">24/7</div>
          <div className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ? 'सहायता उपलब्ध' : currentLanguage === 'te' ? 'సహాయం అందుబాటులో' : 'Support Available'}
          </div>
        </div>
        
        <div className="text-center p-4 bg-card border rounded-lg">
          <div className="text-2xl font-bold text-warning mb-1">3</div>
          <div className="text-xs text-muted-foreground">
            {currentLanguage === 'hi' ? 'भाषाएं समर्थित' : currentLanguage === 'te' ? 'భాషలు మద్దతు' : 'Languages Supported'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCards;