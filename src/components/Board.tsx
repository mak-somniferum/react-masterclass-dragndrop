import { Droppable } from 'react-beautiful-dnd';
import DraggableCard from './DraggableCard';
import { styled } from 'styled-components';
import { useForm } from 'react-hook-form';
import { ITodo, toDoState } from '../atoms';
import { useRecoilState, useSetRecoilState } from 'recoil';

interface BoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface AreaProps {
  $isDraggingOver: boolean;
  $isDraggingFromThis: boolean;
}

interface IForm {
  toDo: string;
}

const BoardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  border-radius: 10px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
`;

const Area = styled.div<AreaProps>`
  flex-grow: 1;
  padding: 10px;
  background-color: ${(props) =>
    props.$isDraggingOver ? '#fdcb6e' : props.$isDraggingFromThis ? '#c3c9cb' : 'transparent'};
  transition: background-color 0.3s;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Form = styled.form`
  width: 100%;

  input {
    width: 100%;
  }
`;

function Board({ toDos, boardId }: BoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo],
      };
    });
    setValue('toDo', '');
  };
  return (
    <BoardWrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register('toDo', { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            $isDraggingOver={info.isDraggingOver}
            $isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </BoardWrapper>
  );
}

export default Board;
