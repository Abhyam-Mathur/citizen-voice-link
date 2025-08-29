import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Phone, Search, Clock, MapPin, AlertTriangle } from "lucide-react";

const Helpline = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Mock helpline data
  const helplineNumbers = [
    {
      id: "1",
      department: "Police",
      contactNumber: "100",
      description: "Emergency police services",
      city: "All Cities",
      isEmergency: true,
      availability: "24/7"
    },
    {
      id: "2",
      department: "Fire Brigade",
      contactNumber: "101",
      description: "Fire emergency and rescue services",
      city: "All Cities",
      isEmergency: true,
      availability: "24/7"
    },
    {
      id: "3",
      department: "Ambulance",
      contactNumber: "108",
      description: "Medical emergency services",
      city: "All Cities",
      isEmergency: true,
      availability: "24/7"
    },
    {
      id: "4",
      department: "Municipal Corporation",
      contactNumber: "+91 22 2266 7799",
      description: "General civic issues and complaints",
      city: "Mumbai",
      isEmergency: false,
      availability: "9 AM - 6 PM"
    },
    {
      id: "5",
      department: "Public Works Department",
      contactNumber: "+91 22 2268 4455",
      description: "Road repairs, street lights, infrastructure",
      city: "Mumbai",
      isEmergency: false,
      availability: "9 AM - 5 PM"
    },
    {
      id: "6",
      department: "Water Supply Department",
      contactNumber: "+91 22 2267 3322",
      description: "Water supply issues, leakages, quality",
      city: "Mumbai",
      isEmergency: false,
      availability: "8 AM - 8 PM"
    },
    {
      id: "7",
      department: "Waste Management",
      contactNumber: "+91 22 2265 1188",
      description: "Garbage collection, waste disposal",
      city: "Mumbai",
      isEmergency: false,
      availability: "6 AM - 10 PM"
    },
    {
      id: "8",
      department: "Traffic Police",
      contactNumber: "+91 22 2262 0111",
      description: "Traffic violations, signal issues",
      city: "Mumbai",
      isEmergency: false,
      availability: "24/7"
    },
    {
      id: "9",
      department: "Electricity Board",
      contactNumber: "+91 22 2263 4477",
      description: "Power outages, electrical issues",
      city: "Mumbai",
      isEmergency: false,
      availability: "24/7"
    },
    {
      id: "10",
      department: "Women Helpline",
      contactNumber: "1091",
      description: "Women safety and harassment issues",
      city: "All Cities",
      isEmergency: true,
      availability: "24/7"
    }
  ];

  const filteredHelplines = helplineNumbers.filter(helpline =>
    helpline.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    helpline.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    helpline.contactNumber.includes(searchQuery)
  );

  const emergencyNumbers = filteredHelplines.filter(h => h.isEmergency);
  const departmentNumbers = filteredHelplines.filter(h => !h.isEmergency);

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
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
              <h1 className="text-xl font-bold text-primary">Helpline Numbers</h1>
              <p className="text-sm text-muted-foreground">Emergency and municipal contact numbers</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search */}
        <Card className="border-primary/10 mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by department, service, or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Emergency Numbers */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h2 className="text-2xl font-bold text-foreground">Emergency Numbers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyNumbers.map((helpline) => (
              <Card key={helpline.id} className="border-red-200 bg-red-50/50 hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-red-800 mb-1">
                        {helpline.department}
                      </h3>
                      <p className="text-sm text-red-700 mb-2">
                        {helpline.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-red-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{helpline.availability}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{helpline.city}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-red-500 text-white">Emergency</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-red-600">
                      {helpline.contactNumber}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleCall(helpline.contactNumber)}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Call Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Department Numbers */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Municipal Departments</h2>
          <div className="space-y-4">
            {departmentNumbers.map((helpline) => (
              <Card key={helpline.id} className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {helpline.department}
                        </h3>
                        <Badge variant="outline" className="text-primary border-primary">
                          Municipal
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {helpline.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{helpline.availability}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{helpline.city}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary mb-2">
                        {helpline.contactNumber}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleCall(helpline.contactNumber)}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <Card className="border-amber-200 bg-amber-50/50 mt-8">
          <CardHeader>
            <CardTitle className="text-amber-800">Important Notice</CardTitle>
          </CardHeader>
          <CardContent className="text-amber-700">
            <ul className="space-y-2 text-sm">
              <li>• For life-threatening emergencies, always call <strong>100 (Police)</strong>, <strong>101 (Fire)</strong>, or <strong>108 (Ambulance)</strong> first.</li>
              <li>• Municipal department numbers are for non-emergency civic issues.</li>
              <li>• Keep these numbers handy and share them with your family and neighbors.</li>
              <li>• If you don't get through immediately, please be patient and try again.</li>
              <li>• For complaints that can wait, consider using the Nagar Rakshak app to report issues.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Helpline;