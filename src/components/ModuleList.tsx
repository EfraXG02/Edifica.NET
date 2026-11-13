import React from 'react';
import { useAcademic } from '../context/AcademicContext';
import { CURRICULUM_MODULES, TRACKS_METADATA } from '../data/curriculum';
import { TrackId } from '../types';
import { CheckCircle2, Clock, Code, FileText, Hammer, HelpCircle, Layers, Sparkles, Terminal, Cloud, ShieldAlert } from 'lucide-react';

export const ModuleList: React.FC = () => {
  const {
    currentTrackId,
    setCurrentTrackId,
    selectModule,
    isModuleCompleted,
    progress,
    trackProgress,
    currentTier,
    progressPercentage,
    setCurrentView
  } = useAcademic();

  const currentTrackMeta = TRACKS_METADATA.find(t => t.id === currentTrackId) || TRACKS_METADATA[0];
  const modulesInCurrentTrack = CURRICULUM_MODULES.filter(m => m.trackId === currentTrackId);

  const getTrackIcon = (id: TrackId) => {
    switch (id) {
      case 'fundamentos':
        return <Hammer className="w-4 h-4" />;
      case 'csharp':
        return <Terminal className="w-4 h-4" />;
      case 'blazor':
        return <Layers className="w-4 h-4" />;
      case 'aspnet_azure':
        return <Cloud className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner: Academic Track Context with Beginner Friendly Invitation */}
      <div className="p-8 bg-slate-800/90 rounded-2xl border border-slate-700/80 relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono">
            <span>PLATAFORMA INTEGRADA DE APRENDIZAGEM PRÁTICA</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>EDIFICA.NET &amp; BLAZOR ENTERPRISE</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white tracking-tight text-balance">
            Da Fundação da Obra ao Arquiteto Cloud .NET
          </h1>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
            Uma formação pensada para ser tão clara e acessível que qualquer pessoa — de operários e trabalhadores da indústria a graduandos — consegue aprender lógica e construir sistemas modernos. Conforme você aprende, seu <strong>projeto Blazor WebAssembly cresce em tempo real</strong>.
          </p>

          {/* Quick Stats Strip (Unboxed metadata, no pills) */}
          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Total de Módulos:</span>{' '}
              <strong className="text-slate-200 font-mono">{CURRICULUM_MODULES.length} Módulos</strong>
            </div>
            <span aria-hidden="true" className="text-slate-700">/</span>
            <div>
              <span className="text-slate-500">Status Geral:</span>{' '}
              <strong className="text-emerald-400 font-mono tabular-nums">{progress.completedModuleIds.length}/{CURRICULUM_MODULES.length} Concluídos ({progressPercentage}%)</strong>
            </div>
            <span aria-hidden="true" className="text-slate-700">/</span>
            <div>
              <span className="text-slate-500">Nível do Projeto Blazor:</span>{' '}
              <strong className="text-cyan-400 font-mono">{currentTier.name}</strong>
            </div>
          </div>
        </div>

        {/* Dynamic Project Growth Callout */}
        <div className="mt-6 pt-5 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              O seu <strong>Projeto Blazor UniSphere</strong> cresce e desbloqueia novos componentes conforme você conclui quizzes e desafios.
            </span>
          </div>
          <button
            onClick={() => setCurrentView('blazor_project')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4 whitespace-nowrap self-start sm:self-auto"
          >
            Inspecionar código Blazor gerado →
          </button>
        </div>
      </div>

      {/* Segmented Track Switcher (4 Tracks now including Fundamentos Zero) */}
      <div className="p-1.5 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {TRACKS_METADATA.map(track => {
          const stats = trackProgress[track.id] || { completed: 0, total: 0, percentage: 0 };
          const isSelected = track.id === currentTrackId;

          return (
            <button
              key={track.id}
              onClick={() => setCurrentTrackId(track.id)}
              className={`p-4 rounded-lg text-left transition-all ${
                isSelected
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold truncate">
                  <span className={isSelected ? 'text-indigo-400' : 'text-slate-400'}>
                    {getTrackIcon(track.id)}
                  </span>
                  <span className="truncate">{track.title}</span>
                </div>
                <span className="text-xs font-mono tabular-nums text-slate-400 shrink-0 ml-1">
                  {stats.completed}/{stats.total}
                </span>
              </div>

              <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                {track.tagline}
              </p>

              {/* Minimal Progress Bar */}
              <div className="w-full bg-slate-950 h-1 rounded-full mt-3 overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Track Description Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span>{currentTrackMeta.title}</span>
            <span className="text-xs text-slate-500 font-normal">·</span>
            <span className="text-xs text-slate-400 font-normal">
              {modulesInCurrentTrack.length} Módulos Pedagógicos
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            {currentTrackMeta.description}
          </p>
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {modulesInCurrentTrack.map((mod) => {
          const completed = isModuleCompleted(mod.id);
          const quizScore = progress.moduleQuizScores[mod.id];
          const challengeSolved = !!progress.moduleChallengeStatus[mod.id];

          return (
            <div
              key={mod.id}
              className={`p-6 bg-slate-800/80 rounded-xl border transition-all ${
                completed
                  ? 'border-emerald-500/40 hover:border-emerald-500/60'
                  : 'border-slate-700/80 hover:border-slate-600'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Left Side: Module Info */}
                <div className="space-y-2 flex-1">
                  {/* Unboxed Metadata Header */}
                  <div className="flex items-center gap-2.5 text-xs text-slate-400 font-mono">
                    <span className="text-indigo-400 font-bold">MÓDULO {mod.order.toString().padStart(2, '0')}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-slate-300">{mod.level}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" />
                      <span>{mod.estimatedMinutes} min</span>
                    </span>
                    {completed && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Concluído</span>
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-300">
                    {mod.subtitle}
                  </p>

                  {/* Real World Analogy Pill/Preview */}
                  {mod.realWorldAnalogy && (
                    <div className="text-xs text-amber-300/90 flex items-center gap-2 pt-1 font-sans">
                      <Hammer className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>
                        <strong>Analogia:</strong> {mod.realWorldAnalogy.headline}
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 leading-relaxed max-w-3xl pt-1">
                    <strong className="text-slate-300">Objetivo:</strong> {mod.academicObjective}
                  </p>

                  {/* Impact on Blazor Project */}
                  <div className="pt-2 flex items-center gap-2 text-xs text-cyan-400 font-mono">
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      Impacto Blazor: Desbloqueia <strong>{mod.blazorImpact.componentName}</strong> (+{mod.blazorImpact.linesOfCodeAdded} linhas)
                    </span>
                  </div>
                </div>

                {/* Right Side: Status and Actions */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 shrink-0 border-t lg:border-t-0 border-slate-700/60 pt-4 lg:pt-0">
                  {/* Status Indicators */}
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Quiz:</span>
                      <strong className={quizScore !== undefined ? 'text-indigo-400 font-mono' : 'text-slate-500 font-mono'}>
                        {quizScore !== undefined ? `${quizScore}%` : 'Pendente'}
                      </strong>
                    </div>

                    <span aria-hidden="true" className="text-slate-700">·</span>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Code className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Desafio:</span>
                      <strong className={challengeSolved ? 'text-emerald-400 font-mono' : 'text-slate-500 font-mono'}>
                        {challengeSolved ? 'Resolvido' : 'Pendente'}
                      </strong>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => selectModule(mod.id, 'theory')}
                      className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Teoria</span>
                    </button>

                    <button
                      onClick={() => selectModule(mod.id, 'quiz')}
                      className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Quiz ({mod.quiz.length})</span>
                    </button>

                    <button
                      onClick={() => selectModule(mod.id, 'challenge')}
                      className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Code className="w-3.5 h-3.5" />
                      <span>Desafio</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
