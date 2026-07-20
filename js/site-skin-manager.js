/* =========================================================
   Betforecast.ai — Site Skin Manager
   Controls 1win / Dafabet / Mostbet skins from data/site-skins.json
   Test links:
   ?skin=1win | ?skin=dafabet | ?skin=mostbet | ?skin=off
   ?country=KZ | ?country=BD for GEO-rule testing
   ========================================================= */

(() => {
  "use strict";

  const CONFIG_URL = "/data/site-skins.json";
  const STORAGE_KEY = "bf_site_skin";
  const ROOT_CLASS = "site-skin-managed";
  const SCRIPT_ID = "bf-adserver-script";
  const STYLE_ID = "bf-site-skin-style";
  const CODE_SLOT_ID = "bf-site-skin-code-slot";
  const CLICK_LAYER_ID = "bf-site-skin-click-layer";

  const KNOWN_SKINS = ["1win", "dafabet", "mostbet"];

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback);
    } else {
      callback();
    }
  }

  function getParams() {
    return new URLSearchParams(window.location.search || "");
  }

  function getForcedSkin(config) {
    const params = getParams();
    const paramName = config?.testParams?.skin || "skin";
    const value = (params.get(paramName) || "").trim().toLowerCase();

    if (!value) {
      return localStorage.getItem(STORAGE_KEY) || "";
    }

    if (value === "off" || value === "none" || value === "0") {
      localStorage.setItem(STORAGE_KEY, "off");
      return "off";
    }

    if (KNOWN_SKINS.includes(value)) {
      localStorage.setItem(STORAGE_KEY, value);
      return value;
    }

    return "";
  }

  function getCountry(config) {
    const params = getParams();
    const paramName = config?.testParams?.country || "country";

    return String(
      params.get(paramName) ||
      window.BF_COUNTRY ||
      window.BF_GEO ||
      ""
    ).trim().toUpperCase();
  }

  function resolveGeoSkin(config, country) {
    if (!country || !Array.isArray(config.geoRules)) {
      return "";
    }

    const rule = config.geoRules.find((item) => {
      return Array.isArray(item.countries) && item.countries.includes(country);
    });

    return rule?.skin || "";
  }

  function resolveDefaultSkin(config) {
    const fallbackRule = Array.isArray(config.geoRules)
      ? config.geoRules.find((item) => Array.isArray(item.countries) && item.countries.includes("DEFAULT"))
      : null;

    return config.defaultSkin || fallbackRule?.skin || "1win";
  }

  function resolveSkinId(config) {
    const forced = getForcedSkin(config);

    if (forced === "off") {
      return "off";
    }

    if (forced && config.skins?.[forced]?.enabled) {
      return forced;
    }

    const geoSkin = resolveGeoSkin(config, getCountry(config));

    if (geoSkin && config.skins?.[geoSkin]?.enabled) {
      return geoSkin;
    }

    const defaultSkin = resolveDefaultSkin(config);
    return config.skins?.[defaultSkin]?.enabled ? defaultSkin : "off";
  }

  function removeOldManagedClasses() {
    document.body.classList.remove(
      ROOT_CLASS,
      "site-skin-1win",
      "site-skin-dafabet",
      "site-skin-mostbet",
      "site-skin-off"
    );
  }

  function applyBodyClasses(skinId, skin) {
    removeOldManagedClasses();

    if (skinId === "off") {
      document.body.classList.add("site-skin-off");
      return;
    }

    document.body.classList.add(ROOT_CLASS, skin.bodyClass || `site-skin-${skinId}`);
    document.documentElement.dataset.siteSkin = skinId;
    document.body.dataset.siteSkin = skinId;
  }

  function clearGeneratedLayers() {
    document.getElementById(CODE_SLOT_ID)?.remove();
    document.getElementById(CLICK_LAYER_ID)?.remove();
  }

  function injectBaseStyle() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.site-skin-managed {
        background-color: #020b13 !important;
        background-image: var(--bf-site-skin-bg, none) !important;
        background-repeat: no-repeat !important;
        background-position: center top !important;
        background-size: var(--bf-site-skin-bg-size, 1920px auto) !important;
        background-attachment: scroll !important;
      }

      body.site-skin-managed .bf-header,
      body.site-skin-managed .header,
      body.site-skin-managed .bf-page,
      body.site-skin-managed .wc-page,
      body.site-skin-managed .match-page-wrap,
      body.site-skin-managed .standings-page-wrap,
      body.site-skin-managed .results-page-section,
      body.site-skin-managed .news-page-wrap {
        position: relative !important;
        z-index: 20 !important;
      }

      body.site-skin-managed:not(.home-page) .bf-header-inner,
      body.site-skin-managed:not(.home-page) .header-inner {
        width: min(var(--bf-shell-width, 1240px), calc(100vw - var(--bf-page-gap, 48px))) !important;
        max-width: var(--bf-shell-width, 1240px) !important;
        min-height: 82px !important;
        margin: 0 auto !important;
        padding: 14px 24px !important;
        display: grid !important;
        grid-template-columns: 220px minmax(0, 1fr) 220px !important;
        align-items: center !important;
        gap: 18px !important;
        background: var(--bf-panel-background, linear-gradient(180deg, rgba(18, 38, 55, 0.97), rgba(8, 20, 32, 0.98))) !important;
        border: var(--bf-panel-border, 1px solid rgba(94, 224, 164, 0.16)) !important;
        border-radius: 26px !important;
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32) !important;
        backdrop-filter: blur(14px) !important;
        -webkit-backdrop-filter: blur(14px) !important;
      }

      body.site-skin-managed:not(.home-page) .bf-header-inner::after,
      body.site-skin-managed:not(.home-page) .header-inner::after {
        content: "" !important;
        display: block !important;
        width: 220px !important;
        height: 1px !important;
      }

      body.site-skin-managed:not(.home-page) .bf-nav,
      body.site-skin-managed:not(.home-page) .topbar-menu {
        justify-self: center !important;
        width: max-content !important;
        max-width: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        flex-wrap: nowrap !important;
        gap: 10px !important;
      }

      body.site-skin-managed:not(.home-page) .bf-nav a,
      body.site-skin-managed:not(.home-page) .bf-nav a.active,
      body.site-skin-managed:not(.home-page) .topbar-menu a,
      body.site-skin-managed:not(.home-page) .topbar-menu a.active {
        flex: 0 0 auto !important;
        min-height: 48px !important;
        padding: 0 18px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 14px !important;
        color: #f8fafc !important;
        background: rgba(38, 51, 67, 0.72) !important;
        border: 1px solid rgba(255, 255, 255, 0.12) !important;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
        font-size: 16px !important;
        font-weight: 900 !important;
        line-height: 1 !important;
        white-space: nowrap !important;
        text-decoration: none !important;
      }

      body.site-skin-managed:not(.home-page) .bf-nav a:hover,
      body.site-skin-managed:not(.home-page) .bf-nav a.active:hover,
      body.site-skin-managed:not(.home-page) .topbar-menu a:hover,
      body.site-skin-managed:not(.home-page) .topbar-menu a.active:hover {
        color: #5ee0a4 !important;
        background: rgba(48, 63, 81, 0.88) !important;
        border-color: rgba(94, 224, 164, 0.28) !important;
      }

      body.site-skin-managed .results-page-wrap,
      body.site-skin-managed .results-hero,
      body.site-skin-managed .results-page-section,
      body.site-skin-managed .content-banner {
        width: min(var(--bf-shell-width, 1240px), calc(100vw - var(--bf-page-gap, 48px))) !important;
        max-width: var(--bf-shell-width, 1240px) !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      body.site-skin-managed .results-grid {
        width: 100% !important;
        max-width: 100% !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }

      .bf-site-skin-code-slot {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
        opacity: 0.01 !important;
        pointer-events: none !important;
      }

      .bf-site-skin-click-layer {
        position: fixed !important;
        inset: 0 !important;
        z-index: 2 !important;
        pointer-events: none !important;
      }

      .bf-site-skin-click-layer a {
        position: fixed !important;
        display: block !important;
        background: transparent !important;
        text-decoration: none !important;
        pointer-events: auto !important;
      }

      .bf-site-skin-click-top {
        top: 0 !important;
        left: 50% !important;
        width: min(100vw, 1920px) !important;
        height: var(--bf-site-skin-top-height, 165px) !important;
        transform: translateX(-50%) !important;
      }

      .bf-site-skin-click-left {
        top: var(--bf-site-skin-side-top, 165px) !important;
        bottom: 0 !important;
        left: 0 !important;
        width: max(0px, calc((100vw - var(--bf-shell-width, 1240px)) / 2)) !important;
        max-width: 330px !important;
      }

      .bf-site-skin-click-right {
        top: var(--bf-site-skin-side-top, 165px) !important;
        right: 0 !important;
        bottom: 0 !important;
        width: max(0px, calc((100vw - var(--bf-shell-width, 1240px)) / 2)) !important;
        max-width: 330px !important;
      }

      @media (max-width: 768px) {
        body.site-skin-managed {
          background-image: var(--bf-site-skin-mobile-bg, var(--bf-site-skin-bg, none)) !important;
          background-size: var(--bf-site-skin-mobile-bg-size, auto 290px) !important;
          background-position: center top !important;
        }

        body.site-skin-managed:not(.home-page) .bf-header-inner,
        body.site-skin-managed:not(.home-page) .header-inner {
          width: calc(100% - 16px) !important;
          max-width: calc(100% - 16px) !important;
          min-height: 0 !important;
          margin: 6px auto 0 !important;
          padding: 12px 10px !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          gap: 10px !important;
          border-radius: 18px !important;
        }

        body.site-skin-managed:not(.home-page) .bf-header-inner::after,
        body.site-skin-managed:not(.home-page) .header-inner::after {
          display: none !important;
        }

        body.site-skin-managed:not(.home-page) .bf-logo {
          width: 100% !important;
          justify-content: center !important;
        }

        body.site-skin-managed:not(.home-page) .bf-nav,
        body.site-skin-managed:not(.home-page) .topbar-menu {
          width: 100% !important;
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 8px !important;
        }

        body.site-skin-managed:not(.home-page) .bf-nav a,
        body.site-skin-managed:not(.home-page) .bf-nav a.active,
        body.site-skin-managed:not(.home-page) .topbar-menu a,
        body.site-skin-managed:not(.home-page) .topbar-menu a.active {
          width: 100% !important;
          min-height: 40px !important;
          padding: 10px 3px !important;
          font-size: 13px !important;
          text-align: center !important;
        }

        body.site-skin-managed .results-page-wrap,
        body.site-skin-managed .results-hero,
        body.site-skin-managed .results-page-section,
        body.site-skin-managed .content-banner {
          width: calc(100% - 16px) !important;
          max-width: calc(100% - 16px) !important;
        }

        .bf-site-skin-click-left,
        .bf-site-skin-click-right {
          display: none !important;
        }

        .bf-site-skin-click-top {
          left: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          height: 96px !important;
          transform: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function setSkinVariables(skin) {
    const root = document.documentElement;
    const hasImage = Boolean(skin.fallbackImage);

    root.style.setProperty("--bf-site-skin-bg", hasImage ? `url("${skin.fallbackImage}")` : "none");
    root.style.setProperty("--bf-site-skin-bg-size", skin.backgroundSize || "1920px auto");
    root.style.setProperty("--bf-site-skin-top-height", `${skin.topClickHeight || 165}px`);
    root.style.setProperty("--bf-site-skin-side-top", `${skin.sideStartTop || 165}px`);

    if (hasImage) {
      root.style.setProperty(
        "--bf-site-skin-mobile-bg",
        `linear-gradient(180deg, rgba(2, 11, 19, 0) 0, rgba(2, 11, 19, 0.12) 92px, rgba(2, 11, 19, 0.88) 235px, #020b13 330px), url("${skin.fallbackImage}")`
      );
      root.style.setProperty("--bf-site-skin-mobile-bg-size", "100% 340px, auto 290px");
    } else {
      root.style.setProperty("--bf-site-skin-mobile-bg", "none");
      root.style.setProperty("--bf-site-skin-mobile-bg-size", "auto");
    }
  }

  function injectAdserverScript(src) {
    if (!src || document.getElementById(SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = src;
    script.async = true;
    script.dataset.cfasync = "false";
    document.body.appendChild(script);
  }

  function injectCodeSlot(skin, config) {
    if (!skin.codeZone || String(skin.codeZone).includes("_ZONE")) {
      return;
    }

    const slot = document.createElement("div");
    slot.id = CODE_SLOT_ID;
    slot.className = "bf-site-skin-code-slot";
    slot.innerHTML = `<ins class="ins-zone" data-zone="${escapeAttribute(skin.codeZone)}"></ins>`;
    document.body.appendChild(slot);

    injectAdserverScript(config.adScript);
  }

  function injectClickLayer(skin, skinId) {
    if (!skin.clickUrl) {
      return;
    }

    const layer = document.createElement("div");
    layer.id = CLICK_LAYER_ID;
    layer.className = "bf-site-skin-click-layer";
    layer.setAttribute("aria-hidden", "true");

    const label = skin.label || skinId;
    const url = escapeAttribute(skin.clickUrl);

    layer.innerHTML = `
      <a class="bf-site-skin-click-top" href="${url}" target="_blank" rel="nofollow sponsored noopener" aria-label="${escapeAttribute(label)} top site skin"></a>
      <a class="bf-site-skin-click-left" href="${url}" target="_blank" rel="nofollow sponsored noopener" aria-label="${escapeAttribute(label)} left site skin"></a>
      <a class="bf-site-skin-click-right" href="${url}" target="_blank" rel="nofollow sponsored noopener" aria-label="${escapeAttribute(label)} right site skin"></a>
    `;

    document.body.appendChild(layer);
  }

  function escapeAttribute(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function applySkin(config, skinId) {
    clearGeneratedLayers();

    if (!config.enabled || skinId === "off") {
      applyBodyClasses("off", null);
      return;
    }

    const skin = config.skins?.[skinId];

    if (!skin || !skin.enabled) {
      applyBodyClasses("off", null);
      return;
    }

    injectBaseStyle();
    setSkinVariables(skin);
    applyBodyClasses(skinId, skin);
    injectClickLayer(skin, skinId);
    injectCodeSlot(skin, config);

    window.BF_ACTIVE_SITE_SKIN = {
      id: skinId,
      label: skin.label,
      mode: skin.mode,
      codeZone: skin.codeZone || "",
      country: getCountry(config) || "default"
    };
  }

  async function loadConfig() {
    const response = await fetch(`${CONFIG_URL}?v=${Date.now()}`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Site skin config failed: ${response.status}`);
    }

    return response.json();
  }

  ready(async () => {
    try {
      const config = await loadConfig();
      const skinId = resolveSkinId(config);
      applySkin(config, skinId);
    } catch (error) {
      console.warn("[Site Skin Manager]", error);
    }
  });
})();
