const express = require("express");
const {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../services/todo-service");
const { createError } = require("../utils/http-error");
const { validateCreateTodo, validateUpdateTodo } = require("../utils/todo-validation");

const todoRouter = express.Router();

todoRouter.get("/", async (req, res, next) => {
  try {
    const todos = await listTodos();
    res.json(todos);
  } catch (error) {
    next(error);
  }
});

todoRouter.post("/", async (req, res, next) => {
  try {
    const errors = validateCreateTodo(req.body);
    if (Object.keys(errors).length > 0) {
      const error = createError(400, "Invalid request body", errors);
      return res.status(error.status).json(error.body);
    }

    const todo = await createTodo(req.body);
    return res.status(201).location(`/api/todos/${todo.id}`).json(todo);
  } catch (error) {
    next(error);
  }
});

todoRouter.put("/:id", async (req, res, next) => {
  try {
    const errors = validateUpdateTodo(req.body);
    if (Object.keys(errors).length > 0) {
      const error = createError(400, "Invalid request body", errors);
      return res.status(error.status).json(error.body);
    }

    const todo = await updateTodo(req.params.id, req.body);

    if (!todo) {
      const error = createError(404, `Todo not found. id=${req.params.id}`);
      return res.status(error.status).json(error.body);
    }

    return res.json(todo);
  } catch (error) {
    next(error);
  }
});

todoRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteTodo(req.params.id);

    if (!deleted) {
      const error = createError(404, `Todo not found. id=${req.params.id}`);
      return res.status(error.status).json(error.body);
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = {
  todoRouter
};
