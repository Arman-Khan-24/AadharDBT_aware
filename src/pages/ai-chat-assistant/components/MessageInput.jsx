import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const MessageInput = ({ onSendMessage, onAttachment, disabled = false, currentLanguage = 'en' }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);

  const translations = {
    en: {
      placeholder: "Type your question about Aadhaar or scholarships...",
      send: "Send",
      attach: "Attach file",
      voice: "Voice input",
      recording: "Recording..."
    },
    hi: {
      placeholder: "आधार या छात्रवृत्ति के बारे में अपना प्रश्न टाइप करें...",
      send: "भेजें",
      attach: "फ़ाइल संलग्न करें",
      voice: "आवाज़ इनपुट",
      recording: "रिकॉर्डिंग..."
    },
    te: {
      placeholder: "ఆధార్ లేదా స్కాలర్‌షిప్‌ల గురించి మీ ప్రశ్నను టైప్ చేయండి...",
      send: "పంపు",
      attach: "ఫైల్ జోడించు",
      voice: "వాయిస్ ఇన్‌పుట్",
      recording: "రికార్డింగ్..."
    }
  };

  const t = translations?.[currentLanguage] || translations?.en;

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message?.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAttachment = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file && onAttachment) {
      onAttachment(file);
    }
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording logic would go here
    } else {
      setIsRecording(true);
      // Start recording logic would go here
    }
  };

  return (
    <div className="border-t bg-card p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* Attachment Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleAttachment}
          disabled={disabled}
          className="flex-shrink-0"
        >
          <Icon name="Paperclip" size={18} />
        </Button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            onKeyPress={handleKeyPress}
            placeholder={t?.placeholder}
            disabled={disabled}
            className="w-full min-h-[44px] max-h-32 px-3 py-2 pr-12 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground placeholder-muted-foreground"
            rows={1}
            style={{
              height: 'auto',
              minHeight: '44px'
            }}
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e?.target?.scrollHeight, 128) + 'px';
            }}
          />

          {/* Voice Recording Button */}
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={toggleVoiceRecording}
            disabled={disabled}
            className={`absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
              isRecording ? 'text-error animate-pulse' : ''
            }`}
          >
            <Icon name={isRecording ? "MicOff" : "Mic"} size={16} />
          </Button>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          disabled={!message?.trim() || disabled}
          className="flex-shrink-0"
        >
          <Icon name="Send" size={18} />
          <span className="hidden sm:inline ml-2">{t?.send}</span>
        </Button>
      </form>
      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center justify-center mt-2 text-error">
          <Icon name="Mic" size={16} className="animate-pulse mr-2" />
          <span className="text-sm">{t?.recording}</span>
        </div>
      )}
    </div>
  );
};

export default MessageInput;