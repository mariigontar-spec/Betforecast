/* =========================================================
   Betforecast.ai — Adhit background site-skin zone
   Keeps one shared background zone across all pages.
   ========================================================= */

(function () {
  "use strict";

  const BACKGROUND_ZONE_ID = "163743";
  const BACKGROUND_SLOT_ID = "bf-adhit-background-zone";
  const BACKGROUND_STYLE_ID = "bf-adhit-background-style";
  const ADHIT_SCRIPT_SRC = "https://media.getads.online/js/code.min.js";

  function injectBackgroundStyle() {
    if (document.getElementById(BACKGROUND_STYLE_ID)) {
      return;
    }

    const style = document.createElement("style");
    style.id = BACKGROUND_STYLE_ID;
    style.textContent = `
      #bf-adhit-background-zone {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 1px !important;
        height: 1px !important;
        overflow: visible !important;
        z-index: 1 !important;
      }
    `;

    document.head.appendChild(style);
  }

  function injectBackgroundZone() {
    if (
      document.getElementById(BACKGROUND_SLOT_ID) ||
      document.querySelector(`ins.ins-zone[data-zone="${BACKGROUND_ZONE_ID}"]`)
    ) {
      return;
    }

    const slot = document.createElement("ins");
    slot.id = BACKGROUND_SLOT_ID;
    slot.className = "ins-zone";
    slot.dataset.zone = BACKGROUND_ZONE_ID;

    document.body.insertBefore(slot, document.body.firstChild);
  }

  function ensureAdhitScript() {
    const hasScript = Array.from(document.scripts).some((script) => {
      return script.src === ADHIT_SCRIPT_SRC;
    });

    if (hasScript) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.dataset.cfasync = "false";
    script.src = ADHIT_SCRIPT_SRC;

    document.body.appendChild(script);
  }

  function initAdhitBackground() {
    injectBackgroundStyle();
    injectBackgroundZone();
    ensureAdhitScript();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAdhitBackground);
  } else {
    initAdhitBackground();
  }
})();
