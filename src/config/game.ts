import { GameConfig, Difficulty, LevelStatus } from '../types/game';

// 游戏全局配置
export const gameConfig: GameConfig = {
  useSupabase: false, // 控制是否使用 Supabase，当前设为 false 使用临时数据
  animationDuration: 300, // 动画持续时间（毫秒）
  maxAttempts: 10 // 最大尝试次数
};

// 临时数据配置
export const TEMP_DATA_CONFIG = {
  chapters: [
    {
      id: 'mango-bajito',
      title: 'Mango bajito',
      description: 'Palabras que todo venezolano sabe de memoria',
      order: 1,
      unlockedLevels: 0,  // 将根据实际完成情况计算
      totalLevels: 49,
      completed: false,
      iconPath: '/Sprite/page_1.png'
    },
    {
      id: 'misifu',
      title: 'Misifú',
      description: 'Personas y características de los venezolanos',
      order: 2,
      unlockedLevels: 0,
      totalLevels: 5,
      completed: false,
      iconPath: '/Sprite/page_2.png'
    }
  ],
  levels: {
    'mango-bajito': [
      {
        id: 'mango-bajito-level-1',
        chapterId: 'mango-bajito',
        order: 1,
        answer: 'CATIRE',
        hints: [
          { id: 'hint-1', text: 'Blanco' },
          { id: 'hint-2', text: 'Rubio' },
          { id: 'hint-3', text: 'Ojos claros' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.AVAILABLE,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-2',
        chapterId: 'mango-bajito',
        order: 2,
        answer: 'JUGO',
        hints: [
          { id: 'hint-1', text: 'Zumo' },
          { id: 'hint-2', text: 'Bebida líquida' },
          { id: 'hint-3', text: 'Frutal' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.AVAILABLE,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-3',
        chapterId: 'mango-bajito',
        order: 3,
        answer: 'CHAMO',
        hints: [
          { id: 'hint-1', text: 'Joven' },
          { id: 'hint-2', text: 'Muchacho' },
          { id: 'hint-3', text: 'Amigo' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-4',
        chapterId: 'mango-bajito',
        order: 4,
        answer: 'CAMBUR',
        hints: [
          { id: 'hint-1', text: 'Banana' },
          { id: 'hint-2', text: 'Guineo' },
          { id: 'hint-3', text: 'Plátano' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-5',
        chapterId: 'mango-bajito',
        order: 5,
        answer: 'MALANDRO',
        hints: [
          { id: 'hint-1', text: 'Delincuente' },
          { id: 'hint-2', text: 'Criminal' },
          { id: 'hint-3', text: 'Malhechor' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-6',
        chapterId: 'mango-bajito',
        order: 6,
        answer: 'PATILLA',
        hints: [
          { id: 'hint-1', text: 'Sandía' },
          { id: 'hint-2', text: 'Melón de agua' },
          { id: 'hint-3', text: 'Acendría' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-7',
        chapterId: 'mango-bajito',
        order: 7,
        answer: 'MATA',
        hints: [
          { id: 'hint-1', text: 'Planta' },
          { id: 'hint-2', text: 'Vegetación' },
          { id: 'hint-3', text: 'Arbusto' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-8',
        chapterId: 'mango-bajito',
        order: 8,
        answer: 'GRINGO',
        hints: [
          { id: 'hint-1', text: 'Estadounidense' },
          { id: 'hint-2', text: 'Extranjero habla' },
          { id: 'hint-3', text: 'Inglés' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-9',
        chapterId: 'mango-bajito',
        order: 9,
        answer: 'ÑAPA',
        hints: [
          { id: 'hint-1', text: 'Regalo al comprador' },
          { id: 'hint-2', text: 'Extra gratis' },
          { id: 'hint-3', text: 'Adicional' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-10',
        chapterId: 'mango-bajito',
        order: 10,
        answer: 'JEVA',
        hints: [
          { id: 'hint-1', text: 'Novia' },
          { id: 'hint-2', text: 'Atractiva' },
          { id: 'hint-3', text: 'Jovencita' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-11',
        chapterId: 'mango-bajito',
        order: 11,
        answer: 'COTUFAS',
        hints: [
          { id: 'hint-1', text: 'Palomitas de maíz' },
          { id: 'hint-2', text: 'Crispetas' },
          { id: 'hint-3', text: 'Gallitos' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-12',
        chapterId: 'mango-bajito',
        order: 12,
        answer: 'SALADO',
        hints: [
          { id: 'hint-1', text: 'Desafortunado' },
          { id: 'hint-2', text: 'Sin suerte' },
          { id: 'hint-3', text: 'Desgracia constante' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-13',
        chapterId: 'mango-bajito',
        order: 13,
        answer: 'COBA',
        hints: [
          { id: 'hint-1', text: 'Mentira' },
          { id: 'hint-2', text: 'Exageración' },
          { id: 'hint-3', text: 'Falsedad' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-14',
        chapterId: 'mango-bajito',
        order: 14,
        answer: 'MALUCO',
        hints: [
          { id: 'hint-1', text: 'De mal sabor' },
          { id: 'hint-2', text: 'Desagradable' },
          { id: 'hint-3', text: 'Que no está bueno' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-15',
        chapterId: 'mango-bajito',
        order: 15,
        answer: 'HALLACA',
        hints: [
          { id: 'hint-1', text: 'Plato navideño' },
          { id: 'hint-2', text: 'Envuelta en hojas' },
          { id: 'hint-3', text: 'Masa rellena' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-16',
        chapterId: 'mango-bajito',
        order: 16,
        answer: 'GOCHO',
        hints: [
          { id: 'hint-1', text: 'Andino' },
          { id: 'hint-2', text: 'Con acento' },
          { id: 'hint-3', text: 'Amable' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-17',
        chapterId: 'mango-bajito',
        order: 17,
        answer: 'RUMBA',
        hints: [
          { id: 'hint-1', text: 'Fiesta intensa' },
          { id: 'hint-2', text: 'Celebración' },
          { id: 'hint-3', text: 'Festejo' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-18',
        chapterId: 'mango-bajito',
        order: 18,
        answer: 'COMIQUITAS',
        hints: [
          { id: 'hint-1', text: 'Dibujos animados' },
          { id: 'hint-2', text: 'Caricatura' },
          { id: 'hint-3', text: 'Infantil' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-19',
        chapterId: 'mango-bajito',
        order: 19,
        answer: 'CHEVERE',
        hints: [
          { id: 'hint-1', text: 'Buenísimo' },
          { id: 'hint-2', text: 'Estupendo' },
          { id: 'hint-3', text: 'Genial' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-20',
        chapterId: 'mango-bajito',
        order: 20,
        answer: 'PICHIRRE',
        hints: [
          { id: 'hint-1', text: 'Tacaño' },
          { id: 'hint-2', text: 'No comparte' },
          { id: 'hint-3', text: 'No gasta' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-21',
        chapterId: 'mango-bajito',
        order: 21,
        answer: 'PASTICHO',
        hints: [
          { id: 'hint-1', text: 'Lasaña' },
          { id: 'hint-2', text: 'Pasta' },
          { id: 'hint-3', text: 'Horno' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-22',
        chapterId: 'mango-bajito',
        order: 22,
        answer: 'COROTOS',
        hints: [
          { id: 'hint-1', text: 'Cosas del hogar' },
          { id: 'hint-2', text: 'Platos' },
          { id: 'hint-3', text: 'Utensilios' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-23',
        chapterId: 'mango-bajito',
        order: 23,
        answer: 'TIZANA',
        hints: [
          { id: 'hint-1', text: 'Bebida frutal' },
          { id: 'hint-2', text: 'Frutas picadas' },
          { id: 'hint-3', text: 'Jugosa y colorida' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-24',
        chapterId: 'mango-bajito',
        order: 24,
        answer: 'LADILLA',
        hints: [
          { id: 'hint-1', text: 'Fastidio' },
          { id: 'hint-2', text: 'Molesto' },
          { id: 'hint-3', text: 'Irritante' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-25',
        chapterId: 'mango-bajito',
        order: 25,
        answer: 'PALO DE AGUA',
        hints: [
          { id: 'hint-1', text: 'Lluvia fuerte' },
          { id: 'hint-2', text: 'Aguacero' },
          { id: 'hint-3', text: 'Chaparrón' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-26',
        chapterId: 'mango-bajito',
        order: 26,
        answer: 'PICHE',
        hints: [
          { id: 'hint-1', text: 'Podrido' },
          { id: 'hint-2', text: 'Hediondo' },
          { id: 'hint-3', text: 'En mal estado' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-27',
        chapterId: 'mango-bajito',
        order: 27,
        answer: 'CUAIMA',
        hints: [
          { id: 'hint-1', text: 'Mujer posesiva' },
          { id: 'hint-2', text: 'Celosa' },
          { id: 'hint-3', text: 'Controladora' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-28',
        chapterId: 'mango-bajito',
        order: 28,
        answer: 'GUARAPO',
        hints: [
          { id: 'hint-1', text: 'Infusión' },
          { id: 'hint-2', text: 'Té' },
          { id: 'hint-3', text: 'Remedio criollo' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-29',
        chapterId: 'mango-bajito',
        order: 29,
        answer: 'RATA',
        hints: [
          { id: 'hint-1', text: 'Malvado' },
          { id: 'hint-2', text: 'Traicionero' },
          { id: 'hint-3', text: 'Injusto' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-30',
        chapterId: 'mango-bajito',
        order: 30,
        answer: 'MONDONGO',
        hints: [
          { id: 'hint-1', text: 'Panza cocida' },
          { id: 'hint-2', text: 'Callos' },
          { id: 'hint-3', text: 'Sopa espesa' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-31',
        chapterId: 'mango-bajito',
        order: 31,
        answer: 'PARCHITA',
        hints: [
          { id: 'hint-1', text: 'Maracuyá' },
          { id: 'hint-2', text: 'Fruta de la pasión' },
          { id: 'hint-3', text: 'Ácida' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-32',
        chapterId: 'mango-bajito',
        order: 32,
        answer: 'JURUNGAR',
        hints: [
          { id: 'hint-1', text: 'Hurgar' },
          { id: 'hint-2', text: 'Curiosear' },
          { id: 'hint-3', text: 'Escarbar' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-33',
        chapterId: 'mango-bajito',
        order: 33,
        answer: 'SORTARIO',
        hints: [
          { id: 'hint-1', text: 'Suertudo' },
          { id: 'hint-2', text: 'Afortunado' },
          { id: 'hint-3', text: 'Favorecido' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-34',
        chapterId: 'mango-bajito',
        order: 34,
        answer: 'PIRATA',
        hints: [
          { id: 'hint-1', text: 'Copia' },
          { id: 'hint-2', text: 'Ilegal' },
          { id: 'hint-3', text: 'Mala calidad' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-35',
        chapterId: 'mango-bajito',
        order: 35,
        answer: 'PABELLON',
        hints: [
          { id: 'hint-1', text: 'Plato típico' },
          { id: 'hint-2', text: 'Arroz y caraotas' },
          { id: 'hint-3', text: 'Carne mechada' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-36',
        chapterId: 'mango-bajito',
        order: 36,
        answer: 'SIFRINO',
        hints: [
          { id: 'hint-1', text: 'Clase acomodada' },
          { id: 'hint-2', text: 'Ropita de marca' },
          { id: 'hint-3', text: 'Presumido' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-37',
        chapterId: 'mango-bajito',
        order: 37,
        answer: 'FIEBRUO',
        hints: [
          { id: 'hint-1', text: 'Muy entusiasta' },
          { id: 'hint-2', text: 'Intenso' },
          { id: 'hint-3', text: 'Obsesivo' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-38',
        chapterId: 'mango-bajito',
        order: 38,
        answer: 'POCETA',
        hints: [
          { id: 'hint-1', text: 'Retrete' },
          { id: 'hint-2', text: 'Inodoro' },
          { id: 'hint-3', text: 'Baño' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-39',
        chapterId: 'mango-bajito',
        order: 39,
        answer: 'CHALEQUEAR',
        hints: [
          { id: 'hint-1', text: 'Burlarse' },
          { id: 'hint-2', text: 'Mofarse' },
          { id: 'hint-3', text: 'Reírse de alguien' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-40',
        chapterId: 'mango-bajito',
        order: 40,
        answer: 'COLEAR',
        hints: [
          { id: 'hint-1', text: 'Adelantar en la fila' },
          { id: 'hint-2', text: 'Pasar sin permiso' },
          { id: 'hint-3', text: 'Hacer trampa' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-41',
        chapterId: 'mango-bajito',
        order: 41,
        answer: 'GUACHAFITA',
        hints: [
          { id: 'hint-1', text: 'Relajo' },
          { id: 'hint-2', text: 'Desorden' },
          { id: 'hint-3', text: 'Poca seriedad' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-42',
        chapterId: 'mango-bajito',
        order: 42,
        answer: 'CACHO',
        hints: [
          { id: 'hint-1', text: 'Infidelidad' },
          { id: 'hint-2', text: 'Cuernos' },
          { id: 'hint-3', text: 'Adulterio' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-43',
        chapterId: 'mango-bajito',
        order: 43,
        answer: 'PEPA',
        hints: [
          { id: 'hint-1', text: 'Semilla' },
          { id: 'hint-2', text: 'Hueso' },
          { id: 'hint-3', text: 'Almendra' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-44',
        chapterId: 'mango-bajito',
        order: 44,
        answer: 'CAIMANERA',
        hints: [
          { id: 'hint-1', text: 'Partido informal' },
          { id: 'hint-2', text: 'Juego improvisado' },
          { id: 'hint-3', text: 'Encuentro amistoso' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-45',
        chapterId: 'mango-bajito',
        order: 45,
        answer: 'NICHE',
        hints: [
          { id: 'hint-1', text: 'Poco elegante' },
          { id: 'hint-2', text: 'Sin estilo' },
          { id: 'hint-3', text: 'De mal gusto' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-46',
        chapterId: 'mango-bajito',
        order: 46,
        answer: 'BULULU',
        hints: [
          { id: 'hint-1', text: 'Aglomeración' },
          { id: 'hint-2', text: 'Multitud' },
          { id: 'hint-3', text: 'Muchedumbre' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-47',
        chapterId: 'mango-bajito',
        order: 47,
        answer: 'CAMARON',
        hints: [
          { id: 'hint-1', text: 'Siesta' },
          { id: 'hint-2', text: 'Sueño breve' },
          { id: 'hint-3', text: 'Descanso' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-48',
        chapterId: 'mango-bajito',
        order: 48,
        answer: 'ZAPEROCO',
        hints: [
          { id: 'hint-1', text: 'Desorden' },
          { id: 'hint-2', text: 'Revuelo' },
          { id: 'hint-3', text: 'Alboroto' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      },
      {
        id: 'mango-bajito-level-49',
        chapterId: 'mango-bajito',
        order: 49,
        answer: 'LENTES',
        hints: [
          { id: 'hint-1', text: 'Anteojos' },
          { id: 'hint-2', text: 'Gafas' },
          { id: 'hint-3', text: 'Para ver bien' }
        ],
        difficulty: Difficulty.EASY,
        status: LevelStatus.LOCKED,
        completed: false,
        attempts: 0
      }
    ]
  }
}; 