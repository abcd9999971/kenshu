import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import { Todo }from './type';
import { Detail } from './type';


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  /*
  useEffect(() => {
    // 获取后端的todo数据
    fetch('http://localhost:8000/api/tasks/')
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);
  */

  useEffect(() => {
    fetch("http://localhost:8000/api/tasks/")
        .then((response) => response.json())
        .then((data) => {
            const formattedTodos: Todo[] = data.map((task: any) => ({
                id: task.id,                // 映射 id
                title: task.title,          // 映射 title
                deadline: task.deadline,    // 映射 deadline
                completed: task.completed,  // 映射 completed
                detail: task.sub_tasks.length > 0 
                    ? { title: task.sub_tasks[0].title, todo_id: task.id } 
                    : undefined            // 将 sub_tasks 映射为 detail
            }));
            setTodos(formattedTodos);
        })
        .catch((error) => console.error("Error fetching todos:", error));
}, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  // 搜索过滤
  const handleSearch = (searchTerm: string) => {
    setFilteredTodos(
      searchTerm.trim()
        ? todos.filter(todo =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : todos
    );
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
  const handleCloseDetail = () => {
    setSelectedTodo(null);
  };

  return (
    <>
      <SearchBar onSearch ={handleSearch} /> 
      <TodoForm onAddTodo={handleAddTodo} />
      <div className="main">
      <div className="left">
      <TodoList 
        todos={filteredTodos}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onSelectTodo={handleSelectTodo}
      />
      </div>
      <div className="right">
      < TodoDetail
        selectedTodo={selectedTodo}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDelete}
        onClose={handleCloseDetail}
      />
      </div>
      </div>
    </>
  );
}
export default App;

