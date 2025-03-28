import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';


interface Todo {
  id: number;
  title: string;
  deadline: string;
  completed: boolean;
}

interface  Detail {
  title: string;
  date: string;
  description: string;
  priority: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // 获取后端的todo数据
    fetch('http://localhost:8000/api/tasks/')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  

  // 搜索过滤
  const handleSearch = (searchTerm: string) => {
    const filtered = todos.filter(todo =>
      todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  // 添加todo
  const handleAddTodo = (newTodo: Omit<Todo, 'id'>) => {
    fetch('http://localhost:8000/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        setTodos([...todos, data]);
      });
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !todos.find(todo => todo.id === id)?.completed }),
    });
  }

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };
 
  const handleSelectTodo = (id : number) => {
    const selected = todos.find((todo) => todo.id === id);
    if (selected) {
      setSelectedTodo(selected);
    }
  };

  return (
    <>
      <SearchBar onSearch ={handleSearch} /> 
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList 
        todos={filteredTodos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onSelectTodo={handleSelectTodo}
      />
    </>
  );
}
export default App;

