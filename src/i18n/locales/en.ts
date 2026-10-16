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
  view: {
    tree: "Tree",
    list: "List",
  },
  tree: {
    level: "Lv. {{level}}",
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
  projects: {
    title: "Projects",
    view: "View project",
    empty: "New projects coming soon.",
    groups: {
      concluido: "Completed",
      desenvolvimento: "In development",
      inacabado: "Unfinished",
    },
    hints: {
      concluido: "Finished and working",
      desenvolvimento: "Still being worked on",
      inacabado: "Left halfway, but worth the lessons",
    },
  },
  project: {
    back: "Back to projects",
    notFound: "Project not found.",
    since: "since {{date}}",
  },
  status: {
    concluido: "Completed",
    desenvolvimento: "In development",
    inacabado: "Unfinished",
  },
  footer: { title: "Contact", cta: "Let's talk?" },
  login: {
    title: "Login",
    user: "Username",
    password: "Password",
    submit: "Sign in",
    error: "Invalid credentials.",
  },
  admin: {
    // General
    title: "Admin panel",
    logout: "Sign out",
    back: "Back to list",
    cancel: "Cancel",
    save: "Save project",
    saving: "Saving...",
    saveError: "Could not save: {{message}}",
    uploading: "Uploading image {{current}} of {{total}}...",

    // Fake form (the joke)
    name: "Project name",
    description: "Description",
    link: "Link (GitHub, demo...)",
    tech: "Technologies and tools (comma separated)",
    errorTitle: "Error 403: no write permissions.",
    errorBody:
      "You got in with one of the most common passwords in the world, so nothing gets saved here. This attempt has been logged in the stats. Nice try!",

    // Project list
    projectsTitle: "Projects",
    newProject: "New project",
    editProject: "Edit project",
    edit: "Edit",
    delete: "Delete",
    confirmDelete: "Delete this project? This cannot be undone.",
    empty: "No projects yet.",

    // Form: basics
    sectionBasics: "Basics",
    fieldName: "Name",
    fieldSlug: "Identifier (used in the URL)",
    slugPreview: "Address",
    slugEdit: "edit",
    fieldDescPt: "Description (Portuguese)",
    fieldDescEn: "Description (English)",
    descEnHint: "Optional. If left empty, the Portuguese text is used.",

    // Form: status and dates
    sectionStatus: "Status and dates",
    fieldStatus: "Status",
    fieldStart: "Start",
    fieldEndDone: "Finished on",
    fieldEndStopped: "Stopped on",
    dateError: "The end date cannot be before the start.",
    fieldFeatured: "Featured",

    // Form: gallery
    fieldGallery: "Gallery",
    galleryHint:
      "The first image is the project cover. The order here is the order on the page.",
    dropTitle: "Drag images here",
    dropOr: "or click to choose",
    dropHint: "They are resized and converted to webp automatically.",
    cover: "Cover",
    captionPt: "Text beside the image (PT)",
    captionEn: "Text beside the image (EN)",
    sideLeft: "Image on the left",
    sideRight: "Image on the right",
    moveUp: "Move up",
    moveDown: "Move down",
    removeImage: "Remove",

    // Form: technologies
    fieldSkills: "Skills used",
    skillsSearch: "Search technologies...",
    skillsSelected: "Selected ({{count}})",
    skillsNone: "No technologies found.",
    skillsOther: "Other",

    // Form: links
    fieldLinks: "Links",
    linkRepo: "Repository",
    linkDemo: "Demo",
    linkSite: "Website",
    linkOther: "Other",
    linkLabelPt: "Label (PT)",
    linkLabelEn: "Label (EN)",
    linkUrl: "URL",
    removeLink: "Remove",
  },
};

export default en;