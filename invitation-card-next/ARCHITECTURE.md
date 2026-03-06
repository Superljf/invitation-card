# invitation-card-next 架构说明

## 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│  Next.js 应用 (invitation-card-next)                         │
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │ 前端 (App Router) │  │ API Routes (/api/invitations)    │  │
│  │ page.tsx         │  │ POST / GET / GET [id]            │  │
│  │ EditorForm       │  │         │                         │  │
│  │ Preview          │──│─────────┘                         │  │
│  │ Template1-4      │  │  Prisma Client                    │  │
│  └─────────────────┘  └─────────────┬─────────────────────┘  │
└─────────────────────────────────────│─────────────────────────┘
                                      │
                                      ▼
                          ┌───────────────────────┐
                          │ MySQL (invitation_db) │
                          │ invitation 表          │
                          └───────────────────────┘
```

## 数据流

1. **表单编辑**：用户修改 FormData → `EditorForm` 通过 `onChange` 回传 → `page.tsx` 更新 state
2. **保存**：`formData` + `templateId` → POST `/api/invitations` → Prisma `create` → 返回 `{ id }`
3. **加载列表**：GET `/api/invitations?page=1&pageSize=20` → Prisma `findMany` → 返回列表
4. **分享链接**：URL `?id=xxx` → GET `/api/invitations/{id}` → 预填表单

## 目录结构

```
invitation-card-next/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 主页面（表单 + 预览 + 云端操作）
│   │   ├── globals.css         # Tailwind + 组件样式
│   │   └── api/
│   │       └── invitations/
│   │           ├── route.ts    # POST 保存 / GET 列表
│   │           └── [id]/
│   │               └── route.ts # GET 按 id 查询
│   ├── components/
│   │   ├── EditorForm.tsx      # 表单编辑
│   │   ├── Preview.tsx         # 模板分发
│   │   ├── Template1.tsx ~ Template4.tsx
│   │   └── Template4.css
│   ├── lib/
│   │   └── db.ts               # Prisma 单例
│   ├── types/
│   │   └── formData.ts         # FormData 类型与默认值
│   └── utils/
│       ├── mapper.ts           # FormData → 各模板数据结构
│       ├── weekday.ts          # 日期转星期
│       └── chineseNumber.ts    # 数字转中文
├── prisma/
│   └── schema.prisma           # Invitation 模型映射
└── ...
```

## 与 invitation-card-api 的 API 兼容性

| 接口 | 兼容 | 说明 |
|------|------|------|
| POST /api/invitations | 是 | 请求体、响应格式一致 |
| GET /api/invitations/{id} | 是 | 响应格式一致 |
| GET /api/invitations/all | 略有差异 | 原版 `/all?page=&pageSize=`，Next 版 `/api/invitations?page=&pageSize=`，响应均为数组 |

两版可共用同一 MySQL 数据库，数据互通。
