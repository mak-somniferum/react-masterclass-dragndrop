import { Draggable } from 'react-beautiful-dnd';
import { styled } from 'styled-components';
import React from 'react';
import Memo from './Memo';
export interface DraggableCardProps {
  memoId: string;
  memoText: string;
  index: number;
  boardId: string;
}

interface CardProps {
  $isDragging: boolean;
}

const Card = styled.div<CardProps>`
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => (props.$isDragging ? '#ffeaa7' : props.theme.cardColor)};
  box-shadow: ${(props) => (props.$isDragging ? '0px 2px 5px rgba(0,0,0,0.5)' : 'none')};
  transition: 0.3s;

  &:hover {
    background-color: ${(props) => (props.$isDragging ? '#ffeaa7' : props.theme.cardHoverColor)};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

function DraggableCard({ memoId, memoText, index, boardId }: DraggableCardProps) {
  return (
    <Draggable draggableId={memoId} index={index}>
      {(magic, info) => (
        <Card
          $isDragging={info.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          <Memo memoId={memoId} memoText={memoText} boardId={boardId} index={index} />
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
