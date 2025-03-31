import { Todo } from '../type';


export interface TodoDetailProps {
    selectedTodo: Todo | null;  // todoリスト
    onDelete: (id: number) => void; // 削除関数
    onToggleComplete?: (id: number) => void; // 完成状態関数
    onClose : () => void; // 選択状態関数
    onToggleCompleteSub?: (id: number, subId: number) => void; // 詳細完成状態関数
    onAddDetail?: (title: string, id: number) => void; // 詳細追加関数
    }


    import { useState } from 'react';

    const TodoDetail = ({ selectedTodo, onClose, onToggleComplete, onDelete, onToggleCompleteSub, onAddDetail }: TodoDetailProps) => {
        const [Subtitle, setSubTitle] = useState("");

        return (
            <div className="card" id="details-card">
                <div className="card-header">ToDo詳細</div>
                <div className="card-body">
                    {selectedTodo ? (
                        <div className="todo-detail">
                            <h3>{selectedTodo.title}</h3>
                            <p>期限: {selectedTodo.deadline}</p>

                            <p>詳細:</p>
                            {selectedTodo.details?.map((detail, index) => (
                            <div key={index}> 
                                <p><input
                                    type="checkbox"
                                    checked={detail.completed}
                                    onChange={() => onToggleCompleteSub &&onToggleCompleteSub(selectedTodo.id , detail.id)}
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
                                />{detail.title}</p>
                            </div>
                            ))}
                            <input
                                type="text"
                                placeholder="詳細を追加..."
                                onChange={(e) => setSubTitle(e.target.value)}
                            />
                            <button onClick={() => onAddDetail?.(Subtitle, selectedTodo.id)}>詳細追加</button>
                            <button onClick={() => onToggleComplete?.(selectedTodo.id)}>完了</button>
                            <button onClick={() => onDelete?.(selectedTodo.id)}>削除</button>
                            <button className="close-details" onClick={onClose}>&times;</button>
                        </div>
                    ) : (
                        <p className="empty-message">ToDoを選択してください</p>
                    )}
                </div>
            </div>
        );
    };
    
    export default TodoDetail;
