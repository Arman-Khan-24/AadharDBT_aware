import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionFAB from '../../components/ui/QuickActionFAB';
import WelcomeHeader from './components/WelcomeHeader';
import ProgressTracker from './components/ProgressTracker';
import QuickAccessCards from './components/QuickAccessCards';
import NotificationPanel from './components/NotificationPanel';
import RecentActivity from './components/RecentActivity';

const HomeDashboard = () => {
  useEffect(() => {
    // Set page title and meta information
    document.title = 'Home Dashboard - AadhaarAware';
    
    // Track page visit
    const visitData = {
      page: 'home-dashboard',
      timestamp: new Date()?.toISOString(),
      userAgent: navigator.userAgent
    };
    
    // Store visit data (in real app, this would be sent to analytics)
    const visits = JSON.parse(localStorage.getItem('page-visits') || '[]');
    visits?.push(visitData);
    localStorage.setItem('page-visits', JSON.stringify(visits?.slice(-100))); // Keep last 100 visits
  }, []);

  return (
    <>
      <Helmet>
        <title>Home Dashboard - AadhaarAware</title>
        <meta name="description" content="Access educational resources and track your Aadhaar banking verification progress for scholarship disbursement." />
        <meta name="keywords" content="Aadhaar, scholarship, DBT, banking, verification, education" />
        <meta property="og:title" content="AadhaarAware - Home Dashboard" />
        <meta property="og:description" content="Your guide to understanding Aadhaar banking for scholarships" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6 max-w-7xl">
          {/* Welcome Header Section */}
          <WelcomeHeader />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Tracker */}
              <ProgressTracker />
              
              {/* Quick Access Cards */}
              <QuickAccessCards />
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Notification Panel */}
              <NotificationPanel />
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>
          </div>
          
          {/* Additional Information Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Help & Support Card */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75 9.75 9.75 0 019.75-9.75z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Get instant assistance with our AI chatbot or contact human support for complex queries.
              </p>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-xs text-success font-medium">Online</span>
              </div>
            </div>
            
            {/* Security Card */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Secure Platform</h3>
                  <p className="text-sm text-muted-foreground">Your data is protected</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                All your personal information is encrypted and handled according to government privacy standards.
              </p>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-success font-medium">SSL Encrypted</span>
              </div>
            </div>
            
            {/* Community Card */}
            <div className="bg-card border rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Growing Community</h3>
                  <p className="text-sm text-muted-foreground">Join thousands of students</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with other SC students and share experiences about scholarship processes.
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full border-2 border-card"></div>
                  <div className="w-6 h-6 bg-success rounded-full border-2 border-card"></div>
                  <div className="w-6 h-6 bg-accent rounded-full border-2 border-card"></div>
                </div>
                <span className="text-xs text-muted-foreground">1000+ active users</span>
              </div>
            </div>
          </div>
        </main>
        
        <QuickActionFAB />
      </div>
    </>
  );
};

export default HomeDashboard;