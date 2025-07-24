import { logEvent, Analytics } from "firebase/analytics";
import { analytics } from "../config/firebase";

// 游戏事件类型定义
export interface GameEventParams {
  level_id?: string;
  chapter_id?: string;
  score?: number;
  coins?: number;
  hints_used?: number;
  time_spent?: number;
  success?: boolean;
  [key: string]: string | number | boolean | undefined;
}

// Analytics工具类
export class GameAnalytics {
  private static instance: GameAnalytics;
  private analytics: Analytics | null;

  private constructor() {
    this.analytics = analytics;
  }

  public static getInstance(): GameAnalytics {
    if (!GameAnalytics.instance) {
      GameAnalytics.instance = new GameAnalytics();
    }
    return GameAnalytics.instance;
  }

  /**
   * 通用事件上报方法
   * @param eventName 事件名称
   * @param parameters 事件参数
   */
  public trackEvent(eventName: string, parameters?: GameEventParams): void {
    if (!this.analytics) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      logEvent(this.analytics, eventName, parameters);
      console.log(`Analytics Event: ${eventName}`, parameters);
    } catch (error) {
      console.error('Failed to track event:', error);
    }
  }

  /**
   * 关卡开始事件
   */
  public trackLevelStart(chapterId: string, levelId: string): void {
    this.trackEvent('level_start', {
      chapter_id: chapterId,
      level_id: levelId
    });
  }

  /**
   * 关卡完成事件
   */
  public trackLevelComplete(chapterId: string, levelId: string, success: boolean, timeSpent: number, hintsUsed: number): void {
    this.trackEvent('level_complete', {
      chapter_id: chapterId,
      level_id: levelId,
      success,
      time_spent: timeSpent,
      hints_used: hintsUsed
    });
  }

  /**
   * 金币获得事件
   */
  public trackCoinsEarned(amount: number, source: string): void {
    this.trackEvent('coins_earned', {
      amount,
      source
    });
  }

  /**
   * 金币消费事件
   */
  public trackCoinsSpent(amount: number, item: string): void {
    this.trackEvent('coins_spent', {
      amount,
      item
    });
  }

  /**
   * 提示解锁事件
   */
  public trackHintUnlocked(chapterId: string, levelId: string, hintIndex: number): void {
    this.trackEvent('hint_unlocked', {
      chapter_id: chapterId,
      level_id: levelId,
      hint_index: hintIndex
    });
  }

  /**
   * 章节开始事件
   */
  public trackChapterStart(chapterId: string): void {
    this.trackEvent('chapter_start', {
      chapter_id: chapterId
    });
  }

  /**
   * 章节完成事件
   */
  public trackChapterComplete(chapterId: string, totalTime: number, totalCoins: number): void {
    this.trackEvent('chapter_complete', {
      chapter_id: chapterId,
      total_time: totalTime,
      total_coins: totalCoins
    });
  }

  /**
   * 游戏启动事件
   */
  public trackAppStart(): void {
    this.trackEvent('app_start');
  }

  /**
   * 用户重置进度事件
   */
  public trackProgressReset(): void {
    this.trackEvent('progress_reset');
  }
}

// 导出单例实例
export const gameAnalytics = GameAnalytics.getInstance(); 