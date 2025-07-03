export const findTodoById = (todos, id) => {
  if (!Array.isArray(todos)) return null;
  return todos.find((t) => t.id === Number(id));
};

export const findTodoByIdAndUpdate = (todos, id, override = {}) => {
  const todo = todos.find((t) => t.id === Number(id));
  if (!todo) return fallback;

  return {
    userId: todo.user.id,
    username: todo.user.username,
    description: todo.description,
    isDone: (typeof override.isDone === "boolean"
      ? override.isDone
      : todo.isDone
    ).toString(),
    dateCreated: todo.dateCreated,
    targetDate: todo.targetDate,
    isDeleted: todo.isDeleted,
  };
};
