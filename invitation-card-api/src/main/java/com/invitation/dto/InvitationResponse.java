package com.invitation.dto;

/**
 * 获取请柬响应（分享链接用）
 */
public class InvitationResponse {
    private String id;
    private FormDataDto formData;
    private Integer templateId;

    public InvitationResponse(String id, FormDataDto formData, Integer templateId) {
        this.id = id;
        this.formData = formData;
        this.templateId = templateId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public FormDataDto getFormData() {
        return formData;
    }

    public void setFormData(FormDataDto formData) {
        this.formData = formData;
    }

    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }
}
