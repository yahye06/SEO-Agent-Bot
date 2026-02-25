// We use axios to make HTTP requests 9fetch web pages)
import axios from "axios";

// Cheerio lets us read HTML like jQuery
import * as cheerio from "cheerio";


// This defines the shape of  the page data
// Think of it as a contract: every page  will look like this
export interface PageData {
  url: string;        // Page URL
  title: string;      // Page <title>
  headings: string[]; // All Htexts
}



// Crawl a single page and return structured data
export async function crawlPage(
  url: string
): Promise<PageData | null> {
  try {
    // 1️⃣ Download the page HTML
    const res = await axios.get(url);

    // 2️⃣ Load HTML into cheerio
    const $ = cheerio.load(res.data);

    // 3️⃣ Get the <title> tag text
    const title = $("title").text() || "";

    // 4️⃣ Collect all headings
    const headings: string[] = [];
    $("h1, h2, h3").each((_, el) => {
      headings.push($(el).text());
    });

    // 5️⃣ Return structured page data
    return { url, title, headings };
  } catch (err) {
    // If anything breaks (bad URL, blocked site)
    console.error("Error crawling:", url, err);
    return null;
  }
}
