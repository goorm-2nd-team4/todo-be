package com.goorm.team04.todobe.domain.todo.controller;

import com.goorm.team04.todobe.domain.todo.dto.TodoCreateRequest;
import com.goorm.team04.todobe.domain.todo.dto.TodoResponse;
import com.goorm.team04.todobe.domain.todo.dto.TodoUpdateRequest;
import com.goorm.team04.todobe.domain.todo.service.TodoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Todo", description = "Todo CRUD API")
@RestController
@RequestMapping("/api/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @Operation(summary = "Todo 목록 조회")
    @GetMapping
    public ResponseEntity<List<TodoResponse>> getTodos() {
        return ResponseEntity.ok(todoService.getTodos());
    }

    @Operation(summary = "Todo 단건 조회")
    @GetMapping("/{todoId}")
    public ResponseEntity<TodoResponse> getTodo(@PathVariable Long todoId) {
        return ResponseEntity.ok(todoService.getTodo(todoId));
    }

    @Operation(summary = "Todo 생성")
    @PostMapping
    public ResponseEntity<TodoResponse> createTodo(@Valid @RequestBody TodoCreateRequest request) {
        TodoResponse response = todoService.createTodo(request);
        return ResponseEntity.created(URI.create("/api/todos/" + response.id())).body(response);
    }

    @Operation(summary = "Todo 수정")
    @PutMapping("/{todoId}")
    public ResponseEntity<TodoResponse> updateTodo(
            @PathVariable Long todoId,
            @Valid @RequestBody TodoUpdateRequest request
    ) {
        return ResponseEntity.ok(todoService.updateTodo(todoId, request));
    }

    @Operation(summary = "Todo 삭제")
    @DeleteMapping("/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todoId) {
        todoService.deleteTodo(todoId);
        return ResponseEntity.noContent().build();
    }
}
