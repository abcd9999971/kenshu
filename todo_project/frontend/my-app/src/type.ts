export interface Todo {
    id: number;
    title: string;
    deadline: string;
    completed: boolean;
    detail?: Detail;
  }
    export interface Detail {
        title: string;
    }