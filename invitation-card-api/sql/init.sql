-- ============================================
-- 中式婚礼请柬 MySQL 数据库初始化脚本
-- 可直接导入: mysql -u root -p < init.sql
-- 或 Navicat / MySQL Workbench 执行
-- ============================================

CREATE DATABASE IF NOT EXISTS invitation_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE invitation_db;

DROP TABLE IF EXISTS invitation;

CREATE TABLE invitation (
  id VARCHAR(32) NOT NULL COMMENT '请柬ID',
  template_id INT NOT NULL DEFAULT 1 COMMENT '模板编号 1-4',
  form_data TEXT NOT NULL COMMENT '请柬表单数据 JSON',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (id),
  KEY idx_created_at (created_at DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='请柬表';
