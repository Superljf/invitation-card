# invitation-card-api

中式婚礼请柬后端 API，Spring Boot 2.2.5 + JDK 8 + MySQL。

## 数据库初始化

1. 创建数据库并导入表结构：

```bash
mysql -u root -p < sql/init.sql
```

或使用 Navicat / MySQL Workbench 执行 `sql/init.sql` 内容。

2. 修改 `src/main/resources/application.yml` 中的数据库连接：

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/invitation_db?...
    username: root
    password: 你的密码
```

## 运行

```bash
mvn spring-boot:run
```

服务默认启动在 http://localhost:8089

## API

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/invitations | 保存请柬，Body: `{ formData, templateId }`，返回 `{ id }` |
| GET  | /api/invitations/{id} | 按 id 获取请柬，返回 `{ id, formData, templateId }` |

## 与前端联调

1. 启动后端：`mvn spring-boot:run`
2. 启动前端：在项目根目录 `pnpm run dev`
3. 前端需配置 `VITE_API_BASE=http://localhost:8080` 并调用 `/api/invitations` 接口
