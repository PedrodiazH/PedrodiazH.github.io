export const projects = [
  {
    id: 1,
    title: 'Heissen QRNG',
    description: 'Proyecto móvil en colaboración con Synapta, que busca acercar la cuántica a aplicaciones cotidianas.',
    details: 'Aplicación móvil desarrollada en React Native con Expo que utiliza la API de ANU QRNG para generar números aleatorios cuánticos reales. Ideal para sorteos, decisiones y lanzamientos de dados con aleatoriedad verdaderamente impredecible, basada en fluctuaciones cuánticas de vacío.',
    tags: ['JavaScript', 'React Native', 'Expo', 'Aleatoriedad Cuántica'],
    year: 2026,
    icon: 'fa-mobile',
    image: '/Heissen_QRNG.png',
    links: [
      { label: 'Apple Store', url: 'https://apps.apple.com/cl/app/heissenqrng/id6760141387' },
      { label: 'Android', url: 'https://play.google.com/store/apps/details?id=com.synapta.heissenqrng&hl=es_CL' }
    ]
  },
  {
    id: 2,
    title: 'Desarrollo de algoritmos de IA explicables para el reconocimiento de emociones basado en expresiones faciales',
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
    description: 'Sistema Local Web App tipo ERP con liquidación de sueldo automática en PDF.',
    details: 'Proyecto de Software tipo Local Web App diseñado a medida para una empresa. Sistema robusto con gestión de remuneraciones, cálculo automático de impuestos y cotizaciones, y redacción automática de liquidación de sueldo en formato PDF. Desarrollado con React para el frontend, Python para el backend y SQLite para la persistencia de datos.',
    tags: ['React', 'API REST', 'Python', 'SQL'],
    year: 2026,
    icon: 'fa-file-invoice-dollar',
    links: [
      { label: 'Repositorio privado', url: null, locked: true }
    ]
  },
  {
    id: 4,
    title: 'Jypchile.cl',
    description: 'Sitio web empresas de mis padres. Servicios de aseo integral y restaurant',
    details: 'Reestructura de sitio web de JYPCHILE, empresa familiar que apoyo de diferentes formas. Se gestionan correos corporativos con CPanel y hosting con Vercel. El objetivo es marcar una presencia digital, portafolio de los proyectos en +10 años y atraer potenciales licitaciones.',
    tags: ['React', 'Vite', 'Vercel', 'CSS'],
    year: 2026,
    icon: 'fa-globe',
    image: 'jypchile.cl.png',
    links: [
      { label: 'Sitio web', url: 'https://www.jypchile.cl/' }
    ]
  }
]
