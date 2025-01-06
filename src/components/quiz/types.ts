export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
}

export interface PowerUp {
  name: string;
  count: number;
  icon: React.ReactNode;
  description: string;
}

export interface GameState {
  score: number;
  timeLeft: number;
  currentQuestion: number;
  selectedAnswer: number | null;
  streak: number;
  gameState: "ready" | "playing" | "finished";
}