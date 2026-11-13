import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { BlazorLiveAppState, StudentProgress, TrackId } from '../types';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { BLAZOR_TIERS, BlazorProjectTier } from '../data/blazorProject';

interface AcademicContextType {
  studentName: string;
  setStudentName: (name: string) => void;
  progress: StudentProgress;
  currentTrackId: TrackId;
  setCurrentTrackId: (trackId: TrackId) => void;
  currentModuleId: string;
  setCurrentModuleId: (moduleId: string) => void;
  currentView: 'curriculum' | 'theory' | 'quiz' | 'challenge' | 'blazor_project' | 'certificate';
  setCurrentView: (view: 'curriculum' | 'theory' | 'quiz' | 'challenge' | 'blazor_project' | 'certificate') => void;
  selectModule: (moduleId: string, view?: 'theory' | 'quiz' | 'challenge') => void;
  submitQuiz: (moduleId: string, scorePercentage: number) => void;
  completeChallenge: (moduleId: string, code: string) => void;
  saveCode: (moduleId: string, code: string) => void;
  resetProgress: () => void;
  // Blazor App State Persistence
  blazorState: BlazorLiveAppState;
  updateBlazorState: (updater: Partial<BlazorLiveAppState> | ((prev: BlazorLiveAppState) => BlazorLiveAppState)) => void;
  // Backup Export / Import
  exportProgressJSON: () => void;
  importProgressJSON: (jsonString: string) => boolean;
  lastSavedAt: string;
  // Computed helpers
  progressPercentage: number;
  currentTier: BlazorProjectTier;
  academicRank: string;
  trackProgress: Record<TrackId, { completed: number; total: number; percentage: number }>;
  isModuleCompleted: (moduleId: string) => boolean;
}

const STORAGE_KEY = 'edifica_net_academic_progress_v2';

const DEFAULT_BLAZOR_STATE: BlazorLiveAppState = {
  enrolledCourseCodes: ['CS101'],
  notifications: [
    '[10:00] Runtime Blazor WebAssembly .NET 9 inicializado.',
    '[10:02] Disciplina CS101 matriculada no plano de estudos.'
  ],
  formNome: 'Mariana Costa',
  formEmail: 'mariana.costa@universidade.edu.br',
  formCpf: '12345678901',
  formTermos: true,
  uploadedDocs: [
    'TCC_Final_MarianaCosta.pdf (2.4 MB)',
    'Historico_Escolar_Oficial.pdf (480 KB)'
  ],
  activeAppPage: 'home'
};

const INITIAL_PROGRESS: StudentProgress = {
  studentName: 'Acadêmico .NET',
  completedModuleIds: [],
  moduleQuizScores: {},
  moduleChallengeStatus: {},
  savedCodeSubmissions: {},
  xp: 0,
  unlockedTiers: [0],
  startedAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
  blazorAppState: DEFAULT_BLAZOR_STATE
};

const AcademicContext = createContext<AcademicContextType | null>(null);

