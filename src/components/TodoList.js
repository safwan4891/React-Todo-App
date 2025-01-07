import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    // Check for duplicates
    const isDuplicate = todos.some((item) => item.text.toLowerCase() === todo.text.toLowerCase());

    if (isDuplicate) {
      toast.error('Duplicate Todo! ', {
        position: 'top-center',
        autoClose: 1000,

        hideProgressBar: true,
        style: {
          backgroundColor: '#f8d7da',
          color: '#721c24',
          borderRadius: '8px',
        },
      });
      return;
    }
   



    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <div className="header-box">
        <h1>What's the Plan For Today?</h1>
      </div>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default TodoList;

