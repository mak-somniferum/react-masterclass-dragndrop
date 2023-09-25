import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ThemeProvider, styled } from 'styled-components';
import { darkTheme, lightTheme } from './theme';
import { themeState, boardState, boardArraySelector } from './atoms';
import GlobalStyle from './GlobalStyle';
import Board from './components/Board';
import ToggleMode from './components/ToggleMode';
import AddBoard from './components/AddBoard';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  max-width: 980px;
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

interface DeleteAreaProps {
  $isDraggingOver: boolean;
}

const DeleteArea = styled.div<DeleteAreaProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  font-size: 45px;
  padding: 0 0 0 5px;
  border: 0;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isDraggingOver ? props.theme.cardHoverColor : props.theme.boardColor};
  color: ${(props) => props.theme.textColor};
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -40px;
  overflow: hidden;
  cursor: default;
  transform-origin: center;
  transition: all 0.3s;
  transform: scale(${(props) => (props.$isDraggingOver ? '1.2' : '1')});
`;

function App() {
  const isDark = useRecoilValue(themeState);
  const setBoards = useSetRecoilState(boardState);
  const boardsArray = useRecoilValue(boardArraySelector);

  // 이게 최선인지 잘 모르겠다.
  // Object는 보드 이름이 {3, 1, 2} 이런식으로 들어가 있으면 아래 정렬 과정에서 {1, 2, 3} 오름차순으로 정렬해버린다.
  // 이를 해결하기 위해 순서가 보장되는 Map객체를 사용한다.
  // 하지만 Map객체는 index를 제공하지 않기 때문에 Array로 변환하여 작업 한 후 다시 Map으로 리턴한다.
  // Map객체를 사용함으로서 특정 보드내의 메모를 편집할 때는 .get(), .set() 메소드를 사용하면 된다.

  const onDragEnd = (info: DropResult) => {
    const { destination, source, type } = info;
    console.log(info);
    if (!destination) return;
    if (type === 'boards') {
      if (destination?.droppableId === source?.droppableId) {
        setBoards((allBoards) => {
          const copied = [...boardsArray];
          const [target] = copied.splice(source.index, 1);
          copied.splice(destination.index, 0, target);
          return new Map(copied);
        });
      }
      if (destination?.droppableId === 'delete') {
        // Delete
        setBoards((allBoards) => {
          const copied = [...boardsArray];
          copied.splice(source.index, 1);
          return new Map(copied);
        });
      }
    }
  };

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Container>
          <AddBoard />
          <ToggleMode />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="boards" type="boards" direction="horizontal">
              {(magic, info) => (
                <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
                  {boardsArray.length > 0
                    ? boardsArray.map((item, index) => (
                        <Board key={item[0]} memos={item[1]} boardId={item[0]} index={index} />
                      ))
                    : 'Here is empty. Please add your board... :-O'}
                  {magic.placeholder}
                </Wrapper>
              )}
            </Droppable>
            <Droppable droppableId="delete">
              {(magic, info) => (
                <DeleteArea
                  $isDraggingOver={info.isDraggingOver}
                  ref={magic.innerRef}
                  {...magic.droppableProps}
                >
                  🗑
                  {magic.placeholder}
                </DeleteArea>
              )}
            </Droppable>
          </DragDropContext>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
