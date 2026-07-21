/* Betforecast.ai — Adhit background loader */
(() => {
  "use strict";
  const ZONE = "163743";
  const SLOT_ID = "bf-adserver-background-slot";
  const SCRIPT_ID = "bf-adserver-background-script";

  function run() {
    document.getElementById(SLOT_ID)?.remove();
    document.getElementById(SCRIPT_ID)?.remove();

    const style = document.createElement("style");
    style.textContent = `
      #${SLOT_ID}{position:absolute!important;top:0!important;left:0!important;width:100%!important;min-width:100%!important;height:auto!important;min-height:1px!important;overflow:visible!important;opacity:1!important;visibility:visible!important;z-index:0!important;pointer-events:none!important}
      #${SLOT_ID} .ins-zone{display:block!important;width:100%!important;min-width:100%!important;height:auto!important;overflow:visible!important;opacity:1!important;visibility:visible!important}
      body>header,body>main,body>footer,.bf-header,.header,.bf-page,.wc-page,.match-page-wrap,.standings-page-wrap,.results-page-section,.news-page-wrap{position:relative!important;z-index:20!important}
    `;
    document.head.appendChild(style);

    const slot = document.createElement("div");
    slot.id = SLOT_ID;
    slot.setAttribute("aria-hidden", "true");
    slot.innerHTML = `<ins class="ins-zone" data-zone="${ZONE}"></ins>`;
    document.body.insertBefore(slot, document.body.firstChild);

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.dataset.cfasync = "false";
    script.async = true;
    script.src = `https://media.getads.online/js/code.min.js?bfbg=${Date.now()}`;
    document.body.appendChild(script);

    document.body.classList.add("site-skin-managed");
    window.BF_ACTIVE_SITE_SKIN = { mode: "code", codeZone: ZONE };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
