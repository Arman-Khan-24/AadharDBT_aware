import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationResults = ({ result, onReset }) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  if (!result) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'dbt_enabled':
        return 'text-success';
      case 'aadhaar_linked':
        return 'text-warning';
      case 'not_linked':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'dbt_enabled':
        return 'bg-success/10 border-success/20';
      case 'aadhaar_linked':
        return 'bg-warning/10 border-warning/20';
      case 'not_linked':
        return 'bg-error/10 border-error/20';
      default:
        return 'bg-muted/10 border-muted/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'dbt_enabled':
        return 'CheckCircle';
      case 'aadhaar_linked':
        return 'AlertTriangle';
      case 'not_linked':
        return 'XCircle';
      default:
        return 'HelpCircle';
    }
  };

  const getStatusMessage = (status) => {
    switch (status) {
      case 'dbt_enabled':
        return 'Your account is DBT enabled and ready for scholarship disbursement';
      case 'aadhaar_linked':
        return 'Your Aadhaar is linked but DBT is not enabled. Additional steps required';
      case 'not_linked':
        return 'Your Aadhaar is not linked to any bank account';
      default:
        return 'Unable to determine account status';
    }
  };

  const getNextSteps = (status) => {
    switch (status) {
      case 'dbt_enabled':
        return [
          'Your account is ready for scholarship disbursement',
          'Keep your account active and maintain minimum balance',
          'Update your details if you change your bank account',
        ];
      case 'aadhaar_linked':
        return [
          'Visit your bank branch to enable DBT',
          'Carry your Aadhaar card and bank passbook',
          'Request DBT enablement from bank officials',
          'Verify the process is completed',
        ];
      case 'not_linked':
        return [
          'Visit your bank branch with Aadhaar card',
          'Fill the Aadhaar seeding form',
          'Provide Aadhaar number to bank officials',
          'Wait for 24-48 hours for linking to complete',
        ];
      default:
        return [
          'Try verification again after some time',
          'Contact your bank for account status',
          'Visit nearest Common Service Center for help',
        ];
    }
  };

  const handleDownloadPDF = () => {
    // Mock PDF generation
    const pdfContent = `
      Aadhaar Account Verification Report
      Generated on: ${new Date()?.toLocaleDateString('en-IN')}
      
      Account Status: ${result?.status}
      Bank Name: ${result?.bankName}
      Account Number: ${result?.accountNumber}
      Seeding Date: ${result?.seedingDate}
      
      Next Steps:
      ${getNextSteps(result?.status)?.map((step, index) => `${index + 1}. ${step}`)?.join('\n')}
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'aadhaar-verification-report.txt';
    a?.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className={`border rounded-lg p-6 ${getStatusBgColor(result?.status)}`}>
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            result?.status === 'dbt_enabled' ? 'bg-success' :
            result?.status === 'aadhaar_linked' ? 'bg-warning' : 'bg-error'
          }`}>
            <Icon 
              name={getStatusIcon(result?.status)} 
              size={24} 
              color="white" 
            />
          </div>
          
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${getStatusColor(result?.status)}`}>
              {result?.status === 'dbt_enabled' ? 'DBT Enabled' :
               result?.status === 'aadhaar_linked' ? 'Aadhaar Linked' : 'Not Linked'}
            </h3>
            <p className="text-foreground mt-1">
              {getStatusMessage(result?.status)}
            </p>
            
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-muted-foreground">Bank Name</span>
                <p className="font-medium text-foreground">{result?.bankName}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Account Number</span>
                <p className="font-medium text-foreground">
                  ****{result?.accountNumber?.slice(-4)}
                </p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Seeding Date</span>
                <p className="font-medium text-foreground">{result?.seedingDate}</p>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Last Updated</span>
                <p className="font-medium text-foreground">{result?.lastUpdated}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Next Steps
        </h3>
        <div className="space-y-3">
          {getNextSteps(result?.status)?.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-semibold text-primary">
                  {index + 1}
                </span>
              </div>
              <p className="text-sm text-foreground">{step}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Additional Information */}
      <div className="bg-card border rounded-lg p-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-lg font-semibold text-foreground">
            Technical Details
          </h3>
          <Icon 
            name="ChevronDown" 
            size={20} 
            className={`nav-transition ${showDetails ? 'rotate-180' : ''}`}
          />
        </button>
        
        {showDetails && (
          <div className="mt-4 pt-4 border-t space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Verification ID:</span>
                <p className="font-mono text-foreground">{result?.verificationId}</p>
              </div>
              <div>
                <span className="text-muted-foreground">API Response Time:</span>
                <p className="text-foreground">{result?.responseTime}ms</p>
              </div>
              <div>
                <span className="text-muted-foreground">Data Source:</span>
                <p className="text-foreground">Government DBT Portal</p>
              </div>
              <div>
                <span className="text-muted-foreground">Verification Method:</span>
                <p className="text-foreground">Real-time API</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleDownloadPDF}
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Download Report
        </Button>
        
        <Button
          onClick={() => navigate('/interactive-learning-hub')}
          variant="outline"
          iconName="BookOpen"
          iconPosition="left"
          className="flex-1"
        >
          Learn More
        </Button>
        
        <Button
          onClick={onReset}
          variant="ghost"
          iconName="RotateCcw"
          iconPosition="left"
        >
          Verify Another
        </Button>
      </div>
      {/* Help Section */}
      <div className="bg-muted/30 border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-2">
              Need Help?
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              If you're facing issues with your account status or need assistance with the next steps:
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/ai-chat-assistant')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Chat Support
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate('/faq-knowledge-base')}
                iconName="Book"
                iconPosition="left"
              >
                FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationResults;