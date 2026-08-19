const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  { id: "finder", name: "Files", icon: "finder.png", canOpen: true },
  { id: "safari", name: "Articles", icon: "safari.png", canOpen: true },
  { id: "photos", name: "Gallery", icon: "photos.png", canOpen: true },
  { id: "contact", name: "Contact", icon: "contact.png", canOpen: true },
  { id: "terminal", name: "Skills", icon: "terminal.png", canOpen: true },
  { id: "trash", name: "Archive", icon: "trash.png", canOpen: false },
];

const techStack = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "GSAP", "Zustand"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Django", "Django REST Framework", "Flask", "REST APIs"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "SQLite", "MySQL"],
  },
  {
    category: "Data & ML",
    items: ["TensorFlow", "Scikit-Learn", "NumPy", "Pandas", "Matplotlib"],
  },
  {
    category: "DevOps & Tools",
    items: ["Git", "GitHub", "Docker", "NGINX", "Linux", "VS Code", "Vite", "CI/CD"],
  },
];

const socials = [
  {
    id: 1,
    text: "GitHub",
    icon: "/icons/github.svg",
    bg: "#333",
    link: "https://github.com/Kiran-Pokhrel-91",
  },
  {
    id: 2,
    text: "Email",
    icon: "mail",
    bg: "#ea4335",
    link: "mailto:kiranpokhrel912@gmail.com",
  },
  {
    id: 3,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#0a66c2",
    link: "https://www.linkedin.com/in/kiranpokhrel07/",
  },
  {
    id: 4,
    text: "Phone",
    icon: "/icons/phone.svg",
    bg: "#34b7f1",
    link: "tel:+9779749897295",
  },
];

// ── Articles ──────────────────────────────────
// Uncomment and replace with your own articles:
//
// const blogPosts = [
//   { id: 1, date: "Jun 14, 2026", title: "My First Post", link: "https://..." },
// ];
const blogPosts = [];

// ── Photos (sidebar links) ────────────────────
// Uncomment and replace with your own:
//
// const photosLinks = [
//   { id: 1, icon: "/icons/your-icon.svg", title: "Category" },
// ];
const photosLinks = [];

// ── Photos (gallery images) ───────────────────
// Uncomment and replace with your own:
//
// const gallery = [
//   { id: 1, img: "/images/your-photo.png" },
// ];
const gallery = [];

