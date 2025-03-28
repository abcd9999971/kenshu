import { Todo } from '../type';


export interface TodoDetailProps {
    selectedTodo: Todo | null;  // todoリスト
    onDelete: (id: number) => void; // 削除関数
    onToggleComplete?: (id: number) => void; // 完成状態関数
    onClose : () => void; // 選択状態関数
    }


    const TodoDetail = ({ selectedTodo, onClose, onToggleComplete, onDelete }: TodoDetailProps) => {
        return (
            <div className="card" id="details-card">
                
                <div className="card-header">ToDo詳細</div>
                <div className="card-body">
                    {selectedTodo ? (
                        <div className="todo-detail">
                            <h3>{selectedTodo.title}</h3>
                            <p>期限: {selectedTodo.deadline}</p>
                            <p>{selectedTodo.completed ? '完了' : '未完了'}</p>

                            <p>詳細:</p>
                            {selectedTodo.details?.map((detail, index) => (
                            <div key={index}> 
                                <p>{detail.title}</p>
                                <p>{detail.completed ? '完了' : '未完了'}</p>
                            </div>
                            ))}

                            <button onClick={() => onToggleComplete?.(selectedTodo.id)}>完了</button>
                            <button onClick={() => onDelete?.(selectedTodo.id)}>削除</button>
                            <button className="close-details" onClick={() => onClose}>&times;</button>
                        </div>
                    ) : (
                        <p className="empty-message">ToDoを選択してください</p>
                    )}
                </div>
            </div>
        );
    };
    
    export default TodoDetail;
