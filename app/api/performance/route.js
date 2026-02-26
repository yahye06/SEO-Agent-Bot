import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  // Get all runs
  const runs = await prisma.run.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Get all crawled pages
  const pages = await prisma.page.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Pages with missing titles or headings = need attention
  const lowPerforming = pages.filter(p => !p.title || !p.headings)

  // Runs older than 30 days with no page crawled = need attention
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  const staleRuns = runs.filter(r => new Date(r.createdAt) < thirtyDaysAgo)

  return NextResponse.json({
    totalRuns: runs.length,
    totalPages: pages.length,
    lowPerforming,        // pages missing title/headings
    staleRuns,            // old content that may need refresh
    recentRuns: runs.slice(0, 5)
  })
}