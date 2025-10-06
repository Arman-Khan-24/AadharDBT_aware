import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ChatHeader from './components/ChatHeader';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import QuickSuggestions from './components/QuickSuggestions';
import HumanEscalationModal from './components/HumanEscalationModal';

const AIChatAssistant = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [showHumanModal, setShowHumanModal] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  // Mock conversation data
  const mockResponses = {
    en: {
      'dbt-status': {
        content: `To check your DBT (Direct Benefit Transfer) status:\n\n• Visit the official DBT portal at dbtbharat.gov.in\n• Enter your Aadhaar number\n• Verify with OTP\n• Check if your bank account is DBT enabled\n\nDBT enabled means your account can receive government benefits directly.`,
        quickActions: [
          { label: 'Verify Account', action: 'verify-account' },
          { label: 'Learn More', action: 'learn-dbt' }
        ],
        links: [
          { title: 'DBT Portal', url: 'https://dbtbharat.gov.in' },
          { title: 'Account Verification Guide', url: '/account-verification-tool' }
        ]
      },
      'aadhaar-linking': {
        content: `Steps to link Aadhaar with your bank account:\n\n1. Visit your bank branch with original Aadhaar card\n2. Fill the Aadhaar linking form\n3. Submit the form to bank officer\n4. Get acknowledgment receipt\n5. Linking will be completed within 7-10 days\n\nYou can also link online through your bank's net banking portal.`,
        quickActions: [
          { label: 'Find Bank Branch', action: 'find-branch' },
          { label: 'Download Form', action: 'download-form' }
        ]
      },
      'scholarship-deadlines': {
        content: `Important scholarship deadlines for 2025:\n\n• Pre-Matric Scholarship: March 31, 2025\n• Post-Matric Scholarship: April 15, 2025\n• Merit-cum-Means Scholarship: May 30, 2025\n• Top Class Education: June 15, 2025\n\nEnsure your Aadhaar is linked and DBT enabled before applying.`,
        quickActions: [
          { label: 'Set Reminder', action: 'set-reminder' },
          { label: 'Apply Now', action: 'apply-scholarship' }
        ]
      }
    },
    hi: {
      'dbt-status': {
        content: `अपना DBT (प्रत्यक्ष लाभ हस्तांतरण) स्थिति जांचने के लिए:\n\n• dbtbharat.gov.in पर आधिकारिक DBT पोर्टल पर जाएं\n• अपना आधार नंबर दर्ज करें\n• OTP से सत्यापित करें\n• जांचें कि आपका बैंक खाता DBT सक्षम है या नहीं\n\nDBT सक्षम का मतलब है कि आपका खाता सरकारी लाभ सीधे प्राप्त कर सकता है।`,
        quickActions: [
          { label: 'खाता सत्यापित करें', action: 'verify-account' },
          { label: 'और जानें', action: 'learn-dbt' }
        ]
      }
    },
    te: {
      'dbt-status': {
        content: `మీ DBT (ప్రత్యక్ష ప్రయోజన బదిలీ) స్థితిని తనిఖీ చేయడానికి:\n\n• dbtbharat.gov.in వద్ద అధికారిక DBT పోర్టల్‌ను సందర్శించండి\n• మీ ఆధార్ నంబర్‌ను నమోదు చేయండి\n• OTP తో ధృవీకరించండి\n• మీ బ్యాంక్ ఖాతా DBT ప్రారంభించబడిందో లేదో తనిఖీ చేయండి\n\nDBT ప్రారంభించబడిన అంటే మీ ఖాతా ప్రభుత్వ ప్రయోజనాలను నేరుగా స్వీకరించగలదు.`,
        quickActions: [
          { label: 'ఖాతాను ధృవీకరించండి', action: 'verify-account' },
          { label: 'మరింత తెలుసుకోండి', action: 'learn-dbt' }
        ]
      }
    }
  };

  // Initialize with welcome message
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const welcomeMessages = {
      en: "Hello! I'm your AI assistant for Aadhaar and scholarship queries. How can I help you today?",
      hi: "नमस्ते! मैं आधार और छात्रवृत्ति प्रश्नों के लिए आपका AI सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?",
      te: "హలో! నేను ఆధార్ మరియు స్కాలర్‌షిప్ ప్రశ్నలకు మీ AI సహాయకుడిని. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?"
    };

    setMessages([{
      id: 1,
      sender: 'ai',
      content: welcomeMessages?.[savedLanguage] || welcomeMessages?.en,
      timestamp: new Date(),
      type: 'text'
    }]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle language change
  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
    
    // Add language change message
    const changeMessages = {
      en: "Language changed to English. How can I assist you?",
      hi: "भाषा हिंदी में बदल गई है। मैं आपकी कैसे सहायता कर सकता हूं?",
      te: "భాష తెలుగులోకి మార్చబడింది. నేను మీకు ఎలా సహాయం చేయగలను?"
    };

    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'ai',
      content: changeMessages?.[langCode],
      timestamp: new Date(),
      type: 'text'
    }]);
  };

  // Handle sending messages
  const handleSendMessage = (content) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiResponse = generateAIResponse(content);
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  // Generate AI response
  const generateAIResponse = (userInput) => {
    const responses = mockResponses?.[currentLanguage] || mockResponses?.en;
    const lowerInput = userInput?.toLowerCase();
    
    let response;
    if (lowerInput?.includes('dbt') || lowerInput?.includes('status')) {
      response = responses?.['dbt-status'];
    } else if (lowerInput?.includes('link') || lowerInput?.includes('aadhaar')) {
      response = responses?.['aadhaar-linking'];
    } else if (lowerInput?.includes('deadline') || lowerInput?.includes('scholarship')) {
      response = responses?.['scholarship-deadlines'];
    } else {
      // Default response
      const defaultResponses = {
        en: "I understand you're asking about Aadhaar or scholarships. Could you please be more specific? You can ask about:\n\n• DBT status checking\n• Aadhaar linking process\n• Scholarship deadlines\n• Document requirements\n• Common issues",
        hi: "मैं समझता हूं कि आप आधार या छात्रवृत्ति के बारे में पूछ रहे हैं। कृपया अधिक स्पष्ट हो सकते हैं? आप इसके बारे में पूछ सकते हैं:\n\n• DBT स्थिति जांच\n• आधार लिंकिंग प्रक्रिया\n• छात्रवृत्ति की अंतिम तिथि\n• दस्तावेज आवश्यकताएं\n• सामान्य समस्याएं",
        te: "మీరు ఆధార్ లేదా స్కాలర్‌షిప్‌ల గురించి అడుగుతున్నారని నేను అర్థం చేసుకున్నాను. దయచేసి మరింత నిర్దిష్టంగా చెప్పగలరా? మీరు ఇవి గురించి అడగవచ్చు:\n\n• DBT స్థితి తనిఖీ\n• ఆధార్ లింకింగ్ ప్రక్రియ\n• స్కాలర్‌షిప్ గడువులు\n• పత్రాల అవసరాలు\n• సాధారణ సమస్యలు"
      };
      
      response = {
        content: defaultResponses?.[currentLanguage] || defaultResponses?.en,
        quickActions: [
          { label: currentLanguage === 'hi' ? 'DBT जांचें' : currentLanguage === 'te' ? 'DBT తనిఖీ చేయండి' : 'Check DBT', action: 'dbt-status' },
          { label: currentLanguage === 'hi' ? 'लिंकिंग गाइड' : currentLanguage === 'te' ? 'లింకింగ్ గైడ్' : 'Linking Guide', action: 'aadhaar-linking' }
        ]
      };
    }

    return {
      id: Date.now() + 1,
      sender: 'ai',
      content: response?.content,
      timestamp: new Date(),
      type: 'text',
      quickActions: response?.quickActions,
      links: response?.links
    };
  };

  // Handle quick suggestions
  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion?.text);
  };

  // Handle quick actions
  const handleQuickAction = (action) => {
    if (action?.action === 'verify-account') {
      navigate('/account-verification-tool');
    } else if (action?.action === 'learn-dbt') {
      navigate('/interactive-learning-hub');
    } else {
      handleSendMessage(action?.label);
    }
  };

  // Handle file attachment
  const handleAttachment = (file) => {
    const attachmentMessage = {
      id: Date.now(),
      sender: 'user',
      content: `Attached file: ${file?.name}`,
      timestamp: new Date(),
      type: 'attachment',
      attachment: {
        name: file?.name,
        size: file?.size,
        type: file?.type
      }
    };

    setMessages(prev => [...prev, attachmentMessage]);
    
    // Simulate AI response to attachment
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        content: currentLanguage === 'hi'? 'मैंने आपकी फ़ाइल प्राप्त की है। कृपया बताएं कि आप इसके साथ क्या सहायता चाहते हैं?' :
          currentLanguage === 'te'? 'నేను మీ ఫైల్‌ను అందుకున్నాను. దయచేసి దీనితో మీకు ఏ సహాయం కావాలో చెప్పండి?': 'I\'ve received your file. Please let me know what assistance you need with it?',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Handle copy message
  const handleCopyMessage = (content) => {
    navigator.clipboard?.writeText(content);
    // Would show toast notification here
  };

  // Clear chat
  const handleClearChat = () => {
    const welcomeMessages = {
      en: "Chat cleared. How can I help you today?",
      hi: "चैट साफ़ कर दिया गया। आज मैं आपकी कैसे मदद कर सकता हूं?",
      te: "చాట్ క్లియర్ చేయబడింది. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?"
    };

    setMessages([{
      id: Date.now(),
      sender: 'ai',
      content: welcomeMessages?.[currentLanguage],
      timestamp: new Date(),
      type: 'text'
    }]);
    setShowSuggestions(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        {/* Chat Header */}
        <ChatHeader
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
          onClearChat={handleClearChat}
          onHumanEscalation={() => setShowHumanModal(true)}
          isOnline={isOnline}
        />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages?.map((message) => (
            <ChatMessage
              key={message?.id}
              message={message}
              onQuickAction={handleQuickAction}
              onCopyMessage={handleCopyMessage}
            />
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <ChatMessage
              message={{
                id: 'typing',
                sender: 'ai',
                type: 'typing',
                timestamp: new Date()
              }}
              onQuickAction={handleQuickAction}
              onCopyMessage={handleCopyMessage}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        {showSuggestions && messages?.length <= 2 && (
          <QuickSuggestions
            onSuggestionClick={handleSuggestionClick}
            currentLanguage={currentLanguage}
          />
        )}

        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          onAttachment={handleAttachment}
          disabled={isTyping}
          currentLanguage={currentLanguage}
        />

        {/* Scroll to Top Button */}
        {messages?.length > 5 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })}
            className="fixed bottom-20 right-6 rounded-full h-10 w-10 p-0 shadow-elevated"
          >
            <Icon name="ArrowDown" size={16} />
          </Button>
        )}
      </div>
      {/* Human Escalation Modal */}
      <HumanEscalationModal
        isOpen={showHumanModal}
        onClose={() => setShowHumanModal(false)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
};

export default AIChatAssistant;