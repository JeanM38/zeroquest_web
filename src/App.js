import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Components/Droppable';
import {Draggable} from './Components/Draggable';
import { grid } from './grid';

function App() {
  const [squares, setSquares] = useState(grid);

  const [pieces, setPieces] = useState([
    {title: "Orc", parent: "[-1,-1]"}, 
    {title: "Mummy", parent: "[-1,-1]"}
  ]);

  const handleDragEnd = (event) => {
    const {over} = event;
    let newPieces = [...pieces];
    let empty = true;

    newPieces = newPieces.map(p => {
      /** User drag on a valid droppable element */
      if (p.title === event.active.id && over) {
        
        /** User drag on the deck */
        if (over.id !== "[-1,-1]") {
          newPieces.map(p => {

            /** Check if a piece is already assigned to this droppable element */
            if (p.parent === over.id) {
              empty = false;
            }
          })
        }

        /** If droppable element is not containing a piece */
        if (empty) {
          return {...p, parent: over.id}
        } else {
          return p
        }

      /** User drag on an unvalid droppable element */
      } else {
        return {...p, parent: p.parent}
      }
    })

    /** Assign new pieces */
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

  // const resetPieces = () => {
  //   const newPieces = pieces.map(p => {
  //     return {...p, parent: "[-1,-1]"}
  //   });
  //   setPieces(newPieces);
  // }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {/* <button onClick={resetPieces}>Reset</button> */}
      {/* Foreach squares of the desk */}
      {squares.map((square) => (
        <Droppable key={`[${square.posX},${square.posY}]`} id={`[${square.posX},${square.posY}]`} type={square.type} posX={square.posX} posY={square.posY}>
          {renderPiece(`[${square.posX},${square.posY}]`)}
        </Droppable>
      ))}
    </DndContext>
  );
};

export default App;