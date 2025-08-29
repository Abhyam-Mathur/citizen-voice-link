import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle, Clock, UserCheck, FileText, Star, Phone, MessageSquare, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ComplaintTracking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);

  // Mock complaint data - in real app, this would come from API
  const complaint = {
    id: "CMP-2024-001",
    title: "Street Light Not Working",
    description: "The street light on MG Road near the bus stop has not been working for the past week. This is causing safety concerns for pedestrians during night hours.",
    location: "MG Road, Near Bus Stop, Mumbai, Maharashtra",
    status: "assigned",
    priority: 2,
    createdAt: "2024-01-15T10:30:00Z",
    assignedTo: {
      name: "Rajesh Kumar",
      department: "Public Works Department",
      phone: "+91 98765 43210"
    },
    assignedAt: "2024-01-16T14:20:00Z",
    mediaUrls: ["photo1.jpg", "photo2.jpg"],
    updates: [
      {
        status: "registered",
        timestamp: "2024-01-15T10:30:00Z",
        notes: "Complaint registered successfully"
      },
      {
        status: "assigned",
        timestamp: "2024-01-16T14:20:00Z",
        notes: "Assigned to Public Works Department for resolution"
      }
    ]
  };

  const statusSteps = [
    {
      status: 'registered',
      title: 'Registered',
      description: 'Complaint successfully logged in the system',
      icon: FileText,
      color: 'bg-blue-500',
      completed: true
    },
    {
      status: 'assigned',
      title: 'Assigned',
      description: 'Assigned to department/official',
      icon: UserCheck,
      color: 'bg-orange-500',
      completed: complaint.status === 'assigned' || complaint.status === 'in_progress' || complaint.status === 'resolved'
    },
    {
      status: 'in_progress',
      title: 'In Progress',
      description: 'Work has started on the issue',
      icon: Clock,
      color: 'bg-purple-500',
      completed: complaint.status === 'in_progress' || complaint.status === 'resolved'
    },
    {
      status: 'resolved',
      title: 'Resolved',
      description: 'Issue has been fixed',
      icon: CheckCircle,
      color: 'bg-green-500',
      completed: complaint.status === 'resolved'
    }
  ];

  const handleFeedbackSubmit = () => {
    if (!feedback.trim() || rating === 0) {
      toast({
        title: "Incomplete Feedback",
        description: "Please provide both rating and comment",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. It helps us improve our services."
    });
    setFeedback('');
    setRating(0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCurrentStep = () => {
    const stepIndex = statusSteps.findIndex(step => step.status === complaint.status);
    return stepIndex >= 0 ? stepIndex : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-card border-b border-primary/10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
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
              <h1 className="text-xl font-bold text-primary">Complaint Tracking</h1>
              <p className="text-sm text-muted-foreground">ID: {complaint.id}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Complaint Details */}
        <Card className="border-primary/10">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">{complaint.title}</CardTitle>
                <CardDescription className="mt-2 text-base">
                  {complaint.location}
                </CardDescription>
              </div>
              <Badge 
                className={`${statusSteps[getCurrentStep()].color} text-white`}
              >
                {statusSteps[getCurrentStep()].title}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-foreground mb-4">{complaint.description}</p>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Submitted: {formatDate(complaint.createdAt)}</span>
              <span>Priority: {complaint.priority === 1 ? 'Low' : complaint.priority === 2 ? 'Medium' : 'High'}</span>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle>Status Timeline</CardTitle>
            <CardDescription>Track the progress of your complaint resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border"></div>
              
              <div className="space-y-8">
                {statusSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = index === getCurrentStep();
                  const isCompleted = step.completed;
                  
                  return (
                    <div key={step.status} className="relative flex items-start space-x-4">
                      {/* Timeline Dot */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-background ${
                        isCompleted ? step.color : 'bg-muted'
                      } ${isActive ? 'ring-4 ring-primary/20' : ''}`}>
                        <IconComponent className={`w-5 h-5 ${isCompleted ? 'text-white' : 'text-muted-foreground'}`} />
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-8">
                        <div className="flex items-center justify-between">
                          <h3 className={`text-lg font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.title}
                          </h3>
                          {isCompleted && (
                            <span className="text-sm text-muted-foreground">
                              {formatDate(complaint.updates.find(u => u.status === step.status)?.timestamp || complaint.createdAt)}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                          {step.description}
                        </p>
                        
                        {/* Assignment Info */}
                        {step.status === 'assigned' && isCompleted && complaint.assignedTo && (
                          <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                            <h4 className="font-medium text-orange-900 mb-2">Assigned Authority</h4>
                            <div className="space-y-1 text-sm text-orange-800">
                              <p><strong>Name:</strong> {complaint.assignedTo.name}</p>
                              <p><strong>Department:</strong> {complaint.assignedTo.department}</p>
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>{complaint.assignedTo.phone}</span>
                                <Button size="sm" variant="outline" className="ml-2">
                                  <Phone className="w-3 h-3 mr-1" />
                                  Call
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media Gallery */}
        {complaint.mediaUrls.length > 0 && (
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Attached Media</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {complaint.mediaUrls.map((url, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Camera className="w-8 h-8 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Feedback Section (only show if resolved) */}
        {complaint.status === 'resolved' && (
          <Card className="border-green-200 bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-green-800">Issue Resolved - Your Feedback</CardTitle>
              <CardDescription className="text-green-700">
                This issue was resolved by {complaint.assignedTo?.name} from the {complaint.assignedTo?.department}. 
                Thank them for their service!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-green-800">Rate the resolution (1-5 stars)</label>
                <div className="flex space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="w-6 h-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-green-800">Comments (Optional)</label>
                <Textarea
                  placeholder="Share your experience about the resolution process..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="mt-2 border-green-200 focus:border-green-400"
                />
              </div>
              
              <Button 
                onClick={handleFeedbackSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Submit Feedback
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Contact Support</DialogTitle>
                <DialogDescription>
                  Need help with your complaint? Contact our support team.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-medium mb-2">Helpline Numbers</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>General Support:</span>
                      <Button size="sm" variant="outline">
                        <Phone className="w-3 h-3 mr-1" />
                        1800-XXX-XXXX
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emergency:</span>
                      <Button size="sm" variant="outline">
                        <Phone className="w-3 h-3 mr-1" />
                        100
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate('/track-complaints')}
          >
            View All Complaints
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTracking;