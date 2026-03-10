# invitation-card-next

中式婚礼请柬生成器 · Next.js 全栈版。前端与 API 集成在同一应用，使用 Prisma 连接 MySQL。

## 与原版对比

| 项目 | 原版 (invitation-card + invitation-card-api) | Next.js 全栈版 |
|------|---------------------------------------------|----------------|
| 前端 | Vite + React | Next.js App Router |
| 后端 | Spring Boot (Java) | Next.js API Routes |
| 数据库 | MySQL + JPA | MySQL + Prisma |
| 部署 | 前后端分离，需分别部署 | 单应用，可部署到 Vercel 等 |

API 与数据库表结构完全兼容，可与原版共用同一 MySQL `invitation_db`。

## 环境要求

- Node.js 18+
- MySQL 8.0+
- pnpm（推荐）

## 快速开始

1. **安装依赖**

   ```bash
   pnpm install
   ```

2. **配置数据库**

   复制 `.env.example` 为 `.env`，并填写 MySQL 连接：

   ```env
   DATABASE_URL="mysql://root:你的密码@localhost:3306/invitation_db"
   ```

3. **初始化数据库**（若尚未执行过）

   使用原项目 `invitation-card-api/sql/init.sql` 或执行：

   ```bash
   mysql -u root -p < ../invitation-card-api/sql/init.sql
   ```

4. **生成 Prisma Client**

   ```bash
   pnpm prisma generate
   ```

5. **启动开发服务器**

   ```bash
   pnpm dev
   ```

   访问 http://localhost:3000

## API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/invitations | 保存请柬，Body: `{ formData, templateId }`，返回 `{ id }` |
| GET | /api/invitations?page=1&pageSize=10&templateId=1 | 分页列表，可选 `templateId` 筛选，返回 `{ list, total, page, pageSize, totalPages }` |
| GET | /api/invitations/{id} | 按 id 获取请柬 |
| PUT | /api/invitations/{id} | 全量更新，Body: `{ formData, templateId? }` |
| PATCH | /api/invitations/{id} | 部分更新，Body: `{ formData?, templateId? }` |
| DELETE | /api/invitations/{id} | 删除请柬，返回 204 |

## 部署

- **Vercel**：推送代码后配置 `DATABASE_URL` 环境变量，推荐使用 PlanetScale、Railway 等支持 Serverless 的 MySQL
- **自建**：`pnpm build && pnpm start`，需确保 Node 可连 MySQL

## 目录结构

详见 [ARCHITECTURE.md](./ARCHITECTURE.md)。
