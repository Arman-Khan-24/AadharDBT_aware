import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VerificationForm from './components/VerificationForm';
import VerificationResults from './components/VerificationResults';
import VerificationProgress from './components/VerificationProgress';
import FallbackOptions from './components/FallbackOptions';

const AccountVerificationTool = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [showFallback, setShowFallback] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState(null);
  const navigate = useNavigate();

  // Mock verification data
  const mockVerificationResults = {
    '123456789012': {
      status: 'dbt_enabled',
      bankName: 'State Bank of India',
      accountNumber: '1234567890123456',
      seedingDate: '15/03/2024',
      lastUpdated: '10/09/2024',
      verificationId: 'VER-2024-091015-001',
      responseTime: 1250,
    },
    '987654321098': {
      status: 'aadhaar_linked',
      bankName: 'Punjab National Bank',
      accountNumber: '9876543210987654',
      seedingDate: '22/08/2024',
      lastUpdated: '05/09/2024',
      verificationId: 'VER-2024-091015-002',
      responseTime: 980,
    },
    '555666777888': {
      status: 'not_linked',
      bankName: 'No bank account found',
      accountNumber: 'N/A',
      seedingDate: 'N/A',
      lastUpdated: 'N/A',
      verificationId: 'VER-2024-091015-003',
      responseTime: 750,
    },
  };

  // Session timeout management
  useEffect(() => {
    if (isLoading || verificationResult) {
      const timeout = setTimeout(() => {
        setSessionTimeout(true);
      }, 600000); // 10 minutes

      return () => clearTimeout(timeout);
    }
  }, [isLoading, verificationResult]);

  const simulateVerificationSteps = async (aadhaarNumber) => {
    const steps = [1, 2, 3, 4];
    
    for (let step of steps) {
      setCurrentStep(step);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Simulate API response
    const result = mockVerificationResults?.[aadhaarNumber];
    if (result) {
      setVerificationResult(result);
    } else {
      // Random result for demo
      const statuses = ['dbt_enabled', 'aadhaar_linked', 'not_linked'];
      const randomStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
      
      setVerificationResult({
        status: randomStatus,
        bankName: randomStatus === 'not_linked' ? 'No bank account found' : 'Bank of India',
        accountNumber: randomStatus === 'not_linked' ? 'N/A' : '1111222233334444',
        seedingDate: randomStatus === 'not_linked' ? 'N/A' : '01/09/2024',
        lastUpdated: '15/09/2024',
        verificationId: `VER-2024-091015-${Math.floor(Math.random() * 1000)}`,
        responseTime: Math.floor(Math.random() * 2000) + 500,
      });
    }
  };

  const handleVerification = async (aadhaarNumber) => {
    setIsLoading(true);
    setVerificationResult(null);
    setShowFallback(false);
    setCurrentStep(1);

    try {
      // Simulate network issues (20% chance)
      if (Math.random() < 0.2) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        throw new Error('Network timeout');
      }

      await simulateVerificationSteps(aadhaarNumber);
    } catch (error) {
      console.error('Verification failed:', error);
      setShowFallback(true);
    } finally {
      setIsLoading(false);
      setCurrentStep(0);
    }
  };

  const handleReset = () => {
    setVerificationResult(null);
    setShowFallback(false);
    setCurrentStep(0);
    setSessionTimeout(null);
  };

  const handleRetry = () => {
    setShowFallback(false);
    setSessionTimeout(null);
  };

  if (sessionTimeout) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border rounded-lg p-8 text-center shadow-soft">
              <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} className="text-warning" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Session Expired
              </h2>
              <p className="text-muted-foreground mb-6">
                Your session has expired for security reasons. Please start a new verification.
              </p>
              <Button
                onClick={handleReset}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Start New Verification
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/home-dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Dashboard
            </Button>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Account Verification Tool
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Verify your bank account's DBT status to ensure smooth scholarship disbursement. 
              Our secure tool connects directly with government databases.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {!verificationResult && !showFallback && (
                <VerificationForm 
                  onVerify={handleVerification}
                  isLoading={isLoading}
                />
              )}

              <VerificationProgress 
                currentStep={currentStep}
                isLoading={isLoading}
              />

              {verificationResult && (
                <VerificationResults 
                  result={verificationResult}
                  onReset={handleReset}
                />
              )}

              {showFallback && (
                <FallbackOptions onRetry={handleRetry} />
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card border rounded-lg p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Verification Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-success">98.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Response Time</span>
                    <span className="font-semibold text-foreground">1.2s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Daily Verifications</span>
                    <span className="font-semibold text-foreground">15,000+</span>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Icon name="Shield" size={24} className="text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-primary mb-2">
                      Security Guaranteed
                    </h3>
                    <ul className="text-sm text-foreground space-y-1">
                      <li>• 256-bit SSL encryption</li>
                      <li>• No data storage</li>
                      <li>• Government API direct</li>
                      <li>• UIDAI compliant</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card border rounded-lg p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/interactive-learning-hub')}
                    iconName="BookOpen"
                    iconPosition="left"
                  >
                    Learn About DBT
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/ai-chat-assistant')}
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Get Help
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/faq-knowledge-base')}
                    iconName="HelpCircle"
                    iconPosition="left"
                  >
                    View FAQ
                  </Button>
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-card border rounded-lg p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Need Support?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">1800-11-1555</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">support@aadhaaraware.gov.in</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-muted-foreground" />
                    <span className="text-foreground">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationTool;