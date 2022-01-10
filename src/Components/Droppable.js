import React from 'react';
import {useDroppable} from '@dnd-kit/core';

import { decks } from '../items/grid';

export const Droppable = (props) => {

  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
    data: props.data
  });

  const isADeck = decks.filter(d => d.type === props.data).length === 1;

  const style = {
    display: isADeck ? "flex" : undefined,
    flexWrap: isADeck ? "wrap" : undefined,
    minHeight: "30px",
    backgroundColor: isADeck ? "purple" : "",
    borderRadius: isADeck ? "5px": "0",
    height: isADeck ? "100%" : "30px",
    width: isADeck ? "100%" : "30px",
    cursor: props.cursor
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}