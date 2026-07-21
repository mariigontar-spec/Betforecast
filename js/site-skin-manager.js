/* Betforecast.ai — Adhit background skin loader */
(() => {
  "use strict";

  const CONFIG_URL = "/data/site-skins.json";
  const SLOT_ID = "bf-adserver-background-slot";
  const SCRIPT_ID = "bf-adserver-script";
  const STYLE_ID = "bf-adserver-background-style";
  const KNOWN_SKINS = ["1win", "dafabet", "mostbet"];

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function getParams() {
    return new URLSearchParams(window.location.search || "");
  }

  function getCountry(config) {
    const paramName = config?.testParams?.country || "country";
    return String(
      getParams().get(paramName) || window.BF_COUNTRY || window.BF_GEO || ""
    ).trim().toUpperCase();
  }

  function resolveSkinId(config) {
    const paramName = config?.testParams?.skin || "skin";
    const forced = String(getParams().get(paramName) || "").trim().toLowerCase();

    if (["off", "none", "0"].includes(forced)) return "off";
    if (KNOWN_SKINS.includes(forced) && config.skins?.[forced]?.enabled) return forced;

    const country = getCountry(config);
    const geoRule = Array.isArray(config.geoRules)
      ? config.geoRules.find((rule) => Array.isArray(rule.countries) && rule.countries.includes(country))
      : null;

    if (geoRule?.skin && config.skins?.[geoRule.skin]?.enabled) return geoRule.skin;

    const fallbackRule = Array.isArray(config.geoRules)
      ? config.geoRules.find((rule) => Array.isArray(rule.countries) && rule.countries.includes("DEFAULT"))
      : null;

    const fallback = config.defaultSkin || fallbackRule?.skin || "1win";
    return config.skins?.[fallback]?.enabled ? fallback : "off";
  }

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${SLOT_ID} {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        min-width: 100% !important;
        height: auto !important;
        min-height: 1px !important;
        overflow: visible !important;
        opacity: 1 !important;
        visibility: visible !important;
        pointer-events: none !important;
        z-index: 0 !important;
      }
      #${SLOT_ID} .ins-zone {
        display: block !important;
        width: 100% !important;
        min-width: 100% !important;
        height: auto !important;
        min-height: 1px !important;
        overflow: visible !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      body > header,
      body > main,
      body > footer,
      body > .header,
      body > .bf-header,
      body > .bf-page,
      body > .wc-page,
      body > .match-page-wrap,
      body > .standings-page-wrap,
      body > .results-page-section,
      body > .news-page-wrap {
        position: relative;
        z-index: 2;
      }
    `;
    document.head.appendChild(style);
  }

  function injectScript(src) {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing || document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.dataset.cfasync = "false";
    script.async = true;
    script.src = src;
    document.body.appendChild(script);
  }

  function injectBackground(zone, scriptSrc) {
    document.getElementById(SLOT_ID)?.remove();

    const slot = document.createElement("div");
    slot.id = SLOT_ID;
    slot.setAttribute("aria-hidden", "true");
    slot.innerHTML = `<ins class="ins-zone" data-zone="${String(zone).replace(/[^0-9]/g, "")}"></ins>`;

    document.body.insertBefore(slot, document.body.firstChild);
    injectScript(scriptSrc);
  }

  function applySkinClass(skinId, skin) {
    document.body.classList.remove("site-skin-1win", "site-skin-dafabet", "site-skin-mostbet", "site-skin-off");
    document.body.classList.add(skinId === "off" ? "site-skin-off" : (skin.bodyClass || `site-skin-${skinId}`));
    document.body.dataset.siteSkin = skinId;
  }

  async function init() {
    try {
      const response = await fetch(`${CONFIG_URL}?v=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Site skin config failed: ${response.status}`);

      const config = await response.json();
      const skinId = resolveSkinId(config);

      if (!config.enabled || skinId === "off") {
        applySkinClass("off", {});
        return;
      }

      const skin = config.skins?.[skinId];
      if (!skin?.enabled || !skin.codeZone) return;

      injectStyle();
      applySkinClass(skinId, skin);
      injectBackground(skin.codeZone, config.adScript || "https://media.getads.online/js/code.min.js");

      window.BF_ACTIVE_SITE_SKIN = {
        id: skinId,
        label: skin.label || skinId,
        codeZone: String(skin.codeZone),
        country: getCountry(config) || "default"
      };
    } catch (error) {
      console.warn("[Betforecast background]", error);
    }
  }

  ready(init);
})();
