import { Draggable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import React from 'react';

interface DraggableCardProps {
  toDo: string;
  index: number;
}

const Card = styled.div`
  margin-bottom: 5px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.cardColor};
`;

function DraggableCard({ toDo, index }: DraggableCardProps) {
  console.log(toDo);
  return (
    <Draggable draggableId={toDo} index={index}>
      {magic => (
        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard); // prop이 변하지 않으면 렌더링하지 않음
