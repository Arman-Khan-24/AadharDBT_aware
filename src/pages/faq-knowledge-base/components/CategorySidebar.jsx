import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategorySidebar = ({ categories, selectedCategory, onCategorySelect, className = "" }) => {
  const handleCategoryClick = (categoryId) => {
    onCategorySelect(categoryId);
  };

  return (
    <div className={`bg-card border rounded-lg p-4 ${className}`}>
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
        <Icon name="Folder" size={20} className="text-primary" />
        <span>Categories</span>
      </h2>
      <div className="space-y-2">
        {/* All Categories */}
        <button
          onClick={() => handleCategoryClick('all')}
          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
            selectedCategory === 'all' ?'bg-primary text-primary-foreground' :'hover:bg-muted text-foreground'
          }`}
        >
          <div className="flex items-center space-x-3">
            <Icon name="Grid3X3" size={18} />
            <span className="font-medium">All Categories</span>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            selectedCategory === 'all' ?'bg-primary-foreground/20 text-primary-foreground' :'bg-muted text-muted-foreground'
          }`}>
            {categories?.reduce((total, cat) => total + cat?.count, 0)}
          </span>
        </button>

        {/* Individual Categories */}
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => handleCategoryClick(category?.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-foreground'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={category?.icon} size={18} />
              <div className="text-left">
                <div className="font-medium">{category?.name}</div>
                {category?.description && (
                  <div className={`text-xs mt-1 ${
                    selectedCategory === category?.id
                      ? 'text-primary-foreground/80'
                      : 'text-muted-foreground'
                  }`}>
                    {category?.description}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {category?.count}
              </span>
              {category?.isPopular && (
                <div className="flex items-center space-x-1">
                  <Icon name="TrendingUp" size={12} className="text-accent" />
                  <span className="text-xs text-accent">Popular</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      {/* Quick Actions */}
      <div className="mt-6 pt-4 border-t">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            iconName="MessageCircle"
            iconPosition="left"
          >
            Ask AI Assistant
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            iconName="BookOpen"
            iconPosition="left"
          >
            Learning Hub
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            iconName="Shield"
            iconPosition="left"
          >
            Verify Account
          </Button>
        </div>
      </div>
      {/* Contact Support */}
      <div className="mt-6 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="HelpCircle" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Need More Help?</span>
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Can't find what you're looking for? Contact our support team.
        </p>
        <Button variant="outline" size="xs" className="w-full">
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default CategorySidebar;