import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import { Todo }from './type';


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    // APIからデータを取得
    fetch('http://localhost:8000/api/tasks/')
      .then((response) => response.json())
      .then((data) => {
        const formattedTodos: Todo[] = data.map((task: any) => ({
          id: task.id,
          title: task.title,
          completed: task.completed,
          deadline: task.deadline,
          details: task.sub_tasks.map((subtask: any) => ({
            id: subtask.id,
            title: subtask.title,
            todo_id: task.id, // task.idを保存
            completed: subtask.completed,
          })),
        }));
        setTodos(formattedTodos);
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);
  

  
  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  // フィルター
  const handleSearch = (searchTerm: string) => {
    setFilteredTodos(
      searchTerm.trim()
        ? todos.filter(todo =>
            todo.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : todos
    );
  };

  // ToDoの追加
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
  // ToDo(task)の完了状態を変更
  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);

    fetch(`http://localhost:8000/api/tasks/${id}/completed/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } 
  // ToDoの詳細(subtask)の完了状態を変更
  const handleToggleCompleteSub= (id1: number, id2 : number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id1) {
      const updatedDetails = (todo.details ?? []).map((detail) =>
        detail.id === id2 ? { ...detail, completed: !detail.completed } : detail
      );
      return { ...todo, details: updatedDetails };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setSelectedTodo(updatedTodos.find(todo => todo.id === id1) || null);

    fetch(`http://localhost:8000/api/tasks/${id1}/completed/${id2}/`, {
      method: 'PATCH',
      headers: {
      'Content-Type': 'application/json',
      },
    });
  }


  // Todo削除
  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/api/tasks/${id}/`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };

  // 詳細の削除
  const handleDeleteSub = (id1: number,id2:number) => {
    fetch(`http://localhost:8000/api/tasks/${id1}/delete_subtask/${id2}/`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedTodos = todos.map((todo) => {
          if (todo.id === id1) {
            const updatedDetails = todo.details?.filter((detail) => detail.id !== id2);
            return { ...todo, details: updatedDetails };
          }
          return todo;
        });
        setTodos(updatedTodos);
        setSelectedTodo(updatedTodos.find(todo => todo.id === id1) || null); 
      });
  };
  
  // 詳細の選択
  const handleSelectTodo = (id : number) => {
    const selected = todos.find((todo) => todo.id === id);
    if (selected) {
      setSelectedTodo(selected);
    }
  };
  const handleCloseDetail = () => {
    setSelectedTodo(null);
  };

  // 詳細の追加
  const handleAddDetail = async (title:string , todo_id : number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${todo_id}/add_subtask/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
          }),
      });

      if (!response.ok) throw new Error("Failed to create item");

      const createdItem = await response.json(); //  Djangoのレスポンス更新
      const update = todos.map((todo) => {
        if (todo.id === todo_id) {
          const updatedDetails = [...(todo.details || []),
            {
              id: createdItem.id,
              title: createdItem.title,
              todo_id: todo_id,
              completed: false,
            },
        ];
          return { ...todo, details: updatedDetails };
        }
        return todo;
      });
      setTodos(update); 
      setSelectedTodo(update.find((todo) => todo.id === todo_id) || null);
          } catch (error) {
      console.error(error);
      }
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
        onToggleCompleteSub={handleToggleCompleteSub}
        onAddDetail={handleAddDetail}
        onDeleteSub={handleDeleteSub}
      />
      </div>
      </div>
    </>
  );
}
export default App;

