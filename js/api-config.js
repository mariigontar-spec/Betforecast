/* =========================================================
   Betforecast.ai API config
   Save this file as /api-config.js in the site root.
   ========================================================= */

window.BF_API = {
  /*
    Direct API-Football / API-SPORTS mode:
    Replace PASTE_YOUR_API_KEY_HERE with the real key.
  */
  key: "PASTE_YOUR_API_KEY_HERE",
  host: "v3.football.api-sports.io",
  baseUrl: "https://v3.football.api-sports.io",

  /*
    FIFA World Cup.
    If your API provider uses a different league id, change it here only.
  */
  league: 1,
  season: 2026,

  /*
    Countdown target. Current page uses the final date.
  */
  countdownTarget: "2026-07-19T19:00:00Z",
  timezone: "Europe/Tallinn"
};

/*
  If you later use a Cloudflare Worker proxy instead of exposing the key,
  switch to this shape and keep key empty:

  window.BF_API = {
    key: "",
    host: "",
    baseUrl: "https://YOUR-WORKER.YOUR-SUBDOMAIN.workers.dev",
    league: 1,
    season: 2026,
    countdownTarget: "2026-07-19T19:00:00Z",
    timezone: "Europe/Tallinn"
  };
*/
