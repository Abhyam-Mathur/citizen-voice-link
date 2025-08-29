import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Plus, FileText, Phone, LogOut, Bell, MapPin } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName] = useState("Rakshak12345"); // This would come from auth context
  
  const recentComplaints = [
    { id: "1", title: "Street Light Not Working", status: "assigned", location: "MG Road", date: "2 days ago" },
    { id: "2", title: "Pothole on Main Street", status: "in_progress", location: "Main Street", date: "5 days ago" },
    { id: "3", title: "Garbage Overflow", status: "resolved", location: "Park Avenue", date: "1 week ago" }
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
                <h1 className="text-xl font-bold text-primary">Nagar Rakshak</h1>
                <p className="text-sm text-muted-foreground">Welcome, {userName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Your Civic Dashboard</h2>
          <p className="text-muted-foreground">Report issues, track progress, and help build a better city.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/10">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">Total Reports</div>
            </CardContent>
          </Card>
          <Card className="border-orange-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">2</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">4</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">1</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card 
            className="border-primary/20 hover:border-primary/40 cursor-pointer transition-all hover:shadow-lg group"
            onClick={() => navigate('/register-complaint')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl text-primary">Register New Complaint</CardTitle>
              <CardDescription>Report a civic issue in your area</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="border-accent/20 hover:border-accent/40 cursor-pointer transition-all hover:shadow-lg group"
            onClick={() => navigate('/track-complaints')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl text-accent-foreground">Track My Complaints</CardTitle>
              <CardDescription>View status of all your reports</CardDescription>
            </CardHeader>
          </Card>

          <Card 
            className="border-secondary/20 hover:border-secondary/40 cursor-pointer transition-all hover:shadow-lg group"
            onClick={() => navigate('/helpline')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-8 h-8 text-secondary-foreground" />
              </div>
              <CardTitle className="text-xl text-secondary-foreground">Helpline Numbers</CardTitle>
              <CardDescription>Emergency and municipal contacts</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Complaints */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Recent Complaints</span>
            </CardTitle>
            <CardDescription>Your latest civic reports and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div 
                  key={complaint.id} 
                  className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent/5 transition-colors cursor-pointer"
                  onClick={() => navigate(`/complaint/${complaint.id}`)}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{complaint.title}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3 mr-1" />
                        {complaint.location}
                      </div>
                      <span className="text-sm text-muted-foreground">{complaint.date}</span>
                    </div>
                  </div>
                  <Badge 
                    className={`${getStatusColor(complaint.status)} text-white hover:${getStatusColor(complaint.status)}/80`}
                  >
                    {getStatusText(complaint.status)}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/track-complaints')}
              >
                View All Complaints
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;