import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RealTimeUpdates = ({ className = "" }) => {
  const [currentUsers, setCurrentUsers] = useState(247);
  const [recentActivity, setRecentActivity] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isLive, setIsLive] = useState(true);

  // Mock real-time data
  const mockActivities = [
    {
      id: 1,
      type: 'verification',
      user: 'Priya Sharma',
      action: 'completed Aadhaar verification',
      timestamp: new Date(Date.now() - 30000),
      status: 'success'
    },
    {
      id: 2,
      type: 'module',
      user: 'Rajesh Kumar',
      action: 'started Banking Basics module',
      timestamp: new Date(Date.now() - 120000),
      status: 'info'
    },
    {
      id: 3,
      type: 'chat',
      user: 'Anita Devi',
      action: 'asked question in AI chat',
      timestamp: new Date(Date.now() - 180000),
      status: 'info'
    },
    {
      id: 4,
      type: 'verification',
      user: 'Suresh Patel',
      action: 'verification failed - retry needed',
      timestamp: new Date(Date.now() - 240000),
      status: 'warning'
    },
    {
      id: 5,
      type: 'module',
      user: 'Kavita Singh',
      action: 'completed DBT Understanding module',
      timestamp: new Date(Date.now() - 300000),
      status: 'success'
    }
  ];

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      // Simulate real-time updates
      setCurrentUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
      setLastUpdate(new Date());
      
      // Occasionally add new activity
      if (Math.random() > 0.7) {
        const newActivity = {
          id: Date.now(),
          type: ['verification', 'module', 'chat']?.[Math.floor(Math.random() * 3)],
          user: ['New User', 'Active User', 'Returning User']?.[Math.floor(Math.random() * 3)],
          action: 'performed an action',
          timestamp: new Date(),
          status: ['success', 'info', 'warning']?.[Math.floor(Math.random() * 3)]
        };
        
        setRecentActivity(prev => [newActivity, ...prev?.slice(0, 4)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isLive]);

  useEffect(() => {
    setRecentActivity(mockActivities);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'verification':
        return 'Shield';
      case 'module':
        return 'BookOpen';
      case 'chat':
        return 'MessageCircle';
      default:
        return 'Activity';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className={`bg-card border rounded-lg shadow-soft ${className}`}>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} color="var(--color-success)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Real-Time Activity</h3>
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdate?.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted'}`} />
              <span className="text-sm text-muted-foreground">
                {isLive ? 'Live' : 'Paused'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLive(!isLive)}
            >
              <Icon name={isLive ? 'Pause' : 'Play'} size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Current Users */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">{currentUsers}</div>
            <div className="text-sm text-muted-foreground">Active Users Online</div>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Users" size={24} color="var(--color-primary)" />
          </div>
        </div>
      </div>
      {/* Recent Activity Feed */}
      <div className="p-6">
        <h4 className="text-sm font-medium text-foreground mb-4">Recent Activity</h4>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                activity?.status === 'success' ? 'bg-success/10' :
                activity?.status === 'warning' ? 'bg-warning/10' :
                activity?.status === 'error' ? 'bg-error/10' : 'bg-primary/10'
              }`}>
                <Icon 
                  name={getActivityIcon(activity?.type)} 
                  size={16} 
                  className={getStatusColor(activity?.status)}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity?.user}</span> {activity?.action}
                  </p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatTime(activity?.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button variant="ghost" size="sm" fullWidth>
            <Icon name="MoreHorizontal" size={16} />
            View All Activity
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealTimeUpdates;