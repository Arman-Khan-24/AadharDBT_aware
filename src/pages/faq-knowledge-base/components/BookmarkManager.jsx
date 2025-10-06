import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookmarkManager = ({ bookmarkedFaqs, onRemoveBookmark, onViewBookmark, className = "" }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (bookmarkedFaqs?.length === 0) {
    return (
      <div className={`bg-card border rounded-lg p-4 ${className}`}>
        <div className="text-center py-6">
          <Icon name="Bookmark" size={32} className="text-muted-foreground mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-2">No Bookmarks Yet</h3>
          <p className="text-sm text-muted-foreground">
            Bookmark important FAQs for quick access later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-4 border-b">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Icon name="Bookmark" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Bookmarked FAQs</h2>
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              {bookmarkedFaqs?.length}
            </span>
          </div>
          <Icon
            name={isExpanded ? "ChevronUp" : "ChevronDown"}
            size={20}
            className="text-muted-foreground"
          />
        </button>
      </div>
      {/* Bookmarked Items */}
      {isExpanded && (
        <div className="p-4">
          <div className="space-y-3">
            {bookmarkedFaqs?.map((faq) => (
              <div
                key={faq?.id}
                className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <Icon name="BookmarkCheck" size={16} className="text-accent mt-1 flex-shrink-0" />
                
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => onViewBookmark(faq)}
                    className="text-left w-full"
                  >
                    <h4 className="font-medium text-foreground text-sm mb-1 line-clamp-2">
                      {faq?.question}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{faq?.category}</span>
                      <span>•</span>
                      <span>Bookmarked {faq?.bookmarkedAt}</span>
                    </div>
                  </button>
                </div>

                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onRemoveBookmark(faq?.id)}
                  className="flex-shrink-0 h-6 w-6 p-0 text-muted-foreground hover:text-error"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-4 pt-3 border-t flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {bookmarkedFaqs?.length} bookmarked item{bookmarkedFaqs?.length !== 1 ? 's' : ''}
            </span>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => bookmarkedFaqs?.forEach(faq => onRemoveBookmark(faq?.id))}
              className="text-error hover:text-error/80"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkManager;