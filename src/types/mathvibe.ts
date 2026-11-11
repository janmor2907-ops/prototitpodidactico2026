export type ScreenType = 'welcome' | 'dashboard' | 'lab';

export type StudentMood = 
  | 'entusiasmo' 
  | 'tranquilidad' 
  | 'frustracion' 
  | 'cansancio' 
  | 'motivado' 
  | 'concentrado' 
  | 'dubitativo' 
  | 'cansado';

export type MathTopic = 
  | 'Operaciones básicas'
  | 'Fracciones'
  | 'Álgebra y ecuaciones'
  | 'Geometría'
  | 'Razonamiento matemático';

export interface StudentProfile {
  id: string;
  name: string;
  nickname: string;
  avatar: string;
  grade: string;
  level: number;
  levelTitle: string;
  xp: number;
  streakDays: number;
  currentMood: StudentMood;
  paceScore: string; // e.g. "Ritmo Óptimo (1.2x)"
  completedExercisesCount: number;
  accuracyRate: number; // percentage
}

export type ExerciseDifficulty = 'Básico' | 'Intermedio' | 'Avanzado' | 'Reto Vibe';

export type ExerciseType = 
  | 'multiple_choice' 
  | 'numeric_input' 
  | 'interactive_balance' 
  | 'fraction_visualizer' 
  | 'pattern_logic';

export interface Exercise {
  id: string;
  title: string;
  topic: MathTopic;
  level: number;
  difficulty: ExerciseDifficulty;
  question: string;
  instructions: string; // Clear instruction on how to respond
  formula?: string;
  type: ExerciseType;
  options?: string[];
  correctAnswer: string | number;
  inputPlaceholder?: string;
  inputUnit?: string;
  hints: string[];
  explanation: {
    concept: string;
    steps: string[];
    keyTakeaway: string;
  };
  recommendedForMoods?: StudentMood[];
  interactiveData?: {
    // For algebraic balance:
    leftConstant?: number;
    leftXCoefficient?: number;
    rightConstant?: number;
    minX?: number;
    maxX?: number;
    targetX?: number;
    // For fraction visualizer:
    totalSlices?: number;
    targetNumerator?: number;
    targetDenominator?: number;
  };
}

export interface TopicProgress {
  id: string;
  name: MathTopic;
  progressPercent: number;
  masteredCount: number;
  totalCount: number;
  iconName: string;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'ritmo' | 'academico' | 'emocion';
}

export interface SessionStats {
  completedCount: number;
  correctCount: number;
  incorrectCount: number;
  totalAttempts: number;
  consecutiveCorrect: number;
  consecutiveIncorrect: number;
  currentAdaptiveLevel: number; // 1 (Básico) to 4 (Reto Vibe)
}
