function isBlank(value) {
  return typeof value !== "string" || value.trim() === "";
}

function validateCreateTodo(body) {
  const errors = {};

  if (isBlank(body.title)) {
    errors.title = "title is required";
  }

  return errors;
}

function validateUpdateTodo(body) {
  const errors = validateCreateTodo(body);

  if (typeof body.completed !== "boolean") {
    errors.completed = "completed must be a boolean";
  }

  return errors;
}

module.exports = {
  validateCreateTodo,
  validateUpdateTodo
};
