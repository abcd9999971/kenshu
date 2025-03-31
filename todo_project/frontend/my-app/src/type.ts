export interface Todo {
    id: number;
    title: string;
    deadline: string;
    completed: boolean;
    details?: Detail[];
  }
export interface Detail {
        id: number;
        title: string;
        todo_id: number;
        completed: boolean;
    }

