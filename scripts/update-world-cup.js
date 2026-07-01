const fs = require("fs/promises");
const path = require("path");

const OUTPUT_FILE = path.join(process.cwd(), "data", "wc-2026.json");
const API_BASE = process.env.API_FOOTBALL_BASE_URL || "https://v3.football.api-sports.io";
const API_HOST = process.env.API_FOOTBALL_HOST || "v3.football.api-sports.io";
const API_KEY = process.env.API_FOOTBALL_KEY || readPublicApiConfigKey();
const LEAGUE = process.env.API_FOOTBALL_LEAGUE || "1";
const SEASON = process.env.API_FOOTBALL_SEASON || "2026";
const TIMEZONE = process.env.API_FOOTBALL_TIMEZONE || "Europe/Tallinn";

async function main() {
  if (!API_KEY) {
    throw new Error(
      "API key is missing. Add API_FOOTBALL_KEY to GitHub Secrets or keep key in api-config.js until migration is complete."
    );
  }

  const [fixtures, standingsPayload] = await Promise.all([
    apiGet("/fixtures", {
      league: LEAGUE,
      season: SEASON,
      timezone: TIMEZONE
    }),
    apiGet("/standings", {
      league: LEAGUE,
      season: SEASON
    })
  ]);

  const payload = {
    updatedAt: new Date().toISOString(),
    provider: "api-football",
    league: Number(LEAGUE),
    season: Number(SEASON),
    timezone: TIMEZONE,
    fixtures,
    standingsPayload
  };

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(payload, null, 2) + "\n", "utf8");

  console.log(
    `Updated ${OUTPUT_FILE}: ${fixtures.length} fixtures, ${standingsPayload.length} standings payload item(s).`
  );
}

async function apiGet(endpoint, params = {}) {
  const url = new URL(`${API_BASE.replace(/\/+$/, "")}${endpoint}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "x-apisports-key": API_KEY,
      "x-rapidapi-host": API_HOST
    }
  });

  if (!response.ok) {
    throw new Error(`API request failed ${endpoint}: HTTP ${response.status}`);
  }

  const data = await response.json();

  if (data?.errors && Object.keys(data.errors).length) {
    throw new Error(`API returned errors for ${endpoint}: ${JSON.stringify(data.errors)}`);
  }

  if (!Array.isArray(data?.response)) {
    throw new Error(`Unexpected API response for ${endpoint}`);
  }

  return data.response;
}

function readPublicApiConfigKey() {
  try {
    const configPath = path.join(process.cwd(), "api-config.js");
    const content = require("fs").readFileSync(configPath, "utf8");
    const match = content.match(/key:\s*["']([^"']+)["']/);
    return match ? match[1] : "";
  } catch {
    return "";
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
