/**
 * iframe 保护工具
 * 防止页面被恶意嵌入到其他网站的iframe中
 */

export interface FrameProtectionConfig {
  targetDomain: string;
  allowedDomains?: string[];
  enableLogging?: boolean;
  checkInterval?: number;
}

export class FrameProtection {
  private config: Required<FrameProtectionConfig>;
  private intervalId: number | null = null;

  constructor(config: FrameProtectionConfig) {
    this.config = {
      targetDomain: config.targetDomain,
      allowedDomains: config.allowedDomains || [],
      enableLogging: config.enableLogging ?? true,
      checkInterval: config.checkInterval ?? 1000
    };
  }

  /**
   * 检测当前页面是否在iframe中
   */
  private isInIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      // 跨域限制说明在iframe中
      return true;
    }
  }

  /**
   * 检测是否在任何类型的框架中
   */
  private isInFrame(): boolean {
    try {
      return (
        window.frameElement !== null ||
        window.parent !== window ||
        window.top !== window.self
      );
    } catch (e) {
      return true;
    }
  }

  /**
   * 检查当前域名是否在允许列表中
   */
  private isAllowedDomain(): boolean {
    try {
      const currentHost = window.location.hostname;
      const targetHost = new URL(this.config.targetDomain).hostname;
      
      // 如果是目标域名，允许
      if (currentHost === targetHost) {
        return true;
      }

      // 检查是否在允许列表中
      return this.config.allowedDomains.some(domain => {
        const allowedHost = new URL(domain).hostname;
        return currentHost === allowedHost;
      });
    } catch (e) {
      return false;
    }
  }

  /**
   * 获取父页面信息（用于日志记录）
   */
  private getParentInfo(): string {
    try {
      if (window.parent && window.parent !== window) {
        return window.parent.location.href;
      }
    } catch (e) {
      return '跨域限制，无法获取父页面信息';
    }
    return '未知';
  }

  /**
   * 执行跳转
   */
  private performRedirect(): void {
    if (this.config.enableLogging) {
      console.warn('检测到页面被嵌入iframe，父页面:', this.getParentInfo());
      console.warn('正在跳转到官方网站:', this.config.targetDomain);
    }

    try {
      // 尝试跳转顶级窗口
      if (window.top) {
        window.top.location.href = this.config.targetDomain;
      } else {
        window.location.href = this.config.targetDomain;
      }
    } catch (e) {
      // 跨域限制时使用当前窗口跳转
      window.location.href = this.config.targetDomain;
    }
  }

  /**
   * 执行检测
   */
  private performCheck(): void {
    try {
      // 如果在允许的域名上，不需要检测
      if (this.isAllowedDomain()) {
        return;
      }

      // 检测是否在iframe中
      if (this.isInIframe() || this.isInFrame()) {
        this.performRedirect();
      }
    } catch (error) {
      if (this.config.enableLogging) {
        console.error('iframe检测过程中发生错误:', error);
      }
      // 发生错误时为了安全起见也跳转
      this.performRedirect();
    }
  }

  /**
   * 启动保护
   */
  public start(): void {
    // 立即执行一次检测
    this.performCheck();

    // 启动定期检测
    if (this.config.checkInterval > 0) {
      this.intervalId = window.setInterval(() => {
        this.performCheck();
      }, this.config.checkInterval);
    }

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.performCheck();
      }
    });

    // 监听焦点变化
    window.addEventListener('focus', () => {
      this.performCheck();
    });
  }

  /**
   * 停止保护
   */
  public stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * 添加允许的域名
   */
  public addAllowedDomain(domain: string): void {
    if (!this.config.allowedDomains.includes(domain)) {
      this.config.allowedDomains.push(domain);
    }
  }

  /**
   * 移除允许的域名
   */
  public removeAllowedDomain(domain: string): void {
    const index = this.config.allowedDomains.indexOf(domain);
    if (index > -1) {
      this.config.allowedDomains.splice(index, 1);
    }
  }
}

// 便捷函数
export function initFrameProtection(config: FrameProtectionConfig): FrameProtection {
  const protection = new FrameProtection(config);
  protection.start();
  return protection;
}

// 默认配置
export const defaultFrameProtection = () => {
  return initFrameProtection({
    targetDomain: 'https://www.venezolario.net/',
    allowedDomains: [
      'https://www.venezolario.net',
      'https://venezolario.net',
      'http://localhost:3000',
      'http://localhost:3003',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3003'
    ],
    enableLogging: process.env.NODE_ENV === 'development',
    checkInterval: 1000
  });
}; 