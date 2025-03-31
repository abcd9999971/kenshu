import React from 'react';
import { Todo } from '../type';


interface TodoListProps {
    todos: Todo[];  // todoリスト
    onDelete: (id: number) => void; // 削除関数
    onToggleComplete?: (id: number) => void; // 完成状態関数
    onSelectTodo?: (id: number) => void; // 選択状態関数
  }

const TodoList = ({ todos, onToggleComplete, onDelete, onSelectTodo }: TodoListProps) => {
    if (todos.length === 0) {
        return <div className="todo-list">登録されたToDoはありません</div>;
    }
    
    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <div className={`todo-item ${todo.completed ? "completed" : ""}`} key={todo.id}>
                    <div className = 'todo-item-left'>   
                        <input
                            type="checkbox"
                            aria-label={`todo-${todo.id}`} //label付与
                            id={`todo-${todo.id}`} //inputにIDを付与
                            checked={todo.completed}
                            onChange={() => onToggleComplete && onToggleComplete(todo.id)}
                            onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
                        />
                    <h3>{todo.title}</h3>    
                    </div> 
                    <div className="todo-item-content">    
                        
                        <p>期限: {todo.deadline}</p>
                    </div>
                    <div className = 'todo-item-right'>
                        <button onClick={() => onSelectTodo && onSelectTodo(todo.id)}>詳細</button>
                        <button className = 'delete' onClick={() => onDelete(todo.id)}>削除</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default TodoList;
