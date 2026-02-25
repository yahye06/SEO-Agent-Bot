import Link from 'next/link'; // from next.js nav pages wo reloading

export default function Home() { //creates homepage
  return (
    <main style={{
      padding: "3rem",
      maxWidth: "1200px",
      margin: "0 auto",
      color: '#c124ed',
  backgroundColor: "#000000",  // 👈 CHANGE THIS LINE
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>
          SEO Agent Bot Project
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', color: '#fcfcfc' }}>
          Yahye Abdukadir's Project
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
  {/* Week 4: Batch Generation */}
          <Link
            href="/batch"
            style={{
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '2rem',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              height: '100%'
            }}>

            <h2 style={{ margin: '0 0 1rem 0' }}>Batch Generator</h2>
            <p style={{ opacity: 0.9, lineHeight: '1.6',  }}>
              Upload CSV files and generate SEO-optimized content at scale.
              Perfect for creating multiple articles from a topic list.
            </p>
            <div style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              Week 4: Programmatic SEO
            </div>
          </div>
        </Link>

        {/* Week 5: Optimization */}
        <Link
          href="/optimize"
          style={{
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white',
            padding: '2rem',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            height: '100%'
          }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Performance Optimizer</h2>
            <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
              Analyze content performance with real analytics.
              Get AI-powered suggestions to improve low-performing pages.
            </p>
            <div style={{
              marginTop: '1.5rem',
              padding: '0.5rem 1rem',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '6px',
              fontSize: '0.9rem'
            }}>
              Week 5: Feedback Loop
            </div>
          </div>
        </Link>
      </div>

      {/* Features Overview */}
      <div style={{
        marginTop: '4rem',
        padding: '2rem',
        background: '#f9fafb',
        borderRadius: '12px'
      }}>
        <h2 style={{ marginTop: 0, color: '#000', fontWeight: 'bold', fontSize: '1.5rem' }}>Key Features</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem',color: '#000', margin: '0 0 0.5rem 0' }}>🎯 Smart Templates</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
              Generate SEO-optimized titles, meta descriptions, and content from templates
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#000', margin: '0 0 0.5rem 0' }}>📊 Analytics Integration</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
              Track clicks, impressions, and CTR to identify optimization opportunities
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#000', margin: '0 0 0.5rem 0' }}>⚡ Batch Processing</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
              Process multiple topics simultaneously with built-in safety limits
            </p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#000',  margin: '0 0 0.5rem 0' }}>🔄 Auto-Optimization</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem' }}>
              AI suggests improvements for low-performing content automatically
            </p>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        background: '#fff',
        border: '12px solid #e5e7eb',
        borderRadius: '12px'
      }}>
        <h2 style={{ marginTop: 0, color: '#000', fontWeight: 'bold', fontSize: '1.5rem' }}>Instructions</h2>
        <ol style={{ lineHeight: '2', color: '#0a0a0a' }}>
          <li>1. Click <strong>Batch Generator</strong> to upload a CSV and create content</li>
          <li>2. Review generated drafts with SEO metadata</li>
          <li>3. Visit <strong>Performance Optimizer</strong> to see analytics</li>
          <li>4. Optimize low-performing content with one click</li>
        </ol>
      </div>
    </main>
  );
}