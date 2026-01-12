"use client";

import { useState } from "react";

export default function Home() {
  const [domain, setDomain] = useState("");
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/seo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain, topic }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>SEO Agent</h1>
      <p>Enter a domain and topic to generate SEO ideas.</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="example.com"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
        />
        <br />

        <input
          placeholder="SEO topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <br />

        <button type="submit">
          {loading ? "Generating..." : "Generate"}
        </button>
      </form>

      {result && (
        <div>
          <h2>Keywords</h2>
          <ul>
            {result.keywords.map((k: string) => (
              <li key={k}>{k}</li>
            ))}
          </ul>

          <h2>Content Brief</h2>
          <p>{result.brief}</p>
        </div>
      )}
    </main>
  );
}
