import React from 'react';
import {useDroppable} from '@dnd-kit/core';

import { decks } from '../items/grid';

export const Droppable = (props) => {

  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    data: {
      type: props.type
    }
  });

  const isADeck = decks.filter(d => d.type === props.type).length === 1;

  const style = {
    display: isADeck ? "flex" : undefined,
    position: !isADeck ? "relative" : undefined,
    flexWrap: isADeck ? "wrap" : undefined,
    minHeight: "30px",
    backgroundColor: isADeck ? "purple" : "",
    borderRadius: isADeck ? "5px": "0",
    height: isADeck ? "100%" : "30px",
    width: isADeck ? "100%" : "30px",
    cursor: props.cursor
  };

  const layer = {
    display: "block",
    position: "absolute",
    zIndex: !isADeck && isOver ? 0 : undefined, 
    top: 0,
    left: 0,
    width: "30px",
    height: "30px",
    backgroundColor: props.overBg,
    opacity: 0.6
  }

  return (
    <div ref={setNodeRef} style={style} data-testid={"droppable"} id={props.index}>
      <div style={!isADeck && isOver ? layer : null}>
      </div>
      {props.children}
    </div>
  );
}