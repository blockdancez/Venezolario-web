import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoadingScreen } from './components/LoadingScreen';
import { ChapterSelect } from './components/ChapterSelect';
import { GamePlay } from './components/GamePlay';
import { useGameData } from './hooks/useGameData';

// 内部应用组件，在 Router 上下文内处理数据加载
const AppContent: React.FC = () => {
  const { loading, error } = useGameData();

  if (loading) {
    return <LoadingScreen />;
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
      <Route path="/" element={<Navigate to="/loading" replace />} />
      <Route path="/loading" element={<LoadingScreen />} />
      <Route path="/chapters" element={<ChapterSelect />} />
      <Route path="/game/:chapterId/:levelId" element={<GamePlay />} />
      <Route path="*" element={<Navigate to="/chapters" replace />} />
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