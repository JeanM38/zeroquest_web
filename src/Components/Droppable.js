import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export const Droppable = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    data: props.data
  });

  const style = {
    display: "flex",
    position: "relative",
    height: "30px",
    width: "30px",
    border: "1px solid red"
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}