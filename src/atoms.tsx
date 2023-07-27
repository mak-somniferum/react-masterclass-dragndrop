import { atom } from 'recoil';

interface ToDoState {
  [key: string]: string[];
}

export const toDoState = atom<ToDoState>({
  key: 'toDo',
  default: {
    to_do: ['a', 'b'],
    doing: ['c', 'd', 'e'],
    done: ['f', 'g', 'h'],
  },
});
