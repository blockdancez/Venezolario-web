import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChapterSelect } from './components/ChapterSelect';
import { GamePlay } from './components/GamePlay';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { useGameData } from './hooks/useGameData';

// 内部应用组件，在 Router 上下文内处理数据加载
const AppContent: React.FC = () => {
  const { loading, error } = useGameData();

  if (loading) {
    return (
      <div className="min-h-screen bg-game-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-game-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-game-text-primary mb-4">
            Oops! Algo salió mal
          </h1>
          <p className="text-game-text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<ChapterSelect />} />
      <Route path="/game/:chapterId/:levelId" element={<GamePlay />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-game-background font-game">
        <AppContent />
      </div>
    </Router>
  );
}

export default App; 