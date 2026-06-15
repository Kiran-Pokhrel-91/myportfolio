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
    items: ["Python", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Frontend",
    items: ["React", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Django", "Django REST", "Flask"],
  },
  {
    category: "Database",
    items: ["SQLite", "MySQL"],
  },
  {
    category: "Data & ML",
    items: ["NumPy", "Pandas", "Scikit-Learn", "TensorFlow", "Matplotlib"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "VS Code", "Linux", "Docker", "NGINX"],
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
    text: "Instagram",
    icon: "/icons/instagram.svg",
    bg: "#e1306c",
    link: "https://www.instagram.com/kiran_pokhrel_07/",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#0a66c2",
    link: "https://www.linkedin.com/in/kiran-pokhrel-91/",
  },
  {
    id: 5,
    text: "Facebook",
    icon: "/icons/facebook.svg",
    bg: "#1877f2",
    link: "https://www.facebook.com/kiran.pokhrel.1253",
  },
  {
    id: 6,
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
  name: "Work",
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
            "A deep learning system that classifies blood cell images as malaria-infected or healthy using convolutional neural networks.",
            "Built with TensorFlow and Keras, the model achieves high accuracy on the NIH Malaria dataset. The pipeline includes image preprocessing, data augmentation, transfer learning with pretrained backbones, and a Flask API for serving predictions.",
            "Features: automated blood smear analysis, batch prediction, confidence scoring, and a simple web interface for uploading and visualizing results.",
            "Tech stack: Python, TensorFlow, Flask, OpenCV, NumPy, Pandas, and Jupyter Notebooks for experimentation.",
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
            "A classifieds marketplace platform for local buying and selling",
          description: [
            "A full-stack classifieds marketplace that connects local buyers and sellers — think Craigslist, but built for Nepal.",
            "Users can post ads with images, browse listings by category, search and filter results, chat with sellers, and manage their own listings through a personal dashboard.",
            "Built with React on the frontend and Node.js/Express on the backend, with MongoDB for flexible data storage. Authentication handled via JWT, and images are uploaded to Cloudinary for optimized delivery.",
            "Features include: user authentication, ad creation with image upload, category-based browsing, search with keyword and filters, seller chat, responsive design, and pagination.",
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
            "A full-featured Trello clone built with React & TypeScript",
          description: [
            "A Kanban board application inspired by Trello, built from scratch with React, TypeScript, and Tailwind CSS.",
            "Features include: drag-and-drop cards across columns, board creation and management, real-time collaboration, markdown support in card descriptions, labels, checklists, due dates, and user assignment.",
            "Built with a modern stack: React + TypeScript for the frontend, Node.js/Express for the API, and PostgreSQL for persistence. Drag-and-drop powered by dnd-kit for a smooth, accessible experience.",
            "Fully responsive — works seamlessly on desktop and mobile browsers. Deployed with CI/CD pipeline and containerized via Docker.",
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
        // {
        //   id: 3,
        //   name: "trello-screenshot.png",
        //   icon: "/images/image.png",
        //   kind: "file",
        //   fileType: "img",
        //   position: "top-5 left-52",
        //   imageUrl: "",
        // },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
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
      subtitle: "About Me",
      description: [
        "Hey! I'm Kiran 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        "I'm big on clean UI, good UX, and writing code that doesn't need a search party to debug.",
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
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
