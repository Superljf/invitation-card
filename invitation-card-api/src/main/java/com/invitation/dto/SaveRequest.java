package com.invitation.dto;

/**
 * 保存请柬请求体
 */
public class SaveRequest {
    private FormDataDto formData;
    private Integer templateId;

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
