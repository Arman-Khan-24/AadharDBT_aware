import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModuleSidebar = ({ 
  modules, 
  currentModule, 
  onModuleSelect, 
  userProgress,
  isCollapsed,
  onToggleCollapse 
}) => {
  const [expandedSections, setExpandedSections] = useState(['basics']);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev?.includes(sectionId) 
        ? prev?.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getProgressPercentage = () => {
    const completedModules = modules?.filter(module => 
      userProgress?.completedModules?.includes(module.id)
    )?.length;
    return Math.round((completedModules / modules?.length) * 100);
  };

  const getModuleStatus = (moduleId) => {
    if (userProgress?.completedModules?.includes(moduleId)) return 'completed';
    if (currentModule === moduleId) return 'current';
    return 'upcoming';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'current': return 'Play';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'current': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  if (isCollapsed) {
    return (
      <div className="fixed top-20 left-4 z-40 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleCollapse}
          className="bg-card shadow-soft"
        >
          <Icon name="Menu" size={16} />
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        onClick={onToggleCollapse}
      />
      {/* Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card border-r z-40 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              Learning Modules
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleCollapse}
              className="lg:hidden"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          {/* Overall Progress */}
          <div className="mb-6 p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Overall Progress
              </span>
              <span className="text-lg font-bold text-primary">
                {getProgressPercentage()}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {userProgress?.completedModules?.length} of {modules?.length} modules completed
            </p>
          </div>

          {/* Module Sections */}
          <div className="space-y-2">
            {['basics', 'verification', 'advanced']?.map((sectionId) => {
              const sectionModules = modules?.filter(module => module.section === sectionId);
              const sectionTitle = {
                basics: 'Basics',
                verification: 'Verification Process',
                advanced: 'Advanced Topics'
              }?.[sectionId];

              return (
                <div key={sectionId} className="border rounded-lg">
                  <button
                    onClick={() => toggleSection(sectionId)}
                    className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-foreground">
                      {sectionTitle}
                    </span>
                    <Icon 
                      name="ChevronDown" 
                      size={16}
                      className={`transition-transform ${
                        expandedSections?.includes(sectionId) ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedSections?.includes(sectionId) && (
                    <div className="border-t">
                      {sectionModules?.map((module) => {
                        const status = getModuleStatus(module.id);
                        return (
                          <button
                            key={module.id}
                            onClick={() => onModuleSelect(module.id)}
                            className={`w-full flex items-start space-x-3 p-3 text-left hover:bg-muted/50 transition-colors ${
                              currentModule === module.id ? 'bg-primary/10 border-r-2 border-primary' : ''
                            }`}
                          >
                            <div className={`flex-shrink-0 mt-1 ${getStatusColor(status)}`}>
                              <Icon name={getStatusIcon(status)} size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className={`font-medium text-sm ${
                                currentModule === module.id ? 'text-primary' : 'text-foreground'
                              }`}>
                                {module.title}
                              </h4>
                              <p className="text-xs text-muted-foreground mt-1">
                                {module.duration} • {module.type}
                              </p>
                              {module.isBookmarked && (
                                <div className="flex items-center mt-1">
                                  <Icon name="Bookmark" size={12} className="text-accent mr-1" />
                                  <span className="text-xs text-accent">Bookmarked</span>
                                </div>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t">
            <h3 className="text-sm font-medium text-foreground mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                iconName="Download"
                iconPosition="left"
              >
                Download All PDFs
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start"
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModuleSidebar;