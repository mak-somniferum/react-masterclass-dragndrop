import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { styled } from 'styled-components';

interface BoardProps {
  toDos: string[];
  boardId: string;
}

const Wrapper = styled.div`
  padding: 20px 10px;
  border-radius: 10px;
  min-height: 200px;
  background-color: ${props => props.theme.boardColor};
`;

function Board({ toDos, boardId }: BoardProps) {
  return (
    <Droppable droppableId={boardId}>
      {magic => (
        <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
          {toDos.map((toDo, index) => (
            <DraggableCard key={toDo} toDo={toDo} index={index} />
          ))}
          {magic.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
}

export default Board;
