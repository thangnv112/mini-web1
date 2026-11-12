export type ExerciseType = "fill_blank" | "fill_connector" | "compose";

export type Exercise = {
  id: string;
  title: string;
  sentence: string;
  type: ExerciseType;
  difficulty: "easy" | "medium" | "hard";
  instruction: string;
  correctAnswers: {
    subject1: string;
    predicate1: string;
    subject2: string;
    predicate2: string;
    connector: string;
  };
  hints: string[];
};

export type ChatMessage = {
  text: string;
  sender: "ai" | "user";
};

export type Progress = {
  stars: number;
  completedExercises: string[];
  totalAttempts: number;
};