export const AcademicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_PROGRESS,
          ...parsed,
          blazorAppState: {
            ...DEFAULT_BLAZOR_STATE,
            ...(parsed.blazorAppState || {})
          }
        };
      }
    } catch (e) {
      console.warn('Erro ao restaurar progresso salvo', e);
    }
    return INITIAL_PROGRESS;
  });

  const [currentTrackId, setCurrentTrackId] = useState<TrackId>('fundamentos');
  const [currentModuleId, setCurrentModuleId] = useState<string>('fund-01-brick-to-code');
  const [currentView, setCurrentView] = useState<'curriculum' | 'theory' | 'quiz' | 'challenge' | 'blazor_project' | 'certificate'>('curriculum');
  const [lastSavedAt, setLastSavedAt] = useState<string>('Agora');

  // Sync to localStorage on every state change with timestamp
  useEffect(() => {
    try {
      const dataToSave = {
        ...progress,
        lastActiveAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      const now = new Date();
      setLastSavedAt(`${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`);
    } catch (e) {
      console.error('Falha ao gravar no localStorage', e);
    }
  }, [progress]);

  const blazorState = progress.blazorAppState || DEFAULT_BLAZOR_STATE;

  const updateBlazorState = (updater: Partial<BlazorLiveAppState> | ((prev: BlazorLiveAppState) => BlazorLiveAppState)) => {
    setProgress(prev => {
      const currentState = prev.blazorAppState || DEFAULT_BLAZOR_STATE;
      const nextState = typeof updater === 'function' ? updater(currentState) : { ...currentState, ...updater };
      return {
        ...prev,
        blazorAppState: nextState
      };
    });
  };

  const setStudentName = (name: string) => {
    setProgress(prev => ({ ...prev, studentName: name }));
  };

  const selectModule = (moduleId: string, view: 'theory' | 'quiz' | 'challenge' = 'theory') => {
    const mod = CURRICULUM_MODULES.find(m => m.id === moduleId);
    if (mod) {
      setCurrentModuleId(moduleId);
      setCurrentTrackId(mod.trackId);
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const checkTierUnlocks = (newCompletedIds: string[]) => {
    const percentage = Math.round((newCompletedIds.length / CURRICULUM_MODULES.length) * 100);
    const availableTiers = BLAZOR_TIERS.filter(t => percentage >= t.minProgressPercentage).map(t => t.tierNumber);
    return availableTiers;
  };

  const fireCelebration = (highIntensity = false) => {
    try {
      if (highIntensity) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 }
        });
      }
    } catch {
      // ignore
    }
  };

  const submitQuiz = (moduleId: string, scorePercentage: number) => {
    setProgress(prev => {
      const updatedScores = { ...prev.moduleQuizScores, [moduleId]: scorePercentage };
      const challengeDone = !!prev.moduleChallengeStatus[moduleId];

      const isNowComplete = scorePercentage >= 60 && (challengeDone || prev.completedModuleIds.includes(moduleId));
      let newCompleted = [...prev.completedModuleIds];
      let xpEarned = scorePercentage >= 80 ? 150 : 100;

      if (isNowComplete && !newCompleted.includes(moduleId)) {
        newCompleted.push(moduleId);
        xpEarned += 200;
        fireCelebration(true);
      } else {
        fireCelebration(false);
      }

      const unlockedTiers = checkTierUnlocks(newCompleted);

      return {
        ...prev,
        moduleQuizScores: updatedScores,
        completedModuleIds: newCompleted,
        xp: prev.xp + xpEarned,
        unlockedTiers
      };
    });
  };

  const completeChallenge = (moduleId: string, code: string) => {
    setProgress(prev => {
      const updatedStatus = { ...prev.moduleChallengeStatus, [moduleId]: true };
      const updatedCode = { ...prev.savedCodeSubmissions, [moduleId]: code };

      let newCompleted = [...prev.completedModuleIds];
      let xpBonus = 250;

      if (!newCompleted.includes(moduleId)) {
        newCompleted.push(moduleId);
        xpBonus += 150;
        fireCelebration(true);
      } else {
        fireCelebration(false);
      }

      const unlockedTiers = checkTierUnlocks(newCompleted);

      return {
        ...prev,
        moduleChallengeStatus: updatedStatus,
        savedCodeSubmissions: updatedCode,
        completedModuleIds: newCompleted,
        xp: prev.xp + xpBonus,
        unlockedTiers
      };
    });
  };

  const saveCode = (moduleId: string, code: string) => {
    setProgress(prev => ({
      ...prev,
      savedCodeSubmissions: {
        ...prev.savedCodeSubmissions,
        [moduleId]: code
      }
    }));
  };

  const exportProgressJSON = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `edifica_net_backup_${progress.studentName.replace(/\s+/g, '_')}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error('Falha ao exportar backup JSON', e);
    }
  };

  const importProgressJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed.xp === 'number' && Array.isArray(parsed.completedModuleIds)) {
        setProgress(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        fireCelebration(true);
        return true;
      }
    } catch (e) {
      console.error('Falha ao importar JSON', e);
    }
    return false;
  };

  const resetProgress = () => {
    const fresh: StudentProgress = {
      studentName: progress.studentName || 'Acadêmico .NET',
      completedModuleIds: [],
      moduleQuizScores: {},
      moduleChallengeStatus: {},
      savedCodeSubmissions: {},
      xp: 0,
      unlockedTiers: [0],
      startedAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
      blazorAppState: DEFAULT_BLAZOR_STATE
    };
    setProgress(fresh);
    localStorage.removeItem(STORAGE_KEY);
    setCurrentModuleId('fund-01-brick-to-code');
    setCurrentTrackId('fundamentos');
    setCurrentView('curriculum');
  };

  const progressPercentage = Math.round((progress.completedModuleIds.length / CURRICULUM_MODULES.length) * 100);
  const highestTierNum = Math.max(...progress.unlockedTiers, 0);
  const currentTier = BLAZOR_TIERS.find(t => t.tierNumber === highestTierNum) || BLAZOR_TIERS[0];

  const getAcademicRank = (percentage: number) => {
    if (percentage >= 100) return 'Arquiteto .NET & Cloud Master';
    if (percentage >= 80) return 'Engenheiro de Software Sênior .NET';
    if (percentage >= 60) return 'Especialista Full-Stack Blazor';
    if (percentage >= 40) return 'Desenvolvedor .NET Intermediário';
    if (percentage >= 20) return 'Ajudante Técnico de Programação';
    return 'Aprendiz de Engenharia de Software';
  };

  const academicRank = getAcademicRank(progressPercentage);

  const tracks: TrackId[] = ['fundamentos', 'csharp', 'blazor', 'aspnet_azure'];
  const trackProgress = tracks.reduce((acc, tId) => {
    const modulesInTrack = CURRICULUM_MODULES.filter(m => m.trackId === tId);
    const completedInTrack = modulesInTrack.filter(m => progress.completedModuleIds.includes(m.id)).length;
    acc[tId] = {
      completed: completedInTrack,
      total: modulesInTrack.length,
      percentage: modulesInTrack.length > 0 ? Math.round((completedInTrack / modulesInTrack.length) * 100) : 0
    };
    return acc;
  }, {} as Record<TrackId, { completed: number; total: number; percentage: number }>);

  const isModuleCompleted = (moduleId: string) => progress.completedModuleIds.includes(moduleId);

  return (
    <AcademicContext.Provider
      value={{
        studentName: progress.studentName,
        setStudentName,
        progress,
        currentTrackId,
        setCurrentTrackId,
        currentModuleId,
        setCurrentModuleId,
        currentView,
        setCurrentView,
        selectModule,
        submitQuiz,
        completeChallenge,
        saveCode,
        resetProgress,
        blazorState,
        updateBlazorState,
        exportProgressJSON,
        importProgressJSON,
        lastSavedAt,
        progressPercentage,
        currentTier,
        academicRank,
        trackProgress,
        isModuleCompleted
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
};

export const useAcademic = () => {
  const ctx = useContext(AcademicContext);
  if (!ctx) {
    throw new Error('useAcademic must be used within an AcademicProvider');
  }
  return ctx;
};
