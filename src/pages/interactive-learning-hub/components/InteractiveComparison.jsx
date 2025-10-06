import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveComparison = ({ 
  comparisonData, 
  onComplete,
  className = "" 
}) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'features', label: 'Key Features', icon: 'List' },
    { id: 'process', label: 'Process Flow', icon: 'GitBranch' },
    { id: 'benefits', label: 'Benefits', icon: 'CheckCircle' },
  ];

  const markSectionComplete = (sectionId) => {
    if (!completedSections?.includes(sectionId)) {
      const newCompleted = [...completedSections, sectionId];
      setCompletedSections(newCompleted);
      
      if (newCompleted?.length === tabs?.length && onComplete) {
        onComplete();
      }
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-foreground mb-3">
          Aadhaar Linked vs DBT Enabled Accounts
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Understanding the difference is crucial for scholarship disbursement. 
          Click on each account type to explore their characteristics.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Aadhaar Linked Account */}
        <div 
          className="bg-card border rounded-xl p-6 hover:shadow-elevated transition-all duration-300 cursor-pointer group"
          onClick={() => markSectionComplete('aadhaar-linked')}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
              <Icon name="Link" size={24} className="text-primary" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                Aadhaar Linked Account
              </h4>
              <p className="text-sm text-muted-foreground">
                Basic connection established
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-1" />
              <span className="text-sm text-foreground">
                Aadhaar number connected to bank account
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-1" />
              <span className="text-sm text-foreground">
                Basic identity verification completed
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning mt-1" />
              <span className="text-sm text-foreground">
                May not receive direct benefit transfers
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-warning/10 rounded-lg border border-warning/20">
            <p className="text-sm text-warning font-medium">
              ⚠️ Not sufficient for scholarship disbursement
            </p>
          </div>
        </div>

        {/* DBT Enabled Account */}
        <div 
          className="bg-card border rounded-xl p-6 hover:shadow-elevated transition-all duration-300 cursor-pointer group border-success/30"
          onClick={() => markSectionComplete('dbt-enabled')}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mr-4">
              <Icon name="Shield" size={24} className="text-success" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-foreground">
                DBT Enabled Account
              </h4>
              <p className="text-sm text-muted-foreground">
                Ready for direct transfers
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-1" />
              <span className="text-sm text-foreground">
                Aadhaar seeded and verified
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-1" />
              <span className="text-sm text-foreground">
                Bank account mapped in PFMS system
              </span>
            </div>
            <div className="flex items-start space-x-3">
              <Icon name="Check" size={16} className="text-success mt-1" />
              <span className="text-sm text-foreground">
                Eligible for direct benefit transfers
              </span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-success/10 rounded-lg border border-success/20">
            <p className="text-sm text-success font-medium">
              ✅ Perfect for scholarship disbursement
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          variant="outline"
          onClick={() => markSectionComplete('overview')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Features Comparison
        </Button>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Feature Comparison
        </h3>
        <p className="text-muted-foreground">
          Compare key features side by side
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-4 font-semibold text-foreground">
                Feature
              </th>
              <th className="text-center p-4 font-semibold text-foreground">
                Aadhaar Linked
              </th>
              <th className="text-center p-4 font-semibold text-foreground">
                DBT Enabled
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonData?.features?.map((feature, index) => (
              <tr 
                key={index}
                className={`border-b hover:bg-muted/50 transition-colors ${
                  hoveredFeature === index ? 'bg-primary/5' : ''
                }`}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Icon name={feature?.icon} size={16} className="text-primary" />
                    <div>
                      <span className="font-medium text-foreground">
                        {feature?.name}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {feature?.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-center">
                  {feature?.aadhaarLinked ? (
                    <Icon name="Check" size={20} className="text-success mx-auto" />
                  ) : (
                    <Icon name="X" size={20} className="text-error mx-auto" />
                  )}
                </td>
                <td className="p-4 text-center">
                  {feature?.dbtEnabled ? (
                    <Icon name="Check" size={20} className="text-success mx-auto" />
                  ) : (
                    <Icon name="X" size={20} className="text-error mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <Button
          variant="primary"
          onClick={() => markSectionComplete('features')}
          iconName="CheckCircle"
          iconPosition="left"
        >
          Mark as Understood
        </Button>
      </div>
    </div>
  );

  const renderProcess = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Process Flow Comparison
        </h3>
        <p className="text-muted-foreground">
          Step-by-step process for each account type
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Aadhaar Linking Process */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Link" size={20} className="text-primary mr-2" />
            Aadhaar Linking Process
          </h4>
          
          {comparisonData?.aadhaarLinkingSteps?.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{step?.title}</h5>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
                <span className="text-xs text-primary">{step?.duration}</span>
              </div>
            </div>
          ))}
        </div>

        {/* DBT Enabling Process */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Shield" size={20} className="text-success mr-2" />
            DBT Enabling Process
          </h4>
          
          {comparisonData?.dbtEnablingSteps?.map((step, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-success">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{step?.title}</h5>
                <p className="text-sm text-muted-foreground">{step?.description}</p>
                <span className="text-xs text-success">{step?.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button
          variant="primary"
          onClick={() => markSectionComplete('process')}
          iconName="CheckCircle"
          iconPosition="left"
        >
          Process Understood
        </Button>
      </div>
    </div>
  );

  const renderBenefits = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Benefits & Impact
        </h3>
        <p className="text-muted-foreground">
          Why DBT enabled accounts matter for students
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {comparisonData?.benefits?.map((benefit, index) => (
          <div 
            key={index}
            className="bg-card border rounded-lg p-6 text-center hover:shadow-elevated transition-all duration-300"
          >
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name={benefit?.icon} size={24} className="text-primary" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">
              {benefit?.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              {benefit?.description}
            </p>
            <div className="text-2xl font-bold text-success">
              {benefit?.impact}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-success/10 border border-success/20 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <Icon name="Lightbulb" size={24} className="text-success flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-lg font-semibold text-success mb-2">
              Key Takeaway
            </h4>
            <p className="text-foreground">
              Having a DBT enabled account ensures that your scholarship funds reach you directly 
              without delays or complications. It's not just about linking Aadhaar - it's about ensuring the account is properly seeded and mapped in the government's payment system.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          variant="success"
          onClick={() => markSectionComplete('benefits')}
          iconName="CheckCircle"
          iconPosition="left"
        >
          Complete Understanding
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview': return renderOverview();
      case 'features': return renderFeatures();
      case 'process': return renderProcess();
      case 'benefits': return renderBenefits();
      default: return renderOverview();
    }
  };

  return (
    <div className={`bg-background ${className}`}>
      {/* Tab Navigation */}
      <div className="border-b mb-6">
        <div className="flex space-x-1 overflow-x-auto">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setSelectedTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                selectedTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
              {completedSections?.includes(tab?.id) && (
                <Icon name="CheckCircle" size={14} className="text-success" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="min-h-96">
        {renderContent()}
      </div>
      {/* Progress Indicator */}
      <div className="mt-8 p-4 bg-card border rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Section Progress
          </span>
          <span className="text-sm text-muted-foreground">
            {completedSections?.length}/{tabs?.length} completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedSections?.length / tabs?.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default InteractiveComparison;