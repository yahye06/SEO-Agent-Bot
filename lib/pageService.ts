// Import only the type (no runtime JS)
import type { PageData } from "./crawler.ts";

// In-memory array (resets when program stops)
const pages: PageData[] = [];

// Save a crawled page
export function savePage(page: PageData) {
  pages.push(page);
  console.log("Saved:", page.url);
}

// Get all saved pages
export function getPages() {
  return pages;
}


