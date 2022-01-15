import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';

/* Dnd context components */
import { Droppable } from './Components/Droppable';

/* Grid */
import { grid, decks } from './items/grid';

/* Items */
import { enemies } from './items/enemies';
import { furnitures } from './items/furnitures';
import { traps } from './items/traps';
import { doors } from './items/doors';

/* Styled Components */
import { 
  Deck, 
  DeckItems,
  ChapterEditor, 
  DecksWrapper, 
  GridWrapper, 
  Grid 
} from './style/AppStyle';

/* Utils */
import { setNewItems } from './utils/dnd';
import {   
  resetBoard, 
  renderItem, 
  handleDragOver 
} from './utils/functions';

export function App() {
  const [items, setItems] = useState([...enemies, ...furnitures, ...traps, ...doors]);
  const [overBg, setOverBg] = useState("green");

  /* Handle drag ending */
  const handleDragEnd = (event) => {
    /* Reset OverBg */
    setOverBg("green");
    /* New instance of items */
    setItems(setNewItems(event, items, grid));
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragOver={(e) => setOverBg(handleDragOver(e))}>
      <ChapterEditor data-testid={"chaptereditor"}>
        <DecksWrapper data-testid={"deckswrapper"}>
          {/* 
          =================================================
            This is where all decks will be implemented,
            User could retrieve all availables items like:
              - Enemies
              - Traps
              - Furnitures
          =================================================
          */}
          <button onClick={() => setItems(resetBoard(items))} data-testid={"resestboard"}>Reset the board</button>
          {/* <button onClick={addEnemy}>Add an enemy</button> */}
          
          {/* Generate multiple decks by deck type */}
          {decks.map(deck => (
            <Deck mb key={deck.type} data-testid={"deck"}>
              <h1>{deck.title}</h1>
              <DeckItems data-testid={"deckitem"}>
                <Droppable key={"drop-" + deck.type} id={deck.type} type={deck.type}>
                    {renderItem(deck.type, items)}
                </Droppable>
              </DeckItems>
            </Deck>
          ))}
        </DecksWrapper>

        <GridWrapper data-testid={"gridwrapper"}>
          {/* 
            =================================================
              This is the main board game,
              User could drag items and the board if the 
              droppable element is available
            =================================================
          */}
          <Grid data-testid={"grid"}>

            {/* Foreach squares of the desk */}
            {grid.map((square, index) => (
              <Droppable key={"drop" + index} id={index} type={square.type} overBg={overBg}>
                {renderItem(index, items)}
              </Droppable>
            ))}

          </Grid>
        </GridWrapper>
      </ChapterEditor>
    </DndContext>
  );
};

export default App;