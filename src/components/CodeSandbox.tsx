import React, { useState, useEffect } from 'react';
import { useAcademic } from '../context/AcademicContext';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { ArrowLeft, CheckCircle2, ChevronDown, ChevronRight, Code2, Eye, HelpCircle, Play, RotateCcw, Sparkles, XCircle } from 'lucide-react';

export const CodeSandbox: React.FC = () => {
  const { currentModuleId, selectModule, completeChallenge, saveCode, progress, setCurrentView } = useAcademic();

  const moduleData = CURRICULUM_MODULES.find(m => m.id === currentModuleId) || CURRICULUM_MODULES[0];
  const challenge = moduleData.challenge;

  const [code, setCode] = useState<string>(() => {
    return progress.savedCodeSubmissions[moduleData.id] || challenge.starterCode;
  });

  const [testResults, setTestResults] = useState<{ name: string; passed: boolean; message: string }[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeHintIndex, setActiveHintIndex] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  // Update code when module changes
  useEffect(() => {
    setCode(progress.savedCodeSubmissions[moduleData.id] || challenge.starterCode);
    setTestResults(null);
    setShowSolution(false);
    setActiveHintIndex(null);
  }, [moduleData.id, challenge.starterCode, progress.savedCodeSubmissions]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCode(val);
    saveCode(moduleData.id, val);
  };

  const handleRunTests = () => {
    setIsRunning(true);
    setTestResults(null);

    setTimeout(() => {
      const results = challenge.testCases.map(tc => {
        const res = tc.validator(code);
        return {
          name: tc.name,
          passed: res.passed,
          message: res.message
        };
      });

      setTestResults(results);
      setIsRunning(false);

      const allPassed = results.every(r => r.passed);
      if (allPassed) {
        completeChallenge(moduleData.id, code);
      }
    }, 400);
  };

  const handleResetCode = () => {
    setCode(challenge.starterCode);
    saveCode(moduleData.id, challenge.starterCode);
    setTestResults(null);
  };

  const allTestsPassed = testResults && testResults.length > 0 && testResults.every(r => r.passed);
  const alreadyCompleted = !!progress.moduleChallengeStatus[moduleData.id];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => selectModule(moduleData.id, 'theory')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à Teoria: {moduleData.title}</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-mono">
            Status: <strong className={alreadyCompleted ? 'text-emerald-400' : 'text-amber-400'}>{alreadyCompleted ? 'Resolvido' : 'Pendente'}</strong>
          </span>

          <button
            onClick={handleResetCode}
            className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
            title="Restaurar código esqueleto inicial"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Main 2-Zone Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Challenge Brief & Hints (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                <span>DESAFIO DE CÓDIGO</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{moduleData.level}</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                {challenge.title}
              </h2>
            </div>

            <div className="text-xs text-slate-300 space-y-2 whitespace-pre-line leading-relaxed">
              {challenge.instructions}
            </div>

            {/* Impact on Blazor project banner */}
            <div className="p-3.5 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-xs text-cyan-200 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Impacto no Projeto Blazor:</span>
              </div>
              <p className="text-xs text-slate-300">
                A aprovação nesta implementação desbloqueia o componente <strong>{moduleData.blazorImpact.componentName}</strong> no UniSphere.
              </p>
            </div>
          </div>

          {/* Progressive Hints Accordion */}
          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span>Dicas &amp; Solução Acadêmica</span>
            </h4>

            <div className="space-y-2">
              {challenge.hints.map((hint, idx) => {
                const isOpen = activeHintIndex === idx;
                return (
                  <div key={idx} className="border border-slate-700/80 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setActiveHintIndex(isOpen ? null : idx)}
                      className="w-full px-3 py-2 text-xs font-medium text-slate-300 bg-slate-900/60 hover:bg-slate-900 flex items-center justify-between text-left"
                    >
                      <span>Dica #{idx + 1}</span>
                      {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="p-3 text-xs text-slate-300 bg-slate-950/60 border-t border-slate-800 leading-relaxed">
                        {hint}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Reveal Solution Button */}
              <div className="pt-2">
                {!showSolution ? (
                  <button
                    onClick={() => setShowSolution(true)}
                    className="w-full px-3 py-2 text-xs text-slate-400 hover:text-slate-200 border border-dashed border-slate-700 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Ver Solução Comentada Modelo</span>
                  </button>
                ) : (
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 font-mono">Solução C# Modelo</span>
                      <button
                        onClick={() => setShowSolution(false)}
                        className="text-[11px] text-slate-400 hover:text-white"
                      >
                        Ocultar
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-emerald-300 overflow-x-auto p-2 bg-slate-900 rounded">
                      <code>{challenge.solutionCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Test Console (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl border border-slate-700 overflow-hidden bg-slate-950 shadow-lg">
            {/* Editor Toolbar */}
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>CodeLab.cs</span>
                <span className="text-slate-600">·</span>
                <span>C# 12 / .NET 9</span>
              </div>

              <button
                disabled={isRunning}
                onClick={handleRunTests}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isRunning ? 'Compilando...' : 'Compilar e Testar'}</span>
              </button>
            </div>

            {/* Code Input Area */}
            <div className="relative">
              <textarea
                value={code}
                onChange={handleCodeChange}
                rows={16}
                spellCheck={false}
                className="w-full p-4 font-mono text-xs leading-relaxed text-slate-100 bg-slate-950 border-0 focus:outline-none focus:ring-0 resize-y selection:bg-indigo-500/40"
                placeholder="// Escreva sua implementação C# aqui..."
              />
            </div>
          </div>

          {/* Test Results Output Console */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-slate-300">
                Console de Testes Unitários .NET
              </span>
              {testResults && (
                <span className={`text-xs font-bold ${allTestsPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {testResults.filter(r => r.passed).length}/{testResults.length} Testes Passaram
                </span>
              )}
            </div>

            {!testResults && !isRunning && (
              <p className="text-xs text-slate-500 py-3 italic">
                Clique em "Compilar e Testar" acima para avaliar sua implementação contra a suíte de testes acadêmicos.
              </p>
            )}

            {isRunning && (
              <div className="py-4 text-xs text-indigo-400 flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                <span>Executando asserções no sandbox...</span>
              </div>
            )}

            {testResults && (
              <div className="space-y-2.5 pt-1">
                {testResults.map((tr, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                      tr.passed
                        ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {tr.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold">{tr.name}:</span> {tr.message}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Success Next Step Banner */}
            {allTestsPassed && (
              <div className="mt-4 p-4 bg-emerald-900/40 rounded-xl border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Desafio concluído com sucesso! <strong>+400 XP</strong> e componente Blazor adicionado ao projeto vivo.
                  </span>
                </div>
                <button
                  onClick={() => setCurrentView('blazor_project')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  Abrir Projeto Blazor →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
