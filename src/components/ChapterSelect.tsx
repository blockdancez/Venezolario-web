import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Lock, Play, Award } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import coin from '../assets/coin.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useGameData } from '../hooks/useGameData';
import { useGameProgress } from '../hooks/useGameProgress';
import { Footer } from './Footer';

export const ChapterSelect: React.FC = () => {
  const { chapters, getLevelsForChapter } = useGameData();
  const { progress, getChapterProgress, isChapterUnlocked } = useGameProgress();
  const navigate = useNavigate();

  const handleChapterClick = (chapterId: string) => {
    if (isChapterUnlocked(chapterId)) {
      // 获取该章节的所有关卡
      const levels = getLevelsForChapter(chapterId);
      if (levels && levels.length > 0) {
        // 调试信息
        console.log('章节点击:', chapterId);
        console.log('已完成关卡:', progress.completedLevels);
        console.log('章节关卡:', levels.map(l => l.id));
        
        // 找到第一个未完成的关卡
        const nextUncompletedLevel = levels.find(level => 
          !progress.completedLevels.includes(level.id)
        );
        
        console.log('下一个未完成关卡:', nextUncompletedLevel?.id);
        
        if (nextUncompletedLevel) {
          // 进入下一个未完成的关卡
          const levelId = nextUncompletedLevel.id.split('-level-')[1];
          console.log('跳转到关卡:', levelId);
          navigate(`/game/${chapterId}/${levelId}`);
        } else {
          // 如果所有关卡都完成了，进入最后一关供重玩
          const lastLevelId = levels[levels.length - 1].id.split('-level-')[1];
          console.log('所有关卡完成，跳转到最后一关:', lastLevelId);
          navigate(`/game/${chapterId}/${lastLevelId}`);
        }
      }
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 顶部导航栏 - 移动端优化 */}
      <div className="bg-white shadow-lg border-b-4 border-blue-500">
        <div className="max-w-lg mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center">
          <button 
            onClick={handleHomeClick}
            className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all transform hover:scale-105 active:scale-95"
          >
            <Home className="w-6 h-6" />
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Venezolario
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">Selecciona un capítulo</p>
          </div>

          {/* 金币显示 */}
          <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl px-3 py-2 shadow-lg">
                         <img src={coin} alt="coins" className="w-5 h-5 mr-1" />
            <span className="font-bold text-white text-sm">{progress.coins}</span>
          </div>
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="p-4 pb-8">
        <div className="max-w-lg mx-auto">
          {/* 欢迎区域 */}
          <div className="text-center mb-8 mt-6">
            <div className="text-6xl mb-4 animate-bounce">🇻🇪</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Bienvenido!</h2>
            <p className="text-gray-600 px-4">
              Descubre las palabras más típicas de Venezuela
            </p>
          </div>

          {/* Swiper轮播图 */}
          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !w-2 !h-2 !mx-1 !bg-gray-300 !opacity-100',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-500 !scale-125',
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            breakpoints={{
              640: {
                spaceBetween: 24,
              },
            }}
            className="chapter-swiper"
          >
            {chapters.map((chapter, index) => {
              const isUnlocked = isChapterUnlocked(chapter.id);
              const levels = getLevelsForChapter(chapter.id);
              const totalLevels = levels ? levels.length : 0;
              const chapterProgress = getChapterProgress(chapter.id, totalLevels);
              
              return (
                <SwiperSlide key={chapter.id}>
                  <div
                    onClick={() => handleChapterClick(chapter.id)}
                    className={`
                      relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden mx-2
                      transition-all duration-300 transform
                      ${isUnlocked 
                        ? 'border-blue-200 hover:shadow-xl hover:scale-[1.02] cursor-pointer hover:border-blue-400' 
                        : 'border-gray-200 opacity-60 cursor-not-allowed'
                      }
                    `}
                  >
                    {/* 背景装饰 */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
                    
                    <div className="relative p-4 sm:p-6">
                      {/* 章节头部 */}
                      <div className="flex items-start justify-between mb-4 sm:mb-6">
                        <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          {/* 章节图标 */}
                          <div className={`
                            w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg flex-shrink-0
                            ${isUnlocked 
                              ? 'bg-gradient-to-br from-blue-400 to-purple-500' 
                              : 'bg-gray-200'
                            }
                          `}>
                            <span className={isUnlocked ? 'filter drop-shadow-sm' : ''}>
                              {index === 0 ? '🥭' : '🤠'}
                            </span>
                          </div>

                          {/* 章节信息 */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 truncate">
                              {chapter.title}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-3">
                              {chapter.description}
                            </p>
                          </div>
                        </div>

                        {/* 锁定图标 */}
                        {!isUnlocked && (
                          <div className="p-2 sm:p-3 bg-gray-100 rounded-full flex-shrink-0">
                            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* 进度信息 */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                        <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                          {/* 进度条 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1 sm:mb-2">
                              <span className="text-xs sm:text-sm font-medium text-gray-500">Progreso</span>
                              <span className="text-xs sm:text-sm font-bold text-blue-600">
                                {chapterProgress.completed}/{chapterProgress.total}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                              <div 
                                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                                style={{ width: `${chapterProgress.percentage}%` }}
                              />
                            </div>
                          </div>

                          {/* 成就徽章 */}
                          {chapterProgress.percentage === 100 && (
                            <div className="p-2 sm:p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg flex-shrink-0">
                              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            </div>
                          )}
                        </div>

                        {/* 开始按钮 */}
                        {isUnlocked && (
                          <div className="flex justify-center sm:justify-end sm:ml-4">
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all">
                              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* 完成奖励 */}
                      {chapterProgress.percentage === 100 && (
                        <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-2 sm:p-3 mt-3 sm:mt-4">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
                          <span className="text-xs sm:text-sm font-bold text-gray-700">
                            ¡Capítulo Completado!
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

            {/* Swiper导航按钮 */}
            <div className="swiper-button-prev !hidden sm:!flex !text-gray-600 !w-10 !h-10 !mt-0 !top-1/2 !left-0 !-translate-x-4 !bg-white !rounded-full !shadow-lg !border !border-gray-200 after:!text-sm after:!font-bold"></div>
            <div className="swiper-button-next !hidden sm:!flex !text-gray-600 !w-10 !h-10 !mt-0 !top-1/2 !right-0 !translate-x-4 !bg-white !rounded-full !shadow-lg !border !border-gray-200 after:!text-sm after:!font-bold"></div>
          </Swiper>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}; 