import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export const Draggable = (props) => {  
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: props.data,
  });
  
  const style = {
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
    transform: transform ? `
      translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${(props.properties ? props.properties.rotate : 0) * 90}deg)` : 
      `rotate(${(props.properties ? props.properties.rotate : 0) * 90}deg)`,
    opacity: transform ? "0.6" : "1",
    backgroundImage: `url("${process.env.PUBLIC_URL}/Resources/Characters/${props.image}.png")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat"
  }

  const styleByType = ["furniture", "trap"].includes(props.data) ? {
    width: `${30 * props.properties.width}px`,
    height: `${30 * props.properties.height}px`,
    backgroundColor: "red",
    border: "1px solid black"
  } : undefined;

  const rotatePiece = (key) => {
    if (key.code === "KeyR" && ["furniture", "trap"].includes(props.data)) {
      props.rotate(props.id);
    }
  }
  
  return (
    <div ref={setNodeRef} style={{...style, ...styleByType}} {...listeners} {...attributes} onKeyDown={(e) => rotatePiece(e)}></div>
  );
}