import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import Anthropic from '@anthropic-ai/sdk'

const prisma = new PrismaClient()
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request) {
  const { runId } = await request.json()

  // Find the run by ID
  const run = await prisma.run.findUnique({
    where: { id: runId }
  })

  if (!run) {
    return NextResponse.json({ success: false, error: "Run not found" })
  }

  // Ask Claude to improve the existing brief
  const response = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 2000,
    messages: [{
      role: "user",
      content: `
        You are an SEO expert. Improve this content brief for better rankings.

        Topic: ${run.topic}
        Domain: ${run.domain}
        Current keywords: ${run.keywords}

        Current brief:
        ${run.brief}

        Rewrite it with:
        - Stronger keyword targeting
        - Better title and meta description
        - More detailed H2/H3 structure
        - Improved intro that hooks readers
        - Add LSI keywords naturally

        Return the full improved brief.
      `
    }]
  })

  const improvedBrief = response.content[0].text

  // Save improved version back to database
  const updated = await prisma.run.update({
    where: { id: runId },
    data: { brief: improvedBrief }
  })

  return NextResponse.json({ success: true, updated })
}