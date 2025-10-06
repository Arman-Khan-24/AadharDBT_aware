import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const location = useLocation();

  const navigationItems = [
    { path: '/home-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/interactive-learning-hub', label: 'Learn', icon: 'BookOpen' },
    { path: '/account-verification-tool', label: 'Verify', icon: 'Shield' },
    { path: '/ai-chat-assistant', label: 'Help', icon: 'MessageCircle' },
  ];

  const moreMenuItems = [
    { path: '/faq-knowledge-base', label: 'FAQ', icon: 'HelpCircle' },
    { path: '/admin-analytics-dashboard', label: 'Admin', icon: 'BarChart3' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', label: 'తెలుగు', flag: '🇮🇳' },
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-soft">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <Link to="/home-dashboard" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Icon name="Shield" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              AadhaarAware
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium nav-transition ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </Button>
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border rounded-md shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible nav-transition">
              {moreMenuItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 text-sm hover:bg-muted nav-transition ${
                    isActiveRoute(item?.path) ? 'bg-muted text-primary' : 'text-popover-foreground'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <div className="relative group">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <span className="text-sm">
                {languages?.find(lang => lang?.code === currentLanguage)?.flag}
              </span>
              <span className="hidden sm:inline text-sm">
                {languages?.find(lang => lang?.code === currentLanguage)?.label}
              </span>
              <Icon name="ChevronDown" size={14} />
            </Button>
            <div className="absolute right-0 top-full mt-1 w-32 bg-popover border rounded-md shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible nav-transition">
              {languages?.map((lang) => (
                <button
                  key={lang?.code}
                  onClick={() => handleLanguageChange(lang?.code)}
                  className={`flex items-center space-x-2 w-full px-3 py-2 text-sm text-left hover:bg-muted nav-transition ${
                    currentLanguage === lang?.code ? 'bg-muted text-primary' : 'text-popover-foreground'
                  }`}
                >
                  <span>{lang?.flag}</span>
                  <span>{lang?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium nav-transition ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            <div className="border-t pt-2 mt-2">
              {moreMenuItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium nav-transition ${
                    isActiveRoute(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;