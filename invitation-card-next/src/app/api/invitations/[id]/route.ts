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
      createdAt: row.createdAt?.toISOString() ?? null,
    })
  } catch (e) {
    console.error('GET /api/invitations/[id]', e)
    return NextResponse.json({ error: '获取失败' }, { status: 500 })
  }
}

/** PUT: 更新请柬（全量替换 formData、templateId） */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const row = await prisma.invitation.findUnique({ where: { id } })
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const body = await req.json()
    const formData = body.formData
    const templateId = body.templateId

    if (!formData || typeof formData !== 'object') {
      return NextResponse.json({ error: 'formData required' }, { status: 400 })
    }

    await prisma.invitation.update({
      where: { id },
      data: {
        formData: JSON.stringify(formData),
        ...(templateId != null && { templateId: Number(templateId) }),
      },
    })

    return NextResponse.json({ id })
  } catch (e) {
    console.error('PUT /api/invitations/[id]', e)
    return NextResponse.json({ error: '更新失败' }, { status: 500 })
  }
}

/** PATCH: 部分更新请柬（仅更新传入的字段） */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const row = await prisma.invitation.findUnique({ where: { id } })
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    const body = await req.json()
    const updates: { formData?: string; templateId?: number } = {}

    if (body.formData != null && typeof body.formData === 'object') {
      updates.formData = JSON.stringify(body.formData)
    }
    if (body.templateId != null) {
      updates.templateId = Number(body.templateId)
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 })
    }

    await prisma.invitation.update({
      where: { id },
      data: updates,
    })

    return NextResponse.json({ id })
  } catch (e) {
    console.error('PATCH /api/invitations/[id]', e)
    return NextResponse.json({ error: '更新失败' }, { status: 500 })
  }
}

/** DELETE: 删除请柬 */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const row = await prisma.invitation.findUnique({ where: { id } })
    if (!row) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    await prisma.invitation.delete({ where: { id } })
    return new NextResponse(null, { status: 204 })
  } catch (e) {
    console.error('DELETE /api/invitations/[id]', e)
    return NextResponse.json({ error: '删除失败' }, { status: 500 })
  }
}
