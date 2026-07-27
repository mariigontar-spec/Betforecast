/* Betforecast.ai dynamic background manager v21 */
(() => {
  "use strict";

  const BG_ZONE = "163743";
  const BG_SLOT_ID = "bf-dynamic-background-slot";
  const STYLE_ID = "bf-dynamic-background-layout-style";
  const AD_SCRIPT_SRC = "https://media.getads.online/js/code.min.js";
  const LEGACY_IMAGE = "1win-wc2026-site-skin.webp";

  function removeOldLayers() {
    document
      .querySelectorAll(".skin-click, .skin-click-top, .skin-click-left, .skin-click-right")
      .forEach((element) => element.remove());

    document
      .querySelectorAll(".bf-adserver-background, #bf-adserver-background-slot, #bf-dynamic-background-slot")
      .forEach((element) => element.remove());

    document
      .querySelectorAll(`ins.ins-zone[data-zone="${BG_ZONE}"]`)
      .forEach((ins) => {
        const parent = ins.parentElement;
        const isBgParent = parent && /background|skin|bg|dynamic/i.test(parent.className || parent.id || "");
        if (isBgParent || parent === document.body) ins.remove();
      });
  }

  function stripOldImageCss() {
    Array.from(document.styleSheets).forEach((sheet) => {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch (error) {
        return;
      }

      Array.from(rules || []).forEach((rule) => {
        if (!rule.cssText || !rule.style || !rule.cssText.includes(LEGACY_IMAGE)) return;
        ["background", "background-image", "background-position", "background-size", "background-repeat", "background-attachment"].forEach((prop) => {
          rule.style.removeProperty(prop);
        });
      });
    });
  }

  function createBackgroundSlot() {
    const slot = document.createElement("div");
    slot.id = BG_SLOT_ID;
    slot.className = "bf-dynamic-background bf-adserver-background";
    slot.setAttribute("aria-hidden", "true");
    slot.innerHTML = `<ins class="ins-zone" data-zone="${BG_ZONE}"></ins>`;
    document.body.insertBefore(slot, document.body.firstChild);
    return slot;
  }

  function injectStyle() {
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
          radial-gradient(circle at 18% 0%, rgba(22, 117, 84, 0.10), transparent 31rem),
          radial-gradient(circle at 88% 22%, rgba(24, 86, 126, 0.10), transparent 28rem),
          linear-gradient(180deg, #07111d 0, #050b13 36rem, #02070d 100%) !important;
        background-repeat: no-repeat !important;
        background-position: center top !important;
        background-attachment: scroll !important;
        background-color: #020b13 !important;
      }

      html body.site-skin-managed #${BG_SLOT_ID} {
        position: fixed !important;
        inset: 0 auto auto 0 !important;
        width: 100% !important;
        height: 100vh !important;
        min-height: var(--bf-lock-top) !important;
        overflow: visible !important;
        z-index: 1 !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        background: transparent !important;
      }

      html body.site-skin-managed #${BG_SLOT_ID} .ins-zone,
      html body.site-skin-managed #${BG_SLOT_ID} iframe,
      html body.site-skin-managed #${BG_SLOT_ID} > div {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        min-height: var(--bf-lock-top) !important;
        overflow: visible !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      html body.site-skin-managed > header,
      html body.site-skin-managed > main,
      html body.site-skin-managed > footer,
      html body.site-skin-managed .bf-header,
      html body.site-skin-managed .header,
      html body.site-skin-managed .bf-page,
      html body.site-skin-managed .wc-page,
      html body.site-skin-managed .page-shell,
      html body.site-skin-managed .match-page-wrap,
      html body.site-skin-managed .standings-page-wrap,
      html body.site-skin-managed .results-page-section,
      html body.site-skin-managed .news-page-wrap,
      html body.site-skin-managed .ai-insights-page,
      html body.site-skin-managed .article-page-wrap {
        position: relative !important;
        z-index: 20 !important;
      }

      html body.site-skin-managed .bf-header,
      html body.site-skin-managed .header {
        width: 100% !important;
        max-width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background: transparent !important;
        border: 0 !important;
        box-shadow: none !important;
        transform: none !important;
      }

      html body.site-skin-managed .bf-header-inner,
      html body.site-skin-managed .header-inner {
        width: min(var(--bf-lock-shell), calc(100vw - var(--bf-lock-gap))) !important;
        max-width: var(--bf-lock-shell) !important;
        min-width: 0 !important;
        min-height: 82px !important;
        height: auto !important;
        margin: 0 auto !important;
        padding: 14px 24px !important;
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

      html body.site-skin-managed .bf-header-inner::before,
      html body.site-skin-managed .bf-header-inner::after,
      html body.site-skin-managed .header-inner::before,
      html body.site-skin-managed .header-inner::after {
        content: none !important;
        display: none !important;
      }

      html body.site-skin-managed .bf-logo,
      html body.site-skin-managed .site-logo {
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

      html body.site-skin-managed .bf-logo img,
      html body.site-skin-managed .site-logo img {
        display: block !important;
        width: 38px !important;
        height: 38px !important;
        object-fit: contain !important;
      }

      html body.site-skin-managed .bf-nav,
      html body.site-skin-managed .topbar-menu {
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
        gap: 10px !important;
        flex-wrap: nowrap !important;
        overflow: visible !important;
        transform: none !important;
      }

      html body.site-skin-managed .topbar-actions,
      html body.site-skin-managed .theme-switch {
        display: none !important;
      }

      html body.site-skin-managed .bf-nav a,
      html body.site-skin-managed .topbar-menu a {
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
        white-space: nowrap !important;
        text-decoration: none !important;
        box-shadow: none !important;
        transform: none !important;
        box-sizing: border-box !important;
      }

      html body.site-skin-managed .bf-nav a:hover,
      html body.site-skin-managed .topbar-menu a:hover,
      html body.site-skin-managed .bf-nav a.active,
      html body.site-skin-managed .topbar-menu a.active {
        color: var(--bf-lock-green) !important;
        background: rgba(25, 126, 84, 0.34) !important;
        border-color: rgba(73, 224, 145, 0.34) !important;
        box-shadow: 0 0 22px rgba(73, 224, 145, 0.08) !important;
        transform: none !important;
      }

      html body.site-skin-managed > main,
      html body.site-skin-managed .bf-page,
      html body.site-skin-managed .wc-page,
      html body.site-skin-managed .page-shell,
      html body.site-skin-managed .match-page-wrap,
      html body.site-skin-managed .standings-page-wrap,
      html body.site-skin-managed .results-page-section,
      html body.site-skin-managed .news-page-wrap,
      html body.site-skin-managed .ai-insights-page,
      html body.site-skin-managed .article-page-wrap {
        width: min(var(--bf-lock-shell), calc(100vw - var(--bf-lock-gap))) !important;
        max-width: var(--bf-lock-shell) !important;
        min-width: 0 !important;
        margin-left: auto !important;
        margin-right: auto !important;
        margin-top: var(--bf-lock-page-top) !important;
        transform: none !important;
        box-sizing: border-box !important;
      }

      @media (max-width: 1100px) {
        html body.site-skin-managed .bf-header-inner,
        html body.site-skin-managed .header-inner {
          width: calc(100% - 24px) !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 12px !important;
        }

        html body.site-skin-managed .bf-nav,
        html body.site-skin-managed .topbar-menu {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          justify-content: center !important;
          flex-wrap: wrap !important;
        }
      }

      @media (max-width: 768px) {
        html body.site-skin-1win,
        html body.site-skin-dafabet,
        html body.site-skin-mostbet,
        html body.site-skin-managed {
          padding-top: var(--bf-lock-mobile-top) !important;
        }

        html body.site-skin-managed #${BG_SLOT_ID},
        html body.site-skin-managed #${BG_SLOT_ID} .ins-zone,
        html body.site-skin-managed #${BG_SLOT_ID} iframe,
        html body.site-skin-managed #${BG_SLOT_ID} > div {
          min-height: var(--bf-lock-mobile-top) !important;
        }

        html body.site-skin-managed .bf-header-inner,
        html body.site-skin-managed .header-inner {
          width: calc(100% - 16px) !important;
          max-width: calc(100% - 16px) !important;
          min-height: 0 !important;
          margin: 6px auto 0 !important;
          padding: 12px 10px !important;
          border-radius: 18px !important;
        }

        html body.site-skin-managed .bf-logo,
        html body.site-skin-managed .site-logo {
          width: 100% !important;
          justify-content: center !important;
          font-size: 20px !important;
        }

        html body.site-skin-managed .bf-logo img,
        html body.site-skin-managed .site-logo img {
          width: 30px !important;
          height: 30px !important;
        }

        html body.site-skin-managed .bf-nav,
        html body.site-skin-managed .topbar-menu {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 7px !important;
          width: 100% !important;
          max-width: 100% !important;
        }

        html body.site-skin-managed .bf-nav a,
        html body.site-skin-managed .topbar-menu a {
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

        html body.site-skin-managed > main,
        html body.site-skin-managed .bf-page,
        html body.site-skin-managed .wc-page,
        html body.site-skin-managed .page-shell,
        html body.site-skin-managed .match-page-wrap,
        html body.site-skin-managed .standings-page-wrap,
        html body.site-skin-managed .results-page-section,
        html body.site-skin-managed .news-page-wrap,
        html body.site-skin-managed .ai-insights-page,
        html body.site-skin-managed .article-page-wrap {
          width: calc(100% - 16px) !important;
          max-width: calc(100% - 16px) !important;
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

  function ensureAdhitScript(slot) {
    window.setTimeout(() => {
      const existing = document.querySelector('script[src*="media.getads.online/js/code.min.js"]');

      if (!existing) {
        const script = document.createElement("script");
        script.id = "bf-adserver-script";
        script.dataset.cfasync = "false";
        script.async = true;
        script.src = AD_SCRIPT_SRC;
        document.body.appendChild(script);
        return;
      }

      if (!existing.id) existing.id = "bf-adserver-script";

      window.setTimeout(() => {
        const hasRenderedBackground = slot.querySelector("iframe, div:not(.ins-zone)");
        const refreshExists = document.getElementById("bf-adserver-background-refresh");
        if (hasRenderedBackground || refreshExists) return;

        const refresh = document.createElement("script");
        refresh.id = "bf-adserver-background-refresh";
        refresh.dataset.cfasync = "false";
        refresh.async = true;
        refresh.src = `${AD_SCRIPT_SRC}?bf-bg-v=21`;
        document.body.appendChild(refresh);
      }, 700);
    }, 0);
  }

  function run() {
    if (!document.body || document.body.dataset.bfDynamicBackgroundReady === "true") return;

    document.body.dataset.bfDynamicBackgroundReady = "true";
    document.body.classList.add("site-skin-managed");

    removeOldLayers();
    stripOldImageCss();
    injectStyle();

    const slot = createBackgroundSlot();
    ensureAdhitScript(slot);

    window.BF_ACTIVE_SITE_SKIN = {
      mode: "dynamic-adhit-background",
      codeZone: BG_ZONE,
      version: 21
    };
  }

  if (document.body) {
    run();
  } else {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  }
})();