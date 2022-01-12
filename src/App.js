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

export function App() {
  const [pieces, setPieces] = useState(items);
  const [cursor, setCursor] = useState("grab");

  /* Handle drag ending */
  const handleDragEnd = (event) => {
    /* Get the hovered element*/
    const {over} = event;
    const activeType = event.active.data.current;
    const overType = over.data.current;
    let isFilled = 0;

    /* Create a new instance from pieces */
    let newPieces = [...pieces];

    /* Foreach pieces of the game */
    newPieces = newPieces.map(p => {
      /* Check if a piece has only the same parent */
      if (p.parent === over.id || activeType === overType) {
        ++isFilled;
      }

      /* If hover on a droppable element and p is the dragged element*/
      if (over && event.active.id === p.index) {
        /* Droppable element is filled */
        if (p.parent === over.id) {
          return p
        } else if (
          (activeType === "enemy" && !["corridor", "trap", 'furniture'].includes(overType)) || /* Enemy */
          (activeType === "trap" && ["corridor", "trap", "furniture"].includes(overType)) || /* Trap */
          (activeType === "furniture" && !["corridor", "trap", "enemy"].includes(overType))  /* Furniture */
          ) {
            /* If piece is a furniture, reset his rotate */
            if (p.type === "furniture" && over.id === "furniture" && p.properties.rotate !== 0) {
              p.properties.rotate = 0;
            }
            /* Draggable element is dropped on his own desk or in an unfilled droppable element */
            if (isFilled === 0 || activeType === overType) {
              return {...p, parent: over.id}
            } else {
              return p
            }
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

  /* Handle over action, if dragged element is assignable to a droppable element  */
  const handleDragOver = (event) => {
    const {over} = event;

    if (over) {
      const activeType = event.active.data.current;
      const overType = event.over.data.current;

      if (
        (activeType === "enemy" && overType !== "corridor" && !["trap", "furniture"].includes(overType)) ||
        (activeType === "furniture" && overType !== "corridor" && !["trap", "enemy"].includes(overType)) ||
        (activeType === "trap" && overType === "corridor" && !["trap", "enemy"].includes(overType))
      ) {
        setCursor("grab");
      } else {
        setCursor("not-allowed");
      }
    }
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
            cursor={cursor}
          ></Draggable>
        ]
      }
    })
    
    if (piecesToRender.length > 0) {
      return(piecesToRender);
    }
  }

  /* Reset all board */
  const resetBoard = () => {
    const newPieces = pieces.map(p => {
      if (p.type === "furniture" && p.properties.rotate !== 0) {
        p.properties.rotate = 0;
      }
      return {...p, parent: p.type}
    });
    setPieces(newPieces);
  }

  /* Register new rotate value */
  const setRotate = (key) => {
    const newPieces = pieces.map(p => {
      if (p.index === key && p.properties) {
        p.properties.rotate === 0 ? p.properties.rotate = 1 : p.properties.rotate = 0;
      }
      return p
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
      <ChapterEditor data-testid="chaptereditor">
        <DecksWrapper data-testid="deckswrapper">
          <button onClick={resetBoard} data-testid="resestboard">Reset the board</button>
          {/* <button onClick={addEnemy}>Add an enemy</button> */}
          
          {/* Generate multiple decks by deck type */}
          {decks.map((deck, index) => (
            <Deck mb key={deck.type} data-testid={"deck"}>
              <h1>{deck.title}</h1>
              <h1>Hello world</h1>
              <DeckItems data-testid={"deckitem"}>
                <Droppable key={deck.type} id={deck.type} data={deck.type} >
                    {renderPiece(deck.type)}
                </Droppable>
              </DeckItems>
            </Deck>
          ))}

        </DecksWrapper>

        <GridWrapper data-testid="gridwrapper">
          <Grid data-testid="grid">

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