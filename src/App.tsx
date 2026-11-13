import React from 'react';
import { AcademicProvider, useAcademic } from './context/AcademicContext';
import { Navbar } from './components/Navbar';
import { ModuleList } from './components/ModuleList';
import { TheoryView } from './components/TheoryView';
import { QuizView } from './components/QuizView';
import { CodeSandbox } from './components/CodeSandbox';
import { BlazorProjectViewer } from './components/BlazorProjectViewer';
import { AcademicCertificate } from './components/AcademicCertificate';

const MainContent: React.FC = () => {
  const { currentView } = useAcademic();

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {currentView === 'curriculum' && <ModuleList />}
      {currentView === 'theory' && <TheoryView />}
      {currentView === 'quiz' && <QuizView />}
      {currentView === 'challenge' && <CodeSandbox />}
      {currentView === 'blazor_project' && <BlazorProjectViewer />}
      {currentView === 'certificate' && <AcademicCertificate />}
    </main>
  );
};

export default function App() {
  return (
    <AcademicProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <Navbar />
        <MainContent />

        {/* Clean, quiet academic footer */}
        <footer className="border-t border-slate-800 bg-slate-950 py-8 px-6 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-200">Edifica.NET</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Plataforma Acadêmica de Engenharia de Software .NET</span>
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>C# 12 / .NET 9</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Blazor WebAssembly</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>ASP.NET Core &amp; Azure Cloud</span>
            </div>
          </div>
        </footer>
      </div>
    </AcademicProvider>
  );
}
