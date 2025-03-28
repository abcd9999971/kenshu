import React, { useState } from 'react';
import { Todo } from '../type';

interface TodoFormProps {
    onAddTodo: (newTodo: Omit<Todo, 'id'>) => void;
  }


  const TodoForm = ({ onAddTodo }: TodoFormProps) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!title.trim()) {
            alert('内容を入力してください');    
            return
        };
        if (date.trim() === '') {
            alert('期限を入力してください');    
            return
        };
        const newTodo: Omit<Todo, 'id'> = {
            title,
            deadline: date,
            completed: false,
        };

        
        //親コンポーネントのonAddTodoを呼び出す
        onAddTodo(newTodo);
        //送信したらフォームをリセット
        setTitle('');
        setDate('');
    };
    return (
        <form className="card" onSubmit={handleSubmit}>
        <div className="card-header">
            <h2 className="card-title">新しいToDoを登録</h2>
        </div>
            <div className="card-content">
            <div className="add-todo">
                <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ToDoの内容を入力"
                required
                />
                <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
            <button className="btn btn-primary" type="submit">登録</button>
            </div>
        </div>
        </form>

)}

export default TodoForm;