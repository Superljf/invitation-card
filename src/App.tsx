import { useEffect, useState } from 'react'
import { EditorForm } from './components/EditorForm'
import { Preview, type TemplateId } from './components/Preview'
import { defaultFormData, type FormData } from './types/formData'
import {
  saveInvitation,
  getInvitation,
  getAllInvitations,
  type InvitationResponse,
} from './api/invitation'

const STORAGE_KEY = 'invitation-form-data'
const TEMPLATE_KEY = 'invitation-template'

function loadFormData(): FormData {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    if (s) {
      const parsed = JSON.parse(s) as FormData
      return { ...defaultFormData, ...parsed }
    }
  } catch (_e) {
    /* ignore */
  }
  return { ...defaultFormData }
}

function loadTemplate(): TemplateId {
  try {
    const t = localStorage.getItem(TEMPLATE_KEY)
    if (['1', '2', '3', '4'].includes(t || '')) return Number(t) as TemplateId
  } catch (_e) {
    /* ignore */
  }
  return 1
}

function App() {
  const [formData, setFormData] = useState<FormData>(loadFormData)
  const [templateId, setTemplateId] = useState<TemplateId>(loadTemplate)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [listOpen, setListOpen] = useState(false)
  const [list, setList] = useState<InvitationResponse[]>([])
  const [listLoading, setListLoading] = useState(false)

  useEffect(() => {
    const id = new URLSearchParams(location.search).get('id')
    if (id) {
      getInvitation(id).then(res => {
        if (res) {
          setFormData({ ...defaultFormData, ...res.formData })
          setTemplateId(res.templateId as TemplateId)
        }
      }).catch(() => {})
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, String(templateId))
  }, [templateId])

  const handleSave = async () => {
    setSaveStatus('loading')
    try {
      const { id } = await saveInvitation(formData, templateId)
      setSavedId(id)
      setSaveStatus('ok')
    } catch {
      setSaveStatus('err')
    }
  }

  const handleCopyLink = () => {
    const url = `${location.origin}${location.pathname}?id=${savedId}`
    navigator.clipboard.writeText(url)
  }

  const handleLoadList = () => {
    if (!listOpen && list.length === 0) {
      setListLoading(true)
      getAllInvitations().then(data => {
        setList(data)
        setListLoading(false)
      }).catch(() => setListLoading(false))
    }
    setListOpen(!listOpen)
  }

  const handleSelectInvitation = (item: InvitationResponse) => {
    setFormData({ ...defaultFormData, ...item.formData })
    setTemplateId(item.templateId as TemplateId)
    setListOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-zhong-red text-zhong-gold py-4 text-center">
        <h1 className="text-xl font-serif font-bold">中式婚礼请柬生成器</h1>
      </header>

      <div className="flex flex-col lg:flex-row lg:min-h-[calc(100vh-60px)]">
        <aside className="lg:w-[400px] shrink-0 p-4 sm:p-6 bg-white lg:border-r border-gray-200">
          <div className="flex gap-2 mb-4">
            {([1, 2, 3, 4] as const).map(id => (
              <button
                key={id}
                onClick={() => setTemplateId(id)}
                className={`px-3 py-1.5 rounded text-sm ${
                  templateId === id
                    ? 'bg-zhong-red text-zhong-gold'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {id === 1 ? '古典传统' : id === 2 ? '红金对称' : id === 3 ? '祥云边框' : '竖排中式'}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={handleSave}
              disabled={saveStatus === 'loading'}
              className="px-4 py-2 rounded-lg bg-zhong-red text-zhong-gold text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              {saveStatus === 'loading' ? '保存中...' : '保存到云端'}
            </button>
            <button
              onClick={handleLoadList}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
            >
              {listOpen ? '收起列表' : '请柬列表'}
            </button>
          </div>

          {saveStatus === 'ok' && savedId && (
            <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-800 mb-2">保存成功，分享链接：</p>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={`${location.origin}${location.pathname}?id=${savedId}`}
                  className="flex-1 px-2 py-1 text-xs border rounded bg-white"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-2 py-1 rounded bg-zhong-red text-zhong-gold text-xs"
                >
                  复制
                </button>
              </div>
            </div>
          )}
          {saveStatus === 'err' && (
            <p className="mb-4 text-sm text-red-600">保存失败，请检查后端是否启动</p>
          )}

          {listOpen && (
            <div className="mb-4 max-h-48 overflow-auto border rounded-lg border-gray-200">
              {listLoading ? (
                <p className="p-4 text-sm text-gray-500">加载中...</p>
              ) : list.length === 0 ? (
                <p className="p-4 text-sm text-gray-500">暂无请柬</p>
              ) : (
                <ul className="divide-y">
                  {list.map(item => (
                    <li
                      key={item.id}
                      onClick={() => handleSelectInvitation(item)}
                      className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-50"
                    >
                      {item.formData.groom} & {item.formData.bride} · {item.formData.solarDate}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <EditorForm data={formData} onChange={setFormData} />
        </aside>

        <main className="flex-1 flex justify-center p-4 sm:p-6 overflow-auto">
          <Preview formData={formData} templateId={templateId} />
        </main>
      </div>
    </div>
  )
}

export default App
