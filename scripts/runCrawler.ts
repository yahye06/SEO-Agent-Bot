import fs from "fs";
import { crawlPage } from "../lib/crawler.ts";
import { savePage, getPages } from "../lib/pageService.ts";

// -----------------------------
// Config & Safety Limits
// -----------------------------
const MAX_PAGES = 5; // max pages to crawl
const MAX_TOPICS = 5; // max topics to process per page
const visited = new Set<string>();
const urlsToCrawl: string[] = ["https://example.com"];
const drafts: { topic: string; pageTitle: string; draft: string }[] = [];


// -----------------------------
// SEO Template
// -----------------------------
function seoTemplate(topic: string, title: string) {
  return `SEO Draft for "${topic}" based on "${title}"`;
}

// -----------------------------
// Load & Clean CSV Topics
// -----------------------------
function loadTopics(path: string): string[] {
  return fs
    .readFileSync(path, "utf-8")
    .split("\n")
    .slice(1) // skip header
    .map((t) => t.trim())
    .filter(Boolean) // remove empty lines
    .slice(0, MAX_TOPICS); // safety limit
}

// -----------------------------
// Optional Feedback Loop
// -----------------------------
interface Analytics {
  [topic: string]: { clicks: number; impressions: number };
}

// Mock analytics for Week 5
const analytics: Analytics = {
  "email marketing": { clicks: 20, impressions: 100 },
  "content strategy": { clicks: 5, impressions: 50 },
  "technical seo": { clicks: 2, impressions: 30 },
};

// Simple feedback optimizer
function optimizeDraft(topic: string, draft: string): string {
  const data = analytics[topic];
  if (data) {
    const ctr = data.clicks / data.impressions;
    if (ctr < 0.1) {
      return draft + " | Updated for higher CTR";
    }
  }
  return draft;
}

// -----------------------------
// Main Crawler
// -----------------------------
async function run() {
  const topics = loadTopics("topics.csv");
  let count = 0;

  while (urlsToCrawl.length > 0 && count < MAX_PAGES) {
    const url = urlsToCrawl.shift()!;
    if (visited.has(url)) continue;

    const pageData = await crawlPage(url);
    if (!pageData) continue;

    for (const topic of topics) {
      let draftText = seoTemplate(topic, pageData.title);
      draftText = optimizeDraft(topic, draftText);
      console.log(draftText);

      drafts.push({
        topic,
        pageTitle: pageData.title,
        draft: draftText,
      });
    }


    savePage(pageData);
    visited.add(url);
    count++;
  }

  console.log("Crawling finished!");
  console.log("Pages collected:", getPages());

  // Save all drafts to a JSON file (optional for Week 5)
  const allDrafts = topics.map((topic) => ({
    topic,
    draft: seoTemplate(topic, getPages()[0]?.title || ""),
  }));
  fs.writeFileSync("drafts.json", JSON.stringify(allDrafts, null, 2));

fs.writeFileSync("./drafts.json", JSON.stringify(drafts, null, 2));
console.log("Drafts saved to drafts.json");



  process.exit(0);
}

// 🚀 ENTRY POINT
run();



