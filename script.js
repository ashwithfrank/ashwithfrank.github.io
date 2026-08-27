/* Init Lucide icons */
if (window.lucide) lucide.createIcons();

/* Mobile menu toggle */
const navEl = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navMobileDrawer = document.getElementById('navMobileDrawer');
const menuIcon = document.querySelector('.nav-toggle-icon-menu');
const closeIcon = document.querySelector('.nav-toggle-icon-close');

if (navToggle && navMobileDrawer) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navMobileDrawer.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        if (menuIcon && closeIcon) {
            menuIcon.style.display = isOpen ? 'none' : 'block';
            closeIcon.style.display = isOpen ? 'block' : 'none';
        }
    });

    document.querySelectorAll('.nav-mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            navMobileDrawer.classList.remove('open');
            navToggle.classList.remove('active');
            if (menuIcon && closeIcon) {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        });
    });

    document.addEventListener('click', (e) => {
        if (navMobileDrawer.classList.contains('open') && navEl && !navEl.contains(e.target)) {
            navMobileDrawer.classList.remove('open');
            navToggle.classList.remove('active');
            if (menuIcon && closeIcon) {
                menuIcon.style.display = 'block';
                closeIcon.style.display = 'none';
            }
        }
    });
}

/* Scroll reveal */
const revEls = document.querySelectorAll('.reveal');
if (revEls.length) {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => {
            if (e.isIntersecting) {
                setTimeout(() => e.target.classList.add('in'), (i % 4) * 70);
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.08 });
    revEls.forEach(el => obs.observe(el));
}

/* Hero terminal typewriter */
const termBody = document.getElementById('termBody');
if (termBody) {
    const script = [
        { type: 'cmd', text: 'whoami' },
        { type: 'out', text: 'Ashwith Frank — BCA student, builder, security enthusiast' },
        { type: 'cmd', text: 'cat interests.txt' },
        { type: 'out', text: '> Cybersecurity & ethical hacking\n> Unity game development\n> ESP32 / embedded hardware\n> Assembling a threat-research team' },
        { type: 'cmd', text: 'status --current' },
        { type: 'out', text: 'Studying BCA · shipping projects one at a time' }
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let started = false;

    function typeNext() {
        if (lineIndex >= script.length) {
            const cursorLine = document.createElement('div');
            cursorLine.className = 'term-line';
            cursorLine.innerHTML = '<span class="term-prompt">ash@frank:~$</span><span class="term-cursor"></span>';
            termBody.appendChild(cursorLine);
            return;
        }

        const step = script[lineIndex];

        if (step.type === 'cmd') {
            if (charIndex === 0) {
                const line = document.createElement('div');
                line.className = 'term-line';
                line.innerHTML = '<span class="term-prompt">ash@frank:~$</span><span class="term-cmd"></span>';
                termBody.appendChild(line);
            }
            const cmdSpan = termBody.lastElementChild.querySelector('.term-cmd');
            if (charIndex < step.text.length) {
                cmdSpan.textContent += step.text[charIndex];
                charIndex++;
                setTimeout(typeNext, 32);
            } else {
                charIndex = 0;
                lineIndex++;
                setTimeout(typeNext, 260);
            }
        } else {
            const out = document.createElement('div');
            out.className = 'term-output';
            out.textContent = step.text;
            termBody.appendChild(out);
            lineIndex++;
            setTimeout(typeNext, 420);
        }
    }

    const termObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting && !started) {
                started = true;
                setTimeout(typeNext, 400);
                termObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.3 });
    termObs.observe(termBody);
}
