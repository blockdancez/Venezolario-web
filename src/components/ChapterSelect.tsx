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
import { updatePageSEO, generateHomePageSEO } from '../utils/seo';

export const ChapterSelect: React.FC = () => {
  const { chapters, getLevelsForChapter } = useGameData();
  const { progress, getChapterProgress, isChapterUnlocked } = useGameProgress();
  const navigate = useNavigate();

  // 更新首页SEO信息
  React.useEffect(() => {
    const seoData = generateHomePageSEO();
    updatePageSEO(seoData);
  }, []);

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
            <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Bienvenido al Desafío de Palabras Vzla!</h2>
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
            </div>
            <section className="mb-16 animate-slide-up">
                <div className="max-w-4xl mx-auto text-center mb-8">
                    <p className="text-xl text-gray-600 leading-relaxed mb-6">
                        ¿Listo para una aventura lingüística única? Nuestra versión Venezolario web está disponible para todos. ¡Incluso puedes descargar la Venezolario APK para Android o buscar Venezolario App Store para iOS y llevar la diversión en tu bolsillo! No hay excusas para no sumergirte en este Venezolario infusion.
                    </p>
                    
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Supera Todos los Niveles de Venezolario
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Usa las monedas que ganes en el juego para obtener más pistas — ¡Tu verdadera Venezolario guía e inspirarte con nuevas ideas! También puedes explorar TikTok, donde muchos jugadores comparten sus experiencias y las últimas Venezolario respuestas.
                    </p>
                </div>
            </section>

            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Características del Juego Venezolario: Palabras Vzla
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-venezuela-yellow">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Contenido Auténticamente Venezolano</h3>
                        <p className="text-gray-600">Presenta cientos de palabras, frases y expresiones culturales venezolanas genuinas, cuidadosamente seleccionadas para representar el idioma y la cultura venezolanos.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-venezuela-blue">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Cartas Culturales Coleccionables</h3>
                        <p className="text-gray-600">Desbloquea cartas especiales con personajes icónicos venezolanos, comidas tradicionales y símbolos culturales mientras progresas.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-venezuela-red">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Torneos Semanales</h3>
                        <p className="text-gray-600">Compite en emocionantes torneos que ponen a prueba tu conocimiento de la cultura y el idioma venezolanos a través de desafiantes acertijos.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-game-orange">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Diccionario Venezolano</h3>
                        <p className="text-gray-600">Accede a un diccionario completo para aprender significados y orígenes de expresiones tradicionales y jerga contemporánea.</p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="bg-gradient-to-r from-game-orange/5 to-venezuela-yellow/5 rounded-3xl p-8 border border-game-orange/20">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">
                            Cómo Jugar <span className="text-game-orange">Venezolario: Palabras Vzla</span>
                        </h2>
                    </div>
                    
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Jugar el acertijo de palabras venezolanas es simple pero desafiante. El juego presenta pistas y sugerencias que te guían hacia adivinar palabras o frases venezolanas. Cada respuesta correcta desbloquea puntos, logros y elementos coleccionables.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            La interfaz intuitiva lo hace accesible para todas las edades, mientras que la dificultad progresiva asegura que tanto principiantes como expertos encuentren desafíos apropiados.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Valor Educativo de Venezolario: Palabras Vzla
                    </h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Para Padres</h3>
                        <p className="text-gray-600">Este acertijo de palabras venezolanas sirve como una herramienta educativa que preserva y promueve el patrimonio lingüístico venezolano para los niños.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Para Educadores</h3>
                        <p className="text-gray-600">Los maestros adoptan esta plataforma como un recurso para la educación cultural interactiva y el aprendizaje del idioma español.</p>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">Para Estudiantes</h3>
                        <p className="text-gray-600">Los entusiastas del idioma usan esta herramienta para expandir la comprensión de las variaciones del español latinoamericano y el patrimonio venezolano.</p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Impacto Comunitario de Venezolario: Palabras Vzla
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            La comunidad representa una red global de jugadores conectados por un interés compartido en la cultura venezolana. A través de esta plataforma, jugadores de todo el mundo descubren expresiones y tradiciones venezolanas.
                        </p>
                        <p className="text-gray-600 leading-relaxed">
                            Muchos jugadores reportan que esta plataforma les ha ayudado a reconectarse con su herencia venezolana o les ha presentado aspectos de la cultura que nunca supieron que existían.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="bg-gradient-to-r from-game-orange to-venezuela-red rounded-3xl p-8 text-center text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">
                            Comienza Tu Viaje Cultural Hoy
                        </h2>
                        <p className="text-lg mb-6 max-w-2xl mx-auto">
                            Únete a miles de jugadores que han descubierto la alegría de los acertijos de palabras venezolanas. Aprende sobre la cultura, mejora tu vocabulario y disfruta de juegos desafiantes.
                        </p>
                        <button 
                            onClick={scrollToTop}
                            className="inline-flex items-center px-6 py-3 bg-white text-game-orange font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"></path>
                            </svg>
                            Jugar Ahora
                        </button>
                    </div>
                </div>
            </section>

            <section className="mb-16">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">
                        Preguntas Frecuentes
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Obtén respuestas a preguntas comunes sobre este juego de acertijos de palabras venezolanas
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">¿Qué es Venezolario: Palabras Vzla?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Este es un emocionante juego de acertijos de palabras venezolanas que combina entretenimiento con educación cultural. Presenta vocabulario venezolano auténtico, expresiones y referencias culturales que ayudan a los jugadores a aprender sobre la rica herencia lingüística de Venezuela mientras se divierten resolviendo acertijos de palabras.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">¿Cómo juego este acertijo de palabras venezolanas?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            ¡Jugar es simple! El juego te presenta pistas y sugerencias que te guían hacia adivinar palabras o frases venezolanas. Usa tu conocimiento de la cultura y el idioma venezolano para resolver cada acertijo. La interfaz intuitiva hace fácil que jugadores de todas las edades disfruten el desafío.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">¿Qué son las cartas culturales coleccionables?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Mientras progresas a través de los acertijos de palabras, desbloqueas cartas coleccionables especiales que presentan personajes icónicos venezolanos, comidas tradicionales, símbolos culturales y lugares famosos. Estas cartas sirven tanto como recompensas como herramientas educativas, ayudándote a aprender más sobre la cultura y herencia venezolana.
                        </p>
                    </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">¿Hay torneos en el juego?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            ¡Sí! La plataforma presenta emocionantes torneos semanales donde puedes competir contra otros jugadores de todo el mundo. Estos torneos ponen a prueba tu conocimiento de la cultura y el idioma venezolano a través de acertijos de palabras cada vez más desafiantes, creando un ambiente competitivo divertido para todos los participantes.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">¿Es este juego educativo?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            ¡Absolutamente! Más allá del entretenimiento, este acertijo de palabras venezolanas sirve como una valiosa herramienta educativa. Los maestros lo usan para educación cultural interactiva, los padres lo comparten con sus hijos para enseñar el patrimonio venezolano, y los entusiastas del idioma lo emplean para expandir su comprensión de las variaciones del español latinoamericano y las expresiones culturales venezolanas.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-3">¿Puedo acceder a un diccionario venezolano?</h3>
                        <p className="text-gray-600 leading-relaxed">
                            ¡Sí! El juego incluye acceso a un Diccionario Venezolano completo donde puedes aprender los significados y orígenes de expresiones tradicionales y jerga contemporánea que aparece en los acertijos. Este diccionario sirve tanto como herramienta de aprendizaje como guía de referencia para entender la cultura lingüística venezolana.
                        </p>
                    </div>
                </div>
            </section>
        </main>
        </div>
    </>

  );
}; 