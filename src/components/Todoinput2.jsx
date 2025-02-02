
import React from 'react';

const TodoInput2 = ({ handleAddTodos, todoValue, setTodoValue }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTodos(todoValue);
    setTodoValue('');
  };
  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        className="todo-input"
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        placeholder="Enter todo..."
      />
      <button type="submit" className="add-btn transition">
        Add
      </button>
    </form>
  );
};

export default TodoInput2;

