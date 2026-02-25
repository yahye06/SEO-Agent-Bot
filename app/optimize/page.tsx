'use client';

import { useState, useEffect } from 'react';

// Mock analytics data
const mockAnalytics = {
  'email marketing': { clicks: 120, impressions: 1000, ctr: 12.0 },
  'content strategy': { clicks: 45, impressions: 600, ctr: 7.5 },
  'technical seo': { clicks: 20, impressions: 400, ctr: 5.0 },
  'social media tips': { clicks: 15, impressions: 500, ctr: 3.0 },
  'link building': { clicks: 8, impressions: 300, ctr: 2.7 },
};

export default function OptimizePage() {
  const [topics, setTopics] = useState<any[]>([]);
  const [optimized, setOptimized] = useState<any[]>([]);

  useEffect(() => {
    // Load topics with analytics
    const topicsWithData = Object.entries(mockAnalytics).map(([topic, data]) => ({
      topic,
      ...data,
      status: data.ctr < 5 ? '🔴 Needs optimization' : data.ctr < 10 ? '🟡 Could improve' : '🟢 Performing well',
      needsWork: data.ctr < 8,
    }));
    setTopics(topicsWithData);
  }, []);

  const optimizeTopic = (topic: any) => {
    const improved = {
      ...topic,
      oldTitle: `Guide to ${topic.topic}`,
      newTitle: `${topic.topic}: Proven Strategies That Get Results in 2025`,
      oldMeta: `Learn about ${topic.topic}`,
      newMeta: `Discover ${topic.topic} tactics that increased our CTR by 240%. Step-by-step guide with real examples.`,
      improvements: [
        'Added power words and numbers',
        'Included current year for freshness',
        'Added specific benefit statement',
        'Improved keyword placement',
      ],
      projectedCTR: (topic.ctr * 1.5).toFixed(1),
    };
    setOptimized([...optimized, improved]);
  };

  const optimizeAll = () => {
    const needsOptimization = topics.filter(t => t.needsWork);
    needsOptimization.forEach(topic => {
      setTimeout(() => optimizeTopic(topic), 100);
    });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>📈 SEO Optimization Dashboard (Week 5)</h1>
      <p>Analyze performance and optimize low-performing content</p>

      <div style={{
        background: '#f0f9ff',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '2rem',
        borderLeft: '4px solid #0070f3'
      }}>
        <h3>📊 Performance Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {topics.filter(t => !t.needsWork).length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Performing Well</div>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {topics.filter(t => t.needsWork).length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Need Optimization</div>
          </div>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '6px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0070f3' }}>
              {optimized.length}
            </div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Optimized</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Content Performance</h2>
          <button
            onClick={optimizeAll}
            style={{
              background: '#0070f3',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            ⚡ Optimize All Low Performers
          </button>
        </div>

        <div style={{ marginTop: '1rem' }}>
          {topics.map((topic, i) => (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0' }}>{topic.topic}</h3>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {topic.status}
                  </div>
                </div>
                {topic.needsWork && (
                  <button
                    onClick={() => optimizeTopic(topic)}
                    style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Optimize
                  </button>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                marginTop: '1rem',
                padding: '1rem',
                background: '#f9f9f9',
                borderRadius: '6px'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Clicks</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{topic.clicks}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Impressions</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{topic.impressions}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>CTR</div>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: topic.ctr < 5 ? '#ef4444' : topic.ctr < 10 ? '#f59e0b' : '#10b981'
                  }}>
                    {topic.ctr}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {optimized.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <h2>✨ Optimization Results</h2>
          {optimized.map((item, i) => (
            <div
              key={i}
              style={{
                background: '#f0fdf4',
                border: '2px solid #10b981',
                borderRadius: '8px',
                padding: '1.5rem',
                marginBottom: '1rem',
              }}
            >
              <h3 style={{ color: '#10b981', margin: '0 0 1rem 0' }}>
                {item.topic} - Optimized ✓
              </h3>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  <strong>Before:</strong>
                </div>
                <div style={{ padding: '0.75rem', background: '#fee2e2', borderRadius: '4px' }}>
                  <div><strong>Title:</strong> {item.oldTitle}</div>
                  <div><strong>Meta:</strong> {item.oldMeta}</div>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                  <strong>After:</strong>
                </div>
                <div style={{ padding: '0.75rem', background: '#d1fae5', borderRadius: '4px' }}>
                  <div><strong>Title:</strong> {item.newTitle}</div>
                  <div><strong>Meta:</strong> {item.newMeta}</div>
                </div>
              </div>

              <div style={{ fontSize: '0.9rem' }}>
                <strong>Improvements Made:</strong>
                <ul style={{ marginTop: '0.5rem' }}>
                  {item.improvements.map((imp, j) => (
                    <li key={j}>{imp}</li>
                  ))}
                </ul>
              </div>

              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'white',
                borderRadius: '6px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Current CTR</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
                    {item.ctr}%
                  </div>
                </div>
                <div style={{ fontSize: '2rem' }}>→</div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Projected CTR</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
                    {item.projectedCTR}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}