import React, { useState, useEffect } from 'react';
import TodoInput2 from '../components/TodoInput2';
import TodoList2 from '../components/TodoList2';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }));
  }

  function handleAddTodos(newTodo) {
    if (newTodo.trim() === '') {
      return;
    }
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }

  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localTodos = localStorage.getItem('todos');
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h2>
      
      <div className="mb-6">
        <TodoInput2
          todoValue={todoValue}
          setTodoValue={setTodoValue}
          handleAddTodos={handleAddTodos}
        />
      </div>

      <div className="mt-4">
        <TodoList2
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
        />
      </div>

      {todos.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No todos yet. Add one to get started!
        </div>
      )}
    </div>
  );
};

export default TodoList;