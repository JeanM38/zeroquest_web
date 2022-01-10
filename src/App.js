import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';

/* Dnd contextt components */
import {Droppable} from './Components/Droppable';
import {Draggable} from './Components/Draggable';

/* Pieces and grid elements */
import { grid, decks } from './items/grid';
import { items } from './items/items';

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
  const [pieces, setPieces] = useState(items);

  /* Handle drag ending */
  const handleDragEnd = (event) => {
    /* Get the hovered element*/
    const {over} = event;
    const activeType = event.active.data.current;
    const overType = over.data.current;

    /* Create a new instance from pieces */
    let newPieces = [...pieces];

    /* Foreach pieces of the game */
    newPieces = newPieces.map(p => {

      /* If hover on a droppable element and p is the dragged element*/
      if (over && event.active.id === p.index) {

        /* Droppable element is filled */
        if (p.parent === over.id) {
          return p
        } else if (
          (activeType === "enemy" && !["corridor", "trap", 'furniture'].includes(overType)) || /* Enemy */
          (activeType === "trap" && ["corridor", "trap", "furniture"].includes(overType)) || /* Trap */
          (activeType === "furniture" && !["corridor", "trap", "enemy"].includes(overType)) /* Furniture */
          ) {
            /* Draggable element is dropped on his own desk or in an unfilled droppable element */
            return {...p, parent: over.id}
        } else {
          return p
        }
      } else {
        /* Hover not on a droppable element */
        return p
      }
    })

    /** Assign new instance of pieces */
    setPieces(newPieces);
  }

  /* Return each piece at his position */
  const renderPiece = (id) => {
    let piecesToRender = [];

    pieces.forEach((p) => {
      if(p.parent === id) {
        piecesToRender = [...piecesToRender, 
          <Draggable 
            key={p.index} 
            id={p.index} 
            data={p.type} 
            image={p.key} 
            properties={p.properties ? p.properties : null}
            rotate={setRotate}
          ></Draggable>
        ]
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

  /* Register new rotate value */
  const setRotate = (key) => {
    const newPieces = pieces.map(p => {
      if (p.index === key && p.properties) {
        if (p.properties.rotate < 3) {
          ++p.properties.rotate
        } else {
          p.properties.rotate = 0
        }
        return p
      } else {
        return p
      }
    })
    setPieces(newPieces);
  }

  /* Add a new special enemy */
  // const addEnemy = () => {
  //   const newEnemy = {
  //     name: "New",
  //     parent: "enemy",
  //     type: "enemy",
  //     key: "gargoyle"
  //   }
  //   setPieces([...pieces, newEnemy]);
  // }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <ChapterEditor>

        <DecksWrapper>
          <button onClick={resetBoard}>Reset the board</button>
          {/* <button onClick={addEnemy}>Add an enemy</button> */}
          
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