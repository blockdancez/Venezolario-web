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

  // 滚动到页面顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
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

    </div>
    
    <div className="relative bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-game-orange/10 to-transparent"></div>
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-venezuela-yellow via-venezuela-blue to-venezuela-red"></div>
        
        <main className="relative max-w-6xl mx-auto px-6 py-16 leading-relaxed lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-venezuela-yellow to-game-orange rounded-full mb-6 shadow-lg animate-float">
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L13.09 6.26L17 4.27L15.64 8.81L20 7.5L17.81 11.5L22 11L18.27 14.14L21 17L16.5 16.27L17.5 20L13 17.77L12 22L11 17.77L6.5 20L7.5 16.27L3 17L5.73 14.14L2 11L6.19 11.5L4 7.5L8.36 8.81L7 4.27L10.91 6.26L12 2Z"></path>
                    </svg>
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-game-orange to-venezuela-red bg-clip-text text-transparent mb-4">
                    Venezolario: Palabras Vzla
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Immerse yourself in Venezuelan culture through the ultimate word puzzle experience
                </p>
            </div>
            <section className="mb-16 animate-slide-up">
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Welcome to <span className="text-game-orange">Venezolario: Palabras Vzla</span>
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Discover the engaging Venezuelan word puzzle game that combines entertainment with cultural education. This platform offers an immersive journey through Venezuela's linguistic heritage, featuring authentic words and expressions that define Venezuelan culture.
                    </p>
                </div>
            </section>

            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Venezolario: Palabras Vzla Game Features
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-venezuela-yellow">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Authentic Venezuelan Content</h3>
                        <p className="text-gray-600">Features hundreds of genuine Venezuelan words, phrases, and cultural expressions carefully curated to represent Venezuelan language and culture.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-venezuela-blue">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Collectible Cultural Cards</h3>
                        <p className="text-gray-600">Unlock special cards featuring iconic Venezuelan characters, traditional foods, and cultural symbols as you progress.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-venezuela-red">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Weekly Tournaments</h3>
                        <p className="text-gray-600">Compete in exciting tournaments that test your knowledge of Venezuelan culture and language through challenging puzzles.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-game-orange">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Venezuelan Dictionary</h3>
                        <p className="text-gray-600">Access comprehensive dictionary to learn meanings and origins of traditional expressions and contemporary slang.</p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="bg-gradient-to-r from-game-orange/5 to-venezuela-yellow/5 rounded-3xl p-8 border border-game-orange/20">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            How to Play <span className="text-game-orange">Venezolario: Palabras Vzla</span>
                        </h2>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Playing the Venezuelan word puzzle is simple yet challenging. The game presents clues and hints that guide you toward guessing Venezuelan words or phrases. Each correct answer unlocks points, achievements, and collectible items.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            The intuitive interface makes it accessible for all ages, while progressive difficulty ensures both beginners and experts find appropriate challenges.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Venezolario: Palabras Vzla Educational Value
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">For Parents</h3>
                        <p className="text-gray-600">This Venezuelan word puzzle serves as an educational tool that preserves and promotes Venezuelan linguistic heritage for children.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">For Educators</h3>
                        <p className="text-gray-600">Teachers embrace this platform as a resource for interactive cultural education and Spanish language learning.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">For Learners</h3>
                        <p className="text-gray-600">Language enthusiasts use this tool to expand understanding of Latin American Spanish variations and Venezuelan heritage.</p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Venezolario: Palabras Vzla Community Impact
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            The community represents a global network of players connected by shared interest in Venezuelan culture. Through this platform, players worldwide discover Venezuelan expressions and traditions.
                        </p>
                        <p className  ="text-gray-600 leading-relaxed">
                            Many players report that this platform has helped them reconnect with their Venezuelan heritage or introduced them to aspects of culture they never knew existed.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="bg-gradient-to-r from-game-orange to-venezuela-red rounded-3xl p-8 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">
                            Start Your Cultural Journey Today
                        </h2>
                        <p className="text-lg mb-6 max-w-2xl mx-auto">
                            Join thousands of players who have discovered the joy of Venezuelan word puzzles. Learn about culture, improve vocabulary, and enjoy challenging games.
                        </p>
                        <button 
                            onClick={scrollToTop}
                            className="inline-flex items-center px-6 py-3 bg-white text-game-orange font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"></path>
                            </svg>
                            Play Game Now
                        </button>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Get answers to common questions about this Venezuelan word puzzle game
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">What is Venezolario: Palabras Vzla?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            This is an engaging Venezuelan word puzzle game that combines entertainment with cultural education. It features authentic Venezuelan vocabulary, expressions, and cultural references that help players learn about Venezuela's rich linguistic heritage while having fun solving word puzzles.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">How do I play this Venezuelan word puzzle?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Playing is simple! The game presents you with clues and hints that guide you toward guessing Venezuelan words or phrases. Use your knowledge of Venezuelan culture and language to solve each puzzle. The intuitive interface makes it easy for players of all ages to enjoy the challenge.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">What are collectible cultural cards?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            As you progress through the word puzzles, you unlock special collectible cards featuring iconic Venezuelan characters, traditional foods, cultural symbols, and famous landmarks. These cards serve as both rewards and educational tools, helping you learn more about Venezuelan culture and heritage.
                        </p>
                    </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Are there tournaments in the game?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Yes! The platform features exciting weekly tournaments where you can compete against other players from around the world. These tournaments test your knowledge of Venezuelan culture and language through increasingly challenging word puzzles, creating a fun competitive environment for all participants.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Is this game educational?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Absolutely! Beyond entertainment, this Venezuelan word puzzle serves as a valuable educational tool. Teachers use it for interactive cultural education, parents share it with children to teach Venezuelan heritage, and language enthusiasts employ it to expand their understanding of Latin American Spanish variations and Venezuelan cultural expressions.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Can I access a Venezuelan dictionary?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Yes! The game includes access to a comprehensive Venezuelan Dictionary where you can learn the meanings and origins of traditional expressions and contemporary slang featured in the puzzles. This dictionary serves as both a learning tool and reference guide for understanding Venezuelan linguistic culture.
                        </p>
                    </div>
                </div>
            </section>
        </main>
        </div>
    </>

  );
}; 