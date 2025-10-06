import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AdminControls = ({ className = "" }) => {
  const [selectedCampaign, setSelectedCampaign] = useState('current');
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true
  });

  const campaignOptions = [
    { value: 'current', label: 'Current Campaign - Q4 2024' },
    { value: 'previous', label: 'Previous Campaign - Q3 2024' },
    { value: 'pilot', label: 'Pilot Program - Q2 2024' }
  ];

  const quickActions = [
    {
      id: 'broadcast',
      label: 'Send Broadcast',
      icon: 'Megaphone',
      description: 'Send message to all users',
      action: () => console.log('Broadcasting message...')
    },
    {
      id: 'maintenance',
      label: 'Maintenance Mode',
      icon: 'Settings',
      description: 'Enable system maintenance',
      action: () => console.log('Enabling maintenance mode...')
    },
    {
      id: 'backup',
      label: 'Backup Data',
      icon: 'Database',
      description: 'Create system backup',
      action: () => console.log('Creating backup...')
    },
    {
      id: 'support',
      label: 'Support Queue',
      icon: 'HelpCircle',
      description: 'View pending support tickets',
      action: () => console.log('Opening support queue...')
    }
  ];

  const systemStatus = [
    { name: 'API Server', status: 'healthy', uptime: '99.9%' },
    { name: 'Database', status: 'healthy', uptime: '99.8%' },
    { name: 'Chat Service', status: 'warning', uptime: '98.5%' },
    { name: 'File Storage', status: 'healthy', uptime: '99.9%' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Campaign Management */}
      <div className="bg-card border rounded-lg p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Target" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Campaign Management</h3>
            <p className="text-sm text-muted-foreground">Manage active campaigns and settings</p>
          </div>
        </div>

        <div className="space-y-4">
          <Select
            label="Active Campaign"
            options={campaignOptions}
            value={selectedCampaign}
            onChange={setSelectedCampaign}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Campaign Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Reach</span>
                  <span className="text-sm font-medium text-foreground">15,847 users</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Completion Rate</span>
                  <span className="text-sm font-medium text-foreground">68.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Duration</span>
                  <span className="text-sm font-medium text-foreground">45 days</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" fullWidth>
                  <Icon name="Edit" size={16} />
                  Edit Campaign
                </Button>
                <Button variant="outline" size="sm" fullWidth>
                  <Icon name="Copy" size={16} />
                  Duplicate Campaign
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* System Status */}
      <div className="bg-card border rounded-lg p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Server" size={20} color="var(--color-success)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">System Status</h3>
            <p className="text-sm text-muted-foreground">Monitor system health and performance</p>
          </div>
        </div>

        <div className="space-y-3">
          {systemStatus?.map((service) => (
            <div key={service?.name} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={getStatusIcon(service?.status)} 
                  size={16} 
                  className={getStatusColor(service?.status)}
                />
                <span className="font-medium text-foreground">{service?.name}</span>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getStatusColor(service?.status)}`}>
                  {service?.status?.charAt(0)?.toUpperCase() + service?.status?.slice(1)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Uptime: {service?.uptime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border rounded-lg p-6 shadow-soft">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Common administrative tasks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              onClick={action?.action}
              className="flex items-center space-x-3 p-4 h-auto justify-start"
            >
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={action?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">{action?.label}</div>
                <div className="text-sm text-muted-foreground">{action?.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminControls;