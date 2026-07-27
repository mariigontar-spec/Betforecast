/* Betforecast.ai — layout lock + legacy background cleanup
   Purpose:
   - Keep the homepage as the visual reference.
   - Make every inner page use the same top offset, shell width, side spacing and menu geometry.
   - Remove old hardcoded site-skin backgrounds and click layers.
   - Do not inject background zone 163743 anymore. */
(() => {
  "use strict";

  const LEGACY_BG_ZONE = "163743";
  const AD_SCRIPT_ID = "bf-adserver-script";
  const STYLE_ID = "bf-layout-lock-style";
  const AD_SCRIPT_SRC = "https://media.getads.online/js/code.min.js";
  const LEGACY_TOKENS = [
    "1win-wc2026-site-skin.webp",
    "mostbet",
    "dafabet",
    "163743"
  ];

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

        const css = rule.cssText.toLowerCase();
        const hasLegacyBackground = LEGACY_TOKENS.some((token) => css.includes(token.toLowerCase()));
        if (!hasLegacyBackground) return;

        rule.style.removeProperty("background");
        rule.style.removeProperty("background-image");
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
        --bf-lock-page-top: 24px;
        --bf-lock-panel: linear-gradient(180deg, rgba(18, 38, 55, 0.965), rgba(8, 20, 32, 0.98));
        --bf-lock-border: 1px solid rgba(255, 255, 255, 0.08);
        --bf-lock-green: #6de8a9;
      }

      body.site-skin-1win,
      body.site-skin-dafabet,
      body.site-skin-mostbet,
      body.site-skin-managed {
        padding-top: var(--bf-lock-top) !important;
        margin: 0 !important;
        overflow-x: hidden !important;
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

      body.site-skin-managed > header,
      body.site-skin-managed > main,
      body.site-skin-managed > footer,
      body.site-skin-managed .bf-header,
      body.site-skin-managed .header,
      body.site-skin-managed .bf-page,
      body.site-skin-managed .wc-page,
      body.site-skin-managed .page-shell,
      body.site-skin-managed .match-page-wrap,
      body.site-skin-managed .standings-page-wrap,
      body.site-skin-managed .results-page-section,
      body.site-skin-managed .news-page-wrap,
      body.site-skin-managed .ai-insights-page,
      body.site-skin-managed .article-page-wrap {
        position: relative !important;
        z-index: 20 !important;
      }

      body.site-skin-managed .bf-header,
      body.site-skin-managed .header {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }

      body.site-skin-managed .bf-header-inner,
      body.site-skin-managed .header-inner {
        width: min(var(--bf-lock-shell), calc(100vw - var(--bf-lock-gap))) !important;
        max-width: var(--bf-lock-shell) !important;
        min-height: 82px !important;
        height: auto !important;
        margin: 0 auto !important;
        padding: 14px 24px !important;
        display: flex !important;
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

      body.site-skin-managed .bf-header-inner::after,
      body.site-skin-managed .header-inner::after {
        content: none !important;
        display: none !important;
      }

      body.site-skin-managed .bf-logo,
      body.site-skin-managed .site-logo {
        flex: 0 0 auto !important;
        width: auto !important;
        min-width: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 10px !important;
        margin: 0 !important;
        color: #ffffff !important;
        font-size: 23px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        letter-spacing: -0.045em !important;
        white-space: nowrap !important;
        text-decoration: none !important;
        transform: none !important;
      }

      body.site-skin-managed .bf-logo img,
      body.site-skin-managed .site-logo img {
        width: 38px !important;
        height: 38px !important;
        object-fit: contain !important;
      }

      body.site-skin-managed .bf-nav,
      body.site-skin-managed .topbar-menu {
        flex: 0 1 auto !important;
        width: auto !important;
        max-width: calc(100% - 260px) !important;
        margin: 0 0 0 auto !important;
        padding: 0 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-end !important;
        gap: 10px !important;
        flex-wrap: nowrap !important;
        overflow: visible !important;
        transform: none !important;
      }

      body.site-skin-managed .bf-nav a,
      body.site-skin-managed .topbar-menu a {
        flex: 0 0 auto !important;
        width: auto !important;
        min-width: 0 !important;
        height: 42px !important;
        min-height: 42px !important;
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
        white-space: nowrap !important;
        text-decoration: none !important;
        box-shadow: none !important;
        transform: none !important;
      }

      body.site-skin-managed .bf-nav a:hover,
      body.site-skin-managed .topbar-menu a:hover,
      body.site-skin-managed .bf-nav a.active,
      body.site-skin-managed .topbar-menu a.active {
        color: var(--bf-lock-green) !important;
        background: rgba(25, 126, 84, 0.34) !important;
        border-color: rgba(73, 224, 145, 0.34) !important;
        box-shadow: 0 0 22px rgba(73, 224, 145, 0.08) !important;
        transform: none !important;
      }

      body.site-skin-managed .bf-page,
      body.site-skin-managed .wc-page,
      body.site-skin-managed .page-shell,
      body.site-skin-managed .match-page-wrap,
      body.site-skin-managed .standings-page-wrap,
      body.site-skin-managed .news-page-wrap,
      body.site-skin-managed .ai-insights-page,
      body.site-skin-managed .article-page-wrap {
        width: min(var(--bf-lock-shell), calc(100vw - var(--bf-lock-gap))) !important;
        max-width: var(--bf-lock-shell) !important;
        margin: var(--bf-lock-page-top) auto 0 !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        box-sizing: border-box !important;
        transform: none !important;
      }

      body.site-skin-managed .side-banner,
      body.site-skin-managed .left-banner,
      body.site-skin-managed .right-banner {
        z-index: 30 !important;
      }

      @media (max-width: 1100px) {
        body.site-skin-managed .bf-header-inner,
        body.site-skin-managed .header-inner {
          width: calc(100% - 24px) !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 12px !important;
        }

        body.site-skin-managed .bf-nav,
        body.site-skin-managed .topbar-menu {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          justify-content: center !important;
          flex-wrap: wrap !important;
        }
      }

      @media (max-width: 768px) {
        body.site-skin-1win,
        body.site-skin-dafabet,
        body.site-skin-mostbet,
        body.site-skin-managed {
          padding-top: 96px !important;
        }

        body.site-skin-managed .bf-header-inner,
        body.site-skin-managed .header-inner {
          width: calc(100% - 16px) !important;
          max-width: calc(100% - 16px) !important;
          min-height: 0 !important;
          margin: 6px auto 0 !important;
          padding: 12px 10px !important;
          border-radius: 18px !important;
        }

        body.site-skin-managed .bf-logo,
        body.site-skin-managed .site-logo {
          width: 100% !important;
          justify-content: center !important;
          font-size: 20px !important;
        }

        body.site-skin-managed .bf-logo img,
        body.site-skin-managed .site-logo img {
          width: 30px !important;
          height: 30px !important;
        }

        body.site-skin-managed .bf-nav,
        body.site-skin-managed .topbar-menu {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 7px !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        body.site-skin-managed .bf-nav a,
        body.site-skin-managed .topbar-menu a {
          width: 100% !important;
          height: 38px !important;
          min-height: 38px !important;
          padding: 9px 4px !important;
          border-radius: 13px !important;
          font-size: 12px !important;
          line-height: 1.1 !important;
          text-align: center !important;
          white-space: normal !important;
        }

        body.site-skin-managed .bf-page,
        body.site-skin-managed .wc-page,
        body.site-skin-managed .page-shell,
        body.site-skin-managed .match-page-wrap,
        body.site-skin-managed .standings-page-wrap,
        body.site-skin-managed .news-page-wrap,
        body.site-skin-managed .ai-insights-page,
        body.site-skin-managed .article-page-wrap {
          width: calc(100% - 16px) !important;
          max-width: calc(100% - 16px) !important;
          margin: 14px auto 0 !important;
        }
      }

      @media (max-width: 420px) {
        body.site-skin-1win,
        body.site-skin-dafabet,
        body.site-skin-mostbet,
        body.site-skin-managed {
          padding-top: 88px !important;
        }

        body.site-skin-managed .bf-header-inner,
        body.site-skin-managed .header-inner,
        body.site-skin-managed .bf-page,
        body.site-skin-managed .wc-page,
        body.site-skin-managed .page-shell,
        body.site-skin-managed .match-page-wrap,
        body.site-skin-managed .standings-page-wrap,
        body.site-skin-managed .news-page-wrap,
        body.site-skin-managed .ai-insights-page,
        body.site-skin-managed .article-page-wrap {
          width: calc(100% - 12px) !important;
          max-width: calc(100% - 12px) !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function runLayoutLock() {
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
      codeZone: null
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runLayoutLock, { once: true });
  } else {
    runLayoutLock();
  }
})();
