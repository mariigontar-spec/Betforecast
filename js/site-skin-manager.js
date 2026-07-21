/* Betforecast.ai — Adhit background skin loader */
(() => {
  "use strict";

  const ZONE = "163743";
  const SLOT_ID = "bf-adserver-background-slot";
  const SCRIPT_ID = "bf-adserver-background-script";
  const STYLE_ID = "bf-adserver-background-style";

  function hasAdhitScript() {
    return Boolean(
      document.getElementById(SCRIPT_ID) ||
      document.querySelector('script[src*="media.getads.online/js/code.min.js"]')
    );
  }

  function run() {
    document.getElementById(SLOT_ID)?.remove();
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

      #${SLOT_ID},
      .bf-adserver-background {
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

      #${SLOT_ID} .ins-zone,
      .bf-adserver-background .ins-zone,
      #${SLOT_ID} iframe,
      .bf-adserver-background iframe,
      #${SLOT_ID} > div,
      .bf-adserver-background > div {
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
          padding-top: 120px !important;
          background-size: auto 300px !important;
        }

        #${SLOT_ID},
        .bf-adserver-background,
        #${SLOT_ID} .ins-zone,
        .bf-adserver-background .ins-zone,
        #${SLOT_ID} iframe,
        .bf-adserver-background iframe,
        #${SLOT_ID} > div,
        .bf-adserver-background > div {
          min-height: 120px !important;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.classList.add("site-skin-managed");

    let slot = document.querySelector(".bf-adserver-background");

    if (!slot) {
      slot = document.createElement("div");
      slot.id = SLOT_ID;
      slot.className = "bf-adserver-background";
      slot.innerHTML = `<ins class="ins-zone" data-zone="${ZONE}"></ins>`;
      document.body.insertBefore(slot, document.body.firstChild);
    } else if (!slot.querySelector(`.ins-zone[data-zone="${ZONE}"]`)) {
      slot.innerHTML = `<ins class="ins-zone" data-zone="${ZONE}"></ins>`;
    }

    if (!hasAdhitScript()) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.dataset.cfasync = "false";
      script.async = true;
      script.src = "https://media.getads.online/js/code.min.js";
      document.body.appendChild(script);
    }

    window.BF_ACTIVE_SITE_SKIN = {
      mode: "adhit-background",
      codeZone: ZONE,
      height: 190
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();