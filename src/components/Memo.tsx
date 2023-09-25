import styled from 'styled-components';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IForm } from './Board';
import { useRecoilState } from 'recoil';
import { boardState } from '../atoms';

const Box = styled.div`
  display: flex;
  gap: 5px;
`;

const Button = styled.button`
  border: 0;
  width: 28px;
  height: 28px;
  font-size: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.textColor};
  transition: transform 0.2s;

  &:active {
    transform: scale(0.85);
  }
`;

const Form = styled.form`
  display: flex;
  gap: 5px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const Input = styled.textarea`
  width: 100%;
  padding: 5px;
  border: 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.boardColor};
  color: ${(props) => props.theme.textColor};
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 1rem;
  line-height: 1.4;
  resize: none;
`;

const Text = styled.p`
  flex: 1;
  padding-top: 3px;
  word-break: keep-all;
  line-height: 1.4;
`;

interface MemoProps {
  memoId: string;
  memoText: string;
  boardId: string;
  index: number;
}

function Memo({ memoId, memoText, boardId, index }: MemoProps) {
  const [boards, setBoards] = useRecoilState(boardState);
  const [modify, setModify] = useState(false);
  const { register, handleSubmit } = useForm<IForm>();

  const handleModify = () => {
    setModify(!modify);
  };

  const onValid = ({ memo }: IForm) => {
    setBoards((allBoards) => {
      const allMemos = boards.get(boardId);
      if (!allMemos) {
        return allBoards;
      } else {
        allMemos.splice(index, 1, { id: memoId, text: memo });
        return new Map(allBoards.set(boardId, [...allMemos]));
      }
    });
  };

  if (modify) {
    return (
      <Form name="updateForm" onSubmit={handleSubmit(onValid)}>
        <Input {...register('memo', { required: true })} defaultValue={memoText} />
        <div>
          <Button type="button" onClick={handleModify}>
            x
          </Button>
          <Button type="submit" form="updateForm">
            ✔
          </Button>
        </div>
      </Form>
    );
  } else {
    return (
      <Box>
        <Text>{memoText}</Text>
        <Button type="button" onClick={handleModify}>
          🖊
        </Button>
      </Box>
    );
  }
}
export default Memo;
