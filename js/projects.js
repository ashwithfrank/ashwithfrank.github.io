/*
 * projects.js — the only file you need to edit to add, remove or reorder projects.
 *
 * HOW TO ADD A PROJECT
 *   1. Copy any object below, paste it where you want the card to appear
 *      (cards show in the order listed; featured ones are shown first).
 *   2. Change the fields. Only `id`, `name`, `summary` and `status` are required.
 *   3. Save. No build step.
 *
 * FIELDS
 *   id        Unique, lowercase, no spaces. Used for the card's #anchor.
 *   name      Project title.
 *   icon      One of: cloud, link, grid, jet, desktop, book, cap, face, edit,
 *             code, phone. (They live in the icon sprite near the top of index.html;
 *             copy a <symbol id="p-..."> there to add your own.)
 *   summary   One or two sentences. Say what it does, not how great it is.
 *   tags      Technologies actually used in the repository.
 *   status    One of: "Released", "Working", "In development", "Prototype".
 *               Released        publicly available (e.g. on Google Play)
 *               Working         functional, may still change
 *               In development  core pieces unfinished
 *               Prototype       built to learn or test an idea
 *   featured  true = shown in the first group; false = behind "Show all projects".
 *   github    Repository URL, or null when there is no public source.
 *   demo      Link to a live, working version, or null. Only add a URL you have opened yourself.
 *   links     Optional extra links: [{ label: "Google Play", url: "https://..." }]
 *
 * This file was written from the contents of the public repositories at
 * https://github.com/ashwithfrank/ (checked 25 Oct 2026). Status labels are a
 * judgement based on each repository; change them if they are out of date.
 */
window.PROJECTS = [
  /* ---------- Featured ---------- */
  {
    id: "afdrive",
    name: "AFDrive",
    icon: "cloud",
    summary:
      "A self-hosted personal cloud that turns an old Android phone into a private file server on your Wi-Fi. Login-protected, with safe path handling and streamed uploads and downloads.",
    tags: ["Python", "Flask", "SQLite", "JavaScript", "Termux"],
    status: "Working",
    featured: true,
    github: "https://github.com/ashwithfrank/AFDrive",
    demo: null,
    links: [{ label: "Project page", url: "projects/af-drive/" }]
  },
  {
    id: "games-of-grid",
    name: "Games of Grid",
    icon: "grid",
    summary:
      "A sliding tile puzzle for Android with 3×3 and 4×4 grids and two difficulty modes. Published on Google Play under AlphaOmega Studio and fully offline.",
    tags: ["Android", "Android Studio"],
    status: "Released",
    featured: true,
    github: null, // source is not public
    demo: null,
    links: [
      { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.alphaomegastudio.gog" },
      { label: "Project page", url: "projects/games-of-grid/" }
    ]
  },
  {
    id: "daily-bible-verse",
    name: "Daily Bible Verse",
    icon: "book",
    summary:
      "A mobile-first site that shows one Bible verse per date, with language switching and sharing, plus a secure admin dashboard for managing verses.",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    status: "Working",
    featured: true,
    github: "https://github.com/ashwithfrank/daily-bible-verse",
    demo: null
  },
  {
    id: "shc-smart-library",
    name: "SHC Smart Library",
    icon: "book",
    summary:
      "A library management system with a student catalogue, reservations and waiting lists, issuing and returning books, and separate staff and admin screens.",
    tags: ["JavaScript", "HTML/CSS", "Supabase"],
    status: "In development",
    featured: true,
    github: "https://github.com/ashwithfrank/SHC-Smart-Library",
    demo: null
  },
  {
    id: "lilos",
    name: "LilOS",
    icon: "desktop",
    summary:
      "A desktop-style operating system simulation that runs in one browser tab, with draggable windows, a virtual file system, a working terminal and offline support.",
    tags: ["JavaScript", "IndexedDB", "Service Worker", "HTML/CSS"],
    status: "Working",
    featured: true,
    github: "https://github.com/ashwithfrank/LilOS",
    demo: null
  },
  {
    id: "jet-dodge",
    name: "JET//DODGE",
    icon: "jet",
    summary:
      "A browser arcade survival game with five hazard types, a rising difficulty curve, procedural sound effects, and keyboard, touch and gamepad controls.",
    tags: ["TypeScript", "JavaScript", "Canvas", "Web Audio"],
    status: "Working",
    featured: true,
    github: "https://github.com/ashwithfrank/jet-dodge",
    demo: null
  },

  /* ---------- More projects ---------- */
  {
    id: "afdrive-online",
    name: "AFDrive Online",
    icon: "link",
    summary:
      "An online extension of AFDrive. An agent on your own device connects out to a relay, so authorised people can reach chosen folders remotely while the files stay put.",
    tags: ["Python", "Flask", "Node.js", "WebSocket", "Supabase"],
    status: "In development",
    featured: false,
    github: "https://github.com/ashwithfrank/AFDrive-Online",
    demo: null
  },
  {
    id: "school-dashboard",
    name: "School Staff Dashboard",
    icon: "cap",
    summary:
      "A staff management dashboard with authentication, role-based access and audit logging. A local Node.js and MySQL backend is being added for offline use.",
    tags: ["JavaScript", "HTML/CSS", "Supabase", "PostgreSQL", "Node.js", "MySQL"],
    status: "In development",
    featured: false,
    github: "https://github.com/ashwithfrank/SchoolDashboard",
    demo: null
  },
  {
    id: "smart-face-attendance",
    name: "Smart Face Attendance",
    icon: "face",
    summary:
      "A browser-based attendance system that registers students' faces and marks attendance from a live camera feed, with manual entry as a fallback. Data stays in the browser.",
    tags: ["JavaScript", "face-api.js", "HTML/CSS", "localStorage"],
    status: "Prototype",
    featured: false,
    github: "https://github.com/ashwithfrank/smart-face-attendance-system",
    demo: null
  },
  {
    id: "file-editor",
    name: "File Editor",
    icon: "edit",
    summary:
      "A client-side code editor with tabs, a file explorer, syntax highlighting, find and replace, and three themes. Files never leave your machine.",
    tags: ["JavaScript", "HTML/CSS", "File System Access API"],
    status: "Working",
    featured: false,
    github: "https://github.com/ashwithfrank/file-editor",
    demo: null
  },
  {
    id: "tower-of-hanoi",
    name: "Tower of Hanoi Solver",
    icon: "code",
    summary:
      "An interactive solver that takes any number of disks and lists every move and the total, using recursion. Also includes a Java Swing version.",
    tags: ["JavaScript", "HTML/CSS", "Java"],
    status: "Released",
    featured: false,
    github: "https://github.com/ashwithfrank/ashwithfrank.github.io/tree/main/projects/tower-of-hanoi",
    demo: "projects/tower-of-hanoi/"
  },
  {
    id: "dbv-admin",
    name: "Daily Bible Verse Admin",
    icon: "phone",
    summary:
      "A static admin dashboard for managing verses, saints, Saint of the Day assignments and translations, built for a new Daily Bible Verse app. Uses Supabase with Row Level Security.",
    tags: ["JavaScript", "HTML/CSS", "Supabase"],
    status: "In development",
    featured: false,
    github: "https://github.com/ashwithfrank/daily-bible-verse-app",
    demo: null
  }
];
