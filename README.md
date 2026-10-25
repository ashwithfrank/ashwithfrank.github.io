# Ashwith Frank — Portfolio

A fast, static developer portfolio built with plain HTML, CSS and JavaScript.
No framework, no build step, no package manager, no API keys.

Live site: https://ashwithfrank.github.io/

## Folder structure

```
.
├── index.html              Page structure, text content, icon sprite
├── css/
│   └── style.css           All styling: themes (tokens at the top), layout, responsive rules
├── js/
│   ├── main.js             Theme toggle, mobile menu, nav highlight, project cards
│   └── projects.js         Your project list. Edit this to add or change projects.
├── assets/
│   └── images/             Favicons and the social share image (og-image.png)
├── projects/               Existing project pages (Tower of Hanoi, Games of Grid, AFDrive)
│   └── legacy.css          Old stylesheet used only by those three pages
├── drive/                  Existing file browser and study files (not touched)
└── README.md
```

## Preview locally

Opening `index.html` directly works for most things. For the most accurate preview, use a tiny local server from the project folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

On Windows use `py -m http.server 8000`.

## Edit your content

| To change | Edit |
|---|---|
| Project cards | `js/projects.js` (instructions are at the top of the file) |
| Hero, About, Exploring and Contact text | `index.html` |
| Skills | `index.html`, section `id="skills"`. Each skill is one `<li>`; copy or delete it. |
| Colours | `css/style.css`, section 1 (Tokens). The dark values are in `:root`, the light ones in `:root[data-theme="light"]`. |
| "Currently exploring" section | Edit its three `<li>` items, or delete the whole `<section id="exploring">` block. |

### Adding a project

Copy an existing object in `js/projects.js`, paste it where you want the card to appear, and change the fields.

```js
{
  id: "my-new-app",              // unique, lowercase, no spaces
  name: "My New App",
  icon: "phone",                 // see the list at the top of projects.js
  summary: "One or two sentences about what it does.",
  tags: ["Flutter", "Dart"],     // only technologies the repository really uses
  status: "In development",      // Released | Working | In development | Prototype
  featured: true,                // true = shown first, false = behind "Show all projects"
  github: "https://github.com/ashwithfrank/my-new-app",
  demo: null                     // add a URL only after you have opened it and it works
}
```

Rules this site follows, and a good habit to keep:

- Describe only what the repository actually does.
- Add a `demo` link only for something that is live and working.
- Use `github: null` when the source is not public. The card then shows "Source is not public".
- Use the status that matches the code today, and update it when that changes.

To add a new icon, copy one `<symbol id="p-...">` in the sprite near the top of `index.html`, rename it, and use the name (without `p-`) as the project's `icon`.

## Deploy to GitHub Pages

The site is already set up for `https://ashwithfrank.github.io/` (the repository named `ashwithfrank.github.io`).

1. Copy the files from this folder into the root of the `ashwithfrank.github.io` repository (see "Upgrading the existing repository" below).
2. Commit and push to `main`.
3. In the repository go to **Settings → Pages** and make sure the source is **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. Wait a minute, then open https://ashwithfrank.github.io/.

All paths are relative (`css/style.css`, `js/main.js`), so the site also works from a sub-path such as `https://ashwithfrank.github.io/portfolio/`. If you ever move it to another address, update the three absolute URLs in the `<head>` of `index.html`: `canonical`, `og:url` and `og:image`.

### Upgrading the existing repository

The current repository has `index.html`, `style.css` and `script.js` at the root, a `projects/` folder, an `images/` folder and a `drive/` folder. To upgrade it without breaking anything:

1. **Replace** the root `index.html`.
2. **Add** the `css/`, `js/` and `assets/` folders and this `README.md`.
3. **Replace** the three files `projects/af-drive/index.html`, `projects/games-of-grid/index.html` and `projects/tower-of-hanoi/index.html`. They now point to `../legacy.css` and `../../assets/images/` instead of the old root `style.css` and `images/`. Add `projects/legacy.css` (it is the old `style.css`, renamed).
4. **Delete** the old root `style.css`, `script.js` and the `images/` folder. Nothing uses them any more.
5. **Leave `drive/` alone.** It has its own GitHub Actions workflow and does not depend on the files above.

## How the main features work

- **Theme.** A short inline script in `<head>` sets the theme before the page paints, so there is no flash. The first visit follows the system setting. After that, the choice is saved in `localStorage` (and the site still works if storage is blocked).
- **Mobile menu.** A button with `aria-expanded` and `aria-controls`. It closes on a link click, the Escape key, a click outside it, or when the window becomes wide.
- **Projects.** `main.js` builds the cards from `js/projects.js`. The site never calls the GitHub API, so it works offline and cannot be rate-limited. If `projects.js` fails to load, the section shows a link to your GitHub profile instead.
- **Motion.** Project cards fade in once as they scroll into view. Everything animated is switched off when the visitor prefers reduced motion.

## Browser support

Current Chrome, Edge, Firefox and Safari on desktop, Android and iOS. The page uses standard HTML5, CSS Grid, Flexbox and CSS custom properties, with no experimental features needed for layout.

## Checks and known limits

Automated browser checks (Chromium via Playwright) were run on this build for layout at several widths, theme and menu behaviour, link targets, and console errors. They were **not** run in Firefox or Safari, and not on real phones. Please open the live site on your own phone after deploying.

The "Live demo" field is empty for every project except Tower of Hanoi, because no other deployed demo URLs could be verified. Add them in `js/projects.js` once you have checked them.
