import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  completedSteps = 0,
  steps = [],
  variant = 'default',
  className = "" 
}) => {
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);
  
  const defaultSteps = [
    { id: 1, title: 'Learn Basics', icon: 'BookOpen' },
    { id: 2, title: 'Understand Process', icon: 'FileText' },
    { id: 3, title: 'Verify Account', icon: 'Shield' },
    { id: 4, title: 'Complete Setup', icon: 'CheckCircle' },
  ];

  const stepItems = steps?.length > 0 ? steps : defaultSteps;

  if (variant === 'simple') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {completedSteps}/{totalSteps} completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full nav-transition"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="text-center mt-2">
          <span className="text-lg font-semibold text-primary">
            {progressPercentage}%
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {progressPercentage}%
            </span>
          </div>
          <div className="w-20 bg-muted rounded-full h-1.5">
            <div 
              className="bg-primary h-1.5 rounded-full nav-transition"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <span className="text-sm text-muted-foreground">
          {completedSteps}/{totalSteps} steps
        </span>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Learning Progress
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {completedSteps}/{totalSteps} completed
          </span>
          <div className="w-16 h-2 bg-muted rounded-full">
            <div 
              className="bg-success h-2 rounded-full nav-transition"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
      {/* Steps */}
      <div className="space-y-3">
        {stepItems?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= completedSteps;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div 
              key={step?.id}
              className={`flex items-center space-x-3 p-3 rounded-lg nav-transition ${
                isCurrent 
                  ? 'bg-primary/5 border border-primary/20' 
                  : isCompleted 
                    ? 'bg-success/5' :'bg-muted/30'
              }`}
            >
              {/* Step Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center nav-transition ${
                isCompleted 
                  ? 'bg-success text-success-foreground' 
                  : isCurrent 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <Icon name={step?.icon} size={16} />
                )}
              </div>
              {/* Step Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${
                    isCurrent 
                      ? 'text-primary' 
                      : isCompleted 
                        ? 'text-success' :'text-muted-foreground'
                  }`}>
                    {step?.title}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isCompleted 
                      ? 'bg-success/10 text-success' 
                      : isCurrent 
                        ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? 'Completed' : isCurrent ? 'Current' : 'Upcoming'}
                  </span>
                </div>
                {step?.description && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {step?.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Overall Progress */}
      <div className="mt-4 p-3 bg-card border rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Overall Progress
          </span>
          <span className="text-lg font-bold text-primary">
            {progressPercentage}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-success h-3 rounded-full nav-transition"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;