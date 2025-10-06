import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserEngagementTable = ({ data, className = "" }) => {
  const [sortField, setSortField] = useState('lastActivity');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedData = sortedData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending' },
      verified: { color: 'bg-primary/10 text-primary', label: 'Verified' }
    };

    const config = statusConfig?.[status] || statusConfig?.inactive;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <Icon name="ArrowUpDown" size={14} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortDirection === 'asc' ? 'ArrowUp' : 'ArrowDown'} 
        size={14} 
        className="text-primary" 
      />
    );
  };

  return (
    <div className={`bg-card border rounded-lg shadow-soft ${className}`}>
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">User Engagement Details</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Filter" size={16} />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} />
              Export
            </Button>
          </div>
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:text-primary nav-transition"
                >
                  <span>User</span>
                  <SortIcon field="name" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('region')}
                  className="flex items-center space-x-2 hover:text-primary nav-transition"
                >
                  <span>Region</span>
                  <SortIcon field="region" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('completionRate')}
                  className="flex items-center space-x-2 hover:text-primary nav-transition"
                >
                  <span>Completion</span>
                  <SortIcon field="completionRate" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('verificationStatus')}
                  className="flex items-center space-x-2 hover:text-primary nav-transition"
                >
                  <span>Status</span>
                  <SortIcon field="verificationStatus" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('lastActivity')}
                  className="flex items-center space-x-2 hover:text-primary nav-transition"
                >
                  <span>Last Activity</span>
                  <SortIcon field="lastActivity" />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((user, index) => (
              <tr key={user?.id} className="border-t hover:bg-muted/20 nav-transition">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{user?.name}</div>
                      <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-foreground">{user?.region}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full nav-transition"
                        style={{ width: `${user?.completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {user?.completionRate}%
                    </span>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(user?.verificationStatus)}
                </td>
                <td className="p-4 text-foreground">
                  {formatDate(user?.lastActivity)}
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MessageCircle" size={14} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden p-4 space-y-4">
        {paginatedData?.map((user) => (
          <div key={user?.id} className="bg-muted/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {user?.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{user?.name}</div>
                  <div className="text-sm text-muted-foreground">{user?.region}</div>
                </div>
              </div>
              {getStatusBadge(user?.verificationStatus)}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completion</span>
                <span className="text-sm font-medium text-foreground">{user?.completionRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full nav-transition"
                  style={{ width: `${user?.completionRate}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Activity</span>
                <span className="text-sm text-foreground">{formatDate(user?.lastActivity)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-3 pt-3 border-t">
              <Button variant="ghost" size="sm" fullWidth>
                <Icon name="Eye" size={14} />
                View Details
              </Button>
              <Button variant="ghost" size="sm" fullWidth>
                <Icon name="MessageCircle" size={14} />
                Contact
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, data?.length)} of {data?.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <Icon name="ChevronLeft" size={16} />
            Previous
          </Button>
          <span className="text-sm text-foreground">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserEngagementTable;