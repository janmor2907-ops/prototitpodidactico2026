import React, { useState, useEffect } from 'react';
import { ScreenType, StudentProfile, StudentMood } from './types/mathvibe';
import { INITIAL_STUDENTS } from './data/mockData';
import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { StudentDashboard } from './components/StudentDashboard';
import { MathLab } from './components/MathLab';
import { setSoundEnabled } from './utils/audio';
import { Home, User, FlaskConical } from 'lucide-react';

export default function App() {
  // Screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('welcome');

  // Students state with localStorage fallback
  const [students, setStudents] = useState<StudentProfile[]>(() => {
    try {
      const saved = localStorage.getItem('mathvibe_students');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_STUDENTS;
  });

  const [currentStudentId, setCurrentStudentId] = useState<string>(() => {
    try {
      const savedId = localStorage.getItem('mathvibe_active_student_id');
      if (savedId) return savedId;
    } catch {
      // fallback
    }
    return INITIAL_STUDENTS[0].id;
  });

  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [activeLabExerciseId, setActiveLabExerciseId] = useState<string | undefined>(undefined);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mathvibe_students', JSON.stringify(students));
    } catch {
      // ignore
    }
  }, [students]);

  useEffect(() => {
    try {
      localStorage.setItem('mathvibe_active_student_id', currentStudentId);
    } catch {
      // ignore
    }
  }, [currentStudentId]);

  const currentStudent = students.find((s) => s.id === currentStudentId) || students[0];

  const handleUpdateStudent = (updated: Partial<StudentProfile>) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === currentStudent.id ? { ...s, ...updated } : s))
    );
  };

  const handleToggleSound = () => {
    const newState = !soundOn;
    setSoundOn(newState);
    setSoundEnabled(newState);
  };

  const handleStartFromWelcome = (initialMood?: StudentMood) => {
    if (initialMood) {
      handleUpdateStudent({ currentMood: initialMood });
    }
    setCurrentScreen('dashboard');
  };

  const handleLaunchExerciseFromDashboard = (exerciseId: string) => {
    setActiveLabExerciseId(exerciseId);
    setCurrentScreen('lab');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-900 pb-16 md:pb-0">
      {/* Universal Top Bar Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        userNickname={currentStudent.nickname}
      />

      {/* Main Dynamic Viewport: 3 Functional Screens */}
      <main className="flex-1 w-full">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onStart={handleStartFromWelcome}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentScreen === 'dashboard' && (
          <StudentDashboard
            currentStudent={currentStudent}
            onUpdateStudent={handleUpdateStudent}
            onSelectStudent={(id) => setCurrentStudentId(id)}
            allStudents={students}
            onNavigate={(screen) => {
              setCurrentScreen(screen);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLaunchExercise={handleLaunchExerciseFromDashboard}
          />
        )}

        {currentScreen === 'lab' && (
          <MathLab
            currentStudent={currentStudent}
            onUpdateStudent={handleUpdateStudent}
            activeExerciseId={activeLabExerciseId}
            onNavigateToDashboard={() => {
              setCurrentScreen('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Mobile Sticky Bottom Bar (< 15% viewport height) for optimal responsive mobile usability */}
      <nav
        aria-label="Navegación móvil"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around text-[11px] font-medium text-slate-500"
      >
        <button
          onClick={() => {
            setCurrentScreen('welcome');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 transition-colors ${
            currentScreen === 'welcome' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
          }`}
        >
          <Home className="w-5 h-5" />
          <span>Inicio</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen('dashboard');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 transition-colors ${
            currentScreen === 'dashboard' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Mi Panel</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen('lab');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 py-1 transition-colors ${
            currentScreen === 'lab' ? 'text-blue-600 font-bold' : 'hover:text-slate-900'
          }`}
        >
          <FlaskConical className="w-5 h-5" />
          <span>Laboratorio</span>
        </button>
      </nav>
    </div>
  );
}
