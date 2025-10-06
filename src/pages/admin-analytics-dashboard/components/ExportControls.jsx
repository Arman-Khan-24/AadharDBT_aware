import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ExportControls = ({ onExport, className = "" }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('last30days');
  const [dataType, setDataType] = useState('all');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Report' },
    { value: 'csv', label: 'CSV Data' },
    { value: 'excel', label: 'Excel Spreadsheet' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const dataTypeOptions = [
    { value: 'all', label: 'All Data' },
    { value: 'users', label: 'User Engagement' },
    { value: 'modules', label: 'Module Completion' },
    { value: 'verification', label: 'Verification Status' },
    { value: 'regional', label: 'Regional Analytics' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        format: exportFormat,
        dateRange: dateRange,
        dataType: dataType,
        timestamp: new Date()?.toISOString()
      };
      
      if (onExport) {
        onExport(exportData);
      }
      
      // Mock file download
      const fileName = `aadhaar_aware_report_${Date.now()}.${exportFormat}`;
      console.log(`Exporting ${fileName}...`);
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`bg-card border rounded-lg p-6 shadow-soft ${className}`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="Download" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Export Reports</h3>
          <p className="text-sm text-muted-foreground">Generate and download analytics reports</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Export Format"
            options={formatOptions}
            value={exportFormat}
            onChange={setExportFormat}
          />
          
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={dateRange}
            onChange={setDateRange}
          />
          
          <Select
            label="Data Type"
            options={dataTypeOptions}
            value={dataType}
            onChange={setDataType}
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            Export will include data based on selected filters
          </div>
          <Button
            onClick={handleExport}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
          >
            {isExporting ? 'Generating...' : 'Export Report'}
          </Button>
        </div>
      </div>

      {/* Quick Export Options */}
      <div className="mt-6 pt-6 border-t">
        <h4 className="text-sm font-medium text-foreground mb-3">Quick Exports</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setExportFormat('pdf');
              setDateRange('today');
              setDataType('all');
              handleExport();
            }}
            className="flex flex-col items-center p-3 h-auto"
          >
            <Icon name="FileText" size={20} className="mb-1" />
            <span className="text-xs">Daily Report</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setExportFormat('csv');
              setDateRange('last30days');
              setDataType('users');
              handleExport();
            }}
            className="flex flex-col items-center p-3 h-auto"
          >
            <Icon name="Users" size={20} className="mb-1" />
            <span className="text-xs">User Data</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setExportFormat('excel');
              setDateRange('last3months');
              setDataType('modules');
              handleExport();
            }}
            className="flex flex-col items-center p-3 h-auto"
          >
            <Icon name="BookOpen" size={20} className="mb-1" />
            <span className="text-xs">Module Stats</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setExportFormat('pdf');
              setDateRange('last30days');
              setDataType('regional');
              handleExport();
            }}
            className="flex flex-col items-center p-3 h-auto"
          >
            <Icon name="MapPin" size={20} className="mb-1" />
            <span className="text-xs">Regional</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportControls;