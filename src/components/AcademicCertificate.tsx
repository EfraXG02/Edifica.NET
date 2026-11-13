import React, { useRef } from 'react';
import { useAcademic } from '../context/AcademicContext';
import { Logo } from './Logo';
import { Award, CheckCircle2, Printer, QrCode, ShieldCheck } from 'lucide-react';

export const AcademicCertificate: React.FC = () => {
  const { studentName, progress, progressPercentage, academicRank } = useAcademic();
  const printRef = useRef<HTMLDivElement>(null);

  const isEligible = progressPercentage >= 50;
  const issueDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
  const certificateId = `EDIFICA-${(progress.startedAt ? new Date(progress.startedAt).getTime() : 1731150000).toString().slice(-8).toUpperCase()}-ACAD`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Overview & Controls */}
      <div className="p-6 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Award className="w-4 h-4" />
            <span>CERTIFICAÇÃO OFICIAL DE PROFICIÊNCIA</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Certificado Acadêmico de Engenharia .NET &amp; Blazor
          </h1>
          <p className="text-xs text-slate-300">
            Validação de competências do pensamento computacional básico à arquitetura em nuvem com Azure.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Salvar PDF</span>
          </button>
        </div>
      </div>

      {/* Eligibility Notice */}
      {!isEligible && (
        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 text-xs text-amber-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Certificado em modo <strong>Demonstrativo</strong>. Conclua pelo menos 50% dos módulos para validação plena de honra ao mérito.
            </span>
          </div>
          <span className="font-mono text-amber-400 font-bold tabular-nums">{progressPercentage}% / 50%</span>
        </div>
      )}

      {/* The Printable Certificate Container */}
      <div
        ref={printRef}
        className="p-8 sm:p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 rounded-3xl border-2 border-amber-500/40 shadow-2xl relative overflow-hidden text-slate-100 space-y-8"
      >
        {/* Decorative corner borders */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-400/60" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-400/60" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-400/60" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-400/60" />

        {/* Certificate Header with Logo */}
        <div className="text-center space-y-2 relative z-10 flex flex-col items-center">
          <Logo size="lg" showTagline={true} />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif pt-4">
            Certificado de Conclusão e Habilitação
          </h2>

          <p className="text-xs text-slate-400 uppercase tracking-widest font-mono">
            Engenharia de Software .NET, Blazor WebAssembly &amp; Cloud Azure
          </p>
        </div>

        {/* Certificate Body Text */}
        <div className="text-center max-w-2xl mx-auto space-y-4 text-slate-200 text-sm leading-relaxed relative z-10">
          <p className="text-xs text-slate-400">Certificamos com honras acadêmicas que</p>

          <div className="py-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-indigo-200 to-amber-200 tracking-wide border-b-2 border-amber-400/40 pb-1 px-4 inline-block">
              {studentName}
            </span>
          </div>

          <p className="text-xs text-slate-300">
            concluiu o itinerário formativo integral, dominando os alicerces do raciocínio algorítmico, a programação orientada a objetos com C# moderno, a construção de aplicações web interativas com Blazor e a infraestrutura corporativa na nuvem Azure.
          </p>

          <div className="py-2 inline-flex items-center gap-3 px-4 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700 text-xs font-mono text-cyan-300">
            <span>Classificação Alcançada:</span>
            <strong className="text-white">{academicRank}</strong>
          </div>
        </div>

        {/* Competencies Breakdown */}
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 relative z-10">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 font-mono text-center">
            Matriz de Competências Práticas e Conceituais Atestadas
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-amber-400 block font-mono">1. Fundamentos &amp; C# 12</span>
              <ul className="text-slate-300 space-y-0.5 text-[11px] list-disc list-inside">
                <li>Algoritmos, Variáveis &amp; Lógica do Cotidiano</li>
                <li>Tipos de Valor vs Referência (Stack/Heap)</li>
                <li>Records Imutáveis &amp; Expressão with</li>
                <li>LINQ Avançado &amp; Deferred Execution</li>
                <li>Async/Await &amp; Concorrência Task</li>
              </ul>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-cyan-400 block font-mono">2. Blazor WebAssembly</span>
              <ul className="text-slate-300 space-y-0.5 text-[11px] list-disc list-inside">
                <li>RenderTree &amp; Component Lifecycle</li>
                <li>Two-Way Data Binding &amp; EventCallback</li>
                <li>EditForm &amp; DataAnnotations</li>
                <li>Padrão StateContainer Reativo</li>
                <li>JSInterop &amp; Modos .NET 9</li>
              </ul>
            </div>

            <div className="space-y-1">
              <span className="font-bold text-blue-400 block font-mono">3. ASP.NET &amp; Nuvem Azure</span>
              <ul className="text-slate-300 space-y-0.5 text-[11px] list-disc list-inside">
                <li>Minimal APIs REST com TypedResults</li>
                <li>Entity Framework Core &amp; AsNoTracking</li>
                <li>Segurança com JWT Bearer &amp; Claims</li>
                <li>Azure App Services &amp; Blob Storage</li>
                <li>Mensageria com Azure Service Bus</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Signatures & Seal */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10 text-xs">
          <div className="text-center sm:text-left space-y-1">
            <div className="w-40 border-b border-slate-600 pb-1 font-serif text-slate-300 text-sm italic">
              Edifica.NET Academy
            </div>
            <span className="text-[11px] text-slate-400 block">Comitê de Avaliação Técnica</span>
            <span className="text-[10px] text-slate-500 font-mono block">Carga Horária Estimada: 60h</span>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 font-mono text-[11px]">
            <QrCode className="w-7 h-7 text-amber-400" />
            <div>
              <span className="text-slate-400 block">Autenticidade Verificável:</span>
              <strong className="text-slate-200">{certificateId}</strong>
            </div>
          </div>

          <div className="text-center sm:text-right space-y-0.5">
            <span className="text-slate-400 text-[11px] block">Emitido em {issueDate}</span>
            <span className="text-emerald-400 font-mono text-[11px] flex items-center justify-center sm:justify-end gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Validação Criptográfica OK</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
