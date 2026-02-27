export interface SeoMessages {
  defaultDescription: string;
  localeMeta: string;
}

export interface Messages {
  nav: {
    home: string;
    projects: string;
    about: string;
    contact: string;
    mainAriaLabel: string;
  };
  common: {
    resume: string;
    connect: string;
    loading: string;
    skipToMain: string;
    language: string;
    languageLabel: string;
    switchToLightTheme: string;
    switchToDarkTheme: string;
    lightMode: string;
    darkMode: string;
    notFoundTitle: string;
    notFoundText: string;
    backToHome: string;
  };
  home: {
    subtitle: string;
    viewWork: string;
    getInTouch: string;
    portfolioEyebrow: string;
    selectedWork: string;
    workSubtitle: string;
    professional: string;
    personal: string;
    ctaTitle: string;
    ctaText: string;
    viewAllProjects: string;
  };
  stack: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  about: {
    eyebrow: string;
    title: string;
    languagesTitle: string;
    languagesText: string;
    beyondWorkTitle: string;
    beyondWorkText: string;
  };
  projects: {
    eyebrow: string;
    title: string;
    subtitle: string;
    all: string;
    professional: string;
    personal: string;
    personalProject: string;
    collection: string;
    backToProjects: string;
    projectNotFound: string;
    groupNotFound: string;
    keyAchievements: string;
    technologies: string;
    viewProject: string;
    projectsList: string;
    award: string;
  };
  contact: {
    title: string;
    intro: string;
    email: string;
    social: string;
    phone: string;
    location: string;
    sendMessage: string;
    name: string;
    yourName: string;
    emailField: string;
    message: string;
    yourMessage: string;
    sendButton: string;
    success: string;
    defaultError: string;
    validation: {
      nameRequired: string;
      nameTooLong: string;
      emailRequired: string;
      emailInvalid: string;
      messageMin: string;
      messageTooLong: string;
    };
  };
  seo: SeoMessages;
}

