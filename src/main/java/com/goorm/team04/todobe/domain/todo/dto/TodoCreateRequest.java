package com.goorm.team04.todobe.domain.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Schema(description = "Todo 생성 요청")
public record TodoCreateRequest(
        @Schema(description = "할 일 제목", example = "JPA 엔티티 설계")
        @NotBlank(message = "제목은 비어 있을 수 없습니다.")
        @Size(max = 100, message = "제목은 100자 이하여야 합니다.")
        String title,

        @Schema(description = "할 일 상세 설명", example = "Todo, User 관계까지 고려한다.")
        @Size(max = 500, message = "설명은 500자 이하여야 합니다.")
        String description,

        @Schema(description = "마감일", example = "2026-03-20", nullable = true)
        LocalDate dueDate
){}
