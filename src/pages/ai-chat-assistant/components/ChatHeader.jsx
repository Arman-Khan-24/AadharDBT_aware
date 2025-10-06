import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import LanguageSelector from './LanguageSelector';

const ChatHeader = ({ 
  currentLanguage, 
  onLanguageChange, 
  onClearChat, 
  onHumanEscalation,
  isOnline = true 
}) => {
  const navigate = useNavigate();

  const translations = {
    en: {
      title: "AI Assistant",
      subtitle: "Ask me anything about Aadhaar and scholarships",
      clearChat: "Clear chat",
      humanHelp: "Talk to human",
      back: "Back to dashboard",
      online: "Online",
      offline: "Offline"
    },
    hi: {
      title: "AI सहायक",
      subtitle: "आधार और छात्रवृत्ति के बारे में कुछ भी पूछें",
      clearChat: "चैट साफ़ करें",
      humanHelp: "मानव से बात करें",
      back: "डैशबोर्ड पर वापस",
      online: "ऑनलाइन",
      offline: "ऑफ़लाइन"
    },
    te: {
      title: "AI సహాయకుడు",
      subtitle: "ఆధార్ మరియు స్కాలర్‌షిప్‌ల గురించి ఏదైనా అడగండి",
      clearChat: "చాట్ క్లియర్ చేయండి",
      humanHelp: "మనిషితో మాట్లాడండి",
      back: "డ్యాష్‌బోర్డ్‌కు తిరిగి",
      online: "ఆన్‌లైన్",
      offline: "ఆఫ్‌లైన్"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  return (
    <div className="border-b bg-card p-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/home-dashboard')}
            className="lg:hidden"
          >
            <Icon name="ArrowLeft" size={18} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <Icon name="Bot" size={20} color="white" />
            </div>
            
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {t?.title}
              </h1>
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  isOnline ? 'bg-success' : 'bg-error'
                }`}></div>
                <span className="text-sm text-muted-foreground">
                  {isOnline ? t?.online : t?.offline}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Language Selector */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onHumanEscalation}
              className="flex items-center space-x-2"
            >
              <Icon name="Users" size={16} />
              <span className="hidden md:inline">{t?.humanHelp}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClearChat}
              className="flex items-center space-x-2"
            >
              <Icon name="Trash2" size={16} />
              <span className="hidden md:inline">{t?.clearChat}</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="sm:hidden relative group">
            <Button variant="ghost" size="sm">
              <Icon name="MoreVertical" size={18} />
            </Button>
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border rounded-md shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible nav-transition">
              <button
                onClick={onHumanEscalation}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-left hover:bg-muted nav-transition"
              >
                <Icon name="Users" size={16} />
                <span>{t?.humanHelp}</span>
              </button>
              <button
                onClick={onClearChat}
                className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-left hover:bg-muted nav-transition"
              >
                <Icon name="Trash2" size={16} />
                <span>{t?.clearChat}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Subtitle */}
      <p className="text-sm text-muted-foreground mt-2 ml-13">
        {t?.subtitle}
      </p>
    </div>
  );
};

export default ChatHeader;