import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { toDoState } from './atoms';
import DraggableCard from './components/DraggableCard';

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  border-radius: 10px;
  min-height: 200px;
  background-color: ${props => props.theme.boardColor};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    setToDos(oldTodos => {
      // 1) Copy
      const newToDos = [...oldTodos];
      // 2) Remove item on source index -> This will be returned as an array ['dragged-item']
      const [copied] = newToDos.splice(source.index, 1);
      // 3) Add item on destination index
      newToDos.splice(Number(destination?.index), 0, copied);
      return newToDos;
    });
  };
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            <Droppable droppableId="one">
              {magic => (
                <Board ref={magic.innerRef} {...magic.droppableProps}>
                  {toDos.map((toDo, index) => (
                    <DraggableCard key={toDo} toDo={toDo} index={index} />
                  ))}
                  {magic.placeholder}
                </Board>
              )}
            </Droppable>
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
