package com.invitation.service;

import com.invitation.dto.FormDataDto;
import com.invitation.dto.InvitationResponse;
import com.invitation.dto.SaveResponse;
import com.invitation.entity.InvitationEntity;
import com.invitation.repository.InvitationRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * 请柬服务，MySQL 持久化
 */
@Service
public class InvitationService {

    private final InvitationRepository repository;

    public InvitationService(InvitationRepository repository) {
        this.repository = repository;
    }

    public SaveResponse save(FormDataDto formData, Integer templateId) {
        String id = UUID.randomUUID().toString().replace("-", "").substring(0, 12);
        InvitationEntity entity = new InvitationEntity();
        entity.setId(id);
        entity.setFormData(formData);
        entity.setTemplateId(templateId);
        repository.save(entity);
        return new SaveResponse(id);
    }

    public InvitationResponse get(String id) {
        return repository.findById(id)
            .map(e -> new InvitationResponse(e.getId(), e.getFormData(), e.getTemplateId()))
            .orElse(null);
    }

    public List<InvitationResponse> getAll(int page, int pageSize) {
        return repository.findAllByOrderByCreatedAtDesc(PageRequest.of(page - 1, pageSize))
            .stream()
            .map(e -> new InvitationResponse(e.getId(), e.getFormData(), e.getTemplateId()))
            .collect(Collectors.toList());
    }
}
