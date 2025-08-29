import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, Camera, MapPin, Lightbulb, Car, Trash, Droplets, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegisterComplaint = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    issueType: '',
    customIssue: '',
    description: '',
    mediaFiles: [] as File[]
  });

  const states = [
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' }
  ];

  const cities = {
    'maharashtra': [
      { value: 'mumbai', label: 'Mumbai' },
      { value: 'pune', label: 'Pune' },
      { value: 'nagpur', label: 'Nagpur' }
    ],
    'delhi': [
      { value: 'new-delhi', label: 'New Delhi' },
      { value: 'central-delhi', label: 'Central Delhi' }
    ],
    'karnataka': [
      { value: 'bangalore', label: 'Bangalore' },
      { value: 'mysore', label: 'Mysore' }
    ],
    'uttar-pradesh': [
      { value: 'lucknow', label: 'Lucknow' },
      { value: 'kanpur', label: 'Kanpur' }
    ]
  };

  const issueTypes = [
    { value: 'street_light', label: 'Street Light Not Working', icon: Lightbulb, color: 'bg-yellow-500' },
    { value: 'pothole', label: 'Pothole/Damaged Road', icon: Car, color: 'bg-orange-500' },
    { value: 'garbage', label: 'Garbage Dump/Overflowing Bin', icon: Trash, color: 'bg-green-500' },
    { value: 'drainage', label: 'Drainage/Sewerage Problem', icon: Droplets, color: 'bg-blue-500' },
    { value: 'others', label: 'Others', icon: Plus, color: 'bg-gray-500' }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.state || !formData.city) {
        toast({
          title: "Incomplete Information",
          description: "Please select both state and city",
          variant: "destructive"
        });
        return;
      }
    }
    if (currentStep === 2) {
      if (!formData.issueType || (formData.issueType === 'others' && !formData.customIssue)) {
        toast({
          title: "Incomplete Information",
          description: "Please select an issue type",
          variant: "destructive"
        });
        return;
      }
      if (!formData.description.trim()) {
        toast({
          title: "Incomplete Information",
          description: "Please provide a description of the issue",
          variant: "destructive"
        });
        return;
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setFormData({ ...formData, mediaFiles: [...formData.mediaFiles, ...newFiles] });
      toast({
        title: "Files Added",
        description: `${newFiles.length} file(s) added successfully`
      });
    }
  };

  const handleSubmit = async () => {
    // Here you would implement the actual submission logic
    toast({
      title: "Report Submitted Successfully!",
      description: "Thank you for being a responsible citizen of India. You are truly a 'Nagar Rakshak'!"
    });
    
    // Navigate to complaint tracking page
    setTimeout(() => {
      navigate('/complaint/new-complaint-id');
    }, 2000);
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
              <h1 className="text-xl font-bold text-primary">Register New Complaint</h1>
              <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-primary/10 shadow-lg">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Location Details'}
              {currentStep === 2 && 'Issue Information'}
              {currentStep === 3 && 'Media Upload & Review'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Select your state and city/municipality'}
              {currentStep === 2 && 'Describe the issue you want to report'}
              {currentStep === 3 && 'Upload photos/videos and review your complaint'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Location */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value, city: '' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.value} value={state.value}>
                          {state.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City/District/Municipality *</Label>
                  <Select 
                    value={formData.city} 
                    onValueChange={(value) => setFormData({ ...formData, city: value })}
                    disabled={!formData.state}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your city" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.state && cities[formData.state as keyof typeof cities]?.map((city) => (
                        <SelectItem key={city.value} value={city.value}>
                          {city.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <MapPin className="w-5 h-5 text-primary mr-3" />
                  <p className="text-sm text-primary">
                    Accurate location helps us route your complaint to the right department quickly.
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Issue Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Issue Type *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {issueTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <div
                          key={type.value}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.issueType === type.value
                              ? 'border-primary bg-primary/10'
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => setFormData({ ...formData, issueType: type.value })}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 ${type.color} rounded-full flex items-center justify-center`}>
                              <IconComponent className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-medium">{type.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {formData.issueType === 'others' && (
                  <div className="space-y-2">
                    <Label htmlFor="customIssue">Specify Other Issue *</Label>
                    <Input
                      id="customIssue"
                      placeholder="Please describe the type of issue"
                      value={formData.customIssue}
                      onChange={(e) => setFormData({ ...formData, customIssue: e.target.value })}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide detailed description of the issue including exact location, severity, and any other relevant information..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="min-h-32"
                  />
                  <p className="text-sm text-muted-foreground">
                    Minimum 20 characters. Be specific to help authorities understand and resolve the issue quickly.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Media Upload */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Upload Photos/Videos (Optional)</Label>
                  <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                    <p className="text-lg font-medium mb-2">Upload Media Files</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Geo-tagged photos are preferred for accuracy
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" className="relative">
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                        <input
                          type="file"
                          accept="image/*"
                          capture="environment"
                          multiple
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </Button>
                      <Button variant="outline" className="relative">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Files
                        <input
                          type="file"
                          accept="image/*,video/*"
                          multiple
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </Button>
                    </div>
                  </div>

                  {formData.mediaFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files</Label>
                      <div className="space-y-2">
                        {formData.mediaFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-accent/5 rounded-lg">
                            <span className="text-sm font-medium">{file.name}</span>
                            <Badge variant="secondary">{(file.size / 1024 / 1024).toFixed(2)} MB</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Review Section */}
                <div className="space-y-4">
                  <Label>Review Your Complaint</Label>
                  <div className="p-4 bg-card border border-border rounded-lg space-y-3">
                    <div>
                      <span className="font-medium">Location: </span>
                      <span>{states.find(s => s.value === formData.state)?.label}, {cities[formData.state as keyof typeof cities]?.find(c => c.value === formData.city)?.label}</span>
                    </div>
                    <div>
                      <span className="font-medium">Issue Type: </span>
                      <span>{formData.issueType === 'others' ? formData.customIssue : issueTypes.find(t => t.value === formData.issueType)?.label}</span>
                    </div>
                    <div>
                      <span className="font-medium">Description: </span>
                      <span>{formData.description}</span>
                    </div>
                    <div>
                      <span className="font-medium">Media Files: </span>
                      <span>{formData.mediaFiles.length} file(s) attached</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous Step
                </Button>
              )}
              <div className="ml-auto">
                {currentStep < 3 ? (
                  <Button onClick={handleNext}>
                    Next Step
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                    Submit Report
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterComplaint;