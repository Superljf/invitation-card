package com.invitation.dto;

/**
 * 保存请柬响应
 */
public class SaveResponse {
    private String id;

    public SaveResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
