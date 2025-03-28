export interface Todo {
    id: number;
    title: string;
    deadline: string;
    completed: boolean;
    details?: Detail[];
  }
    export interface Detail {
        title: string;
        todo_id: number;
        completed: boolean;
    }

