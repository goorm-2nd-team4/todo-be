package com.goorm.team04.todobe.domain.todo.dto;

import com.goorm.team04.todobe.domain.todo.entity.Todo;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Schema(description = "Todo 응답")
public record TodoResponse(
        Long id,
        String title,
        String description,
        boolean completed,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDate dueDate
) {

    public static TodoResponse from(Todo todo) {
        return new TodoResponse(
                todo.getId(),
                todo.getTitle(),
                todo.getDescription(),
                todo.isCompleted(),
                todo.getCreatedAt(),
                todo.getUpdatedAt(),
                todo.getDueDate()
        );
    }
}
