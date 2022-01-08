import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export const Droppable = (props) => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    data: props.data
  });

  // const setbackground = (type) =>  {
  //   switch (type) {
  //     case "corridor":
  //       return "grey";
  //     case "r1":
  //       return "green";
  //     default:
  //       return "#fff";
  //   }
  // }

  const style = {
    color: isOver ? 'green' : undefined,
    border: "1px dashed red",
    margin: "10px",
    padding: "10px",
    // backgroundColor: setbackground(props.type)
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}