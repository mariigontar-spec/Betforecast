/* Betforecast.ai — Adhit background skin loader */
(() => {
  "use strict";

  const ZONE = "163743";
  const SLOT_ID = "bf-adserver-background-slot";
  const SCRIPT_ID = "bf-adserver-background-script";
  const STYLE_ID = "bf-adserver-background-style";

  function removeOldSkinLinks() {
    document
      .querySelectorAll(".skin-click, .skin-click-top, .skin-click-left, .skin-click-right")
      .forEach((element) => element.remove());
  }

  function hasAdhitScript() {
    return Boolean(
      document.getElementById(SCRIPT_ID) ||
      document.querySelector('script[src*="media.getads.online/js/code.min.js"]')
    );
  }

  function injectStyle() {
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      body.site-skin-managed,
      body.site-skin-1win,
      body.site-skin-dafabet,
      body.site-skin-mostbet {
        padding-top: 190px !important;
        background-color: #020b13 !important;
        background-repeat: no-repeat !important;
        background-position: top center !important;
        background-size: 1920px auto !important;
      }

      .bf-adserver-background,
      #${SLOT_ID} {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        min-height: 190px !important;
        overflow: visible !important;
        opacity: 1 !important;
        visibility: visible !important;
        z-index: 1 !important;
        pointer-events: auto !important;
        background: transparent !important;
      }

      .bf-adserver-background .ins-zone,
      #${SLOT_ID} .ins-zone,
      .bf-adserver-background iframe,
      #${SLOT_ID} iframe,
      .bf-adserver-background > div,
      #${SLOT_ID} > div {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        min-height: 190px !important;
        overflow: visible !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      body > header,
      body > main,
      body > footer,
      .bf-header,
      .header,
      .bf-page,
      .wc-page,
      .match-page-wrap,
      .standings-page-wrap,
      .results-page-section,
      .news-page-wrap,
      .ai-insights-page,
      .article-page-wrap {
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
        width: min(1240px, calc(100vw - 48px)) !important;
        max-width: 1240px !important;
        min-height: 82px !important;
        margin: 0 auto !important;
        padding: 14px 24px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 22px !important;
        background: linear-gradient(180deg, rgba(18, 38, 55, 0.965), rgba(8, 20, 32, 0.98)) !important;
        border: 1px solid rgba(255, 255, 255, 0.08) !important;
        border-radius: 26px !important;
        box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34) !important;
        backdrop-filter: blur(14px) !important;
        -webkit-backdrop-filter: blur(14px) !important;
      }

      body.site-skin-managed .bf-header-inner::after,
      body.site-skin-managed .header-inner::after {
        content: none !important;
        display: none !important;
      }

      body.site-skin-managed .bf-logo,
      body.site-skin-managed .site-logo {
        flex: 0 0 auto !important;
        justify-self: auto !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        gap: 10px !important;
        margin: 0 !important;
        color: #fff !important;
        font-size: 23px !important;
        line-height: 1 !important;
        font-weight: 900 !important;
        letter-spacing: -0.045em !important;
        white-space: nowrap !important;
        text-decoration: none !important;
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
      }

      body.site-skin-managed .bf-nav a,
      body.site-skin-managed .topbar-menu a {
        flex: 0 0 auto !important;
        min-width: 0 !important;
        width: auto !important;
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
      }

      body.site-skin-managed .bf-nav a:hover,
      body.site-skin-managed .topbar-menu a:hover,
      body.site-skin-managed .bf-nav a.active,
      body.site-skin-managed .topbar-menu a.active {
        color: #6de8a9 !important;
        background: rgba(25, 126, 84, 0.34) !important;
        border-color: rgba(73, 224, 145, 0.34) !important;
        box-shadow: 0 0 22px rgba(73, 224, 145, 0.08) !important;
      }

      @media (max-width: 1100px) {
        body.site-skin-managed .bf-header-inner,
        body.site-skin-managed .header-inner {
          width: calc(100% - 24px) !important;
          display: flex !important;
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
        body.site-skin-managed,
        body.site-skin-1win,
        body.site-skin-dafabet,
        body.site-skin-mostbet {
          padding-top: 100px !important;
          background-size: auto 300px !important;
        }

        .bf-adserver-background,
        #${SLOT_ID},
        .bf-adserver-background .ins-zone,
        #${SLOT_ID} .ins-zone,
        .bf-adserver-background iframe,
        #${SLOT_ID} iframe,
        .bf-adserver-background > div,
        #${SLOT_ID} > div {
          min-height: 100px !important;
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
          min-height: 38px !important;
          padding: 9px 4px !important;
          border-radius: 13px !important;
          font-size: 12px !important;
          line-height: 1.1 !important;
          text-align: center !important;
          white-space: normal !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureBackgroundSlot() {
    let slot = document.querySelector(".bf-adserver-background");

    if (!slot) {
      slot = document.createElement("div");
      slot.id = SLOT_ID;
      slot.className = "bf-adserver-background";
      document.body.insertBefore(slot, document.body.firstChild);
    }

    if (!slot.querySelector(`.ins-zone[data-zone="${ZONE}"]`)) {
      slot.innerHTML = `<ins class="ins-zone" data-zone="${ZONE}"></ins>`;
    }

    return slot;
  }

  function loadAdhitScript() {
    if (hasAdhitScript()) {
      return;
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.dataset.cfasync = "false";
    script.async = true;
    script.src = "https://media.getads.online/js/code.min.js";
    document.body.appendChild(script);
  }

  function run() {
    document.body.classList.add("site-skin-managed");
    removeOldSkinLinks();
    injectStyle();
    ensureBackgroundSlot();
    loadAdhitScript();

    window.BF_ACTIVE_SITE_SKIN = {
      mode: "adhit-background",
      codeZone: ZONE,
      height: 190,
      mobileHeight: 100
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
