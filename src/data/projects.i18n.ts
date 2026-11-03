import { localizeValue, type Locale } from '@/i18n';
import type { Project, ProjectGroup, ProjectGroupItem } from './projects';

type LocalizedText = Partial<Record<Locale, string>>;
type LocalizedList = Partial<Record<Locale, string[]>>;

const localizedProjectFields: Record<
  string,
  {
    title?: LocalizedText;
    description?: LocalizedText;
    award?: LocalizedText;
    achievements?: LocalizedList;
  }
> = {
  'wwf-ar': {
    title: {
      es: 'WWF Alemania - Realidad aumentada y visualización de datos GIS',
    },
    description: {
      es: 'Experiencia WebAR para WWF Alemania: sin app nativa; los usuarios acceden al AR directamente desde el navegador móvil, maximizando alcance y accesibilidad. Construido con model-viewer de Google para 3D y AR de alta calidad en web, y React para una interfaz fluida e intuitiva. Incluye un módulo de visualización de datos basado en GIS con habitats reales, animales 3D animados y optimizados para móvil (lince, lobo, bisonte europeo y alce), y hotspots interactivos con contenido educativo.',
    },
    award: {
      es: 'Lovie Awards Bronze por "Best use of Augmented Reality"',
    },
    achievements: {
      es: [
        'Se lanzó una experiencia WebAR sin app nativa; los usuarios acceden al AR desde el navegador móvil, aumentando el alcance y evitando fricción de tiendas.',
        'Se entregó una experiencia multiplataforma: AR en móvil y visor 3D en desktop con una sola base de código.',
        'Se integró visualización de datos basada en GIS para mostrar habitats reales dentro de la experiencia.',
        'Se publicaron animales 3D animados de alta fidelidad (lince, lobo, bisonte europeo y alce) optimizados para navegadores móviles.',
        'Se implementaron hotspots interactivos sobre modelos 3D para mostrar contenido educativo y datos científicos a escala 1:1.',
      ],
    },
  },
  'sap-ar': {
    title: {
      es: 'SAP S/4HANA Cloud AR - Showcase para evento híbrido',
    },
    description: {
      es: 'Solución global para eventos híbridos que usa AR para visualizar procesos de negocio de SAP S/4HANA Cloud, transformando datos abstractos en una metáfora interactiva de "músculo empresarial".',
    },
    achievements: {
      es: [
        'Se entregó una solución para evento híbrido que usa AR para visualizar procesos de SAP S/4HANA Cloud y convertir datos abstractos en una metáfora interactiva.',
        'Se publicaron procesos de negocio en 3D animado de alta fidelidad optimizados para render en tiempo real en navegadores móviles.',
        'Se entregó experiencia multiplataforma: AR en móvil y visor 3D en desktop con React Three Fiber y 8th Wall.',
        'Se implementaron interacciones complejas de interfaz con React Three Fiber y Three.js para una experiencia inmersiva.',
      ],
    },
  },
  soundbooth: {
    title: {
      es: 'Snipes Soundbooth - Landing page e instalación en sitio',
    },
    description: {
      es: 'Aplicación web y landing page para Snipes Soundbooth: los usuarios crean y comparten clips de audio. Construido con React y Strapi; incluye soporte para la instalación física en sitio.',
    },
    achievements: {
      es: [
        'Se desarrolló una aplicación web responsive para Snipes Soundbooth con React y TypeScript.',
        'Se integró la API de Snipes para obtener clips de audio.',
        'Se implementó un diseño responsive para Soundbooth.',
        'Se realizó instalación y mantenimiento en sitio del Soundbooth.',
      ],
    },
  },
  miniverse: {
    title: {
      es: 'Miniverse - Plataforma metaverso gamificada',
    },
    description: {
      es: 'Metaverso digital para Mini: mundo 3D gamificado donde los usuarios exploran e interactúan en tiempo real. Construido con React Three Fiber y WebSockets para multiplayer en vivo.',
    },
    award: {
      es: 'FWA Site of the Day',
    },
    achievements: {
      es: [
        'Se lanzó una plataforma metaverso gamificada para Mini que permite explorar un mundo virtual e interactuar con otros usuarios.',
        'Se implementó red en tiempo real para multiplayer con WebSockets.',
        'Se implementó diseño responsive para la plataforma.',
        'Se entregaron nuevas funcionalidades y mejoras continuas.',
      ],
    },
  },
  metaverse: {
    title: {
      es: 'Experiencia metaverso virtual - Plataforma para marcas',
    },
    description: {
      es: 'Plataforma metaverso orientada a marcas: espacios virtuales para mostrar productos e interacción de usuarios. React Three Fiber para 3D; WebSockets y chat en vivo para funciones sociales en tiempo real.',
    },
    achievements: {
      es: [
        'Se lanzó una plataforma metaverso para marcas que permite explorar una experiencia virtual, interactuar con otros usuarios y mostrar productos.',
        'Se implementó red de experiencia en tiempo real con WebSockets.',
        'Se entregaron nuevas funcionalidades, incluyendo efectos de sonido y mejoras generales de plataforma.',
      ],
    },
  },
  'migros-escape': {
    title: {
      es: 'Migros Digital Escape Game - Landing page',
    },
    description: {
      es: 'Landing page de Migros Digital Escape Game para promocionar el juego.',
    },
    achievements: {
      es: [
        'Se lanzó la landing page para la campaña Migros Escape Game 2025.',
        'Se implementó un diseño responsive para la plataforma.',
      ],
    },
  },
  portfolio: {
    title: {
      es: 'Sitio web de portfolio',
    },
    description: {
      es: 'Portfolio personal y punto de contacto construido con un stack moderno y tipado. Incluye vitrina de proyectos con datos desde servidor, formulario de contacto con validación y envío de correo con Resend, y diseño responsivo con SCSS.',
    },
    achievements: {
      es: [
        'Se construyo un portfolio full-stack con TanStack Start: rutas basadas en archivos, loaders server-side y consumo de datos tipado.',
        'Se implementó formulario de contacto con validación Zod e integración Resend para envío confiable.',
        'Se estructuro data de proyectos y filtrado (profesional vs personal, trabajos destacados) para home y página de proyectos.',
        'Se implementó diseño responsive y módulos SCSS para estilos mantenibles en hero, proyectos y contacto.',
      ],
    },
  },
  'job-application-tracker': {
    title: {
      es: 'Rastreador de candidaturas',
    },
    description: {
      es: 'App sencilla con Astro y React para añadir y seguir ofertas de empleo. Incluye formulario para registrar candidaturas, listado con estado y exportación a PDF. Los datos se guardan en Supabase.',
    },
    achievements: {
      es: [
        'Formulario para añadir y seguir candidaturas con estado y notas.',
        'Exportación a PDF de resúmenes de candidaturas.',
        'Datos persistidos en Supabase para sincronización entre dispositivos.',
      ],
    },
  },
  adestra: {
    title: {
      es: 'Adestra - Estudio de movimiento y salud',
    },
    description: {
      es: 'Sitio bilingüe (español y gallego) para Adestra Movemento e saúde, un estudio de movimiento y salud en O Rosal, Galicia. Next.js y Sanity, con contenido semilla de respaldo, metadatos por idioma y un flujo de inscripción.',
    },
    achievements: {
      es: [
        'Sitio bilingüe en español y gallego para un estudio de movimiento y salud en O Rosal.',
        'Sanity con contenido semilla para que el sitio siga renderizando si el dataset está vacío.',
        'Flujo de inscripción, metadatos por idioma y revalidación bajo demanda desde el CMS.',
      ],
    },
  },
  pulsative: {
    title: {
      es: 'PULSATIVE - Sitio oficial de la banda',
    },
    description: {
      es: 'Sitio oficial de la banda PULSATIVE. Astro bilingüe (alemán e inglés) con Sanity: showreel y próximas fechas, gira, vídeos, fotos en directo, biografía, booking y kit de prensa.',
    },
    achievements: {
      es: [
        'Sitio oficial bilingüe en alemán e inglés para la banda PULSATIVE.',
        'Fechas de gira, vídeos, fotos en directo, biografía, booking y kit de prensa.',
        'Contenido en Sanity, con contenido de respaldo cuando el CMS no está configurado.',
      ],
    },
  },
  'a-jalleira': {
    title: {
      es: 'A Jalleira - Asociación de educación forestal',
    },
    description: {
      es: 'Sitio oficial de A Jalleira, asociación sin ánimo de lucro de educación forestal y ambiental en el Baixo Miño, Galicia. Next.js y Sanity, en gallego, español, inglés y portugués.',
    },
    achievements: {
      es: [
        'Sitio oficial de una asociación sin ánimo de lucro de educación forestal y ambiental en el Baixo Miño.',
        'Cuatro idiomas — gallego, español, inglés y portugués — con gallego como respaldo.',
        'Sanity como fuente de verdad para páginas, actividades, navegación y SEO.',
      ],
    },
  },
};

