// 游戏难度枚举
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

// 关卡状态
export enum LevelStatus {
  LOCKED = 'locked',
  AVAILABLE = 'available',
  COMPLETED = 'completed'
}

// 游戏输入状态
export enum InputStatus {
  PENDING = 'pending',
  CORRECT = 'correct',
  INCORRECT = 'incorrect'
}

// 提示信息类型
export interface Hint {
  id: string;
  text: string;
}

// 关卡数据结构
export interface Level {
  id: string;
  chapterId: string;
  order: number;
  answer: string;
  hints: Hint[];
  difficulty: Difficulty;
  status: LevelStatus;
  completed: boolean;
  attempts: number;
}

// 章节数据结构
export interface Chapter {
  id: string;
  title: string;
  description: string;
  order: number;
  unlockedLevels: number;
  totalLevels: number;
  completed: boolean;
  iconPath?: string;
}

// 用户游戏进度
export interface UserProgress {
  currentChapter: string;
  currentLevel: string;
  completedLevels: string[];
  totalScore: number;
  coins: number;
}

// 游戏配置
export interface GameConfig {
  useSupabase: boolean;
  animationDuration: number;
  maxAttempts: number;
}

// 输入字符状态
export interface CharacterInput {
  char: string;
  index: number;
  status: InputStatus;
} 