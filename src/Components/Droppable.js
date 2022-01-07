import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export const Droppable = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
    border: "1px dashed red",
    margin: "10px",
    padding: "10px"
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}