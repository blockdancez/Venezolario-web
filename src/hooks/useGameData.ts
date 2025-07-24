import { useState, useEffect } from 'react';
import { Chapter, Level, UserProgress } from '../types/game';
import { gameConfig, TEMP_DATA_CONFIG } from '../config/game';

// 模拟 Supabase 数据获取
const fetchFromSupabase = async () => {
  // TODO: 实现 Supabase 数据获取逻辑
  throw new Error('Supabase integration not implemented yet');
};

// 获取临时数据
const getTempData = () => {
  return {
    chapters: TEMP_DATA_CONFIG.chapters,
    levels: TEMP_DATA_CONFIG.levels
  };
};

export const useGameData = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [levels, setLevels] = useState<Record<string, Level[]>>({});
  const [userProgress, setUserProgress] = useState<UserProgress>({
    currentChapter: 'mango-bajito',
    currentLevel: 'level-1',
    completedLevels: [],
    totalScore: 0,
    coins: 50
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载游戏数据
  useEffect(() => {
    const loadGameData = async () => {
      try {
        setLoading(true);
        
        let gameData;
        if (gameConfig.useSupabase) {
          gameData = await fetchFromSupabase();
        } else {
          gameData = getTempData();
        }
        
        setChapters(gameData.chapters);
        setLevels(gameData.levels);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load game data');
        // 降级到临时数据
        if (gameConfig.useSupabase) {
          const tempData = getTempData();
          setChapters(tempData.chapters);
          setLevels(tempData.levels);
        }
      } finally {
        setLoading(false);
      }
    };

    loadGameData();
  }, []);

  // 获取特定章节的关卡
  const getLevelsForChapter = (chapterId: string): Level[] => {
    return levels[chapterId] || [];
  };

  // 获取当前关卡（保留用于兼容性，但建议直接在组件中查找）
  const getCurrentLevel = (): Level | null => {
    return null;
  };





  return {
    chapters,
    levels,
    userProgress,
    loading,
    error,
    getLevelsForChapter,
    getCurrentLevel,
    setUserProgress
  };
}; 