window.BF_API = {
  provider: "api-football",

  key: "f2eebf6963d937cdbd298021a9490e20",

  host: "v3.football.api-sports.io",
  baseUrl: "https://v3.football.api-sports.io",

  league: 1,
  season: 2026,

  timezone: "Europe/Tallinn"
};

(function loadSiteSkinManager() {
  const scriptId = "bf-site-skin-manager-loader";

  if (document.getElementById(scriptId)) {
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = "/js/site-skin-manager.js?v=1";
  script.defer = true;
  document.head.appendChild(script);
})();

(function injectUnifiedNavActiveStyle() {
  const styleId = "bf-unified-nav-active-style";

  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
    body.theme-dark.site-skin-managed .bf-header .bf-nav a.active,
    body.theme-dark.site-skin-managed .header .topbar-menu a.active,
    body.theme-dark.site-skin-managed .bf-nav a.active,
    body.theme-dark.site-skin-managed .topbar-menu a.active,
    body.theme-dark.site-skin-1win .bf-header .bf-nav a.active,
    body.theme-dark.site-skin-1win .header .topbar-menu a.active,
    body.theme-dark.site-skin-1win .bf-nav a.active,
    body.theme-dark.site-skin-1win .topbar-menu a.active {
      color: #5ee0a4 !important;
      background: rgba(5, 66, 48, 0.72) !important;
      border-color: rgba(94, 224, 164, 0.34) !important;
      box-shadow:
        inset 0 1px 0 rgba(255, 255, 255, 0.05),
        0 0 0 1px rgba(94, 224, 164, 0.04) !important;
    }

    body.theme-dark.site-skin-managed .bf-header .bf-nav a:hover,
    body.theme-dark.site-skin-managed .header .topbar-menu a:hover,
    body.theme-dark.site-skin-managed .bf-nav a:hover,
    body.theme-dark.site-skin-managed .topbar-menu a:hover,
    body.theme-dark.site-skin-1win .bf-header .bf-nav a:hover,
    body.theme-dark.site-skin-1win .header .topbar-menu a:hover,
    body.theme-dark.site-skin-1win .bf-nav a:hover,
    body.theme-dark.site-skin-1win .topbar-menu a:hover {
      color: #5ee0a4 !important;
      background: rgba(5, 66, 48, 0.48) !important;
      border-color: rgba(94, 224, 164, 0.28) !important;
    }
  `;

  document.head.appendChild(style);
})();

(function moveHomeAdsAboveBenefits() {
  function moveAds() {
    const benefits = document.querySelector(".bf-page > .bf-benefits");
    const leaderboard = document.querySelector(".bf-page > .home-leaderboard-ad");
    const mobileBox = document.querySelector(".bf-page > .home-box-ad");

    if (!benefits || (!leaderboard && !mobileBox)) {
      return;
    }

    const fragment = document.createDocumentFragment();

    if (leaderboard) fragment.appendChild(leaderboard);
    if (mobileBox) fragment.appendChild(mobileBox);

    benefits.parentNode.insertBefore(fragment, benefits);
  }

  moveAds();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", moveAds, { once: true });
  }
})();
