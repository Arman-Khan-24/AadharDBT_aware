import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HumanEscalationModal = ({ isOpen, onClose, currentLanguage = 'en' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    issue: '',
    urgency: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const translations = {
    en: {
      title: "Connect with Human Support",
      subtitle: "Our support team will contact you within 24 hours",
      name: "Full Name",
      phone: "Phone Number",
      issue: "Describe your issue",
      urgency: "Urgency Level",
      urgencyOptions: {
        low: "Low - General inquiry",
        medium: "Medium - Need assistance",
        high: "High - Urgent help needed"
      },
      submit: "Request Support",
      cancel: "Cancel",
      submitting: "Submitting...",
      contactInfo: "Alternative Contact Methods:",
      helpline: "Helpline: 1800-XXX-XXXX",
      email: "Email: support@aadhaaraware.gov.in",
      hours: "Available: Mon-Fri, 9 AM - 6 PM"
    },
    hi: {
      title: "मानव सहायता से जुड़ें",
      subtitle: "हमारी सहायता टीम 24 घंटे के भीतर आपसे संपर्क करेगी",
      name: "पूरा नाम",
      phone: "फ़ोन नंबर",
      issue: "अपनी समस्या का वर्णन करें",
      urgency: "तात्कालिकता स्तर",
      urgencyOptions: {
        low: "कम - सामान्य पूछताछ",
        medium: "मध्यम - सहायता चाहिए",
        high: "उच्च - तत्काल सहायता चाहिए"
      },
      submit: "सहायता का अनुरोध करें",
      cancel: "रद्द करें",
      submitting: "जमा कर रहे हैं...",
      contactInfo: "वैकल्पिक संपर्क विधियां:",
      helpline: "हेल्पलाइन: 1800-XXX-XXXX",
      email: "ईमेल: support@aadhaaraware.gov.in",
      hours: "उपलब्ध: सोम-शुक्र, सुबह 9 - शाम 6"
    },
    te: {
      title: "మానవ మద్దతుతో కనెక్ట్ అవ్వండి",
      subtitle: "మా సపోర్ట్ టీమ్ 24 గంటల్లో మిమ్మల్ని సంప్రదిస్తుంది",
      name: "పూర్తి పేరు",
      phone: "ఫోన్ నంబర్",
      issue: "మీ సమస్యను వివరించండి",
      urgency: "అత్యవసర స్థాయి",
      urgencyOptions: {
        low: "తక్కువ - సాధారణ విచారణ",
        medium: "మధ్యమ - సహాయం అవసరం",
        high: "అధిక - తక్షణ సహాయం అవసరం"
      },
      submit: "మద్దతు అభ్యర్థించండి",
      cancel: "రద్దు చేయండి",
      submitting: "సమర్పిస్తున్నాం...",
      contactInfo: "ప్రత్యామ్నాయ సంప్రదింపు పద్ధతులు:",
      helpline: "హెల్ప్‌లైన్: 1800-XXX-XXXX",
      email: "ఇమెయిల్: support@aadhaaraware.gov.in",
      hours: "అందుబాటులో: సోమ-శుక్ర, ఉదయం 9 - సాయంత్రం 6"
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onClose();
    
    // Show success message (would integrate with toast system)
    alert(currentLanguage === 'hi' ? 'आपका अनुरोध सफलतापूर्वक भेजा गया है!' : 
          currentLanguage === 'te'? 'మీ అభ్యర్థన విజయవంతంగా పంపబడింది!' : 'Your request has been submitted successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              {t?.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t?.subtitle}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <Input
            label={t?.name}
            type="text"
            name="name"
            value={formData?.name}
            onChange={handleInputChange}
            required
            placeholder={currentLanguage === 'hi' ? 'अपना नाम दर्ज करें' : 
                        currentLanguage === 'te'? 'మీ పేరు నమోదు చేయండి' : 'Enter your full name'}
          />

          <Input
            label={t?.phone}
            type="tel"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            required
            placeholder={currentLanguage === 'hi' ? 'फ़ोन नंबर दर्ज करें' : 
                        currentLanguage === 'te'? 'ఫోన్ నంబర్ నమోదు చేయండి' : 'Enter your phone number'}
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.urgency}
            </label>
            <select
              name="urgency"
              value={formData?.urgency}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
            >
              <option value="low">{t?.urgencyOptions?.low}</option>
              <option value="medium">{t?.urgencyOptions?.medium}</option>
              <option value="high">{t?.urgencyOptions?.high}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {t?.issue}
            </label>
            <textarea
              name="issue"
              value={formData?.issue}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder={currentLanguage === 'hi' ? 'अपनी समस्या का विस्तार से वर्णन करें' : 
                          currentLanguage === 'te'? 'మీ సమస్యను వివరంగా వివరించండి' : 'Please describe your issue in detail'}
              className="w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              {t?.cancel}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isSubmitting}
              loading={isSubmitting}
            >
              {isSubmitting ? t?.submitting : t?.submit}
            </Button>
          </div>
        </form>

        {/* Contact Information */}
        <div className="p-4 border-t bg-muted/30">
          <h3 className="text-sm font-medium text-foreground mb-2">
            {t?.contactInfo}
          </h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={14} />
              <span>{t?.helpline}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={14} />
              <span>{t?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} />
              <span>{t?.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HumanEscalationModal;