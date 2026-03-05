package com.invitation.repository;

import com.invitation.entity.InvitationEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 请柬 Repository
 */
public interface InvitationRepository extends JpaRepository<InvitationEntity, String> {

    List<InvitationEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
