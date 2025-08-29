// Update this page (the content is just a fallback if you fail to update the page)

import { Button } from "@/components/ui/button";
import { Shield, FileText, MapPin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8 max-w-md">
        {/* Logo and App Name */}
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
            <Shield className="w-12 h-12 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Nagar Rakshak</h1>
            <p className="text-muted-foreground text-lg">Empowering Citizens, Building Better Cities</p>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="space-y-4">
          <p className="text-foreground">
            Welcome to India's premier civic issue reporting platform. 
            Report problems anonymously and track their resolution.
          </p>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-primary font-medium">
              Be a guardian of your city. Every report makes a difference.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          size="lg" 
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          onClick={() => window.location.href = '/auth'}
        >
          Get Started
        </Button>

        {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-card rounded-lg border border-border">
            <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-xs font-medium">Anonymous Reporting</p>
          </div>
          <div className="p-3 bg-card rounded-lg border border-border">
            <MapPin className="w-6 h-6 text-accent mx-auto mb-2" />
            <p className="text-xs font-medium">Real-time Tracking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
