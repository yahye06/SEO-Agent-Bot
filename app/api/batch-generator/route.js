import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import Anthropic from '@anthropic-ai/sdk'

const prisma = new PrismaClient()
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request) {
  const { topics, domain } = await request.json()
  // topics = ["best running shoes", "top hiking gear"]
  // domain = "yoursite.com"

  const results = []

  for (const topic of topics) {
    // Ask Claude to generate SEO brief
    const response = await client.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1500,
      messages: [{
        role: "user",
        content: `
          Write an SEO content brief for the topic: "${topic}"
          Domain: ${domain}

          Include:
          - Target keywords (comma separated)
          - Title tag
          - Meta description
          - H2 headings outline
          - 300 word draft intro

          Be specific and optimized for search rankings.
        `
      }]
    })

    const brief = response.content[0].text

    // Extract keywords (simple approach)
    const keywords = topic.split(' ').join(', ')

    // Save to database as a Run
    const run = await prisma.run.create({
      data: {
        domain: domain || "unknown",
        topic,
        keywords,
        brief
      }
    })

    results.push(run)
  }

  return NextResponse.json({
    success: true,
    generated: results.length,
    runs: results
  })
}