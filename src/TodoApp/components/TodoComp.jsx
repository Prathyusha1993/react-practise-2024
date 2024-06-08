import React, { useState } from "react";

const TodoComp = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleTodoInput = (e) => setTodo(e.target.value);

  const handleAddTodoSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    setTodoList([...todoList, { text: todo, completed: false }]);
    setTodo("");
  };

  const handleDelete = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const handleEditTodoInput = (e) => setEditInput(e.target.value);

  const handleEditSubmit = (e, index) => {
    e.preventDefault();
    if (!editInput.trim()) return;
    const newTodos = todoList.map((todo, i) =>
      i === index ? { ...todo, text: editInput } : todo
    );
    setTodoList(newTodos);
    cancelEditing();
  };

  const cancelEditing = () => {
    setEditIndex(null);
    setEditInput("");
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditInput(todoList[index].text);
  };

  const toggleCompleted = (index) => {
    const newTodos = todoList.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodoList(newTodos);
  };

  return (
    <div className="todo-container">
      <h4>TODO LIST APP</h4>
      {/* <div> */}
      <form onSubmit={handleAddTodoSubmit}>
        <input
          type="text"
          placeholder="Enter Your Task"
          value={todo}
          onChange={handleTodoInput}
        />
        <button type="submit">Add Todo</button>
      </form>
      {/* </div> */}
      <ul style={{ display: "flex", justifyContent: "center" }}>
        {todoList.map((todos, index) => {
          return (
            <li key={index} className={todo.completed ? "completed" : ""}>
              {editIndex === index ? (
                <form onSubmit={(e) => handleEditSubmit(e, index)}>
                  <input
                    type="text"
                    placeholder="Edit Your Task"
                    value={editInput}
                    onChange={handleEditTodoInput}
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={cancelEditing}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <span onClick={() => toggleCompleted(index)}>
                    {todos.text}
                  </span>
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoComp;
