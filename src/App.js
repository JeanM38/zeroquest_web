import React, { useState } from 'react';
import {DndContext} from '@dnd-kit/core';

/* Dnd contextt components */
import {Droppable} from './Components/Droppable';
import {Draggable} from './Components/Draggable';

/* Grid */
import { grid, decks } from './items/grid';

/* Items */
import { enemies } from './items/enemies';
import { furnitures } from './items/furnitures';
import { traps } from './items/traps';

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
  const [pieces, setPieces] = useState([...enemies, ...furnitures, ...traps]);
  const [cursor, setCursor] = useState("grab");
  const [overBg, setOverBg] = useState("green");

  /* Handle drag ending */
  const handleDragEnd = (event) => {
    /* Get the hovered element*/
    const {over} = event;

    const activeType = event.active.data.current;
    const overType = over === null ? null : over.data.current;
    
    let isFilled = 0;

    /* If overType is valid */
    if (overType) {
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
            /* Droppable element is not filled and draggable element is allowed */
            (activeType === "enemy" && !["trap", "furniture"].includes(overType)) || /* Enemy */
            (activeType === "trap" && !["enemy", "furniture"].includes(overType)) || /* Trap */
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
  }

  /* Handle over action, if dragged element is assignable to a droppable element  */
  const handleDragOver = (event) => {
    const {over} = event;

    /* Check first if over is a valid element of the context */
    if (over) {
      const activeType = event.active.data.current;
      const overType = event.over.data.current;

      /* Check valid types of drop elements for draggable elements */
      if (
        (activeType === "enemy" && !["trap", "furniture"].includes(overType)) ||
        (activeType === "furniture" && !["trap", "enemy", "corridor"].includes(overType)) ||
        (activeType === "trap" && !["trap", "enemy"].includes(overType))
      ) {
        /* User can drop here, cursor has grab style, square overlay pass to green */
        setCursor("grab");
        setOverBg("green");
      } else {
        /* User can't drop here, cursor has not-allowed style, square overlay pass to red */
        setCursor("not-allowed");
        setOverBg("red");
      }
    }
  }

  /* Return each piece at his position */
  const renderPiece = (id) => {
    let piecesToRender = [];

    pieces.map((p) => {
      if(p.parent === id) {
        piecesToRender = [...piecesToRender, 
          <Draggable 
            key={p.index} 
            id={p.index} 
            data={p.type} 
            image={p.subtype} 
            properties={p.properties ? p.properties : null} /* For furnitures & traps not 1*1 piece */
            rotate={setRotate} /* Pass rotate func to the draggable element, she will return rotate value's of it at the run time */
            cursor={cursor}
          ></Draggable>
        ]
      }
      return piecesToRender;
    })
    
    if (piecesToRender.length > 0) {
      return(piecesToRender);
    }
  }

  /* Reset all board */
  const resetBoard = () => {
    const newPieces = pieces.map(p => {

      /* Reset all rotation positions to 0 to fit well in the deck */
      if (p.type === "furniture" && p.properties.rotate !== 0) {
        p.properties.rotate = 0;
      }
      /* Reset initial parent */
      return {...p, parent: p.type}
    });
    setPieces(newPieces);
  }

  /* Register new rotate value */
  const setRotate = (key) => {
    const newPieces = pieces.map(p => {
      
      /* Check if item is furniture/trap, and it's scale is bigger than 1 */
      if (p.index === key && p.properties && p.properties.width * p.properties.height > 1) {
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
      <ChapterEditor data-testid={"chaptereditor"}>
        <DecksWrapper data-testid={"deckswrapper"}>
          {/* 
          =================================================
            This is where all decks will be implemented,
            User could retrieve all availables pieces like:
              - Enemies
              - Traps
              - Furnitures
          =================================================
          */}
          <button onClick={resetBoard} data-testid={"resestboard"}>Reset the board</button>
          {/* <button onClick={addEnemy}>Add an enemy</button> */}
          
          {/* Generate multiple decks by deck type */}
          {decks.map((deck) => (
            <Deck mb key={deck.type} data-testid={"deck"}>
              <h1>{deck.title}</h1>
              <DeckItems data-testid={"deckitem"}>
                <Droppable key={deck.type} id={deck.type} type={deck.type} >
                    {renderPiece(deck.type)}
                </Droppable>
              </DeckItems>
            </Deck>
          ))}
        </DecksWrapper>

        <GridWrapper data-testid={"gridwrapper"}>
          {/* 
            =================================================
            This is the main board game,
            User could drag pieces and the board if the 
            droppable element is available
            =================================================
          */}
          <Grid data-testid={"grid"}>

            {/* Foreach squares of the desk */}
            {grid.map((square) => (
              <Droppable key={`[${square.posX},${square.posY}]`} id={`[${square.posX},${square.posY}]`} type={square.type} overBg={overBg}>
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