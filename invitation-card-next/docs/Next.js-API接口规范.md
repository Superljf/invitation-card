# Next.js API 接口规范

## 一、Route Handler 基础

Next.js 的 API 基于 **App Router** 的 `route.ts` 文件，每个路由文件导出 HTTP 方法对应的异步函数。

### 1.1 文件位置规则

| 路径 | 对应 API |
|------|----------|
| `src/app/api/users/route.ts` | `GET /api/users`、`POST /api/users` |
| `src/app/api/users/[id]/route.ts` | `GET /api/users/:id`、`PUT /api/users/:id`、`DELETE /api/users/:id` |

**规则：**
- 文件名必须为 `route.ts` 或 `route.js`
- 目录名 `[id]` 表示动态参数，可通过 `params` 获取

### 1.2 支持的 HTTP 方法

导出对应方法名的 async 函数即可：

```ts
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  return NextResponse.json({ data: [] })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  return NextResponse.json({ id: 'xxx' }, { status: 201 })
}
```

支持：`GET`、`POST`、`PUT`、`PATCH`、`DELETE`、`HEAD`、`OPTIONS`。

---

## 二、请求与响应规范

### 2.1 读取请求

```ts
// 请求体 (POST/PUT 等)
const body = await req.json()

// 查询参数
const { searchParams } = new URL(req.url)
const page = searchParams.get('page') ?? '1'

// 请求头
const token = req.headers.get('Authorization')

// 动态路由参数 (在 [id]/route.ts 中)
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params  // Next.js 15+ 需 await
}
```

### 2.2 返回响应

```ts
// 成功 JSON
return NextResponse.json({ id: 'xxx' })
return NextResponse.json({ id: 'xxx' }, { status: 201 })

// 错误
return NextResponse.json({ error: '消息' }, { status: 400 })
return NextResponse.json({ error: '未找到' }, { status: 404 })
return NextResponse.json({ error: '服务器错误' }, { status: 500 })

// 无内容
return new NextResponse(null, { status: 204 })

// 重定向
return NextResponse.redirect(new URL('/login', req.url), 302)
```

### 2.3 常见状态码

| 状态码 | 含义 | 场景 |
|--------|------|------|
| 200 | OK | 成功返回数据 |
| 201 | Created | 创建成功 |
| 204 | No Content | 删除成功等无体响应 |
| 400 | Bad Request | 参数错误 |
| 401 | Unauthorized | 未登录 |
| 403 | Forbidden | 无权限 |
| 404 | Not Found | 资源不存在 |
| 500 | Internal Server Error | 服务器异常 |

---

## 三、目录与命名规范

### 3.1 推荐结构

```
src/app/api/
├── users/
│   ├── route.ts          # GET /api/users, POST /api/users
│   └── [id]/
│       └── route.ts      # GET/PUT/DELETE /api/users/:id
├── invitations/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
└── auth/
    └── login/
        └── route.ts      # POST /api/auth/login
```

### 3.2 命名约定

- 路由目录：小写、复数名词，如 `invitations`、`users`
- 动态段：`[id]`、`[slug]`
- 函数：`GET`、`POST` 等大写，符合 HTTP 方法名

---

## 四、错误与异常处理

### 4.1 统一 try-catch

```ts
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // 业务逻辑
    return NextResponse.json({ id: 'xxx' })
  } catch (e) {
    console.error('POST /api/xxx', e)
    return NextResponse.json({ error: '操作失败' }, { status: 500 })
  }
}
```

### 4.2 参数校验

```ts
if (!body.formData || typeof body.formData !== 'object') {
  return NextResponse.json({ error: 'formData required' }, { status: 400 })
}

const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
```

---

## 五、与数据库交互

- 在 `route.ts` 中直接调用 Prisma 等 ORM
- 生产环境可抽到 Service 层
- 数据库连接用单例（如 `@/lib/db`），避免连接过多

```ts
import { prisma } from '@/lib/db'

export async function GET() {
  const list = await prisma.invitation.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(list)
}
```

---

## 六、与本项目对照

| 接口 | 文件 | 方法 | 说明 |
|------|------|------|------|
| POST /api/invitations | `route.ts` | POST | 保存请柬，Body: `{ formData, templateId }`，返回 `{ id }` |
| GET /api/invitations | `route.ts` | GET | 分页列表，Query: `page`, `pageSize`, `templateId`（可选），返回 `{ list, total, page, pageSize, totalPages }` |
| GET /api/invitations/:id | `[id]/route.ts` | GET | 按 id 获取，返回 `{ id, formData, templateId, createdAt }` |
| PUT /api/invitations/:id | `[id]/route.ts` | PUT | 全量更新，Body: `{ formData, templateId? }`，返回 `{ id }` |
| PATCH /api/invitations/:id | `[id]/route.ts` | PATCH | 部分更新，Body: `{ formData? , templateId? }`，返回 `{ id }` |
| DELETE /api/invitations/:id | `[id]/route.ts` | DELETE | 删除请柬，返回 204 No Content |
