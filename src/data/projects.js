export const projects = [
  {
    id: 1,
    title: 'Heissen QRNG',
    description: 'Proyecto móvil en colaboración con Synapta, que busca acercar la cuántica a aplicaciones cotidianas.',
    details: 'Aplicación móvil desarrollada en React Native con Expo que utiliza la API de ANU QRNG para generar números aleatorios cuánticos reales. Ideal para sorteos, decisiones y lanzamientos de dados con aleatoriedad verdaderamente impredecible, basada en fluctuaciones cuánticas de vacío.',
    tags: ['JavaScript', 'React Native', 'Expo', 'Aleatoriedad Cuántica'],
    year: 2026,
    icon: 'fa-mobile',
    image: '/Portada.png',
    links: [
      { label: 'Apple Store', url: 'https://apps.apple.com/cl/app/heissenqrng/id6760141387' },
      { label: 'Android', url: 'https://play.google.com/store/apps/details?id=com.synapta.heissenqrng&hl=es_CL' }
    ]
  },
  {
    id: 2,
    title: 'IA Explicable para Reconocimiento de Emociones Faciales',
    description: 'Proyecto de Título. Reconocimiento de emociones con IA explicable comparando LIME y SHAP.',
    details: 'Proyecto de Título desarrollado junto a mi compañero Marcos Carripan. Se realizó una revisión del estado del arte en reconocimiento de emociones faciales (FER), implementación del modelo ResEmoteNet, y un análisis comparativo de explicabilidad utilizando los métodos LIME y SHAP para interpretar las predicciones del modelo.',
    tags: ['Machine Learning', 'Visión por computador', 'Explicabilidad'],
    year: 2025,
    icon: 'fa-graduation-cap',
    links: [
      { label: 'Repositorio del proyecto', url: 'https://github.com/PedrodiazH/Proyecto-de-titulo' }
    ]
  },
  {
    id: 3,
    title: 'Libro de Remuneraciones',
    description: 'Sistema Local Web App con liquidación de sueldo automática en PDF.',
    details: 'Proyecto de Software tipo Local Web App diseñado a medida para una empresa. Sistema robusto con gestión de remuneraciones, cálculo automático de impuestos y cotizaciones, y redacción automática de liquidación de sueldo en formato PDF. Desarrollado con React para el frontend, Python para la lógica de negocio y SQL para la persistencia de datos.',
    tags: ['React', 'API REST', 'Python', 'SQL'],
    year: 2026,
    icon: 'fa-file-invoice-dollar',
    links: [
      { label: 'Repositorio privado', url: null, locked: true }
    ]
  },
  {
    id: 4,
    title: 'Este portafolio',
    description: 'Sitio web personal interactivo con diseño moderno y tecnologías web.',
    details: 'Portafolio personal construido con React 19, Vite, Tailwind CSS v4 y Three.js. Incluye un dado 3D interactivo con Three.js, diseño glassmorphism, paleta de colores dorada, y una interfaz limpia y responsiva. Este proyecto refleja mi enfoque en el detalle visual y la calidad del código.',
    tags: ['React', 'Vite', 'Three.js', 'Tailwind'],
    year: 2025,
    icon: 'fa-globe',
    links: [
      { label: 'Repositorio', url: 'https://github.com/PedrodiazH/PedrodiazH.github.io' }
    ]
  }
]
