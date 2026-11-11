import React, { useState } from 'react';
import { 
  Flame, Award, TrendingUp, Sparkles, ArrowRight, CheckCircle2, 
  RotateCcw, Play, Heart, Zap, Clock, ShieldAlert, BookOpen, Layers
} from 'lucide-react';
import { StudentProfile, StudentMood, TopicProgress, Achievement, Exercise, ScreenType } from '../types/mathvibe';
import { TOPIC_PROGRESS_DATA, ACHIEVEMENTS_DATA, EXERCISES_DATA } from '../data/mockData';
import { playSound } from '../utils/audio';

interface StudentDashboardProps {
  currentStudent: StudentProfile;
  onUpdateStudent: (updated: Partial<StudentProfile>) => void;
  onSelectStudent: (studentId: string) => void;
  allStudents: StudentProfile[];
  onNavigate: (screen: ScreenType) => void;
  onLaunchExercise: (exerciseId: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentStudent,
  onUpdateStudent,
  onSelectStudent,
  allStudents,
  onNavigate,
  onLaunchExercise,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(currentStudent.name);

  const handleMoodChange = (mood: StudentMood) => {
    playSound('click');
    onUpdateStudent({ currentMood: mood });
  };

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateStudent({ name: nameInput.trim(), nickname: nameInput.trim().split(' ')[0] });
      setEditingName(false);
      playSound('correct');
    }
  };

  const getMoodConfig = (mood: StudentMood) => {
    switch (mood) {
      case 'entusiasmo':
      case 'motivado':
        return {
          label: 'Entusiasmo & Alta Energía',
          emoji: '⚡',
          color: 'text-amber-700 bg-amber-50 border-amber-200',
          advice: '¡Excelente motivación! El sistema adaptativo te presentará retos avanzados de lógica, olimpiada y +50% XP extra.',
          recommendedDifficulty: 'Avanzado',
        };
      case 'tranquilidad':
      case 'concentrado':
        return {
          label: 'Tranquilidad & Concentración',
          emoji: '🎯',
          color: 'text-blue-700 bg-blue-50 border-blue-200',
          advice: 'Estás en tu ritmo ideal de fluidez. Mantenemos el nivel equilibrado con progresión gradual constante.',
          recommendedDifficulty: 'Intermedio',
        };
      case 'frustracion':
      case 'dubitativo':
        return {
          label: 'Frustración o Dudas (Apoyo Activo)',
          emoji: '💡',
          color: 'text-violet-700 bg-violet-50 border-violet-200',
          advice: 'Cero presión: el error es parte natural del aprendizaje. Activamos pistas progresivas automáticas y ejercicios más sencillos sin penalizaciones.',
          recommendedDifficulty: 'Básico',
        };
      case 'cansancio':
      case 'cansado':
        return {
          label: 'Cansancio / Con Calma',
          emoji: '🌱',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          advice: 'Modo pausado activo: actividades breves, concisas y visuales para avanzar sin sobrecarga mental.',
          recommendedDifficulty: 'Básico',
        };
      default:
        return {
          label: 'Tranquilidad & Enfoque',
          emoji: '🎯',
          color: 'text-blue-700 bg-blue-50 border-blue-200',
          advice: 'Avanzando a tu ritmo óptimo con retroalimentación inmediata.',
          recommendedDifficulty: 'Intermedio',
        };
    }
  };

  const activeMoodInfo = getMoodConfig(currentStudent.currentMood);

  // Filter or sort exercises recommended for this student's vibe
  const recommendedExercises = EXERCISES_DATA.filter((ex) => {
    if (!ex.recommendedForMoods) return true;
    return ex.recommendedForMoods.includes(currentStudent.currentMood);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header & Personalized Welcome */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden">
        {/* Subtle decorative radial gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-100/50 via-violet-100/30 to-transparent rounded-full blur-2xl pointer-events-none -z-0" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Avatar & Greeting */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100">
                <img
                  src={currentStudent.avatar}
                  alt={`Perfil de ${currentStudent.name}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold text-xs shadow-xs border-2 border-white">
                Nv. {currentStudent.level}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                {editingName ? (
                  <form onSubmit={handleSaveName} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="px-3 py-1 text-lg font-bold border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Guardar
                    </button>
                  </form>
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-2">
                    <span>¡Hola, {currentStudent.nickname}!</span>
                    <button
                      onClick={() => setEditingName(true)}
                      className="text-xs font-normal text-slate-400 hover:text-blue-600 underline ml-1"
                      title="Cambiar nombre de perfil"
                    >
                      (editar)
                    </button>
                  </h1>
                )}
              </div>
              <p className="text-sm font-medium text-slate-500">
                {currentStudent.grade}
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
                <span className="font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
                  {currentStudent.levelTitle}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="flex items-center gap-1 text-amber-600 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  {currentStudent.streakDays} días en racha
                </span>
              </div>
            </div>
          </div>

          {/* Right: Profile Switcher for demo */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 px-2">Cambiar perfil:</span>
              <div className="flex items-center gap-1.5">
                {allStudents.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      playSound('click');
                      onSelectStudent(s.id);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      currentStudent.id === s.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200/70'
                    }`}
                  >
                    {s.nickname}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => onNavigate('lab')}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Entrar al Laboratorio</span>
            </button>
          </div>
        </div>

        {/* 2. Emotional Calibrator (Vibe Check) */}
        <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <span className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-rose-500" />
              Calibrador Emocional del Estudiante (Tu Vibe Actual):
            </span>
            <span className="text-slate-500">
              Selecciona tu estado para que los ejercicios se adapten a tu energía
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'entusiasmo', label: '¡Entusiasmo!', emoji: '⚡', desc: 'Retos de alta exigencia' },
              { id: 'tranquilidad', label: 'Tranquilidad', emoji: '🎯', desc: 'Flujo constante' },
              { id: 'frustracion', label: 'Frustración', emoji: '💡', desc: 'Pistas y apoyo guiado' },
              { id: 'cansancio', label: 'Cansancio', emoji: '🌱', desc: 'Actividades breves y pausa' },
            ].map((v) => {
              const isSelected = currentStudent.currentMood === v.id || 
                (v.id === 'entusiasmo' && currentStudent.currentMood === 'motivado') ||
                (v.id === 'tranquilidad' && currentStudent.currentMood === 'concentrado') ||
                (v.id === 'frustracion' && currentStudent.currentMood === 'dubitativo') ||
                (v.id === 'cansancio' && currentStudent.currentMood === 'cansado');
              return (
                <button
                  key={v.id}
                  onClick={() => handleMoodChange(v.id as StudentMood)}
                  className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xl mb-1">{v.emoji}</span>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                        ACTIVO
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-800">{v.label}</span>
                  <span className="text-[11px] text-slate-500 leading-tight mt-0.5">{v.desc}</span>
                </button>
              );
            })}
          </div>

          {/* Adaptive banner feedback */}
          <div className="p-3.5 bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-cyan-50/80 border border-blue-200/70 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-blue-950">Ajuste pedagógico automático: </span>
              <span className="text-slate-700">{activeMoodInfo.advice}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Performance & Pace Strip (Tabular Numerals) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Ritmo de Aprendizaje</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-display tabular-nums tracking-tight">
            {currentStudent.paceScore}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Velocidad de asimilación calculada</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Precisión Promedio</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-display tabular-nums tracking-tight">
            {currentStudent.accuracyRate}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tasa de aciertos con comprensión</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Puntos de Experiencia</span>
            <Sparkles className="w-4 h-4 text-violet-500" />
          </div>
          <div className="text-2xl font-extrabold text-violet-600 font-display tabular-nums tracking-tight">
            {currentStudent.xp} XP
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Nivel 4 · Próximo nivel en 1,800 XP</p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Retos Superados</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-2xl font-extrabold text-cyan-700 font-display tabular-nums tracking-tight">
            {currentStudent.completedExercisesCount}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Ejercicios interactivos completados</p>
        </div>
      </section>

      {/* 4. Two Column Split: Domain Mastery & Recommended Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (7 cols): Recommended Adaptive Activities */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-display">
                Actividades Recomendadas Para Ti
              </h2>
              <p className="text-xs text-slate-500">
                Adaptadas a tu nivel ({currentStudent.levelTitle}) y tu estado ({activeMoodInfo.label})
              </p>
            </div>
            <button
              onClick={() => onNavigate('lab')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              Ver todas en el Lab
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recommendedExercises.slice(0, 3).map((ex) => (
              <div
                key={ex.id}
                className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
                      {ex.topic}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-slate-500">Nivel {ex.level}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-blue-600 font-medium">{ex.difficulty}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {ex.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {ex.question}
                  </p>

                  {ex.formula && (
                    <div className="text-xs font-mono font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md inline-block">
                      {ex.formula}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    playSound('click');
                    onLaunchExercise(ex.id);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 whitespace-nowrap self-stretch sm:self-center cursor-pointer"
                >
                  <span>Resolver reto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Quick Banner for Math Lab */}
          <div className="p-5 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-3xl text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base font-bold font-display">¿Quieres experimentar libremente?</h3>
              <p className="text-xs text-blue-200">
                Accede al Laboratorio interactivo con simulador de balanza, explorador de fracciones y retos lógicos.
              </p>
            </div>
            <button
              onClick={() => onNavigate('lab')}
              className="px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap shadow-xs transition-colors"
            >
              Abrir Laboratorio
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Progress by Topic & Badges */}
        <div className="lg:col-span-5 space-y-6">
          {/* Topic Progress Breakdown */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Progreso por Áreas
                </h2>
                <p className="text-xs text-slate-500">Dominio de conceptos matemáticos</p>
              </div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                Nivel 4 Global
              </span>
            </div>

            <div className="space-y-4">
              {TOPIC_PROGRESS_DATA.map((t) => (
                <div key={t.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{t.name}</span>
                    <span className="font-mono text-slate-600 tabular-nums">
                      {t.progressPercent}% ({t.masteredCount}/{t.totalCount})
                    </span>
                  </div>
                  {/* Progress track */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${t.progressPercent}%`,
                        backgroundColor: t.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements / Medals */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Logros & Medallas
                </h2>
                <p className="text-xs text-slate-500">Reconocimiento a tu esfuerzo y ritmo</p>
              </div>
              <Award className="w-5 h-5 text-amber-500" />
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {ACHIEVEMENTS_DATA.map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-colors ${
                    ach.unlocked
                      ? 'bg-amber-50/40 border-amber-200/80 text-slate-800'
                      : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-70'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      ach.unlocked
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold truncate text-slate-900">
                        {ach.title}
                      </h4>
                      {ach.unlocked && (
                        <span className="text-[10px] text-amber-700 font-medium">
                          {ach.unlockedAt}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
