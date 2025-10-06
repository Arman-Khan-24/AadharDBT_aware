import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [notifications, setNotifications] = useState([]);
  const [dismissedNotifications, setDismissedNotifications] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const savedDismissed = localStorage.getItem('dismissed-notifications');
    if (savedDismissed) {
      setDismissedNotifications(JSON.parse(savedDismissed));
    }

    // Load mock notifications
    loadNotifications();

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const loadNotifications = () => {
    const mockNotifications = [
      {
        id: 'scholarship-deadline-1',
        type: 'warning',
        priority: 'high',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        title: {
          en: 'Scholarship Deadline Approaching',
          hi: 'छात्रवृत्ति की समय सीमा नजदीक',
          te: 'స్కాలర్‌షిప్ గడువు దగ్గర పడుతోంది'
        },
        message: {
          en: 'Post Matric Scholarship application deadline is in 5 days. Complete your verification process.',
          hi: 'पोस्ट मैट्रिक छात्रवृत्ति आवेदन की समय सीमा 5 दिनों में है। अपनी सत्यापन प्रक्रिया पूरी करें।',
          te: 'పోస్ట్ మ్యాట్రిక్ స్కాలర్‌షిప్ దరఖాస్తు గడువు 5 రోజుల్లో ఉంది. మీ ధృవీకరణ ప్రక్రియను పూర్తి చేయండి.'
        },
        actionText: {
          en: 'Verify Now',
          hi: 'अभी सत्यापित करें',
          te: 'ఇప్పుడే ధృవీకరించండి'
        },
        actionRoute: '/account-verification-tool'
      },
      {
        id: 'account-status-1',
        type: 'success',
        priority: 'medium',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        title: {
          en: 'Account Verification Successful',
          hi: 'खाता सत्यापन सफल',
          te: 'ఖాతా ధృవీకరణ విజయవంతం'
        },
        message: {
          en: 'Your Aadhaar is successfully linked with your bank account. You can now receive scholarship payments.',
          hi: 'आपका आधार आपके बैंक खाते से सफलतापूर्वक जुड़ गया है। अब आप छात्रवृत्ति भुगतान प्राप्त कर सकते हैं।',
          te: 'మీ ఆధార్ మీ బ్యాంక్ ఖాతతో విజయవంతంగా లింక్ చేయబడింది. ఇప్పుడు మీరు స్కాలర్‌షిప్ చెల్లింపులను స్వీకరించవచ్చు.'
        },
        actionText: {
          en: 'View Details',
          hi: 'विवरण देखें',
          te: 'వివరాలు చూడండి'
        },
        actionRoute: '/account-verification-tool'
      },
      {
        id: 'new-module-1',
        type: 'info',
        priority: 'low',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        title: {
          en: 'New Learning Module Available',
          hi: 'नया शिक्षा मॉड्यूल उपलब्ध',
          te: 'కొత్త అభ్యాస మాడ్యూల్ అందుబాటులో'
        },
        message: {
          en: 'Learn about "DBT Enabled vs Aadhaar Linked Accounts" - understand the key differences for scholarship disbursement.',
          hi: '"डीबीटी सक्षम बनाम आधार लिंक्ड खाते" के बारे में जानें - छात्रवृत्ति वितरण के लिए मुख्य अंतर समझें।',
          te: '"DBT ఎనేబుల్డ్ vs ఆధార్ లింక్డ్ ఖాతాలు" గురించి తెలుసుకోండి - స్కాలర్‌షిప్ పంపిణీ కోసం ముఖ్య తేడాలను అర్థం చేసుకోండి.'
        },
        actionText: {
          en: 'Start Learning',
          hi: 'सीखना शुरू करें',
          te: 'అభ్యాసం ప్రారంభించండి'
        },
        actionRoute: '/interactive-learning-hub'
      },
      {
        id: 'system-update-1',
        type: 'info',
        priority: 'low',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        title: {
          en: 'System Enhancement',
          hi: 'सिस्टम सुधार',
          te: 'సిస్టమ్ మెరుగుదల'
        },
        message: {
          en: 'Our AI assistant now supports voice queries in Hindi and Telugu. Try asking questions using voice input.',
          hi: 'हमारा AI सहायक अब हिंदी और तेलुगु में आवाज प्रश्नों का समर्थन करता है। आवाज इनपुट का उपयोग करके प्रश्न पूछने का प्रयास करें।',
          te: 'మా AI అసిస్టెంట్ ఇప్పుడు హిందీ మరియు తెలుగులో వాయిస్ ప్రశ్నలకు మద్దతు ఇస్తుంది. వాయిస్ ఇన్‌పుట్ ఉపయోగించి ప్రశ్నలు అడగడానికి ప్రయత్నించండి.'
        },
        actionText: {
          en: 'Try Voice Chat',
          hi: 'आवाज चैट आज़माएं',
          te: 'వాయిస్ చాట్ ప్రయత్నించండి'
        },
        actionRoute: '/ai-chat-assistant'
      }
    ];

    setNotifications(mockNotifications);
  };

  const getNotificationText = () => {
    const texts = {
      en: {
        title: 'Recent Notifications',
        subtitle: 'Stay updated with important information',
        noNotifications: 'No new notifications',
        markAllRead: 'Mark All as Read',
        timeAgo: {
          now: 'Just now',
          minutes: 'min ago',
          hours: 'hours ago',
          days: 'days ago'
        }
      },
      hi: {
        title: 'हाल की सूचनाएं',
        subtitle: 'महत्वपूर्ण जानकारी के साथ अपडेट रहें',
        noNotifications: 'कोई नई सूचना नहीं',
        markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
        timeAgo: {
          now: 'अभी',
          minutes: 'मिनट पहले',
          hours: 'घंटे पहले',
          days: 'दिन पहले'
        }
      },
      te: {
        title: 'ఇటీవలి నోటిఫికేషన్‌లు',
        subtitle: 'ముఖ్యమైన సమాచారంతో అప్‌డేట్‌గా ఉండండి',
        noNotifications: 'కొత్త నోటిఫికేషన్‌లు లేవు',
        markAllRead: 'అన్నింటినీ చదివినట్లు గుర్తించండి',
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

    const timeText = getNotificationText()?.timeAgo;

    if (minutes < 1) return timeText?.now;
    if (minutes < 60) return `${minutes} ${timeText?.minutes}`;
    if (hours < 24) return `${hours} ${timeText?.hours}`;
    return `${days} ${timeText?.days}`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning':
        return 'AlertTriangle';
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'warning':
        return 'text-warning';
      case 'success':
        return 'text-success';
      case 'error':
        return 'text-error';
      case 'info':
      default:
        return 'text-primary';
    }
  };

  const dismissNotification = (notificationId) => {
    const newDismissed = [...dismissedNotifications, notificationId];
    setDismissedNotifications(newDismissed);
    localStorage.setItem('dismissed-notifications', JSON.stringify(newDismissed));
  };

  const markAllAsRead = () => {
    const allIds = notifications?.map(n => n?.id);
    setDismissedNotifications(allIds);
    localStorage.setItem('dismissed-notifications', JSON.stringify(allIds));
  };

  const visibleNotifications = notifications?.filter(
    notification => !dismissedNotifications?.includes(notification?.id)
  );

  const notificationText = getNotificationText();

  if (visibleNotifications?.length === 0) {
    return (
      <div className="bg-card border rounded-xl p-6 text-center">
        <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-3" />
        <h3 className="font-medium text-foreground mb-2">
          {notificationText?.noNotifications}
        </h3>
        <p className="text-sm text-muted-foreground">
          {notificationText?.subtitle}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">
            {notificationText?.title}
          </h2>
          <p className="text-sm text-muted-foreground">
            {notificationText?.subtitle}
          </p>
        </div>
        
        {visibleNotifications?.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            iconName="CheckCheck"
            iconPosition="left"
          >
            {notificationText?.markAllRead}
          </Button>
        )}
      </div>
      <div className="space-y-3">
        {visibleNotifications?.slice(0, 3)?.map((notification) => (
          <div
            key={notification?.id}
            className={`p-4 rounded-lg border nav-transition ${
              notification?.priority === 'high' ?'bg-warning/5 border-warning/20' :'bg-muted/30 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 mt-1 ${getNotificationColor(notification?.type)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-foreground">
                    {notification?.title?.[currentLanguage] || notification?.title?.en}
                  </h3>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(notification?.timestamp)}
                    </span>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => dismissNotification(notification?.id)}
                      className="h-6 w-6 p-0"
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                  {notification?.message?.[currentLanguage] || notification?.message?.en}
                </p>
                
                {notification?.actionText && (
                  <Button
                    variant="outline"
                    size="xs"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {notification?.actionText?.[currentLanguage] || notification?.actionText?.en}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleNotifications?.length > 3 && (
        <div className="mt-4 text-center">
          <Button variant="ghost" size="sm">
            {currentLanguage === 'hi' ? `${visibleNotifications?.length - 3} और देखें` : 
             currentLanguage === 'te' ? `మరో ${visibleNotifications?.length - 3} చూడండి` : 
             `View ${visibleNotifications?.length - 3} more`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;