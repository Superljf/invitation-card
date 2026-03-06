import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '中式婚礼请柬生成器',
  description: '在线定制 · 传统雅致',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
