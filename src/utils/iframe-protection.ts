/**
 * Iframe 保护工具
 * 检测网站是否被嵌入iframe，如果是则跳转到原始域名
 */

const TARGET_DOMAIN = 'https://www.venezolario.net/';

/**
 * 检测是否在iframe中
 */
export function isInIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch (e) {
    // 如果访问window.top抛出异常，说明被嵌入了不同源的iframe
    return true;
  }
}

/**
 * 获取当前页面路径
 */
function getCurrentPath(): string {
  return window.location.pathname + window.location.search + window.location.hash;
}

/**
 * 执行iframe保护
 * 如果检测到iframe嵌入，则跳转到目标域名
 */
export function protectFromIframe(): void {
  if (isInIframe()) {
    const currentPath = getCurrentPath();
    const redirectUrl = TARGET_DOMAIN.replace(/\/$/, '') + currentPath;
    
    try {
      // 尝试直接跳转顶层窗口
      if (window.top) {
        window.top.location.href = redirectUrl;
      } else {
        // 备用方案：跳转当前窗口
        window.location.href = redirectUrl;
      }
    } catch (e) {
      // 如果无法访问top，使用替代方案
      window.location.replace(redirectUrl);
    }
  }
}

/**
 * 初始化iframe保护
 * 应在应用启动时调用
 */
export function initIframeProtection(): void {
  // 立即执行检测
  protectFromIframe();
  
  // 监听页面可见性变化，防止延迟嵌入
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        protectFromIframe();
      }
    });
    
    // 定期检测（每5秒）
    setInterval(protectFromIframe, 5000);
  }
}

/**
 * 设置防嵌入的meta标签（可选）
 */
export function setAntiEmbedMeta(): void {
  if (typeof document !== 'undefined') {
    // 设置X-Frame-Options equivalent
    const metaFrameOptions = document.createElement('meta');
    metaFrameOptions.httpEquiv = 'X-Frame-Options';
    metaFrameOptions.content = 'DENY';
    document.head.appendChild(metaFrameOptions);
    
    // 设置CSP
    const metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = 'Content-Security-Policy';
    metaCSP.content = "frame-ancestors 'none';";
    document.head.appendChild(metaCSP);
  }
} 