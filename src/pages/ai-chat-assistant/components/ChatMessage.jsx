import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatMessage = ({ message, onQuickAction, onCopyMessage }) => {
  const isUser = message?.sender === 'user';
  const isTyping = message?.type === 'typing';

  const formatMessageContent = (content) => {
    if (!content) return '';
    
    // Convert markdown-like formatting to JSX
    return content?.split('\n')?.map((line, index) => {
      if (line?.startsWith('• ')) {
        return (
          <li key={index} className="ml-4 list-disc">
            {line?.substring(2)}
          </li>
        );
      }
      if (line?.match(/^\d+\./)) {
        return (
          <li key={index} className="ml-4 list-decimal">
            {line?.replace(/^\d+\.\s*/, '')}
          </li>
        );
      }
      if (line?.trim() === '') {
        return <br key={index} />;
      }
      return <p key={index} className="mb-2 last:mb-0">{line}</p>;
    });
  };

  if (isTyping) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Icon name="Bot" size={16} color="white" />
        </div>
        <div className="bg-card border rounded-lg p-3 max-w-xs">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start space-x-3 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-accent' : 'bg-primary'
      }`}>
        <Icon 
          name={isUser ? "User" : "Bot"} 
          size={16} 
          color="white" 
        />
      </div>
      {/* Message Content */}
      <div className={`max-w-xs sm:max-w-md lg:max-w-lg ${isUser ? 'text-right' : ''}`}>
        {/* Message Bubble */}
        <div className={`rounded-lg p-3 ${
          isUser 
            ? 'bg-primary text-primary-foreground ml-auto' 
            : 'bg-card border'
        }`}>
          <div className="text-sm">
            {formatMessageContent(message?.content)}
          </div>
          
          {/* Quick Actions for AI responses */}
          {!isUser && message?.quickActions && (
            <div className="flex flex-wrap gap-2 mt-3">
              {message?.quickActions?.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="xs"
                  onClick={() => onQuickAction(action)}
                  className="text-xs"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          )}

          {/* Links */}
          {!isUser && message?.links && (
            <div className="mt-3 space-y-1">
              {message?.links?.map((link, index) => (
                <a
                  key={index}
                  href={link?.url}
                  className="flex items-center space-x-2 text-xs text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="ExternalLink" size={12} />
                  <span>{link?.title}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Message Actions */}
        <div className="flex items-center justify-between mt-1 px-1">
          <span className="text-xs text-muted-foreground">
            {message?.timestamp?.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
          
          {!isUser && (
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => onCopyMessage(message?.content)}
                className="h-6 w-6 p-0"
              >
                <Icon name="Copy" size={12} />
              </Button>
              
              {message?.helpful !== undefined && (
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="xs"
                    className={`h-6 w-6 p-0 ${message?.helpful === true ? 'text-success' : ''}`}
                  >
                    <Icon name="ThumbsUp" size={12} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    className={`h-6 w-6 p-0 ${message?.helpful === false ? 'text-error' : ''}`}
                  >
                    <Icon name="ThumbsDown" size={12} />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;