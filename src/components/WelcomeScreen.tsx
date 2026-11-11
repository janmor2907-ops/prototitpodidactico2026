import React, { useState } from 'react';
import { ArrowRight, Compass, Sparkles, Smile, Flame, ShieldCheck, Heart, Brain, Zap } from 'lucide-react';
import { StudentMood, ScreenType } from '../types/mathvibe';
import { playSound } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: (selectedMood?: StudentMood) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart, onNavigate }) => {
  const [selectedVibe, setSelectedVibe] = useState<StudentMood>('entusiasmo');

  const handleVibeClick = (mood: StudentMood) => {
    setSelectedVibe(mood);
    playSound('click');
  };

  const handleStart = () => {
    playSound('correct');
    onStart(selectedVibe);
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-400/10 via-violet-400/15 to-cyan-400/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand & Hero Copy */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-700 bg-violet-50 border border-violet-100 rounded-full px-3.5 py-1">
              <Sparkles className="w-3.5 h-3.5 text-violet-600" />
              <span>Aprendizaje Matemático Adaptativo</span>
              <span aria-hidden="true" className="text-violet-300">·</span>
              <span className="text-violet-600">Edición 2026</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.12]">
                Math<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500">Vibe</span>
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-800 tracking-tight font-display">
                Matemáticas que se adaptan a ti.
              </p>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Descubre una forma inteligente y libre de frustración para dominar las matemáticas. MathVibe sincroniza tu <strong className="text-slate-900 font-semibold">desempeño académico</strong>, tu <strong className="text-slate-900 font-semibold">ritmo propio</strong> y tus <strong className="text-slate-900 font-semibold">emociones</strong> en cada sesión.
            </p>

            {/* Quick Interactive Vibe Preview */}
            <div className="w-full max-w-lg p-4 bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-medium text-slate-700">¿Cómo te sientes para aprender hoy?</span>
                <span>Calibración en tiempo real</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'entusiasmo', label: '¡Entusiasmo!', emoji: '⚡', desc: 'Retos altos' },
                  { id: 'tranquilidad', label: 'Tranquilidad', emoji: '🎯', desc: 'Ritmo fluido' },
                  { id: 'frustracion', label: 'Frustración', emoji: '💡', desc: 'Apoyo y pistas' },
                  { id: 'cansancio', label: 'Cansancio', emoji: '🌱', desc: 'Pausa suave' },
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleVibeClick(v.id as StudentMood)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                      selectedVibe === v.id
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                    }`}
                  >
                    <span className="text-lg leading-none mb-1">{v.emoji}</span>
                    <span className="text-xs font-semibold leading-tight">{v.label}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">{v.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={handleStart}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:via-indigo-700 hover:to-cyan-600 text-white rounded-xl font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Comenzar</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onNavigate('lab')}
                className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 rounded-xl font-semibold text-sm transition-colors text-center"
              >
                Explorar Laboratorio Directo
              </button>
            </div>

            {/* Micro Trust Proof */}
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Sin exámenes estresantes</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Racha adaptativa</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-violet-500" />
                <span>Atención a la frustración</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Illustration Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-white p-2">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/11] bg-slate-950">
                <img
                  src="/src/assets/images/hero_mathvibe_illustration_1794420460223.jpg"
                  alt="Ilustración matemática tridimensional MathVibe con poliedros, ondas y espiral áurea"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-xs">
                  <span className="font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    Geometría · Álgebra · Sólidos · Lógica
                  </span>
                  <span className="text-cyan-300 font-mono text-[11px]">
                    f(x) = adaptativo
                  </span>
                </div>
              </div>

              {/* Floating Feature highlight in bottom */}
              <div className="p-4 grid grid-cols-3 gap-3 text-center border-t border-slate-100 mt-2">
                <div>
                  <div className="text-lg font-bold text-blue-600 font-display tabular-nums">100%</div>
                  <div className="text-[11px] text-slate-500">Personalizado</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-violet-600 font-display tabular-nums">+42%</div>
                  <div className="text-[11px] text-slate-500">Comprensión</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-cyan-600 font-display tabular-nums">0%</div>
                  <div className="text-[11px] text-slate-500">Frustración</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Section */}
      <section className="bg-slate-100/60 border-y border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
              Los 3 Pilares del Aprendizaje Adaptativo
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              A diferencia de las plataformas tradicionales que solo miden aciertos o errores, MathVibe comprende al estudiante de forma integral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  1. Desempeño Académico
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Evaluación continua de dominio conceptual en aritmética, álgebra, geometría y pensamiento probabilístico, ajustando la complejidad según tus avances reales.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-blue-600 font-medium">
                <span>Dificultad adaptativa continua</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-violet-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  2. Ritmo de Aprendizaje
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Cada mente procesa ideas a su propia velocidad. MathVibe no te apresura con cronómetros punitivos, sino que calcula tu ventana de asimilación óptima.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-violet-600 font-medium">
                <span>Sin cronómetros punitivos</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-cyan-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <Smile className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  3. Emociones del Estudiante
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  El factor <strong className="text-slate-800">Vibe</strong>: Identifica cuando sientes curiosidad, bloqueo o cansancio, ofreciendo pistas guiadas o reforzando con explicaciones amigables.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs text-cyan-600 font-medium">
                <span>Acompañamiento empático</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-6 px-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <p className="max-w-2xl mx-auto">
          MathVibe · Matemáticas que se adaptan a ti · Desarrollado para estudiantes, docentes y curiosos de las matemáticas.
        </p>
      </footer>
    </div>
  );
};
