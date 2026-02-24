import type { FormData } from '../types/formData'
import { mapToTemplate1, mapToTemplate2, mapToTemplate3 } from '../utils/mapper'
import { Template1 } from './Template1'
import { Template2 } from './Template2'
import { Template3 } from './Template3'

export type TemplateId = 1 | 2 | 3

interface Props {
  formData: FormData
  templateId: TemplateId
}

export function Preview({ formData, templateId }: Props) {
  if (templateId === 1) return <Template1 data={mapToTemplate1(formData)} />
  if (templateId === 2) return <Template2 data={mapToTemplate2(formData)} />
  return <Template3 data={mapToTemplate3(formData)} />
}
