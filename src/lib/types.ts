export interface User {
  id: string;
  nationalId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  creditScore?: number;
  joinDate: Date;
  profileComplete: boolean;
}

export interface CreditJourney {
  currentLevel: number;
  totalLevels: number;
  progress: number; // 0-100
  nextMilestone: string;
  completedSteps: string[];
  availableSteps: string[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: "savings" | "spending" | "education" | "payment";
  difficulty: "easy" | "medium" | "hard";
  points: number;
  progress: number; // 0-100
  completed: boolean;
  deadline?: Date;
  icon: string;
  reward: string;
}

export interface LoanSimulation {
  id: string;
  amount: number;
  purpose: "housing" | "education" | "business" | "emergency";
  monthlyIncome: number;
  monthlyExpenses: number;
  creditScore: number;
  employmentType: "formal" | "informal" | "freelance";
  approvalProbability: number; // 0-100
  suggestedTerms: {
    interestRate: number;
    monthlyPayment: number;
    termMonths: number;
  };
  alternativeData: {
    savingsHistory: boolean;
    utilityPayments: boolean;
    phonePayments: boolean;
    onlineActivity: boolean;
  };
}

export interface EducationContent {
  id: string;
  title: string;
  category: "basics" | "housing" | "investment" | "planning";
  readTime: number; // minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  content: string;
  keyPoints: string[];
  quiz?: {
    questions: QuizQuestion[];
  };
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  message: string;
  timestamp: Date;
  isTyping?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "mission";
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

export interface DashboardStats {
  creditScore: number;
  totalPoints: number;
  completedMissions: number;
  currentStreak: number;
  monthlyProgress: number;
  savingsGoal: number;
  currentSavings: number;
}
