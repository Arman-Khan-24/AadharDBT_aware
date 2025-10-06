import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationProgress = ({ currentStep, isLoading }) => {
  const steps = [
    {
      id: 1,
      title: 'Input Validation',
      description: 'Validating Aadhaar number format',
      icon: 'FileText',
    },
    {
      id: 2,
      title: 'Secure Connection',
      description: 'Establishing encrypted connection',
      icon: 'Shield',
    },
    {
      id: 3,
      title: 'API Query',
      description: 'Querying government database',
      icon: 'Database',
    },
    {
      id: 4,
      title: 'Results Processing',
      description: 'Processing verification results',
      icon: 'CheckCircle',
    },
  ];

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'pending';
  };

  const getStepColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'current':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStepBgColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success';
      case 'current':
        return 'bg-primary';
      default:
        return 'bg-muted';
    }
  };

  if (!isLoading) return null;

  return (
    <div className="bg-card border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Verification in Progress
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <span className="text-sm text-primary">Processing...</span>
        </div>
      </div>
      <div className="space-y-4">
        {steps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isActive = status === 'current';
          
          return (
            <div
              key={step?.id}
              className={`flex items-center space-x-4 p-3 rounded-lg nav-transition ${
                isActive ? 'bg-primary/5 border border-primary/20' : ''
              }`}
            >
              {/* Step Icon */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center nav-transition ${
                getStepBgColor(status)
              }`}>
                {status === 'completed' ? (
                  <Icon name="Check" size={20} color="white" />
                ) : status === 'current' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Icon name={step?.icon} size={20} color="white" />
                )}
              </div>
              {/* Step Content */}
              <div className="flex-1">
                <h4 className={`font-medium ${getStepColor(status)}`}>
                  {step?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {step?.description}
                </p>
              </div>
              {/* Step Status */}
              <div className="flex items-center">
                {status === 'completed' && (
                  <Icon name="CheckCircle" size={20} className="text-success" />
                )}
                {status === 'current' && (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                )}
                {status === 'pending' && (
                  <div className="w-5 h-5 rounded-full border-2 border-muted"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(((currentStep - 1) / steps?.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full nav-transition"
            style={{ width: `${((currentStep - 1) / steps?.length) * 100}%` }}
          />
        </div>
      </div>
      {/* Estimated Time */}
      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Estimated time remaining: {Math.max(0, (steps?.length - currentStep + 1) * 2)} seconds
        </p>
      </div>
    </div>
  );
};

export default VerificationProgress;