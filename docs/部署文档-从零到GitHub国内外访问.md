# 中式婚礼请柬生成器：如何部署到 GitHub，实现国内外访问

本文档说明如何将「中式婚礼请柬生成器」前端部署到 GitHub Pages，并让国内、国外用户都能访问。

---

## 一、部署架构概览

```
┌─────────────────────────────────────────────────────────────────┐
│                        用户浏览器（国内/国外）                      │
└────────────────────────────┬────────────────────────────────────┘
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  GitHub Pages (CDN)                                              │
│  https://<你的用户名>.github.io/invitation-card/                 │
│  • 静态资源：HTML / JS / CSS                                      │
│  • 由 GitHub 全球 CDN 分发                                        │
└────────────────────────────┬────────────────────────────────────┘
                              │ 可选：调用后端 API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  后端 API（可选）                                                 │
│  • 若使用「保存到云端」「请柬列表」等功能，需单独部署 Spring Boot   │
│  • 可部署在云服务器、Vercel Serverless、Railway 等                │
└─────────────────────────────────────────────────────────────────┘
```

- **前端**：推送到 GitHub `main` 分支后，由 GitHub Actions 自动构建并发布到 GitHub Pages。
- **访问**：通过 `https://<你的用户名>.github.io/invitation-card/` 访问，GitHub 的 CDN 在国内外均可访问（国内速度可能因网络环境有所差异）。

---

## 二、前置条件

