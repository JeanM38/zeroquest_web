import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';

/* Dnd contextt components */
import {Droppable} from './Components/Droppable';
import {Draggable} from './Components/Draggable';

/* Pieces and grid elements */
import { grid } from './grid';
import { enemies } from './enemies';
import styled from 'styled-components';

function App() {
  const [pieces, setPieces] = useState(enemies);
  const decks = [
    "enemy",
    "trap"
  ]

  const Grid = styled.div`
    position: absolute;
    display: grid;
    grid-template-columns: repeat(26, 1fr);
    grid-template-rows: repeat(19, 1fr);
    grid-auto-flow: row;
    gap: 0px;
    background-image: url("${process.env.PUBLIC_URL}/Resources/board.jpg");
    background-size: contain;
  `

  const GridWrapper = styled.div`
    width: 50%;
    height: 100%;
    position: relative;
  `

  /* Handle drag ending */
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
          });
        } else {
          newPieces.map(p => {
            if (over.data.current !== event.active.data.current) {
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

  /* Return each piece at his position */
  const renderPiece = (id) => {
    let piecesToRender = [];

    pieces.forEach((p) => {
      if(p.parent === id) {
        piecesToRender = [...piecesToRender, <Draggable key={p.name} id={p.name} data={p.type}>{p.name}</Draggable>]
      }
    })
    
    if (piecesToRender.length > 0) {
      return(piecesToRender);
    }
  }

  /* Reset all the board */
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
        <Droppable key={deck} id={deck} data={deck}>
            {renderPiece(deck)}
        </Droppable>
      ))}

      <GridWrapper>
        <Grid>
          {/* Foreach squares of the desk */}
          {grid.map((square) => (
            <Droppable key={`[${square.posX},${square.posY}]`} id={`[${square.posX},${square.posY}]`} data={square.type}>
              {renderPiece(`[${square.posX},${square.posY}]`)}
            </Droppable>
          ))}
        </Grid>
      </GridWrapper>

    </DndContext>
  );
};

export default App;