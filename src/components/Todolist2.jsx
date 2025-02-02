import React from 'react';
import TodoCard2 from './Todocard2';

const TodoList2 = ({ todos, handleDeleteTodo, handleEditTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo, todoIndex) => (
        <TodoCard2
          key={todoIndex}
          index={todoIndex}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        >
          <p>{todo}</p>
        </TodoCard2>
      ))}
    </ul>
  );
};

export default TodoList2;