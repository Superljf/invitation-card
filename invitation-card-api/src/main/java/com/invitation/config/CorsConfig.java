package com.invitation.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * CORS 配置，允许前端跨域调用
 */
@Configuration
public class CorsConfig {

    private static final List<String> DEFAULT_ORIGINS = Arrays.asList(
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174"
    );

    @Value("${cors.allowed-origins:}")
    private String allowedOriginsConfig;

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        List<String> origins = parseOrigins(allowedOriginsConfig);
        if (origins.isEmpty()) {
            origins = DEFAULT_ORIGINS;
        }
        config.setAllowedOrigins(origins);
        config.addAllowedHeader("*");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("OPTIONS");
        config.setAllowCredentials(false);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    private List<String> parseOrigins(String s) {
        if (s == null || s.trim().isEmpty()) return Arrays.asList();
        return Arrays.stream(s.split(","))
            .map(String::trim)
            .filter(o -> !o.isEmpty())
            .collect(Collectors.toList());
    }
}