const localizedGroupFields: Record<
  string,
  {
    title?: LocalizedText;
    description?: LocalizedText;
    achievements?: LocalizedList;
  }
> = {
  'campaign-pages': {
    title: {
      es: 'Demodern Campaign - Landing pages',
    },
    description: {
      es: 'Landing pages de marketing y campaña de alta calidad construidas con React y tooling compartido. Cada página está diseñada para objetivos claros de conversión, jerarquía visual fuerte y tiempos de carga rápidos. Enfoque en storytelling de marca, mensajes de campaña y resultados medibles para clientes.',
    },
    achievements: {
      es: [
        'Se entregaron múltiples landing pages de campaña con React y tooling compartido para objetivos claros de conversión y carga rápida.',
        'Se implementó jerarquía visual sólida, storytelling de marca y mensajes de campaña alineados a resultados de cliente.',
        'Se usaron Motion, GSAP y Lottie para animaciones; React Three Fiber y Strapi cuando fue necesario.',
      ],
    },
  },
  'dart-corporate': {
    title: {
      es: "D'Art Design Group - Landing pages corporativas",
    },
    description: {
      es: "Landing pages corporativas para clientes de D'Art Design Group, construidas con Next.js, Craft CMS, GraphQL y tooling front-end compartido (Motion, GSAP, Lottie, SASS).",
    },
    achievements: {
      es: [
        'Se construyeron y lanzaron múltiples landing pages corporativas para clientes de D’Art Design Group con stack compartido en Next.js.',
        'Se integraron Craft CMS y GraphQL para páginas orientadas a contenido con datos tipados y validación Zod.',
        'Se entregaron experiencias responsive y animadas con Motion, GSAP y Lottie; SASS para consistencia visual.',
      ],
    },
  },
  personal: {
    title: {
      es: 'Proyectos personales',
    },
    description: {
      es: 'Proyectos personales creados para practicar stacks web modernos, incluyendo Astro, Next.js, Sanity y Supabase.',
    },
    achievements: {
      es: [
        'Se lanzaron varios sitios estáticos con Astro para builds rápidos y JavaScript minimo cuando aplica.',
        'Se usó TypeScript y Zod para contenido tipado y validación entre proyectos.',
        'Se entregaron sitios orientados a cliente: menu y ubicación de food truck, info de restaurante y portfolio con contacto para profesional independiente.',
      ],
    },
  },
  'dart-3d': {
    title: {
      es: 'Dart Design - Showcase de producto 3D y casos conceptuales',
    },
    description: {
      es: "Aplicaciones 3D para clientes de D'Art Design: mundos 3D para visualizar productos y flujos de empresa, hubs 3D interactivos para explorar servicios, showcases de producto fotorrealistas para pitches y herramientas internas como configurador de modelos para que artistas prueben shaders y assets en navegador. Usado en ferias, eventos y presentaciones de concepto.",
    },
    achievements: {
      es: [
        'Se entregaron aplicaciones 3D para clientes de D’Art Design: mundos isométricos de producto, hubs de servicios interactivos y showcases fotorrealistas para ferias y presentaciones.',
        'Se colaboro estrechamente con artistas 3D para validar implementaciones, shaders y materiales en navegador y alinear pipeline arte-dev.',
        'Se construyeron herramientas internas, como configurador 3D de modelos, para validar assets e iluminación en WebGL antes de integrar.',
      ],
    },
  },
};

