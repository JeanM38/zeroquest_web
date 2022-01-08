import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { setSquareBg } from '../utils/functions';

export const Droppable = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    data: props.data
  });

  const style = {
    border: props.data === "enemy" || props.data === "trap" ? "1px solid red" : "1px solid blue",
    position: "relative",
    height: "30px",
    backgroundColor: setSquareBg(props.data),
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}