- 已注册 [GitHub](https://github.com) 账号。
- 项目已在本地用 Git 管理，并已关联到 GitHub 远程仓库。
- 本地已安装 Node.js（建议 18+）、pnpm。

---

## 三、在 GitHub 上启用 Pages

### 3.1 打开仓库设置

1. 打开你的仓库页面，例如：`https://github.com/<你的用户名>/invitation-card`。
2. 点击 **Settings（设置）**。

### 3.2 配置 GitHub Pages 发布源

1. 左侧菜单找到 **Pages**。
2. 在 **Build and deployment** 中：
   - **Source** 选择：**GitHub Actions**（不要选 “Deploy from a branch”）。
3. 保存后无需再选分支；部署完全由工作流控制。

这样，当 GitHub Actions 中的 “Deploy to GitHub Pages” 工作流运行成功后，站点会自动发布。

---

## 四、项目内与部署相关的配置

### 4.1 仓库名与 base 路径

当前项目按「仓库名为 `invitation-card`」配置：

- **vite.config.ts** 中生产环境 base 为 `/invitation-card/`：

```ts
base: process.env.NODE_ENV === 'production' ? '/invitation-card/' : '/',
```

若你的仓库名不是 `invitation-card`，请将 `/invitation-card/` 改成 `/你的仓库名/`，否则页面资源会 404。

### 4.2 自动部署工作流

工作流文件：**.github/workflows/deploy.yml**。

- **触发**：推送到 `main` 分支时自动运行。
- **流程**：
  1. Checkout 代码。
  2. 安装 pnpm、Node 20。
  3. `pnpm install --frozen-lockfile` 安装依赖。
  4. `pnpm build` 构建，产出在 `dist/`。
  5. 使用 `upload-pages-artifact` 上传构建产物。
  6. 使用 `deploy-pages` 部署到 GitHub Pages。

无需在仓库设置里再选分支或目录，只要 Source 选的是 **GitHub Actions** 即可。

### 4.3 环境变量与后端 API（可选）

- 前端通过 **VITE_API_BASE** 指定后端地址（见 `src/api/invitation.ts`）。
- 构建时若未设置 `VITE_API_BASE`，则使用默认（如本地 `http://localhost:8089`）。
- 若已部署后端，可在 GitHub 仓库 **Settings → Secrets and variables → Actions** 中新增变量，例如：
  - Name: `VITE_API_BASE`
  - Value: `https://你的后端域名`
- 在 **.github/workflows/deploy.yml** 的 Build 步骤里传入该变量，例如：

```yaml
- name: Build
  run: pnpm build
  env:
    VITE_API_BASE: ${{ vars.VITE_API_BASE }}
```

这样构建出的前端会请求你配置的后端，国内外访问前端时都会用同一后端地址。

---

## 五、部署步骤（从零到上线）

### 5.1 首次部署

1. **确认配置**
   - 确认 `vite.config.ts` 中 `base` 与仓库名一致（如 `/invitation-card/`）。
   - 确认 `.github/workflows/deploy.yml` 存在且未改坏。

2. **推送到 main**

```bash
git add .
git commit -m "chore: 配置 GitHub Pages 部署"
git push -u origin main
```

3. **查看 Actions**
   - 打开仓库 **Actions** 页，选择 “Deploy to GitHub Pages” 工作流。
   - 若全部为绿色，即部署成功。

4. **获取访问地址**
   - 格式：`https://<你的用户名>.github.io/invitation-card/`
   - 也可在 **Settings → Pages** 顶部看到 “Your site is live at …”。

### 5.2 后续更新

之后每次执行：

```bash
git add .
git commit -m "你的提交说明"
git push origin main
```

都会自动触发构建与部署，数分钟后刷新即可看到新版本。

---

## 六、国内外访问说明

### 6.1 为什么国内外都能访问

- GitHub Pages 托管在 GitHub 的全球基础设施上，通过 CDN 分发。
- 使用 HTTPS，域名形如 `*.github.io`，解析与访问在全球范围内可用。
- 国内用户一般可以正常打开 `*.github.io`；部分网络环境下可能较慢或被限制，属网络策略问题，与项目配置无关。

### 6.2 国内访问体验优化（可选）

若你主要面向国内用户，可考虑：

| 方式 | 说明 |
|------|------|
| 继续使用 GitHub Pages | 多数情况下可直接访问，配置简单。 |
| 使用国内 CDN/对象存储 | 将 `dist/` 同步到阿里云 OSS、腾讯云 COS 等，绑定自定义域名，国内访问更稳定、更快。 |
| 使用 Vercel / Netlify | 部署到 Vercel 或 Netlify，再绑定国内可解析的域名，有时比直连 github.io 更顺畅。 |

当前文档以「部署到 GitHub、国内外都能访问」为目标，默认方案即为 GitHub Pages；若后续要做国内加速，可在上述方案中选一种，再在文档中补充对应步骤。

---

## 七、常见问题

### 7.1 页面 404 或白屏

- **检查 base**：地址栏应为 `https://<用户名>.github.io/invitation-card/`（注意末尾斜杠和路径）。若 base 配错，资源会 404，导致白屏。
- **检查仓库名**：若仓库名不是 `invitation-card`，请把 `vite.config.ts` 的 base 改为 `/你的仓库名/`，并重新推送触发部署。

### 7.2 部署后仍是旧内容

- 等待 1–2 分钟再强制刷新（Ctrl+F5 或 Cmd+Shift+R）。
- 到 **Actions** 中确认最新一次 “Deploy to GitHub Pages” 已成功（绿色）。

### 7.3 “保存到云端” 等接口报错

- 这些功能依赖后端 API。若只部署了前端、未部署后端，请在前端隐藏或禁用相关按钮，或在文档中说明「需自建后端」。
- 若已部署后端，请确认前端构建时传入了正确的 `VITE_API_BASE`（见 4.3 节）。

### 7.4 国内某地打不开

- 属于网络环境限制，与项目本身无关。可尝试换网络或使用 6.2 节的国内加速方案。

---

## 八、小结

| 步骤 | 操作 |
|------|------|
| 1 | 仓库 **Settings → Pages**，Source 选 **GitHub Actions** |
| 2 | 确认 **vite.config.ts** 中 base 为 `/invitation-card/`（或你的仓库名） |
| 3 | 将代码推送到 **main** 分支，等待 Actions 部署完成 |
| 4 | 使用 `https://<用户名>.github.io/invitation-card/` 访问 |
| 5 | （可选）配置 `VITE_API_BASE` 并部署后端，实现云端保存与列表 |

按上述流程操作后，请柬生成器即可通过 GitHub 部署，并实现国内外用户通过浏览器访问。
