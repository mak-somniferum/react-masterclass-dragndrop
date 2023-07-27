import { atom } from 'recoil';

interface ToDoState {
  [key: string]: string[];
}

export const toDoState = atom<ToDoState>({
  key: 'toDo',
  default: {
    'To Do': ['a', 'b'],
    Doing: ['c', 'd', 'e'],
    Done: ['f', 'g', 'h'],
  },
});
