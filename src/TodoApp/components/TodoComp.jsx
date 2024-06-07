import React, { useState } from "react";

const TodoComp = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editInput, setEditInput] = useState("");

  const handleInputTodo = (e) => setTodo(e.target.value);

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    setTodoList([...todoList, todo]);
    setTodo("");
  };

  const handleDeleteTodo = (index) => {
    setTodoList(todoList.filter((todos, i) => i !== index));
  };

  const handleEditInput = (e) => setEditInput(e.target.value);

  const handleEditSubmit = (e, index) => {
    e.preventDefault();
    if (!editInput.trim()) return;
    const newTodos = todoList.map((todo, i) =>
      i === index ? editInput : todo
    );
    setTodoList(newTodos);
    CancelEditing();
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditInput(todoList[index]);
  };

  const CancelEditing = () => {
    setEditIndex(null);
    setEditInput("");
  };

  return (
    <div className="todo-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleAddTodo}>
          <input
            placeholder="Enter Your Task"
            type="text"
            value={todo}
            onChange={handleInputTodo}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>

      <ul style={{ display: "flex", justifyContent: "center" }}>
        {todoList.map((todos, index) => {
          return (
            <li key={index} className="list-todo">
              {editIndex === index ? (
                <form onSubmit={(e) => handleEditSubmit(e, index)}>
                  <input
                    type="text"
                    placeholder="Edit your task"
                    value={editInput}
                    onChange={handleEditInput}
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={CancelEditing}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  {todos}
                  <button onClick={() => startEditing(index)}>Edit</button>
                  <button onClick={() => handleDeleteTodo(index)}>
                    Delete
                  </button>
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
