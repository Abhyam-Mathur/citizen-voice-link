import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, Search, Filter, MapPin, Calendar, User, Settings, 
  BarChart3, TrendingUp, Clock, CheckCircle, AlertTriangle,
  FileText, Users, Building, Phone, LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [assignmentData, setAssignmentData] = useState({
    officerId: '',
    officerName: '',
    officerPhone: '',
    department: '',
    notes: ''
  });

  // Mock complaints data for admin view
  const complaints = [
    {
      id: "CMP-2024-001",
      title: "Street Light Not Working",
      description: "The street light on MG Road near the bus stop has not been working for the past week.",
      location: "MG Road, Mumbai",
      issueType: "street_light",
      status: "registered",
      priority: 2,
      createdAt: "2024-01-15T10:30:00Z",
      citizenId: "Rakshak12345",
      mediaUrls: ["photo1.jpg"],
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    {
      id: "CMP-2024-002",
      title: "Pothole on Main Street",
      description: "Large pothole causing traffic issues and potential vehicle damage.",
      location: "Main Street, Mumbai",
      issueType: "pothole",
      status: "assigned",
      priority: 3,
      createdAt: "2024-01-10T14:20:00Z",
      citizenId: "Rakshak67890",
      assignedTo: {
        id: "PWD001",
        name: "Rajesh Kumar",
        phone: "+91 98765 43210",
        department: "Public Works Department"
      },
      assignedAt: "2024-01-11T09:15:00Z"
    },
    {
      id: "CMP-2024-003",
      title: "Garbage Overflow",
      description: "Garbage bin overflowing for several days, creating hygiene issues.",
      location: "Park Avenue, Mumbai",
      issueType: "garbage",
      status: "in_progress",
      priority: 2,
      createdAt: "2024-01-05T16:45:00Z",
      citizenId: "Rakshak24680",
      assignedTo: {
        id: "WM001",
        name: "Priya Sharma",
        phone: "+91 87654 32109",
        department: "Waste Management"
      }
    }
  ];

  const stats = {
    totalComplaints: complaints.length,
    newComplaints: complaints.filter(c => c.status === 'registered').length,
    assignedComplaints: complaints.filter(c => c.status === 'assigned').length,
    inProgressComplaints: complaints.filter(c => c.status === 'in_progress').length,
    resolvedComplaints: complaints.filter(c => c.status === 'resolved').length,
    highPriorityComplaints: complaints.filter(c => c.priority === 3).length
  };

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
      case 'registered': return 'New';
      case 'assigned': return 'Assigned';
      case 'in_progress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
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

  const handleAssignComplaint = async () => {
    if (!assignmentData.officerName || !assignmentData.officerPhone || !assignmentData.department) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Complaint Assigned",
      description: `Successfully assigned to ${assignmentData.officerName}. Citizen will be notified.`
    });

    // Reset form and close dialog
    setAssignmentData({
      officerId: '',
      officerName: '',
      officerPhone: '',
      department: '',
      notes: ''
    });
    setSelectedComplaint(null);
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || complaint.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card border-b border-primary/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Nagar Rakshak - Municipal Authority Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate('/auth')}
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="border-primary/10">
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{stats.totalComplaints}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200 bg-blue-50/50">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{stats.newComplaints}</div>
              <div className="text-sm text-blue-700">New</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-4 text-center">
              <User className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{stats.assignedComplaints}</div>
              <div className="text-sm text-orange-700">Assigned</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200 bg-purple-50/50">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">{stats.inProgressComplaints}</div>
              <div className="text-sm text-purple-700">In Progress</div>
            </CardContent>
          </Card>
          <Card className="border-green-200 bg-green-50/50">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{stats.resolvedComplaints}</div>
              <div className="text-sm text-green-700">Resolved</div>
            </CardContent>
          </Card>
          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">{stats.highPriorityComplaints}</div>
              <div className="text-sm text-red-700">High Priority</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-primary/10 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter & Search Complaints</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="registered">New</SelectItem>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Location</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="pune">Pune</SelectItem>
                    <SelectItem value="nagpur">Nagpur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Table */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle>Active Complaints</CardTitle>
            <CardDescription>Manage and assign complaints to field officers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="p-4 border border-border rounded-lg hover:bg-accent/5 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {complaint.title}
                        </h3>
                        <Badge className={`${getStatusColor(complaint.status)} text-white`}>
                          {getStatusText(complaint.status)}
                        </Badge>
                        <Badge 
                          variant="outline"
                          className={getPriorityColor(complaint.priority)}
                        >
                          Priority {complaint.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {complaint.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{complaint.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(complaint.createdAt).toLocaleDateString('en-IN')}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{complaint.citizenId}</span>
                        </div>
                      </div>
                      
                      {complaint.assignedTo && (
                        <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-sm">
                          <strong>Assigned to:</strong> {complaint.assignedTo.name} ({complaint.assignedTo.department})
                          <div className="flex items-center space-x-2 mt-1">
                            <Phone className="w-3 h-3" />
                            <span>{complaint.assignedTo.phone}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      {complaint.status === 'registered' && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" onClick={() => setSelectedComplaint(complaint)}>
                              Assign
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Assign Complaint</DialogTitle>
                              <DialogDescription>
                                Assign this complaint to a field officer
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label>Officer Name *</Label>
                                <Input
                                  value={assignmentData.officerName}
                                  onChange={(e) => setAssignmentData({...assignmentData, officerName: e.target.value})}
                                  placeholder="Enter officer name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Phone Number *</Label>
                                <Input
                                  value={assignmentData.officerPhone}
                                  onChange={(e) => setAssignmentData({...assignmentData, officerPhone: e.target.value})}
                                  placeholder="+91 XXXXX XXXXX"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Department *</Label>
                                <Select 
                                  value={assignmentData.department} 
                                  onValueChange={(value) => setAssignmentData({...assignmentData, department: value})}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select department" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pwd">Public Works Department</SelectItem>
                                    <SelectItem value="water">Water Supply Department</SelectItem>
                                    <SelectItem value="waste">Waste Management</SelectItem>
                                    <SelectItem value="electrical">Electrical Department</SelectItem>
                                    <SelectItem value="traffic">Traffic Police</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea
                                  value={assignmentData.notes}
                                  onChange={(e) => setAssignmentData({...assignmentData, notes: e.target.value})}
                                  placeholder="Additional instructions..."
                                />
                              </div>
                              <Button onClick={handleAssignComplaint} className="w-full">
                                Assign Complaint
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;