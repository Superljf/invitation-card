import type { FormData } from '../types/formData'
import { mapToTemplate1, mapToTemplate2, mapToTemplate3, mapToTemplate4 } from '../utils/mapper'
import { Template1 } from './Template1'
import { Template2 } from './Template2'
import { Template3 } from './Template3'
import { Template4 } from './Template4'

export type TemplateId = 1 | 2 | 3 | 4

interface Props {
  formData: FormData
  templateId: TemplateId
}

export function Preview({ formData, templateId }: Props) {
  if (templateId === 1) return <Template4 data={mapToTemplate4(formData)} />
  if (templateId === 2) return <Template1 data={mapToTemplate1(formData)} />
  if (templateId === 3) return <Template3 data={mapToTemplate3(formData)} />
  return <Template2 data={mapToTemplate2(formData)} />
}
