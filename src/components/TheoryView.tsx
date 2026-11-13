import React from 'react';
import { useAcademic } from '../context/AcademicContext';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Code, Compass, Hammer, HelpCircle, Lightbulb, Sparkles } from 'lucide-react';

export const TheoryView: React.FC = () => {
  const { currentModuleId, setCurrentView, selectModule, isModuleCompleted } = useAcademic();

  const moduleData = CURRICULUM_MODULES.find(m => m.id === currentModuleId) || CURRICULUM_MODULES[0];
  const completed = isModuleCompleted(moduleData.id);

  const currentIndex = CURRICULUM_MODULES.findIndex(m => m.id === moduleData.id);
  const prevModule = currentIndex > 0 ? CURRICULUM_MODULES[currentIndex - 1] : null;
  const nextModule = currentIndex < CURRICULUM_MODULES.length - 1 ? CURRICULUM_MODULES[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Navigation Strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('curriculum')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar às Trilhas</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => selectModule(moduleData.id, 'quiz')}
            className="px-3.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fazer Quiz</span>
          </button>

          <button
            onClick={() => selectModule(moduleData.id, 'challenge')}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Laboratório de Código</span>
          </button>
        </div>
      </div>

      {/* Main Theory Header */}
      <div className="space-y-3 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="text-indigo-400 font-bold">MÓDULO {moduleData.order.toString().padStart(2, '0')}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="uppercase text-slate-300">{moduleData.trackId}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{moduleData.level}</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>{moduleData.estimatedMinutes} min de leitura</span>
          {completed && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Módulo Concluído</span>
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-tight text-balance">
          {moduleData.title}
        </h1>

        <p className="text-base text-slate-300">
          {moduleData.subtitle}
        </p>

        {/* Academic Objective Box */}
        <div className="mt-4 p-4 bg-slate-800/80 rounded-xl border border-slate-700/80">
          <div className="flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 block mb-0.5">
                Competência Acadêmica Esperada
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {moduleData.academicObjective}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Life / Real World Analogy Box (For Everyone) */}
      {moduleData.realWorldAnalogy && (
        <div className="p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border-2 border-amber-500/40 space-y-3 shadow-lg">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
            <Hammer className="w-4 h-4 text-amber-400" />
            <span>Analogia do Dia a Dia (Para Entender de Primeira)</span>
          </div>

          <h3 className="text-lg font-bold text-white">
            {moduleData.realWorldAnalogy.headline}
          </h3>

          <p className="text-sm text-slate-200 leading-relaxed">
            {moduleData.realWorldAnalogy.analogyText}
          </p>

          <div className="pt-2 border-t border-amber-500/20 text-xs text-amber-300/90 flex items-start gap-2">
            <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Como isso se traduz no código:</strong> {moduleData.realWorldAnalogy.dailyLifeComparison}
            </span>
          </div>
        </div>
      )}

      {/* Theory Overview */}
      <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
        <p className="text-base text-slate-200">
          {moduleData.theory.overview}
        </p>
      </div>

      {/* Structured Theory Sections */}
      <div className="space-y-8">
        {moduleData.theory.sections.map((section, idx) => (
          <div key={idx} className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/80 space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              {section.title}
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              {section.content}
            </p>

            {section.codeSnippet && (
              <div className="mt-3 rounded-lg overflow-hidden border border-slate-700/90 bg-slate-950">
                <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{section.codeLanguage || 'csharp'}</span>
                  <span>C# / .NET 9</span>
                </div>
                <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                  <code>{section.codeSnippet}</code>
                </pre>
              </div>
            )}

            {section.keyTakeaway && (
              <div className="pt-2 text-xs text-indigo-300 flex items-start gap-2">
                <span className="font-bold text-indigo-400">Regra de Ouro:</span>
                <span>{section.keyTakeaway}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interview & Architecture Insights */}
      {moduleData.theory.interviewTip && (
        <div className="p-5 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-start gap-3.5">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Insight de Arquitetura &amp; Entrevistas Técnicas
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {moduleData.theory.interviewTip}
            </p>
          </div>
        </div>
      )}

      {/* Connection to the Living Blazor Project */}
      {moduleData.theory.blazorConnection && (
        <div className="p-5 bg-cyan-500/10 rounded-xl border border-cyan-500/20 flex items-start gap-3.5">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Aplicação Prática no Projeto Blazor Vivo
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              {moduleData.theory.blazorConnection}
            </p>
            <div className="pt-1 text-xs text-cyan-300 font-mono">
              Componente Desbloqueado: <strong>{moduleData.blazorImpact.componentName}</strong> (+{moduleData.blazorImpact.linesOfCodeAdded} linhas)
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Footer */}
      <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-400 block">Pronto para testar sua compreensão?</span>
          <h3 className="text-base font-bold text-white mt-0.5">Avance para o Quiz e o Desafio Prático</h3>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => selectModule(moduleData.id, 'quiz')}
            className="flex-1 sm:flex-none px-4 py-2.5 text-xs font-semibold text-indigo-300 bg-indigo-950 hover:bg-indigo-900 border border-indigo-800 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Iniciar Quiz ({moduleData.quiz.length} Questões)</span>
          </button>

          <button
            onClick={() => selectModule(moduleData.id, 'challenge')}
            className="flex-1 sm:flex-none px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Laboratório de Código</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Module Pager */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
        {prevModule ? (
          <button
            onClick={() => selectModule(prevModule.id, 'theory')}
            className="text-slate-400 hover:text-white flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior: {prevModule.title}</span>
          </button>
        ) : <div />}

        {nextModule && (
          <button
            onClick={() => selectModule(nextModule.id, 'theory')}
            className="text-slate-400 hover:text-white flex items-center gap-1.5 ml-auto"
          >
            <span>Próximo: {nextModule.title}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
