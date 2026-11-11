import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { ScreenType } from '../types/mathvibe';
import { playSound } from '../utils/audio';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  userNickname: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  soundEnabled,
  onToggleSound,
}) => {
  const handleNav = (screen: ScreenType) => {
    playSound('click');
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single element brand mark */}
        <button
          onClick={() => handleNav('welcome')}
          className="flex items-center gap-2.5 text-left group transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg p-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span className="font-extrabold text-lg tracking-tighter">M</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0">
            Math<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500">Vibe</span>
          </span>
        </button>

        {/* Zone 2: Single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => handleNav('welcome')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              currentScreen === 'welcome'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Bienvenida
          </button>
          <button
            onClick={() => handleNav('dashboard')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              currentScreen === 'dashboard'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Panel Estudiante
          </button>
          <button
            onClick={() => handleNav('lab')}
            className={`whitespace-nowrap shrink-0 pb-1 border-b-2 transition-colors ${
              currentScreen === 'lab'
                ? 'border-blue-600 text-blue-600 font-semibold'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Laboratorio Matemático
          </button>
        </nav>

        {/* Zone 3: Primary action + sound switch */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Silenciar sonidos didácticos' : 'Activar efectos de audio'}
            className="p-2 text-slate-500 hover:text-slate-800 rounded-lg border border-slate-200/80 hover:bg-slate-50 transition-colors"
            title={soundEnabled ? 'Silenciar audio' : 'Activar audio didáctico'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {currentScreen === 'welcome' ? (
            <button
              onClick={() => handleNav('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm shadow-blue-600/20 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Comenzar
            </button>
          ) : currentScreen === 'dashboard' ? (
            <button
              onClick={() => handleNav('lab')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm shadow-indigo-600/20 transition-all whitespace-nowrap shrink-0"
            >
              Ir al Laboratorio
            </button>
          ) : (
            <button
              onClick={() => handleNav('dashboard')}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              Volver al Panel
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
