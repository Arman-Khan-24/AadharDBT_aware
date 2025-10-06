import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionFAB = ({ className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show FAB on admin dashboard
  if (location?.pathname === '/admin-analytics-dashboard') {
    return null;
  }

  const quickActions = [
    {
      id: 'chat',
      label: 'AI Assistant',
      icon: 'MessageCircle',
      path: '/ai-chat-assistant',
      color: 'bg-primary hover:bg-primary/90',
      description: 'Get instant help',
    },
    {
      id: 'verify',
      label: 'Quick Verify',
      icon: 'Shield',
      path: '/account-verification-tool',
      color: 'bg-success hover:bg-success/90',
      description: 'Check account status',
    },
    {
      id: 'learn',
      label: 'Learn More',
      icon: 'BookOpen',
      path: '/interactive-learning-hub',
      color: 'bg-accent hover:bg-accent/90',
      description: 'Educational content',
    },
    {
      id: 'faq',
      label: 'FAQ',
      icon: 'HelpCircle',
      path: '/faq-knowledge-base',
      color: 'bg-secondary hover:bg-secondary/90',
      description: 'Common questions',
    },
  ];

  const handleActionClick = (action) => {
    navigate(action?.path);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {/* Backdrop */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
      {/* FAB Container */}
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        {/* Quick Actions */}
        <div className={`mb-4 space-y-3 transition-all duration-300 ease-out ${
          isExpanded 
            ? 'opacity-100 translate-y-0 pointer-events-auto' :'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          {quickActions?.map((action, index) => (
            <div
              key={action?.id}
              className={`flex items-center justify-end transition-all duration-200 ease-out ${
                isExpanded ? 'translate-x-0' : 'translate-x-full'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Action Label */}
              <div className="mr-3 bg-card border rounded-lg px-3 py-2 shadow-soft">
                <div className="text-sm font-medium text-foreground">
                  {action?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {action?.description}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleActionClick(action)}
                className={`w-12 h-12 rounded-full ${action?.color} text-white shadow-elevated hover:shadow-lg transition-all duration-200 flex items-center justify-center group`}
              >
                <Icon 
                  name={action?.icon} 
                  size={20} 
                  className="group-hover:scale-110 transition-transform duration-200"
                />
              </button>
            </div>
          ))}
        </div>

        {/* Main FAB Button */}
        <button
          onClick={toggleExpanded}
          className={`w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated hover:shadow-lg transition-all duration-200 flex items-center justify-center group ${
            isExpanded ? 'rotate-45' : 'rotate-0'
          }`}
        >
          <Icon 
            name={isExpanded ? "X" : "Plus"} 
            size={24} 
            className="group-hover:scale-110 transition-transform duration-200"
          />
        </button>

        {/* Help Text */}
        {!isExpanded && (
          <div className="absolute bottom-full right-0 mb-2 bg-card border rounded-lg px-3 py-2 shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            <div className="text-sm font-medium text-foreground">
              Quick Actions
            </div>
            <div className="text-xs text-muted-foreground">
              Tap for shortcuts
            </div>
          </div>
        )}
      </div>
      {/* Desktop Sidebar Widget */}
      <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <div className="bg-card border rounded-lg p-3 shadow-soft w-48">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Quick Access
          </h3>
          <div className="space-y-2">
            {quickActions?.slice(0, 3)?.map((action) => (
              <button
                key={action?.id}
                onClick={() => handleActionClick(action)}
                className="w-full flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors duration-200 text-left"
              >
                <div className={`w-8 h-8 rounded-full ${action?.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={action?.icon} size={16} color="white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {action?.label}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {action?.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickActionFAB;