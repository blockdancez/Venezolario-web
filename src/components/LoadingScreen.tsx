import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            navigate('/chapters');
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* 动态背景粒子效果 */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* 主标题 */}
      <div className="text-center mb-12 sm:mb-16 z-10">
        <div className="mb-4 sm:mb-6">
          <div className="text-5xl sm:text-6xl md:text-8xl mb-4">🇻🇪</div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white drop-shadow-2xl mb-4 tracking-wider">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Venezo
          </span>
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            lario
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium tracking-wide">
          Descubre las palabras venezolanas
        </p>
      </div>

      {/* 进度条区域 */}
      <div className="w-full max-w-sm sm:max-w-md mx-auto px-6 sm:px-8 z-10">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 font-semibold text-sm sm:text-base">Cargando...</span>
            <span className="text-white font-bold text-sm sm:text-base">{progress}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* 装饰性文字 */}
        <div className="text-center">
          <p className="text-white/70 text-xs sm:text-sm font-medium">
            Preparando tu aventura venezolana...
          </p>
        </div>
      </div>

      {/* 装饰性元素 - 响应式调整 */}
      <div className="absolute top-16 sm:top-20 left-8 sm:left-20 text-3xl sm:text-6xl opacity-30 animate-spin-slow">⭐</div>
      <div className="absolute top-20 sm:top-32 right-8 sm:right-24 text-2xl sm:text-4xl opacity-40 animate-bounce">🎯</div>
      <div className="absolute bottom-20 sm:bottom-32 left-6 sm:left-16 text-3xl sm:text-5xl opacity-35 animate-pulse">🎮</div>
      <div className="absolute bottom-12 sm:bottom-20 right-8 sm:right-20 text-xl sm:text-3xl opacity-30 animate-bounce">🏆</div>
    </div>
  );
}; 