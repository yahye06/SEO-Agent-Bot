import fs from 'fs';

interface Draft {
  topic: string;
  pageTitle: string;
  draft: string;
  clicks?: number;
  impressions?: number;
}

// Mock analytics (real data would come from Google Search Console, etc.)
const analytics: Record<string, { clicks: number; impressions: number }> = {
  'email marketing': { clicks: 20, impressions: 100 },
  'content strategy': { clicks: 5, impressions: 50 },
  'technical seo': { clicks: 2, impressions: 30 },
};

// Load existing drafts
const drafts: Draft[] = JSON.parse(fs.readFileSync('./drafts.json', 'utf-8'));

// Simple feedback loop: boost topics with low CTR
drafts.forEach((d) => {
  const data = analytics[d.topic];
  if (data) {
    const ctr = data.clicks / data.impressions;
    if (ctr < 0.1) {
      // optimize title
      d.draft += ' | Updated for higher CTR';
      console.log(`Optimized draft for "${d.topic}":`, d.draft);
    }
  }
});

// Save optimized drafts
fs.writeFileSync('./drafts.json', JSON.stringify(drafts, null, 2));
console.log('Optimization complete!');
