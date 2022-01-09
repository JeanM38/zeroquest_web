import React, { useState } from 'react';
import {useDraggable} from '@dnd-kit/core';

export const Draggable = (props) => {
  const [rotate, setRotate] = useState(0);
  
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: props.data
  });
  
  const style = {
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    border: "1px solid black",
    alignItems: "center",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${rotate}deg)` : `rotate(${rotate}deg)`,
    width: "30px!important",
    height: "30px",
    backgroundColor: "white"
  }

  const rotatePiece = (key) => {
    if (key.code === "KeyR" && props.data === "trap") {
      //
    }
  }
  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} onKeyPress={(e) => rotatePiece(e)}>
      {props.children}
    </div>
  );
}