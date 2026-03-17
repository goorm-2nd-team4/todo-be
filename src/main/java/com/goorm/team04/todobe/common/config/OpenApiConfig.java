package com.goorm.team04.todobe.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Todo API")
                        .description("Todo 앱 백엔드 API 문서")
                        .version("v1")
                        .contact(new Contact().name("Team04")))
                .servers(List.of(new Server().url("http://localhost:8080").description("Local")));
    }
}
