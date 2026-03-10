# Next.js 与 React 区别与写法

## 一、定位区别

| 项目 | React | Next.js |
|------|-------|---------|
| 本质 | UI 库 | 基于 React 的全栈框架 |
| 路由 | 需自己配（如 React Router） | 基于文件系统，内置路由 |
| 服务端 | 需单独搭建（如 Node、Spring Boot） | 内置 API Routes，可写接口 |
| 渲染 | 默认客户端渲染（CSR） | 支持 SSR、SSG、ISR、CSR |
| 打包 | Vite / CRA 等 | 基于 Webpack / Turbopack |

---

## 二、组件写法区别

### 2.1 默认渲染环境

**React（纯 SPA）：**
- 组件都在浏览器中运行
- 无需区分服务端/客户端

**Next.js（App Router）：**
- 默认是 **Server Component**，在服务端执行
- 需要用到 `useState`、`useEffect`、事件、`window` 等时，必须加 `'use client'`，变成 **Client Component**

```tsx
// Server Component（默认）- 不能使用 useState、useEffect、onClick 等
export default function Page() {
  return <div>服务端渲染</div>
}

// Client Component - 需要加 'use client'
'use client'

import { useState } from 'react'

export default function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>{n}</button>
}
```

### 2.2 数据获取

**React（Vite 等）：**
- 一般在 `useEffect` 里 `fetch`
- 或使用 React Query、SWR 等

**Next.js：**
- Server Component：直接 `async` 函数里 `await fetch`，无需 `useEffect`
- Client Component：与 React 一样，用 `useEffect` + `fetch` 或数据请求库

```tsx
// Next.js Server Component - 直接 async
async function Page() {
  const res = await fetch('https://api.example.com/data')
  const data = await res.json()
  return <div>{data.title}</div>
}

// Next.js Client Component - 与 React 一样
'use client'
import { useEffect, useState } from 'react'

export default function ClientList() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/api/items').then(r => r.json()).then(setData)
  }, [])
  return <ul>{data.map(d => <li key={d.id}>{d.name}</li>)}</ul>
}
```

---

## 三、路由与页面写法

### 3.1 路由

**React：**
```tsx
// 需配置 React Router
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/users/:id" element={<UserDetail />} />
</Routes>
```

**Next.js App Router：**
- 文件即路由
- `app/page.tsx` → `/`
- `app/about/page.tsx` → `/about`
- `app/users/[id]/page.tsx` → `/users/:id`
- `app/layout.tsx` 提供布局，包裹所有子页面

### 3.2 页面组件导出

**React：**
```tsx
// 任意命名
function Home() { return <div>Home</div> }
export default Home
```

**Next.js：**
```tsx
// page.tsx 必须默认导出
export default function HomePage() {
  return <div>Home</div>
}

// layout.tsx 必须默认导出
export default function RootLayout({ children }) {
  return <html><body>{children}</body></html>
}
```

---

## 四、样式与静态资源

| 项目 | React (Vite) | Next.js |
|------|--------------|---------|
| 全局样式 | 在 `main.tsx` 引入 | 在 `app/layout.tsx` 或 `globals.css` 引入 |
| CSS 模块 | `*.module.css` | 同样支持 |
| 图片 | `<img src="..." />` | `<Image src="..." />` 来自 `next/image` |
| 静态文件 | 放在 `public/` | 同样放在 `public/` |

---

## 五、环境变量

**React（Vite）：**
- 客户端：`import.meta.env.VITE_XXX`
- 必须以 `VITE_` 开头才能在客户端使用

**Next.js：**
- 服务端和 Client Component：`process.env.XXX`
- 客户端可见：必须以 `NEXT_PUBLIC_` 开头
- 服务端专用：不加前缀

```ts
// Next.js - 仅服务端
const dbUrl = process.env.DATABASE_URL

// Next.js - 客户端可见
const apiUrl = process.env.NEXT_PUBLIC_API_URL
```

---

## 六、API 接口

**React 项目：**
- 前端单独部署
- 接口一般在另外的后端（如 Spring Boot、Node Express）
- 通过 `fetch('http://api.example.com/...')` 调用

**Next.js：**
- 可在 `app/api/` 下直接写接口
- 同域可写 `fetch('/api/invitations')`，无需配置 CORS
- 接口与页面同项目，部署在一起

---

## 七、本项目中的对应关系

| 原版 (Vite + React) | Next.js 版 |
|---------------------|-----------|
| `src/App.tsx` | `src/app/page.tsx` |
| `src/main.tsx` 入口 | `src/app/layout.tsx` 根布局 |
| `fetch(API_BASE + '/api/invitations')` | `fetch('/api/invitations')` |
| 无后端，依赖 Spring Boot | `app/api/invitations/route.ts` 提供接口 |
| 路由需配置 | 文件即路由 |
| 全部 Client | 页面用 `'use client'`，API 在服务端 |
