import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DemoCourse from "@/components/demo/DemoCourse";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [selectedDemoCourse, setSelectedDemoCourse] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      // Add your login logic here
      console.log("Login attempt with:", values);
      
      toast({
        title: "Login successful!",
        description: "Welcome back to NCA PREP.",
      });
      navigate("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    }
  };

  const handleForgotPassword = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      // Add your password reset email logic here
      console.log("Password reset requested for:", values.email);
      
      toast({
        title: "Reset link sent",
        description: "Please check your email for password reset instructions.",
      });
      setIsResetDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send reset link",
        description: "Please try again later.",
      });
    }
  };

  const handleResetPassword = async (values: z.infer<typeof resetPasswordSchema>) => {
    try {
      // Add your password reset logic here
      console.log("Password reset with:", values);
      
      toast({
        title: "Password reset successful",
        description: "You can now login with your new password.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to reset password",
        description: "Please try again later.",
      });
    }
  };

  const availableDemoCourses = [
    "UPSC-CSE",
    "SSC",
    "Banking",
    "NEET",
    "JEE"
  ];

  const handleDemoComplete = () => {
    toast({
      title: "Demo Completed!",
      description: "Contact NCA Prep admin to get your login credentials.",
    });
    setSelectedDemoCourse(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/40 p-4">
      <Card className="w-full max-w-md p-8 space-y-8 animate-fadeIn">
        <div className="text-center space-y-2">
          <h1 className="font-heading text-3xl font-bold text-primary">Welcome back!</h1>
          <p className="text-muted-foreground">Sign in to your NCA PREP account</p>
        </div>

        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="text-base md:text-sm"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="text-base md:text-sm pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" size="lg">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="register">
            {selectedDemoCourse ? (
              <DemoCourse 
                courseName={selectedDemoCourse}
                onComplete={handleDemoComplete}
              />
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-4">Try a Demo Course</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Experience NCA PREP with our interactive demo courses
                  </p>
                </div>
                <div className="grid gap-3">
                  {availableDemoCourses.map((course) => (
                    <Button
                      key={course}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => setSelectedDemoCourse(course)}
                    >
                      <GraduationCap className="mr-2 h-4 w-4" />
                      {course}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="text-center space-y-2">
          <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-sm text-primary hover:underline">
                Forgot password?
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
              </DialogHeader>
              <Form {...forgotPasswordForm}>
                <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Send Reset Link
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default Login;
