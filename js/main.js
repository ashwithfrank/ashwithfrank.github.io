/*
 * main.js — interactions for the portfolio.
 *   1. Footer year
 *   2. Theme toggle (dark / light, remembered, follows the system on first visit)
 *   3. Mobile menu
 *   4. Active navigation link while scrolling
 *   5. Project cards, built from js/projects.js
 *   6. Hero repository panel
 *   7. Card reveal on scroll
 * Everything is plain JavaScript. Nothing here needs the network.
 */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;

  /* ---------- helpers ---------- */
  var SVG_NS = 'http://www.w3.org/2000/svg';

  function el(tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Draw an icon from the sprite in index.html (<symbol id="...">).
  function icon(id, className) {
    var svg = doc.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', className || 'icon');
    svg.setAttribute('aria-hidden', 'true');
    var use = doc.createElementNS(SVG_NS, 'use');
    use.setAttribute('href', '#' + id);
    svg.appendChild(use);
    return svg;
  }

  function isExternal(url) {
    return /^https?:\/\//i.test(url);
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage blocked: ignore */ }
  }

  /* ---------- 1. Footer year ---------- */
  var yearEl = doc.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- 2. Theme toggle ---------- */
  var themeBtn = doc.getElementById('theme-toggle');
  var themeMeta = doc.querySelector('meta[name="theme-color"]');
  var THEME_COLORS = { dark: '#0e0f11', light: '#f7f7f5' };

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme]);
    if (themeBtn) {
      themeBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    }
  }

  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      safeSet('theme', next);
    });
  }

  // Follow the operating system only until the visitor makes their own choice.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    var onSystemChange = function (e) {
      if (!safeGet('theme')) applyTheme(e.matches ? 'light' : 'dark');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  /* ---------- 3. Mobile menu ---------- */
  var menuBtn = doc.getElementById('menu-toggle');
  var nav = doc.getElementById('site-nav');

  function setMenu(open, returnFocus) {
    if (!menuBtn || !nav) return;
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
    if (!open && returnFocus) menuBtn.focus();
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') setMenu(false, true);
    });

    doc.addEventListener('click', function (e) {
      if (menuBtn.getAttribute('aria-expanded') === 'true' && !nav.contains(e.target) && !menuBtn.contains(e.target)) {
        setMenu(false);
      }
    });

    // If the window grows to desktop width, reset the menu state.
    if (window.matchMedia) {
      var desktop = window.matchMedia('(min-width: 47.5rem)');
      var onResize = function (e) { if (e.matches) setMenu(false); };
      if (desktop.addEventListener) desktop.addEventListener('change', onResize);
      else if (desktop.addListener) desktop.addListener(onResize);
    }
  }

  /* ---------- 4. Active navigation link ---------- */
  var navLinks = Array.prototype.slice.call(doc.querySelectorAll('.site-nav a[href^="#"]'));
  var sectionMap = {};
  navLinks.forEach(function (link) {
    var target = doc.getElementById(link.getAttribute('href').slice(1));
    if (target) sectionMap[target.id] = link;
  });

  function setActive(id) {
    navLinks.forEach(function (link) {
      if (sectionMap[id] === link) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(sectionMap).forEach(function (id) { spy.observe(doc.getElementById(id)); });

    // "Currently exploring" has no nav link, so keep the Skills/Projects highlight sensible.
    var exploring = doc.getElementById('exploring');
    if (exploring) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) setActive('projects');
      }, { rootMargin: '-40% 0px -55% 0px' }).observe(exploring);
    }
  }

  /* ---------- 5. Project cards ---------- */
  var grid = doc.getElementById('project-grid');
  var moreWrap = doc.getElementById('projects-more');
  var moreBtn = doc.getElementById('projects-toggle');
  var projects = Array.isArray(window.PROJECTS) ? window.PROJECTS.slice() : [];

  function linkEl(label, url, iconId) {
    var a = el('a', 'card-link');
    a.href = url;
    a.appendChild(doc.createTextNode(label));
    if (isExternal(url)) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.appendChild(el('span', 'sr-only', ' (opens in new tab)'));
    }
    if (iconId) a.insertBefore(icon(iconId), a.firstChild);
    return a;
  }

  function buildCard(p) {
    var card = el('article', 'card reveal');
    card.id = 'project-' + p.id;

    var top = el('div', 'card-top');
    var iconBox = el('div', 'card-icon');
    iconBox.appendChild(icon('p-' + (p.icon || 'code')));
    var status = el('span', 'status', p.status || 'In development');
    status.setAttribute('data-status', p.status || 'In development');
    top.appendChild(iconBox);
    top.appendChild(status);
    card.appendChild(top);

    card.appendChild(el('h3', null, p.name));
    card.appendChild(el('p', 'card-summary', p.summary));

    if (p.tags && p.tags.length) {
      var tags = el('ul', 'chips');
      tags.setAttribute('aria-label', 'Technologies');
      p.tags.forEach(function (t) { tags.appendChild(el('li', null, t)); });
      card.appendChild(tags);
    }

    var actions = el('div', 'card-actions');
    if (p.github) actions.appendChild(linkEl('GitHub', p.github, 'i-github'));
    if (p.demo) actions.appendChild(linkEl('Live demo', p.demo, 'i-arrow'));
    (p.links || []).forEach(function (l) {
      if (l && l.url && l.label) actions.appendChild(linkEl(l.label, l.url, isExternal(l.url) ? 'i-arrow' : null));
    });
    if (!p.github) actions.appendChild(el('span', 'card-note', 'Source is not public'));
    card.appendChild(actions);

    return card;
  }

  function renderEmpty() {
    var box = el('div', 'empty');
    box.appendChild(doc.createTextNode('Project details could not be loaded. You can browse everything on '));
    var a = el('a', null, 'my GitHub profile');
    a.href = 'https://github.com/ashwithfrank/';
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    box.appendChild(a);
    box.appendChild(doc.createTextNode('.'));
    grid.appendChild(box);
  }

  // Featured projects first, otherwise keep the order written in projects.js.
  var ordered = projects.filter(function (p) { return p.featured; })
    .concat(projects.filter(function (p) { return !p.featured; }));

  if (grid) {
    // Remove the <noscript> fallback's sibling space and render.
    if (!ordered.length) {
      renderEmpty();
    } else {
      var extraCards = [];
      ordered.forEach(function (p) {
        var card = buildCard(p);
        if (!p.featured) { card.hidden = true; extraCards.push(card); }
        grid.appendChild(card);
      });

      if (extraCards.length && moreWrap && moreBtn) {
        var collapsedLabel = 'Show all ' + ordered.length + ' projects';
        moreBtn.textContent = collapsedLabel;
        moreWrap.hidden = false;
        moreBtn.addEventListener('click', function () {
          var expand = moreBtn.getAttribute('aria-expanded') !== 'true';
          extraCards.forEach(function (c) { c.hidden = !expand; });
          moreBtn.setAttribute('aria-expanded', String(expand));
          moreBtn.textContent = expand ? 'Show fewer projects' : collapsedLabel;
          if (expand) observeCards(extraCards);
        });
        // If someone opens a link to a hidden project (#project-xyz), reveal it.
        var revealHash = function () {
          var id = location.hash.slice(1);
          var hit = extraCards.filter(function (c) { return c.id === id; })[0];
          if (hit && hit.hidden) {
            extraCards.forEach(function (c) { c.hidden = false; });
            moreBtn.setAttribute('aria-expanded', 'true');
            moreBtn.textContent = 'Show fewer projects';
            observeCards(extraCards);
            hit.scrollIntoView();
          }
        };
        window.addEventListener('hashchange', revealHash);
        revealHash();
      }
    }
  }

  /* ---------- 6. Hero repository panel ---------- */
  var panel = doc.getElementById('repo-panel');
  var list = doc.getElementById('repo-list');
  var foot = doc.getElementById('repo-panel-foot');

  if (panel && list && ordered.length) {
    ordered.slice(0, 5).forEach(function (p) {
      var li = el('li');
      var a = el('a');
      a.href = '#project-' + p.id;
      a.appendChild(el('span', 'repo-name', p.name));
      a.appendChild(el('span', 'repo-meta', (p.tags && p.tags[0]) || ''));
      var st = el('span', 'status repo-status', p.status);
      st.setAttribute('data-status', p.status);
      a.appendChild(st);
      li.appendChild(a);
      list.appendChild(li);
    });
    if (foot) foot.textContent = 'Selected projects, ' + ordered.length + ' in total.';
    panel.hidden = false;
  }

  /* ---------- 7. Card reveal ---------- */
  var cardObserver = null;
  if ('IntersectionObserver' in window) {
    cardObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  }

  function observeCards(cards) {
    cards.forEach(function (c) {
      if (cardObserver) cardObserver.observe(c);
      else c.classList.add('is-visible');
    });
  }

  if (grid) {
    observeCards(Array.prototype.slice.call(grid.querySelectorAll('.card:not([hidden])')));
  }
})();
