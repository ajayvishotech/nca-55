import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

const Profile = () => {
  const studentData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    enrolledCourse: "UPSC CSE - General Studies",
    address: "123 Main Street, Chennai, Tamil Nadu",
    education: "B.Tech Computer Science",
    employment: "Software Engineer at Tech Corp",
    avatar: "/placeholder.svg"
  };

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Profile</h1>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={studentData.avatar} alt={studentData.name} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                <p className="text-base">{studentData.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                <p className="text-base">{studentData.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Phone Number</h3>
                <p className="text-base">{studentData.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Enrolled Course</h3>
                <p className="text-base">{studentData.enrolledCourse}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                <p className="text-base">{studentData.address}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Current Education</h3>
                <p className="text-base">{studentData.education}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Employment</h3>
                <p className="text-base">{studentData.employment}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;