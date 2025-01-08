import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    enrolledCourse: "UPSC CSE - General Studies",
    address: "123 Main Street, Chennai, Tamil Nadu",
    education: "B.Tech Computer Science",
    employment: "Software Engineer at Tech Corp",
    avatar: "/placeholder.svg"
  });

  const [editedData, setEditedData] = useState(studentData);

  const handleSave = () => {
    setStudentData(editedData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditedData(studentData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Profile</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-1" />
            Edit Profile
          </Button>
        )}
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
              {Object.entries(editedData).map(([key, value]) => {
                if (key === 'avatar') return null;
                return (
                  <div key={key}>
                    <h3 className="text-sm font-medium text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h3>
                    {isEditing ? (
                      <Input
                        value={value}
                        onChange={(e) =>
                          setEditedData((prev) => ({
                            ...prev,
                            [key]: e.target.value,
                          }))
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-base">{value}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;