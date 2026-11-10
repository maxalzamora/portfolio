(function () {
    'use strict';

    document.documentElement.classList.add('js');

    const data = window.PORTFOLIO;
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
        setMeta('og:url', meta.url, 'property');
        setMeta('og:image', meta.ogImage, 'property');
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', meta.title);
        setMeta('twitter:description', meta.description);
        setMeta('twitter:image', meta.ogImage);

        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical && meta.url) canonical.setAttribute('href', meta.url);
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
        if (brand) brand.setAttribute('aria-label', `${identity.name || 'Home'} — home`);

        const nav = $('#siteNav');
        if (nav) {
            nav.innerHTML = (data.nav || []).map((item) => `
                <a class="nav-link" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
            `).join('');
        }
    }

    /* ------------------------------------------------------------------
       Design settings and the design lab
       ------------------------------------------------------------------ */
    const root = document.documentElement;

    const DESIGN_STORAGE = {
        theme: 'portfolio-theme',
        palette: 'portfolio-palette',
        fonts: 'portfolio-fonts',
        accent: 'portfolio-accent',
        texture: 'portfolio-texture'
    };

    const PALETTES = [
        {
            id: 'paper',
            name: 'Paper',
            note: 'Warm paper & teal',
            swatches: ['#f4f1e8', '#0e6f68', '#b45309', '#18201c']
        },
        {
            id: 'terminal',
            name: 'Terminal',
            note: 'Krash-inspired green',
            swatches: ['#0a0b0d', '#2dd484', '#4ecdc4', '#e8ebee']
        },
        {
            id: 'ember',
            name: 'Ember',
            note: 'Coral complement',
            swatches: ['#150e10', '#ff6b81', '#fbbf24', '#f6e9e8']
        },
        {
            id: 'cobalt',
            name: 'Cobalt',
            note: 'Blue split-complement',
            swatches: ['#0b1020', '#7aa2ff', '#fbbf24', '#e7ecf8']
        },
        {
            id: 'iris',
            name: 'Iris',
            note: 'Violet triadic',
            swatches: ['#120f1a', '#a78bfa', '#facc15', '#f3efff']
        },
        {
            id: 'mono',
            name: 'Mono',
            note: 'Ink & newsprint',
            swatches: ['#0b0b0b', '#f2f2f2', '#8a8a8a', '#2a2a2a']
        }
    ];

    const FONT_PAIRS = [
        {
            id: 'editorial',
            name: 'Editorial',
            note: 'Fraunces + Inter',
            sample: 'Aa',
            sampleFamily: "'Fraunces', Georgia, serif"
        },
        {
            id: 'terminal',
            name: 'Terminal',
            note: 'JetBrains + Inter',
            sample: '</>',
            sampleFamily: "'JetBrains Mono', monospace"
        },
        {
            id: 'modern',
            name: 'Modern',
            note: 'Inter + Inter',
            sample: 'Aa',
            sampleFamily: "'Inter', sans-serif"
        },
        {
            id: 'classic',
            name: 'Classic',
            note: 'Georgia + Inter',
            sample: 'Aa',
            sampleFamily: 'Georgia, serif'
        },
        {
            id: 'mono',
            name: 'Mono',
            note: 'JetBrains everywhere',
            sample: '01',
            sampleFamily: "'JetBrains Mono', monospace"
        }
    ];

    const TEXTURES = [
        { id: 'soft', name: 'Soft', note: 'Radial washes' },
        { id: 'grid', name: 'Grid', note: 'Dot matrix' },
        { id: 'none', name: 'None', note: 'Flat colour' }
    ];

    const THEMES = [
        { id: 'light', name: 'Light' },
        { id: 'dark', name: 'Dark' }
    ];

    const PRESETS = [
        {
            id: 'editorial',
            name: 'Editorial',
            note: 'Paper · Fraunces',
            palette: 'paper',
            fonts: 'editorial',
            texture: 'soft',
            theme: 'light'
        },
        {
            id: 'krash',
            name: 'Krash',
            note: 'Green terminal',
            palette: 'terminal',
            fonts: 'terminal',
            texture: 'grid',
            theme: 'dark'
        },
        {
            id: 'ember',
            name: 'Ember',
            note: 'Coral serif',
            palette: 'ember',
            fonts: 'classic',
            texture: 'soft',
            theme: 'dark'
        },
        {
            id: 'blueprint',
            name: 'Blueprint',
            note: 'Cobalt grid',
            palette: 'cobalt',
            fonts: 'modern',
            texture: 'grid',
            theme: 'dark'
        },
        {
            id: 'newsprint',
            name: 'Newsprint',
            note: 'Mono classic',
            palette: 'mono',
            fonts: 'classic',
            texture: 'none',
            theme: 'light'
        }
    ];

    const DEBUG_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"></path>
    </svg>`;

    const designState = {
        theme: 'light',
        palette: 'paper',
        fonts: 'editorial',
        texture: 'soft',
        accent: ''
    };

    function readStorage(key) {
        try {
            return localStorage.getItem(key) || '';
        } catch (error) {
            return '';
        }
    }

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

    function removeStorage(key) {
        try {
            localStorage.removeItem(key);
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

    function applyTheme(theme, options = {}) {
        const { persist = true, sync = true } = options;
        designState.theme = theme === 'dark' ? 'dark' : 'light';
        root.setAttribute('data-theme', designState.theme);
        root.style.colorScheme = designState.theme;

        if (persist) writeStorage(DESIGN_STORAGE.theme, designState.theme);
        if (designState.accent) {
            applyCustomAccent(designState.accent, { persist: false, sync: false });
        }

        updateThemeColor();
        syncThemeToggle();
        if (sync) syncDebugUI();
    }

    function applyPalette(id, options = {}) {
        const { persist = true, clearAccent = true, sync = true } = options;
        const palette = PALETTES.find((item) => item.id === id) || PALETTES[0];

        designState.palette = palette.id;
        root.setAttribute('data-palette', palette.id);

        if (persist) writeStorage(DESIGN_STORAGE.palette, palette.id);
        if (clearAccent) {
            clearCustomAccent({ persist: true, sync: false });
        } else if (designState.accent) {
            applyCustomAccent(designState.accent, { persist: false, sync: false });
        }

        updateThemeColor();
        if (sync) syncDebugUI();
    }

    function applyFonts(id, options = {}) {
        const { persist = true, sync = true } = options;
        const pair = FONT_PAIRS.find((item) => item.id === id) || FONT_PAIRS[0];

        designState.fonts = pair.id;
        root.setAttribute('data-fonts', pair.id);
        if (persist) writeStorage(DESIGN_STORAGE.fonts, pair.id);
        if (sync) syncDebugUI();
    }

    function applyTexture(id, options = {}) {
        const { persist = true, sync = true } = options;
        const texture = TEXTURES.find((item) => item.id === id) || TEXTURES[0];

        designState.texture = texture.id;
        root.setAttribute('data-texture', texture.id);
        if (persist) writeStorage(DESIGN_STORAGE.texture, texture.id);
        if (sync) syncDebugUI();
    }

    function applyPreset(id) {
        const preset = PRESETS.find((item) => item.id === id);
        if (!preset) return;

        applyPalette(preset.palette, { persist: true, clearAccent: true, sync: false });
        applyFonts(preset.fonts, { persist: true, sync: false });
        applyTexture(preset.texture, { persist: true, sync: false });
        applyTheme(preset.theme, { persist: true, sync: false });
        syncDebugUI();
    }

    function applyCustomAccent(hex, options = {}) {
        const { persist = true, sync = true } = options;
        const normalized = normalizeHex(hex);

        if (!normalized) {
            clearCustomAccent({ persist, sync });
            return;
        }

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
        if (persist) writeStorage(DESIGN_STORAGE.accent, normalized);
        updateThemeColor();
        if (sync) syncDebugUI();
    }

    function clearCustomAccent(options = {}) {
        const { persist = true, sync = true } = options;
        designState.accent = '';

        ['--accent', '--accent-strong', '--accent-soft', '--accent-ink', '--accent-wash', '--panel-accent']
            .forEach((property) => root.style.removeProperty(property));

        if (persist) removeStorage(DESIGN_STORAGE.accent);
        updateThemeColor();
        if (sync) syncDebugUI();
    }

    function updateAccentDisplay() {
        const input = $('#debugAccent');
        const value = $('#debugAccentValue');
        const reset = $('#debugAccentReset');

        if (input) {
            input.value = designState.accent || normalizeHex(getToken('--accent')) || '#0e6f68';
        }
        if (value) {
            value.textContent = designState.accent ? designState.accent.toUpperCase() : 'Palette accent';
        }
        if (reset) {
            reset.disabled = !designState.accent;
        }
    }

    function syncDebugUI() {
        const panel = $('#debugPanel');
        if (!panel) return;

        $$('[data-palette-option]', panel).forEach((button) => {
            button.setAttribute('aria-pressed', String(button.getAttribute('data-palette-option') === designState.palette));
        });

        $$('[data-font-option]', panel).forEach((button) => {
            button.setAttribute('aria-pressed', String(button.getAttribute('data-font-option') === designState.fonts));
        });

        $$('[data-texture-option]', panel).forEach((button) => {
            button.setAttribute('aria-pressed', String(button.getAttribute('data-texture-option') === designState.texture));
        });

        $$('[data-theme-option]', panel).forEach((button) => {
            button.setAttribute('aria-pressed', String(button.getAttribute('data-theme-option') === designState.theme));
        });

        $$('[data-preset-option]', panel).forEach((button) => {
            const preset = PRESETS.find((item) => item.id === button.getAttribute('data-preset-option'));
            const active = Boolean(preset)
                && !designState.accent
                && preset.palette === designState.palette
                && preset.fonts === designState.fonts
                && preset.texture === designState.texture
                && preset.theme === designState.theme;
            button.setAttribute('aria-pressed', String(active));
        });

        const paletteName = $('#debugPaletteName');
        const palette = PALETTES.find((item) => item.id === designState.palette);
        if (paletteName) paletteName.textContent = palette ? palette.name : '';

        updateAccentDisplay();
        syncThemeToggle();
    }

    function initDesignSettings() {
        const savedPalette = readStorage(DESIGN_STORAGE.palette) || root.getAttribute('data-palette') || 'paper';
        const savedFonts = readStorage(DESIGN_STORAGE.fonts) || root.getAttribute('data-fonts') || 'editorial';
        const savedTexture = readStorage(DESIGN_STORAGE.texture) || root.getAttribute('data-texture') || 'soft';

        designState.palette = PALETTES.some((item) => item.id === savedPalette) ? savedPalette : 'paper';
        designState.fonts = FONT_PAIRS.some((item) => item.id === savedFonts) ? savedFonts : 'editorial';
        designState.texture = TEXTURES.some((item) => item.id === savedTexture) ? savedTexture : 'soft';
        designState.theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        designState.accent = normalizeHex(readStorage(DESIGN_STORAGE.accent));

        root.setAttribute('data-palette', designState.palette);
        root.setAttribute('data-fonts', designState.fonts);
        root.setAttribute('data-texture', designState.texture);
        root.setAttribute('data-theme', designState.theme);
        root.style.colorScheme = designState.theme;

        if (designState.accent) {
            applyCustomAccent(designState.accent, { persist: false, sync: false });
        } else {
            clearCustomAccent({ persist: true, sync: false });
        }

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

        applyTheme(designState.theme, { persist: false, sync: true });
    }

    function resetDesign() {
        Object.values(DESIGN_STORAGE).forEach(removeStorage);
        designState.accent = '';
        clearCustomAccent({ persist: false, sync: false });
        applyPalette('paper', { persist: false, clearAccent: false, sync: false });
        applyFonts('editorial', { persist: false, sync: false });
        applyTexture('soft', { persist: false, sync: false });
        applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light', {
            persist: false,
            sync: false
        });
        syncDebugUI();
    }

    function initDebug() {
        const config = data.debug || {};
        const forceOpen = new URLSearchParams(window.location.search).has('debug');
        if (config.enabled === false && !forceOpen) return;

        const mount = $('#debugRoot');
        if (!mount) return;

        const paletteCards = PALETTES.map((palette) => `
            <button class="debug-card" type="button" data-palette-option="${escapeHtml(palette.id)}" aria-pressed="false" aria-label="Use the ${escapeHtml(palette.name)} palette">
                <span class="palette-swatches" aria-hidden="true">
                    ${palette.swatches.map((color) => `<span style="background:${escapeHtml(color)}"></span>`).join('')}
                </span>
                <span class="palette-name">${escapeHtml(palette.name)}</span>
                <span class="palette-note">${escapeHtml(palette.note)}</span>
            </button>
        `).join('');

        const fontCards = FONT_PAIRS.map((pair) => `
            <button class="debug-card font-card" type="button" data-font-option="${escapeHtml(pair.id)}" aria-pressed="false">
                <span class="font-sample" style="font-family:${escapeHtml(pair.sampleFamily)}" aria-hidden="true">${escapeHtml(pair.sample)}</span>
                <span class="font-name">${escapeHtml(pair.name)}</span>
                <span class="font-note">${escapeHtml(pair.note)}</span>
            </button>
        `).join('');

        const textureCards = TEXTURES.map((texture) => `
            <button class="debug-card" type="button" data-texture-option="${escapeHtml(texture.id)}" aria-pressed="false">
                <span class="texture-preview texture-preview--${escapeHtml(texture.id)}" aria-hidden="true"></span>
                <span class="palette-name">${escapeHtml(texture.name)}</span>
                <span class="palette-note">${escapeHtml(texture.note)}</span>
            </button>
        `).join('');

        const themeButtons = THEMES.map((theme) => `
            <button type="button" data-theme-option="${escapeHtml(theme.id)}" aria-pressed="false">${escapeHtml(theme.name)}</button>
        `).join('');

        const presetCards = PRESETS.map((preset) => {
            const palette = PALETTES.find((item) => item.id === preset.palette) || PALETTES[0];
            return `
                <button class="debug-card preset-card" type="button" data-preset-option="${escapeHtml(preset.id)}" aria-pressed="false">
                    <span class="palette-swatches" aria-hidden="true">
                        ${palette.swatches.map((color) => `<span style="background:${escapeHtml(color)}"></span>`).join('')}
                    </span>
                    <span class="palette-name">${escapeHtml(preset.name)}</span>
                    <span class="palette-note">${escapeHtml(preset.note)}</span>
                </button>
            `;
        }).join('');

        mount.innerHTML = `
            <button class="debug-trigger" id="debugTrigger" type="button" aria-expanded="false" aria-controls="debugPanel">
                ${DEBUG_ICON}
                <span class="debug-trigger-dot" aria-hidden="true"></span>
                <span>${escapeHtml(config.label || 'Lab')}</span>
            </button>

            <aside class="debug-panel" id="debugPanel" role="dialog" aria-labelledby="debugTitle" hidden>
                <div class="debug-head">
                    <div>
                        <p class="debug-kicker">Debug</p>
                        <h2 class="debug-title" id="debugTitle">${escapeHtml(config.title || 'Design lab')}</h2>
                    </div>
                    <button class="debug-close" id="debugClose" type="button" aria-label="Close design lab">&times;</button>
                </div>

                <p class="debug-note">${escapeHtml(config.note || 'Preview palettes, type, texture and accent colour. Settings stay in this browser.')}</p>

                <section class="debug-section" aria-labelledby="debugPresetTitle">
                    <div class="debug-section-head">
                        <h3 class="debug-section-title" id="debugPresetTitle">Presets</h3>
                        <span class="debug-section-value">One click</span>
                    </div>
                    <div class="debug-grid">${presetCards}</div>
                </section>

                <section class="debug-section" aria-labelledby="debugPaletteTitle">
                    <div class="debug-section-head">
                        <h3 class="debug-section-title" id="debugPaletteTitle">Palette</h3>
                        <span class="debug-section-value" id="debugPaletteName" aria-live="polite"></span>
                    </div>
                    <div class="debug-grid">${paletteCards}</div>
                </section>

                <section class="debug-section" aria-labelledby="debugModeTitle">
                    <div class="debug-section-head">
                        <h3 class="debug-section-title" id="debugModeTitle">Mode</h3>
                    </div>
                    <div class="segmented" role="group" aria-label="Colour mode">${themeButtons}</div>
                </section>

                <section class="debug-section" aria-labelledby="debugTypeTitle">
                    <div class="debug-section-head">
                        <h3 class="debug-section-title" id="debugTypeTitle">Typography</h3>
                    </div>
                    <div class="debug-grid">${fontCards}</div>
                </section>

                <section class="debug-section" aria-labelledby="debugTextureTitle">
                    <div class="debug-section-head">
                        <h3 class="debug-section-title" id="debugTextureTitle">Texture</h3>
                    </div>
                    <div class="debug-grid debug-grid--three">${textureCards}</div>
                </section>

                <section class="debug-section" aria-labelledby="debugAccentTitle">
                    <div class="debug-section-head">
                        <h3 class="debug-section-title" id="debugAccentTitle">Accent</h3>
                    </div>
                    <div class="accent-row">
                        <input class="accent-color" id="debugAccent" type="color" value="#0e6f68" aria-label="Custom accent colour">
                        <span class="accent-copy">
                            <span class="accent-label">Custom accent</span>
                            <span class="accent-value" id="debugAccentValue">Palette accent</span>
                        </span>
                        <button class="accent-reset" id="debugAccentReset" type="button">Use palette</button>
                    </div>
                </section>

                <div class="debug-footer">
                    <button class="debug-reset" id="debugReset" type="button">Reset all</button>
                    <span class="debug-hint">Alt + Shift + D</span>
                </div>
            </aside>
        `;

        const trigger = $('#debugTrigger');
        const panel = $('#debugPanel');
        const close = $('#debugClose');
        const accentInput = $('#debugAccent');
        const accentReset = $('#debugAccentReset');
        const reset = $('#debugReset');
        let lastFocused = null;

        if (!trigger || !panel || !close) return;

        const open = () => {
            lastFocused = document.activeElement;
            panel.hidden = false;
            trigger.setAttribute('aria-expanded', 'true');
            close.focus({ preventScroll: true });
        };

        const closePanel = () => {
            if (panel.hidden) return;
            panel.hidden = true;
            trigger.setAttribute('aria-expanded', 'false');
            if (lastFocused && panel.contains(document.activeElement) && typeof lastFocused.focus === 'function') {
                lastFocused.focus({ preventScroll: true });
            }
        };

        const togglePanel = () => {
            if (panel.hidden) {
                open();
            } else {
                closePanel();
            }
        };

        trigger.addEventListener('click', togglePanel);
        close.addEventListener('click', closePanel);

        panel.addEventListener('click', (event) => {
            const presetButton = event.target.closest('[data-preset-option]');
            if (presetButton) {
                applyPreset(presetButton.getAttribute('data-preset-option'));
                return;
            }

            const paletteButton = event.target.closest('[data-palette-option]');
            if (paletteButton) {
                applyPalette(paletteButton.getAttribute('data-palette-option'));
                return;
            }

            const fontButton = event.target.closest('[data-font-option]');
            if (fontButton) {
                applyFonts(fontButton.getAttribute('data-font-option'));
                return;
            }

            const textureButton = event.target.closest('[data-texture-option]');
            if (textureButton) {
                applyTexture(textureButton.getAttribute('data-texture-option'));
                return;
            }

            const themeButton = event.target.closest('[data-theme-option]');
            if (themeButton) {
                applyTheme(themeButton.getAttribute('data-theme-option'));
            }
        });

        if (accentInput) {
            accentInput.addEventListener('input', () => {
                applyCustomAccent(accentInput.value);
            });
        }

        if (accentReset) {
            accentReset.addEventListener('click', () => {
                clearCustomAccent();
            });
        }

        if (reset) {
            reset.addEventListener('click', resetDesign);
        }

        document.addEventListener('keydown', (event) => {
            if (event.altKey && event.shiftKey && (event.key === 'd' || event.key === 'D')) {
                event.preventDefault();
                togglePanel();
                return;
            }

            if (event.key === 'Escape' && !panel.hidden) {
                closePanel();
            }
        });

        document.addEventListener('click', (event) => {
            if (panel.hidden) return;
            if (
                event.target.closest('#debugPanel')
                || event.target.closest('#debugTrigger')
                || event.target.closest('#themeToggle')
            ) return;
            closePanel();
        });

        syncDebugUI();
        if (forceOpen) open();
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

                <aside class="profile-card" aria-label="Profile summary">
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
                    <ul class="profile-stack" aria-label="Core stack">${stack}</ul>
                    <div class="profile-foot">
                        <span>${escapeHtml(profile.availability || data.identity.availability)}</span>
                        <span>${escapeHtml(data.identity.location || '')}</span>
                    </div>
                </aside>
            </div>
            <div class="hero-foot" aria-hidden="true">
                <span>Scroll to explore</span>
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

        if (project.repo) {
            links.push(`<a class="text-link" href="${escapeHtml(project.repo)}" target="_blank" rel="noopener noreferrer">${ICONS.github}<span>GitHub</span></a>`);
        }
        if (project.live) {
            links.push(`<a class="text-link" href="${escapeHtml(project.live)}" target="_blank" rel="noopener noreferrer">${ICONS.external}<span>Live site</span></a>`);
        }
        if (project.private) {
            links.push(`<span class="private-badge">${ICONS.lock}<span>Private</span></span>`);
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
                        <span>${escapeHtml(project.type || 'Project')}</span>
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
        const groups = (projects.categories || []).map((category) => {
            const rows = (category.projects || []).map((project) => {
                const html = projectRow(project, projectIndex);
                projectIndex += 1;
                return html;
            }).join('');

            return `
                <div class="project-group">
                    <div class="project-group-head reveal">
                        <span>${escapeHtml(category.title)}</span>
                        <span>${(category.projects || []).length} ${(category.projects || []).length === 1 ? 'project' : 'projects'}</span>
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
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Ada Lovelace" autocomplete="name" required>
                    </div>
                    <div class="form-field">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="ada@example.com" autocomplete="email" required>
                    </div>
                    <div class="form-field">
                        <label for="subject">Subject</label>
                        <input type="text" id="subject" name="subject" placeholder="Junior backend role" required>
                    </div>
                    <div class="form-field">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="4" placeholder="Tell me about the role or project…" required></textarea>
                    </div>
                    <button type="submit" id="submitBtn" class="button button-primary form-submit">
                        <span class="btn-text">${escapeHtml(form.submitLabel || 'Send message')}</span>
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

        const closeNav = () => {
            nav.classList.remove('is-open');
            toggle.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('nav-open');
        };

        toggle.addEventListener('click', () => {
            const open = !nav.classList.contains('is-open');
            nav.classList.toggle('is-open', open);
            toggle.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
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

    function initReveal() {
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

        elements.forEach((element) => observer.observe(element));
    }

    function initContactForm() {
        const form = $('#contactForm');
        const status = $('#formStatus');
        const submit = $('#submitBtn');
        if (!form || !status || !submit) return;

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
            if (buttonText) buttonText.textContent = 'Sending…';
            status.className = 'form-status';
            status.textContent = '';

            const formData = new FormData(form);
            const action = form.getAttribute('action');
            const mailto = form.getAttribute('data-mailto');

            if (!action && !mailto) {
                showStatus('No contact method is configured yet.', 'is-error');
                resetButton();
                return;
            }

            if (!action && mailto) {
                const subject = formData.get('subject') || 'Portfolio enquiry';
                const name = formData.get('name') || '';
                const email = formData.get('email') || '';
                const message = formData.get('message') || '';
                const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
                const mailtoUrl = `mailto:${mailto}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                await new Promise((resolve) => setTimeout(resolve, 350));
                showStatus('Opening your email app…', 'is-success');
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
                    showStatus('Message sent. Thanks for reaching out.', 'is-success');
                    if (buttonText) buttonText.textContent = 'Sent';
                    setTimeout(() => {
                        resetButton();
                        status.className = 'form-status';
                        status.textContent = '';
                    }, 5000);
                    return;
                }

                let detail = 'Something went wrong. Please try again.';
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
                showStatus('Connection failed. Please check your internet and try again.', 'is-error');
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
    renderMeta();
    initDesignSettings();
    renderHeader();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderContact();
    renderFooter();

    initTheme();
    initHeader();
    initReveal();
    initContactForm();
    initDebug();
    fetchGitHubStats();
})();
