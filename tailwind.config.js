/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 游戏主题色彩
        game: {
          primary: '#4F8BFF',     // 主蓝色
          secondary: '#FFD93D',   // 主黄色
          success: '#4CAF50',     // 成功绿色
          error: '#F44336',       // 错误红色
          background: '#E8F4FD',  // 背景蓝色
          card: '#FFFFFF',        // 卡片白色
          text: {
            primary: '#2D3748',   // 主文字颜色
            secondary: '#718096', // 次要文字颜色
          },
          input: {
            pending: '#1A365D',   // 待输入深蓝色
            filled: '#2D3748',    // 已输入文字色
            correct: '#4CAF50',   // 正确绿色
            incorrect: '#F44336', // 错误红色
          }
        }
      },
      fontFamily: {
        game: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'bounce-in': 'bounceIn 0.4s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'character-enter': 'characterEnter 0.4s ease-out',
        'character-exit': 'characterExit 0.2s ease-in',
        'pop-in': 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.8' },
          '50%': { opacity: '1' },
        },
        characterEnter: {
          '0%': { 
            transform: 'scale(0.3) rotateY(180deg)', 
            opacity: '0' 
          },
          '50%': { 
            transform: 'scale(1.1) rotateY(90deg)', 
            opacity: '0.7' 
          },
          '100%': { 
            transform: 'scale(1) rotateY(0deg)', 
            opacity: '1' 
          },
        },
        characterExit: {
          '0%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
          '100%': { 
            transform: 'scale(0.3)', 
            opacity: '0' 
          },
        },
        popIn: {
          '0%': { 
            transform: 'scale(0.8)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'scale(1)', 
            opacity: '1' 
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
} 