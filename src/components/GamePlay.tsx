import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Home, Lightbulb, Plus } from 'lucide-react';
import { InputStatus } from '../types/game';
import { useGameData } from '../hooks/useGameData';
import { useGameProgress } from '../hooks/useGameProgress';

export const GamePlay: React.FC = () => {
  const { chapterId, levelId } = useParams<{ chapterId: string; levelId: string }>();
  const { getLevelsForChapter, chapters } = useGameData();
  const { 
    progress, 
    completeLevel: saveCompletedLevel, 
    unlockHint, 
    getUnlockedHintsCount,
    resetProgress 
  } = useGameProgress();
  const navigate = useNavigate();

  // 所有状态必须在条件检查之前声明
  const [userInput, setUserInput] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [inputStatus, setInputStatus] = useState<InputStatus>(InputStatus.PENDING);
  const [isAnimating, setIsAnimating] = useState(false);

  // 获取当前关卡
  const levels = getLevelsForChapter(chapterId || '');
  const currentLevel = levels.find(level => level.id === `${chapterId}-level-${levelId}`);
  
  // 键盘输入处理
  const handleKeyPress = React.useCallback((key: string) => {
    if (!currentLevel) return;
    
    // 移除空格计算实际答案长度（用户输入不包含空格）
    const cleanAnswer = currentLevel.answer.replace(/\s/g, '');
    
    if (key === 'Backspace') {
      // 检查当前位置是否有字符
      const hasCharAtCurrentPosition = userInput[selectedIndex] && userInput[selectedIndex] !== '';
      
      if (hasCharAtCurrentPosition) {
        // 如果当前位置有字符，删除它
        setUserInput(prev => {
          const newInput = [...prev];
          newInput[selectedIndex] = '';
          return newInput;
        });
      }
      
      // 无论是否有字符，都向前移动选中位置（如果不是第一个位置）
      if (selectedIndex > 0) {
        setSelectedIndex(prev => prev - 1);
      }
      
      // 如果用户删除了字符，重置为待输入状态
      if (inputStatus === InputStatus.INCORRECT) {
        setInputStatus(InputStatus.PENDING);
      }
    } else if (key.length === 1 && /[a-zA-ZÑñÁÉÍÓÚáéíóú]/.test(key)) {
      // 在当前选中位置输入字符
      setUserInput(prev => {
        const newInput = [...prev];
        newInput[selectedIndex] = key.toUpperCase();
        return newInput;
      });
      
      // 自动移动到下一个空位置，如果当前不是最后一个位置
      if (selectedIndex < cleanAnswer.length - 1) {
        setSelectedIndex(prev => prev + 1);
      }
      
      // 如果用户修改了字符，重置为待输入状态
      if (inputStatus === InputStatus.INCORRECT) {
        setInputStatus(InputStatus.PENDING);
      }
    }
  }, [currentLevel, selectedIndex, inputStatus]);

  // 虚拟键盘处理
  const handleVirtualKeyPress = (key: string) => {
    if (key === 'BACKSPACE') {
      handleKeyPress('Backspace');
    } else {
      handleKeyPress(key);
    }
  };

  // 返回首页
  const handleHome = () => {
    navigate('/chapters');
  };

  // 解锁提示
  const handleUnlockHint = () => {
    if (currentLevel) {
      unlockHint(currentLevel.id);
    }
  };

  // 获取当前关卡解锁的提示数量
  const unlockedHintsCount = currentLevel ? getUnlockedHintsCount(currentLevel.id) : 1;

  // 点击方块处理
  const handleBoxClick = (index: number) => {
    setSelectedIndex(index);
  };

  // 检查答案
  useEffect(() => {
    // 移除空格计算实际答案长度
    const cleanAnswer = currentLevel?.answer.replace(/\s/g, '') || '';
    if (!currentLevel) return;
    
    // 检查是否所有位置都有字符
    const filledCount = userInput.filter(char => char !== '').length;
    if (filledCount !== cleanAnswer.length) return;
    
    setIsAnimating(true);
    
    const checkAnswer = setTimeout(() => {
      const userAnswer = userInput.join('').toUpperCase();
      if (userAnswer === cleanAnswer.toUpperCase()) {
        setInputStatus(InputStatus.CORRECT);
        
                            // 正确答案，保存进度并进入下一关
          saveCompletedLevel(currentLevel.id);
          
          const nextLevelTimeout = setTimeout(() => {
            setInputStatus(InputStatus.PENDING);
            const nextCleanAnswer = currentLevel.answer.replace(/\s/g, '');
            setUserInput(new Array(nextCleanAnswer.length).fill(''));
            setSelectedIndex(0);
            
            // 检查是否所有关卡都完成（用于全部通关重置）
            let allCompleted = true;
            for (const chapter of chapters) {
              const chapterLevels = getLevelsForChapter(chapter.id);
              for (const level of chapterLevels) {
                if (!progress.completedLevels.includes(level.id) && level.id !== currentLevel.id) {
                  allCompleted = false;
                  break;
                }
              }
              if (!allCompleted) break;
            }
            
            if (allCompleted) {
              // 全部通关，重置进度并返回主页
              resetProgress();
              navigate('/chapters');
              return;
            }
            
            // 检查当前章节是否有下一关
            const currentLevelIndex = levels.findIndex(level => level.id === currentLevel.id);
            if (currentLevelIndex < levels.length - 1) {
              const nextLevel = levels[currentLevelIndex + 1];
              // 从 'mango-bajito-level-2' 提取 '2'
              const nextLevelId = nextLevel.id.split('-level-')[1];
              navigate(`/game/${chapterId}/${nextLevelId}`);
            } else {
              // 当前章节完成，返回章节选择
              navigate('/chapters');
            }
          }, 2000);
        
        // 清理函数
        return () => clearTimeout(nextLevelTimeout);
      } else {
        setInputStatus(InputStatus.INCORRECT);
        const incorrectTimeout = setTimeout(() => {
          setInputStatus(InputStatus.PENDING);
        }, 1000);
        
        // 清理函数
        return () => clearTimeout(incorrectTimeout);
      }
      setIsAnimating(false);
    }, 100);
    
    // 清理函数
    return () => clearTimeout(checkAnswer);
  }, [userInput, currentLevel?.id, currentLevel?.answer]);

    // 重置游戏状态
  useEffect(() => {
    if (currentLevel) {
      const cleanAnswer = currentLevel.answer.replace(/\s/g, '');
      setUserInput(new Array(cleanAnswer.length).fill(''));
      setSelectedIndex(0);
      setInputStatus(InputStatus.PENDING);
    }
  }, [currentLevel]);

  // 物理键盘事件
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      handleKeyPress(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  // 西语虚拟键盘布局
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  // 条件渲染必须在所有hooks之后
  if (!currentLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">关卡未找到</h1>
          <button 
            onClick={() => navigate('/chapters')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            返回章节选择
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 顶部导航栏 - 移动端优化 */}
      <div className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center">
          <button 
            onClick={handleHome}
            className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all transform hover:scale-105 active:scale-95"
          >
            <Home className="w-6 h-6" />
          </button>

          <div className="text-center flex-1">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nivel {currentLevel.order}
            </h1>
            <p className="text-sm text-gray-500 font-medium">Adivina la palabra</p>
          </div>

          {/* 金币显示 */}
          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl px-3 py-2 shadow-lg">
            <img src="/Sprite/coin.png" alt="coins" className="w-5 h-5 mr-1" />
            <span className="font-bold text-white text-sm">{progress.coins}</span>
          </div>
        </div>
      </div>

      {/* 主游戏区域 */}
      <div className="p-4 pb-6 max-w-lg mx-auto">
        {/* 提示卡片 */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl mb-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-bold text-gray-800">Pistas</h3>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <img src="/Sprite/coin.png" alt="coins" className="w-4 h-4" />
              <span>25 por pista</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {currentLevel.hints.map((hint, index) => {
              const isUnlocked = index < unlockedHintsCount;
              const isNextToUnlock = index === unlockedHintsCount && unlockedHintsCount < 3;
              
              return (
                <div key={hint.id} className={`
                  flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200
                  ${isUnlocked 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100' 
                    : 'bg-gray-50 border-gray-200'
                  }
                `}>
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-lg
                    ${isUnlocked 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                      : 'bg-gray-300 text-gray-600'
                    }
                  `}>
                    {index + 1}
                  </div>
                  
                  {isUnlocked ? (
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base flex-1">{hint.text}</p>
                  ) : isNextToUnlock ? (
                    <div className="flex items-center justify-between flex-1">
                      <p className="text-gray-400 leading-relaxed text-sm sm:text-base italic">Pista bloqueada</p>
                      <button
                        onClick={handleUnlockHint}
                        disabled={progress.coins < 25}
                        className={`
                          flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-bold transition-all
                          ${progress.coins >= 25
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }
                        `}
                      >
                        <Plus className="w-3 h-3" />
                        <span>25</span>
                        <img src="/Sprite/coin.png" alt="coins" className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400 leading-relaxed text-sm sm:text-base flex-1 italic">Pista bloqueada</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 输入区域 */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-1">Tu respuesta</h3>
            <p className="text-gray-600 text-sm">Escribe la palabra letra por letra</p>
          </div>
          
                                   <div className="flex justify-center items-center flex-wrap gap-2 px-2">
                {(() => {
                  const words = currentLevel.answer.split(' ');
                  let charIndex = 0;
                  
                  return words.map((word, wordIndex) => (
                    <div key={wordIndex} className="flex gap-1 sm:gap-2">
                      {Array.from({ length: word.length }).map((_, _letterIndex) => {
                        const currentCharIndex = charIndex;
                        charIndex++;
                        
                        const char = userInput[currentCharIndex] || '';
                        const isSelected = currentCharIndex === selectedIndex;
                        const hasChar = char !== '';
                        
                        let bgColor = 'bg-white border-gray-300';
                        let textColor = 'text-gray-800';
                        
                        if (inputStatus === InputStatus.CORRECT && hasChar) {
                          bgColor = 'bg-green-500 border-green-600';
                          textColor = 'text-white';
                        } else if (inputStatus === InputStatus.INCORRECT && hasChar) {
                          bgColor = 'bg-red-500 border-red-600';
                          textColor = 'text-white';
                        } else if (isSelected) {
                          bgColor = 'bg-blue-100 border-blue-400';
                          textColor = 'text-blue-800';
                        } else if (hasChar) {
                          bgColor = 'bg-gray-100 border-gray-400';
                          textColor = 'text-gray-800';
                        }

                        return (
                          <div
                            key={currentCharIndex}
                            onClick={() => handleBoxClick(currentCharIndex)}
                            className={`
                              w-10 h-10 sm:w-12 sm:h-12 ${bgColor} border-2 rounded-xl
                              flex items-center justify-center text-xl sm:text-2xl font-bold
                              transition-all duration-300 ease-in-out transform cursor-pointer
                              hover:scale-105 hover:shadow-lg
                              ${textColor}
                              ${isSelected ? 'ring-2 ring-blue-400 scale-105' : ''}
                              ${isAnimating ? 'animate-bounce-in' : ''}
                              shadow-lg
                            `}
                          >
                            <span 
                              className={`
                                transition-opacity duration-300 ease-in-out
                                ${hasChar ? 'opacity-100' : 'opacity-0'}
                              `}
                            >
                              {char}
                            </span>
                          </div>
                        );
                      })}
                      {/* 单词间间隔 */}
                      {wordIndex < words.length - 1 && (
                        <div className="w-3 flex items-center justify-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mx-1"></div>
                        </div>
                      )}
                    </div>
                  ));
                })()}
              </div>
        </div>

        {/* 虚拟键盘 */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-xl border border-gray-100">
          <div className="space-y-2">
            {keyboardRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center gap-1">
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleVirtualKeyPress(key)}
                    className={`
                      ${key === 'BACKSPACE' ? 'px-2 sm:px-3' : 'px-1 sm:px-2'} py-2 sm:py-3 
                      bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-xs sm:text-sm rounded-lg 
                      hover:bg-blue-50 hover:border-blue-300 transition-all duration-200
                      min-w-[28px] sm:min-w-[36px] max-w-[34px] sm:max-w-[44px] flex items-center justify-center
                      active:bg-blue-100 transform active:scale-95 min-h-[40px] sm:min-h-[44px]
                    `}
                  >
                    {key === 'BACKSPACE' ? '⌫' : key}
                  </button>
                ))}
              </div>
            ))}
          </div>
          
        </div>

        {/* 成功消息 */}
        {inputStatus === InputStatus.CORRECT && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm w-full transform animate-bounce-in">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">¡Correcto!</h3>
              <p className="text-gray-600 mb-4">¡Excelente trabajo!</p>
              
              {/* 金币奖励显示 */}
              <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg p-3">
                <img src="/Sprite/coin.png" alt="coins" className="w-6 h-6" />
                <span className="font-bold text-yellow-700 text-lg">+50</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 