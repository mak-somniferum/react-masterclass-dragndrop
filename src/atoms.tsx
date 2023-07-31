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
    'To Do': [
      { id: 1, text: 'one' },
      { id: 2, text: 'two' },
    ],
    Doing: [
      { id: 3, text: 'three' },
      { id: 4, text: 'four' },
    ],
    Done: [
      { id: 5, text: 'five' },
      { id: 6, text: 'six' },
    ],
  },
});
