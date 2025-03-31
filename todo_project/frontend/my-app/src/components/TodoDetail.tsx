import { Todo } from '../type';


export interface TodoDetailProps {
    selectedTodo: Todo | null;  // todoリスト
    onDelete: (id: number) => void; // 削除関数
    onToggleComplete?: (id: number) => void; // 完成状態関数
    onClose : () => void; // 選択状態関数
    onToggleCompleteSub?: (id: number, subId: number) => void; // 詳細完成状態関数
    onAddDetail?: (title: string, id: number) => void; // 詳細追加関数
    onDeleteSub?: (id: number, subId: number) => void; // 詳細削除関数
    }


    import { useState } from 'react';

    const TodoDetail = ({ selectedTodo, onClose, onToggleComplete, onDelete, onToggleCompleteSub, onAddDetail,onDeleteSub }: TodoDetailProps) => {
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
                            {selectedTodo.details?.map((detail) => (
                            <div key={detail.id}> 
                                <p><input //詳細のリスト
                                    type="checkbox"
                                    aria-label={`detail-${detail.id}`} //label付与
                                    id={`detail-${detail.id}`} //inputにIDを付与
                                    checked={detail.completed}
                                    onChange={() => onToggleCompleteSub?.(selectedTodo.id , detail.id)}
                                    onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
                                />{detail.title}
                                <button className='delete' onClick={() => onDeleteSub?.(selectedTodo.id, detail.id)}>削除</button>
                                </p>
                            </div>
                            ))}
                            
                            <input //詳細追加
                                type="text"
                                placeholder="詳細を追加..."
                                id='detail-form-input'
                                value={Subtitle}
                                onChange={(e) => setSubTitle(e.target.value)}
                            />
                            <p><button onClick={() => {
                                if (!Subtitle.trim()) {
                                    alert('詳細を入力してください');    
                                    return
                                };
                                onAddDetail?.(Subtitle, selectedTodo.id);
                                setSubTitle(""); //送信したらフォームをリセット
                                }
                            }>詳細追加</button></p>
                            <button onClick={() => onToggleComplete?.(selectedTodo.id)}>完成状態変更</button>
                            <button className='delete' onClick={() => onDelete?.(selectedTodo.id)}>TODOを削除</button>
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
