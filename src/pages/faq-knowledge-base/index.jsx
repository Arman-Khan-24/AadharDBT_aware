import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import CategorySidebar from './components/CategorySidebar';
import FAQAccordion from './components/FAQAccordion';
import MobileCategoryChips from './components/MobileCategoryChips';
import BookmarkManager from './components/BookmarkManager';

const FAQKnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  // Mock FAQ data
  const faqData = [
    {
      id: 1,
      question: "What is the difference between Aadhaar linked and DBT enabled bank account?",
      answer: `Aadhaar linked account means your Aadhaar number is connected to your bank account for identification purposes. However, DBT (Direct Benefit Transfer) enabled account means your account is specifically configured to receive government benefits and scholarships.\n\nKey differences:\n• Aadhaar linking is just for identification\n• DBT enabling allows you to receive government payments\n• You need both for scholarship disbursement\n• DBT status can be checked separately online`,
      category: "aadhaar-linking",
      categoryName: "Aadhaar Linking",
      tags: ["DBT", "Aadhaar", "Bank Account", "Scholarship"],
      steps: [
        "Visit your bank branch with Aadhaar card",
        "Fill the Aadhaar linking form",
        "Submit the form to bank officer",
        "Wait for confirmation SMS",
        "Check DBT status online after 24 hours"
      ],
      relatedLinks: [
        { title: "Check DBT Status Online", url: "/account-verification-tool" },
        { title: "Learn About Aadhaar Banking", url: "/interactive-learning-hub" }
      ],
      relatedQuestions: [
        { id: 2, title: "How to check if my account is DBT enabled?" },
        { id: 3, title: "Why is my scholarship not credited to my account?" }
      ],
      isPopular: true,
      views: 1250,
      lastUpdated: "Dec 10, 2024"
    },
    {
      id: 2,
      question: "How to check if my bank account is DBT enabled?",
      answer: `You can check your DBT status through multiple methods:\n\n1. Online Portal: Visit the official DBT portal and enter your Aadhaar number\n2. SMS Service: Send SMS to check status\n3. Bank Branch: Visit your bank and ask for DBT status\n4. Mobile Banking: Some banks show DBT status in mobile apps\n\nIf your account is not DBT enabled, contact your bank immediately to enable it.`,
      category: "dbt-process",
      categoryName: "DBT Process",
      tags: ["DBT Status", "Check Account", "Online Verification"],
      steps: [
        "Go to DBT portal website",
        "Enter your Aadhaar number",
        "Enter mobile number linked to Aadhaar",
        "Click on \'Know Your Payment Status'",
        "View your DBT enabled accounts"
      ],
      relatedLinks: [
        { title: "DBT Verification Tool", url: "/account-verification-tool" },
        { title: "Contact Support", url: "/ai-chat-assistant" }
      ],
      isPopular: true,
      views: 980,
      lastUpdated: "Dec 12, 2024"
    },
    {
      id: 3,
      question: "Why is my scholarship not credited to my bank account?",
      answer: `There are several reasons why your scholarship might not be credited:\n\n1. Account not DBT enabled\n2. Aadhaar not properly linked to bank account\n3. Mobile number mismatch in Aadhaar and bank records\n4. Account frozen or inactive\n5. Incorrect bank details in scholarship application\n6. Pending document verification\n\nCheck each of these factors and contact your bank or scholarship authority for resolution.`,
      category: "scholarship-applications",
      categoryName: "Scholarship Applications",
      tags: ["Scholarship", "Payment Issues", "Account Problems"],
      steps: [
        "Check if account is DBT enabled",
        "Verify Aadhaar linking status",
        "Confirm mobile number matches in all records",
        "Check account status with bank",
        "Contact scholarship helpline if all above are correct"
      ],
      relatedLinks: [
        { title: "Verify Your Account", url: "/account-verification-tool" },
        { title: "Learn About Common Issues", url: "/interactive-learning-hub" }
      ],
      views: 756,
      lastUpdated: "Dec 8, 2024"
    },
    {
      id: 4,
      question: "How to update mobile number in Aadhaar card?",
      answer: `To update your mobile number in Aadhaar:\n\n1. Visit nearest Aadhaar Enrollment Center\n2. Fill Aadhaar Update form\n3. Provide biometric verification\n4. Submit required documents\n5. Pay update fee (if applicable)\n6. Get acknowledgment receipt\n7. Track status online\n\nAlternatively, you can use online update service if your mobile number is already registered.`,
      category: "aadhaar-linking",
      categoryName: "Aadhaar Linking",
      tags: ["Mobile Update", "Aadhaar Update", "Contact Information"],
      steps: [
        "Locate nearest Aadhaar center",
        "Carry original Aadhaar and mobile proof",
        "Fill update request form",
        "Complete biometric verification",
        "Pay fees and collect receipt",
        "Track update status online"
      ],
      views: 432,
      lastUpdated: "Dec 5, 2024"
    },
    {
      id: 5,
      question: "What documents are required for Aadhaar-bank linking?",
      answer: `Required documents for Aadhaar-bank account linking:\n\n1. Original Aadhaar card or e-Aadhaar printout\n2. Bank passbook or account statement\n3. PAN card (if available)\n4. Mobile number linked to Aadhaar\n5. Account holder signature\n\nSome banks may require additional KYC documents. Contact your bank for specific requirements.`,
      category: "aadhaar-linking",
      categoryName: "Aadhaar Linking",
      tags: ["Documents", "Requirements", "Bank Linking"],
      views: 623,
      lastUpdated: "Dec 7, 2024"
    },
    {
      id: 6,
      question: "How long does it take for scholarship to be credited?",
      answer: `Scholarship credit timeline varies:\n\n1. After successful application: 15-30 days\n2. After verification completion: 7-15 days\n3. After DBT enabling: 2-7 days\n4. Processing during peak season: 30-45 days\n\nFactors affecting timeline:\n• Document verification status\n• Bank account DBT status\n• Government processing cycles\n• Technical issues or holidays`,
      category: "scholarship-applications",
      categoryName: "Scholarship Applications",
      tags: ["Timeline", "Processing Time", "Credit Duration"],
      views: 891,
      lastUpdated: "Dec 11, 2024"
    },
    {
      id: 7,
      question: "My Aadhaar verification is failing. What should I do?",
      answer: `If Aadhaar verification fails:\n\n1. Check if Aadhaar number is entered correctly\n2. Ensure mobile number matches Aadhaar records\n3. Verify biometric data is not damaged\n4. Check if Aadhaar is active (not suspended)\n5. Clear browser cache and try again\n6. Use different device or network\n7. Contact Aadhaar helpline: 1947\n\nCommon issues:\n• Biometric mismatch\n• Network connectivity\n• Server maintenance\n• Suspended Aadhaar status`,
      category: "technical-support",
      categoryName: "Technical Support",
      tags: ["Verification Failed", "Technical Issues", "Troubleshooting"],
      steps: [
        "Double-check Aadhaar number entry",
        "Verify mobile number in Aadhaar",
        "Try different browser or device",
        "Check internet connection",
        "Contact technical support if issue persists"
      ],
      views: 567,
      lastUpdated: "Dec 9, 2024"
    },
    {
      id: 8,
      question: "Can I link multiple bank accounts to one Aadhaar?",
      answer: `Yes, you can link multiple bank accounts to one Aadhaar number:\n\n1. There's no limit on number of accounts\n2. Each account needs separate linking process\n3. All accounts will be DBT enabled\n4. You can choose primary account for benefits\n5. Maintain all accounts actively\n\nBenefits:\n• Flexibility in receiving payments\n• Backup options if one account has issues\n• Different accounts for different purposes`,
      category: "aadhaar-linking",
      categoryName: "Aadhaar Linking",
      tags: ["Multiple Accounts", "Account Linking", "DBT Benefits"],
      views: 445,
      lastUpdated: "Dec 6, 2024"
    }
  ];

  // Categories data
  const categories = [
    {
      id: 'aadhaar-linking',
      name: 'Aadhaar Linking',
      description: 'Link Aadhaar with bank accounts',
      icon: 'Link',
      count: faqData?.filter(faq => faq?.category === 'aadhaar-linking')?.length,
      isPopular: true
    },
    {
      id: 'dbt-process',
      name: 'DBT Process',
      description: 'Direct Benefit Transfer setup',
      icon: 'ArrowRightLeft',
      count: faqData?.filter(faq => faq?.category === 'dbt-process')?.length,
      isPopular: true
    },
    {
      id: 'scholarship-applications',
      name: 'Scholarship Applications',
      description: 'Application and payment issues',
      icon: 'GraduationCap',
      count: faqData?.filter(faq => faq?.category === 'scholarship-applications')?.length,
      isPopular: false
    },
    {
      id: 'technical-support',
      name: 'Technical Support',
      description: 'Technical issues and solutions',
      icon: 'Settings',
      count: faqData?.filter(faq => faq?.category === 'technical-support')?.length,
      isPopular: false
    }
  ];

  // Load language preference and bookmarks
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);

    const savedBookmarks = JSON.parse(localStorage.getItem('faq-bookmarks') || '[]');
    setBookmarkedItems(savedBookmarks);

    // Listen for language changes
    const handleLanguageChange = (event) => {
      setCurrentLanguage(event?.detail?.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Filter FAQs based on search and category
  useEffect(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(faq => faq?.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(faq =>
        faq?.question?.toLowerCase()?.includes(query) ||
        faq?.answer?.toLowerCase()?.includes(query) ||
        faq?.tags?.some(tag => tag?.toLowerCase()?.includes(query))
      );
    }

    setFilteredFaqs(filtered);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleBookmark = (faqId) => {
    const faq = faqData?.find(f => f?.id === faqId);
    if (!faq) return;

    let newBookmarks;
    if (bookmarkedItems?.includes(faqId)) {
      newBookmarks = bookmarkedItems?.filter(id => id !== faqId);
    } else {
      newBookmarks = [...bookmarkedItems, faqId];
    }

    setBookmarkedItems(newBookmarks);
    localStorage.setItem('faq-bookmarks', JSON.stringify(newBookmarks));
  };

  const handleShare = (faq) => {
    const shareData = {
      title: faq?.question,
      text: faq?.answer?.substring(0, 100) + '...',
      url: `${window.location?.origin}/faq-knowledge-base#faq-${faq?.id}`
    };

    if (navigator.share) {
      navigator.share(shareData);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(`${shareData?.title}\n\n${shareData?.url}`);
      // You could show a toast notification here
    }
  };

  const getBookmarkedFaqs = () => {
    return faqData?.filter(faq => bookmarkedItems?.includes(faq?.id))?.map(faq => ({
        ...faq,
        bookmarkedAt: 'Recently' // In real app, you'd store actual timestamp
      }));
  };

  const handleViewBookmark = (faq) => {
    // Scroll to FAQ and expand it
    const element = document.getElementById(`faq-${faq?.id}`);
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRemoveBookmark = (faqId) => {
    handleBookmark(faqId); // This will remove it since it's already bookmarked
  };

  return (
    <>
      <Helmet>
        <title>FAQ Knowledge Base - AadhaarAware</title>
        <meta name="description" content="Find answers to common questions about Aadhaar linking, DBT process, and scholarship applications. Searchable FAQ database with step-by-step guides." />
        <meta name="keywords" content="Aadhaar FAQ, DBT questions, scholarship help, bank linking, government benefits" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-success/10 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Icon name="HelpCircle" size={24} color="white" />
                </div>
                <h1 className="text-3xl font-bold text-foreground">FAQ Knowledge Base</h1>
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions about Aadhaar linking, DBT process, and scholarship applications
              </p>
            </div>

            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              onCategoryFilter={handleCategoryFilter}
              categories={categories}
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <CategorySidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategoryFilter}
                />
                <BookmarkManager
                  bookmarkedFaqs={getBookmarkedFaqs()}
                  onRemoveBookmark={handleRemoveBookmark}
                  onViewBookmark={handleViewBookmark}
                />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Mobile Category Chips */}
              <div className="lg:hidden mb-6">
                <MobileCategoryChips
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={handleCategoryFilter}
                />
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {searchQuery ? `Search Results for "${searchQuery}"` : 
                     selectedCategory === 'all' ? 'All FAQs' : 
                     categories?.find(cat => cat?.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredFaqs?.length} question{filteredFaqs?.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                  <Link to="/ai-chat-assistant">
                    <Button variant="outline" size="sm" iconName="MessageCircle" iconPosition="left">
                      Ask AI
                    </Button>
                  </Link>
                  <Link to="/interactive-learning-hub">
                    <Button variant="outline" size="sm" iconName="BookOpen" iconPosition="left">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* FAQ Accordion */}
              <FAQAccordion
                faqs={filteredFaqs}
                searchQuery={searchQuery}
                onBookmark={handleBookmark}
                onShare={handleShare}
                bookmarkedItems={bookmarkedItems}
              />

              {/* Mobile Bookmarks */}
              <div className="lg:hidden mt-8">
                <BookmarkManager
                  bookmarkedFaqs={getBookmarkedFaqs()}
                  onRemoveBookmark={handleRemoveBookmark}
                  onViewBookmark={handleViewBookmark}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="bg-muted/30 border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Still Need Help?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our AI assistant and support team are here to help you with personalized guidance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/ai-chat-assistant">
                  <Button size="lg" iconName="MessageCircle" iconPosition="left">
                    Chat with AI Assistant
                  </Button>
                </Link>
                <Link to="/account-verification-tool">
                  <Button variant="outline" size="lg" iconName="Shield" iconPosition="left">
                    Verify Your Account
                  </Button>
                </Link>
                <Link to="/interactive-learning-hub">
                  <Button variant="outline" size="lg" iconName="BookOpen" iconPosition="left">
                    Learning Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQKnowledgeBase;