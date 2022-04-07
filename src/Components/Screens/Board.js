import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';

/* Dnd context components */
import { Droppable } from '../Dnd/Droppable';

/* Grid */
import grid from '../../data/grid';

/* Items */
import doorsArray from '../../data/doors';
import enemiesArray from '../../data/enemies';
import furnituresArray from '../../data/furnitures';
import spawnsArray from '../../data/spawns';
import trapsArray from '../../data/traps';

/* Styled Components */
import { 
  Deck, 
  DeckItems,
  ChapterEditor, 
  DecksWrapper, 
  GridWrapper, 
  Grid 
} from '../../style/Components/BoardStyle';

/* Utils */
import { 
  getNewItems, 
  getAllowedRooms,
  removeItemsOnUnallowedRooms
} from '../../utils/dnd';

import {   
  resetBoard, 
  renderItem,
  buildCreation
} from '../../utils/functions';

import { 
  InputText, 
  InputGroup, 
  Btn, 
  TextArea,
  ResultMessage,
  CheckboxGroup
} from '../../style/Components/UIStyle';

export function Board() {
  const [items, setItems] = useState([
    ...spawnsArray.spawns,
    ...enemiesArray.enemies, 
    ...furnituresArray.furnitures, 
    ...trapsArray.traps, 
    ...doorsArray.doors
  ]);
  const [allowedRooms, setAllowedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [privateC, setPrivateC] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isUnvalidMessage, setIsUnvalidMessage]= useState("");
  const [isValidMessage, setIsValidMessage]= useState("");
  const [scrollTop, setScrollTop] = useState(0);

  /* Catch items movements */
  useEffect(() => {
    setAllowedRooms(getAllowedRooms(items, grid.tiles, allowedRooms));
  }, [items])

  useEffect(() => {
    setItems(removeItemsOnUnallowedRooms(items, allowedRooms, grid.tiles));
  }, [loading]);

  /* Handle drag ending */
  const handleDragEnd = (event) => {
    /* New instance of items */
    setItems(getNewItems(event, items, grid.tiles, allowedRooms));
    setLoading(!loading);
  }

  /* Handle title change */
  const handleInputChange = (setter, value) => {
    setter(value);
  }

  /* Handle submit */
  const handleCreation = (items, title, notes, description, privateC) => {

      const creation = buildCreation(items, title, notes, description, privateC);

      if (creation) {  
        /* Send data to API */
        fetch(`${process.env.REACT_APP_API_URL}/creation`, {
          method: 'POST',
          body: JSON.stringify(creation)
        })
        .then(function(response) {
          if(response.ok) {
            setIsValidMessage(`Creation successfully saved as ${privateC ? 'private' : 'public'}`);
            setIsValid(true);
          } else {
            console.log(`${response.status} : ${response.statusText}`);
            setIsUnvalidMessage(`Title already exists !`);
            setIsValid(false);
          }
        })
        .catch((error) => {
          setIsUnvalidMessage(`Server error : ${error.message}`);
          setIsValid(false);
        })
      } else {
        setIsUnvalidMessage("Data not set correctly, please reset the board or complete required fields !");
        setIsValid(false);
      }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <ChapterEditor data-testid={"chaptereditor"}>
        <DecksWrapper data-testid={"deckswrapper"} onScroll={(e) => setScrollTop(e.target.scrollTop)}>
          <form onSubmit={(e) => e.preventDefault()} id="creationForm">
            <InputGroup mb>
              <InputText 
                type="text" 
                onChange={(e) => handleInputChange(setTitle, e.target.value)} 
                required 
                maxLength="50" 
                placeholder="Enter a title..."
              />
              <TextArea 
                type="text" 
                onChange={(e) => handleInputChange(setDescription, e.target.value)} 
                required 
                max="255" 
                placeholder="Enter a description..."
              />
              <TextArea 
                type="text" 
                onChange={(e) => handleInputChange(setNotes, e.target.value)} 
                required 
                max="255" 
                placeholder="Enter some notes..."
              />
            </InputGroup>
          </form>

          
          {/* Generate multiple decks by deck type */}
          {grid.decks.map(deck => (
            <Deck mb key={deck.type} data-testid={"deck"}>
              <h3>{deck.title}</h3>
              <DeckItems data-testid={"deckitem"}>
                <Droppable key={"drop-" + deck.type} id={deck.type} type={deck.type} disabled={+allowedRooms.includes(deck.type)}>
                    {renderItem(deck.type, items, scrollTop)}
                </Droppable>
              </DeckItems>
            </Deck>
          ))}

          <CheckboxGroup mb>
            <label class="container" htmlFor="private">Private
              <input type="checkbox" onChange={() => setPrivateC(!privateC)} id="private" name="private" defaultChecked={privateC} />
              <span class="checkmark"></span>
            </label>
          </CheckboxGroup>

          <Btn rounded mb type="button" onClick={() => setItems(resetBoard(items))} data-testid={"resestboard"}>Reset the board</Btn>
          <Btn rounded mb primary type="submit" onClick={() => handleCreation(items, title, notes, description, privateC)} form="creationForm">Submit</Btn>
          
          {/* Success message */}
          {isValid && isValidMessage &&
            <ResultMessage type="success">{isValidMessage}</ResultMessage>
          }
          {/* Error messages */}
          {!isValid && isUnvalidMessage &&
            <ResultMessage type="error">{isUnvalidMessage}</ResultMessage>
          }
        </DecksWrapper>

        <GridWrapper data-testid={"gridwrapper"}>
          <h1>{title}</h1>

          <Grid data-testid={"grid"}>
            {/* Foreach squares of the desk */}
            {grid.tiles.map((square, index) => (
              <Droppable key={"drop" + index} id={index} type={square.type} posX={square.posX} posY={square.posY} disabled={+allowedRooms.includes(square.type)}>
                {renderItem(index, items, scrollTop)}
              </Droppable>
            ))}

          </Grid>
        </GridWrapper>
      </ChapterEditor>
    </DndContext>
  );
};

export default Board;