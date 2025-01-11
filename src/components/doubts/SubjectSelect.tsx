import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const subjects = [
  "Economics",
  "History",
  "Geography",
  "Polity",
  "Science & Technology",
  "Current Affairs",
  "Ethics",
  "Environment"
];

interface SubjectSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const SubjectSelect = ({ value, onValueChange }: SubjectSelectProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select subject" />
      </SelectTrigger>
      <SelectContent>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject}>
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectSelect;