import { Draggable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import React from 'react';

interface DraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

interface CardProps {
  $isDragging: boolean;
}

const Card = styled.div<CardProps>`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  background-color: ${props => (props.$isDragging ? '#ffeaa7' : props.theme.cardColor)};
  box-shadow: ${props => (props.$isDragging ? '0px 2px 5px rgba(0,0,0,0.5)' : 'none')};
`;

function DraggableCard({ toDoId, toDoText, index }: DraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ''} index={index}>
      {(magic, info) => (
        <Card $isDragging={info.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
