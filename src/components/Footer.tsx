import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo和标题 */}
          <div className="text-center">
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Venezolario
            </h3>
            <p className="text-sm text-gray-500">El juego de palabras venezolano</p>
          </div>

          {/* 链接 */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link 
              to="/privacy" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>

          </div>

          {/* 版权信息 */}
          <div className="text-center text-xs text-gray-400">
            <p>© {new Date().getFullYear()} Meta Innovation Ltd. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}; 