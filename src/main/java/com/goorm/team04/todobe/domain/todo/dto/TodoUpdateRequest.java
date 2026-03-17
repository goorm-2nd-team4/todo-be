package com.goorm.team04.todobe.domain.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

@Schema(description = "Todo 수정 요청")
public record TodoUpdateRequest(
        @Schema(description = "할 일 제목", example = "Swagger 경로 정리")
        @NotBlank(message = "제목은 비어 있을 수 없습니다.")
        @Size(max = 100, message = "제목은 100자 이하여야 합니다.")
        String title,

        @Schema(description = "할 일 상세 설명", example = "운영 환경에서도 접근 경로를 통일한다.")
        @Size(max = 500, message = "설명은 500자 이하여야 합니다.")
        String description,

        @Schema(description = "완료 여부", example = "true")
        @NotNull(message = "완료 여부는 필수입니다.")
        Boolean completed,

        @Schema(description = "마감일", example = "2026-03-17")
        LocalDate dueDate

) {
}
