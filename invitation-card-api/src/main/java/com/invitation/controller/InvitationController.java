package com.invitation.controller;

import com.invitation.dto.FormDataDto;
import com.invitation.dto.InvitationResponse;
import com.invitation.dto.SaveRequest;
import com.invitation.dto.SaveResponse;
import com.invitation.service.InvitationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
/**
 * 请柬 REST API
 */
@RestController
@RequestMapping("/api/invitations")
public class InvitationController {

    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    /**
     * 保存请柬
     * POST /api/invitations
     */
    @PostMapping
    public ResponseEntity<SaveResponse> save(@RequestBody SaveRequest request) {
        if (request.getFormData() == null) {
            return ResponseEntity.badRequest().build();
        }
        FormDataDto formData = request.getFormData();
        Integer templateId = request.getTemplateId() != null ? request.getTemplateId() : 1;
        SaveResponse response = invitationService.save(formData, templateId);
        return ResponseEntity.ok(response);
    }

    /**
     * 按 id 获取请柬（分享链接用）
     * GET /api/invitations/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<InvitationResponse> get(@PathVariable String id) {
        InvitationResponse response = invitationService.get(id);
        if (response == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(response);
    }
    /**
     * 获取所有请柬（支持分页）
     * GET /api/invitations/all?page=1&pageSize=10
     */
    @GetMapping("/all")
    public ResponseEntity<List<InvitationResponse>> getAll(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int pageSize) {
        List<InvitationResponse> response = invitationService.getAll(page, pageSize);
        return ResponseEntity.ok(response);
    }
}
