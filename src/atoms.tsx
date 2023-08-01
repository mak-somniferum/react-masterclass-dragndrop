import { atom } from 'recoil';

export interface ITodo {
  id: number;
  text: string;
}
interface ToDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<ToDoState>({
  key: 'toDo',
  default: {
    'To Do': [],
    Doing: [],
    Done: [],
  },
});
