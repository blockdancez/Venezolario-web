/**
 * SEO工具函数 - 动态设置页面meta标签
 */

interface SEOData {
  title: string;
  description: string;
  url?: string;
  keywords?: string;
  canonical?: string;
}

/**
 * 更新页面的SEO meta标签
 */
export function updatePageSEO(data: SEOData) {
  // 更新页面标题
  document.title = data.title;
  
  // 更新描述
  updateMetaTag('description', data.description);
  
  // 更新关键词
  if (data.keywords) {
    updateMetaTag('keywords', data.keywords);
  }
  
  // 更新Open Graph标签
  updateMetaProperty('og:title', data.title);
  updateMetaProperty('og:description', data.description);
  if (data.url) {
    updateMetaProperty('og:url', data.url);
  }
  
  // 更新Twitter标签
  updateMetaProperty('twitter:title', data.title);
  updateMetaProperty('twitter:description', data.description);
  if (data.url) {
    updateMetaProperty('twitter:url', data.url);
  }
  
  // 更新canonical链接
  if (data.canonical) {
    updateCanonicalLink(data.canonical);
  }
}

/**
 * 更新meta标签
 */
function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

/**
 * 更新meta property标签
 */
function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.content = content;
}

/**
 * 更新canonical链接
 */
function updateCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * 获取当前页面的完整URL
 */
function getCurrentPageUrl(): string {
  return window.location.href;
}

/**
 * 生成游戏页面SEO数据
 */
export function generateGamePageSEO(chapterName: string, levelNumber: number, answer: string, firstHint: string) {
  const title = `Venezolario: ${chapterName} - Nivel ${levelNumber} | ${answer}`;
  const description = `Resuelve el Nivel ${levelNumber} de "${chapterName}" en Venezolario. ¿Qué es "${firstHint}"?`;
  const url = getCurrentPageUrl(); // 使用当前页面的实际URL
  const canonical = url; // canonical与当前URL相同
  const keywords = `venezolario, ${chapterName}, nivel ${levelNumber}, ${answer}, acertijo palabras, venezuela`;
  
  return {
    title,
    description,
    url,
    canonical,
    keywords
  };
}

/**
 * 生成首页SEO数据
 */
export function generateHomePageSEO() {
  const title = 'Venezolario: Palabras Vzla Juego Online';
  const description = '¡Juega Venezolario: Palabras Vzla en línea! Explora la cultura venezolana a través de acertijos de palabras auténticos, colecciona cartas culturales y compite en torneos.';
  const url = getCurrentPageUrl(); // 使用当前页面的实际URL
  const canonical = url;
  const keywords = 'venezolario, palabras vzla, juego venezolano, acertijos palabras, cultura venezuela, venezolario online, venezolario apk';
  
  return {
    title,
    description,
    url,
    canonical,
    keywords
  };
} 