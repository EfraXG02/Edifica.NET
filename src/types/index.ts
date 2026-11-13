export type TrackId = 'fundamentos' | 'csharp' | 'blazor' | 'aspnet_azure';

export type DifficultyLevel = 'Iniciante Zero' | 'Básico' | 'Intermediário' | 'Avançado';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  distractorExplanations?: string[];
}

export interface CodeTestCase {
  name: string;
  description: string;
  expectedOutputSnippet?: string;
  validator: (code: string) => { passed: boolean; message: string };
}

export interface CodeChallenge {
  title: string;
  instructions: string;
  starterCode: string;
  solutionCode: string;
  hints: string[];
  testCases: CodeTestCase[];
}

export interface CurriculumModule {
  id: string;
  trackId: TrackId;
  order: number;
  title: string;
  subtitle: string;
  level: DifficultyLevel;
  estimatedMinutes: number;
  academicObjective: string;
  realWorldAnalogy: {
    headline: string;
    analogyText: string;
    dailyLifeComparison: string; // ex: analogia com pedreira, alvenaria, receita ou oficina
  };
  theory: {
    overview: string;
    sections: {
      title: string;
      content: string;
      codeSnippet?: string;
      codeLanguage?: string;
      keyTakeaway?: string;
    }[];
    interviewTip?: string;
    blazorConnection?: string;
  };
  quiz: QuizQuestion[];
  challenge: CodeChallenge;
  blazorImpact: {
    tierUnlocked: number;
    componentName: string;
    featureDescription: string;
    linesOfCodeAdded: number;
  };
}

export interface BlazorFile {
  path: string;
  name: string;
  type: 'razor' | 'cs' | 'json' | 'css';
  tierRequired: number;
  description: string;
  code: string;
}

export interface BlazorLiveAppState {
  enrolledCourseCodes: string[];
  notifications: string[];
  formNome: string;
  formEmail: string;
  formCpf: string;
  formTermos: boolean;
  uploadedDocs: string[];
  activeAppPage: 'home' | 'courses' | 'enrollment' | 'state' | 'api' | 'cloud';
}

export interface StudentProgress {
  studentName: string;
  completedModuleIds: string[];
  moduleQuizScores: Record<string, number>; // moduleId -> percentage
  moduleChallengeStatus: Record<string, boolean>; // moduleId -> true if solved
  savedCodeSubmissions: Record<string, string>; // moduleId -> user code
  xp: number;
  unlockedTiers: number[];
  startedAt: string;
  lastActiveAt: string;
  blazorAppState?: BlazorLiveAppState;
}
