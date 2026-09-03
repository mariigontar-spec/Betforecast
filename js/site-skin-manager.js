/* Betforecast.ai site skin + responsive Adhit content ads v35 */
(() => {
  "use strict";

  const BG_ZONE = "163743";
  const DESKTOP_ZONE = "163631";
  const MOBILE_ZONE = "163623";
  const BG_SLOT_ID = "bf-dynamic-background-slot";
  const AD_SCRIPT_SRC = "https://media.getads.online/js/code.min.js";
  const MOBILE_QUERY = "(max-width: 760px)";

  const isMobile = () => window.matchMedia(MOBILE_QUERY).matches;

  function ensureStyle() {
    if (document.getElementById("bf-site-manager-v35")) return;
    const style = document.createElement("style");
    style.id = "bf-site-manager-v35";
    style.textContent = `
      html{width:100%!important;min-width:100%!important;background:#02070d!important}
      body>.side-banner,.side-banner-left,.side-banner-right,.left-banner,.right-banner{display:none!important}
      .bf-content-ad{position:relative!important;z-index:25!important;width:100%!important;min-height:90px;margin:24px auto!important;display:flex!important;align-items:center!important;justify-content:center!important;overflow:hidden!important}
      .bf-content-ad .bf-ad-desktop{display:flex!important;justify-content:center!important;width:728px;max-width:100%;min-height:90px}
      .bf-content-ad .bf-ad-mobile{display:none!important}
      #${BG_SLOT_ID}{position:absolute!important;top:0!important;left:0!important;width:100%!important;min-width:100%!important;min-height:190px!important;overflow:visible!important;z-index:1!important;opacity:1!important;visibility:visible!important;pointer-events:auto!important;background:transparent!important}
      #${BG_SLOT_ID}>.ins-zone,#${BG_SLOT_ID}>iframe,#${BG_SLOT_ID}>div{display:block!important;width:100%!important;max-width:100%!important;min-width:100%!important;opacity:1!important;visibility:visible!important}
      body>header,body>main,body>footer,.bf-header,.header,.bf-page,.wc-page,.page-shell,.match-page-wrap,.standings-page-wrap,.results-page-section,.news-page-wrap,.ai-insights-page,.article-page-wrap,.sports-shell{position:relative!important;z-index:20!important}
      @media(max-width:760px){
        html body.site-skin-1win,html body.site-skin-dafabet,html body.site-skin-mostbet,html body.site-skin-managed,html body.page-news.site-skin-1win{padding-top:0!important;background:radial-gradient(circle at 18% 0%,rgba(22,117,84,.17),transparent 31rem),radial-gradient(circle at 88% 22%,rgba(24,86,126,.13),transparent 28rem),linear-gradient(180deg,#07111d 0,#050b13 36rem,#02070d 100%)!important;background-attachment:scroll!important}
        #${BG_SLOT_ID},#${BG_SLOT_ID} *{display:none!important;width:0!important;height:0!important;min-width:0!important;min-height:0!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important}
        .skin-click,.skin-click-top,.skin-click-left,.skin-click-right{display:none!important;pointer-events:none!important}
        .bf-content-ad{min-height:250px;margin:18px auto!important}
        .bf-content-ad .bf-ad-desktop{display:none!important}
        .bf-content-ad .bf-ad-mobile{display:flex!important;justify-content:center!important;width:300px;max-width:100%;min-height:250px}
      }
    `;
    document.head.appendChild(style);
  }

  function removeSideAds() {
    document.querySelectorAll(".side-banner,.side-banner-left,.side-banner-right,.left-banner,.right-banner").forEach(el => el.remove());
  }

  function ensureBackground() {
    if (isMobile()) {
      const old = document.getElementById(BG_SLOT_ID);
      if (old) old.remove();
      document.querySelectorAll(".skin-click,.skin-click-top,.skin-click-left,.skin-click-right").forEach(el => el.remove());
      return;
    }
    let slot = document.getElementById(BG_SLOT_ID);
    if (!slot) {
      slot = document.createElement("div");
      slot.id = BG_SLOT_ID;
      slot.className = "bf-dynamic-background bf-adserver-background";
      slot.setAttribute("aria-hidden", "true");
      document.body.insertBefore(slot, document.body.firstChild);
    }
    if (!slot.querySelector(`ins.ins-zone[data-zone="${BG_ZONE}"]`)) slot.innerHTML = `<ins class="ins-zone" data-zone="${BG_ZONE}"></ins>`;
  }

  function ensureContentAd() {
    const main = document.querySelector("main");
    if (!main) return;

    /* Keep an existing correctly configured in-content pair instead of duplicating it. */
    const existingDesktop = main.querySelector(`ins.ins-zone[data-zone="${DESKTOP_ZONE}"]`);
    const existingMobile = main.querySelector(`ins.ins-zone[data-zone="${MOBILE_ZONE}"]`);
    if (existingDesktop && existingMobile) return;

    /* Remove incomplete/legacy content slots so every page gets one predictable responsive position. */
    main.querySelectorAll(".home-ad,.news-ad-slot,.content-banner,.banner-728,.adhit-300x250").forEach(el => {
      if (el.querySelector && (el.querySelector("ins.ins-zone") || el.matches(".home-ad,.news-ad-slot,.content-banner,.banner-728,.adhit-300x250"))) el.remove();
    });

    const ad = document.createElement("div");
    ad.className = "bf-content-ad";
    ad.setAttribute("aria-label", "Advertisement");
    ad.innerHTML = `<div class="bf-ad-desktop"><ins class="ins-zone" data-zone="${DESKTOP_ZONE}"></ins></div><div class="bf-ad-mobile"><ins class="ins-zone" data-zone="${MOBILE_ZONE}"></ins></div>`;

    const children = Array.from(main.children);
    const anchor = children.length > 2 ? children[Math.min(2, children.length - 1)] : null;
    if (anchor) anchor.insertAdjacentElement("afterend", ad); else main.appendChild(ad);
  }

  function ensureAdScript() {
    if (document.querySelector('script[src*="media.getads.online/js/code.min.js"]')) return;
    const script = document.createElement("script");
    script.dataset.cfasync = "false";
    script.async = true;
    script.src = AD_SCRIPT_SRC;
    document.body.appendChild(script);
  }

  function run() {
    if (!document.body) return;
    ensureStyle();
    removeSideAds();
    ensureBackground();
    ensureContentAd();
    ensureAdScript();
    document.body.classList.add("site-skin-managed");
    document.body.dataset.bfDynamicBackgroundReady = isMobile() ? "mobile-clean" : "true";
    window.BF_ACTIVE_SITE_SKIN = {mode:isMobile()?"clean-mobile-background":"dynamic-adhit-background",codeZone:isMobile()?null:BG_ZONE,version:35};
  }

  if (document.body) run(); else document.addEventListener("DOMContentLoaded",run,{once:true});
})();
