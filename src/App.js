import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Components/Droppable';
import {Draggable} from './Components/Draggable';

function App() {
  const [squares, setSquares] = useState(['deck', 'B', 'C', 'D', 'E', 'F']);

  const [pieces, setPieces] = useState([
    {title: "Orc", parent: "deck"}, 
    {title: "Mummy", parent: "deck"}
  ]);

  const handleDragEnd = (event) => {
    const {over} = event;
    let newPieces = [...pieces];

    if (over) {
      newPieces = newPieces.map(p => {
        if (p.title === event.active.id) {
          return {...p, parent: over.id}
        }
        return p;
      })
    } else {
      newPieces = newPieces.map(p => {
        if (p.title === event.active.id) {
          return {...p, parent: p.parent}
        }
        return p;
      })
    }

    setPieces(newPieces);
  }

  const renderPiece = (id) => {
    let piecesToRender = [];

    pieces.forEach((p) => {
      if(p.parent === id) {
        piecesToRender = [...piecesToRender, <Draggable key={p.title} id={p.title}>{p.title}</Draggable>]
      }
    })
    
    if (piecesToRender.length > 0) {
      return(piecesToRender);
    } else {
      return(<p>Drop here !</p>)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* Foreach squares of the desk */}
      {squares.map((id) => (
        <Droppable key={id} id={id}>
          {renderPiece(id)}
        </Droppable>
      ))}
    </DndContext>
  );
};

export default App;