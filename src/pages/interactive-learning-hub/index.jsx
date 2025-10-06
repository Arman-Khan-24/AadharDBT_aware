import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ModuleSidebar from './components/ModuleSidebar';
import VideoPlayer from './components/VideoPlayer';
import InteractiveComparison from './components/InteractiveComparison';
import KnowledgeQuiz from './components/KnowledgeQuiz';
import ProgressTracker from './components/ProgressTracker';

const InteractiveLearningHub = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 1024);
  const [currentModule, setCurrentModule] = useState('basics-intro');
  const [activeTab, setActiveTab] = useState('content');
  const [userProgress, setUserProgress] = useState({
    completedModules: ['basics-intro'],
    currentStreak: 3,
    totalTimeSpent: 85,
    recentActivity: [
      {
        type: 'completed',
        description: 'Completed "Introduction to Aadhaar Banking"',
        timestamp: '2 hours ago'
      },
      {
        type: 'bookmarked',
        description: 'Bookmarked "DBT Process Flow"',
        timestamp: '1 day ago'
      },
      {
        type: 'started',
        description: 'Started "Account Verification Steps"',
        timestamp: '2 days ago'
      }
    ]
  });

  // Mock data for learning modules
  const learningModules = [
    {
      id: 'basics-intro',
      title: 'Introduction to Aadhaar Banking',
      section: 'basics',
      duration: '15 min',
      type: 'Video + Text',
      isBookmarked: false,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: `Understanding Aadhaar banking is crucial for scholarship recipients. This module covers the fundamental concepts you need to know.\n\nAadhaar is a 12-digit unique identity number that serves as proof of identity and address. When linked to your bank account, it enables various government services and benefit transfers.`
    },
    {
      id: 'account-types',
      title: 'Types of Bank Accounts',
      section: 'basics',
      duration: '20 min',
      type: 'Interactive',
      isBookmarked: true,
      content: `There are different types of bank accounts, each serving specific purposes:\n\n1. Savings Account - For personal savings\n2. Current Account - For business transactions\n3. Fixed Deposit - For long-term savings\n4. Recurring Deposit - For regular savings`
    },
    {
      id: 'aadhaar-linking',
      title: 'Aadhaar Linking Process',
      section: 'verification',
      duration: '25 min',
      type: 'Step-by-step Guide',
      isBookmarked: false,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: `Learn how to link your Aadhaar with your bank account through various methods:\n\n1. Online Banking\n2. Mobile Banking\n3. Bank Branch Visit\n4. ATM Process`
    },
    {
      id: 'dbt-enabling',
      title: 'DBT Account Enabling',
      section: 'verification',
      duration: '30 min',
      type: 'Video + Quiz',
      isBookmarked: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      content: `Direct Benefit Transfer (DBT) enabling is essential for receiving government scholarships and subsidies directly into your account.`
    },
    {
      id: 'verification-tools',
      title: 'Account Verification Tools',
      section: 'advanced',
      duration: '18 min',
      type: 'Interactive Tool',
      isBookmarked: false,
      content: `Learn to use various online tools to verify your account status and ensure proper DBT enabling.`
    },
    {
      id: 'troubleshooting',
      title: 'Common Issues & Solutions',
      section: 'advanced',
      duration: '22 min',
      type: 'FAQ + Guide',
      isBookmarked: false,
      content: `Common problems students face and their step-by-step solutions:\n\n1. Aadhaar not linking properly\n2. DBT status showing as inactive\n3. Scholarship amount not received\n4. Bank account details mismatch`
    }
  ];

  // Mock comparison data
  const comparisonData = {
    features: [
      {
        name: 'Identity Verification',
        description: 'Basic identity proof',
        icon: 'User',
        aadhaarLinked: true,
        dbtEnabled: true
      },
      {
        name: 'Direct Benefit Transfer',
        description: 'Receive government benefits',
        icon: 'CreditCard',
        aadhaarLinked: false,
        dbtEnabled: true
      },
      {
        name: 'Scholarship Disbursement',
        description: 'Automatic scholarship payments',
        icon: 'GraduationCap',
        aadhaarLinked: false,
        dbtEnabled: true
      },
      {
        name: 'Subsidy Payments',
        description: 'Government subsidy transfers',
        icon: 'Gift',
        aadhaarLinked: false,
        dbtEnabled: true
      },
      {
        name: 'PFMS Integration',
        description: 'Public Financial Management System',
        icon: 'Database',
        aadhaarLinked: false,
        dbtEnabled: true
      }
    ],
    aadhaarLinkingSteps: [
      {
        title: 'Visit Bank Branch',
        description: 'Go to your bank with Aadhaar card',
        duration: '30 min'
      },
      {
        title: 'Fill Form',
        description: 'Complete Aadhaar linking form',
        duration: '10 min'
      },
      {
        title: 'Verification',
        description: 'Bank verifies your details',
        duration: '15 min'
      },
      {
        title: 'Confirmation',
        description: 'Receive linking confirmation',
        duration: '2-3 days'
      }
    ],
    dbtEnablingSteps: [
      {
        title: 'Aadhaar Seeding',
        description: 'Ensure Aadhaar is properly seeded',
        duration: '1 day'
      },
      {
        title: 'PFMS Mapping',
        description: 'Account mapped in PFMS system',
        duration: '2-3 days'
      },
      {
        title: 'Verification',
        description: 'Government verifies account details',
        duration: '5-7 days'
      },
      {
        title: 'Activation',
        description: 'DBT status becomes active',
        duration: '1-2 days'
      }
    ],
    benefits: [
      {
        title: 'Faster Payments',
        description: 'Direct transfers without delays',
        impact: '90% faster',
        icon: 'Zap'
      },
      {
        title: 'Reduced Errors',
        description: 'Automated system reduces mistakes',
        impact: '95% accuracy',
        icon: 'Target'
      },
      {
        title: 'Transparency',
        description: 'Track payment status online',
        impact: '100% visibility',
        icon: 'Eye'
      }
    ]
  };

  // Mock quiz questions
  const quizQuestions = [
    {
      question: 'What is the main difference between Aadhaar linked and DBT enabled accounts?',
      options: [
        'There is no difference',
        'DBT enabled accounts can receive direct government transfers',
        'Aadhaar linked accounts are more secure',
        'DBT enabled accounts have higher interest rates'
      ],
      correctAnswer: 1,
      explanation: 'DBT enabled accounts are specifically configured to receive direct benefit transfers from the government, while Aadhaar linked accounts only have basic identity verification.'
    },
    {
      question: 'Which system is used for mapping DBT enabled accounts?',
      options: [
        'UIDAI',
        'RBI',
        'PFMS (Public Financial Management System)',
        'NPCI'
      ],
      correctAnswer: 2,
      explanation: 'PFMS (Public Financial Management System) is the government system that maps and manages DBT enabled accounts for direct benefit transfers.'
    },
    {
      question: 'How long does it typically take to enable DBT on an account?',
      options: [
        '1 day',
        '3-5 days',
        '7-15 days',
        '1 month'
      ],
      correctAnswer: 2,
      explanation: 'The DBT enabling process typically takes 7-15 days as it involves multiple verification steps including Aadhaar seeding, PFMS mapping, and government verification.'
    },
    {
      question: 'What happens if your scholarship is sent to a non-DBT enabled account?',
      options: [
        'You receive the money immediately',
        'The money is returned to the government',
        'The bank converts it automatically',
        'You get a notification to enable DBT'
      ],
      correctAnswer: 1,
      explanation: 'If a scholarship is sent to a non-DBT enabled account, the transfer typically fails and the money is returned to the government, causing delays in disbursement.'
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    const handleResize = () => {
      setIsSidebarCollapsed(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleModuleSelect = (moduleId) => {
    setCurrentModule(moduleId);
    setIsSidebarCollapsed(true);
  };

  const handleModuleComplete = (moduleId) => {
    setUserProgress(prev => ({
      ...prev,
      completedModules: [...prev?.completedModules, moduleId],
      recentActivity: [
        {
          type: 'completed',
          description: `Completed "${learningModules?.find(m => m?.id === moduleId)?.title}"`,
          timestamp: 'Just now'
        },
        ...prev?.recentActivity
      ]
    }));
  };

  const handleBookmarkToggle = (moduleId) => {
    const moduleIndex = learningModules?.findIndex(m => m?.id === moduleId);
    if (moduleIndex !== -1) {
      learningModules[moduleIndex].isBookmarked = !learningModules?.[moduleIndex]?.isBookmarked;
      setUserProgress(prev => ({
        ...prev,
        recentActivity: [
          {
            type: 'bookmarked',
            description: `${learningModules?.[moduleIndex]?.isBookmarked ? 'Bookmarked' : 'Removed bookmark from'} "${learningModules?.[moduleIndex]?.title}"`,
            timestamp: 'Just now'
          },
          ...prev?.recentActivity
        ]
      }));
    }
  };

  const handleDownloadPDF = () => {
    // Mock PDF download
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVGl0bGUgKEFhZGhhYXIgQmFua2luZyBHdWlkZSk=';
    link.download = 'aadhaar-banking-guide.pdf';
    link?.click();
  };

  const handleShareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'AadhaarAware Learning Progress',
        text: `I've completed ${userProgress?.completedModules?.length} modules on AadhaarAware!`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  const currentModuleData = learningModules?.find(m => m?.id === currentModule);
  const tabs = [
    { id: 'content', label: 'Content', icon: 'BookOpen' },
    { id: 'comparison', label: 'Compare', icon: 'GitCompare' },
    { id: 'quiz', label: 'Quiz', icon: 'Brain' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Interactive Learning Hub
              </h1>
              <p className="text-muted-foreground">
                Master Aadhaar banking concepts through interactive content
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/account-verification-tool')}
                iconName="Shield"
                iconPosition="left"
              >
                Verify Account
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/ai-chat-assistant')}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <ModuleSidebar
          modules={learningModules}
          currentModule={currentModule}
          onModuleSelect={handleModuleSelect}
          userProgress={userProgress}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-80'
        }`}>
          <div className="p-6">
            {/* Tab Navigation */}
            <div className="border-b mb-6">
              <div className="flex space-x-1 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-96">
              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Module Header */}
                  <div className="bg-card border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-foreground mb-2">
                          {currentModuleData?.title}
                        </h2>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>{currentModuleData?.duration}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Icon name="Tag" size={14} />
                            <span>{currentModuleData?.type}</span>
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmarkToggle(currentModule)}
                          iconName={currentModuleData?.isBookmarked ? "Bookmark" : "BookmarkPlus"}
                          className={currentModuleData?.isBookmarked ? "text-accent" : ""}
                        >
                          {currentModuleData?.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleDownloadPDF}
                          iconName="Download"
                        >
                          PDF
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleShareContent}
                          iconName="Share"
                        >
                          Share
                        </Button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 mb-4">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: '65%' }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      65% complete • Continue reading to finish this module
                    </p>
                  </div>

                  {/* Video Content */}
                  {currentModuleData?.videoUrl && (
                    <div className="bg-card border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">
                        Video Tutorial
                      </h3>
                      <VideoPlayer
                        videoUrl={currentModuleData?.videoUrl}
                        title={currentModuleData?.title}
                        description="Learn the fundamentals through this comprehensive video guide"
                        onComplete={() => handleModuleComplete(currentModule)}
                        onProgress={(progress) => {
                          console.log('Video progress:', progress);
                        }}
                        subtitles={[
                          { lang: 'en', label: 'English', src: '/subtitles/en.vtt' },
                          { lang: 'hi', label: 'हिंदी', src: '/subtitles/hi.vtt' }
                        ]}
                        className="aspect-video"
                      />
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="bg-card border rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Module Content
                    </h3>
                    <div className="prose max-w-none">
                      {currentModuleData?.content?.split('\n')?.map((paragraph, index) => (
                        <p key={index} className="text-foreground mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Module Actions */}
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const currentIndex = learningModules?.findIndex(m => m?.id === currentModule);
                        if (currentIndex > 0) {
                          setCurrentModule(learningModules?.[currentIndex - 1]?.id);
                        }
                      }}
                      iconName="ChevronLeft"
                      iconPosition="left"
                      disabled={learningModules?.findIndex(m => m?.id === currentModule) === 0}
                    >
                      Previous Module
                    </Button>
                    
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleModuleComplete(currentModule);
                        const currentIndex = learningModules?.findIndex(m => m?.id === currentModule);
                        if (currentIndex < learningModules?.length - 1) {
                          setCurrentModule(learningModules?.[currentIndex + 1]?.id);
                        }
                      }}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Complete & Next
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'comparison' && (
                <InteractiveComparison
                  comparisonData={comparisonData}
                  onComplete={() => handleModuleComplete('comparison-module')}
                />
              )}

              {activeTab === 'quiz' && (
                <KnowledgeQuiz
                  questions={quizQuestions}
                  onComplete={(results) => {
                    console.log('Quiz completed:', results);
                    handleModuleComplete('quiz-module');
                  }}
                  onProgress={(current, total) => {
                    console.log(`Quiz progress: ${current}/${total}`);
                  }}
                />
              )}

              {activeTab === 'progress' && (
                <ProgressTracker
                  userProgress={userProgress}
                  modules={learningModules}
                  onBookmarkToggle={handleBookmarkToggle}
                  onDownloadPDF={handleDownloadPDF}
                  onShareContent={handleShareContent}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Floating Progress Indicator */}
      <div className="fixed bottom-6 left-6 bg-card border rounded-lg p-3 shadow-elevated z-40 hidden lg:block">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-primary">
              {Math.round((userProgress?.completedModules?.length / learningModules?.length) * 100)}%
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">
              Overall Progress
            </div>
            <div className="text-xs text-muted-foreground">
              {userProgress?.completedModules?.length}/{learningModules?.length} modules
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveLearningHub;