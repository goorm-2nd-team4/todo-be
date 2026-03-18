const { ObjectId } = require("mongodb");
const { getTodoCollection } = require("../db/mongo");

function serializeTodo(todo) {
  return {
    id: todo._id.toString(),
    title: todo.title,
    completed: todo.completed
  };
}

function parseTodoId(id) {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
}

async function listTodos() {
  const todos = await getTodoCollection()
    .find({})
    .sort({ _id: -1 })
    .toArray();

  return todos.map(serializeTodo);
}

async function createTodo(input) {
  const todo = {
    title: input.title.trim(),
    completed: false
  };

  const result = await getTodoCollection().insertOne(todo);

  return serializeTodo({
    _id: result.insertedId,
    ...todo
  });
}

async function updateTodo(id, input) {
  const todoId = parseTodoId(id);

  if (!todoId) {
    return null;
  }

  const updates = {
    title: input.title.trim(),
    completed: input.completed
  };

  const todo = await getTodoCollection().findOneAndUpdate(
    { _id: todoId },
    { $set: updates },
    { returnDocument: "after" }
  );

  return todo ? serializeTodo(todo) : null;
}

async function deleteTodo(id) {
  const todoId = parseTodoId(id);

  if (!todoId) {
    return false;
  }

  const result = await getTodoCollection().deleteOne({ _id: todoId });
  return result.deletedCount > 0;
}

module.exports = {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo
};
