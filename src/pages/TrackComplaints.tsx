import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, MapPin, Calendar, Filter } from "lucide-react";

const TrackComplaints = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock complaints data
  const complaints = [
    {
      id: "CMP-2024-001",
      title: "Street Light Not Working",
      location: "MG Road, Mumbai",
      status: "assigned",
      priority: 2,
      createdAt: "2024-01-15",
      assignedTo: "Rajesh Kumar"
    },
    {
      id: "CMP-2024-002",
      title: "Pothole on Main Street",
      location: "Main Street, Mumbai",
      status: "in_progress",
      priority: 3,
      createdAt: "2024-01-10",
      assignedTo: "Priya Sharma"
    },
    {
      id: "CMP-2024-003",
      title: "Garbage Overflow",
      location: "Park Avenue, Mumbai",
      status: "resolved",
      priority: 1,
      createdAt: "2024-01-05",
      assignedTo: "Amit Singh"
    },
    {
      id: "CMP-2024-004",
      title: "Broken Water Pipe",
      location: "Colony Road, Mumbai",
      status: "registered",
      priority: 3,
      createdAt: "2024-01-20",
      assignedTo: ""
    },
    {
      id: "CMP-2024-005",
      title: "Traffic Signal Issue",
      location: "Junction Square, Mumbai",
      status: "assigned",
      priority: 3,
      createdAt: "2024-01-18",
      assignedTo: "Neha Patel"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-blue-500';
      case 'assigned': return 'bg-orange-500';
      case 'in_progress': return 'bg-purple-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registered': return 'Registered';
      case 'assigned': return 'Assigned';
      case 'in_progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return 'Low';
      case 2: return 'Medium';
      case 3: return 'High';
      default: return 'Medium';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'text-green-600 bg-green-50 border-green-200';
      case 2: return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 3: return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card border-b border-primary/10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/dashboard')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-bold text-primary">Track My Complaints</h1>
              <p className="text-sm text-muted-foreground">View and monitor all your submitted reports</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters and Search */}
        <Card className="border-primary/10 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by complaint ID, title, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="registered">Registered</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="priority">High Priority</SelectItem>
                    <SelectItem value="status">Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {complaints.filter(c => c.status === 'registered').length}
              </div>
              <div className="text-sm text-blue-700">Registered</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {complaints.filter(c => c.status === 'assigned').length}
              </div>
              <div className="text-sm text-orange-700">Assigned</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {complaints.filter(c => c.status === 'in_progress').length}
              </div>
              <div className="text-sm text-purple-700">In Progress</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {complaints.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-sm text-green-700">Resolved</div>
            </CardContent>
          </Card>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {filteredComplaints.length === 0 ? (
            <Card className="border-primary/10">
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground">
                  <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-semibold mb-2">No complaints found</h3>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            filteredComplaints.map((complaint) => (
              <Card 
                key={complaint.id} 
                className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-md cursor-pointer"
                onClick={() => navigate(`/complaint/${complaint.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {complaint.title}
                        </h3>
                        <Badge 
                          className={`${getStatusColor(complaint.status)} text-white`}
                        >
                          {getStatusText(complaint.status)}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={getPriorityColor(complaint.priority)}
                        >
                          {getPriorityText(complaint.priority)} Priority
                        </Badge>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{complaint.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(complaint.createdAt).toLocaleDateString('en-IN')}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">ID:</span> {complaint.id}
                        {complaint.assignedTo && (
                          <>
                            <span className="mx-2">•</span>
                            <span className="font-medium">Assigned to:</span> {complaint.assignedTo}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Click to view detailed timeline and updates
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          <Button 
            onClick={() => navigate('/register-complaint')}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            size="lg"
          >
            Register New Complaint
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TrackComplaints;