import React, { useState } from 'react';
import { useAcademic } from '../context/AcademicContext';
import { BLAZOR_PROJECT_FILES, BLAZOR_TIERS } from '../data/blazorProject';
import { BlazorFile } from '../types';
import {
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  FileCode,
  Layers,
  Lock,
  Play,
  Search,
  Sparkles,
  Upload
} from 'lucide-react';

export const BlazorProjectViewer: React.FC = () => {
  const { progress, currentTier, progressPercentage, setCurrentView, blazorState, updateBlazorState } = useAcademic();

  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'roadmap'>('preview');
  const [selectedFile, setSelectedFile] = useState<BlazorFile>(BLAZOR_PROJECT_FILES[0]);
  const [copied, setCopied] = useState(false);

  // Local UI filters and feedback
  const [courseFilter, setCourseFilter] = useState('');
  const [formSubmittedMsg, setFormSubmittedMsg] = useState('');
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [newDocName, setNewDocName] = useState('');

  const highestUnlockedTierNumber = Math.max(...progress.unlockedTiers, 0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnrollCourse = (code: string) => {
    if (!blazorState.enrolledCourseCodes.includes(code)) {
      const nowStr = new Date().toLocaleTimeString().slice(0, 5);
      updateBlazorState(prev => ({
        ...prev,
        enrolledCourseCodes: [...prev.enrolledCourseCodes, code],
        notifications: [`[${nowStr}] Matrícula realizada em ${code}!`, ...prev.notifications]
      }));
    }
  };

  const handleRemoveCourse = (code: string) => {
    const nowStr = new Date().toLocaleTimeString().slice(0, 5);
    updateBlazorState(prev => ({
      ...prev,
      enrolledCourseCodes: prev.enrolledCourseCodes.filter(c => c !== code),
      notifications: [`[${nowStr}] Matrícula cancelada em ${code}.`, ...prev.notifications]
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blazorState.formCpf.length !== 11) {
      setFormSubmittedMsg('Erro de validação: O CPF deve possuir exatamente 11 dígitos numéricos.');
      return;
    }
    if (!blazorState.formTermos) {
      setFormSubmittedMsg('Erro de validação: Você deve aceitar os termos acadêmicos.');
      return;
    }

    const nowStr = new Date().toLocaleTimeString().slice(0, 5);
    setFormSubmittedMsg(`Sucesso! Matrícula de ${blazorState.formNome} efetivada no sistema via EditForm & DataAnnotations.`);
    updateBlazorState(prev => ({
      ...prev,
      notifications: [`[${nowStr}] Requerimento de matrícula aprovado para ${prev.formNome}.`, ...prev.notifications]
    }));
  };

  const handleCallApi = (endpoint: string) => {
    setApiLoading(true);
    setApiResponse(null);
    setTimeout(() => {
      setApiLoading(false);
      if (endpoint === 'GET_COURSES') {
        setApiResponse(JSON.stringify([
          { codigo: 'CS101', titulo: 'Algoritmos & Estruturas de Dados', creditos: 4, vagasDisponiveis: 6 },
          { codigo: 'CS204', titulo: 'Arquitetura de Sistemas .NET & Blazor', creditos: 6, vagasDisponiveis: 5 },
          { codigo: 'DB302', titulo: 'Bancos de Dados Relacionais & EF Core', creditos: 4, vagasDisponiveis: 0 },
          { codigo: 'CL405', titulo: 'Arquitetura Cloud & DevOps com Azure', creditos: 4, vagasDisponiveis: 6 }
        ], null, 2));
      } else {
        setApiResponse(JSON.stringify({
          status: '201 Created',
          protocolo: 'MATR-' + Math.floor(100000 + Math.random() * 900000),
          data: new Date().toISOString(),
          aluno: blazorState.formNome,
          totalDisciplinas: blazorState.enrolledCourseCodes.length,
          endpoint: '/api/academic/enrollment'
        }, null, 2));
      }
    }, 400);
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDocName.trim()) {
      const nowStr = new Date().toLocaleTimeString().slice(0, 5);
      const docEntry = `${newDocName.trim()}.pdf (1.1 MB)`;
      updateBlazorState(prev => ({
        ...prev,
        uploadedDocs: [docEntry, ...prev.uploadedDocs],
        notifications: [`[${nowStr}] Upload para Azure Blob Storage concluído com sucesso.`, ...prev.notifications]
      }));
      setNewDocName('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Stage Overview */}
      <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700/80 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Cpu className="w-3.5 h-3.5" />
            <span>PROJETO VIVO INCREMENTAL COM MEMÓRIA PERSISTENTE</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>UNISPHERE ACADEMIC ENTERPRISE</span>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            UniSphere: Aplicação Real Blazor WebAssembly
          </h1>

          <p className="text-xs text-slate-300 max-w-2xl">
            Conforme você evolui pelos módulos acadêmicos de C#, Blazor e Azure, novos componentes, serviços e telas são compilados e adicionados ao projeto abaixo. Todas as suas ações aqui são <strong>salvas automaticamente na memória do navegador</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
            <span>Nível Atual: <strong className="text-cyan-400 font-bold">{currentTier.name}</strong></span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Arquivos Desbloqueados: <strong className="text-white font-bold">{BLAZOR_PROJECT_FILES.filter(f => f.tierRequired <= highestUnlockedTierNumber).length}/{BLAZOR_PROJECT_FILES.length}</strong></span>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <span>Progresso da Solução: <strong className="text-emerald-400 font-bold tabular-nums">{progressPercentage}%</strong></span>
          </div>
        </div>

        {/* View Segmented Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 self-start lg:self-center">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Executar Projeto</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Explorar Código Fonte</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Roadmap de Evolução</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MODE 1: LIVE INTERACTIVE BLAZOR WEB SIMULATOR            */}
      {/* ======================================================== */}
      {activeTab === 'preview' && (
        <div className="rounded-2xl border border-slate-700 overflow-hidden bg-slate-950 shadow-2xl">
          {/* Simulated Browser Chrome / Top Bar */}
          <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-slate-600 ml-2">|</span>
              <span className="text-slate-300">https://unisphere.internal.campus/app</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-indigo-400">Blazor WebAssembly .NET 9.0 JIT</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400">● Interactive Client (Memória Ativa)</span>
            </div>
          </div>

          {/* Simulated Blazor App Shell */}
          <div className="flex flex-col min-h-[560px] bg-slate-900 text-slate-100">
            {/* Blazor App Header */}
            <div className="h-14 border-b border-slate-800 bg-slate-900/90 px-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-indigo-400 tracking-wider">UNISPHERE</span>
                <span className="text-xs text-slate-500">·</span>
                <span className="text-xs text-slate-400">Portal Acadêmico Integrado</span>
              </div>

              {/* Navigation in Blazor App */}
              <div className="flex items-center gap-4 text-xs">
                <button
                  onClick={() => updateBlazorState({ activeAppPage: 'home' })}
                  className={`transition-colors ${blazorState.activeAppPage === 'home' ? 'text-indigo-400 font-bold underline' : 'text-slate-400 hover:text-white'}`}
                >
                  Geral
                </button>

                <button
                  onClick={() => {
                    if (highestUnlockedTierNumber >= 1) updateBlazorState({ activeAppPage: 'courses' });
                  }}
                  className={`transition-colors flex items-center gap-1 ${
                    highestUnlockedTierNumber < 1
                      ? 'text-slate-600 cursor-not-allowed'
                      : blazorState.activeAppPage === 'courses'
                      ? 'text-indigo-400 font-bold underline'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {highestUnlockedTierNumber < 1 && <Lock className="w-3 h-3" />}
                  <span>Cursos</span>
                </button>

                <button
                  onClick={() => {
                    if (highestUnlockedTierNumber >= 2) updateBlazorState({ activeAppPage: 'enrollment' });
                  }}
                  className={`transition-colors flex items-center gap-1 ${
                    highestUnlockedTierNumber < 2
                      ? 'text-slate-600 cursor-not-allowed'
                      : blazorState.activeAppPage === 'enrollment'
                      ? 'text-indigo-400 font-bold underline'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {highestUnlockedTierNumber < 2 && <Lock className="w-3 h-3" />}
                  <span>Matrícula</span>
                </button>

                <button
                  onClick={() => {
                    if (highestUnlockedTierNumber >= 3) updateBlazorState({ activeAppPage: 'state' });
                  }}
                  className={`transition-colors flex items-center gap-1 ${
                    highestUnlockedTierNumber < 3
                      ? 'text-slate-600 cursor-not-allowed'
                      : blazorState.activeAppPage === 'state'
                      ? 'text-indigo-400 font-bold underline'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {highestUnlockedTierNumber < 3 && <Lock className="w-3 h-3" />}
                  <span>Notificações</span>
                </button>

                <button
                  onClick={() => {
                    if (highestUnlockedTierNumber >= 4) updateBlazorState({ activeAppPage: 'api' });
                  }}
                  className={`transition-colors flex items-center gap-1 ${
                    highestUnlockedTierNumber < 4
                      ? 'text-slate-600 cursor-not-allowed'
                      : blazorState.activeAppPage === 'api'
                      ? 'text-indigo-400 font-bold underline'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {highestUnlockedTierNumber < 4 && <Lock className="w-3 h-3" />}
                  <span>API REST</span>
                </button>

                <button
                  onClick={() => {
                    if (highestUnlockedTierNumber >= 5) updateBlazorState({ activeAppPage: 'cloud' });
                  }}
                  className={`transition-colors flex items-center gap-1 ${
                    highestUnlockedTierNumber < 5
                      ? 'text-slate-600 cursor-not-allowed'
                      : blazorState.activeAppPage === 'cloud'
                      ? 'text-indigo-400 font-bold underline'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {highestUnlockedTierNumber < 5 && <Lock className="w-3 h-3" />}
                  <span>Azure Cloud</span>
                </button>
              </div>

              {/* State Summary Badge */}
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-400">Matrículas:</span>
                <span className="text-indigo-400 font-bold">{blazorState.enrolledCourseCodes.length}</span>
              </div>
            </div>

            {/* Blazor App Body Container */}
            <div className="p-6 flex-1">
              {/* PAGE 1: HOME */}
              {blazorState.activeAppPage === 'home' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="p-6 bg-slate-800/80 rounded-xl border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-2">Painel Acadêmico UniSphere</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Aplicação Blazor WebAssembly com arquitetura em camadas. O seu progresso nos módulos desbloqueou o Tier {highestUnlockedTierNumber}.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800">
                        <span className="text-[11px] text-slate-400 uppercase font-mono">Disciplinas Ativas</span>
                        <p className="text-xl font-bold text-indigo-400 font-mono mt-1">{blazorState.enrolledCourseCodes.length}</p>
                      </div>

                      <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800">
                        <span className="text-[11px] text-slate-400 uppercase font-mono">Créditos Acumulados</span>
                        <p className="text-xl font-bold text-cyan-400 font-mono mt-1">{blazorState.enrolledCourseCodes.length * 4} h/aula</p>
                      </div>

                      <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800">
                        <span className="text-[11px] text-slate-400 uppercase font-mono">Estado do Host</span>
                        <p className="text-xl font-bold text-emerald-400 font-mono mt-1">Conectado (Memória OK)</p>
                      </div>
                    </div>
                  </div>

                  {highestUnlockedTierNumber < 5 && (
                    <div className="p-4 bg-slate-800/40 rounded-xl border border-dashed border-slate-700 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          Próximo desbloqueio: <strong>{BLAZOR_TIERS[highestUnlockedTierNumber + 1]?.name}</strong>
                        </span>
                      </div>
                      <button
                        onClick={() => setCurrentView('curriculum')}
                        className="text-indigo-400 hover:text-indigo-300 font-semibold"
                      >
                        Continuar Estudos →
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* PAGE 2: COURSES CATALOG (Tier 1+) */}
              {blazorState.activeAppPage === 'courses' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Catálogo de Disciplinas (LINQ + Records)</h3>
                      <p className="text-xs text-slate-400">Filtragem em tempo real sobre IEnumerable com two-way data binding</p>
                    </div>

                    <div className="relative w-full sm:w-72">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={courseFilter}
                        onChange={e => setCourseFilter(e.target.value)}
                        placeholder="Filtrar por nome ou código..."
                        className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { code: 'CS101', title: 'Algoritmos & Estruturas de Dados', depto: 'Computação', credits: 4, prof: 'Dr. Alan Santos', desc: 'Grafos, árvores binárias, complexidade assintótica O(n) e algoritmos gulosos.' },
                      { code: 'CS204', title: 'Arquitetura de Sistemas .NET & Blazor', depto: 'Engenharia', credits: 6, prof: 'Dra. Laura Mendes', desc: 'Componentização web moderna, WASM, Web APIs de alta performance e microsserviços.' },
                      { code: 'DB302', title: 'Bancos de Dados Relacionais & EF Core', depto: 'Sistemas', credits: 4, prof: 'Prof. Roberto Faria', desc: 'Modelagem relacional, ACID, Entity Framework Core e otimização de consultas SQL.' },
                      { code: 'CL405', title: 'Arquitetura Cloud & DevOps com Azure', depto: 'Engenharia', credits: 4, prof: 'Msc. Helena Rocha', desc: 'Azure App Services, Serverless, mensageria com Service Bus e pipelines CI/CD.' }
                    ]
                      .filter(c => !courseFilter || c.title.toLowerCase().includes(courseFilter.toLowerCase()) || c.code.toLowerCase().includes(courseFilter.toLowerCase()))
                      .map(c => {
                        const isEnrolled = blazorState.enrolledCourseCodes.includes(c.code);
                        return (
                          <div key={c.code} className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-xs font-mono font-bold text-indigo-400">{c.code}</span>
                                <h4 className="text-sm font-bold text-white mt-0.5">{c.title}</h4>
                                <p className="text-[11px] text-slate-400">Prof. {c.prof} · {c.depto}</p>
                              </div>
                              <span className="text-xs font-mono px-2 py-0.5 bg-slate-900 rounded border border-slate-700 text-slate-300">
                                {c.credits} créditos
                              </span>
                            </div>

                            <p className="text-xs text-slate-300 leading-relaxed">{c.desc}</p>

                            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between">
                              <span className="text-xs text-slate-400">Status: <strong className={isEnrolled ? 'text-emerald-400' : 'text-slate-400'}>{isEnrolled ? 'Matriculado' : 'Disponível'}</strong></span>
                              {isEnrolled ? (
                                <button
                                  onClick={() => handleRemoveCourse(c.code)}
                                  className="px-3 py-1 text-xs font-semibold text-rose-300 bg-rose-950 hover:bg-rose-900 border border-rose-800 rounded-lg transition-colors"
                                >
                                  Cancelar Matrícula
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleEnrollCourse(c.code)}
                                  className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
                                >
                                  Matricular-se
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* PAGE 3: ENROLLMENT FORM (Tier 2+) */}
              {blazorState.activeAppPage === 'enrollment' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-4">
                    <h3 className="text-lg font-bold text-white">Requerimento de Matrícula (EditForm &amp; DataAnnotations)</h3>

                    {formSubmittedMsg && (
                      <div className={`p-3 rounded-lg text-xs font-medium border ${
                        formSubmittedMsg.startsWith('Erro')
                          ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                          : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      }`}>
                        {formSubmittedMsg}
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Nome Completo</label>
                        <input
                          type="text"
                          value={blazorState.formNome}
                          onChange={e => updateBlazorState({ formNome: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">E-mail Acadêmico</label>
                          <input
                            type="email"
                            value={blazorState.formEmail}
                            onChange={e => updateBlazorState({ formEmail: e.target.value })}
                            className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">CPF (11 dígitos numéricos)</label>
                          <input
                            type="text"
                            maxLength={11}
                            value={blazorState.formCpf}
                            onChange={e => updateBlazorState({ formCpf: e.target.value })}
                            className="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="termos_checkbox"
                          checked={blazorState.formTermos}
                          onChange={e => updateBlazorState({ formTermos: e.target.checked })}
                          className="rounded border-slate-700 text-indigo-600 focus:ring-0"
                        />
                        <label htmlFor="termos_checkbox" className="text-xs text-slate-300">
                          Aceito os termos regimentais e regulamento acadêmico da instituição.
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
                      >
                        Submeter Requerimento via EditContext
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* PAGE 4: NOTIFICATIONS & STATE (Tier 3+) */}
              {blazorState.activeAppPage === 'state' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">Central de Estado Global (CampusStateContainer)</h3>
                      <button
                        onClick={() => updateBlazorState({ notifications: [] })}
                        className="text-xs text-slate-400 hover:text-white underline"
                      >
                        Limpar Log
                      </button>
                    </div>

                    <p className="text-xs text-slate-300">
                      Este componente está inscrito no evento C# <code>State.OnChange</code>. Qualquer mutação de estado em outras abas sincroniza instantaneamente aqui.
                    </p>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {blazorState.notifications.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-4">Nenhum evento registrado no contêiner.</p>
                      ) : (
                        blazorState.notifications.map((n, idx) => (
                          <div key={idx} className="p-2.5 text-xs font-mono bg-slate-900 rounded border border-slate-800 text-slate-300">
                            {n}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 5: MINIMAL APIS SWAGGER (Tier 4+) */}
              {blazorState.activeAppPage === 'api' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">Swagger Inspector: ASP.NET Core Minimal APIs</h3>
                        <p className="text-xs text-slate-400">Endpoints RESTful compilados com TypedResults e EF Core AsNoTracking</p>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                        OpenAPI 3.0 OK
                      </span>
                    </div>

                    {/* Endpoint 1 */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 text-xs font-mono font-bold bg-blue-500/20 text-blue-400 rounded">GET</span>
                        <code className="text-xs font-mono text-slate-200">/api/academic/courses</code>
                      </div>
                      <button
                        disabled={apiLoading}
                        onClick={() => handleCallApi('GET_COURSES')}
                        className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded transition-colors"
                      >
                        Executar Chamada
                      </button>
                    </div>

                    {/* Endpoint 2 */}
                    <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 rounded">POST</span>
                        <code className="text-xs font-mono text-slate-200">/api/academic/enrollment</code>
                      </div>
                      <button
                        disabled={apiLoading}
                        onClick={() => handleCallApi('POST_ENROLL')}
                        className="px-3 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded transition-colors"
                      >
                        Executar Chamada
                      </button>
                    </div>

                    {/* Response Console */}
                    {apiLoading && (
                      <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-indigo-400 flex items-center gap-2 font-mono">
                        <div className="w-3 h-3 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                        <span>Disparando HTTP Request para Kestrel Server...</span>
                      </div>
                    )}

                    {apiResponse && !apiLoading && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-mono text-slate-400">Resposta HTTP 200 OK (application/json)</span>
                        <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                          <code>{apiResponse}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 6: AZURE CLOUD (Tier 5+) */}
              {blazorState.activeAppPage === 'cloud' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">Console Microsoft Azure Cloud</h3>
                        <p className="text-xs text-slate-400">PaaS App Service, Blob Storage SDK e Service Bus Queue</p>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                        ● Azure East US 2 (Ativo)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-500">App Service P95</span>
                        <p className="text-base font-bold text-cyan-400 mt-0.5">14ms</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-500">Service Bus DLQ</span>
                        <p className="text-base font-bold text-emerald-400 mt-0.5">0 falhas</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-500">Blobs Armazenados</span>
                        <p className="text-base font-bold text-indigo-400 mt-0.5">{blazorState.uploadedDocs.length} arquivos</p>
                      </div>
                    </div>

                    {/* Blob Storage Uploader */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                        Azure Blob Storage: Repositório de Documentos Acadêmicos
                      </h4>

                      <form onSubmit={handleUploadDoc} className="flex gap-2">
                        <input
                          type="text"
                          value={newDocName}
                          onChange={e => setNewDocName(e.target.value)}
                          placeholder="Nome do Trabalho Acadêmico / TCC..."
                          className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                        />
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Simular Upload Blob</span>
                        </button>
                      </form>

                      <div className="space-y-1.5">
                        {blazorState.uploadedDocs.map((doc, idx) => (
                          <div key={idx} className="p-2 text-xs font-mono bg-slate-900/60 rounded border border-slate-800 flex items-center justify-between text-slate-300">
                            <span>📄 {doc}</span>
                            <span className="text-[11px] text-emerald-400">Armazenado (Hot Tier)</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 2: SOURCE CODE EXPLORER & SYNTAX INSPECTOR          */}
      {/* ======================================================== */}
      {activeTab === 'code' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 p-4 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Árvore do Projeto .NET
              </span>
              <span className="text-xs font-mono text-cyan-400">
                Tier {highestUnlockedTierNumber}
              </span>
            </div>

            <div className="space-y-1">
              {BLAZOR_PROJECT_FILES.map(file => {
                const isUnlocked = file.tierRequired <= highestUnlockedTierNumber;
                const isSelected = selectedFile.path === file.path;

                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full px-3 py-2 text-xs font-mono rounded-lg text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-semibold'
                        : isUnlocked
                        ? 'text-slate-300 hover:bg-slate-700/60'
                        : 'text-slate-600 hover:bg-slate-800/60 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isUnlocked ? (
                        <FileCode className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                      <span className="truncate">{file.path}</span>
                    </div>

                    {!isUnlocked && (
                      <span className="text-[10px] text-amber-500 font-sans ml-1 shrink-0">
                        Tier {file.tierRequired}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8 rounded-2xl border border-slate-700 overflow-hidden bg-slate-950 shadow-lg space-y-0">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-white">{selectedFile.name}</span>
                <span className="text-xs text-slate-500 ml-2 font-mono">({selectedFile.path})</span>
              </div>

              <button
                onClick={handleCopyCode}
                className="px-3 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors flex items-center gap-1.5 font-mono"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copiado!' : 'Copiar Código'}</span>
              </button>
            </div>

            <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-indigo-400 font-mono">Propósito Acadêmico:</strong> {selectedFile.description}
            </div>

            <pre className="p-4 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed max-h-[500px]">
              <code>{selectedFile.code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE 3: EVOLUTION ROADMAP (TIER 0 TO 5)                  */}
      {/* ======================================================== */}
      {activeTab === 'roadmap' && (
        <div className="space-y-4">
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
            <h3 className="text-lg font-bold text-white">Roadmap de Crescimento do Projeto Blazor</h3>
            <p className="text-xs text-slate-300 max-w-2xl">
              Cada marco de conhecimento alcançado nas trilhas expande as funcionalidades do UniSphere, espelhando a transição de um projeto acadêmico inicial para uma solução em nuvem corporativa.
            </p>
          </div>

          <div className="space-y-4">
            {BLAZOR_TIERS.map(tier => {
              const isUnlocked = highestUnlockedTierNumber >= tier.tierNumber;
              const isCurrent = currentTier.tierNumber === tier.tierNumber;

              return (
                <div
                  key={tier.tierNumber}
                  className={`p-6 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-slate-800 border-cyan-500/60 shadow-md ring-1 ring-cyan-500/30'
                      : isUnlocked
                      ? 'bg-slate-800/60 border-slate-700'
                      : 'bg-slate-900/40 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className={isUnlocked ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                          TIER {tier.tierNumber}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="text-slate-400">Progresso Necessário: {tier.minProgressPercentage}%</span>
                        {isUnlocked && (
                          <>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Desbloqueado</span>
                            </span>
                          </>
                        )}
                      </div>

                      <h4 className="text-lg font-bold text-white mt-1">{tier.name}</h4>
                      <p className="text-xs text-slate-300 mt-0.5">{tier.tagline}</p>
                      <p className="text-xs text-slate-400 mt-2 max-w-3xl leading-relaxed">{tier.summary}</p>
                    </div>

                    <div className="shrink-0 space-y-1">
                      <span className="text-[11px] font-mono text-slate-400 block">Arquivos do Módulo:</span>
                      <div className="flex flex-wrap gap-1.5 max-w-xs">
                        {tier.unlockedFiles.map(f => (
                          <span key={f} className="px-2 py-0.5 text-[11px] font-mono bg-slate-900 rounded border border-slate-700 text-slate-300">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
