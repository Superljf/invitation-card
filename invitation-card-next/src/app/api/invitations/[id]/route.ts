import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/** GET: 按 id 获取请柬（分享链接用） */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const row = await prisma.invitation.findUnique({
      where: { id },
    })

    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: row.id,
      formData: JSON.parse(row.formData),
      templateId: row.templateId,
    })
  } catch (e) {
    console.error('GET /api/invitations/[id]', e)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}
