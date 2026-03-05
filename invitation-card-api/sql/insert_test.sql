-- 基于 FormDataDto / defaultFormData 插入测试请柬
SET NAMES utf8mb4;
INSERT INTO invitation (id, template_id, form_data, created_at) VALUES (
  'test001',
  1,
  '{"recipient":"张三先生","groom":"张三","bride":"李四","solarDate":"2026-10-08","solarWeekday":"星期四","lunar":"九月初八","location":"某某大酒店三楼宴会厅","time":"中午十二时整","ceremonyText":"举行婚礼典礼","eventPhrase":"结婚喜宴","inviteLine1":"敬备喜筵","inviteLine2":"恭请光临","inviteClosing":"敬邀","nameFont":"''SimSun'', serif"}',
  NOW()
);
