import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickSuggestions = ({ onSuggestionClick, currentLanguage = 'en' }) => {
  const suggestions = {
    en: [
      {
        id: 'dbt-status',
        text: 'Check DBT Status',
        icon: 'Shield',
        category: 'verification'
      },
      {
        id: 'aadhaar-linking',
        text: 'Aadhaar Linking Process',
        icon: 'Link',
        category: 'process'
      },
      {
        id: 'scholarship-deadlines',
        text: 'Scholarship Deadlines',
        icon: 'Calendar',
        category: 'deadlines'
      },
      {
        id: 'bank-account-types',
        text: 'Bank Account Types',
        icon: 'CreditCard',
        category: 'banking'
      },
      {
        id: 'document-requirements',
        text: 'Required Documents',
        icon: 'FileText',
        category: 'documents'
      },
      {
        id: 'common-issues',
        text: 'Common Issues',
        icon: 'AlertCircle',
        category: 'help'
      }
    ],
    hi: [
      {
        id: 'dbt-status',
        text: 'डीबीटी स्थिति जांचें',
        icon: 'Shield',
        category: 'verification'
      },
      {
        id: 'aadhaar-linking',
        text: 'आधार लिंकिंग प्रक्रिया',
        icon: 'Link',
        category: 'process'
      },
      {
        id: 'scholarship-deadlines',
        text: 'छात्रवृत्ति की अंतिम तिथि',
        icon: 'Calendar',
        category: 'deadlines'
      },
      {
        id: 'bank-account-types',
        text: 'बैंक खाता प्रकार',
        icon: 'CreditCard',
        category: 'banking'
      },
      {
        id: 'document-requirements',
        text: 'आवश्यक दस्तावेज',
        icon: 'FileText',
        category: 'documents'
      },
      {
        id: 'common-issues',
        text: 'सामान्य समस्याएं',
        icon: 'AlertCircle',
        category: 'help'
      }
    ],
    te: [
      {
        id: 'dbt-status',
        text: 'DBT స్థితిని తనిఖీ చేయండి',
        icon: 'Shield',
        category: 'verification'
      },
      {
        id: 'aadhaar-linking',
        text: 'ఆధార్ లింకింగ్ ప్రక్రియ',
        icon: 'Link',
        category: 'process'
      },
      {
        id: 'scholarship-deadlines',
        text: 'స్కాలర్‌షిప్ గడువులు',
        icon: 'Calendar',
        category: 'deadlines'
      },
      {
        id: 'bank-account-types',
        text: 'బ్యాంక్ ఖాతా రకాలు',
        icon: 'CreditCard',
        category: 'banking'
      },
      {
        id: 'document-requirements',
        text: 'అవసరమైన పత్రాలు',
        icon: 'FileText',
        category: 'documents'
      },
      {
        id: 'common-issues',
        text: 'సాధారణ సమస్యలు',
        icon: 'AlertCircle',
        category: 'help'
      }
    ]
  };

  const currentSuggestions = suggestions?.[currentLanguage] || suggestions?.en;

  const getCategoryColor = (category) => {
    const colors = {
      verification: 'bg-success/10 text-success border-success/20',
      process: 'bg-primary/10 text-primary border-primary/20',
      deadlines: 'bg-warning/10 text-warning border-warning/20',
      banking: 'bg-accent/10 text-accent border-accent/20',
      documents: 'bg-secondary/10 text-secondary border-secondary/20',
      help: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[category] || colors?.help;
  };

  return (
    <div className="p-4 border-t bg-muted/30">
      <h3 className="text-sm font-medium text-foreground mb-3">
        {currentLanguage === 'hi' ? 'त्वरित सुझाव' : 
         currentLanguage === 'te'? 'త్వరిత సూచనలు' : 'Quick Suggestions'}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {currentSuggestions?.map((suggestion) => (
          <Button
            key={suggestion?.id}
            variant="ghost"
            size="sm"
            onClick={() => onSuggestionClick(suggestion)}
            className={`h-auto p-3 flex flex-col items-center space-y-2 border ${getCategoryColor(suggestion?.category)} hover:opacity-80 nav-transition`}
          >
            <Icon name={suggestion?.icon} size={20} />
            <span className="text-xs text-center leading-tight">
              {suggestion?.text}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickSuggestions;