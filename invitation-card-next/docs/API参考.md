# invitation-card-next API 参考

## 基础

- 前缀：`/api/invitations`
- 请求/响应均为 JSON（DELETE 成功为 204 无体）

---

## POST /api/invitations

创建请柬。

**请求体：**
```json
{
  "formData": { "recipient": "", "groom": "", "bride": "", ... },
  "templateId": 1
}
```

**响应：** `200`  
```json
{ "id": "a1b2c3d4e5f6" }
```

**错误：** `400` formData 缺失；`500` 服务器错误

---

## GET /api/invitations

分页获取请柬列表，支持按模板筛选。

**查询参数：**

| 参数 | 类型 | 默认 | 说明 |
|------|------|------|------|
| page | number | 1 | 页码 |
| pageSize | number | 10 | 每页条数（最大 50） |
| templateId | number | - | 可选，按模板 ID 筛选 |

**响应：** `200`  
```json
{
  "list": [
    {
      "id": "xxx",
      "formData": { ... },
      "templateId": 1,
      "createdAt": "2026-02-25T12:00:00.000Z"
    }
  ],
  "total": 100,
  "page": 1,
  "pageSize": 20,
  "totalPages": 5
}
```

---

## GET /api/invitations/:id

按 id 获取单条请柬（分享链接用）。

**响应：** `200`  
```json
{
  "id": "xxx",
  "formData": { ... },
  "templateId": 1,
  "createdAt": "2026-02-25T12:00:00.000Z"
}
```

**错误：** `404` 不存在；`500` 服务器错误

---

## PUT /api/invitations/:id

全量更新请柬（替换 formData 与可选 templateId）。

**请求体：**
```json
{
  "formData": { ... },
  "templateId": 2
}
```
`templateId` 可选。

**响应：** `200`  
```json
{ "id": "xxx" }
```

**错误：** `400` formData 缺失；`404` 不存在；`500` 服务器错误

---

## PATCH /api/invitations/:id

部分更新，仅更新传入的字段。

**请求体：**
```json
{
  "formData": { ... }
}
```
或 `{ "templateId": 2 }` 或两者都传。至少传一个字段。

**响应：** `200`  
```json
{ "id": "xxx" }
```

**错误：** `400` 未传任何可更新字段；`404` 不存在；`500` 服务器错误

---

## DELETE /api/invitations/:id

删除请柬。

**响应：** `204 No Content`（无响应体）

**错误：** `404` 不存在；`500` 服务器错误