const localizedItemFields: Record<
  string,
  {
    title?: LocalizedText;
    description?: LocalizedText;
  }
> = {
  'lp-1': {
    title: {
      es: 'Migros Escape Game',
    },
    description: {
      es: 'Landing page para la campaña Migros Escape Game 2025 de la cadena de supermercados Migros.',
    },
  },
  'lp-2': {
    title: {
      es: 'Snipes 25th Anniversary',
    },
    description: {
      es: 'Landing page para la campaña de 25 aniversario de Snipes con modelos 3D exclusivos y showcase de productos.',
    },
  },
  'lp-3': {
    title: {
      es: 'Snipes Soundbooth',
    },
    description: {
      es: 'Landing page para Snipes Soundbooth.',
    },
  },
  'corporative-lp-1': {
    title: {
      es: "D'Art Digital Agency - Landing page",
    },
    description: {
      es: "Landing page de D'Art Digital Agency para mostrar servicios y portfolio.",
    },
  },
  'corporative-lp-2': {
    title: {
      es: 'Stiftung Paulinenhilfe - Landing page corporativa',
    },
    description: {
      es: 'Landing page para Stiftung Paulinenhilfe para mostrar sus servicios.',
    },
  },
  'corporative-lp-3': {
    title: {
      es: 'Medienvorsorge.de - Landing page',
    },
    description: {
      es: 'Landing page para Medienvorsorge.de para mostrar sus servicios.',
    },
  },
  'corporative-lp-4': {
    title: {
      es: 'Hanselmann & Compagnie - Landing page corporativa',
    },
    description: {
      es: 'Landing page para Hanselmann & Compagnie para mostrar sus servicios.',
    },
  },
  'corporative-lp-5': {
    title: {
      es: 'Düsseldorf Airport Quiz game',
    },
    description: {
      es: 'Juego quiz para Düsseldorf Airport para mostrar sus servicios y la ciudad de Düsseldorf de forma gamificada.',
    },
  },
  'personal-1': {
    title: {
      es: 'El Maizter - Sitio web foodtruck',
    },
    description: {
      es: 'Menu online y hub de ubicación para un food truck; ayuda a clientes a encontrarlo y revisar la oferta antes de pedir.',
    },
  },
  'personal-2': {
    title: {
      es: 'La Cabana - Sitio web de restaurante',
    },
    description: {
      es: 'Sitio de restaurante con ambiente, horarios y datos de contacto para planear visitas y ponerse en contacto.',
    },
  },
  'personal-3': {
    title: {
      es: 'ASP - Sitio web de artesano freelance',
    },
    description: {
      es: 'Portfolio y web de contacto para un profesional de oficios; muestra trabajos previos y facilita solicitar presupuestos.',
    },
  },
  'personal-4': {
    title: {
      es: 'Antonio F. Rando Casermeiro - Sitio web de portfolio',
    },
    description: {
      es: 'Sitio portfolio personal para Antonio F. Rando Casermeiro, escritor, profesor y Doctor en Historia. Construido con Next.js y Sanity para presentar ensayos, ficcion, docencia, publicaciones de investigacion, trabajo multimedia y datos de contacto en una estructura accesible.',
    },
  },
  'personal-5': {
    title: {
      es: 'Beer Tab',
    },
    description: {
      es: 'Aplicacion web para registrar bebidas y cerrar cuentas de bar, con flujo para clientes y panel de manager para clientes activos, consumos pendientes y totales diarios. Construida con Astro y Supabase, incluye catalogo de cervezas con busqueda y gestion opcional de stock en Supabase.',
    },
  },
  'dart-3d-1': {
    title: {
      es: 'SMA. - Experiencia 3D de energía verde',
    },
    description: {
      es: 'Mundo 3D isométrico y simplificado para SMA (marca de energía verde) con showcase de producto y modelos 3D interactivos para explicar su red energética integrada. Usado en ferias y eventos.',
    },
  },
  'dart-3d-2': {
    title: {
      es: 'Düsseldorf Airport - Experiencia 3D',
    },
    description: {
      es: 'Experiencia 3D con modelo simplificado del aeropuerto para mostrar servicios y ofrecer un hub interactivo para explorar el aeropuerto. Usado en ferias y eventos.',
    },
  },
  'dart-3d-3': {
    title: {
      es: 'GROHE - Showcase de producto 3D (pitch)',
    },
    description: {
      es: 'Concepto para GROHE: modelo de producto 3D con texturas realistas de alta resolución, materiales Kronos y shaders avanzados para renders fotorrealistas en navegador.',
    },
  },
  'dart-3d-4': {
    title: {
      es: 'Configurador de modelo 3D',
    },
    description: {
      es: 'Concepto para artistas 3D para probar shaders y assets en navegador, igualando el render del editor 3D en WebGL con panel para configurar modelo y mapas de luz. Facilita alinear artistas y desarrolladores entre proyectos.',
    },
  },
};

