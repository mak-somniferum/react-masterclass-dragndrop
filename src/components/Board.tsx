import React from 'react';
import { Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';
import { IMemo, boardArraySelector, boardState } from '../atoms';
import DraggableCard from './DraggableCard';

interface BoardProps {
  memos: IMemo[] | undefined;
  boardId: string;
  index: number;
}

interface AreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

export interface IForm {
  memo: string;
}

const BoardWrapper = styled.div`
  width: calc((100% - 20px) / 3);
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  border-radius: 10px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
  box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
  transition: color 0.3s;
`;

const Form = styled.form`
  width: 100%;
  padding: 0 10px;
  margin-bottom: 10px;

  input {
    width: 100%;
    border-radius: 5px;
    border: 0;
    padding: 10px;
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.cardColor};
    transition: color background-color 0.3s;
  }
`;

const Area = styled.div<AreaProps>`
  flex-grow: 1;
  padding: 10px;
  border-radius: 0 0 10px 10px;
  background-color: ${(props) =>
    props.$isDraggingOver ? '#fdcb6e' : props.$isDraggingFromThis ? '#c3c9cb' : 'transparent'};
  transition: background-color 0.3s;
`;

function Board({ memos, boardId, index }: BoardProps) {
  const [boards, setBoards] = useRecoilState(boardState);
  const boardsArray = useRecoilValue(boardArraySelector);
  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
    console.log(info);
    if (!destination) return;
    if (destination?.droppableId === source?.droppableId) {
      // Same board
      setBoards((allBoards) => {
        const copied = [...boardsArray];
        const [targetBoard] = copied.splice(index, 1);
        const allMemos = [...targetBoard[1]];
        const [targetMemo] = allMemos.splice(source.index, 1);
        allMemos.splice(destination.index, 0, targetMemo);
        copied.splice(index, 0, [source.droppableId, allMemos]);
        return new Map(copied);
      });
    }
    // if (destination?.droppableId !== source?.droppableId) {
    //   // Cross board
    //   setBoards((allBoards) => {
    //     const copied = [...boardsArray];
    //     const startBoard = [...allBoards[source.droppableId]];
    //     const [copied] = startBoard.splice(source.index, 1);
    //     const endBoard = [...allBoards[destination?.droppableId]];
    //     endBoard.splice(destination?.index, 0, copied);
    //     return {
    //       ...allBoards,
    //       [source.droppableId]: startBoard,
    //       [destination?.droppableId]: endBoard,
    //     };
    //   });
    // }
  };
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ memo }: IForm) => {
    const newMemo = {
      id: `memo-${Date.now()}`,
      text: memo,
    };
    setBoards((allBoards) => {
      const allMemos = boards.get(boardId);
      if (!allMemos) {
        return allBoards;
      } else {
        return new Map(allBoards.set(boardId, [...allMemos, newMemo]));
      }
    });
    setValue('memo', '');
  };
  return (
    <Draggable draggableId={boardId} index={index}>
      {(magic, info) => (
        <BoardWrapper ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input {...register('memo', { required: true })} type="text" placeholder="Add memo" />
          </Form>
          <Droppable droppableId={boardId} type="memos" direction="vertical">
            {(magic, info) => (
              <Area
                $isDraggingOver={info.isDraggingOver}
                $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={magic.innerRef}
                {...magic.droppableProps}
              >
                {memos?.map((memo, index) => (
                  <DraggableCard
                    key={memo.id}
                    memoId={memo.id}
                    memoText={memo.text}
                    index={index}
                    boardId={boardId}
                  />
                ))}
                {magic.placeholder}
              </Area>
            )}
          </Droppable>
        </BoardWrapper>
      )}
    </Draggable>
  );
}

export default React.memo(Board);
