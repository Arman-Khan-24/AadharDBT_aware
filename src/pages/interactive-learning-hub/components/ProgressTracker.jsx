import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ 
  userProgress, 
  modules, 
  onBookmarkToggle,
  onDownloadPDF,
  onShareContent,
  className = "" 
}) => {
  const completedModules = userProgress?.completedModules?.length;
  const totalModules = modules?.length;
  const progressPercentage = Math.round((completedModules / totalModules) * 100);
  
  const bookmarkedModules = modules?.filter(module => module.isBookmarked);
  const currentStreak = userProgress?.currentStreak || 0;
  const totalTimeSpent = userProgress?.totalTimeSpent || 0;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getProgressLevel = () => {
    if (progressPercentage >= 90) return { level: 'Expert', color: 'text-success', icon: 'Award' };
    if (progressPercentage >= 70) return { level: 'Advanced', color: 'text-primary', icon: 'Star' };
    if (progressPercentage >= 40) return { level: 'Intermediate', color: 'text-warning', icon: 'TrendingUp' };
    return { level: 'Beginner', color: 'text-muted-foreground', icon: 'BookOpen' };
  };

  const progressLevel = getProgressLevel();

  const achievements = [
    {
      id: 'first-module',
      title: 'First Steps',
      description: 'Complete your first module',
      icon: 'Play',
      unlocked: completedModules >= 1,
      progress: Math.min(completedModules, 1),
      total: 1
    },
    {
      id: 'half-way',
      title: 'Half Way There',
      description: 'Complete 50% of modules',
      icon: 'Target',
      unlocked: progressPercentage >= 50,
      progress: Math.min(completedModules, Math.ceil(totalModules / 2)),
      total: Math.ceil(totalModules / 2)
    },
    {
      id: 'bookworm',
      title: 'Bookworm',
      description: 'Bookmark 5 modules',
      icon: 'Bookmark',
      unlocked: bookmarkedModules?.length >= 5,
      progress: Math.min(bookmarkedModules?.length, 5),
      total: 5
    },
    {
      id: 'dedicated',
      title: 'Dedicated Learner',
      description: 'Study for 2+ hours',
      icon: 'Clock',
      unlocked: totalTimeSpent >= 120,
      progress: Math.min(totalTimeSpent, 120),
      total: 120
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Overall Progress Card */}
      <div className="bg-card border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Learning Progress
          </h3>
          <div className={`flex items-center space-x-2 ${progressLevel?.color}`}>
            <Icon name={progressLevel?.icon} size={16} />
            <span className="text-sm font-medium">{progressLevel?.level}</span>
          </div>
        </div>

        {/* Progress Ring */}
        <div className="flex items-center space-x-6 mb-6">
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${progressPercentage * 2.51} 251`}
                className="text-primary transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">
                {progressPercentage}%
              </span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Modules Completed</span>
              <span className="font-medium text-foreground">
                {completedModules}/{totalModules}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Time Spent</span>
              <span className="font-medium text-foreground">
                {formatTime(totalTimeSpent)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Streak</span>
              <span className="font-medium text-foreground">
                {currentStreak} days
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-background rounded-lg border">
            <Icon name="CheckCircle" size={20} className="text-success mx-auto mb-1" />
            <div className="text-lg font-bold text-success">{completedModules}</div>
            <div className="text-xs text-muted-foreground">Completed</div>
          </div>
          
          <div className="text-center p-3 bg-background rounded-lg border">
            <Icon name="Bookmark" size={20} className="text-accent mx-auto mb-1" />
            <div className="text-lg font-bold text-accent">{bookmarkedModules?.length}</div>
            <div className="text-xs text-muted-foreground">Bookmarked</div>
          </div>
          
          <div className="text-center p-3 bg-background rounded-lg border">
            <Icon name="Flame" size={20} className="text-warning mx-auto mb-1" />
            <div className="text-lg font-bold text-warning">{currentStreak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>
      </div>
      {/* Achievements */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Achievements
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {achievements?.map((achievement) => (
            <div 
              key={achievement?.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                achievement?.unlocked 
                  ? 'bg-success/10 border-success/30' :'bg-muted/30 border-muted'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  achievement?.unlocked 
                    ? 'bg-success text-success-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={achievement?.icon} size={16} />
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement?.unlocked ? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {achievement?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {achievement?.description}
                  </p>
                </div>
                
                {achievement?.unlocked && (
                  <Icon name="CheckCircle" size={16} className="text-success" />
                )}
              </div>
              
              {/* Progress Bar for Achievement */}
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    achievement?.unlocked ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{ 
                    width: `${(achievement?.progress / achievement?.total) * 100}%` 
                  }}
                />
              </div>
              
              <div className="text-xs text-muted-foreground mt-1">
                {achievement?.progress}/{achievement?.total}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Activity */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Activity
        </h3>
        
        <div className="space-y-3">
          {userProgress?.recentActivity?.slice(0, 5)?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-background rounded-lg border">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity?.type === 'completed' ? 'bg-success/10 text-success' :
                activity?.type === 'bookmarked'? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
              }`}>
                <Icon 
                  name={
                    activity?.type === 'completed' ? 'CheckCircle' :
                    activity?.type === 'bookmarked'? 'Bookmark' : 'Play'
                  } 
                  size={14} 
                />
              </div>
              
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  {activity?.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity?.timestamp}
                </p>
              </div>
            </div>
          )) || (
            <div className="text-center py-8">
              <Icon name="Activity" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">No recent activity</p>
            </div>
          )}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Quick Actions
        </h3>
        
        <div className="grid md:grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="justify-start"
            iconName="Download"
            iconPosition="left"
            onClick={onDownloadPDF}
          >
            Download Progress Report
          </Button>
          
          <Button
            variant="outline"
            className="justify-start"
            iconName="Share"
            iconPosition="left"
            onClick={onShareContent}
          >
            Share Achievement
          </Button>
          
          <Button
            variant="outline"
            className="justify-start"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => window.location?.reload()}
          >
            Reset Progress
          </Button>
          
          <Button
            variant="outline"
            className="justify-start"
            iconName="Calendar"
            iconPosition="left"
          >
            Set Study Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;