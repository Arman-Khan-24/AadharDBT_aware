import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Load mock activities
    loadRecentActivities();

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const loadRecentActivities = () => {
    const mockActivities = [
      {
        id: 'activity-1',
        type: 'learning',
        icon: 'BookOpen',
        timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
        title: {
          en: 'Completed "Aadhaar Basics" module',
          hi: '"आधार मूल बातें" मॉड्यूल पूरा किया',
          te: '"ఆధార్ ప్రాథమికాలు" మాడ్యూల్ పూర్తి చేశారు'
        },
        description: {
          en: 'You successfully completed the first learning module',
          hi: 'आपने पहला शिक्षा मॉड्यूल सफलतापूर्वक पूरा किया',
          te: 'మీరు మొదటి అభ్యాస మాడ్యూల్‌ను విజయవంతంగా పూర్తి చేశారు'
        },
        status: 'completed'
      },
      {
        id: 'activity-2',
        type: 'verification',
        icon: 'Shield',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        title: {
          en: 'Account verification initiated',
          hi: 'खाता सत्यापन शुरू किया गया',
          te: 'ఖాతా ధృవీకరణ ప్రారంభించబడింది'
        },
        description: {
          en: 'Started verification process for Aadhaar linking status',
          hi: 'आधार लिंकिंग स्थिति के लिए सत्यापन प्रक्रिया शुरू की',
          te: 'ఆధార్ లింకింగ్ స్థితి కోసం ధృవీకరణ ప్రక్రియను ప్రారంభించారు'
        },
        status: 'in-progress'
      },
      {
        id: 'activity-3',
        type: 'chat',
        icon: 'MessageCircle',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
        title: {
          en: 'AI Assistant conversation',
          hi: 'AI सहायक बातचीत',
          te: 'AI అసిస్టెంట్ సంభాషణ'
        },
        description: {
          en: 'Asked about DBT enabled account requirements',
          hi: 'डीबीटी सक्षम खाता आवश्यकताओं के बारे में पूछा',
          te: 'DBT ఎనేబుల్డ్ ఖాతా అవసరాల గురించి అడిగారు'
        },
        status: 'completed'
      },
      {
        id: 'activity-4',
        type: 'faq',
        icon: 'HelpCircle',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        title: {
          en: 'Browsed FAQ section',
          hi: 'FAQ अनुभाग ब्राउज़ किया',
          te: 'FAQ విభాగాన్ని బ్రౌజ్ చేశారు'
        },
        description: {
          en: 'Viewed scholarship eligibility questions',
          hi: 'छात्रवृत्ति पात्रता प्रश्न देखे',
          te: 'స్కాలర్‌షిప్ అర్హత ప్రశ్నలను చూశారు'
        },
        status: 'completed'
      },
      {
        id: 'activity-5',
        type: 'learning',
        icon: 'BookOpen',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        title: {
          en: 'Started learning journey',
          hi: 'सीखने की यात्रा शुरू की',
          te: 'అభ్యాస ప్రయాణాన్ని ప్రారంభించారు'
        },
        description: {
          en: 'Welcome to AadhaarAware platform',
          hi: 'आधारअवेयर प्लेटफॉर्म में आपका स्वागत है',
          te: 'ఆధార్‌అవేర్ ప్లాట్‌ఫారమ్‌కు స్వాగతం'
        },
        status: 'completed'
      }
    ];

    setActivities(mockActivities);
  };

  const getActivityText = () => {
    const texts = {
      en: {
        title: 'Recent Activity',
        subtitle: 'Your learning and verification progress',
        viewAll: 'View All Activity',
        noActivity: 'No recent activity',
        timeAgo: {
          now: 'Just now',
          minutes: 'min ago',
          hours: 'hours ago',
          days: 'days ago'
        }
      },
      hi: {
        title: 'हाल की गतिविधि',
        subtitle: 'आपकी शिक्षा और सत्यापन प्रगति',
        viewAll: 'सभी गतिविधि देखें',
        noActivity: 'कोई हाल की गतिविधि नहीं',
        timeAgo: {
          now: 'अभी',
          minutes: 'मिनट पहले',
          hours: 'घंटे पहले',
          days: 'दिन पहले'
        }
      },
      te: {
        title: 'ఇటీవలి కార్యకలాపం',
        subtitle: 'మీ అభ్యాసం మరియు ధృవీకరణ పురోగతి',
        viewAll: 'అన్ని కార్యకలాపాలను చూడండి',
        noActivity: 'ఇటీవలి కార్యకలాపం లేదు',
        timeAgo: {
          now: 'ఇప్పుడే',
          minutes: 'నిమిషాల క్రితం',
          hours: 'గంటల క్రితం',
          days: 'రోజుల క్రితం'
        }
      }
    };

    return texts?.[currentLanguage] || texts?.en;
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const timeText = getActivityText()?.timeAgo;

    if (minutes < 1) return timeText?.now;
    if (minutes < 60) return `${minutes} ${timeText?.minutes}`;
    if (hours < 24) return `${hours} ${timeText?.hours}`;
    return `${days} ${timeText?.days}`;
  };

  const getActivityColor = (type, status) => {
    if (status === 'in-progress') return 'text-warning';
    
    switch (type) {
      case 'learning':
        return 'text-primary';
      case 'verification':
        return 'text-success';
      case 'chat':
        return 'text-accent';
      case 'faq':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActivityBg = (type, status) => {
    if (status === 'in-progress') return 'bg-warning/10';
    
    switch (type) {
      case 'learning':
        return 'bg-primary/10';
      case 'verification':
        return 'bg-success/10';
      case 'chat':
        return 'bg-accent/10';
      case 'faq':
        return 'bg-secondary/10';
      default:
        return 'bg-muted/10';
    }
  };

  const activityText = getActivityText();

  return (
    <div className="bg-card border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {activityText?.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {activityText?.subtitle}
          </p>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
        >
          {activityText?.viewAll}
        </Button>
      </div>
      {activities?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            {activityText?.noActivity}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities?.slice(0, 4)?.map((activity) => (
            <div
              key={activity?.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 nav-transition"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityBg(activity?.type, activity?.status)}`}>
                <Icon 
                  name={activity?.icon} 
                  size={18} 
                  className={getActivityColor(activity?.type, activity?.status)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-foreground text-sm">
                    {activity?.title?.[currentLanguage] || activity?.title?.en}
                  </h3>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {getTimeAgo(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {activity?.description?.[currentLanguage] || activity?.description?.en}
                </p>
                
                {activity?.status === 'in-progress' && (
                  <div className="flex items-center space-x-1 mt-2">
                    <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                    <span className="text-xs text-warning font-medium">
                      {currentLanguage === 'hi' ? 'प्रगति में' : 
                       currentLanguage === 'te'? 'పురోగతిలో' : 'In Progress'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {activities?.length > 4 && (
        <div className="mt-4 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            iconName="Plus"
            iconPosition="left"
          >
            {currentLanguage === 'hi' ? `${activities?.length - 4} और देखें` : 
             currentLanguage === 'te' ? `మరో ${activities?.length - 4} చూడండి` : 
             `Show ${activities?.length - 4} more`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;