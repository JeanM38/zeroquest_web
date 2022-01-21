import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';

/* Dnd context components */
import { Droppable } from './Droppable';

/* Grid */
import { grid, decks } from '../items/grid';

/* Items */
import { enemies } from '../items/enemies';
import { furnitures } from '../items/furnitures';
import { traps } from '../items/traps';
import { doors } from '../items/doors';
import { spawns } from '../items/spawns';

/* Styled Components */
import { 
  Deck, 
  DeckItems,
  ChapterEditor, 
  DecksWrapper, 
  GridWrapper, 
  Grid 
} from '../style/BoardStyle';

/* Utils */
import { setNewItems, getAllowedRooms } from '../utils/dnd';
import {   
  resetBoard, 
  renderItem, 
  handleDragOver 
} from '../utils/functions';

export function Board() {
  const [items, setItems] = useState(
    [
      ...spawns,
      ...enemies, 
      ...furnitures, 
      ...traps, 
      ...doors
    ]
  );
  const [overBg, setOverBg] = useState("green");
  const [title, setTitle] = useState("");
  const [allowedRooms, setAllowedRooms] = useState([]);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  /* Catch items movements */
  useEffect(() => {
    setAllowedRooms([...new Set(getAllowedRooms(items, grid))]);
  }, [items])

  /* Handle drag ending */
  const handleDragEnd = (event) => {
    /* Reset OverBg */
    setOverBg("green");
    /* New instance of items */
    setItems(setNewItems(event, items, grid, allowedRooms));
  }

  /* Handle title change */
  const handleInputChange = (setter, value) => {
    setter(value);
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
          <input onChange={(e) => handleInputChange(setTitle, e.target.value)}></input>
          <input onChange={(e) => handleInputChange(setDescription, e.target.value)}></input>
          <input onChange={(e) => handleInputChange(setNotes, e.target.value)}></input>
          {decks.map(deck => (
            <Deck mb key={deck.type} data-testid={"deck"}>
              <h1>{deck.title}</h1>
              <DeckItems data-testid={"deckitem"}>
                <Droppable key={"drop-" + deck.type} id={deck.type} type={deck.type} disabled={false}>
                    {renderItem(deck.type, items, null)}
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
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{notes}</p>
          <Grid data-testid={"grid"}>
            {/* Foreach squares of the desk */}
            {grid.map((square, index) => (
              <Droppable key={"drop" + index} id={index} type={square.type} overBg={overBg} disabled={square.disabled}>
                {renderItem(index, items, square)}
              </Droppable>
            ))}

          </Grid>
        </GridWrapper>
      </ChapterEditor>
    </DndContext>
  );
};

export default Board;