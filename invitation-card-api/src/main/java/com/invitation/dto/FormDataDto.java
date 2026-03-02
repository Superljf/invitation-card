package com.invitation.dto;

/**
 * 与前端 FormData 一致的请柬编辑数据
 */
public class FormDataDto {
    private String recipient;
    private String groom;
    private String bride;
    private String solarDate;
    private String solarWeekday;
    private String lunar;
    private String location;
    private String time;
    private String ceremonyText;
    private String eventPhrase;
    private String inviteLine1;
    private String inviteLine2;
    private String inviteClosing;
    private String nameFont;

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getGroom() {
        return groom;
    }

    public void setGroom(String groom) {
        this.groom = groom;
    }

    public String getBride() {
        return bride;
    }

    public void setBride(String bride) {
        this.bride = bride;
    }

    public String getSolarDate() {
        return solarDate;
    }

    public void setSolarDate(String solarDate) {
        this.solarDate = solarDate;
    }

    public String getSolarWeekday() {
        return solarWeekday;
    }

    public void setSolarWeekday(String solarWeekday) {
        this.solarWeekday = solarWeekday;
    }

    public String getLunar() {
        return lunar;
    }

    public void setLunar(String lunar) {
        this.lunar = lunar;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getCeremonyText() {
        return ceremonyText;
    }

    public void setCeremonyText(String ceremonyText) {
        this.ceremonyText = ceremonyText;
    }

    public String getEventPhrase() {
        return eventPhrase;
    }

    public void setEventPhrase(String eventPhrase) {
        this.eventPhrase = eventPhrase;
    }

    public String getInviteLine1() {
        return inviteLine1;
    }

    public void setInviteLine1(String inviteLine1) {
        this.inviteLine1 = inviteLine1;
    }

    public String getInviteLine2() {
        return inviteLine2;
    }

    public void setInviteLine2(String inviteLine2) {
        this.inviteLine2 = inviteLine2;
    }

    public String getInviteClosing() {
        return inviteClosing;
    }

    public void setInviteClosing(String inviteClosing) {
        this.inviteClosing = inviteClosing;
    }

    public String getNameFont() {
        return nameFont;
    }

    public void setNameFont(String nameFont) {
        this.nameFont = nameFont;
    }
}
