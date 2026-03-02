import type { FormData } from '../types/formData'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8089'
console.log("🚀 ~ import.meta.env:", import.meta.env)
console.log("🚀 ~ API_BASE:", API_BASE)

export interface InvitationResponse {
  id: string
  formData: FormData
  templateId: number
}

export async function saveInvitation(
  formData: FormData,
  templateId: number
): Promise<{ id: string }> {
  const res = await fetch(`${API_BASE}/api/invitations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ formData, templateId }),
  })
  if (!res.ok) throw new Error('保存失败')
  return res.json()
}

export async function getInvitation(id: string): Promise<InvitationResponse | null> {
  const res = await fetch(`${API_BASE}/api/invitations/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('获取失败')
  return res.json()
}

export async function getAllInvitations(
  page = 1,
  pageSize = 20
): Promise<InvitationResponse[]> {
  const res = await fetch(
    `${API_BASE}/api/invitations/all?page=${page}&pageSize=${pageSize}`
  )
  if (!res.ok) throw new Error('获取列表失败')
  return res.json()
}
