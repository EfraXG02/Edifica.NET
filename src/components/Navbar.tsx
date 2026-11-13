import React, { useState, useRef } from 'react';
import { useAcademic } from '../context/AcademicContext';
import { Logo } from './Logo';
import { Award, BookOpen, Check, Code2, Cpu, Download, HardDrive, RotateCcw, Upload, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    progressPercentage,
    currentTier,
    progress,
    studentName,
    setStudentName,
    exportProgressJSON,
    importProgressJSON,
    lastSavedAt,
    resetProgress
  } = useAcademic();

  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(studentName);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      setStudentName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) {
          const success = importProgressJSON(content);
          if (success) {
            setImportStatus('Backup restaurado com sucesso!');
            setTimeout(() => {
              setShowBackupModal(false);
              setImportStatus(null);
            }, 1200);
          } else {
            setImportStatus('Arquivo JSON inválido. Verifique o formato.');
          }
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/95 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3">
          {/* Zone 1: Distinctive Brand Mark */}
          <button
            onClick={() => setCurrentView('curriculum')}
            className="text-left focus:outline-none shrink-0"
          >
            <Logo size="md" showTagline={false} />
          </button>

          {/* Zone 2: 4 Single-line Clean Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => setCurrentView('curriculum')}
              className={`whitespace-nowrap transition-colors flex items-center gap-2 ${
                currentView === 'curriculum' || currentView === 'theory' || currentView === 'quiz' || currentView === 'challenge'
                  ? 'text-white underline underline-offset-8 decoration-indigo-500 decoration-2 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Trilhas de Estudo</span>
            </button>

            <button
              onClick={() => setCurrentView('blazor_project')}
              className={`whitespace-nowrap transition-colors flex items-center gap-2 ${
                currentView === 'blazor_project'
                  ? 'text-white underline underline-offset-8 decoration-cyan-500 decoration-2 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Projeto Blazor Vivo</span>
            </button>

            <button
              onClick={() => setCurrentView('challenge')}
              className={`whitespace-nowrap transition-colors flex items-center gap-2 ${
                currentView === 'challenge'
                  ? 'text-white underline underline-offset-8 decoration-emerald-500 decoration-2 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>Laboratório de Código</span>
            </button>

            <button
              onClick={() => setCurrentView('certificate')}
              className={`whitespace-nowrap transition-colors flex items-center gap-2 ${
                currentView === 'certificate'
                  ? 'text-white underline underline-offset-8 decoration-amber-500 decoration-2 font-semibold'
                  : 'hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Certificado Oficial</span>
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action & Storage Status */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Storage Persistence Indicator */}
            <button
              onClick={() => setShowBackupModal(true)}
              title="Memória persistente no navegador ativa. Clique para gerenciar backups."
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-md hover:bg-emerald-900/40 transition-colors"
            >
              <HardDrive className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Memória Ativa ({lastSavedAt})</span>
            </button>

            {/* Unboxed Metadata */}
            <div className="hidden xl:flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="text-indigo-400 font-semibold tabular-nums">{progress.xp} XP</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="tabular-nums">{progressPercentage}%</span>
            </div>

            {/* Student Name */}
            {isEditingName ? (
              <form onSubmit={handleSaveName} className="flex items-center gap-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={e => setTempName(e.target.value)}
                  className="px-2 py-1 text-xs bg-slate-800 border border-slate-700 rounded text-slate-100 focus:outline-none focus:border-indigo-500 w-28"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-1 text-xs bg-indigo-600 text-white rounded font-medium"
                >
                  OK
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                title="Clique para editar seu nome de aluno"
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700 transition-colors whitespace-nowrap"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="max-w-[110px] truncate">{studentName}</span>
              </button>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => setCurrentView('blazor_project')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Projeto Vivo
            </button>
          </div>
        </div>
      </header>

      {/* Persistence & Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Memória Local &amp; Backups</h3>
              </div>
              <button
                onClick={() => setShowBackupModal(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Fechar
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Todos os seus dados (módulos concluídos, notas nos quizzes, códigos salvos, progresso do projeto Blazor e documentos) estão <strong>salvos na memória permanente deste navegador</strong>. Mesmo que você feche a aba ou reinicie o computador, nada se perde.
            </p>

            {importStatus && (
              <div className={`p-2.5 rounded-lg text-xs font-medium border ${
                importStatus.includes('sucesso')
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
              }`}>
                {importStatus}
              </div>
            )}

            <div className="space-y-3 pt-1">
              <button
                onClick={exportProgressJSON}
                className="w-full p-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs font-semibold text-white flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Baixar Arquivo de Backup (.json)</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Salvar cópia</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full p-3 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 rounded-xl text-xs font-semibold text-white flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Upload className="w-4 h-4 text-emerald-400" />
                  <span>Restaurar Backup do Computador</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Subir .json</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    if (confirm('Tem certeza de que deseja apagar todo o progresso e reiniciar os estudos do zero?')) {
                      resetProgress();
                      setShowBackupModal(false);
                    }
                  }}
                  className="text-xs text-rose-400 hover:text-rose-300 underline font-medium flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar todo o progresso do zero</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
