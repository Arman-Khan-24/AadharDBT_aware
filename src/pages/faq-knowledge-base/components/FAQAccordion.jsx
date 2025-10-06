import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FAQAccordion = ({ faqs, searchQuery, onBookmark, onShare, bookmarkedItems = [] }) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (faqId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded?.has(faqId)) {
      newExpanded?.delete(faqId);
    } else {
      newExpanded?.add(faqId);
    }
    setExpandedItems(newExpanded);
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="bg-accent/30 text-accent-foreground px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  const handleBookmark = (faq) => {
    onBookmark(faq?.id);
  };

  const handleShare = (faq) => {
    onShare(faq);
  };

  if (faqs?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No FAQs Found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your search terms or browse different categories.
        </p>
        <Button variant="outline" iconName="MessageCircle" iconPosition="left">
          Ask AI Assistant
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {faqs?.map((faq) => {
        const isExpanded = expandedItems?.has(faq?.id);
        const isBookmarked = bookmarkedItems?.includes(faq?.id);

        return (
          <div
            key={faq?.id}
            className="bg-card border rounded-lg shadow-soft overflow-hidden"
          >
            {/* Question Header */}
            <button
              onClick={() => toggleExpanded(faq?.id)}
              className="w-full p-4 text-left hover:bg-muted/50 transition-colors duration-200 flex items-center justify-between"
            >
              <div className="flex-1 pr-4">
                <h3 className="font-medium text-foreground mb-1">
                  {highlightText(faq?.question, searchQuery)}
                </h3>
                {faq?.tags && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {faq?.tags?.slice(0, 3)?.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {faq?.isPopular && (
                  <div className="flex items-center space-x-1 text-accent">
                    <Icon name="TrendingUp" size={14} />
                    <span className="text-xs">Popular</span>
                  </div>
                )}
                <Icon
                  name={isExpanded ? "ChevronUp" : "ChevronDown"}
                  size={20}
                  className="text-muted-foreground"
                />
              </div>
            </button>
            {/* Answer Content */}
            {isExpanded && (
              <div className="border-t bg-muted/20">
                <div className="p-4">
                  {/* Answer Text */}
                  <div className="prose prose-sm max-w-none mb-4">
                    <div className="text-foreground whitespace-pre-line">
                      {highlightText(faq?.answer, searchQuery)}
                    </div>
                  </div>

                  {/* Steps (if available) */}
                  {faq?.steps && (
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Step-by-step Guide:</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        {faq?.steps?.map((step, index) => (
                          <li key={index} className="text-sm text-foreground">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Related Links */}
                  {faq?.relatedLinks && (
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Related Resources:</h4>
                      <div className="space-y-1">
                        {faq?.relatedLinks?.map((link, index) => (
                          <a
                            key={index}
                            href={link?.url}
                            className="text-sm text-primary hover:text-primary/80 flex items-center space-x-1"
                          >
                            <Icon name="ExternalLink" size={14} />
                            <span>{link?.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Related Questions */}
                  {faq?.relatedQuestions && (
                    <div className="mb-4">
                      <h4 className="font-medium text-foreground mb-2">Related Questions:</h4>
                      <div className="space-y-1">
                        {faq?.relatedQuestions?.map((question, index) => (
                          <button
                            key={index}
                            onClick={() => toggleExpanded(question?.id)}
                            className="text-sm text-primary hover:text-primary/80 block text-left"
                          >
                            • {question?.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBookmark(faq)}
                        iconName={isBookmarked ? "BookmarkCheck" : "Bookmark"}
                        iconPosition="left"
                        className={isBookmarked ? "text-accent" : ""}
                      >
                        {isBookmarked ? "Bookmarked" : "Bookmark"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShare(faq)}
                        iconName="Share2"
                        iconPosition="left"
                      >
                        Share
                      </Button>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Updated: {faq?.lastUpdated}</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{faq?.views} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;