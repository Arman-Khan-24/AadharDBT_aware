import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KnowledgeQuiz = ({ 
  questions, 
  onComplete, 
  onProgress,
  className = "" 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft, showResults]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
    setTimeLeft(300);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setShowExplanation(false);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setShowExplanation(false);
    }
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    questions?.forEach((question, index) => {
      if (selectedAnswers?.[index] === question?.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions?.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (onComplete) {
      onComplete({
        score: finalScore,
        correctAnswers,
        totalQuestions: questions?.length,
        timeSpent: 300 - timeLeft
      });
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds?.toString()?.padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  const getScoreMessage = (score) => {
    if (score >= 80) return 'Excellent! You have a strong understanding.';
    if (score >= 60) return 'Good job! Review the areas you missed.';
    return 'Keep learning! Review the material and try again.';
  };

  if (!quizStarted) {
    return (
      <div className={`bg-card border rounded-lg p-8 text-center ${className}`}>
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Brain" size={32} className="text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Knowledge Check Quiz
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Test your understanding of Aadhaar banking concepts with this quick quiz. 
          You have 5 minutes to complete {questions?.length} questions.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-background border rounded-lg p-4">
            <Icon name="Clock" size={20} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Duration</div>
            <div className="text-lg font-bold text-primary">5 minutes</div>
          </div>
          
          <div className="bg-background border rounded-lg p-4">
            <Icon name="HelpCircle" size={20} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Questions</div>
            <div className="text-lg font-bold text-primary">{questions?.length}</div>
          </div>
          
          <div className="bg-background border rounded-lg p-4">
            <Icon name="Target" size={20} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Pass Score</div>
            <div className="text-lg font-bold text-primary">60%</div>
          </div>
        </div>
        <Button
          variant="primary"
          size="lg"
          onClick={startQuiz}
          iconName="Play"
          iconPosition="left"
        >
          Start Quiz
        </Button>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className={`bg-card border rounded-lg p-8 ${className}`}>
        <div className="text-center mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
            score >= 80 ? 'bg-success/10' : score >= 60 ? 'bg-warning/10' : 'bg-error/10'
          }`}>
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}%
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Quiz Complete!
          </h3>
          
          <p className={`text-lg font-medium mb-4 ${getScoreColor(score)}`}>
            {getScoreMessage(score)}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-background border rounded-lg p-4 text-center">
            <Icon name="CheckCircle" size={20} className="text-success mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Correct</div>
            <div className="text-lg font-bold text-success">
              {Object.keys(selectedAnswers)?.filter(key => 
                selectedAnswers?.[key] === questions?.[key]?.correctAnswer
              )?.length}
            </div>
          </div>
          
          <div className="bg-background border rounded-lg p-4 text-center">
            <Icon name="XCircle" size={20} className="text-error mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Incorrect</div>
            <div className="text-lg font-bold text-error">
              {Object.keys(selectedAnswers)?.filter(key => 
                selectedAnswers?.[key] !== questions?.[key]?.correctAnswer
              )?.length}
            </div>
          </div>
          
          <div className="bg-background border rounded-lg p-4 text-center">
            <Icon name="Clock" size={20} className="text-primary mx-auto mb-2" />
            <div className="text-sm font-medium text-foreground">Time Used</div>
            <div className="text-lg font-bold text-primary">
              {formatTime(300 - timeLeft)}
            </div>
          </div>
        </div>
        {/* Review Answers */}
        <div className="space-y-4 mb-8">
          <h4 className="text-lg font-semibold text-foreground">Review Your Answers</h4>
          {questions?.map((question, index) => {
            const userAnswer = selectedAnswers?.[index];
            const isCorrect = userAnswer === question?.correctAnswer;
            
            return (
              <div key={index} className={`border rounded-lg p-4 ${
                isCorrect ? 'border-success/30 bg-success/5' : 'border-error/30 bg-error/5'
              }`}>
                <div className="flex items-start space-x-3 mb-3">
                  <Icon 
                    name={isCorrect ? "CheckCircle" : "XCircle"} 
                    size={20} 
                    className={isCorrect ? "text-success" : "text-error"} 
                  />
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground mb-2">
                      {index + 1}. {question?.question}
                    </h5>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Your answer:</span>{' '}
                        <span className={isCorrect ? "text-success" : "text-error"}>
                          {question?.options?.[userAnswer] || 'Not answered'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm">
                          <span className="font-medium">Correct answer:</span>{' '}
                          <span className="text-success">
                            {question?.options?.[question?.correctAnswer]}
                          </span>
                        </p>
                      )}
                    </div>
                    {question?.explanation && (
                      <div className="mt-2 p-2 bg-background rounded border">
                        <p className="text-sm text-muted-foreground">
                          <Icon name="Info" size={14} className="inline mr-1" />
                          {question?.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={startQuiz}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Retake Quiz
          </Button>
          
          <Button
            variant="primary"
            onClick={() => onComplete && onComplete({ score, passed: score >= 60 })}
            iconName="ArrowRight"
            iconPosition="right"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    );
  }

  const question = questions?.[currentQuestion];
  const progress = ((currentQuestion + 1) / questions?.length) * 100;

  return (
    <div className={`bg-card border rounded-lg ${className}`}>
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Question {currentQuestion + 1} of {questions?.length}
          </h3>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className={`text-sm font-medium ${
                timeLeft < 60 ? 'text-error' : 'text-foreground'
              }`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      {/* Question Content */}
      <div className="p-6">
        <h4 className="text-xl font-medium text-foreground mb-6">
          {question?.question}
        </h4>

        <div className="space-y-3 mb-6">
          {question?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestion, index)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                selectedAnswers?.[currentQuestion] === index
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers?.[currentQuestion] === index
                    ? 'border-primary bg-primary' :'border-muted-foreground'
                }`}>
                  {selectedAnswers?.[currentQuestion] === index && (
                    <Icon name="Check" size={14} color="white" />
                  )}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Show Explanation Button */}
        {selectedAnswers?.[currentQuestion] !== undefined && question?.explanation && (
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExplanation(!showExplanation)}
              iconName={showExplanation ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
            >
              {showExplanation ? 'Hide' : 'Show'} Explanation
            </Button>
            
            {showExplanation && (
              <div className="mt-3 p-4 bg-background border rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-1" />
                  <p className="text-sm text-muted-foreground">
                    {question?.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Navigation */}
      <div className="p-6 border-t">
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          <div className="flex space-x-3">
            {currentQuestion === questions?.length - 1 ? (
              <Button
                variant="success"
                onClick={handleSubmitQuiz}
                disabled={selectedAnswers?.[currentQuestion] === undefined}
                iconName="CheckCircle"
                iconPosition="left"
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleNext}
                disabled={selectedAnswers?.[currentQuestion] === undefined}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeQuiz;