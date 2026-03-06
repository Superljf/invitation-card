import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

/** POST: 保存请柬 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const formData = body.formData
    const templateId = body.templateId ?? 1

    if (!formData || typeof formData !== 'object') {
      return NextResponse.json({ error: 'formData required' }, { status: 400 })
    }

    const id = crypto.randomUUID().replace(/-/g, '').slice(0, 12)
    await prisma.invitation.create({
      data: {
        id,
        templateId: Number(templateId),
        formData: JSON.stringify(formData),
      },
    })

    return NextResponse.json({ id })
  } catch (e) {
    console.error('POST /api/invitations', e)
    return NextResponse.json({ error: '保存失败' }, { status: 500 })
  }
}

/** GET: 分页获取请柬列表 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') ?? '10', 10)))

    const list = await prisma.invitation.findMany({
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    const result = list.map((row) => ({
      id: row.id,
      formData: JSON.parse(row.formData),
      templateId: row.templateId,
    }))

    return NextResponse.json(result)
  } catch (e) {
    console.error('GET /api/invitations', e)
    return NextResponse.json({ error: '获取列表失败' }, { status: 500 })
  }
}
