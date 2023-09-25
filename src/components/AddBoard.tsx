import { useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import { boardState } from '../atoms';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface IForm {
  boardName: string;
}

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  min-height: 46px;
  border-radius: 23px;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.textColor};
  transition: all 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.cardHoverColor};
  }

  button {
    padding: 0 10px 0 0;
    border: 0;
    font-weight: 600;
    background-color: transparent;
    color: ${(props) => props.theme.textColor};
    cursor: pointer;
    transition: all 0.3s;
  }
`;

const Input = styled.input`
  width: 190px;
  height: 26px;
  border: 0;
  padding: 5px 10px;
  border-radius: 13px;
  transition: all 0.3s;
`;

const AddBoardWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: 100px;
`;

const ErrorTxt = styled.p`
  margin-top: 5px;
  padding-left: 92px;
  color: ${(props) => props.theme.errorTxtColor};
  font-size: 12px;
  transition: color 0.3s;
`;

function AddBoard() {
  const [nameError, setNameError] = useState(false);
  const [boards, setBoards] = useRecoilState(boardState);
  const { register, setValue, handleSubmit, setFocus } = useForm<IForm>();
  const onValid = ({ boardName }: IForm) => {
    if (boards.get(boardName)) {
      return setNameError(true);
    } else {
      setBoards((allBoards) => {
        return allBoards.set(boardName, []);
      });
      setValue('boardName', '');
      setNameError(false);
    }
  };
  const handleClick = () => {
    setNameError(false);
    setFocus('boardName');
  };

  return (
    <AddBoardWrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <button onClick={handleClick}>+ Board</button>
        <Input type="text" {...register('boardName', { required: true })} placeholder={"Enter new board's name"} />
      </Form>
      {nameError && <ErrorTxt>The name already exist... :-&#40;</ErrorTxt>}
    </AddBoardWrapper>
  );
}

export default AddBoard;
