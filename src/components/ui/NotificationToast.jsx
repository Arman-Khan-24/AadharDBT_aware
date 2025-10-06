import React, { useState, useEffect, createContext, useContext } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

// Toast Context
const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      ...toast,
    };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove toast
    if (newToast?.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast?.duration);
    }

    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev?.filter(toast => toast?.id !== id));
  };

  const removeAllToasts = () => {
    setToasts([]);
  };

  // Convenience methods
  const toast = {
    success: (message, options = {}) => addToast({ ...options, type: 'success', message }),
    error: (message, options = {}) => addToast({ ...options, type: 'error', message }),
    warning: (message, options = {}) => addToast({ ...options, type: 'warning', message }),
    info: (message, options = {}) => addToast({ ...options, type: 'info', message }),
    custom: (options) => addToast(options),
  };

  return (
    <ToastContext.Provider value={{ toast, removeToast, removeAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

// Individual Toast Component
const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(toast?.id), 200);
  };

  const getToastStyles = () => {
    const baseStyles = "flex items-start space-x-3 p-4 rounded-lg shadow-elevated border max-w-md w-full nav-transition";
    
    switch (toast?.type) {
      case 'success':
        return `${baseStyles} bg-success/10 border-success/20 text-success-foreground`;
      case 'error':
        return `${baseStyles} bg-error/10 border-error/20 text-error-foreground`;
      case 'warning':
        return `${baseStyles} bg-warning/10 border-warning/20 text-warning-foreground`;
      case 'info':
      default:
        return `${baseStyles} bg-primary/10 border-primary/20 text-primary-foreground`;
    }
  };

  const getIcon = () => {
    switch (toast?.type) {
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
      default:
        return 'Info';
    }
  };

  const getIconColor = () => {
    switch (toast?.type) {
      case 'success':
        return 'var(--color-success)';
      case 'error':
        return 'var(--color-error)';
      case 'warning':
        return 'var(--color-warning)';
      case 'info':
      default:
        return 'var(--color-primary)';
    }
  };

  return (
    <div
      className={`transform transition-all duration-200 ease-in-out ${
        isVisible && !isRemoving
          ? 'translate-x-0 opacity-100' :'translate-x-full opacity-0'
      }`}
    >
      <div className={getToastStyles()}>
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <Icon 
            name={getIcon()} 
            size={20} 
            color={getIconColor()}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {toast?.title && (
            <h4 className="font-semibold text-sm mb-1">
              {toast?.title}
            </h4>
          )}
          <p className="text-sm text-foreground">
            {toast?.message}
          </p>
          {toast?.description && (
            <p className="text-xs text-muted-foreground mt-1">
              {toast?.description}
            </p>
          )}
          
          {/* Action Button */}
          {toast?.action && (
            <div className="mt-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={toast?.action?.onClick}
                className="h-6 px-2 text-xs"
              >
                {toast?.action?.label}
              </Button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <Button
          variant="ghost"
          size="xs"
          onClick={handleRemove}
          className="flex-shrink-0 h-6 w-6 p-0 hover:bg-black/10"
        >
          <Icon name="X" size={14} />
        </Button>
      </div>
    </div>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => {
  if (toasts?.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts?.map((toast) => (
        <Toast
          key={toast?.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

// Example usage component for demonstration
export const ToastDemo = () => {
  const { toast } = useToast();

  const showSuccessToast = () => {
    toast?.success('Account verified successfully!', {
      title: 'Verification Complete',
      description: 'Your Aadhaar account has been linked.',
      duration: 4000,
    });
  };

  const showErrorToast = () => {
    toast?.error('Verification failed. Please try again.', {
      title: 'Verification Error',
      action: {
        label: 'Retry',
        onClick: () => console.log('Retrying verification...'),
      },
    });
  };

  const showWarningToast = () => {
    toast?.warning('Scholarship deadline approaching in 3 days!', {
      title: 'Important Reminder',
      duration: 6000,
    });
  };

  const showInfoToast = () => {
    toast?.info('New learning module available', {
      description: 'Check out the updated Aadhaar banking guide.',
    });
  };

  return (
    <div className="space-x-2">
      <Button onClick={showSuccessToast} variant="outline">
        Success Toast
      </Button>
      <Button onClick={showErrorToast} variant="outline">
        Error Toast
      </Button>
      <Button onClick={showWarningToast} variant="outline">
        Warning Toast
      </Button>
      <Button onClick={showInfoToast} variant="outline">
        Info Toast
      </Button>
    </div>
  );
};

// Add this component declaration
const NotificationToast = () => {
  return (
    <ToastProvider>
      <ToastDemo />
    </ToastProvider>
  );
};

export default NotificationToast;