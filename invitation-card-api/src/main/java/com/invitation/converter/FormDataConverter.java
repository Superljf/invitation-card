package com.invitation.converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.invitation.dto.FormDataDto;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

/**
 * FormDataDto 与 JSON 互转
 */
@Converter
public class FormDataConverter implements AttributeConverter<FormDataDto, String> {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(FormDataDto attribute) {
        if (attribute == null) return null;
        try {
            return MAPPER.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("FormDataDto serialize error", e);
        }
    }

    @Override
    public FormDataDto convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) return null;
        try {
            return MAPPER.readValue(dbData, FormDataDto.class);
        } catch (JsonProcessingException e) {
            throw new IllegalArgumentException("FormDataDto deserialize error", e);
        }
    }
}