export function getLocalizedProject(project: Project, locale: Locale): Project {
  const translations = localizedProjectFields[project.slug];
  return {
    ...project,
    title: localizeValue(translations?.title, project.title, locale),
    description: localizeValue(
      translations?.description,
      project.description,
      locale,
    ),
    award: project.award
      ? localizeValue(translations?.award, project.award, locale)
      : project.award,
    achievements: project.achievements
      ? localizeValue(translations?.achievements, project.achievements, locale)
      : project.achievements,
  };
}

function getLocalizedItem(
  item: ProjectGroupItem,
  locale: Locale,
): ProjectGroupItem {
  const translations = localizedItemFields[String(item.id)];
  return {
    ...item,
    title: localizeValue(translations?.title, item.title, locale),
    description: item.description
      ? localizeValue(translations?.description, item.description, locale)
      : item.description,
  };
}

export function getLocalizedProjectGroup(
  group: ProjectGroup,
  locale: Locale,
): ProjectGroup {
  const translations = localizedGroupFields[group.slug];
  return {
    ...group,
    title: localizeValue(translations?.title, group.title, locale),
    description: group.description
      ? localizeValue(translations?.description, group.description, locale)
      : group.description,
    achievements: group.achievements
      ? localizeValue(translations?.achievements, group.achievements, locale)
      : group.achievements,
    items: group.items.map((item) => getLocalizedItem(item, locale)),
  };
}
