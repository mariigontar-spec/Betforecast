/* Betforecast.ai — Adhit top background skin loader */
(() => {
  "use strict";

  const ZONE = "163743";
  const SLOT_ID = "bf-adserver-background-slot";
  const SCRIPT_ID = "bf-adserver-background-script";
  const STYLE_ID = "bf-adserver-background-style";

  function run() {
    document.getElementById(SLOT_ID)?.remove();
    document.getElementById(SCRIPT_ID)?.remove();
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      html,
      body.site-skin-managed {
        background-image: none !important;
        background-color: #020b13 !important;
      }

      body.site-skin-managed {
        padding-top: 170px !important;
      }

      #${SLOT_ID} {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 170px !important;
        max-height: 170px !important;
        overflow: hidden !important;
        opacity: 1 !important;
        visibility: visible !important;
        z-index: 1 !important;
        pointer-events: auto !important;
        background: #020b13 !important;
      }

      #${SLOT_ID} .ins-zone,
      #${SLOT_ID} iframe,
      #${SLOT_ID} > div {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        min-width: 100% !important;
        height: 170px !important;
        max-height: 170px !important;
        overflow: hidden !important;
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
        body.site-skin-managed {
          padding-top: 100px !important;
        }

        #${SLOT_ID},
        #${SLOT_ID} .ins-zone,
        #${SLOT_ID} iframe,
        #${SLOT_ID} > div {
          height: 100px !important;
          max-height: 100px !important;
        }
      }
    `;
    document.head.appendChild(style);

    document.body.classList.add("site-skin-managed");

    const slot = document.createElement("div");
    slot.id = SLOT_ID;
    slot.innerHTML = `<ins class="ins-zone" data-zone="${ZONE}"></ins>`;
    document.body.insertBefore(slot, document.body.firstChild);

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.dataset.cfasync = "false";
    script.async = true;
    script.src = `https://media.getads.online/js/code.min.js?bf-top-bg=${Date.now()}`;
    document.body.appendChild(script);

    window.BF_ACTIVE_SITE_SKIN = {
      mode: "top-background",
      codeZone: ZONE,
      height: 170
    };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();