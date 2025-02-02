import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Profile {
  id: string;
  full_name: string;
  bio: string | null;
  phone_number: string | null;
}

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      return data as Profile;
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedProfile: Partial<Profile>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
      console.error('Update error:', error);
    }
  });

  const handleSave = async (formData: FormData) => {
    const updatedProfile = {
      full_name: formData.get('full_name') as string,
      bio: formData.get('bio') as string,
      phone_number: formData.get('phone_number') as string,
    };

    updateProfileMutation.mutate(updatedProfile);
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-[400px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-4xl mx-auto animate-fadeIn">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold">Profile</h1>
        {isEditing ? (
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditing(false)}
              disabled={updateProfileMutation.isPending}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={() => {
                const form = document.querySelector('form');
                if (form) {
                  const formData = new FormData(form);
                  handleSave(formData);
                }
              }}
              disabled={updateProfileMutation.isPending}
            >
              <Save className="h-4 w-4 mr-1" />
              {updateProfileMutation.isPending ? 'Saving...' : 'Save'}
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
        <form className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg" alt={profile?.full_name} />
                <AvatarFallback>{profile?.full_name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  {isEditing ? (
                    <Input
                      name="full_name"
                      defaultValue={profile?.full_name}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-base">{profile?.full_name}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  {isEditing ? (
                    <Input
                      name="phone_number"
                      defaultValue={profile?.phone_number || ''}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-base">{profile?.phone_number || 'Not provided'}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Bio</label>
                  {isEditing ? (
                    <Input
                      name="bio"
                      defaultValue={profile?.bio || ''}
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-base">{profile?.bio || 'No bio provided'}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;