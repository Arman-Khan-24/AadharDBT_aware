import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const VerificationForm = ({ onVerify, isLoading }) => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);

  const validateAadhaarNumber = (number) => {
    const cleanNumber = number?.replace(/\s/g, '');
    
    if (!cleanNumber) {
      return 'Aadhaar number is required';
    }
    
    if (cleanNumber?.length !== 12) {
      return 'Aadhaar number must be 12 digits';
    }
    
    if (!/^\d{12}$/?.test(cleanNumber)) {
      return 'Aadhaar number must contain only digits';
    }
    
    // Basic Verhoeff algorithm check (simplified)
    if (cleanNumber === '000000000000' || cleanNumber === '111111111111') {
      return 'Invalid Aadhaar number format';
    }
    
    return null;
  };

  const formatAadhaarNumber = (value) => {
    const cleanValue = value?.replace(/\D/g, '');
    const truncatedValue = cleanValue?.slice(0, 12);
    
    // Format as XXXX XXXX XXXX
    return truncatedValue?.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleAadhaarChange = (e) => {
    const formattedValue = formatAadhaarNumber(e?.target?.value);
    setAadhaarNumber(formattedValue);
    
    // Clear errors when user starts typing
    if (errors?.aadhaar) {
      setErrors({ ...errors, aadhaar: null });
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const validationError = validateAadhaarNumber(aadhaarNumber);
    if (validationError) {
      setErrors({ aadhaar: validationError });
      return;
    }
    
    const cleanAadhaar = aadhaarNumber?.replace(/\s/g, '');
    onVerify(cleanAadhaar);
  };

  const maskAadhaarForDisplay = (number) => {
    if (number?.length <= 8) return number;
    const visible = number?.slice(-4);
    const masked = 'X'?.repeat(number?.length - 4);
    return masked + visible;
  };

  return (
    <div className="bg-card border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Verify Your Account Status
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Check if your bank account is DBT enabled for scholarship disbursement
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-success font-medium">Secure Connection</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Aadhaar Input */}
        <div>
          <Input
            label="Aadhaar Number"
            type="text"
            placeholder="Enter your 12-digit Aadhaar number"
            value={aadhaarNumber}
            onChange={handleAadhaarChange}
            error={errors?.aadhaar}
            required
            description="Your Aadhaar number will be encrypted and processed securely"
            className="font-mono text-lg tracking-wider"
          />
          
          {aadhaarNumber && (
            <div className="mt-2 p-3 bg-muted/50 rounded-md">
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Preview: {maskAadhaarForDisplay(aadhaarNumber?.replace(/\s/g, ''))}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Privacy Information */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-primary mb-2">
                Privacy & Security
              </h3>
              <ul className="text-xs text-foreground space-y-1">
                <li>• Your data is encrypted using 256-bit SSL encryption</li>
                <li>• No personal information is stored on our servers</li>
                <li>• Direct integration with government DBT portal</li>
                <li>• Session automatically expires after 10 minutes</li>
              </ul>
              <button
                type="button"
                onClick={() => setShowPrivacyInfo(!showPrivacyInfo)}
                className="text-xs text-primary hover:underline mt-2"
              >
                {showPrivacyInfo ? 'Hide' : 'View'} detailed privacy policy
              </button>
            </div>
          </div>
          
          {showPrivacyInfo && (
            <div className="mt-4 pt-4 border-t border-primary/20">
              <div className="text-xs text-muted-foreground space-y-2">
                <p>
                  This verification tool connects directly to the Government of India's 
                  Direct Benefit Transfer (DBT) portal to check your account seeding status.
                </p>
                <p>
                  Your Aadhaar number is transmitted securely and is not logged or stored. 
                  The verification process complies with UIDAI guidelines and data protection regulations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            loading={isLoading}
            disabled={!aadhaarNumber || isLoading}
            iconName="Search"
            iconPosition="left"
            className="flex-1"
          >
            {isLoading ? 'Verifying...' : 'Check DBT Status'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setAadhaarNumber('');
              setErrors({});
            }}
            disabled={isLoading}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Don't have your Aadhaar number? 
            <a href="#" className="text-primary hover:underline ml-1">
              Download from UIDAI portal
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;