/**
 * @name TransparentDiscord
 * @author adicarlisle
 * @description Makes Discord transparent with adjustable opacity and z-index layering
 * @version 1.0.0
 * @source https://github.com/adicarlisle/transparent-discord
 * @updateUrl https://raw.githubusercontent.com/adicarlisle/transparent-discord/main/transparent-discord.plugin.js
 * @website https://github.com/adicarlisle
 * @authorId 123456789
 */

"use strict";

const config = {
    info: {
        name: "TransparentDiscord",
        authors: [{ name: "adicarlisle" }],
        version: "1.0.0",
        description: "Makes Discord transparent with adjustable opacity and z-index layering"
    },
    defaultSettings: {
        windowOpacity: 0.95,
        serversOpacity: 0.75,
        channelsOpacity: 0.8,
        chatOpacity: 0.9,
        membersOpacity: 0.8
    }
};

class TransparentDiscord {
    constructor() {
        this.settings = { ...config.defaultSettings };
        this.debounceTimeout = null;
        this._boundHandleWindowEvent = this.handleWindowEvent.bind(this);
    }

    start() {
        try {
            this.loadSettings();
            this.injectStyles();
            this.addWindowListeners();
            this.setupTransparency();
            console.log('[TransparentDiscord] Plugin started successfully');
        } catch (error) {
            console.error('[TransparentDiscord] Failed to start plugin:', error);
        }
    }

    stop() {
        try {
            this.removeStyles();
            this.removeWindowListeners();
            this.resetTransparency();
            console.log('[TransparentDiscord] Plugin stopped successfully');
        } catch (error) {
            console.error('[TransparentDiscord] Failed to stop plugin:', error);
        }
    }

    loadSettings() {
        try {
            const savedSettings = BdApi.getData("TransparentDiscord", "settings");
            if (savedSettings) {
                this.settings = { ...config.defaultSettings, ...savedSettings };
            }
        } catch (error) {
            console.error('[TransparentDiscord] Failed to load settings:', error);
            this.settings = { ...config.defaultSettings };
        }
    }

    saveSettings() {
        try {
            BdApi.saveData("TransparentDiscord", "settings", this.settings);
        } catch (error) {
            console.error('[TransparentDiscord] Failed to save settings:', error);
        }
    }

    debounce(func, wait) {
        if (this.debounceTimeout) {
            clearTimeout(this.debounceTimeout);
        }
        this.debounceTimeout = setTimeout(() => {
            func();
            this.debounceTimeout = null;
        }, wait);
    }

    handleWindowEvent() {
        this.debounce(() => {
            try {
                requestAnimationFrame(() => {
                    this.setupTransparency();
                });
            } catch (error) {
                console.error('[TransparentDiscord] Window event handler error:', error);
            }
        }, 100);
    }

    setupTransparency() {
        try {
            if (!document.body) return;
            
            document.documentElement.style.opacity = this.settings.windowOpacity;
            document.body.style.background = 'transparent';
            
            const app = document.querySelector('#app-mount');
            if (app) {
                app.style.background = 'transparent';
            }
        } catch (error) {
            console.error('[TransparentDiscord] Failed to setup transparency:', error);
        }
    }

    resetTransparency() {
        try {
            if (!document.body) return;
            
            document.documentElement.style.opacity = '1';
            document.body.style.background = '';
            
            const app = document.querySelector('#app-mount');
            if (app) {
                app.style.background = '';
            }
        } catch (error) {
            console.error('[TransparentDiscord] Failed to reset transparency:', error);
        }
    }

    addWindowListeners() {
        try {
            window.addEventListener('focus', this._boundHandleWindowEvent);
            window.addEventListener('blur', this._boundHandleWindowEvent);
            window.addEventListener('resize', this._boundHandleWindowEvent);
            window.addEventListener('visibilitychange', this._boundHandleWindowEvent);
            console.log('[TransparentDiscord] Window listeners added');
        } catch (error) {
            console.error('[TransparentDiscord] Failed to add window listeners:', error);
        }
    }

    removeWindowListeners() {
        try {
            window.removeEventListener('focus', this._boundHandleWindowEvent);
            window.removeEventListener('blur', this._boundHandleWindowEvent);
            window.removeEventListener('resize', this._boundHandleWindowEvent);
            window.removeEventListener('visibilitychange', this._boundHandleWindowEvent);
            console.log('[TransparentDiscord] Window listeners removed');
        } catch (error) {
            console.error('[TransparentDiscord] Failed to remove window listeners:', error);
        }
    }

    injectStyles() {
        try {
            BdApi.injectCSS('TransparentDiscord', this.getStyles());
            console.log('[TransparentDiscord] Styles injected');
        } catch (error) {
            console.error('[TransparentDiscord] Failed to inject styles:', error);
        }
    }

    removeStyles() {
        try {
            BdApi.clearCSS('TransparentDiscord');
            console.log('[TransparentDiscord] Styles removed');
        } catch (error) {
            console.error('[TransparentDiscord] Failed to remove styles:', error);
        }
    }

