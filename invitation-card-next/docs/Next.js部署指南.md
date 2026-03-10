# Next.js 项目部署指南

## 一、部署方式概览

| 方式 | 适用场景 | 难度 |
|------|----------|------|
| Vercel | 快速上线、自动 CI/CD | 低 |
| 自建服务器 (Node + PM2) | 自有云主机 | 中 |
| Docker | 容器化、与现有系统集成 | 中 |

---

## 二、Vercel 部署（推荐）

### 2.1 前提

- 代码在 GitHub / GitLab / Bitbucket
- 数据库使用云服务（PlanetScale、Railway、Neon 等），或自建 MySQL 并开放外网访问

### 2.2 步骤

1. 登录 [vercel.com](https://vercel.com)，使用 GitHub 账号
2. **Import Project**，选择 `invitation-card` 仓库
3. **Root Directory** 填：`invitation-card-next`
4. **Framework Preset** 选 Next.js（默认）
5. 添加环境变量：`DATABASE_URL` = `mysql://用户:密码@主机:端口/数据库名`
6. 点击 **Deploy**，等待构建完成

### 2.3 云数据库示例（PlanetScale）

- 在 [planetscale.com](https://planetscale.com) 创建库
- 获取连接串，例如：`mysql://xxx:xxx@xxx.connect.psdb.cloud/invitation_db?sslaccept=strict`
- 在 Vercel 中设置为 `DATABASE_URL`

### 2.4 自定义域名（可选）

- 项目设置 → Domains → 添加域名
- 按提示在 DNS 中添加 CNAME 记录

---

## 三、自建服务器部署

### 3.1 环境要求

- Node.js 18+
- pnpm（或 npm）
- MySQL 8.0+
- 可选用 PM2 或 systemd 做进程管理

### 3.2 部署流程

```bash
# 1. 克隆代码
git clone <repo-url>
cd invitation-card/invitation-card-next

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
echo 'DATABASE_URL="mysql://root:密码@localhost:3306/invitation_db"' > .env

# 4. 生成 Prisma Client
pnpm prisma generate

# 5. 构建
pnpm build

# 6. 启动（开发可先用此命令验证）
pnpm start
```

### 3.3 使用 PM2 常驻运行

```bash
# 安装 PM2
npm install -g pm2

# 启动
pm2 start pnpm --name "invitation-next" -- start

# 开机自启
pm2 startup
pm2 save
```

### 3.4 反向代理（Nginx）

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 四、Docker 部署

### 4.1 Dockerfile

在 `invitation-card-next/` 目录下创建 `Dockerfile`：

```dockerfile
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"
CMD ["node", "server.js"]
```

> 使用 standalone 输出需在 `next.config.mjs` 添加 `output: 'standalone'`。

### 4.2 简化版 Dockerfile（无 standalone）

```dockerfile
FROM node:20-alpine
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

### 4.3 构建与运行

```bash
docker build -t invitation-next .
docker run -d -p 3000:3000 -e DATABASE_URL="mysql://root:123456@host.docker.internal:3306/invitation_db" invitation-next
```

> 本机 MySQL 时可用 `host.docker.internal`；若 MySQL 在宿主机网络，需按实际网络配置调整。

---

## 五、数据库相关

### 5.1 初始化表结构

首次部署前执行 `invitation-card-api/sql/init.sql` 或等效脚本，确保表存在。

### 5.2 连接字符串格式

```
mysql://用户名:密码@主机:端口/数据库名
```

### 5.3 安全建议

- 生产环境使用独立数据库账号，权限最小化
- 使用强密码，避免把密码写入代码
- 如走公网，启用 SSL：在连接串后加 `?sslaccept=strict` 等参数

---

## 六、本项目的快速命令

```bash
# 本地开发
pnpm dev

# 生产构建
pnpm build

# 生产运行
pnpm start
```
