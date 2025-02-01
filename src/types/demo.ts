export interface DemoCourse {
  id: string;
  course_id: string;
  course_name: string;
  video_url: string | null;
  notes_url: string | null;
  test_questions: any | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface DemoRequest {
  name: string;
  phone_number: string;
  email: string;
  course: string;
  educational_qualification: string;
  occupation_status: string;
}