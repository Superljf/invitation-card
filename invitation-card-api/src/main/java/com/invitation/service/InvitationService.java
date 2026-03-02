package com.invitation.service;

import com.invitation.dto.FormDataDto;
import com.invitation.dto.InvitationResponse;
import com.invitation.dto.SaveResponse;
import com.invitation.model.InvitationRecord;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 请柬服务，内存存储
 */
@Service
public class InvitationService {

    private final Map<String, InvitationRecord> store = new ConcurrentHashMap<>();

    /**
     * 保存请柬，返回 id
     */
    public SaveResponse save(FormDataDto formData, Integer templateId) {
        String id = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        InvitationRecord record = new InvitationRecord(id, formData, templateId);
        store.put(id, record);
        return new SaveResponse(id);
    }

    /**
     * 按 id 获取请柬
     */
    public InvitationResponse get(String id) {
        InvitationRecord record = store.get(id);
        if (record == null) {
            return null;
        }
        return new InvitationResponse(record.getId(), record.getFormData(), record.getTemplateId());
    }
    /**
     * 获取所有请柬（支持分页）
     */
    public List<InvitationResponse> getAll(int page, int pageSize) {
        List<InvitationResponse> list = new ArrayList<>();
        for (InvitationRecord record : store.values()) {
            list.add(new InvitationResponse(
                record.getId(),
                record.getFormData(),
                record.getTemplateId()
            ));
        }
        // 按 id 倒序，最新的在前面
        list.sort((a, b) -> b.getId().compareTo(a.getId()));

        // 分页处理
        int start = (page - 1) * pageSize;
        int end = Math.min(start + pageSize, list.size());
        if (start >= list.size()) {
            return new ArrayList<>();
        }
        return list.subList(start, end);
    }
}
