import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {
  const onDragEnd = () => {};
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="droppable-1">
            {() => (
              <ul>
                <Draggable draggableId="first" index={0}>
                  {() => <li>Hello one</li>}
                </Draggable>
                <Draggable draggableId="second" index={1}>
                  {() => <li>Hello two</li>}
                </Draggable>
              </ul>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
}

export default App;
