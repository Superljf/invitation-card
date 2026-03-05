-- 中式婚礼请柬 MySQL 初始化脚本
-- 执行前请先创建数据库，或使用 mysql -u root -p < schema.sql 导入

CREATE DATABASE IF NOT EXISTS invitation_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE invitation_db;

CREATE TABLE IF NOT EXISTS invitation (
  id VARCHAR(32) NOT NULL COMMENT '请柬ID',
  template_id INT NOT NULL DEFAULT 1 COMMENT '模板编号 1-4',
  form_data TEXT NOT NULL COMMENT '请柬表单数据 JSON',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id),
  KEY idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='请柬表';
