(function () {
    'use strict';

    document.documentElement.classList.add('js');

    const I18N = window.PORTFOLIO_LANGUAGES || { en: window.PORTFOLIO };
    const DEFAULT_LANGUAGE = 'en';
    const LANGUAGE_STORAGE = 'portfolio-language';
    const hasLanguage = (language) => Object.prototype.hasOwnProperty.call(I18N, language);

    function getStoredLanguage() {
        try {
            const saved = localStorage.getItem(LANGUAGE_STORAGE);
            return hasLanguage(saved) ? saved : DEFAULT_LANGUAGE;
        } catch (error) {
            return DEFAULT_LANGUAGE;
        }
    }

    let currentLanguage = getStoredLanguage();
    let data = I18N[currentLanguage] || I18N[DEFAULT_LANGUAGE];
    if (!data) {
        console.error('Portfolio content not found. Check src/data/content.js');
        return;
    }

    /* ------------------------------------------------------------------
       Helpers
       ------------------------------------------------------------------ */
    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));

    const isExternal = (href) => /^https?:\/\//i.test(href || '');

    const ICONS = {
        github: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>`,
        external: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <path d="M15 3h6v6M10 14 21 3"></path>
        </svg>`,
        email: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="14" rx="2"></rect>
            <path d="m3 7 9 6 9-6"></path>
        </svg>`,
        linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
        </svg>`,
        lock: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>`,
        arrow: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6"></path>
        </svg>`,
        arrowUpRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M7 7h10v10"></path>
        </svg>`,
        send: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m22 2-7 20-4-9-9-4Z"></path>
            <path d="M22 2 11 13"></path>
        </svg>`,
        star: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
        </svg>`,
        fork: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="6" cy="6" r="2.5"></circle>
            <circle cx="18" cy="6" r="2.5"></circle>
            <circle cx="12" cy="18" r="2.5"></circle>
            <path d="M6 8.5v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2M12 14.5v1"></path>
        </svg>`
    };

    /* ------------------------------------------------------------------
       Meta, header and navigation
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
        setMeta('og:title', meta.title, 'property');
        setMeta('og:description', meta.description, 'property');
        setMeta('og:locale', meta.locale, 'property');
        setMeta('og:url', meta.url, 'property');
        setMeta('og:image', meta.ogImage, 'property');
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', meta.title);
        setMeta('twitter:description', meta.description);
        setMeta('twitter:image', meta.ogImage);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical && meta.url) canonical.setAttribute('href', meta.url);
    }

    function renderStaticText() {
        const ui = data.ui || {};
        const skip = $('#skipLink');
        const nav = $('#siteNav');
        const ctaLabel = $('#headerCtaLabel');
        const languageLabel = $('#languageLabel');
        const navToggle = $('#navToggle');

        if (skip) skip.textContent = ui.skipToContent || 'Skip to content';
        if (nav) nav.setAttribute('aria-label', ui.mainNavigation || 'Main navigation');
        if (ctaLabel) ctaLabel.textContent = ui.headerCta || "Let's talk";
        if (languageLabel) languageLabel.textContent = ui.language || 'Language';

        if (navToggle) {
            const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-label', isOpen
                ? (ui.closeMenu || 'Close menu')
                : (ui.openMenu || 'Open menu'));
        }
    }

    function renderAll() {
        renderMeta();
        renderStaticText();
        renderHeader();
        renderHero();
        renderAbout();
        renderSkills();
        renderProjects();
        renderContact();
        renderFooter();
        updateThemeColor();
        syncThemeToggle();
        initReveal();
        initContactForm();
        fetchGitHubStats();
    }

    function setLanguage(language, options = {}) {
        const { persist = true } = options;
        const next = hasLanguage(language) ? language : DEFAULT_LANGUAGE;

        currentLanguage = next;
        data = I18N[next] || I18N[DEFAULT_LANGUAGE];
        root.lang = next;
        if (persist) writeStorage(LANGUAGE_STORAGE, next);

        const select = $('#languageSelect');
        if (select) select.value = next;

        renderAll();
    }

    function initLanguage() {
        const select = $('#languageSelect');
        if (!select) return;

        select.value = currentLanguage;
        select.addEventListener('change', () => setLanguage(select.value));
    }

    function renderHeader() {
        const identity = data.identity || {};
        const brandMark = $('#brandMark');
        const brandName = $('#brandName');
        const brandRole = $('#brandRole');
        const brand = $('#brand');

        if (brandMark) brandMark.textContent = identity.initials || 'MA';
        if (brandName) brandName.textContent = identity.name || '';
        if (brandRole) brandRole.textContent = identity.role || '';
        if (brand) brand.setAttribute('aria-label', `${identity.name || 'Home'} — ${data.ui?.home || 'home'}`);

        const nav = $('#siteNav');
        if (nav) {
            nav.innerHTML = (data.nav || []).map((item) => `
                <a class="nav-link" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
            `).join('');
        }
    }

    /* ------------------------------------------------------------------
       Theme and accent
       ------------------------------------------------------------------ */
    const root = document.documentElement;

    const THEME_STORAGE = 'portfolio-theme';

    const designState = {
        theme: 'light',
        accent: ''
    };

    function writeStorage(key, value) {
        try {
            if (value) {
                localStorage.setItem(key, value);
            } else {
                localStorage.removeItem(key);
            }
        } catch (error) {
            /* Storage can be unavailable in private mode. */
        }
    }

    function normalizeHex(value) {
        if (!value) return '';
        const input = String(value).trim().toLowerCase();

        if (/^#[0-9a-f]{6}$/.test(input)) return input;
        if (/^#[0-9a-f]{3}$/.test(input)) {
            return `#${input.slice(1).split('').map((char) => char + char).join('')}`;
        }

        const match = input.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
        if (match) {
            return rgbToHex({ r: Number(match[1]), g: Number(match[2]), b: Number(match[3]) });
        }

        return '';
    }

    function rgbToHex({ r, g, b }) {
        const channel = (value) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0');
        return `#${channel(r)}${channel(g)}${channel(b)}`;
    }

    function hexToRgb(hex) {
        const normalized = normalizeHex(hex) || '#000000';
        return {
            r: parseInt(normalized.slice(1, 3), 16),
            g: parseInt(normalized.slice(3, 5), 16),
            b: parseInt(normalized.slice(5, 7), 16)
        };
    }

    function mixHex(colorA, colorB, weightA) {
        const a = hexToRgb(colorA);
        const b = hexToRgb(colorB);
        const weight = Math.max(0, Math.min(1, weightA));
        return rgbToHex({
            r: a.r * weight + b.r * (1 - weight),
            g: a.g * weight + b.g * (1 - weight),
            b: a.b * weight + b.b * (1 - weight)
        });
    }

    function relativeLuminance({ r, g, b }) {
        const channel = (value) => {
            const normalized = value / 255;
            return normalized <= 0.03928
                ? normalized / 12.92
                : Math.pow((normalized + 0.055) / 1.055, 2.4);
        };
        return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    }

    function contrastRatio(colorA, colorB) {
        const a = relativeLuminance(colorA);
        const b = relativeLuminance(colorB);
        return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    }

    function bestInk(color) {
        const light = hexToRgb('#fffdf8');
        const dark = hexToRgb('#071411');
        return contrastRatio(color, light) >= contrastRatio(color, dark) ? '#fffdf8' : '#071411';
    }

    function ensureContrast(color, background, minimum) {
        let result = color;
        const backgroundRgb = hexToRgb(background);

        for (let index = 0; index < 10; index += 1) {
            if (contrastRatio(hexToRgb(result), backgroundRgb) >= minimum) break;
            result = mixHex(result, '#ffffff', 0.78);
        }

        return result;
    }

    function getToken(name) {
        return getComputedStyle(root).getPropertyValue(name).trim();
    }

    function updateThemeColor() {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) return;
        const background = getToken('--bg');
        if (background) meta.setAttribute('content', background);
    }

    function syncThemeToggle() {
        const toggle = $('#themeToggle');
        if (!toggle) return;

        const labels = data.theme || {};
        const isDark = designState.theme === 'dark';
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark
            ? (labels.darkLabel || 'Switch to light mode')
            : (labels.lightLabel || 'Switch to dark mode'));
    }

    function applyCustomAccent(hex) {
        const normalized = normalizeHex(hex);
        if (!normalized) return;

        const accentRgb = hexToRgb(normalized);
        const bgElev = getToken('--bg-elev') || '#ffffff';
        const panelBg = getToken('--panel-bg') || '#111111';
        const strongWeight = designState.theme === 'dark' ? 0.78 : 0.8;
        const strongMix = designState.theme === 'dark' ? '#ffffff' : '#000000';
        const accentStrong = mixHex(normalized, strongMix, strongWeight);
        const accentSoft = mixHex(normalized, bgElev, 0.14);
        const panelAccent = ensureContrast(mixHex(normalized, '#ffffff', 0.45), panelBg, 4.5);

        root.style.setProperty('--accent', normalized);
        root.style.setProperty('--accent-strong', accentStrong);
        root.style.setProperty('--accent-soft', accentSoft);
        root.style.setProperty('--accent-ink', bestInk(accentRgb));
        root.style.setProperty('--accent-wash', `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.10)`);
        root.style.setProperty('--panel-accent', panelAccent);

        designState.accent = normalized;
        updateThemeColor();
    }

    function applyTheme(theme, options = {}) {
        const { persist = true } = options;
        designState.theme = theme === 'dark' ? 'dark' : 'light';
        root.setAttribute('data-theme', designState.theme);
        root.style.colorScheme = designState.theme;

        if (persist) writeStorage(THEME_STORAGE, designState.theme);
        if (designState.accent) applyCustomAccent(designState.accent);

        updateThemeColor();
        syncThemeToggle();
    }

    function initDesignSettings() {
        designState.theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        designState.accent = normalizeHex(root.getAttribute('data-accent')) || '';

        if (designState.accent) applyCustomAccent(designState.accent);

        updateThemeColor();
        syncThemeToggle();
    }

    function initTheme() {
        const toggle = $('#themeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                applyTheme(designState.theme === 'dark' ? 'light' : 'dark');
            });
        }

        applyTheme(designState.theme, { persist: false });
    }

    /* ------------------------------------------------------------------
       Hero
       ------------------------------------------------------------------ */
    function renderHero() {
        const hero = data.hero || {};
        const container = $('#heroContainer');
        if (!container) return;

        const facts = (hero.facts || []).map((fact) => `
            <div class="hero-fact">
                <dt>${escapeHtml(fact.label)}</dt>
                <dd>${escapeHtml(fact.value)}</dd>
            </div>
        `).join('');

        const stack = (hero.profile && hero.profile.stack || []).map((item) => `
            <li>${escapeHtml(item)}</li>
        `).join('');

        const profile = hero.profile || {};
        const ui = data.ui || {};

        container.innerHTML = `
            <div class="hero-inner">
                <div class="hero-copy">
                    <p class="eyebrow">
                        <span class="eyebrow-mark" aria-hidden="true"></span>
                        ${escapeHtml(hero.eyebrow || '')}
                    </p>
                    <h1 class="hero-title" id="hero-title">
                        ${escapeHtml(hero.titleBefore || '')}<em>${escapeHtml(hero.titleEmphasis || '')}</em>${escapeHtml(hero.titleAfter || '')}
                    </h1>
                    <p class="hero-lede">${hero.description || ''}</p>
                    <div class="hero-actions">
                        <a class="button button-primary" href="${escapeHtml(hero.primaryCta && hero.primaryCta.href || '#projects')}">
                            ${escapeHtml(hero.primaryCta && hero.primaryCta.label || 'View projects')}
                            ${ICONS.arrow}
                        </a>
                        <a class="button button-quiet" href="${escapeHtml(hero.secondaryCta && hero.secondaryCta.href || '#contact')}">
                            ${escapeHtml(hero.secondaryCta && hero.secondaryCta.label || 'Get in touch')}
                        </a>
                    </div>
                    <dl class="hero-facts">${facts}</dl>
                </div>

                <aside class="profile-card" aria-label="${escapeHtml(ui.profileSummary || 'Profile summary')}">
                    <div class="profile-top">
                        <div class="profile-photo-wrap">
                            <img class="profile-photo" src="${escapeHtml(hero.image || '')}" alt="${escapeHtml(hero.imageAlt || hero.profile && hero.profile.name || '')}" width="400" height="400" loading="eager" decoding="async">
                        </div>
                        <div class="profile-identity">
                            <span class="status-pill"><span class="status-dot" aria-hidden="true"></span>${escapeHtml(hero.status || 'Open to work')}</span>
                            <h2 class="profile-name">${escapeHtml(profile.name || data.identity.name)}</h2>
                            <p class="profile-role">${escapeHtml(profile.role || data.identity.role)}</p>
                        </div>
                    </div>
                    <p class="profile-note">${profile.note || ''}</p>
                    <ul class="profile-stack" aria-label="${escapeHtml(ui.coreStack || 'Core stack')}">${stack}</ul>
                    <div class="profile-foot">
                        <span>${escapeHtml(profile.availability || data.identity.availability)}</span>
                        <span>${escapeHtml(data.identity.location || '')}</span>
                    </div>
                </aside>
            </div>
            <div class="hero-foot" aria-hidden="true">
                <span>${escapeHtml(ui.scrollToExplore || 'Scroll to explore')}</span>
                <span class="hero-foot-line"></span>
                <span>01 / 04</span>
            </div>
        `;
    }

    /* ------------------------------------------------------------------
       About
       ------------------------------------------------------------------ */
    function renderAbout() {
        const about = data.about || {};
        const container = $('#aboutContainer');
        if (!container) return;

        const principles = (about.principles || []).map((principle, index) => `
            <article class="principle reveal" style="--delay:${index * 60}ms">
                <span class="principle-index" aria-hidden="true">0${index + 1}</span>
                <h3>${escapeHtml(principle.title)}</h3>
                <p>${principle.text || ''}</p>
            </article>
        `).join('');

        const now = about.now || {};
        const nowItems = (now.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join('');

        container.innerHTML = `
            <div class="section-grid">
                <div class="section-aside reveal">
                    <p class="section-kicker">${escapeHtml(about.kicker || 'About')}</p>
                    <h2 class="section-title" id="about-title">${escapeHtml(about.title || 'About')}</h2>
                </div>
                <div class="section-main">
                    <div class="prose reveal">
                        ${(about.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join('')}
                    </div>
                    <div class="principles">${principles}</div>
                    <div class="now-card reveal">
                        <div class="now-copy">
                            <p class="now-label">${escapeHtml(now.title || 'Currently')}</p>
                            <p>${now.text || ''}</p>
                        </div>
                        <ul class="now-list">${nowItems}</ul>
                    </div>
                </div>
            </div>
        `;
    }

    /* ------------------------------------------------------------------
       Skills
       ------------------------------------------------------------------ */
    function renderSkills() {
        const skills = data.skills || {};
        const container = $('#skillsContainer');
        if (!container) return;

        const rows = (skills.categories || []).map((category, index) => `
            <div class="skill-row reveal" style="--delay:${index * 45}ms">
                <span class="skill-index" aria-hidden="true">0${index + 1}</span>
                <h3 class="skill-title">${escapeHtml(category.title)}</h3>
                <ul class="tag-list">
                    ${(category.items || []).map((item) => `<li class="tag">${escapeHtml(item)}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="section-grid">
                <div class="section-aside reveal">
                    <p class="section-kicker">${escapeHtml(skills.kicker || 'Skills')}</p>
                    <h2 class="section-title" id="skills-title">${escapeHtml(skills.title || 'Skills')}</h2>
                    <p class="section-note">${skills.note || ''}</p>
                </div>
                <div class="skills-list">${rows}</div>
            </div>
        `;
    }

    /* ------------------------------------------------------------------
       Projects
       ------------------------------------------------------------------ */
    function projectLinks(project) {
        const links = [];
        const ui = data.ui || {};

        if (project.repo) {
            links.push(`<a class="text-link" href="${escapeHtml(project.repo)}" target="_blank" rel="noopener noreferrer">${ICONS.github}<span>GitHub</span></a>`);
        }
        if (project.live) {
            links.push(`<a class="text-link" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">${ICONS.external}<span>${escapeHtml(ui.liveSite || 'Live site')}</span></a>`);
        }
        if (project.private) {
            links.push(`<span class="private-badge">${ICONS.lock}<span>${escapeHtml(ui.private || 'Private')}</span></span>`);
        }

        return links.length ? `<div class="project-links">${links.join('')}</div>` : '';
    }

    function projectStats(project) {
        if (!project.showStats) return '';
        return `<span class="project-stats" data-repo="${escapeHtml(project.statsRepo || '')}">
            <span class="project-stat">${ICONS.star}<span class="stat-stars">–</span></span>
            <span class="project-stat">${ICONS.fork}<span class="stat-forks">–</span></span>
        </span>`;
    }

    function projectRow(project, index) {
        const number = String(index + 1).padStart(2, '0');
        const fallbackType = data.ui?.projectFallback || 'Project';
        const image = project.image
            ? `<div class="project-image-frame"><img src="${escapeHtml(project.image)}" alt="${escapeHtml(project.imageAlt || project.name)}" width="1200" height="750" loading="lazy" decoding="async"></div>`
            : '<div class="project-image-frame project-image-placeholder" aria-hidden="true"></div>';

        return `
            <article class="project-row reveal" aria-labelledby="project-title-${index}">
                <div class="project-visual">
                    <span class="project-number" aria-hidden="true">${number}</span>
                    ${image}
                </div>
                <div class="project-info">
                    <div class="project-meta">
                        <span>${escapeHtml(project.type || fallbackType)}</span>
                        <span>${escapeHtml(project.year || '')}</span>
                        ${projectStats(project)}
                    </div>
                    <h3 class="project-title" id="project-title-${index}">${escapeHtml(project.name)}</h3>
                    <p class="project-description">${project.description || ''}</p>
                    <ul class="project-tech">
                        ${(project.tech || []).map((tech) => `<li class="tag tag-small">${escapeHtml(tech)}</li>`).join('')}
                    </ul>
                    ${projectLinks(project)}
                </div>
            </article>
        `;
    }

    function renderProjects() {
        const projects = data.projects || {};
        const container = $('#projectsContainer');
        if (!container) return;

        let projectIndex = 0;
        const ui = data.ui || {};
        const groups = (projects.categories || []).map((category) => {
            const categoryProjects = category.projects || [];
            const count = categoryProjects.length;
            const projectLabel = count === 1
                ? (ui.project || 'project')
                : (ui.projects || 'projects');

            const rows = categoryProjects.map((project) => {
                const html = projectRow(project, projectIndex);
                projectIndex += 1;
                return html;
            }).join('');

            return `
                <div class="project-group">
                    <div class="project-group-head reveal">
                        <span>${escapeHtml(category.title)}</span>
                        <span>${count} ${escapeHtml(projectLabel)}</span>
                    </div>
                    ${rows}
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="section-heading reveal">
                <div>
                    <p class="section-kicker">${escapeHtml(projects.kicker || 'Projects')}</p>
                    <h2 class="section-title" id="projects-title">${escapeHtml(projects.title || 'Projects')}</h2>
                </div>
                <p class="section-note">${projects.note || ''}</p>
            </div>
            <div class="project-groups">${groups}</div>
        `;
    }

    /* ------------------------------------------------------------------
       Contact
       ------------------------------------------------------------------ */
    function renderContact() {
        const contact = data.contact || {};
        const form = contact.form || {};
        const ui = data.ui || {};
        const container = $('#contactContainer');
        if (!container) return;

        const emailLink = (contact.links || []).find((link) => link.icon === 'email');
        const emailAddress = emailLink ? (emailLink.href || '').replace(/^mailto:/i, '') : '';
        const formAction = form.action || '';

        const links = (contact.links || []).map((link) => {
            const external = isExternal(link.href);
            return `<a class="contact-link" href="${escapeHtml(link.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
                <span class="contact-icon">${ICONS[link.icon] || ICONS.external}</span>
                <span class="contact-link-copy">
                    <span>${escapeHtml(link.label)}</span>
                    <strong>${escapeHtml(link.value || link.href)}</strong>
                </span>
                <span class="contact-arrow">${ICONS.arrowUpRight}</span>
            </a>`;
        }).join('');

        container.innerHTML = `
            <div class="contact-panel reveal">
                <div class="contact-copy">
                    <p class="section-kicker">${escapeHtml(contact.kicker || 'Contact')}</p>
                    <h2 class="section-title" id="contact-title">${escapeHtml(contact.title || 'Contact')}</h2>
                    <p class="contact-lede">${contact.description || ''}</p>
                    <div class="contact-links">${links}</div>
                    <p class="contact-note">${escapeHtml(contact.note || '')}</p>
                </div>

                <form id="contactForm" class="contact-form" action="${escapeHtml(formAction)}" method="POST"${formAction ? '' : ` data-mailto="${escapeHtml(emailAddress)}"`}>
                    <div class="form-field">
                        <label for="name">${escapeHtml(ui.formName || 'Name')}</label>
                        <input type="text" id="name" name="name" placeholder="${escapeHtml(ui.formNamePlaceholder || 'Ada Lovelace')}" autocomplete="name" required>
                    </div>
                    <div class="form-field">
                        <label for="email">${escapeHtml(ui.formEmail || 'Email')}</label>
                        <input type="email" id="email" name="email" placeholder="${escapeHtml(ui.formEmailPlaceholder || 'ada@example.com')}" autocomplete="email" required>
                    </div>
                    <div class="form-field">
                        <label for="subject">${escapeHtml(ui.formSubject || 'Subject')}</label>
                        <input type="text" id="subject" name="subject" placeholder="${escapeHtml(ui.formSubjectPlaceholder || 'Junior backend role')}" required>
                    </div>
                    <div class="form-field">
                        <label for="message">${escapeHtml(ui.formMessage || 'Message')}</label>
                        <textarea id="message" name="message" rows="4" placeholder="${escapeHtml(ui.formMessagePlaceholder || 'Tell me about the role or project…')}" required></textarea>
                    </div>
                    <button type="submit" id="submitBtn" class="button button-primary form-submit">
                        <span class="btn-text">${escapeHtml(form.submitLabel || ui.sendMessage || 'Send message')}</span>
                        ${ICONS.send}
                    </button>
                    <div id="formStatus" class="form-status" role="status" aria-live="polite"></div>
                </form>
            </div>
        `;
    }

    /* ------------------------------------------------------------------
       Footer
       ------------------------------------------------------------------ */
    function renderFooter() {
        const footer = data.footer || {};
        const identity = data.identity || {};
        const container = $('#footerContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="footer-top">
                <a class="footer-brand" href="#top">
                    <span class="brand-mark" aria-hidden="true">${escapeHtml(identity.initials || 'MA')}</span>
                    <span class="footer-brand-copy">
                        <strong>${escapeHtml(identity.name || '')}</strong>
                        <span>${escapeHtml(footer.tagline || identity.role || '')}</span>
                    </span>
                </a>
                <a class="footer-top-link" href="#top">${escapeHtml(footer.backToTop || 'Back to top')} <span aria-hidden="true">↑</span></a>
            </div>
            <div class="footer-bottom">
                <p>${escapeHtml(footer.copyright || '')}</p>
                <p>${escapeHtml(footer.builtWith || '')}</p>
            </div>
        `;
    }

    /* ------------------------------------------------------------------
       Interactions
       ------------------------------------------------------------------ */
    function initHeader() {
        const header = $('#siteHeader');
        const nav = $('#siteNav');
        const toggle = $('#navToggle');

        if (header) {
            const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 12);
            onScroll();
            window.addEventListener('scroll', onScroll, { passive: true });
        }

        if (!nav || !toggle) return;

        const openMenuLabel = () => data.ui?.openMenu || 'Open menu';
        const closeMenuLabel = () => data.ui?.closeMenu || 'Close menu';

        const closeNav = () => {
            nav.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', openMenuLabel());
            document.body.classList.remove('nav-open');
        };

        toggle.addEventListener('click', () => {
            const open = !nav.classList.contains('is-open');
            nav.classList.toggle('is-open', open);
            toggle.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? closeMenuLabel() : openMenuLabel());
            document.body.classList.toggle('nav-open', open);
        });

        nav.addEventListener('click', (event) => {
            if (event.target.closest('a')) closeNav();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeNav();
        });

        document.addEventListener('click', (event) => {
            if (!nav.classList.contains('is-open')) return;
            if (!event.target.closest('.site-header')) closeNav();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 880) closeNav();
        });
    }

    let revealObserver = null;

    function initReveal() {
        if (revealObserver) {
            revealObserver.disconnect();
            revealObserver = null;
        }

        const elements = $$('.reveal');
        if (!elements.length) return;

        if (reduceMotion || !('IntersectionObserver' in window)) {
            elements.forEach((element) => element.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -8% 0px',
            threshold: 0.08
        });

        revealObserver = observer;
        elements.forEach((element) => observer.observe(element));
    }

    function initContactForm() {
        const form = $('#contactForm');
        const status = $('#formStatus');
        const submit = $('#submitBtn');
        if (!form || !status || !submit) return;

        const ui = data.ui || {};
        const buttonText = submit.querySelector('.btn-text');
        const originalText = buttonText ? buttonText.textContent : '';

        const showStatus = (message, type) => {
            status.textContent = message;
            status.className = `form-status is-visible ${type || ''}`.trim();
        };

        const resetButton = () => {
            submit.classList.remove('is-loading');
            submit.disabled = false;
            if (buttonText) buttonText.textContent = originalText;
        };

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            submit.classList.add('is-loading');
            submit.disabled = true;
            if (buttonText) buttonText.textContent = ui.sending || 'Sending…';
            status.className = 'form-status';
            status.textContent = '';

            const formData = new FormData(form);
            const action = form.getAttribute('action');
            const mailto = form.getAttribute('data-mailto');

            if (!action && !mailto) {
                showStatus(ui.noContactMethod || 'No contact method is configured yet.', 'is-error');
                resetButton();
                return;
            }

            if (!action && mailto) {
                const subject = formData.get('subject') || ui.portfolioEnquiry || 'Portfolio enquiry';
                const name = formData.get('name') || '';
                const email = formData.get('email') || '';
                const message = formData.get('message') || '';
                const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
                const mailtoUrl = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                await new Promise((resolve) => setTimeout(resolve, 350));
                showStatus(ui.openingEmail || 'Opening your email app…', 'is-success');
                window.location.href = mailtoUrl;

                setTimeout(() => {
                    resetButton();
                    status.className = 'form-status';
                    status.textContent = '';
                }, 4500);
                return;
            }

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { Accept: 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    showStatus(ui.messageSent || 'Message sent. Thanks for reaching out.', 'is-success');
                    if (buttonText) buttonText.textContent = ui.sent || 'Sent';
                    setTimeout(() => {
                        resetButton();
                        status.className = 'form-status';
                        status.textContent = '';
                    }, 5000);
                    return;
                }

                let detail = ui.genericError || 'Something went wrong. Please try again.';
                try {
                    const body = await response.json();
                    if (Array.isArray(body.errors) && body.errors.length) {
                        detail = body.errors.map((error) => error.message).join(', ');
                    }
                } catch (error) {
                    /* Keep the generic message. */
                }
                showStatus(detail, 'is-error');
            } catch (error) {
                showStatus(ui.connectionError || 'Connection failed. Please check your internet and try again.', 'is-error');
            }

            resetButton();
        });
    }

    /* ------------------------------------------------------------------
       Optional live GitHub stats
       ------------------------------------------------------------------ */
    const GH_CACHE_KEY = 'portfolio-gh-stats';
    const GH_CACHE_TTL = 21600000;

    function readCache() {
        try {
            const raw = localStorage.getItem(GH_CACHE_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || !parsed.data) return null;
            if (Date.now() - parsed.timestamp > GH_CACHE_TTL) return null;
            return parsed.data;
        } catch (error) {
            return null;
        }
    }

    function writeCache(stats) {
        try {
            localStorage.setItem(GH_CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data: stats }));
        } catch (error) {
            /* Storage can be unavailable in private mode. */
        }
    }

    function applyStats(stats) {
        $$('.project-stats').forEach((badge) => {
            const info = stats[badge.getAttribute('data-repo')];
            if (!info) return;
            const stars = badge.querySelector('.stat-stars');
            const forks = badge.querySelector('.stat-forks');
            if (stars) stars.textContent = info.stargazers_count ?? info.stars ?? '–';
            if (forks) forks.textContent = info.forks_count ?? info.forks ?? '–';
        });
    }

    async function fetchGitHubStats() {
        const badges = $$('.project-stats');
        if (!badges.length) return;

        const cached = readCache();
        if (cached) {
            applyStats(cached);
            return;
        }

        const repos = [...new Set(badges.map((badge) => badge.getAttribute('data-repo')).filter(Boolean))];
        const stats = {};

        await Promise.allSettled(repos.map(async (repo) => {
            const response = await fetch(`https://api.github.com/repos/${repo}`);
            if (!response.ok) throw new Error(`GitHub API ${response.status}`);
            stats[repo] = await response.json();
        }));

        if (Object.keys(stats).length) {
            writeCache(stats);
            applyStats(stats);
        }
    }

    /* ------------------------------------------------------------------
       Boot
       ------------------------------------------------------------------ */
    initDesignSettings();
    setLanguage(currentLanguage, { persist: false });
    initTheme();
    initHeader();
    initLanguage();
})();
