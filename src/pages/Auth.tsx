import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Phone, KeyRound, User, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [currentStep, setCurrentStep] = useState<'splash' | 'phone' | 'otp' | 'credentials' | 'login'>('splash');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePhoneSubmit = async () => {
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setCurrentStep('otp');
      toast({
        title: "OTP Sent!",
        description: "Please check your mobile for the 6-digit verification code"
      });
    }, 1500);
  };

  const handleOtpVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP sent to your mobile",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate OTP verification and credential generation
    setTimeout(() => {
      const generatedUsername = `Rakshak${Math.floor(10000 + Math.random() * 90000)}`;
      const generatedPassword = Math.random().toString(36).slice(-8);
      
      setUsername(generatedUsername);
      setPassword(generatedPassword);
      setLoading(false);
      setCurrentStep('credentials');
      
      toast({
        title: "Verification Successful!",
        description: "We have sent your anonymous login credentials to your mobile number. Please use them to log in."
      });
    }, 2000);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      toast({
        title: "Missing Credentials",
        description: "Please enter both username and password",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    // Simulate login - replace with actual authentication
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard');
      toast({
        title: "Welcome to Nagar Rakshak!",
        description: `Successfully logged in as ${username}`
      });
    }, 1500);
  };

  if (currentStep === 'splash') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex flex-col items-center justify-center p-4">
        {/* Language Selector */}
        <div className="absolute top-4 right-4">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-32">
              <Settings className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="bn">বাংলা</SelectItem>
            </SelectContent>
          </Select>
        </div>

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

          {/* Action Buttons */}
          <div className="space-y-4 w-full">
            <Button 
              size="lg" 
              className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              onClick={() => {
                setIsAdmin(false);
                setCurrentStep('phone');
              }}
            >
              <User className="w-6 h-6 mr-3" />
              Login / Sign Up as Citizen
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full h-12 text-base border-primary/20 hover:bg-primary/5"
              onClick={() => {
                setIsAdmin(true);
                setCurrentStep('login');
              }}
            >
              <Shield className="w-5 h-5 mr-2" />
              Login as Admin
            </Button>
          </div>

          <p className="text-sm text-muted-foreground px-4">
            Report civic issues anonymously and track their resolution. 
            Be a guardian of your city.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-primary/10 shadow-xl">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl text-primary">
            {currentStep === 'phone' && 'Enter Mobile Number'}
            {currentStep === 'otp' && 'Verify OTP'}
            {currentStep === 'credentials' && 'Your Credentials'}
            {currentStep === 'login' && (isAdmin ? 'Admin Login' : 'Citizen Login')}
          </CardTitle>
          <CardDescription>
            {currentStep === 'phone' && 'We\'ll send you a verification code'}
            {currentStep === 'otp' && `Enter the 6-digit code sent to ${phoneNumber}`}
            {currentStep === 'credentials' && 'Save these credentials to login'}
            {currentStep === 'login' && `Welcome back to Nagar Rakshak`}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 'phone' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10"
                    maxLength={10}
                  />
                </div>
              </div>
              <Button 
                onClick={handlePhoneSubmit} 
                className="w-full" 
                disabled={loading || phoneNumber.length !== 10}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>
          )}

          {currentStep === 'otp' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>
              <Button 
                onClick={handleOtpVerify} 
                className="w-full" 
                disabled={loading || otp.length !== 6}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep('phone')}
                className="w-full"
              >
                Back to Phone Number
              </Button>
            </div>
          )}

          {currentStep === 'credentials' && (
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-3">Your anonymous login credentials:</p>
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs">Username</Label>
                    <p className="font-mono text-lg font-bold text-primary">{username}</p>
                  </div>
                  <div>
                    <Label className="text-xs">Password</Label>
                    <p className="font-mono text-lg font-bold text-primary">{password}</p>
                  </div>
                </div>
              </div>
              <div className="bg-accent/10 p-3 rounded-lg">
                <p className="text-sm text-accent-foreground">
                  📱 These credentials have been sent to your mobile number. Save them securely.
                </p>
              </div>
              <Button onClick={() => setCurrentStep('login')} className="w-full">
                Continue to Login
              </Button>
            </div>
          )}

          {currentStep === 'login' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{isAdmin ? 'Admin ID' : 'Username'}</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder={isAdmin ? 'Enter admin ID' : 'Enter your username'}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm">Remember me</Label>
              </div>
              <Button 
                onClick={handleLogin} 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Logging in..." : (isAdmin ? "Login as Admin" : "Login")}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep('splash')}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;