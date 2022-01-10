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
    alignItems: "center",
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${rotate}deg)` : `rotate(${rotate}deg)`,
    opacity: transform ? "0.6" : "1",
    width: "30px",
    height: "30px",
    backgroundImage: `url("${process.env.PUBLIC_URL}/Resources/Characters/${props.image}.png")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat"
  }

  const rotatePiece = (key) => {
    if (key.code === "KeyR" && props.data === "trap") {
      //
    }
  }
  
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} onKeyPress={(e) => rotatePiece(e)}></div>
  );
}