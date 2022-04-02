import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';

/* Dnd context components */
import { Droppable } from './Droppable';

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
} from '../../style/BoardStyle';

/* Utils */
import { 
  setNewItems, 
  getAllowedRooms,
  removeItemsOnUnallowedRooms
} from '../../utils/dnd';

import {   
  resetBoard, 
  renderItem,
  getItemsOnBoard
} from '../../utils/functions';

import { Creation } from '../../Classes/Creation';

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
    setItems(setNewItems(event, items, grid.tiles, allowedRooms));
    setLoading(!loading);
  }

  /* Handle title change */
  const handleInputChange = (setter, value) => {
    setter(value);
  }

  /* Handle submit */
  const handleCreation = () => { 
    /* Retrieve board items data */
    const enemiesData = getItemsOnBoard(items, 'enemy');
    const trapsData = getItemsOnBoard(items, 'trap');
    const furnituresData = getItemsOnBoard(items, 'furniture');
    const spawnsData = getItemsOnBoard(items, 'spawn');
    const doorsData = getItemsOnBoard(items, 'door');

    /* Validate data */
    const enemiesJSON = enemiesData.length <= 30 ? JSON.stringify({'enemies': enemiesData}) : null;
    const trapsJSON = trapsData.length <= 8 ? JSON.stringify({'traps' : trapsData}) : null;
    const furnituresJSON = furnituresData.length <= 15 ? JSON.stringify({'furnitures' : furnituresData}) : null;
    const spawnsJSON = spawnsData.length <= 4 ? JSON.stringify({'spawns' : spawnsData}) : null;
    const doorsJSON = doorsData.length <= 26 ? JSON.stringify({'doors' : doorsData}) : null;

    if (
      ![enemiesJSON, trapsJSON, furnituresJSON, spawnsJSON, doorsJSON].includes(null) &&
      title.length !== 0 &&
      notes.length !== 0 &&
      description.length !== 0
    ) {
      const creation = new Creation(
        null,
        1 /* Temporary user ID */,
        title,
        privateC,
        description,
        notes,
        Date.now(),
        Date.now(),
        enemiesJSON,
        trapsJSON,
        doorsJSON,
        spawnsJSON,
        furnituresJSON
      )
  
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
        <DecksWrapper data-testid={"deckswrapper"}>

          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" onChange={(e) => handleInputChange(setTitle, e.target.value)} required maxLength="50"></input>
            <input type="text" onChange={(e) => handleInputChange(setDescription, e.target.value)} required max="255"></input>
            <input type="text" onChange={(e) => handleInputChange(setNotes, e.target.value)} required max="255"></input>
            <div className="form-group">
              <label htmlFor="private">Private</label>
              <input type="checkbox" onChange={() => setPrivateC(!privateC)} id="private" name="private" defaultChecked={privateC}></input>
            </div>
            <button type="button" onClick={() => setItems(resetBoard(items))} data-testid={"resestboard"}>Reset the board</button>
            <button type="submit" onClick={(e) => handleCreation(e)}>Submit</button>
            
            {/* Error messages */}
            {!isValid && isUnvalidMessage &&
              <p>{isUnvalidMessage}</p>
            }

            {/* Success message */}
            {isValid && isValidMessage &&
              <p>{isValidMessage}</p>
            }

          </form>

          
          {/* Generate multiple decks by deck type */}
          {grid.decks.map(deck => (
            <Deck mb key={deck.type} data-testid={"deck"}>
              <h3>{deck.title}</h3>
              <DeckItems data-testid={"deckitem"}>
                <Droppable key={"drop-" + deck.type} id={deck.type} type={deck.type} disabled={+allowedRooms.includes(deck.type)}>
                    {renderItem(deck.type, items, null)}
                </Droppable>
              </DeckItems>
            </Deck>
          ))}
        </DecksWrapper>

        <GridWrapper data-testid={"gridwrapper"}>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{notes}</p>
          <Grid data-testid={"grid"}>
            {/* Foreach squares of the desk */}
            {grid.tiles.map((square, index) => (
              <Droppable key={"drop" + index} id={index} type={square.type} posX={square.posX} posY={square.posY} disabled={+allowedRooms.includes(square.type)}>
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