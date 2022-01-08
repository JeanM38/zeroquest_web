import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';

/* Dnd contextt components */
import {Droppable} from './Components/Droppable';
import {Draggable} from './Components/Draggable';

/* Pieces and grid elements */
import { grid } from './grid';
import { enemies } from './enemies';

function App() {
  const [pieces, setPieces] = useState(enemies);
  const decks = [
    "enemy"
  ]

  const handleDragEnd = (event) => {
    const {over} = event;
    let newPieces = [...pieces];
    let empty = true;

    newPieces = newPieces.map(p => {
      /** User drag on a valid droppable element */
      if (p.name === event.active.id && over) {
        
        /** User drag on the deck */
        if (!decks.includes(over.id)) {
          newPieces.map(p => {

            /** Check if a piece is already assigned to this droppable element */
            if (p.parent === over.id) {
              empty = false;
            }
            return empty
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
        piecesToRender = [...piecesToRender, <Draggable key={p.name} id={p.name} data={p.data}>{p.name}</Draggable>]
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
      
      {/* Generate multiple decks by deck type */}
      {decks.map((deck) => (
        <Droppable key={deck} id={deck} type="deck" posX={-1} posY={-1}>
            {renderPiece(deck)}
        </Droppable>
      ))}

      {/* Foreach squares of the desk */}
      {grid.map((square) => (
        <Droppable key={`[${square.posX},${square.posY}]`} id={`[${square.posX},${square.posY}]`} type={square.type} posX={square.posX} posY={square.posY}>
          {renderPiece(`[${square.posX},${square.posY}]`)}
        </Droppable>
      ))}

    </DndContext>
  );
};

export default App;