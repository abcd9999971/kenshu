import React from 'react';
import { Todo } from '../type';


interface TodoListProps {
    todos: Todo[];  // todoリスト
    onDelete: (id: number) => void; // 削除関数
    onToggleComplete?: (id: number) => void; // 完成状態関数
    onSelectTodo?: (todo: Todo) => void; // 選択状態関数
  }

const TodoList = ({ todos, onToggleComplete, onDelete, onSelectTodo }: TodoListProps) => {
    if (todos.length === 0) {
        return <div className="todo-list">登録されたToDoはありません</div>;
    }
    
    return (
        
        <div className="todo-list">
            {todos.map((todo) => (
                <>
                <div className="todo-item" key={todo.id}>
                    <h3>{todo.title}</h3>
                    <p>期限: {todo.deadline}</p>
                    <p>{todo.completed ? '完了' : '未完了'}</p>
                </div>
                <div className="todo-left">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => onToggleComplete && onToggleComplete(todo.id)}
                        onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
                    />
                </div>
                <div className="todo-right">
                    <button onClick={() => onSelectTodo && onSelectTodo(todo)}>詳細</button>
                    <button onClick={() => onDelete(todo.id)}>削除</button>
                </div>
                </>
                ))}
        </div>
        );
}
export default TodoList;
