import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';

/* Dnd contextt components */
import {Droppable} from './Components/Droppable';
import {Draggable} from './Components/Draggable';

/* Pieces and grid elements */
import { grid, decks } from './items/grid';
import { enemies } from './items/enemies';

/* Styled Components */
import { 
  Deck, 
  DeckItems,
  ChapterEditor, 
  DecksWrapper, 
  GridWrapper, 
  Grid 
} from './style/AppStyle';

function App() {
  const [pieces, setPieces] = useState(enemies);

  /* Handle drag ending */
  const handleDragEnd = (event) => {
    const {over} = event;
    
    let newPieces = [...pieces];
    let empty = true;

    newPieces = newPieces.map(p => {
      /** User drag on a valid droppable element */
      if (p.name === event.active.id && over) {
        
        /** User drag on the deck */
        if (decks.filter(d => d.type === over.id).length === 0) {
          newPieces.map(p => {

            /** Check if a piece is already assigned to this droppable element */
            if (p.parent === over.id) {
              empty = false;
            } else if (
              /** Check if type of draggable element is allowed on the droppable element */
              (over.data.current !== "corridor" && event.active.data.current === "enemy") ||
              (over.data.current === "corridor" && event.active.data.current === "trap")
            ) {
              return empty
            } else {
              return empty = false;
            }
          });
        } else {
          newPieces.map(p => {
            if (over.data.current !== event.active.data.current) {
              empty = false;
            } else {
              return empty
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

  /* Handle over action, if dragged element is assignable to a droppable element  */
  const handleDragOver = (event) => {
    const {over} = event;

    if (over) {
      const activeType = event.active.data.current;
      const overType = event.over.data.current;

      if (activeType === "trap" && overType !== "corridor") {
        //
      } 
    }
  }

  /* Reset all board */
  const resetBoard = () => {
    const newPieces = pieces.map(p => {
      return {...p, parent: p.type}
    });
    setPieces(newPieces);
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <ChapterEditor>

        <DecksWrapper>
          <button onClick={resetBoard}>Reset</button>
          
          {/* Generate multiple decks by deck type */}
          {decks.map((deck) => (
            <Deck mb key={deck.type}>
              <h1>{deck.title}</h1>
              <DeckItems>
                <Droppable key={deck.type} id={deck.type} data={deck.type}>
                    {renderPiece(deck.type)}
                </Droppable>
              </DeckItems>
            </Deck>
          ))}

        </DecksWrapper>

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
      </ChapterEditor>

    </DndContext>
  );
};

export default App;