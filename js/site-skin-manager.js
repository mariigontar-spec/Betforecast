/* Betforecast.ai stable Adhit background manager v25 */
(() => {
  "use strict";

  const BG_ZONE = "163743";
  const BG_SLOT_ID = "bf-dynamic-background-slot";
  const STYLE_ID = "bf-dynamic-background-stable-style";
  const AD_SCRIPT_SRC = "https://media.getads.online/js/code.min.js";
  const MOBILE_QUERY = "(max-width: 760px)";

  function isMobile() {
    return window.matchMedia(MOBILE_QUERY).matches;
  }

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${BG_SLOT_ID} {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        min-width: 100% !important;
        min-height: 190px !important;
        overflow: visible !important;
        z-index: 1 !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: auto !important;
        background: transparent !important;
      }

      #${BG_SLOT_ID} > .ins-zone,
      #${BG_SLOT_ID} > iframe,
      #${BG_SLOT_ID} > div {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
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
      .page-shell,
      .match-page-wrap,
      .standings-page-wrap,
      .results-page-section,
      .news-page-wrap,
      .ai-insights-page,
      .article-page-wrap {
        position: relative !important;
        z-index: 20 !important;
      }

      @media (max-width: 760px) {
        html body.site-skin-1win,
        html body.site-skin-dafabet,
        html body.site-skin-mostbet,
        html body.site-skin-managed,
        html body.page-news.site-skin-1win {
          padding-top: 10px !important;
          background-color: #020b13 !important;
          background-image: none !important;
          background: linear-gradient(180deg, #07111d 0%, #020b13 100%) !important;
          background-repeat: no-repeat !important;
          background-position: center top !important;
          background-size: auto !important;
        }

        #${BG_SLOT_ID},
        #${BG_SLOT_ID} * {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
          min-width: 0 !important;
          min-height: 0 !important;
          overflow: hidden !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        .skin-click,
        .skin-click-top,
        .skin-click-left,
        .skin-click-right {
          display: none !important;
          pointer-events: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureSlot() {
    let slot = document.getElementById(BG_SLOT_ID);

    if (!slot) {
      slot = document.createElement("div");
      slot.id = BG_SLOT_ID;
      slot.className = "bf-dynamic-background bf-adserver-background";
      slot.setAttribute("aria-hidden", "true");
      document.body.insertBefore(slot, document.body.firstChild);
    }

    let ins = slot.querySelector(`ins.ins-zone[data-zone="${BG_ZONE}"]`);
    if (!ins) {
      slot.innerHTML = `<ins class="ins-zone" data-zone="${BG_ZONE}"></ins>`;
    }

    return slot;
  }

  function disableMobileBackgroundSlot() {
    const slot = document.getElementById(BG_SLOT_ID);
    if (slot) {
      slot.replaceChildren();
      slot.dataset.mobileDisabled = "true";
      slot.setAttribute("aria-hidden", "true");
    }

    document
      .querySelectorAll(".skin-click, .skin-click-top, .skin-click-left, .skin-click-right")
      .forEach((element) => element.remove());
  }

  function ensureAdScript() {
    if (isMobile()) return;

    const loadIfMissing = () => {
      const existing = document.querySelector('script[src*="media.getads.online/js/code.min.js"]');
      if (existing) return;

      const script = document.createElement("script");
      script.id = "bf-adserver-script";
      script.dataset.cfasync = "false";
      script.async = true;
      script.src = AD_SCRIPT_SRC;
      document.body.appendChild(script);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadIfMissing, { once: true });
    } else {
      window.setTimeout(loadIfMissing, 0);
    }
  }

  function run() {
    if (!document.body) return;

    ensureStyle();

    if (isMobile()) {
      disableMobileBackgroundSlot();
      document.body.classList.add("site-skin-managed", "site-skin-mobile-clean");
      document.body.classList.remove("site-skin-mobile-static");
      document.body.dataset.bfDynamicBackgroundReady = "mobile-clean";

      window.BF_ACTIVE_SITE_SKIN = {
        mode: "clean-mobile-background",
        codeZone: null,
        version: 25
      };
      return;
    }

    ensureSlot();
    ensureAdScript();

    document.body.classList.add("site-skin-managed");
    document.body.classList.remove("site-skin-mobile-static", "site-skin-mobile-clean");
    document.body.dataset.bfDynamicBackgroundReady = "true";

    window.BF_ACTIVE_SITE_SKIN = {
      mode: "dynamic-adhit-background",
      codeZone: BG_ZONE,
      version: 25
    };
  }

  if (document.body) {
    run();
  } else {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  }
})();