export {
  navLinks,
  navIcons,
  dockApps,
  techStack,
  socials,
  blogPosts,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    {
      id: 5,
      name: "Malaria Diagnosis",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[8vh] left-5",
      children: [
        {
          id: 1,
          name: "Malaria Diagnosis.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          subtitle:
            "Deep learning-based malaria detection from blood smear images",
          description: [
            "An intelligent diagnostic system that leverages convolutional neural networks to classify blood cell images as malaria-infected or healthy — achieving medical-grade accuracy on the NIH Malaria dataset.",
            "The end-to-end pipeline encompasses image preprocessing, data augmentation, transfer learning with pretrained backbones (MobileNetV2, EfficientNet), and a RESTful Flask API for real-time inference.",
            "Key capabilities include automated blood smear analysis, batch prediction with confidence scoring, and a clean web interface for uploading images and visualizing classification results in real-time.",
            "Engineered with Python, TensorFlow/Keras, Flask, OpenCV, NumPy, Pandas, and Jupyter Notebooks for iterative experimentation and model optimization.",
          ],
        },
        {
          id: 2,
          name: "github.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Kiran-Pokhrel-91/Malaria-Diagnosis",
          position: "top-10 right-20",
        },
      ],
    },
    {
      id: 6,
      name: "HamroBazar",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "HamroBazar.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          subtitle:
            "A full-stack classifieds marketplace for local buying and selling",
          description: [
            "A comprehensive classifieds platform purpose-built for the Nepali market — connecting local buyers and sellers through an intuitive, Craigslist-style experience.",
            "Users can create rich listings with image galleries, browse by category, apply granular search filters, communicate with sellers via in-app messaging, and manage their portfolio through a personal dashboard.",
            "Built with a modern React frontend and Node.js/Express backend, backed by MongoDB for flexible document storage. JWT-based authentication, Cloudinary-powered image optimization, and responsive design ensure a polished experience across all devices.",
            "Implemented features: user registration & auth, ad creation with multi-image upload, category-based browsing, keyword search with advanced filters, real-time seller chat, responsive layouts, and infinite scroll pagination.",
          ],
        },
        {
          id: 2,
          name: "github.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Kiran-Pokhrel-91/HamroBazar",
          position: "top-20 left-20",
        },
      ],
    },
    {
      id: 7,
      name: "Trello Clone",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[32vh] left-7",
      children: [
        {
          id: 1,
          name: "Trello.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          subtitle:
            "A production-grade Kanban board built with React & TypeScript",
          description: [
            "A fully-featured project management tool inspired by Trello, architected from the ground up with React, TypeScript, and Tailwind CSS for type safety and maintainability.",
            "Core features include fluid drag-and-drop across columns, board creation and management, markdown-enabled card descriptions, labels, checklists with progress tracking, due dates, user assignment, and collaborative real-time updates.",
            "The tech stack leverages React + TypeScript (frontend), Node.js/Express (API layer), and PostgreSQL (persistence). Drag-and-drop interactions are powered by dnd-kit for an accessible, performant experience.",
            "Fully responsive across all breakpoints, with a CI/CD deployment pipeline and Docker containerization for reproducible builds and zero-downtime deployments.",
          ],
        },
        {
          id: 2,
          name: "github.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Kiran-Pokhrel-91/Trello",
          position: "top-10 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About Me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-10 left-5",
      subtitle: "Full-Stack Software Developer & Machine Learning Engineer",
      description: [
        "I'm Kiran Pokhrel — a software developer driven by curiosity and craft. I build web applications that are fast, accessible, and genuinely enjoyable to use.",
        "My toolkit centers on JavaScript, React, and TypeScript on the frontend, with Node.js, Django, and Flask powering the backend. I believe great software lives at the intersection of clean architecture and thoughtful design.",
        "What sets me apart is my obsession with details: the micro-interaction that makes a UI feel alive, the edge case that prevents a bug at 3AM, the performance optimization that shaves 200ms off load time. I don't just write code — I engineer experiences.",
        "When I'm not shipping features, you'll find me exploring open-source projects, experimenting with machine learning pipelines, or diving into system design. I'm always learning, always building, always improving."
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      href: "/files/resume.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;
const NAVBAR_Z_INDEX = 10001;
const DOCK_Z_INDEX = 10000;

const WINDOW_KEYS = {
  FINDER: "finder",
  CONTACT: "contact",
  RESUME: "resume",
  SAFARI: "safari",
  PHOTOS: "photos",
  TERMINAL: "terminal",
  TEXT: "text",
  IMAGE: "image",
};

const STATIC_WINDOW_KEYS = Object.values(WINDOW_KEYS);

const FILETYPE_TO_WINDOW = {
  txt: "text",
  img: "image",
  pdf: WINDOW_KEYS.RESUME,
};

const windowDefaults = {
  isOpen: false,
  isMinimized: false,
  isMaximized: false,
  zIndex: INITIAL_Z_INDEX,
  data: null,
};

const WINDOW_CONFIG = Object.fromEntries(
  STATIC_WINDOW_KEYS.map((key) => [key, { ...windowDefaults }]),
);

export {
  INITIAL_Z_INDEX,
  NAVBAR_Z_INDEX,
  DOCK_Z_INDEX,
  WINDOW_KEYS,
  STATIC_WINDOW_KEYS,
  WINDOW_CONFIG,
  FILETYPE_TO_WINDOW,
};
