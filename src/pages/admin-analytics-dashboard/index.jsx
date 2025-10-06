import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import MetricsCard from './components/MetricsCard';
import ActivityChart from './components/ActivityChart';
import UserEngagementTable from './components/UserEngagementTable';
import ExportControls from './components/ExportControls';
import RealTimeUpdates from './components/RealTimeUpdates';
import AdminControls from './components/AdminControls';

const AdminAnalyticsDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [dateFilter, setDateFilter] = useState('last30days');
  const [regionFilter, setRegionFilter] = useState('all');

  // Mock data for metrics
  const metricsData = [
    {
      title: "Total Active Users",
      value: "15,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Users",
      description: "Users who accessed the platform in the last 30 days",
      trend: [65, 70, 68, 75, 80, 85, 82, 88]
    },
    {
      title: "Module Completion Rate",
      value: "68.3%",
      change: "+5.2%",
      changeType: "positive",
      icon: "BookOpen",
      description: "Average completion rate across all educational modules",
      trend: [60, 62, 65, 63, 67, 68, 66, 68]
    },
    {
      title: "Verification Attempts",
      value: "8,924",
      change: "+18.7%",
      changeType: "positive",
      icon: "Shield",
      description: "Total Aadhaar verification attempts this month",
      trend: [45, 50, 48, 55, 60, 58, 62, 65]
    },
    {
      title: "Support Queries",
      value: "2,156",
      change: "-8.3%",
      changeType: "negative",
      icon: "MessageCircle",
      description: "AI chat and human support interactions",
      trend: [80, 75, 78, 72, 70, 68, 65, 62]
    }
  ];

  // Mock data for charts
  const userActivityData = [
    { name: 'Mon', value: 1200 },
    { name: 'Tue', value: 1450 },
    { name: 'Wed', value: 1380 },
    { name: 'Thu', value: 1650 },
    { name: 'Fri', value: 1820 },
    { name: 'Sat', value: 1100 },
    { name: 'Sun', value: 950 }
  ];

  const modulePopularityData = [
    { name: 'Aadhaar Basics', value: 4200 },
    { name: 'Banking Guide', value: 3800 },
    { name: 'DBT Process', value: 3200 },
    { name: 'Verification Steps', value: 2900 },
    { name: 'Troubleshooting', value: 2100 }
  ];

  const regionalData = [
    { name: 'Uttar Pradesh', value: 3200 },
    { name: 'Bihar', value: 2800 },
    { name: 'West Bengal', value: 2400 },
    { name: 'Madhya Pradesh', value: 2100 },
    { name: 'Rajasthan', value: 1900 },
    { name: 'Others', value: 3400 }
  ];

  // Mock user engagement data
  const userEngagementData = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      region: "Uttar Pradesh",
      completionRate: 85,
      verificationStatus: "verified",
      lastActivity: "2024-09-15"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      region: "Bihar",
      completionRate: 72,
      verificationStatus: "pending",
      lastActivity: "2024-09-14"
    },
    {
      id: 3,
      name: "Anita Devi",
      email: "anita.devi@email.com",
      region: "West Bengal",
      completionRate: 95,
      verificationStatus: "verified",
      lastActivity: "2024-09-15"
    },
    {
      id: 4,
      name: "Suresh Patel",
      email: "suresh.patel@email.com",
      region: "Gujarat",
      completionRate: 45,
      verificationStatus: "inactive",
      lastActivity: "2024-09-12"
    },
    {
      id: 5,
      name: "Kavita Singh",
      email: "kavita.singh@email.com",
      region: "Madhya Pradesh",
      completionRate: 78,
      verificationStatus: "active",
      lastActivity: "2024-09-15"
    },
    {
      id: 6,
      name: "Ramesh Yadav",
      email: "ramesh.yadav@email.com",
      region: "Rajasthan",
      completionRate: 63,
      verificationStatus: "pending",
      lastActivity: "2024-09-13"
    },
    {
      id: 7,
      name: "Sunita Kumari",
      email: "sunita.kumari@email.com",
      region: "Jharkhand",
      completionRate: 89,
      verificationStatus: "verified",
      lastActivity: "2024-09-15"
    },
    {
      id: 8,
      name: "Vikash Singh",
      email: "vikash.singh@email.com",
      region: "Uttar Pradesh",
      completionRate: 56,
      verificationStatus: "active",
      lastActivity: "2024-09-14"
    }
  ];

  const dateFilterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' }
  ];

  const regionFilterOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'up', label: 'Uttar Pradesh' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'wb', label: 'West Bengal' },
    { value: 'mp', label: 'Madhya Pradesh' },
    { value: 'rajasthan', label: 'Rajasthan' }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  const handleExport = (exportData) => {
    console.log('Exporting data:', exportData);
    // Mock export functionality
    alert(`Report exported successfully as ${exportData?.format?.toUpperCase()}`);
  };

  const content = {
    en: {
      title: "Admin Analytics Dashboard",
      description: "Monitor campaign effectiveness and user engagement across the educational platform",
      filters: "Filters",
      overview: "Performance Overview",
      charts: "Analytics Charts",
      userActivity: "Daily User Activity",
      modulePopularity: "Popular Modules",
      regionalDistribution: "Regional Distribution",
      engagement: "User Engagement",
      realTime: "Real-Time Updates",
      controls: "Administrative Controls"
    },
    hi: {
      title: "प्रशासनिक विश्लेषण डैशबोर्ड",
      description: "शैक्षिक मंच पर अभियान प्रभावशीलता और उपयोगकर्ता सहभागिता की निगरानी करें",
      filters: "फिल्टर",
      overview: "प्रदर्शन अवलोकन",
      charts: "विश्लेषण चार्ट",
      userActivity: "दैनिक उपयोगकर्ता गतिविधि",
      modulePopularity: "लोकप्रिय मॉड्यूल",
      regionalDistribution: "क्षेत्रीय वितरण",
      engagement: "उपयोगकर्ता सहभागिता",
      realTime: "रीयल-टाइम अपडेट",
      controls: "प्रशासनिक नियंत्रण"
    },
    te: {
      title: "అడ్మిన్ అనలిటిక్స్ డ్యాష్‌బోర్డ్",
      description: "విద్యా వేదికలో ప్రచార ప్రభావం మరియు వినియోగదారు నిమగ్నతను పర్యవేక్షించండి",
      filters: "ఫిల్టర్లు",
      overview: "పనితీరు అవలోకనం",
      charts: "విశ్లేషణ చార్ట్లు",
      userActivity: "రోజువారీ వినియోగదారు కార్యకలాపాలు",
      modulePopularity: "ప్రసిద్ధ మాడ్యూల్స్",
      regionalDistribution: "ప్రాంతీయ పంపిణీ",
      engagement: "వినియోగదారు నిమగ్నత",
      realTime: "రియల్-టైమ్ అప్‌డేట్లు",
      controls: "పరిపాలనా నియంత్రణలు"
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  return (
    <>
      <Helmet>
        <title>{t?.title} - AadhaarAware</title>
        <meta name="description" content={t?.description} />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-card border-b shadow-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="BarChart3" size={24} color="var(--color-primary)" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">{t?.title}</h1>
                    <p className="text-muted-foreground">{t?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Button variant="outline" iconName="RefreshCw" iconPosition="left">
                    Refresh
                  </Button>
                  <Button iconName="Settings" iconPosition="left">
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filters */}
          <div className="mb-8">
            <div className="bg-card border rounded-lg p-6 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4">{t?.filters}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                  label="Date Range"
                  options={dateFilterOptions}
                  value={dateFilter}
                  onChange={setDateFilter}
                />
                <Select
                  label="Region"
                  options={regionFilterOptions}
                  value={regionFilter}
                  onChange={setRegionFilter}
                />
                <div className="flex items-end">
                  <Button variant="outline" fullWidth iconName="Filter" iconPosition="left">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">{t?.overview}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric?.title}
                  value={metric?.value}
                  change={metric?.change}
                  changeType={metric?.changeType}
                  icon={metric?.icon}
                  description={metric?.description}
                  trend={metric?.trend}
                />
              ))}
            </div>
          </div>

          {/* Charts Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">{t?.charts}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <ActivityChart
                title={t?.userActivity}
                data={userActivityData}
                type="bar"
              />
              <ActivityChart
                title={t?.modulePopularity}
                data={modulePopularityData}
                type="bar"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityChart
                title={t?.regionalDistribution}
                data={regionalData}
                type="pie"
              />
              <RealTimeUpdates />
            </div>
          </div>

          {/* User Engagement Table */}
          <div className="mb-8">
            <UserEngagementTable data={userEngagementData} />
          </div>

          {/* Export and Admin Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ExportControls onExport={handleExport} />
            <AdminControls />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAnalyticsDashboard;