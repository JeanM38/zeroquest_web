import React from 'react';
import {useDraggable} from '@dnd-kit/core';

export const Draggable = (props) => {  
  let styleByWidth = {};

  const {attributes, listeners, isDragging, setNodeRef, transform} = useDraggable({
    id: props.id,
    data: props.data,
  });
  
  const style = {
    zIndex: isDragging ? 999: undefined,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
    transform: transform ? `
      translate3d(${transform.x}px, ${transform.y}px, 0) rotate(${(props.properties ? props.properties.rotate : 0) * 90}deg)` : 
      `rotate(${(props.properties ? props.properties.rotate : 0) * 90}deg)`,
    opacity: transform ? "0.8" : "1",
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

  if (props.properties) {
    if (props.properties.height === 2) {
      styleByWidth = {...styleByWidth, transformOrigin: "30px"}
    } else if (props.properties.width === 1 && props.properties.height === 1) {
      styleByWidth = {...styleByWidth, transformOrigin: "center"}
    } else {
      styleByWidth = {...styleByWidth, transformOrigin: "15px 15px"}
    }
  }

  const rotatePiece = (key) => {
    if (key.code === "KeyR" && ["furniture", "trap"].includes(props.data)) {
      props.rotate();
    }
  }
  
  return (
    <div ref={setNodeRef} style={{...style, ...styleByType, ...styleByWidth}} {...listeners} {...attributes} onKeyDown={(e) => rotatePiece(e)} data-testid={"draggable"}></div>
  );
}