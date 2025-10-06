import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  description,
  trend = [] 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border rounded-lg p-6 shadow-soft hover:shadow-elevated nav-transition">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={icon} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <p className="text-2xl font-bold text-foreground">{value}</p>
          </div>
        </div>
        {change && (
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span className="text-sm font-medium">{change}</span>
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      {trend?.length > 0 && (
        <div className="flex items-center space-x-1">
          {trend?.map((point, index) => (
            <div
              key={index}
              className="h-1 bg-primary/20 rounded-full flex-1"
              style={{
                backgroundColor: point > 50 ? 'var(--color-primary)' : 'var(--color-muted)'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricsCard;