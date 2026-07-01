const fs = require("fs/promises");
const path = require("path");

const FEEDS = [
  {
    name: "BBC Football",
    url: "https://feeds.bbci.co.uk/sport/football/rss.xml",
    category: "Football"
  },
  {
    name: "ESPN Soccer",
    url: "https://www.espn.com/espn/rss/soccer/news",
    category: "Football"
  }
];

const MAX_NEWS = 30;
const OUTPUT_FILE = path.join(process.cwd(), "data", "news.json");

async function main() {
  const feedResults = await Promise.all(FEEDS.map(fetchFeed));

  const articles = feedResults
    .flat()
    .filter(Boolean)
    .filter((item) => item.title && item.sourceUrl)
    .sort((a, b) => new Date(b.pubDate || 0) - new Date(a.pubDate || 0));

  const uniqueArticles = dedupeByTitle(articles).slice(0, MAX_NEWS);

  if (!uniqueArticles.length) {
    throw new Error("No news items were collected from RSS feeds.");
  }

  const normalized = uniqueArticles.map((item, index) => normalizeArticle(item, index));

  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(normalized, null, 2) + "\n", "utf8");

  console.log(`Updated ${OUTPUT_FILE} with ${normalized.length} articles.`);
}

async function fetchFeed(feed) {
  try {
    const response = await fetch(feed.url, {
      headers: {
        "user-agent": "Betforecast.ai news cache bot/1.0"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const xml = await response.text();
    return parseRss(xml, feed);
  } catch (error) {
    console.warn(`Feed failed: ${feed.name}`, error.message);
    return [];
  }
}

function parseRss(xml, feed) {
  const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  return itemBlocks.map((block) => {
    const title = cleanText(getTag(block, "title"));
    const sourceUrl = cleanText(getTag(block, "link"));
    const descriptionHtml = getTag(block, "description") || getTag(block, "content:encoded");
    const description = truncateText(stripHtml(descriptionHtml), 240);
    const pubDate = cleanText(getTag(block, "pubDate"));
    const image = extractImage(block, descriptionHtml, title);

    return {
      title,
      sourceUrl,
      excerpt: description,
      pubDate,
      image,
      category: feed.category,
      source: feed.name
    };
  });
}

function normalizeArticle(item, index) {
  const title = item.title || "Football update";
  const excerpt = item.excerpt || "Latest football update from trusted public feeds.";
  const date = item.pubDate ? new Date(item.pubDate) : new Date();
  const safeDate = Number.isNaN(date.getTime()) ? new Date() : date;

  return {
    id: String(index + 1),
    category: item.category || "Football",
    title,
    excerpt,
    time: formatRelativeTime(safeDate),
    date: safeDate.toISOString(),
    readTime: estimateReadTime(excerpt),
    image: item.image || getKeywordFallbackImage(title, index),
    source: item.source || "RSS",
    sourceUrl: item.sourceUrl || "",
    content: buildLocalSummary(title, excerpt, item.source)
  };
}

function getTag(block, tagName) {
  const escapedTag = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, "i");
  const match = block.match(pattern);
  return match ? decodeXml(match[1].trim()) : "";
}

function extractImage(block, descriptionHtml, title) {
  const mediaMatch =
    block.match(/<media:thumbnail[^>]+url=["']([^"']+)["'][^>]*>/i) ||
    block.match(/<media:content[^>]+url=["']([^"']+)["'][^>]*>/i) ||
    block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*>/i) ||
    String(descriptionHtml || "").match(/<img[^>]+src=["']([^"']+)["']/i);

  return mediaMatch ? decodeXml(mediaMatch[1]) : getKeywordFallbackImage(title);
}

function cleanText(value = "") {
  return stripHtml(value)
    .replace(/\s+/g, " ")
    .replace(/^sources?:\s*/i, "")
    .trim();
}

function stripHtml(value = "") {
  return decodeXml(
    String(value)
      .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
      .replace(/<[^>]*>/g, " ")
  ).trim();
}

function decodeXml(value = "") {
  return String(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function dedupeByTitle(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = String(item.title || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function truncateText(text = "", maxLength = 180) {
  const clean = cleanText(text);
  if (clean.length <= maxLength) return clean;
  return clean.slice(0, maxLength).trim() + "...";
}

function formatRelativeTime(date) {
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.max(1, Math.round(diffMs / 60000));

  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hr${hours === 1 ? "" : "s"} ago`;

  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function estimateReadTime(text = "") {
  const words = cleanText(text).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function buildLocalSummary(title, excerpt, source) {
  const sourceText = source ? `Source feed: ${source}.` : "Source feed: public football RSS.";

  return [
    excerpt || `${title} is one of the latest football stories being tracked by Betforecast.ai.`,
    "This cached summary is stored locally so the website can load news quickly without asking every visitor to call an external API.",
    "For forecasting context, stories like this may affect squad availability, team momentum, tactical expectations, and market volatility.",
    sourceText
  ];
}

function getKeywordFallbackImage(title = "", index = 0) {
  const text = String(title).toLowerCase();

  if (text.includes("arsenal")) return "assets/news/arsenal.jpg";
  if (text.includes("chelsea")) return "assets/news/chelsea.jpg";
  if (text.includes("barcelona") || text.includes("barça") || text.includes("barca")) {
    return "assets/news/barcelona.jpg";
  }
  if (text.includes("liverpool")) return "assets/news/liverpool.jpg";
  if (text.includes("transfer") || text.includes("deal") || text.includes("sign")) {
    return "assets/news/transfer.jpg";
  }
  if (text.includes("injury") || text.includes("injured")) return "assets/news/injury.jpg";
  if (text.includes("title")) return "assets/news/title-race.jpg";

  const defaults = [
    "assets/news/default-1.jpg",
    "assets/news/default-2.jpg",
    "assets/news/default-3.jpg",
    "assets/news/default-4.jpg"
  ];

  return defaults[index % defaults.length];
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
