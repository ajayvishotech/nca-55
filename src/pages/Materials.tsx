import { Card } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import SubjectItem from "@/components/materials/SubjectItem";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const Materials = () => {
  const { data: materials, isLoading } = useQuery({
    queryKey: ['study-materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('study_materials')
        .select('*')
        .order('subject');
      
      if (error) throw error;
      return data;
    }
  });

  // Group materials by subject
  const groupedMaterials = materials?.reduce((acc, material) => {
    if (!acc[material.subject]) {
      acc[material.subject] = [];
    }
    acc[material.subject].push({
      name: material.title,
      chapters: 1, // This could be updated if we add chapters to the database
    });
    return acc;
  }, {} as Record<string, { name: string; chapters: number }[]>) ?? {};

  const subjects = Object.entries(groupedMaterials).map(([title, items]) => ({
    title,
    items,
  }));

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
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
        {subjects.map((subject) => (
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