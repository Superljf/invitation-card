package com.invitation.model;

import com.invitation.dto.FormDataDto;

/**
 * 请柬记录（内存存储用）
 */
public class InvitationRecord {
    private String id;
    private FormDataDto formData;
    private Integer templateId;

    public InvitationRecord(String id, FormDataDto formData, Integer templateId) {
        this.id = id;
        this.formData = formData;
        this.templateId = templateId;
    }

    public String getId() {
        return id;
    }

    public FormDataDto getFormData() {
        return formData;
    }

    public Integer getTemplateId() {
        return templateId;
    }
}
