import { Card } from "@/components/ui/card";
import { Book, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const subjects = [
  {
    title: "NCERT Summary",
    items: [
      { name: "Economics - NCERT Summary", chapters: 4 },
      { name: "Geography - NCERT Summary", chapters: 7 },
      { name: "Polity - NCERT Summary", chapters: 7 },
      { name: "Science & Technology - NCERT Summary", chapters: 18 },
      { name: "History - NCERT Summary", chapters: 7 },
    ],
  },
  {
    title: "History",
    items: [
      { name: "Ancient History", chapters: 10 },
      { name: "Medieval History", chapters: 5 },
      { name: "Modern History", chapters: 8 },
      { name: "World History", chapters: 4 },
      { name: "Post-Independence History", chapters: 3 },
    ],
  },
  {
    title: "Art & Culture",
    items: [{ name: "Art & Culture", chapters: 6 }],
  },
  {
    title: "Geography",
    items: [
      { name: "Physical Geography", chapters: 8 },
      { name: "Indian Geography", chapters: 12 },
      { name: "Human Geography", chapters: 5 },
      { name: "World Geography", chapters: 8 },
    ],
  },
  {
    title: "Polity, Governance & IR",
    items: [
      { name: "Governance", chapters: 6 },
      { name: "International Relations", chapters: 5 },
      { name: "Indian Polity", chapters: 8 },
    ],
  },
  {
    title: "Economy",
    items: [{ name: "Indian Economy", chapters: 13 }],
  },
  {
    title: "Environment & Ecology",
    items: [{ name: "Environment & Ecology", chapters: 4 }],
  },
  {
    title: "Science & Technology",
    items: [{ name: "Science & Technology", chapters: 3 }],
  },
  {
    title: "Indian Society",
    items: [
      { name: "Social Issues", chapters: 8 },
      { name: "Social Justice", chapters: 3 },
    ],
  },
  {
    title: "Security Issues",
    items: [{ name: "Internal Security", chapters: 6 }],
  },
  {
    title: "Ethics, Integrity & Aptitude",
    items: [{ name: "Ethics, Integrity & Aptitude", chapters: 8 }],
  },
  {
    title: "Disaster Management",
    items: [{ name: "Disaster Management", chapters: 4 }],
  },
  {
    title: "CSAT - Paper II",
    items: [
      { name: "Decision Making", chapters: 1 },
      { name: "Reading Comprehension", chapters: 1 },
      { name: "Logical Reasoning and Analytical Ability", chapters: 9 },
      { name: "Verbal Ability", chapters: 2 },
      { name: "Quantitative Ability", chapters: 3 },
      { name: "Basic Numeracy", chapters: 14 },
    ],
  },
];

const Materials = () => {
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
              <AccordionItem value="items" className="border-none">
                <AccordionTrigger className="hover:no-underline py-0">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Book className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-left">{subject.title}</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="mt-4 space-y-2">
                    {subject.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer group"
                      >
                        <span className="text-sm text-gray-600">{item.name}</span>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{item.chapters} chapters</span>
                          <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Materials;