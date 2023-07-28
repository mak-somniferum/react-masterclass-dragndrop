import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { styled } from 'styled-components';

interface BoardProps {
  toDos: string[];
  boardId: string;
}

interface AreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  border-radius: 10px;
  min-height: 200px;
  background-color: ${props => props.theme.boardColor};
`;

const Area = styled.div<AreaProps>`
  flex-grow: 1;
  background-color: ${props => (props.$isDraggingOver ? '#74b9ff' : props.$isDraggingFromThis ? '#ff7675' : '#b2bec3')};
  transition: background-color 0.3s;
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
        {(magic, info) => (
          <Area $isDraggingOver={info.isDraggingOver} $isDraggingFromThis={Boolean(info.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </BoardWrapper>
  );
}

export default Board;
