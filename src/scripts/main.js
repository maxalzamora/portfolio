(function () {
    'use strict';

    const data = window.PORTFOLIO;
    if (!data) {
        console.error('Portfolio content not found. Check src/data/content.js');
        return;
    }

    /* ------------------------------------------------------------------
       Helpers
       ------------------------------------------------------------------ */
    const $ = (selector, root = document) => root.querySelector(selector);

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));

    const isExternal = (href) => /^https?:\/\//i.test(href || '');

    const ICONS = {
        github: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>`,
        external: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>`,
        email: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
        </svg>`,
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
        </svg>`,
        lock: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>`,
        star: `<svg class="icon-star" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>`,
        fork: `<svg class="icon-fork" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <line x1="6" y1="3" x2="6" y2="15"></line>
            <circle cx="18" cy="6" r="3"></circle>
            <circle cx="6" cy="18" r="3"></circle>
            <path d="M18 9a9 9 0 0 1-9 9"></path>
        </svg>`,
        send: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>`
    };

    /* ------------------------------------------------------------------
       Render: meta + navigation
       ------------------------------------------------------------------ */
    function setMeta(name, content, attr = 'name') {
        if (!content) return;
        let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
        if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute(attr, name);
            document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
    }

    function renderMeta() {
        const meta = data.meta || {};
        document.title = meta.title || data.identity.name;
        setMeta('description', meta.description);
        setMeta('keywords', meta.keywords);
        setMeta('author', meta.author);
        setMeta('theme-color', meta.themeColor);
    }

    function renderNav() {
        const logo = $('#navLogo');
        if (logo) {
            logo.innerHTML = `${escapeHtml(data.identity.logo)}<span class="logo-cursor">_</span>`;
        }

        const menu = $('#navMenu');
        if (!menu) return;

        const navItems = (data.nav || []).map((item) => `
            <li role="none">
                <a href="${escapeHtml(item.href)}" class="nav-link" role="menuitem">${escapeHtml(item.label)}</a>
            </li>
        `).join('');

        const themeTooltip = (data.theme && data.theme.initialTooltip) || '// Safety Protocol Active';

        menu.innerHTML = `${navItems}
            <li role="none">
                <div class="theme-wrapper">
                    <button id="themeToggle" class="theme-toggle" aria-label="Toggle Theme (Experimental)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                    </button>
                    <div id="themeTooltip" class="theme-tooltip">${escapeHtml(themeTooltip)}</div>
                </div>
            </li>
        `;
    }

    /* ------------------------------------------------------------------
       Render: hero
       ------------------------------------------------------------------ */
    function renderHero() {
        const hero = data.hero || {};
        const grid = $('#heroGrid');
        if (!grid) return;

        const buttons = (hero.buttons || []).map((button) => {
            const variant = button.style === 'primary' ? 'btn-primary' : 'btn-secondary';
            return `<a href="${escapeHtml(button.href)}" class="btn ${variant}">${escapeHtml(button.label)}</a>`;
        }).join('');

        const status = hero.status || { prompt: 'STATUS', value: 'OPEN TO WORK' };

        grid.innerHTML = `
            <div class="hero-text">
                <p class="hero-greeting anim-stagger" style="--i:0">${escapeHtml(hero.greeting)}</p>
                <h1 class="hero-title anim-stagger" style="--i:1" data-text="${escapeHtml(hero.name)}">${escapeHtml(hero.name)}</h1>
                <h2 class="hero-subtitle anim-stagger" style="--i:2">
                    <span class="typed-role"></span><span class="typed-cursor">|</span>
                </h2>
                <p class="hero-description anim-stagger" style="--i:3">${escapeHtml(hero.description)}</p>
                <div class="hero-buttons anim-stagger" style="--i:4">${buttons}</div>
            </div>
            <div class="hero-image-wrapper" style="--i:2">
                <div class="hero-image-container">
                    <div class="hero-image-ring"></div>
                    <div class="hero-image-ring ring-2"></div>
                    <div class="hero-image-ring ring-3"></div>
                    <img src="${escapeHtml(hero.image)}" alt="${escapeHtml(hero.imageAlt || hero.name)}" class="hero-image" loading="eager">
                    <div class="hero-image-glow"></div>
                </div>
                <div class="hero-image-dots"></div>
                <div class="hero-status-bar">
                    <span class="status-prompt">${escapeHtml(status.prompt)}</span>
                    <span class="status-colon">:</span>
                    <span class="status-value">${escapeHtml(status.value)}</span>
                    <span class="status-ellipsis"><span>.</span><span>.</span><span>.</span></span>
                    <span class="status-pipe">|</span>
                    <span class="status-time" id="heroStatusTime">00:00</span>
                </div>
            </div>
        `;
    }

    /* ------------------------------------------------------------------
       Render: about
       ------------------------------------------------------------------ */
    function renderAbout() {
        const about = data.about || {};
        const container = $('#aboutContainer');
        if (!container) return;

        container.innerHTML = `
            <h2 class="section-title" id="about-title"><span class="hacker-trigger">${escapeHtml(about.title)}</span></h2>
            <div class="about-content">
                <div class="about-text">
                    <div class="info-container">
                        ${(about.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join('')}
                    </div>
                </div>
                <div class="about-image">
                    <div class="terminal-window">
                        <div class="terminal-header">
                            <span class="terminal-btn close"></span>
                            <span class="terminal-btn minimize"></span>
                            <span class="terminal-btn maximize"></span>
                            <span class="terminal-title">${escapeHtml(about.terminalTitle || 'terminal.sh')}</span>
                        </div>
                        <div class="terminal-body" id="aboutTerminalBody"></div>
                    </div>
                </div>
            </div>
        `;
    }

    /* ------------------------------------------------------------------
       Render: skills
       ------------------------------------------------------------------ */
    function renderSkills() {
        const skills = data.skills || {};
        const container = $('#skillsContainer');
        if (!container) return;

        const categories = (skills.categories || []).map((category) => `
            <div class="skill-category">
                <div class="category-header">
                    <h3 class="skill-category-title">${escapeHtml(category.title)}</h3>
                </div>
                <div class="skill-tags">
                    ${(category.items || []).map((item) => `<span class="skill-tag">${escapeHtml(item)}</span>`).join('')}
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <h2 class="section-title" id="skills-title"><span class="hacker-trigger">${escapeHtml(skills.title)}</span></h2>
            <div class="skills-grid">${categories}</div>
        `;
    }

    /* ------------------------------------------------------------------
       Render: projects
       ------------------------------------------------------------------ */
    function projectCard(project) {
        const image = project.image
            ? `<div class="project-image" role="button" tabindex="0" aria-label="View ${escapeHtml(project.name)} screenshot"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt || project.name)}" loading="lazy"></div>`
            : '';

        const stats = project.showStats
            ? `<span class="status-tag stats" data-repo="${escapeHtml(project.statsRepo || '')}">
                    ${ICONS.star}
                    <span class="star-count">-</span>
                    ${ICONS.fork}
                    <span class="fork-count">-</span>
               </span>`
            : '';

        const links = [
            project.repo
                ? `<a href="${escapeHtml(project.repo)}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">${ICONS.github}GitHub</a>`
                : '',
            project.live
                ? `<a href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo"><span class="live-dot" aria-hidden="true"></span>${ICONS.external}Live Demo</a>`
                : '',
            project.private
                ? `<span class="private-badge" title="Private repository">${ICONS.lock}<span>Private</span></span>`
                : ''
        ].filter(Boolean).join('');

        return `
            <article class="project-card${project.featured ? ' featured' : ''}" data-repo="${escapeHtml(project.statsRepo || '')}">
                <div class="project-content">
                    ${image}
                    <div class="project-header">
                        <div class="project-main-header">
                            <div class="project-title-row">
                                <h3 class="project-title">${escapeHtml(project.name)}</h3>
                                ${stats}
                            </div>
                            ${links ? `<div class="project-links">${links}</div>` : ''}
                        </div>
                    </div>
                    <p class="project-description">${project.description || ''}</p>
                    <div class="project-tech">
                        ${(project.tech || []).map((tech) => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')}
                    </div>
                </div>
            </article>
        `;
    }

    function renderProjects() {
        const projects = data.projects || {};
        const container = $('#projectsContainer');
        if (!container) return;

        const categories = (projects.categories || []).map((category) => `
            <div class="project-category">
                <h3 class="category-title">${escapeHtml(category.title)}</h3>
                <div class="projects-grid">
                    ${(category.projects || []).map(projectCard).join('')}
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <h2 class="section-title" id="projects-title"><span class="hacker-trigger">${escapeHtml(projects.title)}</span></h2>
            ${categories}
        `;
    }

    /* ------------------------------------------------------------------
       Render: contact + footer
       ------------------------------------------------------------------ */
    function renderContact() {
        const contact = data.contact || {};
        const form = contact.form || {};
        const container = $('#contactContainer');
        if (!container) return;

        const emailLink = (contact.links || []).find((link) => link.icon === 'email');
        const emailAddress = emailLink ? (emailLink.href || '').replace(/^mailto:/i, '') : '';
        const formAction = form.action || '';

        const links = (contact.links || []).map((link) => {
            const external = isExternal(link.href);
            return `<a href="${escapeHtml(link.href)}" class="contact-btn"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                ${ICONS[link.icon] || ''}
                ${escapeHtml(link.label)}
            </a>`;
        }).join('');

        container.innerHTML = `
            <h2 class="section-title" id="contact-title"><span class="hacker-trigger">${escapeHtml(contact.title)}</span></h2>
            <div class="contact-content">
                <form id="contactForm" class="contact-form" action="${escapeHtml(formAction)}" method="POST"${formAction ? '' : ` data-mailto="${escapeHtml(emailAddress)}"`}>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="name">Full Name</label>
                            <input type="text" id="name" name="name" class="form-control" placeholder="Ada Lovelace" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" class="form-control" placeholder="ada@example.com" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" class="form-control" placeholder="Junior backend role" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" class="form-control" rows="5" placeholder="Tell me about the role or project..." required></textarea>
                    </div>
                    <button type="submit" id="submitBtn" class="contact-btn submit-btn">
                        ${ICONS.send}
                        <span class="btn-text">${escapeHtml(form.submitLabel || 'Send Message')}</span>
                    </button>
                    <div id="formStatus" class="status-message" role="status" aria-live="polite"></div>
                </form>
                <div class="contact-links">${links}</div>
            </div>
        `;
    }

    function renderFooter() {
        const footer = data.footer || {};
        const container = $('#footerContainer');
        if (!container) return;

        container.innerHTML = `
            <p>
                ${escapeHtml(footer.copyright || '')}
                <br>
                ${escapeHtml(footer.location || '')}${footer.location && footer.handle ? ' · ' : ''}${escapeHtml(footer.handle || '')}
                ${footer.tagline ? `<br><span class="footer-tagline">${escapeHtml(footer.tagline)}</span>` : ''}
            </p>
        `;
    }

    renderMeta();
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderContact();
    renderFooter();

    /* ------------------------------------------------------------------
       Page initialization (Matrix -> Glitch Reveal)
       ------------------------------------------------------------------ */
    const glitchOverlay = document.getElementById('glitchOverlay');

    if (glitchOverlay) {
        setTimeout(() => {
            glitchOverlay.classList.add('glitch-flash');

            setTimeout(() => {
                document.body.classList.remove('loading');

                setTimeout(() => {
                    glitchOverlay.style.display = 'none';
                }, 1000);
            }, 300);
        }, 100);
    } else {
        document.body.classList.remove('loading');
    }

    /* ------------------------------------------------------------------
       Navigation
       ------------------------------------------------------------------ */
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /* ------------------------------------------------------------------
       Hacker text effect
       ------------------------------------------------------------------ */
    class HackerText {
        constructor(el) {
            this.el = el;
            this.originalText = el.innerText;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }

        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => (this.resolve = resolve));
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }

        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }

        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const hacker = new HackerText(heroTitle);
        let isGlitching = false;

        function triggerVisualGlitch() {
            if (isGlitching) return;
            isGlitching = true;

            heroTitle.classList.add('glitch-active');

            setTimeout(() => {
                heroTitle.classList.remove('glitch-active');
                isGlitching = false;
            }, 200 + Math.random() * 200);
        }

        function triggerDecipher() {
            if (isGlitching) return;
            isGlitching = true;

            heroTitle.classList.add('glitch-active');
            hacker.setText(heroTitle.getAttribute('data-text') || heroTitle.innerText);

            setTimeout(() => {
                heroTitle.classList.remove('glitch-active');
                isGlitching = false;
            }, 500);
        }

        function scheduleBurst() {
            const delay = 2500 + Math.random() * 5500;
            setTimeout(() => {
                if (!document.hidden) {
                    if (Math.random() < 0.5) {
                        triggerDecipher();
                    } else {
                        triggerVisualGlitch();
                    }
                }
                scheduleBurst();
            }, delay);
        }

        setTimeout(() => {
            hacker.setText(heroTitle.getAttribute('data-text') || heroTitle.innerText);
            setTimeout(scheduleBurst, 3000);
        }, 1200);
    }

    /* ------------------------------------------------------------------
       Section title hacker effect
       ------------------------------------------------------------------ */
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const trigger = entry.target.querySelector('.hacker-trigger');
                    if (trigger) {
                        const hacker = new HackerText(trigger);
                        hacker.setText(trigger.innerText);
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sectionTitles.forEach((title) => observer.observe(title));
    }

    /* ------------------------------------------------------------------
       Hero typing effect
       ------------------------------------------------------------------ */
    const typedRoleElement = document.querySelector('.typed-role');
    const roles = (data.hero && data.hero.roles) || [];

    if (typedRoleElement && roles.length) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingDelay = 100;
        let typingTimerId = null;
        let heroVisible = true;

        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const typingObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    heroVisible = entry.isIntersecting;
                    if (heroVisible && !typingTimerId) {
                        typingTimerId = setTimeout(typeRole, typingDelay);
                    }
                });
            }, { threshold: 0 });
            typingObserver.observe(heroSection);
        }

        function typeRole() {
            typingTimerId = null;
            if (!heroVisible || document.hidden) {
                return;
            }

            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedRoleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingDelay = 50;
            } else {
                typedRoleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingDelay = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typingDelay = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingDelay = 500;
            }

            typingTimerId = setTimeout(typeRole, typingDelay);
        }

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && heroVisible && !typingTimerId) {
                typingTimerId = setTimeout(typeRole, typingDelay);
            }
        });

        typingTimerId = setTimeout(typeRole, 2000);
    }

    /* ------------------------------------------------------------------
       About terminal animation
       ------------------------------------------------------------------ */
    const terminalLines = (data.about && data.about.terminalLines) || [];
    const terminalBody = document.getElementById('aboutTerminalBody');

    if (terminalBody && terminalLines.length) {
        let lineIndex = 0;
        let terminalCycles = 0;
        let terminalTimer = null;
        let terminalVisible = false;
        let terminalFinished = false;
        const MAX_TERMINAL_CYCLES = 2;

        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                terminalVisible = entry.isIntersecting;
                if (terminalVisible && !terminalTimer && !terminalFinished) {
                    terminalTimer = setTimeout(addTerminalLine, 250);
                }
            });
        }, { threshold: 0.1 });
        terminalObserver.observe(terminalBody);

        function addTerminalLine() {
            terminalTimer = null;

            if (!terminalVisible) {
                return;
            }

            if (lineIndex >= terminalLines.length) {
                terminalCycles++;
                if (terminalCycles >= MAX_TERMINAL_CYCLES) {
                    terminalFinished = true;
                    return;
                }
                lineIndex = 0;
                terminalTimer = setTimeout(() => {
                    terminalBody.innerHTML = '';
                    terminalTimer = setTimeout(addTerminalLine, 500);
                }, 4000);
                return;
            }

            const line = terminalLines[lineIndex];
            const div = document.createElement('div');
            div.className = 'line';
            div.style.animationDelay = '0s';

            if (line.type === 'command') {
                div.innerHTML = `<span class="prompt">~$</span> <span class="command">${escapeHtml(line.text)}</span>`;
            } else {
                div.innerHTML = `<span class="output">${escapeHtml(line.text)}</span>`;
            }

            terminalBody.appendChild(div);

            const activeCursor = terminalBody.querySelector('.cursor') || document.createElement('span');
            if (!activeCursor.parentElement) {
                activeCursor.className = 'cursor';
            }
            div.appendChild(activeCursor);

            const threshold = 60;
            const isAtBottom = terminalBody.scrollHeight - terminalBody.scrollTop - terminalBody.clientHeight < threshold;

            if (isAtBottom) {
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }

            lineIndex++;
            const delay = line.type === 'command' ? 1200 : (Math.random() * 300 + 100);
            terminalTimer = setTimeout(addTerminalLine, delay);
        }
    }

    /* ------------------------------------------------------------------
       Theme toggle easter egg
       ------------------------------------------------------------------ */
    let typewriterTimer = null;
    function typeLines(el, lines, cb) {
        if (typewriterTimer) {
            clearInterval(typewriterTimer);
            typewriterTimer = null;
        }
        el.innerHTML = '';
        el.classList.add('visible');
        let lineIdx = 0;
        let charIdx = 0;

        function typeLine() {
            if (lineIdx >= lines.length) {
                if (cb) setTimeout(cb, 3000);
                return;
            }
            const line = lines[lineIdx];
            let html = '';
            for (let i = 0; i < lineIdx; i++) {
                html += lines[i] + '<br>';
            }
            html += line.substring(0, charIdx + 1) + '<span class="terminal-cursor">█</span>';
            el.innerHTML = html;

            charIdx++;
            if (charIdx < line.length) {
                typewriterTimer = setTimeout(typeLine, 20 + Math.random() * 15);
            } else {
                lineIdx++;
                charIdx = 0;
                typewriterTimer = setTimeout(typeLine, 350 + Math.random() * 200);
            }
        }

        typeLine();
    }

    setTimeout(() => {
        const tt = document.getElementById('themeTooltip');
        if (tt) {
            typeLines(tt, [
                '> unknown entity detected',
                '> interact? [Y/n] >_'
            ], () => tt.classList.remove('visible'));
        }
    }, 2800);

    const themeToggle = document.getElementById('themeToggle');
    const themeTooltip = document.getElementById('themeTooltip');
    if (themeToggle && themeTooltip) {
        const darkMessages = (data.theme && data.theme.messages && data.theme.messages.length)
            ? data.theme.messages
            : ['// Safety Protocol Active'];

        let lastMsgIndex = -1;

        const getRandomMessage = () => {
            let randomIdx;
            do {
                randomIdx = Math.floor(Math.random() * darkMessages.length);
            } while (darkMessages.length > 1 && randomIdx === lastMsgIndex);
            lastMsgIndex = randomIdx;
            return darkMessages[randomIdx];
        };

        themeToggle.addEventListener('mouseenter', () => {
            themeTooltip.textContent = getRandomMessage();
        });

        themeToggle.addEventListener('click', () => {
            themeToggle.classList.add('toggle-glitch');
            setTimeout(() => themeToggle.classList.remove('toggle-glitch'), 400);

            const msg = getRandomMessage();
            typeLines(themeTooltip, [
                '> breach detected',
                msg
            ], () => {
                themeTooltip.classList.remove('visible');
            });
        });
    }

    /* ------------------------------------------------------------------
       Contact form
       ------------------------------------------------------------------ */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;

    if (contactForm && formStatus && submitBtn && btnText) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            submitBtn.classList.add('loading');
            const originalText = btnText.textContent;
            btnText.textContent = '>> SENDING...';
            formStatus.className = 'status-message';
            formStatus.style.display = 'none';
            formStatus.innerHTML = '';

            const formData = new FormData(contactForm);
            const mailtoAddress = contactForm.getAttribute('data-mailto');
            const formAction = contactForm.getAttribute('action');

            if (!formAction && !mailtoAddress) {
                formStatus.textContent = '>> ERROR: NO CONTACT METHOD CONFIGURED.';
                formStatus.style.display = 'block';
                formStatus.classList.add('error');
                btnText.textContent = originalText;
                submitBtn.classList.remove('loading');
                return;
            }

            // No backend configured: open the visitor's email app with the
            // message prefilled. This keeps the form useful on GitHub Pages.
            if (!formAction && mailtoAddress) {
                const subject = formData.get('subject') || 'Portfolio enquiry';
                const name = formData.get('name') || '';
                const email = formData.get('email') || '';
                const message = formData.get('message') || '';
                const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
                const mailto = `mailto:${mailtoAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                await new Promise((resolve) => setTimeout(resolve, 500));

                formStatus.innerHTML = '>> OPENING YOUR EMAIL APP...';
                formStatus.style.display = 'block';
                formStatus.classList.add('success');
                btnText.textContent = '>> OPEN EMAIL';
                window.location.href = mailto;

                setTimeout(() => {
                    btnText.textContent = originalText;
                    submitBtn.classList.remove('loading');
                    formStatus.classList.remove('success');
                    formStatus.style.display = 'none';
                }, 5000);
                return;
            }

            await new Promise((resolve) => setTimeout(resolve, 800));

            try {
                const response = await fetch(formAction, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    const successIcon = `
                        <span class="success-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                <polyline points="9 11 12 14 15 9"></polyline>
                            </svg>
                        </span>
                    `;

                    formStatus.innerHTML = `${successIcon} >> MESSAGE SENT SUCCESSFULLY.`;
                    formStatus.style.display = 'block';
                    formStatus.classList.add('success');
                    contactForm.reset();
                    btnText.textContent = '>> SENT';

                    setTimeout(() => {
                        btnText.textContent = originalText;
                        submitBtn.classList.remove('loading');
                        formStatus.classList.remove('success');
                        formStatus.style.display = 'none';
                    }, 5000);
                } else {
                    const responseData = await response.json();
                    if (Object.hasOwn(responseData, 'errors')) {
                        formStatus.textContent = '>> ERROR: ' + responseData.errors.map((error) => error.message).join(', ');
                    } else {
                        formStatus.textContent = '>> ERROR: FAILED TO SEND. PLEASE TRY AGAIN LATER.';
                    }
                    formStatus.style.display = 'block';
                    formStatus.classList.add('error');
                    btnText.textContent = originalText;
                    submitBtn.classList.remove('loading');
                }
            } catch (error) {
                formStatus.textContent = '>> ERROR: CONNECTION FAILED. PLEASE CHECK YOUR INTERNET.';
                formStatus.style.display = 'block';
                formStatus.classList.add('error');
                btnText.textContent = originalText;
                submitBtn.classList.remove('loading');
            }
        });
    }

    /* ------------------------------------------------------------------
       Small UI details
       ------------------------------------------------------------------ */
    const statusTime = document.getElementById('heroStatusTime');
    if (statusTime) {
        function updateStatusTime() {
            const now = new Date();
            statusTime.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
        }
        updateStatusTime();
        setInterval(updateStatusTime, 10000);
    }

    const progress = document.getElementById('scrollProgress');
    if (progress) {
        window.addEventListener('scroll', () => {
            const val = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            progress.style.transform = `scaleX(${val})`;
        }, { passive: true });
    }

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ------------------------------------------------------------------
       GitHub live star & fork counts (opt-in via showStats)
       ------------------------------------------------------------------ */
    const GH_CACHE_KEY = 'gh-stats';
    const GH_CACHE_TTL = 21600000; // 6 hours

    function getFreshCache() {
        try {
            const raw = localStorage.getItem(GH_CACHE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (Date.now() - parsed.timestamp < GH_CACHE_TTL) return parsed.data;
            return null;
        } catch { return null; }
    }

    function getStaleCache() {
        try {
            const raw = localStorage.getItem(GH_CACHE_KEY);
            return raw ? JSON.parse(raw).data : null;
        } catch { return null; }
    }

    function setCachedStats(stats) {
        try {
            localStorage.setItem(GH_CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: stats
            }));
        } catch { /* storage may be unavailable */ }
    }

    function applyStats(stats) {
        const badges = document.querySelectorAll('.status-tag.stats');
        badges.forEach((badge) => {
            const repo = badge.getAttribute('data-repo');
            const info = stats[repo];
            if (!info) return;
            const star = badge.querySelector('.star-count');
            const fork = badge.querySelector('.fork-count');
            if (star) star.textContent = info.stargazers_count ?? info.stars;
            if (fork) fork.textContent = info.forks_count ?? info.forks;
        });
    }

    async function fetchGitHubStats() {
        const badges = document.querySelectorAll('.status-tag.stats');
        if (!badges.length) return;

        const fresh = getFreshCache();
        if (fresh) {
            applyStats(fresh);
            return;
        }

        const stale = getStaleCache();
        if (stale) applyStats(stale);

        const repos = [...new Set(Array.from(badges).map((badge) => badge.getAttribute('data-repo')).filter(Boolean))];
        const GH_BATCH_SIZE = 6;
        const stats = {};

        for (let i = 0; i < repos.length; i += GH_BATCH_SIZE) {
            const batch = repos.slice(i, i + GH_BATCH_SIZE);
            const results = await Promise.allSettled(
                batch.map((repo) =>
                    fetch(`https://api.github.com/repos/${repo}`)
                        .then((response) => response.ok ? response.json() : Promise.reject(response.status))
                )
            );

            let succeeded = 0;
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    stats[batch[index]] = result.value;
                    succeeded++;
                }
            });

            if (succeeded === 0) break;
        }

        if (Object.keys(stats).length) {
            setCachedStats(stats);
            applyStats(stats);
        }
    }

    fetchGitHubStats();

    /* ------------------------------------------------------------------
       Scroll-triggered reveal + lightbox
       ------------------------------------------------------------------ */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card, .skill-category').forEach((el) => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });

    const lightbox = document.getElementById('imageLightbox');
    if (lightbox) {
        const lightboxImg = lightbox.querySelector('img');
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        const lightboxClose = lightbox.querySelector('.lightbox-close');

        const openLightbox = (container) => {
            const img = container.querySelector('img');
            if (!img) return;
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            if (lightboxCaption) {
                lightboxCaption.textContent = '';
            }
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        document.querySelectorAll('.project-image').forEach((container) => {
            container.addEventListener('click', () => openLightbox(container));
            container.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(container);
                }
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-backdrop')) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
})();
