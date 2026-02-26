import { localizeValue, type Locale } from '../i18n';
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
      es: 'WWF Alemania - Realidad aumentada y visualizacion de datos GIS',
      de: 'WWF Deutschland - Augmented Reality und GIS-Datenvisualisierung',
    },
    description: {
      es: 'Experiencia WebAR para WWF Alemania: sin app nativa; los usuarios acceden al AR directamente desde el navegador movil, maximizando alcance y accesibilidad. Construido con model-viewer de Google para 3D y AR de alta calidad en web, y React para una interfaz fluida e intuitiva. Incluye un modulo de visualizacion de datos basado en GIS con habitats reales, animales 3D animados y optimizados para movil (lince, lobo, bisonte europeo y alce), y hotspots interactivos con contenido educativo.',
      de: 'WebAR-Erlebnis fur WWF Deutschland: ohne native App, Nutzer greifen direkt im mobilen Browser auf AR zu, was Reichweite und Zuganglichkeit erhoht. Entwickelt mit Googles model-viewer fur hochwertige 3D- und AR-Darstellung im Web sowie React fur eine flussige, intuitive UI. Enthalt ein GIS-basiertes Datenvisualisierungsmodul mit realen Lebensraumen, hochwertige animierte 3D-Tiere (Luchs, Wolf, Wisent, Elch) fur Mobile optimiert und interaktive Hotspots mit Bildungsinhalten.',
    },
    award: {
      es: 'Lovie Awards Bronze por "Best use of Augmented Reality"',
      de: 'Lovie Awards Bronze fur "Best use of Augmented Reality"',
    },
    achievements: {
      es: [
        'Se lanzo una experiencia WebAR sin app nativa; los usuarios acceden al AR desde el navegador movil, aumentando el alcance y evitando friccion de tiendas.',
        'Se entrego una experiencia multiplataforma: AR en movil y visor 3D en desktop con una sola base de codigo.',
        'Se integro visualizacion de datos basada en GIS para mostrar habitats reales dentro de la experiencia.',
        'Se publicaron animales 3D animados de alta fidelidad (lince, lobo, bisonte europeo y alce) optimizados para navegadores moviles.',
        'Se implementaron hotspots interactivos sobre modelos 3D para mostrar contenido educativo y datos cientificos a escala 1:1.',
      ],
      de: [
        'Eine WebAR-Erfahrung ohne native App wurde ausgeliefert; Nutzer greifen direkt im mobilen Browser auf AR zu und vermeiden App-Store-Reibung.',
        'Eine plattformubergreifende Experience wurde umgesetzt: AR auf Mobilgeraten und 3D-Viewer auf Desktop mit einer gemeinsamen Codebasis.',
        'GIS-basierte Datenvisualisierung wurde integriert, um reale Lebensraume innerhalb der Experience darzustellen.',
        'Hochwertige animierte 3D-Tiere (Luchs, Wolf, Wisent, Elch) wurden fur mobile Browser in Echtzeit optimiert ausgeliefert.',
        'Interaktive Hotspots auf 3D-Modellen wurden umgesetzt, um Bildungsinhalte und wissenschaftliche Daten im Masstab 1:1 anzuzeigen.',
      ],
    },
  },
  'sap-ar': {
    title: {
      es: 'SAP S/4HANA Cloud AR - Showcase para evento hibrido',
      de: 'SAP S/4HANA Cloud AR - Showcase fur Hybrid-Event',
    },
    description: {
      es: 'Solucion global para eventos hibridos que usa AR para visualizar procesos de negocio de SAP S/4HANA Cloud, transformando datos abstractos en una metafora interactiva de "musculo empresarial".',
      de: 'Globale Hybrid-Event-Losung, die AR nutzt, um Geschaftsprozesse der SAP S/4HANA Cloud zu visualisieren und abstrakte Daten in eine interaktive "Business-Muskel"-Metapher zu ubersetzen.',
    },
    achievements: {
      es: [
        'Se entrego una solucion para evento hibrido que usa AR para visualizar procesos de SAP S/4HANA Cloud y convertir datos abstractos en una metafora interactiva.',
        'Se publicaron procesos de negocio en 3D animado de alta fidelidad optimizados para render en tiempo real en navegadores moviles.',
        'Se entrego experiencia multiplataforma: AR en movil y visor 3D en desktop con React Three Fiber y 8th Wall.',
        'Se implementaron interacciones complejas de interfaz con React Three Fiber y Three.js para una experiencia inmersiva.',
      ],
      de: [
        'Eine Hybrid-Event-Losung wurde ausgeliefert, die AR nutzt, um SAP-S/4HANA-Cloud-Prozesse zu visualisieren und abstrakte Daten in eine interaktive Metapher zu uberfuhren.',
        'Hochwertige animierte 3D-Geschaftsprozesse wurden fur Echtzeit-Rendering in mobilen Browsern optimiert bereitgestellt.',
        'Eine plattformubergreifende Experience wurde umgesetzt: AR auf Mobilgeraten und 3D-Viewer auf Desktop mit React Three Fiber und 8th Wall.',
        'Komplexe UI-Interaktionen mit React Three Fiber und Three.js wurden umgesetzt, um ein immersives Erlebnis zu schaffen.',
      ],
    },
  },
  soundbooth: {
    title: {
      es: 'Snipes Soundbooth - Landing page e instalacion en sitio',
      de: 'Snipes Soundbooth - Landingpage und Vor-Ort-Installation',
    },
    description: {
      es: 'Aplicacion web y landing page para Snipes Soundbooth: los usuarios crean y comparten clips de audio. Construido con React y Strapi; incluye soporte para la instalacion fisica en sitio.',
      de: 'Web-App und Landingpage fur Snipes Soundbooth: Nutzer erstellen und teilen Audio-Clips. Entwickelt mit React und Strapi; inklusive Support fur die physische Vor-Ort-Installation.',
    },
    achievements: {
      es: [
        'Se desarrollo una aplicacion web responsive para Snipes Soundbooth con React y TypeScript.',
        'Se integro la API de Snipes para obtener clips de audio.',
        'Se implemento un diseno responsive para Soundbooth.',
        'Se realizo instalacion y mantenimiento en sitio del Soundbooth.',
      ],
      de: [
        'Eine responsive Webanwendung fur Snipes Soundbooth wurde mit React und TypeScript entwickelt.',
        'Die Snipes-API wurde integriert, um Audio-Clips abzurufen.',
        'Ein responsives Design fur den Soundbooth wurde umgesetzt.',
        'Vor-Ort-Installation und Wartung des Soundbooth wurden durchgefuhrt.',
      ],
    },
  },
  miniverse: {
    title: {
      es: 'Miniverse - Plataforma metaverso gamificada',
      de: 'Miniverse - Gamifizierte Metaverse-Plattform',
    },
    description: {
      es: 'Metaverso digital para Mini: mundo 3D gamificado donde los usuarios exploran e interactuan en tiempo real. Construido con React Three Fiber y WebSockets para multiplayer en vivo.',
      de: 'Digitales Metaverse fur Mini: gamifizierte 3D-Welt, in der Nutzer in Echtzeit erkunden und interagieren. Entwickelt mit React Three Fiber und WebSockets fur Live-Multiplayer.',
    },
    award: {
      es: 'FWA Site of the Day',
      de: 'FWA Site of the Day',
    },
    achievements: {
      es: [
        'Se lanzo una plataforma metaverso gamificada para Mini que permite explorar un mundo virtual e interactuar con otros usuarios.',
        'Se implemento red en tiempo real para multiplayer con WebSockets.',
        'Se implemento diseno responsive para la plataforma.',
        'Se entregaron nuevas funcionalidades y mejoras continuas.',
      ],
      de: [
        'Eine gamifizierte Metaverse-Plattform fur Mini wurde ausgeliefert, auf der Nutzer eine virtuelle Welt erkunden und mit anderen interagieren konnen.',
        'Echtzeit-Multiplayer wurde mit WebSocket-Netzwerk umgesetzt.',
        'Ein responsives Design fur die Plattform wurde implementiert.',
        'Laufende Features und Verbesserungen wurden ausgeliefert.',
      ],
    },
  },
  metaverse: {
    title: {
      es: 'Experiencia metaverso virtual - Plataforma para marcas',
      de: 'Virtuelle Metaverse-Erfahrung - Plattform fur Marken',
    },
    description: {
      es: 'Plataforma metaverso orientada a marcas: espacios virtuales para mostrar productos e interaccion de usuarios. React Three Fiber para 3D; WebSockets y chat en vivo para funciones sociales en tiempo real.',
      de: 'Markenorientierte Metaverse-Plattform: virtuelle Raume fur Produktprasentation und Nutzerinteraktion. React Three Fiber fur 3D sowie WebSockets und Live-Chat fur soziale Echtzeitfunktionen.',
    },
    achievements: {
      es: [
        'Se lanzo una plataforma metaverso para marcas que permite explorar una experiencia virtual, interactuar con otros usuarios y mostrar productos.',
        'Se implemento red de experiencia en tiempo real con WebSockets.',
        'Se entregaron nuevas funcionalidades, incluyendo efectos de sonido y mejoras generales de plataforma.',
      ],
      de: [
        'Eine Metaverse-Plattform fur Marken wurde ausgeliefert, auf der Nutzer virtuelle Erlebnisse erkunden, interagieren und Produkte prasentieren konnen.',
        'Echtzeit-Erlebnis wurde mit WebSocket-Netzwerk umgesetzt.',
        'Neue Features, darunter Soundeffekte und allgemeine Plattformverbesserungen, wurden ausgeliefert.',
      ],
    },
  },
  'migros-escape': {
    title: {
      es: 'Migros Digital Escape Game - Landing page',
      de: 'Migros Digital Escape Game - Landingpage',
    },
    description: {
      es: 'Landing page de Migros Digital Escape Game para promocionar el juego.',
      de: 'Landingpage fur das Migros Digital Escape Game zur Bewerbung des Spiels.',
    },
    achievements: {
      es: [
        'Se lanzo la landing page para la campana Migros Escape Game 2025.',
        'Se implemento un diseno responsive para la plataforma.',
      ],
      de: [
        'Die Landingpage fur die Migros-Escape-Game-Kampagne 2025 wurde ausgeliefert.',
        'Ein responsives Design fur die Plattform wurde umgesetzt.',
      ],
    },
  },
  portfolio: {
    title: {
      es: 'Sitio web de portfolio',
      de: 'Portfolio-Website',
    },
    description: {
      es: 'Portfolio personal y punto de contacto construido con un stack moderno y tipado. Incluye vitrina de proyectos con datos desde servidor, formulario de contacto con validacion y envio de correo con Resend, y diseno responsivo con SCSS.',
      de: 'Persoenliches Portfolio und Kontakt-Hub auf einem modernen, typsicheren Stack. Enthalt Projektuebersicht mit serverseitigen Daten, Kontaktformular mit Validierung und Resend-Mailversand sowie responsives Layout mit SCSS.',
    },
    achievements: {
      es: [
        'Se construyo un portfolio full-stack con TanStack Start: rutas basadas en archivos, loaders server-side y consumo de datos tipado.',
        'Se implemento formulario de contacto con validacion Zod e integracion Resend para envio confiable.',
        'Se estructuro data de proyectos y filtrado (profesional vs personal, trabajos destacados) para home y pagina de proyectos.',
        'Se implemento diseno responsive y modulos SCSS para estilos mantenibles en hero, proyectos y contacto.',
      ],
      de: [
        'Ein Full-Stack-Portfolio mit TanStack Start wurde gebaut: dateibasierte Routen, serverseitige Loader und typsichere Datenabfragen.',
        'Ein Kontaktformular mit Zod-Validierung und Resend-Integration fur zuverlassigen E-Mail-Versand wurde umgesetzt.',
        'Projektdaten und Filterlogik (beruflich vs personlich, hervorgehobene Arbeiten) wurden fur Start- und Projektseite strukturiert.',
        'Responsives Design und SCSS-Module wurden fur wartbare Styles in Hero, Projekten und Kontakt umgesetzt.',
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
      de: 'Demodern Campaign - Landingpages',
    },
    description: {
      es: 'Landing pages de marketing y campana de alta calidad construidas con React y tooling compartido. Cada pagina esta disenada para objetivos claros de conversion, jerarquia visual fuerte y tiempos de carga rapidos. Enfoque en storytelling de marca, mensajes de campana y resultados medibles para clientes.',
      de: 'Hochwertige Marketing- und Kampagnen-Landingpages auf Basis von React und gemeinsamem Tooling. Jede Seite ist auf klare Conversion-Ziele, starke visuelle Hierarchie und schnelle Ladezeiten ausgelegt. Fokus auf Brand-Storytelling, Kampagnenbotschaften und messbare Ergebnisse fur Kunden.',
    },
    achievements: {
      es: [
        'Se entregaron multiples landing pages de campana con React y tooling compartido para objetivos claros de conversion y carga rapida.',
        'Se implemento jerarquia visual solida, storytelling de marca y mensajes de campana alineados a resultados de cliente.',
        'Se usaron Motion, GSAP y Lottie para animaciones; React Three Fiber y Strapi cuando fue necesario.',
      ],
      de: [
        'Mehrere Kampagnen-Landingpages wurden mit React und gemeinsamem Tooling fur klare Conversion-Ziele und schnelle Ladezeiten umgesetzt.',
        'Eine starke visuelle Hierarchie, Brand-Storytelling und Kampagnenbotschaften wurden auf Kundenziele ausgerichtet.',
        'Motion, GSAP und Lottie wurden fur Animationen eingesetzt; React Three Fiber und Strapi bei Bedarf.',
      ],
    },
  },
  'dart-corporate': {
    title: {
      es: "D'Art Design Group - Landing pages corporativas",
      de: "D'Art Design Group - Corporate Landingpages",
    },
    description: {
      es: "Landing pages corporativas para clientes de D'Art Design Group, construidas con Next.js, Craft CMS, GraphQL y tooling front-end compartido (Motion, GSAP, Lottie, SASS).",
      de: "Corporate-Landingpages fur Kunden der D'Art Design Group, gebaut mit Next.js, Craft CMS, GraphQL und gemeinsamem Frontend-Tooling (Motion, GSAP, Lottie, SASS).",
    },
    achievements: {
      es: [
        'Se construyeron y lanzaron multiples landing pages corporativas para clientes de D’Art Design Group con stack compartido en Next.js.',
        'Se integraron Craft CMS y GraphQL para paginas orientadas a contenido con datos tipados y validacion Zod.',
        'Se entregaron experiencias responsive y animadas con Motion, GSAP y Lottie; SASS para consistencia visual.',
      ],
      de: [
        'Mehrere Corporate-Landingpages fur Kunden der D’Art Design Group wurden mit gemeinsamem Next.js-Stack gebaut und ausgeliefert.',
        'Craft CMS und GraphQL wurden fur content-getriebene Seiten mit typsicheren Daten und Zod-Validierung integriert.',
        'Responsive, animierte Erlebnisse mit Motion, GSAP und Lottie wurden umgesetzt; SASS sorgte fur konsistente Styles.',
      ],
    },
  },
  personal: {
    title: {
      es: 'Proyectos personales',
      de: 'Persoenliche Projekte',
    },
    description: {
      es: 'Proyectos personales creados para practicar Astro, un framework de sitios estaticos.',
      de: 'Persoenliche Projekte zum Vertiefen von Astro, einem interessanten Static-Site-Framework.',
    },
    achievements: {
      es: [
        'Se lanzaron varios sitios estaticos con Astro para builds rapidos y JavaScript minimo cuando aplica.',
        'Se uso TypeScript y Zod para contenido tipado y validacion entre proyectos.',
        'Se entregaron sitios orientados a cliente: menu y ubicacion de food truck, info de restaurante y portfolio con contacto para profesional independiente.',
      ],
      de: [
        'Mehrere statische Websites mit Astro wurden fur schnelle Builds und minimalen JavaScript-Einsatz ausgeliefert.',
        'TypeScript und Zod wurden fur typsicheren Content und Validierung in den Projekten genutzt.',
        'Kundenorientierte Sites wurden geliefert: Foodtruck-Menuseite mit Standort, Restaurantseite sowie Handwerker-Portfolio mit Kontaktwegen.',
      ],
    },
  },
  'dart-3d': {
    title: {
      es: 'Dart Design - Showcase de producto 3D y casos conceptuales',
      de: 'Dart Design - 3D-Produktshowcase und Konzept-Cases',
    },
    description: {
      es: "Aplicaciones 3D para clientes de D'Art Design: mundos 3D para visualizar productos y flujos de empresa, hubs 3D interactivos para explorar servicios, showcases de producto fotorrealistas para pitches y herramientas internas como configurador de modelos para que artistas prueben shaders y assets en navegador. Usado en ferias, eventos y presentaciones de concepto.",
      de: "3D-Anwendungen fur Kunden von D'Art Design: 3D-Welten zur Visualisierung von Produkten und Prozessen, interaktive 3D-Hubs zur Service-Exploration, fotorealistische Produktshowcases fur Pitches sowie interne Tools wie ein Modellkonfigurator, mit dem Artists Shader und Assets im Browser testen konnen. Eingesetzt auf Messen, Events und in Konzeptprasentationen.",
    },
    achievements: {
      es: [
        'Se entregaron aplicaciones 3D para clientes de D’Art Design: mundos isometricos de producto, hubs de servicios interactivos y showcases fotorrealistas para ferias y presentaciones.',
        'Se colaboro estrechamente con artistas 3D para validar implementaciones, shaders y materiales en navegador y alinear pipeline arte-dev.',
        'Se construyeron herramientas internas, como configurador 3D de modelos, para validar assets e iluminacion en WebGL antes de integrar.',
      ],
      de: [
        '3D-Anwendungen fur D’Art-Design-Kunden wurden ausgeliefert: isometrische Produktwelten, interaktive Service-Hubs und fotorealistische Showcases fur Messen und Pitches.',
        'Enge Zusammenarbeit mit 3D-Artists zur Validierung von Implementierungen, Shadern und Materialien im Browser zur besseren Abstimmung von Art und Dev.',
        'Interne Tools wie ein 3D-Modellkonfigurator wurden entwickelt, um Assets und Beleuchtung in WebGL vor der Integration zu validieren.',
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
      de: 'Migros Escape Game',
    },
    description: {
      es: 'Landing page para la campana Migros Escape Game 2025 de la cadena de supermercados Migros.',
      de: 'Landingpage fur die Migros-Escape-Game-Kampagne 2025 der Supermarktkette Migros.',
    },
  },
  'lp-2': {
    title: {
      es: 'Snipes 25th Anniversary',
      de: 'Snipes 25th Anniversary',
    },
    description: {
      es: 'Landing page para la campana de 25 aniversario de Snipes con modelos 3D exclusivos y showcase de productos.',
      de: 'Landingpage fur die 25-Jahre-Kampagne von Snipes mit exklusiven 3D-Modellen und Produktshowcase.',
    },
  },
  'lp-3': {
    title: {
      es: 'Snipes Soundbooth',
      de: 'Snipes Soundbooth',
    },
    description: {
      es: 'Landing page para Snipes Soundbooth.',
      de: 'Landingpage fur Snipes Soundbooth.',
    },
  },
  'corporative-lp-1': {
    title: {
      es: "D'Art Digital Agency - Landing page",
      de: "D'Art Digital Agency - Landingpage",
    },
    description: {
      es: "Landing page de D'Art Digital Agency para mostrar servicios y portfolio.",
      de: "Landingpage fur D'Art Digital Agency zur Darstellung von Services und Portfolio.",
    },
  },
  'corporative-lp-2': {
    title: {
      es: 'Stiftung Paulinenhilfe - Landing page corporativa',
      de: 'Stiftung Paulinenhilfe - Corporate Landingpage',
    },
    description: {
      es: 'Landing page para Stiftung Paulinenhilfe para mostrar sus servicios.',
      de: 'Landingpage fur Stiftung Paulinenhilfe zur Darstellung der Leistungen.',
    },
  },
  'corporative-lp-3': {
    title: {
      es: 'Medienvorsorge.de - Landing page',
      de: 'Medienvorsorge.de - Landingpage',
    },
    description: {
      es: 'Landing page para Medienvorsorge.de para mostrar sus servicios.',
      de: 'Landingpage fur Medienvorsorge.de zur Darstellung der Leistungen.',
    },
  },
  'corporative-lp-4': {
    title: {
      es: 'Hanselmann & Compagnie - Landing page corporativa',
      de: 'Hanselmann & Compagnie - Corporate Landingpage',
    },
    description: {
      es: 'Landing page para Hanselmann & Compagnie para mostrar sus servicios.',
      de: 'Landingpage fur Hanselmann & Compagnie zur Darstellung der Leistungen.',
    },
  },
  'corporative-lp-5': {
    title: {
      es: 'Düsseldorf Airport Quiz game',
      de: 'Düsseldorf Airport Quiz-Spiel',
    },
    description: {
      es: 'Juego quiz para Düsseldorf Airport para mostrar sus servicios y la ciudad de Düsseldorf de forma gamificada.',
      de: 'Quiz-Spiel fur den Düsseldorf Airport, das Leistungen und die Stadt Düsseldorf spielerisch prasentiert.',
    },
  },
  'personal-1': {
    title: { es: 'El Maizter - Sitio web foodtruck', de: 'El Maizter - Foodtruck-Website' },
    description: {
      es: 'Menu online y hub de ubicacion para un food truck; ayuda a clientes a encontrarlo y revisar la oferta antes de pedir.',
      de: 'Online-Menuseite und Standort-Hub fur einen Foodtruck; hilft Kunden, den Truck zu finden und das Angebot vorab zu sehen.',
    },
  },
  'personal-2': {
    title: { es: 'La Cabana - Sitio web de restaurante', de: 'La Cabana - Restaurant-Website' },
    description: {
      es: 'Sitio de restaurante con ambiente, horarios y datos de contacto para planear visitas y ponerse en contacto.',
      de: 'Restaurantseite mit Atmosphare, Offnungszeiten und Kontaktdaten, damit Gaste ihren Besuch planen konnen.',
    },
  },
  'personal-3': {
    title: {
      es: 'ASP - Sitio web de artesano freelance',
      de: 'ASP - Website fur freiberuflichen Handwerker',
    },
    description: {
      es: 'Portfolio y web de contacto para un profesional de oficios; muestra trabajos previos y facilita solicitar presupuestos.',
      de: 'Portfolio- und Kontaktseite fur einen Handwerker; zeigt Referenzen und erleichtert Angebotsanfragen.',
    },
  },
  'dart-3d-1': {
    title: {
      es: 'SMA. - Experiencia 3D de energia verde',
      de: 'SMA. - 3D-Erlebnis fur grune Energie',
    },
    description: {
      es: 'Mundo 3D isometrico y simplificado para SMA (marca de energia verde) con showcase de producto y modelos 3D interactivos para explicar su red energetica integrada. Usado en ferias y eventos.',
      de: 'Isometrische, vereinfachte 3D-Welt fur SMA (Green-Energy-Marke) mit Produktshowcase und interaktiven 3D-Modellen zur Darstellung ihres integrierten Energienetzwerks. Eingesetzt auf Messen und Events.',
    },
  },
  'dart-3d-2': {
    title: {
      es: 'Düsseldorf Airport - Experiencia 3D',
      de: 'Düsseldorf Airport - 3D-Erlebnis',
    },
    description: {
      es: 'Experiencia 3D con modelo simplificado del aeropuerto para mostrar servicios y ofrecer un hub interactivo para explorar el aeropuerto. Usado en ferias y eventos.',
      de: '3D-Erlebnis mit vereinfachtem Flughafenmodell zur Darstellung von Services und als interaktiver Hub zur Erkundung des Flughafens. Eingesetzt auf Messen und Events.',
    },
  },
  'dart-3d-3': {
    title: {
      es: 'GROHE - Showcase de producto 3D (pitch)',
      de: 'GROHE - 3D-Produktshowcase (Pitch)',
    },
    description: {
      es: 'Concepto para GROHE: modelo de producto 3D con texturas realistas de alta resolucion, materiales Kronos y shaders avanzados para renders fotorrealistas en navegador.',
      de: 'Konzept fur GROHE: 3D-Produktmodell mit hochauflosenden, realistischen Texturen, Kronos-Materialien und fortgeschrittenen Shadern fur fotorealistische Browser-Renderings.',
    },
  },
  'dart-3d-4': {
    title: {
      es: 'Configurador de modelo 3D',
      de: '3D-Modellkonfigurator',
    },
    description: {
      es: 'Concepto para artistas 3D para probar shaders y assets en navegador, igualando el render del editor 3D en WebGL con panel para configurar modelo y mapas de luz. Facilita alinear artistas y desarrolladores entre proyectos.',
      de: 'Konzept fur 3D-Artists zum Testen von Shadern und Assets im Browser, damit das Rendering dem 3D-Editor in WebGL entspricht; inklusive Panel fur Modell- und Lightmap-Konfiguration. Vereinfacht die Abstimmung zwischen Art und Dev uber mehrere Projekte.',
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

function getLocalizedItem(item: ProjectGroupItem, locale: Locale): ProjectGroupItem {
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

