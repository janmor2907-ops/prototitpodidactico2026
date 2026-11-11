import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, CheckCircle, XCircle, Lightbulb, PenTool, RotateCcw, 
  ArrowRight, Scale, Check, Layers, Award, ChevronRight,
  TrendingUp, Compass, Heart, Brain, Divide, Variable, Shapes,
  BarChart2, ShieldCheck, Zap, Smile, RefreshCw, AlertCircle
} from 'lucide-react';
import { Exercise, StudentProfile, StudentMood, MathTopic, SessionStats } from '../types/mathvibe';
import { EXERCISES_DATA } from '../data/mockData';
import { playSound } from '../utils/audio';
import { ScratchpadModal } from './ScratchpadModal';

interface MathLabProps {
  currentStudent: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  activeExerciseId?: string;
  onNavigateToDashboard: () => void;
}

export const MathLab: React.FC<MathLabProps> = ({
  currentStudent,
  onUpdateStudent,
  activeExerciseId,
  onNavigateToDashboard,
}) => {
  const [exercises] = useState<Exercise[]>(EXERCISES_DATA);
  const [selectedTopic, setSelectedTopic] = useState<string>('todos');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(
    activeExerciseId || EXERCISES_DATA[0].id
  );

  // Exercise interaction state
  const [selectedOption, setSelectedOption] = useState<string | number | null>(null);
  const [typedAnswer, setTypedAnswer] = useState<string>('');
  const [balanceX, setBalanceX] = useState<number>(1);
  const [selectedFractionSlices, setSelectedFractionSlices] = useState<number[]>([0, 1, 2]);
  const [hintIndex, setHintIndex] = useState<number>(-1);
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState<boolean>(false);
  const [studentReaction, setStudentReaction] = useState<'facil' | 'justo' | 'dificil' | null>(null);
  const [currentAttempts, setCurrentAttempts] = useState<number>(0);

  // Live session tracking metrics
  const [sessionStats, setSessionStats] = useState<SessionStats>(() => {
    try {
      const saved = localStorage.getItem('mathvibe_session_stats');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      completedCount: 0,
      correctCount: 0,
      incorrectCount: 0,
      totalAttempts: 0,
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0,
      currentAdaptiveLevel: 2,
    };
  });

  // Adaptive advice state
  const [adaptiveSuggestion, setAdaptiveSuggestion] = useState<string | null>(null);

  // Save session stats
  useEffect(() => {
    try {
      localStorage.setItem('mathvibe_session_stats', JSON.stringify(sessionStats));
    } catch {
      // ignore
    }
  }, [sessionStats]);

  // Sync active exercise if passed from outside
  useEffect(() => {
    if (activeExerciseId && activeExerciseId !== selectedExerciseId) {
      setSelectedExerciseId(activeExerciseId);
      resetExerciseState();
    }
  }, [activeExerciseId]);

  const currentExercise = exercises.find((e) => e.id === selectedExerciseId) || exercises[0];

  const resetExerciseState = () => {
    setSelectedOption(null);
    setTypedAnswer('');
    setBalanceX(1);
    setSelectedFractionSlices([0, 1, 2]);
    setHintIndex(-1);
    setStatus('idle');
    setShowExplanation(false);
    setStudentReaction(null);
    setCurrentAttempts(0);
    setAdaptiveSuggestion(null);
  };

  const handleSelectExercise = (id: string) => {
    playSound('click');
    setSelectedExerciseId(id);
    resetExerciseState();
  };

  const handleToggleFractionSlice = (index: number) => {
    playSound('click');
    setSelectedFractionSlices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleRevealHint = () => {
    playSound('hint');
    setHintIndex((prev) => Math.min(prev + 1, currentExercise.hints.length - 1));
  };

  const triggerCelebration = () => {
    playSound('correct');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#8b5cf6', '#06b6d4', '#ffffff', '#38bdf8'],
      });
    } catch {
      // safe fallback
    }
  };

  // Adaptive emotional settings
  const getEmotionalSupport = (mood: StudentMood) => {
    const isFrustrated = mood === 'frustracion' || mood === 'dubitativo';
    const isTired = mood === 'cansancio' || mood === 'cansado';
    const isEnthusiastic = mood === 'entusiasmo' || mood === 'motivado';

    if (isFrustrated) {
      return {
        badge: 'Modo Apoyo Activo',
        tagColor: 'text-violet-700 bg-violet-50 border-violet-200',
        message: 'Estamos contigo para ayudarte a superar cualquier bloqueo. Pistas automáticas listas y ejercicios de refuerzo.',
        icon: ShieldCheck,
        autoHint: true,
      };
    }
    if (isTired) {
      return {
        badge: 'Modo Pausado & Breve',
        tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        message: 'Sesiones breves y concisas. Ideal para practicar sin saturar tu mente ni generar estrés.',
        icon: Smile,
        autoHint: false,
      };
    }
    if (isEnthusiastic) {
      return {
        badge: 'Modo Desafío Extra',
        tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
        message: '¡Excelente energía y motivación! Retos de mayor dificultad desbloqueados con +50 XP adicional.',
        icon: Zap,
        autoHint: false,
      };
    }
    // Default Tranquilidad / Concentrado
    return {
      badge: 'Modo Fluido Equilibrado',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
      message: 'Zona de concentración activa. Avanzando a un ritmo constante con progresión equilibrada.',
      icon: Brain,
      autoHint: false,
    };
  };

  const emotionalSupport = getEmotionalSupport(currentStudent.currentMood);

  // Check answer with full adaptive logic
  const handleCheckAnswer = () => {
    let isCorrect = false;
    const newAttempts = currentAttempts + 1;
    setCurrentAttempts(newAttempts);

    if (currentExercise.type === 'interactive_balance') {
      isCorrect = balanceX === currentExercise.correctAnswer;
    } else if (currentExercise.type === 'fraction_visualizer') {
      isCorrect = selectedFractionSlices.length === currentExercise.correctAnswer;
    } else if (currentExercise.type === 'numeric_input') {
      const cleanTyped = typedAnswer.trim().toLowerCase();
      const expected = String(currentExercise.correctAnswer).trim().toLowerCase();
      isCorrect = cleanTyped === expected || Number(cleanTyped) === Number(expected);
    } else {
      isCorrect = String(selectedOption).trim() === String(currentExercise.correctAnswer).trim();
    }

    if (isCorrect) {
      setStatus('correct');
      setShowExplanation(true);
      triggerCelebration();

      // Bonus XP if student is enthusiastic
      const xpEarned = (currentStudent.currentMood === 'entusiasmo' || currentStudent.currentMood === 'motivado') ? 60 : 45;

      onUpdateStudent({
        xp: currentStudent.xp + xpEarned,
        completedExercisesCount: currentStudent.completedExercisesCount + 1,
      });

      // Update session stats
      setSessionStats((prev) => {
        const consecutive = prev.consecutiveCorrect + 1;
        let nextAdaptiveLevel = prev.currentAdaptiveLevel;
        let suggestion = null;

        if (consecutive >= 2 && nextAdaptiveLevel < 4) {
          nextAdaptiveLevel += 1;
          suggestion = '¡Demostraste gran dominio conceptual! El algoritmo adaptativo ha subido un nivel de dificultad.';
        }

        if (suggestion) setAdaptiveSuggestion(suggestion);

        return {
          ...prev,
          completedCount: prev.completedCount + 1,
          correctCount: prev.correctCount + 1,
          totalAttempts: prev.totalAttempts + 1,
          consecutiveCorrect: consecutive,
          consecutiveIncorrect: 0,
          currentAdaptiveLevel: nextAdaptiveLevel,
        };
      });
    } else {
      playSound('wrong');
      setStatus('incorrect');
      // Show complete step-by-step procedure so the student understands the method
      setShowExplanation(true);

      // Auto-unlock progressive hint to guide the student without punishing
      if (hintIndex === -1) {
        setHintIndex(0);
      } else if (hintIndex < currentExercise.hints.length - 1) {
        setHintIndex(hintIndex + 1);
      }

      setSessionStats((prev) => {
        const consecutiveErr = prev.consecutiveIncorrect + 1;
        let nextAdaptiveLevel = prev.currentAdaptiveLevel;
        let suggestion = null;

        if (consecutiveErr >= 2 && nextAdaptiveLevel > 1) {
          nextAdaptiveLevel -= 1;
          suggestion = 'Notamos cierta dificultad en este nivel. ¿Deseas probar un ejercicio con fundamentos más accesibles?';
        }

        if (suggestion) setAdaptiveSuggestion(suggestion);

        return {
          ...prev,
          incorrectCount: prev.incorrectCount + 1,
          totalAttempts: prev.totalAttempts + 1,
          consecutiveCorrect: 0,
          consecutiveIncorrect: consecutiveErr,
          currentAdaptiveLevel: nextAdaptiveLevel,
        };
      });
    }
  };

  // Re-try the exercise without leaving or penalty
  const handleRetry = () => {
    playSound('click');
    setStatus('idle');
    setShowExplanation(false);
    // keep hints open to assist the student
  };

  // Switch to an easier exercise if student has difficulty
  const handleLoadEasierExercise = () => {
    playSound('click');
    const easier = exercises.find(
      (e) => e.topic === currentExercise.topic && e.level < currentExercise.level
    ) || exercises.find((e) => e.difficulty === 'Básico');

    if (easier) {
      setSelectedExerciseId(easier.id);
      resetExerciseState();
    }
  };

  // Switch to an advanced exercise if student has high mastery
  const handleLoadHarderExercise = () => {
    playSound('click');
    const harder = exercises.find(
      (e) => e.topic === currentExercise.topic && e.level > currentExercise.level
    ) || exercises.find((e) => e.difficulty === 'Avanzado' || e.difficulty === 'Reto Vibe');

    if (harder) {
      setSelectedExerciseId(harder.id);
      resetExerciseState();
    }
  };

  const handleNextExercise = () => {
    playSound('click');
    const currentIndex = exercises.findIndex((e) => e.id === currentExercise.id);
    const nextIndex = (currentIndex + 1) % exercises.length;
    setSelectedExerciseId(exercises[nextIndex].id);
    resetExerciseState();
  };

  // Filter exercises by topic
  const filteredExercises = exercises.filter((ex) => {
    if (selectedTopic === 'todos') return true;
    return ex.topic === selectedTopic;
  });

  // Calculate tilt angle for algebraic balance
  const leftPanWeight = (currentExercise.interactiveData?.leftXCoefficient || 2) * balanceX + (currentExercise.interactiveData?.leftConstant || 4);
  const rightPanWeight = currentExercise.interactiveData?.rightConstant || 10;
  const balanceDifference = leftPanWeight - rightPanWeight;
  const tiltDegrees = Math.max(-14, Math.min(14, balanceDifference * 3.5));

  const EmotionalIcon = emotionalSupport.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Lab Header & Adaptive Overview */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 rounded-full px-3.5 py-1 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-blue-600" />
                <span>Espacio de Aprendizaje Adaptativo</span>
              </span>

              {/* Emotional badge synced from student profile */}
              <span className={`text-xs font-semibold rounded-full px-3 py-1 flex items-center gap-1.5 border ${emotionalSupport.tagColor}`}>
                <EmotionalIcon className="w-3.5 h-3.5" />
                <span>{emotionalSupport.badge}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
              Laboratorio Matemático Adaptativo
            </h1>

            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Explora las 5 áreas matemáticas con ejercicios interactivos, ingreso numérico, balanza algebraica, círculos de fracciones, pistas progresivas y retroalimentación paso a paso.
            </p>

            {/* Emotional adaptation message */}
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600 shrink-0" />
              <span>{emotionalSupport.message}</span>
            </div>
          </div>

          {/* Quick Tools & Whiteboard trigger */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
            <button
              onClick={() => setIsScratchpadOpen(true)}
              className="px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold transition-colors shadow-xs"
              title="Abrir pizarra de notas y cálculos"
            >
              <PenTool className="w-4 h-4" />
              <span>Abrir Borrador de Cálculos</span>
            </button>

            <button
              onClick={onNavigateToDashboard}
              className="px-4 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
            >
              <span>Ver Mi Panel</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Session Tracking Metrics Strip (Tabular Numerals) */}
      <section className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-medium">Ejercicios Resueltos</div>
          <div className="text-2xl font-extrabold text-slate-900 font-display tabular-nums mt-0.5">
            {sessionStats.completedCount}
          </div>
          <div className="text-[11px] text-slate-400">En esta sesión</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Aciertos
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-display tabular-nums mt-0.5">
            {sessionStats.correctCount}
          </div>
          <div className="text-[11px] text-slate-400">
            {sessionStats.totalAttempts > 0
              ? `${Math.round((sessionStats.correctCount / sessionStats.totalAttempts) * 100)}% de efectividad`
              : 'Sin intentos aún'}
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-600 font-medium flex items-center gap-1">
            <RefreshCw className="w-3.5 h-3.5 text-blue-500" /> Intentos Realizados
          </div>
          <div className="text-2xl font-extrabold text-blue-600 font-display tabular-nums mt-0.5">
            {sessionStats.totalAttempts}
          </div>
          <div className="text-[11px] text-slate-400">
            Reintentos sin penalización
          </div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs text-amber-700 font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> Oportunidades
          </div>
          <div className="text-2xl font-extrabold text-amber-600 font-display tabular-nums mt-0.5">
            {sessionStats.incorrectCount}
          </div>
          <div className="text-[11px] text-slate-400">Errores con explicación</div>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-xs text-violet-700 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> Nivel Adaptativo
          </div>
          <div className="text-2xl font-extrabold text-violet-600 font-display tabular-nums mt-0.5">
            Nivel {sessionStats.currentAdaptiveLevel}
          </div>
          <div className="text-[11px] text-slate-400">
            {sessionStats.currentAdaptiveLevel === 1 && 'Básico · Refuerzo'}
            {sessionStats.currentAdaptiveLevel === 2 && 'Intermedio · Fluido'}
            {sessionStats.currentAdaptiveLevel === 3 && 'Avanzado · Dominio'}
            {sessionStats.currentAdaptiveLevel >= 4 && 'Reto Vibe · Experto'}
          </div>
        </div>
      </section>

      {/* 3. The 5 Math Topic Selector Tabs */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-700 px-1">
          Áreas de Actividades Matemáticas:
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'todos', label: 'Todas las Áreas' },
            { id: 'Operaciones básicas', label: '1. Operaciones básicas' },
            { id: 'Fracciones', label: '2. Fracciones' },
            { id: 'Álgebra y ecuaciones', label: '3. Álgebra y ecuaciones' },
            { id: 'Geometría', label: '4. Geometría' },
            { id: 'Razonamiento matemático', label: '5. Razonamiento matemático' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSound('click');
                setSelectedTopic(tab.id);
              }}
              className={`px-4 py-2.5 rounded-xl font-semibold whitespace-nowrap shrink-0 transition-all ${
                selectedTopic === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Adaptive Suggestion Banner if Difficulty Triggered */}
      {adaptiveSuggestion && (
        <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900 shadow-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />
            <span className="font-semibold text-slate-900">{adaptiveSuggestion}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {sessionStats.consecutiveIncorrect >= 2 && (
              <button
                onClick={handleLoadEasierExercise}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-colors"
              >
                Cargar ejercicio más accesible
              </button>
            )}
            {sessionStats.consecutiveCorrect >= 2 && (
              <button
                onClick={handleLoadHarderExercise}
                className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-bold transition-colors"
              >
                Cargar reto de mayor nivel
              </button>
            )}
          </div>
        </div>
      )}

      {/* 5. Main Workspace: Exercise Selector & Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Exercise List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span className="font-semibold text-slate-700">
              Ejercicios Disponibles ({filteredExercises.length})
            </span>
            <span>Selecciona para resolver</span>
          </div>

          <div className="space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
            {filteredExercises.map((ex) => {
              const isCurrent = ex.id === currentExercise.id;
              return (
                <button
                  key={ex.id}
                  onClick={() => handleSelectExercise(ex.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-1.5 ${
                    isCurrent
                      ? 'bg-blue-50/90 border-blue-500 shadow-sm ring-1 ring-blue-500'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
                      {ex.topic}
                    </span>
                    <span className="text-slate-500 font-medium">Nivel {ex.level}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                    {ex.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {ex.question}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span className="text-blue-600 font-medium">{ex.difficulty}</span>
                    {isCurrent && (
                      <span className="text-blue-700 font-bold flex items-center gap-1">
                        En curso <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Emotional Change within Lab */}
          <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
            <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>Ajustar mi estado en esta sesión:</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { id: 'entusiasmo', label: '⚡ Entusiasmo' },
                { id: 'tranquilidad', label: '🎯 Tranquilidad' },
                { id: 'frustracion', label: '💡 Con dudas' },
                { id: 'cansancio', label: '🌱 Cansancio' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playSound('click');
                    onUpdateStudent({ currentMood: m.id as StudentMood });
                  }}
                  className={`px-2.5 py-1.5 rounded-xl border text-left transition-all ${
                    currentStudent.currentMood === m.id
                      ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Stage: Interactive Solver (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            {/* Stage Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-blue-600 uppercase tracking-wider">
                    {currentExercise.topic}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-500">Nivel {currentExercise.level}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-medium text-violet-600">{currentExercise.difficulty}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
                  {currentExercise.title}
                </h2>
              </div>

              {/* Action buttons: scratchpad & reset */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsScratchpadOpen(true)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <PenTool className="w-3.5 h-3.5 text-blue-600" />
                  <span>Borrador</span>
                </button>
                <button
                  onClick={resetExerciseState}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                  title="Reiniciar ejercicio"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Clear Instructions & Question */}
            <div className="space-y-3">
              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-xl text-xs text-blue-900 font-medium flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Instrucción:</strong> {currentExercise.instructions}</span>
              </div>

              <p className="text-base text-slate-800 font-medium leading-relaxed">
                {currentExercise.question}
              </p>

              {currentExercise.formula && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 inline-block font-mono text-sm font-semibold text-slate-800">
                  {currentExercise.formula}
                </div>
              )}
            </div>

            {/* INTERACTIVE INPUT 1: Numeric Input */}
            {currentExercise.type === 'numeric_input' && (
              <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-4">
                <label htmlFor="student-answer-input" className="block text-xs font-bold text-slate-700">
                  Introduce tu respuesta:
                </label>
                <div className="flex items-center gap-3 max-w-md">
                  <div className="relative flex-1">
                    <input
                      id="student-answer-input"
                      type="text"
                      value={typedAnswer}
                      onChange={(e) => setTypedAnswer(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckAnswer();
                      }}
                      placeholder={currentExercise.inputPlaceholder || 'Escribe tu respuesta aquí...'}
                      disabled={status === 'correct'}
                      className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-slate-100 disabled:text-slate-400 shadow-xs"
                    />
                    {currentExercise.inputUnit && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
                        {currentExercise.inputUnit}
                      </span>
                    )}
                  </div>

                  {status !== 'correct' && (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={!typedAnswer.trim()}
                      className="px-5 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                      Validar
                    </button>
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  Presiona Enter o haz clic en Validar para comprobar tu procedimiento.
                </div>
              </div>
            )}

            {/* INTERACTIVE INPUT 2: Interactive Balance Scale */}
            {currentExercise.type === 'interactive_balance' && (
              <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-blue-600" />
                    Simulador Dinámico de Balanza Algebraica
                  </span>
                  <span className={`font-semibold px-2 py-0.5 rounded-md ${
                    balanceDifference === 0 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {balanceDifference === 0 ? '✓ ¡Balanza en Equilibrio!' : 'Desequilibrada'}
                  </span>
                </div>

                {/* SVG Visual Scale with dynamic tilt */}
                <div className="relative w-full h-56 flex items-center justify-center overflow-hidden">
                  <svg
                    viewBox="0 0 500 240"
                    className="w-full max-w-lg h-full transition-transform duration-300 ease-out"
                  >
                    <polygon points="250,150 220,210 280,210" fill="#64748b" />
                    <rect x="200" y="210" width="100" height="12" rx="4" fill="#475569" />
                    <circle cx="250" cy="150" r="8" fill="#334155" />

                    <g
                      transform={`rotate(${tiltDegrees}, 250, 150)`}
                      className="transition-transform duration-300 ease-out"
                    >
                      <rect x="70" y="146" width="360" height="8" rx="4" fill="#0284c7" />

                      <line x1="100" y1="150" x2="100" y2="185" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="140" y1="150" x2="100" y2="185" stroke="#94a3b8" strokeWidth="2" />
                      <path d="M 60 185 Q 100 200 140 185 Z" fill="#38bdf8" />
                      <text x="100" y="180" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
                        2x + 4 = {leftPanWeight}
                      </text>

                      <line x1="360" y1="150" x2="400" y2="185" stroke="#94a3b8" strokeWidth="2" />
                      <line x1="440" y1="150" x2="400" y2="185" stroke="#94a3b8" strokeWidth="2" />
                      <path d="M 360 185 Q 400 200 440 185 Z" fill="#818cf8" />
                      <text x="400" y="180" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">
                        10 unidades
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Slider to control x */}
                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <label htmlFor="balance-slider" className="flex items-center gap-2">
                      <span>Prueba asignando un valor para</span>
                      <span className="font-mono text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md font-bold">
                        x = {balanceX}
                      </span>
                    </label>
                    <span className="text-slate-500 font-mono">
                      Lado Izquierdo: 2({balanceX}) + 4 = {leftPanWeight} | Lado Derecho: {rightPanWeight}
                    </span>
                  </div>

                  <input
                    id="balance-slider"
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={balanceX}
                    disabled={status === 'correct'}
                    onChange={(e) => {
                      playSound('click');
                      setBalanceX(parseInt(e.target.value, 10));
                    }}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                  />

                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>x = 1</span>
                    <span>x = 2</span>
                    <span>x = 3</span>
                    <span>x = 4</span>
                    <span>x = 5</span>
                    <span>x = 6</span>
                  </div>
                </div>
              </div>
            )}

            {/* INTERACTIVE INPUT 3: Interactive Fraction Visualizer */}
            {currentExercise.type === 'fraction_visualizer' && (
              <div className="p-6 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-cyan-600" />
                    Círculo Interactivo de Fracciones (8 Rebanadas)
                  </span>
                  <span className="font-semibold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-md">
                    Seleccionadas: {selectedFractionSlices.length} / 8 ({((selectedFractionSlices.length / 8) * 100).toFixed(0)}%)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-2">
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                        const startAngle = (i * 45 * Math.PI) / 180;
                        const endAngle = ((i + 1) * 45 * Math.PI) / 180;
                        const x1 = 100 + 85 * Math.cos(startAngle);
                        const y1 = 100 + 85 * Math.sin(startAngle);
                        const x2 = 100 + 85 * Math.cos(endAngle);
                        const y2 = 100 + 85 * Math.sin(endAngle);
                        const isSelected = selectedFractionSlices.includes(i);

                        return (
                          <path
                            key={i}
                            d={`M 100 100 L ${x1} ${y1} A 85 85 0 0 1 ${x2} ${y2} Z`}
                            fill={isSelected ? '#06b6d4' : '#e2e8f0'}
                            stroke="#ffffff"
                            strokeWidth="2.5"
                            onClick={() => {
                              if (status !== 'correct') handleToggleFractionSlice(i);
                            }}
                            className="cursor-pointer transition-colors hover:opacity-85"
                          />
                        );
                      })}
                      <circle cx="100" cy="100" r="18" fill="#ffffff" />
                    </svg>
                  </div>

                  <div className="space-y-3 text-center sm:text-left">
                    <div className="text-xs text-slate-500">
                      Haz clic en cada rebanada para iluminarla o apagarla.
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="text-xs text-slate-600">Meta deseada:</div>
                      <div className="text-sm font-bold text-slate-900 font-mono">
                        3/4 del total = 6/8 partes
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* INTERACTIVE INPUT 4: Multiple Choice Options */}
            {currentExercise.type === 'multiple_choice' && currentExercise.options && (
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-700">
                  Selecciona la opción correcta:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentExercise.options.map((opt, idx) => {
                    const letters = ['A', 'B', 'C', 'D'];
                    const isSelected = selectedOption === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          if (status !== 'correct') {
                            playSound('click');
                            setSelectedOption(opt);
                          }
                        }}
                        className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${
                          isSelected
                            ? 'bg-blue-50 border-blue-600 text-blue-950 font-semibold shadow-xs ring-1 ring-blue-600'
                            : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {letters[idx]}
                        </span>
                        <span className="text-sm">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Progressive Adaptive Hint System */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleRevealHint}
                  disabled={hintIndex >= currentExercise.hints.length - 1}
                  className={`text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                    hintIndex >= currentExercise.hints.length - 1
                      ? 'border-slate-200 text-slate-400 cursor-not-allowed bg-slate-50'
                      : 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                  <span>
                    {hintIndex === -1
                      ? 'Pedir Pista Adaptativa'
                      : `Pista ${hintIndex + 1} de ${currentExercise.hints.length}`}
                  </span>
                </button>

                <span className="text-[11px] text-slate-400">
                  {currentAttempts > 0 && `Intentos en este ejercicio: ${currentAttempts}`}
                </span>
              </div>

              {hintIndex >= 0 && (
                <div className="space-y-2 p-4 bg-amber-50/80 border border-amber-200/90 rounded-2xl text-xs text-amber-950">
                  {currentExercise.hints.slice(0, hintIndex + 1).map((hint, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="font-bold text-amber-700 shrink-0">Pista {i + 1}:</span>
                      <p className="text-slate-700 leading-relaxed">{hint}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Verification Button & Primary Control */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                {status === 'idle' && 'Verifica cuando estés listo para comprobar'}
                {status === 'correct' && (
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> ¡Felicidades! Razonamiento impecable (+45 XP)
                  </span>
                )}
                {status === 'incorrect' && (
                  <span className="text-rose-600 font-medium flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Respuesta no exacta aún. Lee el procedimiento guiado abajo.
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                {status === 'incorrect' && (
                  <button
                    onClick={handleRetry}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Intentar de nuevo</span>
                  </button>
                )}

                {status === 'correct' ? (
                  <button
                    onClick={handleNextExercise}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2"
                  >
                    <span>Siguiente Reto</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleCheckAnswer}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Comprobar Respuesta</span>
                  </button>
                )}
              </div>
            </div>

            {/* DETAILED ADAPTIVE STEP-BY-STEP EXPLANATION */}
            {showExplanation && (
              <div className={`mt-6 p-6 rounded-2xl border space-y-4 ${
                status === 'correct'
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-rose-50/50 border-rose-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-violet-600" />
                    <h4 className="text-sm font-bold text-slate-900 font-display">
                      {status === 'correct' ? 'Explicación del Procedimiento' : 'Procedimiento Paso a Paso Para Resolverlo'}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-violet-700 bg-violet-100/70 px-2.5 py-0.5 rounded-full">
                    {currentExercise.explanation.concept}
                  </span>
                </div>

                {status === 'incorrect' && (
                  <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs text-rose-900 leading-relaxed">
                    <strong>No te desanimes:</strong> En matemáticas, los errores son el escalón para entender la lógica profunda. Observa cómo se llega a la solución:
                  </div>
                )}

                <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
                  {currentExercise.explanation.steps.map((step, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200/80">
                      {step}
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-violet-50 rounded-xl border border-violet-200/80 text-xs text-violet-950">
                  <span className="font-bold">Idea Clave: </span>
                  <span>{currentExercise.explanation.keyTakeaway}</span>
                </div>

                {/* Emotional Self-Check after completion */}
                <div className="pt-2 border-t border-slate-200/80 space-y-2">
                  <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                    ¿Cómo te sentiste con este ejercicio?
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {[
                      { id: 'facil', label: 'Muy fácil · Sube el nivel' },
                      { id: 'justo', label: 'Justo a mi medida' },
                      { id: 'dificil', label: 'Retador con dudas' },
                    ].map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          playSound('click');
                          setStudentReaction(r.id as 'facil' | 'justo' | 'dificil');
                          if (r.id === 'facil') handleLoadHarderExercise();
                          if (r.id === 'dificil') handleLoadEasierExercise();
                        }}
                        className={`px-3 py-1.5 rounded-lg border transition-all ${
                          studentReaction === r.id
                            ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                  {studentReaction && (
                    <p className="text-[11px] text-blue-600 font-medium">
                      ✓ Calibración guardada: el sistema adaptó la dificultad de los próximos retos.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Whiteboard / Scratchpad Modal */}
      <ScratchpadModal
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />
    </div>
  );
};
