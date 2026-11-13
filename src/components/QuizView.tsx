import React, { useState } from 'react';
import { useAcademic } from '../context/AcademicContext';
import { CURRICULUM_MODULES } from '../data/curriculum';
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, RotateCcw, XCircle, Sparkles, Code2 } from 'lucide-react';

export const QuizView: React.FC = () => {
  const { currentModuleId, setCurrentView, selectModule, submitQuiz, progress } = useAcademic();

  const moduleData = CURRICULUM_MODULES.find(m => m.id === currentModuleId) || CURRICULUM_MODULES[0];
  const questions = moduleData.quiz;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswerConfirmed) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerConfirmed(true);
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedOption }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        const ans = idx === currentQuestionIndex ? selectedOption : userAnswers[idx];
        if (ans === q.correctOptionIndex) {
          correctCount++;
        }
      });
      const scorePct = Math.round((correctCount / questions.length) * 100);
      submitQuiz(moduleData.id, scorePct);
      setIsFinished(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      const nextAnswer = userAnswers[currentQuestionIndex + 1];
      setSelectedOption(nextAnswer !== undefined ? nextAnswer : null);
      setIsAnswerConfirmed(nextAnswer !== undefined);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerConfirmed(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  // If already finished, display report card
  if (isFinished) {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctOptionIndex) correctCount++;
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const passed = finalScore >= 60;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="p-8 bg-slate-800/90 rounded-2xl border border-slate-700 text-center space-y-4">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            {passed ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <HelpCircle className="w-8 h-8 text-amber-400" />}
          </div>

          <h2 className="text-2xl font-bold text-white">
            {passed ? 'Avaliação Acadêmica Aprovada!' : 'Revisão Recomendada'}
          </h2>

          <p className="text-sm text-slate-300 max-w-md mx-auto">
            {passed
              ? `Você atingiu aproveitamento de ${finalScore}% nesta avaliação conceitual e acumulou XP acadêmico.`
              : `Você atingiu ${finalScore}%. O aproveitamento mínimo recomendado é de 60%. Você pode refazer o quiz a qualquer momento.`}
          </p>

          <div className="py-4 flex justify-center items-center gap-8 text-xs font-mono">
            <div>
              <span className="text-slate-400 block mb-1">Acertos</span>
              <span className="text-xl font-bold text-white">{correctCount}/{questions.length}</span>
            </div>
            <span aria-hidden="true" className="text-slate-700">|</span>
            <div>
              <span className="text-slate-400 block mb-1">Aproveitamento</span>
              <span className={`text-xl font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>{finalScore}%</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-slate-300 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Refazer Quiz</span>
            </button>

            <button
              onClick={() => selectModule(moduleData.id, 'challenge')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Ir para o Desafio de Código</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCorrect = selectedOption === currentQ.correctOptionIndex;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => selectModule(moduleData.id, 'theory')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à Teoria</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          Questão <strong className="text-white font-bold">{currentQuestionIndex + 1}</strong> de {questions.length}
        </span>
      </div>

      {/* Progress Indicator */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-indigo-500 h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 bg-slate-800/90 rounded-2xl border border-slate-700/80 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
            <span>AVALIAÇÃO CONCEITUAL</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{moduleData.title}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {currentQ.question}
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            let optionStyles = 'border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-slate-200';

            if (isSelected && !isAnswerConfirmed) {
              optionStyles = 'border-indigo-500 bg-indigo-950/40 text-white ring-1 ring-indigo-500';
            } else if (isAnswerConfirmed) {
              if (idx === currentQ.correctOptionIndex) {
                optionStyles = 'border-emerald-500 bg-emerald-950/40 text-emerald-100 ring-1 ring-emerald-500';
              } else if (isSelected && !isCorrect) {
                optionStyles = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500';
              } else {
                optionStyles = 'border-slate-800 bg-slate-900/40 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerConfirmed}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${optionStyles}`}
              >
                <div
                  className={`w-6 h-6 rounded-full border text-xs font-mono flex items-center justify-center shrink-0 mt-0.5 ${
                    isAnswerConfirmed && idx === currentQ.correctOptionIndex
                      ? 'border-emerald-400 bg-emerald-500 text-slate-950 font-bold'
                      : isAnswerConfirmed && isSelected && !isCorrect
                      ? 'border-rose-400 bg-rose-500 text-white font-bold'
                      : isSelected
                      ? 'border-indigo-400 bg-indigo-500 text-white font-bold'
                      : 'border-slate-700 text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="text-sm leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation Banner (Appears after confirmation) */}
        {isAnswerConfirmed && (
          <div
            className={`p-5 rounded-xl border text-xs leading-relaxed space-y-2 ${
              isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-sm">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Resposta Correta!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-300">Alternativa Incorreta</span>
                </>
              )}
            </div>
            <p className="text-slate-200 text-xs leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-2 flex items-center justify-between border-t border-slate-700/60">
          <div className="text-xs text-slate-400">
            {selectedOption === null && !isAnswerConfirmed && 'Selecione uma alternativa acima para responder.'}
          </div>

          <div>
            {!isAnswerConfirmed ? (
              <button
                disabled={selectedOption === null}
                onClick={handleConfirmAnswer}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
              >
                Confirmar Resposta
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>{isLastQuestion ? 'Concluir Avaliação' : 'Próxima Questão'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
