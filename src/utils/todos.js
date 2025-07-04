export const findTodoById = (todos, id) => {
  if (!Array.isArray(todos)) return null;
  return todos.find((t) => t.id === Number(id));
};

export const findTodoByIdAndUpdate = (
  todos,
  id,
  override = {},
  fallback = null
) => {
  const todo = todos.find((t) => t.id === Number(id));
  if (!todo) {
    console.warn(`Todo not found with ID: ${id}`);
    return fallback;
  }

  // ✅ Log override values
  console.log(
    "findTodoByIdAndUpdate - override.isDeleted:",
    override.isDeleted
  );
  console.log("findTodoByIdAndUpdate - override.isDone:", override.isDone);

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
    isDeleted: (typeof override.isDeleted === "boolean"
      ? override.isDeleted
      : todo.isDeleted
    ).toString(),
  };
};
