import React from "react";
import { Draggable } from "../Components/Dnd/Draggable";

import { Creation } from "../Classes/Creation";

/**
 * 
 * @description Check if all values of an array are the same
 * @param {Array} arr 
 * @returns {Boolean} true or false
 */
export const allEqual = arr => arr.every(val => val === arr[0]);

/**
 * 
 * @description Set rotation and parent values of each items to initial
 * @param {Array} items 
 * @returns {Array} new array with all rotations set to 0, and parent to his origin value
 */
export const resetBoard = (items) => {
    return items.map(p => {
        /* Reset all rotation positions to 0 to fit well in the deck */
        if ( p.type !== "enemy" && p.properties.rotate !== 0) {
            p.properties.rotate = 0;
        }
        /* Reset initial parent */
        return {...p, parent: [p.type]}
    });
}

/**
 * 
 * @description When user clicks on R, rotate the current active itm
 * @param {String} key 
 * @param {Array} items 
 * @returns items with the current active item and its new rotate value
 */
export const setRotate = (key, items) => {
    return items.map(p => {
      /* Check if item is furniture/trap, and it's scale is bigger than 1 */
      if (p.index === key && p.properties && p.type !== "door") {
        p.properties.rotate === 0 ? p.properties.rotate = 1 : p.properties.rotate = 0;
      } else if (p.index === key && p.properties && p.type === "door") {
        if (p.properties.rotate < 3) {
          ++p.properties.rotate;
        } else {
          p.properties.rotate = 0;
        }
      }
      return p
    })
}

/**
 * 
 * @description Render pieces on decks or grid / Reset rotate on deck
 * @param {String} id 
 * @param {Array} items 
 * @returns All items needs to be rendered at a specific position
 */
export const renderItem = (id, items, scrollTop) => {
    let itemsToRender = [];
    items.map((p) => {
      /* Insure rotate to zero on deck */
      if (p.type !== "enemy" && p.properties.rotate !== 0 && p.parent[0] === p.type) {
        p.properties.rotate = 0;
      }
      if(p.parent[0] === id) {
        itemsToRender = [...itemsToRender, 
          <Draggable 
            key={p.index} 
            id={p.index} 
            data={p.type} 
            scrollTop={scrollTop}
            image={`${p.type}/${p.subtype}`} 
            parent={p.parent}
            properties={p.properties ? p.properties : null} /* For furnitures & traps not 1*1 item */
            rotate={() => setRotate(p.index, items)} /* Pass rotate func to the draggable element, she will return rotate value's of it at the run time */
          ></Draggable>
        ]
      }
      return itemsToRender;
    })
    
    if (itemsToRender.length > 0) {
      return(itemsToRender);
    }
}

/**
 * 
 * @description When a piece is dragged an overed an element, check if he is available
 * @param {Object} event 
 * @returns an hex color to indicates if a square is available as a droppable element or not
 */
export const handleDragOver = (event) => {
    const over = event === null ? null : event.over;

    /* Check first if over is a valid element of the context */
    if (over) {
      const activeType = event.active.data.current;
      const overType = over.data.current.type;

      /* Check valid types of drop elements for draggable elements */
      if (
        (activeType === "enemy" && !["trap", "furniture"].includes(overType)) ||
        (activeType === "furniture" && !["trap", "enemy"].includes(overType) && overType[0] !== "c") ||
        (activeType === "trap" && !["trap", "enemy"].includes(overType))
      ) {
        /* User can drop here, square overlay pass to green */
        return "green";
      } else {
        /* User can't drop here, square overlay pass to red */
        return "red";
      }
    }
}

/**
 * 
 * @description Set a new value to a sate from an input
 * @param {Function} setter 
 * @param {String} value 
 */
export const handleInputChange = (setter, value) => {
  setter(value);
}

/**
 * 
 * @description Get all squares of a room by room type (ie: all r1 type squares)
 * @param {Array} items 
 * @param {Array} grid 
 * @param {String} type 
 * @returns {Array} of all squares of the room
 */
export const getRoomsFilled = (items, grid, type) => {
  return type === "spawns" ? 
    [...new Set(items.map(item => grid[item.parent[0]].type))] :
    [...new Set(items.map(item => [ grid[item[0]].type, grid[item[1]].type ]))];
}

/**
 * 
 * @description get squares of all unaccessible rooms
 * @param {Array} types 
 * @param {Array} grid 
 * @returns {Array} of unaccessible squares
 */
export const getUnaccessibleSquares = (types, grid) => {
  let squaresUnallowed = [];

  types.map(type => {
    grid.map(square => {
      if (type.includes(square.type)) {
        squaresUnallowed = [...squaresUnallowed, grid.indexOf(square)]
      }
      return grid;
    })
    return types;
  })

  return squaresUnallowed;
}

/**
 * 
 * @description return array of items placed on the board
 * @param {Array} items 
 * @param {String} type 
 * @returns 
 */
export const getItemsOnBoard = (items, type) => {
  return items.filter(item => item.type === type && item.type !== item.parent[0]);
}

export const buildCreation = (items, title, notes, description, privateC) => {
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

  let creation = null

  if (
    ![enemiesJSON, trapsJSON, furnituresJSON, spawnsJSON, doorsJSON].includes(null) &&
    title.length !== 0 &&
    notes.length !== 0 &&
    description.length !== 0
  ) {
    creation = new Creation (
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
  }

  return creation;
}