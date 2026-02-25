import { useEffect, useState } from 'react'
import { EditorForm } from './components/EditorForm'
import { Preview, type TemplateId } from './components/Preview'
import { defaultFormData, type FormData } from './types/formData'

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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, String(templateId))
  }, [templateId])

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
