const express = require("express");

const app = express();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = Number(process.env.PORT || 8080);

app.use(express.json());

let nextId = 1;
const todos = [];

const isBlank = (value) => typeof value !== "string" || value.trim() === "";

const createError = (status, message, errors = {}) => ({
  status,
  body: {
    timestamp: new Date().toISOString(),
    status,
    message,
    errors
  }
});

const validateCreate = (body) => {
  const errors = {};

  if (isBlank(body.title)) {
    errors.title = "title is required";
  }

  if (body.description != null && typeof body.description !== "string") {
    errors.description = "description must be a string";
  }

  if (body.dueDate != null && typeof body.dueDate !== "string") {
    errors.dueDate = "dueDate must be a string";
  }

  return errors;
};

const validateUpdate = (body) => {
  const errors = validateCreate(body);

  if (typeof body.completed !== "boolean") {
    errors.completed = "completed must be a boolean";
  }

  return errors;
};

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/todos", (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const errors = validateCreate(req.body);
  if (Object.keys(errors).length > 0) {
    const error = createError(400, "Invalid request body", errors);
    return res.status(error.status).json(error.body);
  }

  const now = new Date().toISOString();
  const todo = {
    id: nextId++,
    title: req.body.title.trim(),
    description: req.body.description ?? "",
    completed: false,
    createdAt: now,
    updatedAt: now,
    dueDate: req.body.dueDate ?? null
  };

  todos.push(todo);
  return res.status(201).location(`/api/todos/${todo.id}`).json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);
  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    const error = createError(404, `Todo not found. id=${req.params.id}`);
    return res.status(error.status).json(error.body);
  }

  const errors = validateUpdate(req.body);
  if (Object.keys(errors).length > 0) {
    const error = createError(400, "Invalid request body", errors);
    return res.status(error.status).json(error.body);
  }

  todo.title = req.body.title.trim();
  todo.description = req.body.description ?? "";
  todo.completed = req.body.completed;
  todo.dueDate = req.body.dueDate ?? null;
  todo.updatedAt = new Date().toISOString();

  return res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todoId = Number(req.params.id);
  const index = todos.findIndex((item) => item.id === todoId);

  if (index === -1) {
    const error = createError(404, `Todo not found. id=${req.params.id}`);
    return res.status(error.status).json(error.body);
  }

  todos.splice(index, 1);
  return res.status(204).send();
});

app.listen(PORT, HOST, () => {
  console.log(`Express server listening on http://${HOST}:${PORT}`);
});
