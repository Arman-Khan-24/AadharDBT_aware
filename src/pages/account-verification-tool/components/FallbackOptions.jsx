import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FallbackOptions = ({ onRetry }) => {
  const navigate = useNavigate();

  const alternativeOptions = [
    {
      id: 'bank_visit',
      title: 'Visit Your Bank Branch',
      description: 'Get direct assistance from bank officials for account verification',
      icon: 'Building2',
      action: 'Learn More',
      color: 'bg-primary/10 border-primary/20',
      steps: [
        'Carry your Aadhaar card and bank passbook',
        'Ask for DBT status check at customer service',
        'Request account seeding if not done',
        'Get written confirmation of DBT enablement',
      ],
    },
    {
      id: 'csc_center',
      title: 'Common Service Center (CSC)',
      description: 'Visit nearest CSC for digital verification assistance',
      icon: 'MapPin',
      action: 'Find CSC',
      color: 'bg-success/10 border-success/20',
      steps: [
        'Locate nearest CSC using government portal',
        'Carry Aadhaar card and mobile number',
        'Pay nominal service charges (₹10-20)',
        'Get printed verification report',
      ],
    },
    {
      id: 'helpline',
      title: 'Government Helpline',
      description: 'Call official DBT helpline for phone-based verification',
      icon: 'Phone',
      action: 'Call Now',
      color: 'bg-warning/10 border-warning/20',
      steps: [
        'Call DBT helpline: 1800-11-1555',
        'Provide Aadhaar number for verification',
        'Note down reference number',
        'Follow up within 24-48 hours',
      ],
    },
  ];

  const handleOptionAction = (option) => {
    switch (option?.id) {
      case 'bank_visit': navigate('/interactive-learning-hub');
        break;
      case 'csc_center':
        // Mock CSC finder
        window.open('https://www.csc.gov.in/findcsc', '_blank');
        break;
      case 'helpline':
        window.open('tel:18001111555');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border rounded-lg p-6 shadow-soft">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertTriangle" size={32} className="text-warning" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Service Temporarily Unavailable
        </h2>
        <p className="text-muted-foreground">
          The government verification service is currently unavailable. 
          Please try again later or use one of the alternative options below.
        </p>
      </div>
      {/* Retry Option */}
      <div className="bg-muted/30 border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-foreground">
              Try Again
            </h3>
            <p className="text-sm text-muted-foreground">
              The service might be available now
            </p>
          </div>
          <Button
            onClick={onRetry}
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Retry Verification
          </Button>
        </div>
      </div>
      {/* Alternative Options */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Alternative Verification Methods
        </h3>
        
        {alternativeOptions?.map((option) => (
          <div
            key={option?.id}
            className={`border rounded-lg p-4 ${option?.color}`}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={option?.icon} size={24} className="text-primary" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {option?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {option?.description}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOptionAction(option)}
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    {option?.action}
                  </Button>
                </div>
                
                <div className="mt-3">
                  <h5 className="text-sm font-medium text-foreground mb-2">
                    Steps to follow:
                  </h5>
                  <ul className="space-y-1">
                    {option?.steps?.map((step, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                        <span className="w-4 h-4 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">
                            {index + 1}
                          </span>
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Contact Information */}
      <div className="mt-6 bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-primary mb-2">
              Important Contact Information
            </h4>
            <div className="space-y-2 text-sm text-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span>DBT Helpline: 1800-11-1555 (Toll Free)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Mail" size={16} className="text-muted-foreground" />
                <span>Email: dbt.support@gov.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <span>Website: dbtbharat.gov.in</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Additional Help */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Still need help? Our AI assistant can guide you through the process.
        </p>
        <Button
          onClick={() => navigate('/ai-chat-assistant')}
          variant="outline"
          iconName="MessageCircle"
          iconPosition="left"
        >
          Chat with AI Assistant
        </Button>
      </div>
    </div>
  );
};

export default FallbackOptions;