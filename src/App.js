import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Components/Droppable';
import {Draggable} from './Components/Draggable';

function App() {
  const [squares, setSquares] = useState(['deck', '1', '2', '3', '4', '5']);

  const [pieces, setPieces] = useState([
    {title: "Orc", parent: "deck"}, 
    {title: "Mummy", parent: "deck"}
  ]);

  const handleDragEnd = (event) => {
    const {over} = event;
    let empty = true;
    let newPieces = [...pieces];

    newPieces = newPieces.map(p => {
      if (p.title === event.active.id && over) {
        if (over.id !== "deck") {
          newPieces.map(p => {
            if (p.parent === over.id) {
              empty = false;
            }
          })
        }
        if (empty) {
          return {...p, parent: over.id}
        } else {
          return p
        }
      } else {
        return {...p, parent: p.parent}
      }
    })

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