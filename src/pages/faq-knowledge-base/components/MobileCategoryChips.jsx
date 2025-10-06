import React from 'react';
import Icon from '../../../components/AppIcon';

const MobileCategoryChips = ({ categories, selectedCategory, onCategorySelect, className = "" }) => {
  return (
    <div className={`${className}`}>
      <div className="flex overflow-x-auto scrollbar-hide space-x-2 pb-2">
        {/* All Categories Chip */}
        <button
          onClick={() => onCategorySelect('all')}
          className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            selectedCategory === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          <Icon name="Grid3X3" size={16} />
          <span>All</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            selectedCategory === 'all' ?'bg-primary-foreground/20 text-primary-foreground' :'bg-background text-muted-foreground'
          }`}>
            {categories?.reduce((total, cat) => total + cat?.count, 0)}
          </span>
        </button>

        {/* Category Chips */}
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategorySelect(category?.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 relative ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${
              selectedCategory === category?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-background text-muted-foreground'
            }`}>
              {category?.count}
            </span>
            
            {/* Popular Indicator */}
            {category?.isPopular && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full flex items-center justify-center">
                <Icon name="TrendingUp" size={8} className="text-accent-foreground" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileCategoryChips;