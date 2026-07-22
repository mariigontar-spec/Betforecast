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

      body.site-skin-managed:not(.home-page),
      body.site-skin-managed.site-skin-1win:not(.home-page),
      body.site-skin-managed.site-skin-dafabet:not(.home-page),
      body.site-skin-managed.site-skin-mostbet:not(.home-page) {
        background-image: none !important;
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
      .news-page-wrap {
        position: relative !important;
        z-index: 20 !important;
      }

      @media (max-width: 768px) {
        body.site-skin-managed,
        body.site-skin-1win,
        body.site-skin-dafabet,
        body.site-skin-mostbet {
          padding-top: 100px !important;
          background-size: auto 300px !important;
        }

        body.site-skin-managed:not(.home-page),
        body.site-skin-managed.site-skin-1win:not(.home-page),
        body.site-skin-managed.site-skin-dafabet:not(.home-page),
        body.site-skin-managed.site-skin-mostbet:not(.home-page) {
          background-image: none !important;
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

    slot.innerHTML = `<ins class="ins-zone" data-zone="${ZONE}"></ins>`;
    return slot;
  }

  function loadAdhitScript() {
    document.getElementById(SCRIPT_ID)?.remove();

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.dataset.cfasync = "false";
    script.async = true;
    script.src = `https://media.getads.online/js/code.min.js?bf-bg=${Date.now()}`;
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
