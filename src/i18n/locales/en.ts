import type pt from "./pt";

const en: typeof pt = {
  nav: {
    home: "Home",
    contacts: "Contact",
    projects: "Projects",
    login: "Login",
  },
  language: { label: "Language" },
  skills: {
    title: "Skills",
    subtitle: "Each skill levels up with the projects it was used in.",
    fullscreen: "Open full screen",
    backHome: "Back to home",
    pageTitle: "Skill tree",
  },
  view: { toList: "Simplify", toTree: "View tree" },
  tree: {
    level: "Lv. {{level}}",
    locked: "Locked",
    base: "Base",
    projects_one: "{{count}} project",
    projects_other: "{{count}} projects",
    fieldProgress: "{{done}}/{{total}} skills",
    formationYears_zero: "0 years of education",
    formationYears_one:
      "{{count, number(maximumFractionDigits: 1)}} year of education",
    formationYears_other:
      "{{count, number(maximumFractionDigits: 1)}} years of education",
    experienceYears_zero: "0 years of experience",
    experienceYears_one:
      "{{count, number(maximumFractionDigits: 1)}} year of experience",
    experienceYears_other:
      "{{count, number(maximumFractionDigits: 1)}} years of experience",
  },
  category: {
    linguagem: "Language",
    framework: "Framework",
    "base-de-dados": "Database",
    ferramenta: "Tool",
    conceito: "Concept",
  },
  list: {
    skills: "Skills",
    education: "Education",
    experience: "Experience",
    certificates: "Certificates",
    present: "present",
    viewCertificate: "View certificate",
  },
  projects: { title: "Projects" },
  status: { concluido: "Completed", producao: "In production" },
  footer: { title: "Contact", cta: "Let's talk?" },
  login: {
    title: "Login",
    user: "Username",
    password: "Password",
    submit: "Sign in",
    error: "Invalid credentials.",
  },
  admin: {
    title: "Admin panel",
    logout: "Sign out",
    // Fake form (the joke)
    name: "Project name",
    description: "Description",
    link: "Link (GitHub, demo...)",
    tech: "Technologies and tools (comma separated)",
    save: "Save project",
    saving: "Saving...",
    errorTitle: "Error 403: no write permissions.",
    errorBody:
      "You got in with one of the most common passwords in the world, so nothing gets saved here. This attempt has been logged in the stats. Nice try!",
    // Real panel
    projectsTitle: "Projects",
    newProject: "New project",
    editProject: "Edit project",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Delete this project? This cannot be undone.",
    cancel: "Cancel",
    empty: "No projects yet.",
    fieldName: "Name",
    fieldSlug: "Identifier (used in the URL)",
    fieldDescPt: "Description (Portuguese)",
    fieldDescEn: "Description (English)",
    fieldStatus: "Status",
    fieldDate: "Date",
    fieldFeatured: "Featured",
    fieldSkills: "Skills used",
    fieldLinks: "Links",
    linkLabelPt: "Label (PT)",
    linkLabelEn: "Label (EN)",
    linkUrl: "URL",
    addLink: "Add link",
    removeLink: "Remove",
    saveError: "Could not save: {{message}}",
  },
};

export default en;
