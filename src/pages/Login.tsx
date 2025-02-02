import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import DemoRegistration from "@/components/demo/DemoRegistration";
import { User } from "@supabase/supabase-js";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      
      // Try to sign in first
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        // If login fails with invalid credentials, try to sign up
        if (error.message === "Invalid login credentials") {
          const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
          });

          if (signUpError) {
            console.error("Signup error:", signUpError);
            toast({
              variant: "destructive",
              title: "Sign up failed",
              description: signUpError.message,
            });
            return;
          }

          if (signUpData.session === null) {
            toast({
              title: "Verification email sent",
              description: "Please check your email to verify your account before logging in.",
            });
            return;
          }

          return handleSuccessfulLogin(signUpData.user);
        }

        console.error("Login error:", error);
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        return;
      }

      await handleSuccessfulLogin(data.user);
    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulLogin = async (user: User | null) => {
    if (!user) return;
    
    // Check if profile exists and create if it doesn't
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select()
      .eq('user_id', user.id)
      .maybeSingle();

    if (!profile && !profileError) {
      const { error: insertError } = await supabase
        .from('profiles')
        .insert([
          {
            user_id: user.id,
            full_name: user.email?.split('@')[0] || 'User',
          }
        ]);

      if (insertError) {
        console.error('Error creating profile:', insertError);
      }
    }

    toast({
      title: "Login successful!",
      description: "Welcome back to NCA PREP.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50/40 p-4">
      <Card className="w-full max-w-md p-8 space-y-8 animate-fadeIn">
        <div className="text-center space-y-2">
          <h1 className="font-heading text-3xl font-bold text-primary">Welcome to NCA PREP!</h1>
          <p className="text-muted-foreground">Sign in to your account or register for a demo</p>
        </div>

        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="demo">Demo Class</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                <FormField
                  control={loginForm.control}
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
                  control={loginForm.control}
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

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" /> Sign In
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="demo">
            <DemoRegistration />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;