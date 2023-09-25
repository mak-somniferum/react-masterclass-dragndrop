import { atom, selector } from 'recoil';

export interface IMemo {
  id: string;
  text: string;
}
export interface BoardState {
  key: string;
  value: IMemo[];
}

export type BoardMap = Map<string, IMemo[]>;

export const boardState = atom<BoardMap>({
  key: 'board',
  default: new Map([
    [
      'board-1',
      [
        { id: 'memo-1', text: 'Sample Memo 1 Sample Memo 1 Sample Memo 1' },
        { id: 'memo-2', text: 'Sample Memo 2' },
      ],
    ],
    ['board-2', [{ id: 'memo-3', text: 'Sample Memo 3' }]],
  ]),
});

export const boardArraySelector = selector({
  key: 'boardArraySelector',
  get: ({ get }) => {
    const boards = get(boardState);
    return Array.from(boards.entries());
  },
});

export const themeState = atom({
  key: 'isDark',
  default: false,
});
