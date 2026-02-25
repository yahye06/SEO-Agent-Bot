'use client';

import { useState } from 'react';

export default function BatchPage() {
  const [topics, setTopics] = useState<string[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Handle CSV upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').slice(1); // Skip header
      const cleanTopics = lines
        .map(line => line.trim())
        .filter(Boolean)
        .slice(0, 5); // Limit to 5 topics
      setTopics(cleanTopics);
    };
    reader.readAsText(file);
  };

  // Generate drafts
  const generateDrafts = async () => {
    setLoading(true);
    const newDrafts = topics.map(topic => ({
      topic,
      title: `Complete Guide to ${topic}`,
      metaDescription: `Learn everything about ${topic}. Expert tips, strategies, and best practices.`,
      h1: `${topic}: Ultimate Guide`,
      draft: `This is an SEO-optimized article about ${topic}. It includes best practices, key strategies, and actionable insights to help you succeed with ${topic}.`,
      createdAt: new Date().toISOString(),
    }));

    setDrafts(newDrafts);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>📊 Batch SEO Generator (Week 4)</h1>
      <p>Upload a CSV file with topics to generate SEO content at scale</p>

      <div style={{
        background: '#f5f5f5',
        padding: '2rem',
        borderRadius: '8px',
        marginTop: '2rem',
        color: '#0a0a0a',
      }}>
        <h2>Step 1: Upload CSV</h2>
        <p style={{ fontSize: '0.9rem', color: '#0a0a0a' }}>
          CSV format: First row = header, then one topic per line
        </p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          style={{
            padding: '0.5rem',
            marginTop: '1rem',
            display: 'block'
          }}
        />

        {topics.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <strong>✅ Loaded {topics.length} topics:</strong>
            <ul>
              {topics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {topics.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <button
            onClick={generateDrafts}
            disabled={loading}
            style={{
              background: '#0070f3',
              color: 'white',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? 'Generating...' : '🚀 Generate SEO Drafts'}
          </button>
        </div>
      )}

      {drafts.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2>📝 Generated Drafts ({drafts.length})</h2>
          {drafts.map((draft, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              <h3 style={{ color: '#0070f3', margin: '0 0 1rem 0' }}>
                {draft.topic}
              </h3>
              <div style={{ fontSize: '0.9rem' }}>
                <p><strong>Title:</strong> {draft.title}</p>
                <p><strong>Meta Description:</strong> {draft.metaDescription}</p>
                <p><strong>H1:</strong> {draft.h1}</p>
                <p><strong>Content Preview:</strong></p>
                <p style={{
                  background: '#f9f9f9',
                  padding: '1rem',
                  borderLeft: '3px solid #0070f3'
                }}>
                  {draft.draft}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#999' }}>
                  Created: {new Date(draft.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}