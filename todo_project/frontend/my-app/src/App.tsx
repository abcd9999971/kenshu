import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<any>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // 获取后端的todo数据
    fetch('http://localhost:8000/api/tasks/')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSearchClick = () => {
    // 在这里可以根据搜索条件过滤todo列表
    console.log('Searching for:', search);
  };

  return (
    <div className="layout">
      <header className="header">
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search todos..."
        />
        <button onClick={handleSearchClick}>Search</button>
      </header>
      <div className="main">
        <div className="todo-list">
          {todos.map((todo) => (
            <div
              key={todo.id}
              onClick={() => setSelectedTodo(todo)}
              className="todo-item"
            >
              {todo.title}
            </div>
          ))}
        </div>
        <div className="todo-detail">
          {selectedTodo ? (
            <div>
              <h2>{selectedTodo.title}</h2>
              <p>{selectedTodo.detail}</p>
            </div>
          ) : (
            <p>Select a todo to see details</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
