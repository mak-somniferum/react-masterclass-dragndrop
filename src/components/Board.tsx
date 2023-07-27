import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { styled } from 'styled-components';

interface BoardProps {
  toDos: string[];
  boardId: string;
}

const BoardWrapper = styled.div`
  padding: 20px 10px;
  border-radius: 10px;
  min-height: 200px;
  background-color: ${props => props.theme.boardColor};
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
`;

function Board({ toDos, boardId }: BoardProps) {
  return (
    <BoardWrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {magic => (
          <CardWrapper ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </CardWrapper>
        )}
      </Droppable>
    </BoardWrapper>
  );
}

export default Board;
