import type { Template4Data, LineItem, VariableItem } from '../utils/mapper'
import './Template4.css'

interface Props {
  data: Template4Data
}

const verticalStyle: React.CSSProperties = {
  writingMode: 'vertical-rl',
  textOrientation: 'upright',
}

function lineColor(v: VariableItem, i?: number): string {
  if (typeof v === 'boolean') return v ? '#1a1a1a' : '#F5D26B'
  return v[i!] ? '#1a1a1a' : '#F5D26B'
}

function renderCol(
  lines: LineItem[],
  variable: VariableItem[],
  colClass: string,
  customFont?: string
) {
  return (
    <div className={`template4-col ${colClass}`}>
      {lines.map((line, i) => {
        const v = variable[i]
        if (Array.isArray(line)) {
          return (
            <div key={i} className="template4-line template4-line--parallel">
              <div className="template4-line-inner" style={{ 
                fontFamily: customFont,
                ...verticalStyle, 
                color: lineColor(v, 0) 
              }}>{line[0]}</div>
              <div className="template4-line-inner" style={{ 
                fontFamily: customFont,
                ...verticalStyle, 
                color: lineColor(v, 1) 
              }}>{line[1]}</div>
            </div>
          )
        }
        return (
          <div key={i} className="template4-line template4-line--center">
            <div className="template4-line-inner" style={{ 
              fontFamily: customFont,
              ...verticalStyle, 
              color: lineColor(v) 
            }}>{line}</div>
          </div>
        )
      })}
    </div>
  )
}

function renderSimpleCol(lines: string[], variable: boolean[], colClass: string, fontWeight?: string, customFont?: string) {
  return (
    <div className={`template4-col ${colClass}`}>
      {lines.map((line, i) => (
        <div key={i} className="template4-line">
          <div className="template4-line-inner" style={{ 
            fontWeight: fontWeight, 
            fontFamily: customFont,
            ...verticalStyle, 
            color: variable[i] ? '#1a1a1a' : '#F5D26B' 
          }}>{line}</div>
        </div>
      ))}
    </div>
  )
}

export function Template4({ data }: Props) {
  return (
    <div className="template4" style={{ width: '360px', height: '600px' }}>
      <div className="template4-card">
        <div className="template4-title">{data.title}</div>
        <div className="template4-body">
          {renderSimpleCol(data.recipientLines, data.recipientVariable, 'template4-col--recipient', 'bold', data.nameFont)}
          {renderCol(data.dateLines, data.dateVariable, 'template4-col--date')}
          {renderCol(data.coupleLines, data.coupleVariable, 'template4-col--couple', data.nameFont)}
          {renderSimpleCol(data.inviteLines, data.inviteVariable, 'template4-col--invite')}
          {/* 时间、地点 两列，落款在它们下方 */}
          <div className="template4-group-time-location-signature">
            <div className="template4-row-time-location">
              {renderSimpleCol(data.timeLines, data.timeVariable, 'template4-col--time')}
              {renderSimpleCol(data.locationLines, data.locationVariable, 'template4-col--location')}
            </div>
            <div className="template4-block template4-block--signature">
              {data.signatureLines.map((line, i) => {
                const v = data.signatureVariable[i]
                if (Array.isArray(line)) {
                  return (
                    <div key={i} className="template4-line template4-line--parallel">
                      <div className="template4-line-inner" style={{ 
                        fontFamily: data.nameFont,
                        ...verticalStyle, 
                        color: lineColor(v, 0) 
                      }}>{line[0]}</div>
                      <div className="template4-line-inner" style={{ 
                        fontFamily: data.nameFont,
                        ...verticalStyle, 
                        color: lineColor(v, 1) 
                      }}>{line[1]}</div>
                    </div>
                  )
                }
                return (
                  <div key={i} className="template4-line template4-line--center">
                    <div className="template4-line-inner" style={{ ...verticalStyle, color: lineColor(v) }}>{line}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
