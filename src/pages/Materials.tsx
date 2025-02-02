import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import SubjectItem from "@/components/materials/SubjectItem";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type StudyMaterial = Database['public']['Tables']['study_materials']['Row'];

interface GroupedMaterial {
  title: string;
  items: {
    name: string;
    chapters: number;
  }[];
}

const Materials = () => {
  const { data: materials, isLoading } = useQuery({
    queryKey: ['study-materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Group materials by subject
      const groupedMaterials = (data as StudyMaterial[]).reduce<Record<string, GroupedMaterial>>((acc, material) => {
        if (!acc[material.subject]) {
          acc[material.subject] = {
            title: material.subject,
            items: []
          };
        }
        
        acc[material.subject].items.push({
          name: material.title,
          chapters: 12 // This would ideally come from the database
        });
        
        return acc;
      }, {});
      
      return Object.values(groupedMaterials);
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If no materials are found
  if (!materials || materials.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="font-heading text-2xl font-bold">Study Materials</h1>
          <p className="text-muted-foreground">Access your course materials</p>
        </div>
        <Card className="p-6 text-center text-muted-foreground">
          No study materials available at the moment.
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col gap-4">
        <h1 className="font-heading text-2xl font-bold">Study Materials</h1>
        <p className="text-muted-foreground">Access your course materials</p>
      </div>

      <div className="grid gap-4">
        {materials.map((subject) => (
          <Card key={subject.title} className="p-4">
            <Accordion type="single" collapsible>
              <SubjectItem subject={subject} />
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Materials;