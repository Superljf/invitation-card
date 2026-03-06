# 中式婚礼请柬生成器

专注中式传统婚礼的在线请柬生成器，支持多模板、云端保存与分享链接。

## 项目版本

| 目录 | 说明 |
|------|------|
| `src/` | 前端：React + Vite + TypeScript，部署到 GitHub Pages |
| `invitation-card-api/` | 后端：Spring Boot + MySQL |
| **`invitation-card-next/`** | **Next.js 全栈版**：前端与 API 一体化，Prisma + MySQL，详见 [invitation-card-next/README.md](invitation-card-next/README.md) |

## 运行（原版）

```bash
pnpm install
pnpm run dev
```

前端默认请求 `invitation-card-api`（端口 8089），需同时启动后端。

## 运行 Next.js 全栈版

```bash
cd invitation-card-next
pnpm install
cp .env.example .env   # 配置 DATABASE_URL
pnpm prisma generate
pnpm dev
```

访问 http://localhost:3000

## 构建与部署

- 原版：`pnpm build`，GitHub Pages 自动部署前端
- Next.js 版：`pnpm build && pnpm start`，可部署到 Vercel 等

## 技术栈

- 原版：React 18 + Vite + TypeScript + TailwindCSS，Spring Boot + JPA + MySQL
- Next.js 版：Next.js 14 + React + Prisma + MySQL
