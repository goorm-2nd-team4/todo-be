package com.goorm.team04.todobe.domain.todo.repository;

import com.goorm.team04.todobe.domain.todo.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