    getStyles() {
        return `
            /* Base app transparency */
            #app-mount, .app-2CXKsg, body {
                background: transparent !important;
            }

            /* Keep text solid */
            .markup-eYLPri, .name-28HaxV, .title-17SveM,
            .username-3JLfHz, .channelName-3KPsGw,
            .headerText-1qIDDT, .nameAndDecorators-3ERwy2,
            .activity-2EQDZv, .content-1gYQeQ, .roleColor-nA7BqX {
                opacity: 1 !important;
                color: rgb(220, 221, 222) !important;
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;
            }

            /* Keep settings and modals opaque */
            .layer-86YKbF[aria-label="USER_SETTINGS"],
            .layer-86YKbF[aria-label="CHANNEL_SETTINGS"],
            .layer-86YKbF[aria-label="GUILD_SETTINGS"],
            .modal-3Hrb0S, .menu-1QACrS, .popout-TdhJ6Z,
            .container-2O1UgZ, .container-2ebMPP,
            .messagesPopoutWrap-3zryHW, .browser-mnQ1T7,
            .root-1CAIjD, .tooltip-14MtrL {
                background-color: var(--background-primary) !important;
                opacity: 1 !important;
            }

            /* Remove backgrounds */
            .bg-1QIAus, .container-2o3qEW, .content-1SgpWY,
            .wrapper-3AZUiP, .scroller-3X7KbA,
            .privateChannels-oVe7HL, .panels-3wFtMD {
                background: transparent !important;
            }

            /* Servers sidebar */
            .wrapper-1_HaEi, .scroller-3X7KbA {
                background: rgba(30, 31, 34, ${this.settings.serversOpacity}) !important;
                z-index: 10 !important;
            }

            /* Channels sidebar */
            .sidebar-1tnWFu, .container-1NXEtd, .panels-3wFtMD {
                background: rgba(43, 45, 49, ${this.settings.channelsOpacity}) !important;
                z-index: 20 !important;
            }

            /* Chat area */
            .chat-2ZfjoI, .container-2cd8Mz, .messageContent-2t3eCI {
                background: rgba(54, 57, 63, ${this.settings.chatOpacity}) !important;
                z-index: 15 !important;
            }

            /* Members list */
            .members-3WRCEx {
                background: rgba(47, 49, 54, ${this.settings.membersOpacity}) !important;
                z-index: 25 !important;
            }

            /* Theme overrides */
            .theme-dark {
                --background-primary: #36393f !important;
                --background-secondary: #2f3136 !important;
                --background-secondary-alt: #292b2f !important;
                --background-tertiary: #202225 !important;
                --background-accent: #4f545c !important;
                --background-floating: #18191c !important;
            }

            /* Settings Panel Styling */
            .transparentDiscord-settings {
                padding: 16px;
                color: var(--header-primary);
            }

            .transparentDiscord-settings .setting-item {
                margin-bottom: 20px;
                padding: 16px;
                background: var(--background-secondary);
                border-radius: 8px;
                transition: background 0.2s ease;
            }

            .transparentDiscord-settings .setting-item:hover {
                background: var(--background-secondary-alt);
            }

            .transparentDiscord-settings span {
                display: block;
                margin-bottom: 8px;
                font-size: 16px;
                font-weight: 500;
                color: var(--header-primary);
            }

            .transparentDiscord-settings input[type="range"] {
                -webkit-appearance: none;
                width: 100%;
                height: 8px;
                border-radius: 4px;
                background: var(--background-tertiary);
                outline: none;
                margin-top: 8px;
            }

            .transparentDiscord-settings input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background: var(--brand-experiment);
                cursor: pointer;
                transition: transform 0.1s ease;
            }

            .transparentDiscord-settings input[type="range"]::-webkit-slider-thumb:hover {
                transform: scale(1.2);
            }

            .transparentDiscord-settings input[type="range"]::-webkit-slider-runnable-track {
                width: 100%;
                height: 8px;
                border-radius: 4px;
                background: var(--background-tertiary);
            }

            .transparentDiscord-title {
                font-size: 20px;
                font-weight: 600;
                color: var(--header-primary);
                margin-bottom: 16px;
                padding-bottom: 8px;
                border-bottom: 2px solid var(--background-accent);
            }
        `;
    }

    getSettingsPanel() {
        const settings = document.createElement('div');
        settings.className = 'transparentDiscord-settings';

        const title = document.createElement('div');
        title.className = 'transparentDiscord-title';
        title.textContent = 'Transparency Settings';
        settings.appendChild(title);

        const createSlider = (id, label, value) => {
            const container = document.createElement('div');
            container.className = 'setting-item';

            const labelEl = document.createElement('span');
            labelEl.textContent = `${label}: ${value.toFixed(2)}`;

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.min = '0.1';
            slider.max = '1';
            slider.step = '0.05';
            slider.value = value;

            slider.addEventListener('input', (e) => {
                try {
                    const newValue = parseFloat(e.target.value);
                    this.settings[id] = newValue;
                    labelEl.textContent = `${label}: ${newValue.toFixed(2)}`;
                    this.saveSettings();
                    if (id === 'windowOpacity') {
                        this.setupTransparency();
                    } else {
                        this.injectStyles();
                    }
                } catch (error) {
                    console.error('[TransparentDiscord] Slider error:', error);
                }
            });

            container.appendChild(labelEl);
            container.appendChild(slider);
            return container;
        };

        settings.appendChild(createSlider('windowOpacity', 'Window Opacity', this.settings.windowOpacity));
        settings.appendChild(createSlider('serversOpacity', 'Servers Opacity', this.settings.serversOpacity));
        settings.appendChild(createSlider('channelsOpacity', 'Channels Opacity', this.settings.channelsOpacity));
        settings.appendChild(createSlider('chatOpacity', 'Chat Opacity', this.settings.chatOpacity));
        settings.appendChild(createSlider('membersOpacity', 'Members Opacity', this.settings.membersOpacity));

        return settings;
    }
}

module.exports = TransparentDiscord;