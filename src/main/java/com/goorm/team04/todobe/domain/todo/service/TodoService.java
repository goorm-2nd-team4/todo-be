package com.goorm.team04.todobe.domain.todo.service;

import com.goorm.team04.todobe.domain.todo.dto.TodoCreateRequest;
import com.goorm.team04.todobe.domain.todo.dto.TodoResponse;
import com.goorm.team04.todobe.domain.todo.dto.TodoUpdateRequest;
import com.goorm.team04.todobe.domain.todo.entity.Todo;
import com.goorm.team04.todobe.domain.todo.repository.TodoRepository;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public List<TodoResponse> getTodos() {
        return todoRepository.findAll().stream()
                .map(TodoResponse::from)
                .toList();
    }

    public TodoResponse getTodo(Long todoId) {
        return TodoResponse.from(findTodo(todoId));
    }

    @Transactional
    public TodoResponse createTodo(TodoCreateRequest request) {
        Todo todo = Todo.create(request.title(), request.description(), request.dueDate() );
        return TodoResponse.from(todoRepository.save(todo));
    }

    @Transactional
    public TodoResponse updateTodo(Long todoId, TodoUpdateRequest request) {
        Todo todo = findTodo(todoId);
        todo.update(request.title(), request.description(), request.completed(), request.dueDate());
        return TodoResponse.from(todo);
    }

    @Transactional
    public void deleteTodo(Long todoId) {
        todoRepository.delete(findTodo(todoId));
    }

    private Todo findTodo(Long todoId) {
        return todoRepository.findById(todoId)
                .orElseThrow(() -> new EntityNotFoundException("Todo를 찾을 수 없습니다. id=" + todoId));
    }
}
