import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const demoFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  course: z.string().min(1, "Please select a course"),
  educationalQualification: z.string().min(1, "Please enter your qualification"),
  occupationStatus: z.string().min(1, "Please select your occupation status"),
});

const courses = [
  { id: "upsc-cse", name: "UPSC CSE" },
  { id: "neet", name: "NEET" },
  { id: "tnpsc", name: "TNPSC" },
  { id: "ssc", name: "SSC" },
];

const occupationStatuses = [
  { id: "student", name: "Student" },
  { id: "employed", name: "Employed" },
  { id: "self-employed", name: "Self Employed" },
  { id: "unemployed", name: "Unemployed" },
];

const DemoRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof demoFormSchema>>({
    resolver: zodResolver(demoFormSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      course: "",
      educationalQualification: "",
      occupationStatus: "",
    },
  });

  const handleDemoRegistration = async (values: z.infer<typeof demoFormSchema>) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.from("demo_requests").insert({
        name: values.name,
        phone_number: values.phoneNumber,
        email: values.email,
        course: values.course,
        educational_qualification: values.educationalQualification,
        occupation_status: values.occupationStatus,
      });

      if (error) {
        console.error("Demo registration error:", error);
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
        return;
      }

      toast({
        title: "Demo Registration Successful!",
        description: "You can now access the demo course.",
      });

      // Navigate to the demo course
      navigate(`/demo/${values.course}`);

    } catch (error: any) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleDemoRegistration)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select Course</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="educationalQualification"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Educational Qualification</FormLabel>
              <FormControl>
                <Input placeholder="Enter your qualification" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="occupationStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Occupation Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {occupationStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register for Demo"}
        </Button>
      </form>
    </Form>
  );
};

export default DemoRegistration;