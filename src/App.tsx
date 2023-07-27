import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { toDoState } from './atoms';
import Board from './components/Board';

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  gap: 10px;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    if (destination?.droppableId === source?.droppableId) {
      // Same board
      setToDos(allBoards => {
        const newBoard = [...allBoards[source.droppableId]];
        const [copied] = newBoard.splice(source.index, 1);
        newBoard.splice(destination.index, 0, copied);
        return { ...allBoards, [source.droppableId]: newBoard };
      });
    }
    if (destination?.droppableId !== source?.droppableId) {
      // Cross board
      if (!destination) return;
      setToDos(allBoards => {
        const startBoard = [...allBoards[source.droppableId]];
        const [copied] = startBoard.splice(source.index, 1);
        const endBoard = [...allBoards[destination?.droppableId]];
        endBoard.splice(destination?.index, 0, copied);
        return {
          ...allBoards,
          [source.droppableId]: startBoard,
          [destination?.droppableId]: endBoard,
        };
      });
    }
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map(boardId => (
              <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
