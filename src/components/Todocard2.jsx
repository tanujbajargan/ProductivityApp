
import React from 'react';

const TodoCard2 = ({ children, handleDeleteTodo, index, handleEditTodo }) => {
  return (
    <li className="todo-item transition">
      {children}
      <div className="actions-container">
        <button
          onClick={() => handleEditTodo(index)}
          className="edit-btn transition"
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button
          onClick={() => handleDeleteTodo(index)}
          className="delete-btn transition"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </li>
  );
};

export default TodoCard2;