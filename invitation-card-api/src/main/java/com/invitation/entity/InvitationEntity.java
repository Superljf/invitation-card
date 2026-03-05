package com.invitation.entity;

import com.invitation.dto.FormDataDto;
import com.invitation.converter.FormDataConverter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * 请柬 JPA 实体
 */
@Entity
@Table(name = "invitation")
public class InvitationEntity {

    @Id
    @Column(name = "id", length = 32)
    private String id;

    @Column(name = "template_id", nullable = false)
    private Integer templateId;

    @Convert(converter = FormDataConverter.class)
    @Column(name = "form_data", columnDefinition = "TEXT", nullable = false)
    private FormDataDto formData;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getTemplateId() {
        return templateId;
    }

    public void setTemplateId(Integer templateId) {
        this.templateId = templateId;
    }

    public FormDataDto getFormData() {
        return formData;
    }

    public void setFormData(FormDataDto formData) {
        this.formData = formData;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
