/* Betforecast.ai layout lock v20
   Keeps every inner page aligned to the homepage header and shell. */
(() => {
  "use strict";

  const LEGACY_BG_ZONE = "163743";
  const STYLE_ID = "bf-page-layout-lock-style";
  const AD_SCRIPT_ID = "bf-adserver-script";
  const AD_SCRIPT_SRC = "https://media.getads.online/js/code.min.js";
  const LEGACY_IMAGE = "1win-wc2026-site-skin.webp";

  function isHomePage() {
    return document.body.classList.contains("home-page");
  }

  function ensureAdhitScript() {
    const existing = document.querySelector('script[src*="media.getads.online/js/code.min.js"]');

    if (existing) {
      if (!existing.id) existing.id = AD_SCRIPT_ID;
      return;
    }

    const script = document.createElement("script");
    script.id = AD_SCRIPT_ID;
    script.dataset.cfasync = "false";
    script.async = true;
    script.src = AD_SCRIPT_SRC;
    document.body.appendChild(script);
  }

  function removeLegacyClickAreas() {
    document
      .querySelectorAll(".skin-click, .skin-click-top, .skin-click-left, .skin-click-right")
      .forEach((element) => element.remove());
  }

  function removeLegacyBackgroundSlots() {
    document
      .querySelectorAll(".bf-adserver-background, #bf-adserver-background-slot")
      .forEach((element) => element.remove());

    document
      .querySelectorAll(`ins.ins-zone[data-zone="${LEGACY_BG_ZONE}"]`)
      .forEach((ins) => {
        const parent = ins.parentElement;
        ins.remove();

        if (
          parent &&
          parent !== document.body &&
          parent.children.length === 0 &&
          /background|skin|bg/i.test(parent.className || "")
        ) {
          parent.remove();
        }
      });
  }

  function stripLegacyBackgroundCss() {
    Array.from(document.styleSheets).forEach((sheet) => {
      let rules;

      try {
        rules = sheet.cssRules;
      } catch (error) {
        return;
      }

      if (!rules) return;

      Array.from(rules).forEach((rule) => {
        if (!rule.cssText || !rule.style) return;
        if (!rule.cssText.includes(LEGACY_IMAGE) && !rule.cssText.includes(LEGACY_BG_ZONE)) return;

        rule.style.removeProperty("background");
        rule.style.removeProperty("background-image");
        rule.style.removeProperty("background-position");
        rule.style.removeProperty("background-size");
        rule.style.removeProperty("background-repeat");
        rule.style.removeProperty("background-attachment");
      });
    });
  }

  function injectLayoutLockStyle() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      :root {
        --bf-lock-shell: 1240px;
        --bf-lock-gap: 48px;
        --bf-lock-top: 190px;
        --bf-lock-mobile-top: 96px;
        --bf-lock-small-mobile-top: 88px;
        --bf-lock-page-top: 24px;
        --bf-lock-header-height: 82px;
        --bf-lock-header-pad-y: 14px;
        --bf-lock-header-pad-x: 24px;
        --bf-lock-nav-gap: 10px;
        --bf-lock-panel: linear-gradient(180deg, rgba(18, 38, 55, 0.965), rgba(8, 20, 32, 0.98));
        --bf-lock-border: 1px solid rgba(255, 255, 255, 0.08);
        --bf-lock-green: #6de8a9;
      }

      html,
      body {
        width: 100% !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        overflow-x: hidden !important;
      }

      html body.site-skin-1win,
      html body.site-skin-dafabet,
      html body.site-skin-mostbet,
      html body.site-skin-managed {
        padding-top: var(--bf-lock-top) !important;
        margin: 0 !important;
        color: #f5f8fb !important;
        background:
          radial-gradient(circle at 18% 0%, rgba(22, 117, 84, 0.17), transparent 31rem),
          radial-gradient(circle at 88% 22%, rgba(24, 86, 126, 0.13), transparent 28rem),
          linear-gradient(180deg, #07111d 0, #050b13 36rem, #02070d 100%) !important;
        background-image:
          radial-gradient(circle at 18% 0%, rgba(22, 117, 84, 0.17), transparent 31rem),
          radial-gradient(circle at 88% 22%, rgba(24, 86, 126, 0.13), transparent 28rem),
          linear-gradient(180deg, #07111d 0, #050b13 36rem, #02070d 100%) !important;
        background-repeat: no-repeat !important;
        background-position: center top !important;
        background-size: auto !important;
        background-attachment: scroll !important;
        background-color: #020b13 !important;
      }

      .bf-adserver-background,
      #bf-adserver-background-slot,
      ins.ins-zone[data-zone="${LEGACY_BG_ZONE}"] {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
        min-height: 0 !important;
        overflow: hidden !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

      html body.site-skin-managed.site-skin-1win > header,
      html body.site-skin-managed.site-skin-1win > main,
      html body.site-skin-managed.site-skin-1win > footer,
      html body.site-skin-managed.site-skin-1win .bf-header,
      html body.site-skin-managed.site-skin-1win .header,
      html body.site-skin-managed.site-skin-1win .bf-page,
      html body.site-skin-managed.site-skin-1win .wc-page,
      html body.site-skin-managed.site-skin-1win .page-shell,
      html body.site-skin-managed.site-skin-1win .match-page-wrap,
      html body.site-skin-managed.site-skin-1win .standings-page-wrap,
      html body.site-skin-managed.site-skin-1win .results-page-section,
      html body.site-skin-managed.site-skin-1win .news-page-wrap,
      html body.site-skin-managed.site-skin-1win .ai-insights-page,
      html body.site-skin-managed.site-skin-1win .article-page-wrap {
        position: relative !important;
        z-index: 20 !important;
      }

      html body.site-skin-managed.site-skin-1win .bf-header,
      html body.site-skin-managed.site-skin-1win .header {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
        transform: none !important;
      }

      html body.site-skin-managed.site-skin-1win .bf-header-inner,
      html body.site-skin-managed.site-skin-1win .header-inner {
        width: min(var(--bf-lock-shell), calc(100vw - var(--bf-lock-gap))) !important;
        max-width: var(--bf-lock-shell) !important;
        min-width: 0 !important;
        min-height: var(--bf-lock-header-height) !important;
        height: auto !important;
        margin: 0 auto !important;
        padding: var(--bf-lock-header-pad-y) var(--bf-lock-header-pad-x) !important;
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 22px !important;
        background: var(--bf-lock-panel) !important;
        border: var(--bf-lock-border) !important;
        border-radius: 26px !important;
        box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34) !important;
        backdrop-filter: blur(14px) !important;
        -webkit-backdrop-filter: blur(14px) !important;
        transform: none !important;
      }

      html body.site-skin-managed.site-skin-1win .bf-header-inner::before,
      html body.site-skin-managed.site-skin-1win .bf-header-inner::after,
      html body.site-skin-managed.site-skin-1win .header-inner::before,
      html body.site-skin-managed.site-skin-1win .header-inner::after {
        content: none !important;
        display: none !important;
      }

      html body.site-skin-managed.site-skin-1win .bf-logo,
      html body.site-skin-managed.site-skin-1win .site-logo {
        flex: 0 0 auto !important;
        width: auto !important;
        min-width: 0 !important;
        max-width: none !important;
        margin: 0 !important;
        padding: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 10px !important;
        color: #ffffff !important;
        font-size: 23px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        letter-spacing: -0.045em !important;
        white-space: nowrap !important;
        text-decoration: none !important;
        transform: none !important;
      }

      html body.site-skin-managed.site-skin-1win .bf-logo img,
      html body.site-skin-managed.site-skin-1win .site-logo img {
        flex: 0 0 auto !important;
        display: block !important;
        width: 38px !important;
        height: 38px !important;
        object-fit: contain !important;
      }

      html body.site-skin-managed.site-skin-1win .bf-nav,
      html body.site-skin-managed.site-skin-1win .topbar-menu {
        flex: 0 1 auto !important;
        width: auto !important;
        min-width: 0 !important;
        max-width: calc(100% - 260px) !important;
        margin: 0 0 0 auto !important;
        padding: 0 !important;
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        justify-content: flex-end !important;
        justify-self: end !important;
        gap: var(--bf-lock-nav-gap) !important;
        flex-wrap: nowrap !important;
        overflow: visible !important;
        transform: none !important;
      }

      html body.site-skin-managed.site-skin-1win .topbar-actions,
      html body.site-skin-managed.site-skin-1win .theme-switch {
        display: none !important;
      }

      html body.site-skin-managed.site-skin-1win .bf-nav a,
      html body.site-skin-managed.site-skin-1win .topbar-menu a {
        flex: 0 0 auto !important;
        width: auto !important;
        min-width: 0 !important;
        max-width: none !important;
        min-height: 42px !important;
        height: 42px !important;
        margin: 0 !important;
        padding: 0 18px !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        border-radius: 14px !important;
        border: 1px solid rgba(255, 255, 255, 0.13) !important;
        background: rgba(255, 255, 255, 0.055) !important;
        color: #f4f7fb !important;
        font-size: 16px !important;
        line-height: 1 !important;
        font-weight: 800 !important;
        letter-spacing: 0 !important;
        text-align: center !important;
        white-space: nowrap !important;
        text-decoration: none !important;
        box-shadow: none !important;
        transform: none !important;
        box-sizing: border-box !important;
      }

      html body.site-skin-managed.site-skin-1win .bf-nav a:hover,
      html body.site-skin-managed.site-skin-1win .topbar-menu a:hover,
      html body.site-skin-managed.site-skin-1win .bf-nav a.active,
      html body.site-skin-managed.site-skin-1win .topbar-menu a.active {
        color: var(--bf-lock-green) !important;
        background: rgba(25, 126, 84, 0.34) !important;
        border-color: rgba(73, 224, 145, 0.34) !important;
        box-shadow: 0 0 22px rgba(73, 224, 145, 0.08) !important;
        transform: none !important;
      }

      html body.site-skin-managed.site-skin-1win > main,
      html body.site-skin-managed.site-skin-1win .bf-page,
      html body.site-skin-managed.site-skin-1win .wc-page,
      html body.site-skin-managed.site-skin-1win .page-shell,
      html body.site-skin-managed.site-skin-1win .match-page-wrap,
      html body.site-skin-managed.site-skin-1win .standings-page-wrap,
      html body.site-skin-managed.site-skin-1win .results-page-section,
      html body.site-skin-managed.site-skin-1win .news-page-wrap,
      html body.site-skin-managed.site-skin-1win .ai-insights-page,
      html body.site-skin-managed.site-skin-1win .article-page-wrap {
        width: min(var(--bf-lock-shell), calc(100vw - var(--bf-lock-gap))) !important;
        max-width: var(--bf-lock-shell) !important;
        min-width: 0 !important;
        margin-top: var(--bf-lock-page-top) !important;
        margin-left: auto !important;
        margin-right: auto !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        transform: none !important;
        box-sizing: border-box !important;
      }

      html body.site-skin-managed.site-skin-1win .side-banner {
        position: fixed !important;
        top: 400px !important;
      }

      html body.site-skin-managed.site-skin-1win .left-banner,
      html body.site-skin-managed.site-skin-1win .side-banner-left {
        left: 24px !important;
        right: auto !important;
      }

      html body.site-skin-managed.site-skin-1win .right-banner,
      html body.site-skin-managed.site-skin-1win .side-banner-right {
        right: 24px !important;
        left: auto !important;
      }

      @media (max-width: 1100px) {
        html body.site-skin-managed.site-skin-1win .bf-header-inner,
        html body.site-skin-managed.site-skin-1win .header-inner {
          width: calc(100vw - 24px) !important;
          max-width: calc(100vw - 24px) !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 12px !important;
        }

        html body.site-skin-managed.site-skin-1win .bf-nav,
        html body.site-skin-managed.site-skin-1win .topbar-menu {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          justify-content: center !important;
          flex-wrap: wrap !important;
        }

        html body.site-skin-managed.site-skin-1win > main,
        html body.site-skin-managed.site-skin-1win .bf-page,
        html body.site-skin-managed.site-skin-1win .wc-page,
        html body.site-skin-managed.site-skin-1win .page-shell,
        html body.site-skin-managed.site-skin-1win .match-page-wrap,
        html body.site-skin-managed.site-skin-1win .standings-page-wrap,
        html body.site-skin-managed.site-skin-1win .results-page-section,
        html body.site-skin-managed.site-skin-1win .news-page-wrap,
        html body.site-skin-managed.site-skin-1win .ai-insights-page,
        html body.site-skin-managed.site-skin-1win .article-page-wrap {
          width: calc(100vw - 24px) !important;
          max-width: calc(100vw - 24px) !important;
        }
      }

      @media (max-width: 768px) {
        html body.site-skin-1win,
        html body.site-skin-dafabet,
        html body.site-skin-mostbet,
        html body.site-skin-managed {
          padding-top: var(--bf-lock-mobile-top) !important;
        }

        html body.site-skin-managed.site-skin-1win .bf-header-inner,
        html body.site-skin-managed.site-skin-1win .header-inner {
          width: calc(100vw - 16px) !important;
          max-width: calc(100vw - 16px) !important;
          min-height: 0 !important;
          margin: 6px auto 0 !important;
          padding: 12px 10px !important;
          border-radius: 18px !important;
        }

        html body.site-skin-managed.site-skin-1win .bf-logo,
        html body.site-skin-managed.site-skin-1win .site-logo {
          width: 100% !important;
          justify-content: center !important;
          font-size: 20px !important;
        }

        html body.site-skin-managed.site-skin-1win .bf-logo img,
        html body.site-skin-managed.site-skin-1win .site-logo img {
          width: 30px !important;
          height: 30px !important;
        }

        html body.site-skin-managed.site-skin-1win .bf-nav,
        html body.site-skin-managed.site-skin-1win .topbar-menu {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 7px !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        html body.site-skin-managed.site-skin-1win .bf-nav a,
        html body.site-skin-managed.site-skin-1win .topbar-menu a {
          width: 100% !important;
          min-height: 38px !important;
          height: 38px !important;
          padding: 9px 4px !important;
          border-radius: 13px !important;
          font-size: 12px !important;
          line-height: 1.1 !important;
          text-align: center !important;
          white-space: normal !important;
        }

        html body.site-skin-managed.site-skin-1win > main,
        html body.site-skin-managed.site-skin-1win .bf-page,
        html body.site-skin-managed.site-skin-1win .wc-page,
        html body.site-skin-managed.site-skin-1win .page-shell,
        html body.site-skin-managed.site-skin-1win .match-page-wrap,
        html body.site-skin-managed.site-skin-1win .standings-page-wrap,
        html body.site-skin-managed.site-skin-1win .results-page-section,
        html body.site-skin-managed.site-skin-1win .news-page-wrap,
        html body.site-skin-managed.site-skin-1win .ai-insights-page,
        html body.site-skin-managed.site-skin-1win .article-page-wrap {
          width: calc(100vw - 16px) !important;
          max-width: calc(100vw - 16px) !important;
          margin-top: 14px !important;
        }
      }

      @media (max-width: 420px) {
        html body.site-skin-1win,
        html body.site-skin-dafabet,
        html body.site-skin-mostbet,
        html body.site-skin-managed {
          padding-top: var(--bf-lock-small-mobile-top) !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function runCleanupAndLock() {
    if (!isHomePage()) {
      document.body.classList.add("site-skin-managed");
    }

    removeLegacyClickAreas();
    removeLegacyBackgroundSlots();
    stripLegacyBackgroundCss();
    injectLayoutLockStyle();
    ensureAdhitScript();

    window.BF_ACTIVE_SITE_SKIN = {
      mode: "layout-locked-to-index",
      codeZone: null,
      version: 20
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runCleanupAndLock, { once: true });
  } else {
    runCleanupAndLock();
  }
})();