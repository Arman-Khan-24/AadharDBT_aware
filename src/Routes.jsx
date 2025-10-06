import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HomeDashboard from './pages/home-dashboard';
import FAQKnowledgeBase from './pages/faq-knowledge-base';
import AdminAnalyticsDashboard from './pages/admin-analytics-dashboard';
import AIChatAssistant from './pages/ai-chat-assistant';
import InteractiveLearningHub from './pages/interactive-learning-hub';
import AccountVerificationTool from './pages/account-verification-tool';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AccountVerificationTool />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/faq-knowledge-base" element={<FAQKnowledgeBase />} />
        <Route path="/admin-analytics-dashboard" element={<AdminAnalyticsDashboard />} />
        <Route path="/ai-chat-assistant" element={<AIChatAssistant />} />
        <Route path="/interactive-learning-hub" element={<InteractiveLearningHub />} />
        <Route path="/account-verification-tool" element={<AccountVerificationTool />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
