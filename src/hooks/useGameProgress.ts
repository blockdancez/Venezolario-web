import { useState, useEffect } from 'react';

// 用户进度数据结构
interface UserGameProgress {
  completedLevels: string[];
  currentChapter: string;
  currentLevel: string;
  unlockedChapters: string[];
  coins: number;
  unlockedHints: { [levelId: string]: number }; // 记录每关解锁的提示数量
}

const DEFAULT_PROGRESS: UserGameProgress = {
  completedLevels: [],
  currentChapter: 'mango-bajito',
  currentLevel: 'level-1',
  unlockedChapters: ['mango-bajito'],
  coins: 50,
  unlockedHints: {}
};

const STORAGE_KEY = 'venezolario_progress';

export const useGameProgress = () => {
  const [progress, setProgress] = useState<UserGameProgress>(DEFAULT_PROGRESS);

  // 从localStorage加载进度
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setProgress({ ...DEFAULT_PROGRESS, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
  }, []);

  // 保存进度到localStorage
  const saveProgress = (newProgress: Partial<UserGameProgress>) => {
    const updatedProgress = { ...progress, ...newProgress };
    setProgress(updatedProgress);
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  // 完成关卡
  const completeLevel = (levelId: string) => {
    if (!progress.completedLevels.includes(levelId)) {
      const newCompletedLevels = [...progress.completedLevels, levelId];
      saveProgress({ 
        completedLevels: newCompletedLevels,
        coins: progress.coins + 50 // 完成关卡奖励50金币
      });
    }
  };

  // 解锁下一章节
  const unlockChapter = (chapterId: string) => {
    if (!progress.unlockedChapters.includes(chapterId)) {
      const newUnlockedChapters = [...progress.unlockedChapters, chapterId];
      saveProgress({ unlockedChapters: newUnlockedChapters });
    }
  };

  // 获取章节进度
  const getChapterProgress = (chapterId: string, totalLevels: number) => {
    const completedInChapter = progress.completedLevels.filter(
      levelId => levelId.startsWith(`${chapterId}-`)
    ).length;
    
    return {
      completed: completedInChapter,
      total: totalLevels,
      percentage: totalLevels > 0 ? Math.round((completedInChapter / totalLevels) * 100) : 0
    };
  };

  // 检查关卡是否已完成
  const isLevelCompleted = (levelId: string) => {
    return progress.completedLevels.includes(levelId);
  };

  // 检查章节是否解锁
  const isChapterUnlocked = (chapterId: string) => {
    return progress.unlockedChapters.includes(chapterId);
  };

  // 获取章节中下一个未完成的关卡
  const getNextUncompletedLevel = (chapterId: string, levels: any[]) => {
    return levels.find(level => 
      level.chapterId === chapterId && !progress.completedLevels.includes(level.id)
    );
  };

  // 解锁提示
  const unlockHint = (levelId: string) => {
    const currentUnlocked = progress.unlockedHints[levelId] || 1; // 默认第一个提示已解锁
    if (currentUnlocked < 3 && progress.coins >= 25) {
      saveProgress({
        coins: progress.coins - 25,
        unlockedHints: {
          ...progress.unlockedHints,
          [levelId]: currentUnlocked + 1
        }
      });
      return true;
    }
    return false;
  };

  // 获取关卡解锁的提示数量
  const getUnlockedHintsCount = (levelId: string) => {
    return progress.unlockedHints[levelId] || 1; // 默认第一个提示已解锁
  };



  // 重置进度（开发用）
  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    progress,
    completeLevel,
    unlockChapter,
    getChapterProgress,
    isLevelCompleted,
    isChapterUnlocked,
    getNextUncompletedLevel,
    unlockHint,
    getUnlockedHintsCount,
    resetProgress,
    saveProgress
  };
}; 