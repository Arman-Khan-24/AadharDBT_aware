import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onCategoryFilter, categories, searchQuery, selectedCategory }) => {
  const [isVoiceSupported, setIsVoiceSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const recognitionRef = useRef(null);

  const popularSearches = [
    "How to link Aadhaar with bank account",
    "DBT enabled vs Aadhaar linked difference",
    "Scholarship not received",
    "Update mobile number in Aadhaar",
    "Check DBT status online",
    "Aadhaar verification failed",
    "Bank account seeding process",
    "Scholarship eligibility criteria"
  ];

  useEffect(() => {
    // Check for speech recognition support
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsVoiceSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'hi-IN';

      recognitionRef.current.onresult = (event) => {
        const transcript = event?.results?.[0]?.[0]?.transcript;
        onSearch(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [onSearch]);

  useEffect(() => {
    if (searchQuery?.length > 2) {
      const filtered = popularSearches?.filter(search =>
        search?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleVoiceSearch = () => {
    if (recognitionRef?.current && !isListening) {
      setIsListening(true);
      recognitionRef?.current?.start();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleClearSearch = () => {
    onSearch('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search for Aadhaar, DBT, or scholarship questions..."
              value={searchQuery}
              onChange={(e) => onSearch(e?.target?.value)}
              className="pl-12 pr-20 h-12 text-base"
            />
            <Icon
              name="Search"
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            
            {/* Clear Button */}
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-16 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
              >
                <Icon name="X" size={16} />
              </Button>
            )}

            {/* Voice Search Button */}
            {isVoiceSupported && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleVoiceSearch}
                disabled={isListening}
                className={`absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 p-0 ${
                  isListening ? 'text-error animate-pulse' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                <Icon name={isListening ? "MicOff" : "Mic"} size={16} />
              </Button>
            )}
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-elevated z-20">
            <div className="py-2">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-2 text-left hover:bg-muted transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="Search" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{suggestion}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Category Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryFilter('all')}
          className="h-8"
        >
          All Categories
        </Button>
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryFilter(category?.id)}
            className="h-8"
          >
            {category?.name}
            <span className="ml-1 text-xs opacity-70">({category?.count})</span>
          </Button>
        ))}
      </div>
      {/* Popular Searches */}
      {!searchQuery && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches?.slice(0, 4)?.map((search, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(search)}
                className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Voice Search Indicator */}
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-error/10 border border-error/20 rounded-lg p-3 flex items-center space-x-3">
          <div className="w-3 h-3 bg-error rounded-full animate-pulse"></div>
          <span className="text-sm text-error font-medium">Listening... Speak your question</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;