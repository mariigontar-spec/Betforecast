window.BF_API = {
  provider: "api-football",

  key: "f2eebf6963d937cdbd298021a9490e20",

  host: "v3.football.api-sports.io",
  baseUrl: "https://v3.football.api-sports.io",

  league: 1,
  season: 2026,

  timezone: "America/Argentina/Buenos_Aires"
};

window.BF_TIMEZONE = {
  id: "America/Argentina/Buenos_Aires",
  label: "Argentina time",
  shortLabel: "ARG"
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

(function showArgentinaTimeForTodaysSemifinal() {
  const ARGENTINA_TIME = "16:00";
  const DISPLAY_TIME = `${ARGENTINA_TIME} ARG`;
  const TARGET_DATE_PATTERNS = ["15 jul", "jul 15", "15/07", "07/15", "today", "tonight"];
  let observer;
  let patchQueued = false;

  function normalize(value) {
    return String(value || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function isEnglandArgentinaContext(element) {
    if (!element) return false;

    const text = normalize(element.textContent);
    const hasTeams = text.includes("england") && text.includes("argentina");
    const hasToday = TARGET_DATE_PATTERNS.some((pattern) => text.includes(pattern));

    return hasTeams && (hasToday || element.id === "wcFeaturedCard");
  }

  function replaceTimeText(root) {
    if (!root || !isEnglandArgentinaContext(root)) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const parentTag = node.parentElement?.tagName;
      if (parentTag === "SCRIPT" || parentTag === "STYLE") return;

      const original = node.nodeValue || "";
      const updated = original
        .replace(/\b22:00\b/g, DISPLAY_TIME)
        .replace(/\b10:00\s*PM\b/gi, DISPLAY_TIME)
        .replace(/\b04:00\s*PM\b/gi, DISPLAY_TIME)
        .replace(/\b4:00\s*PM\b/gi, DISPLAY_TIME);

      if (updated !== original) node.nodeValue = updated;
    });
  }

  function patchKnownHomeFields() {
    const featured = document.getElementById("wcFeaturedCard");
    const homeTeam = normalize(document.getElementById("wcHomeTeam")?.textContent);
    const awayTeam = normalize(document.getElementById("wcAwayTeam")?.textContent);
    const isTargetMatch =
      (homeTeam === "england" && awayTeam === "argentina") ||
      (homeTeam === "argentina" && awayTeam === "england");

    if (featured && isTargetMatch) {
      const matchDate = document.getElementById("wcMatchDate");
      const nextDateText = `15 Jul, ${DISPLAY_TIME}`;
      if (matchDate && matchDate.textContent !== nextDateText) {
        matchDate.textContent = nextDateText;
      }
      replaceTimeText(featured);
    }

    document.querySelectorAll(".bf-hero-left .bf-metric").forEach((metric) => {
      const text = normalize(metric.textContent);
      if (!text.includes("kickoff") && !text.includes("tallinn") && !text.includes("argentina time")) return;

      const strong = metric.querySelector("strong");
      const small = metric.querySelector("small");

      if (strong && strong.textContent !== ARGENTINA_TIME) {
        strong.textContent = ARGENTINA_TIME;
      }
      if (small && small.textContent !== "Argentina time") {
        small.textContent = "Argentina time";
      }
    });
  }

  function patchMatchContainers() {
    const selectors = [
      ".bf-clean-match-card",
      ".bf-line-row",
      ".wc-fixture",
      ".match-card",
      ".fixture-card",
      ".prediction-card",
      ".result-card",
      "article"
    ];

    document.querySelectorAll(selectors.join(",")).forEach((element) => {
      replaceTimeText(element);
    });
  }

  function patchPage() {
    patchQueued = false;
    patchKnownHomeFields();
    patchMatchContainers();
  }

  function queuePatch() {
    if (patchQueued) return;
    patchQueued = true;
    window.requestAnimationFrame(patchPage);
  }

  function start() {
    patchPage();

    if (!document.body || observer) return;

    observer = new MutationObserver(queuePatch);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    window.setTimeout(patchPage, 400);
    window.setTimeout(patchPage, 1000);
    window.setTimeout(patchPage, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();