const pt = {
  nav: {
    home: "Home",
    contacts: "Contactos",
    projects: "Projetos",
    login: "Login",
  },
  language: { label: "Idioma" },
  skills: {
    title: "Skills",
    subtitle: "Cada skill sobe de nível com os projetos em que foi usada.",
    fullscreen: "Abrir em ecrã inteiro",
    backHome: "Voltar à home",
    pageTitle: "Skill tree",
  },
  view: {
    tree: "Árvore",
    list: "Lista",
  },
  tree: {
    level: "Nv. {{level}}",
    base: "Base",
    projects_one: "{{count}} projeto",
    projects_other: "{{count}} projetos",
    fieldProgress: "{{done}}/{{total}} skills",
    formationYears_zero: "0 anos de formação",
    formationYears_one:
      "{{count, number(maximumFractionDigits: 1)}} ano de formação",
    formationYears_other:
      "{{count, number(maximumFractionDigits: 1)}} anos de formação",
    experienceYears_zero: "0 anos de experiência",
    experienceYears_one:
      "{{count, number(maximumFractionDigits: 1)}} ano de experiência",
    experienceYears_other:
      "{{count, number(maximumFractionDigits: 1)}} anos de experiência",
  },
  category: {
    linguagem: "Linguagem",
    framework: "Framework",
    "base-de-dados": "Base de dados",
    ferramenta: "Ferramenta",
    conceito: "Conceito",
  },
  list: {
    skills: "Skills",
    education: "Formação",
    experience: "Experiência",
    certificates: "Certificados",
    present: "atual",
    viewCertificate: "Ver certificado",
  },
  projects: {
    title: "Projetos",
    view: "Ver projeto",
    empty: "Em breve, novos projetos.",
    groups: {
      concluido: "Concluídos",
      desenvolvimento: "Em desenvolvimento",
      inacabado: "Inacabados",
    },
    hints: {
      concluido: "Prontos e funcionais",
      desenvolvimento: "Ainda a ser trabalhados",
      inacabado: "Ficaram a meio, mas com aprendizagens",
    },
  },
  project: {
    back: "Voltar aos projetos",
    notFound: "Projeto não encontrado.",
    since: "desde {{date}}",
  },
  status: {
    concluido: "Concluído",
    desenvolvimento: "Em desenvolvimento",
    inacabado: "Inacabado",
  },
  footer: { title: "Contactos", cta: "Vamos falar?" },
  login: {
    title: "Login",
    user: "Utilizador",
    password: "Password",
    submit: "Entrar",
    error: "Credenciais inválidas.",
  },
  admin: {
    // Geral
    title: "Painel de administração",
    logout: "Sair",
    back: "Voltar à lista",
    cancel: "Cancelar",
    save: "Guardar projeto",
    saving: "A guardar...",
    saveError: "Não foi possível guardar: {{message}}",
    uploading: "A enviar imagem {{current}} de {{total}}...",

    // Formulário falso (piada)
    name: "Nome do projeto",
    description: "Descrição",
    link: "Link (GitHub, demo...)",
    tech: "Tecnologias e ferramentas (separadas por vírgulas)",
    errorTitle: "Erro 403: sem permissões de escrita.",
    errorBody:
      "Entraste com uma das passwords mais comuns do mundo, por isso aqui não se guarda nada. Esta tentativa ficou registada nas estatísticas. Boa tentativa!",

    // Lista de projetos
    projectsTitle: "Projetos",
    newProject: "Novo projeto",
    editProject: "Editar projeto",
    edit: "Editar",
    delete: "Apagar",
    confirmDelete: "Apagar este projeto? Não dá para desfazer.",
    empty: "Ainda não há projetos.",

    // Formulário: informação básica
    sectionBasics: "Informação básica",
    fieldName: "Nome",
    fieldSlug: "Identificador (usado no URL)",
    slugPreview: "Endereço",
    slugEdit: "editar",
    fieldDescPt: "Descrição (português)",
    fieldDescEn: "Descrição (inglês)",
    descEnHint: "Opcional. Se ficar vazio, usa-se o texto em português.",

    // Formulário: estado e datas
    sectionStatus: "Estado e datas",
    fieldStatus: "Estado",
    fieldStart: "Início",
    fieldEndDone: "Concluído em",
    fieldEndStopped: "Parado em",
    dateError: "A data final não pode ser anterior ao início.",
    fieldFeatured: "Destaque",

    // Formulário: galeria
    fieldGallery: "Galeria",
    galleryHint:
      "A primeira imagem é a capa do projeto. A ordem aqui é a ordem na página.",
    dropTitle: "Arrasta imagens para aqui",
    dropOr: "ou clica para escolher",
    dropHint: "São reduzidas e convertidas para webp automaticamente.",
    cover: "Capa",
    captionPt: "Descrição ao lado da imagem (PT)",
    captionEn: "Descrição ao lado da imagem (EN)",
    sideLeft: "Imagem à esquerda",
    sideRight: "Imagem à direita",
    moveUp: "Subir",
    moveDown: "Descer",
    removeImage: "Remover",

    // Formulário: tecnologias
    fieldSkills: "Skills usadas",
    skillsSearch: "Pesquisar tecnologias...",
    skillsSelected: "Selecionadas ({{count}})",
    skillsNone: "Nenhuma tecnologia encontrada.",
    skillsOther: "Outros",

    // Formulário: links
    fieldLinks: "Links",
    linkRepo: "Repositório",
    linkDemo: "Demo",
    linkSite: "Website",
    linkOther: "Outro",
    linkLabelPt: "Etiqueta (PT)",
    linkLabelEn: "Etiqueta (EN)",
    linkUrl: "URL",
    removeLink: "Remover",
  },
};

export default pt;
