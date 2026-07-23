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
  script.src = "/js/site-skin-manager.js?v=10";
  script.defer = true;
  document.head.appendChild(script);
})();
