import { Draggable } from "../Components/Draggable";
import React from "react";

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
      if (p.index === key && p.properties) {
        p.properties.rotate === 0 ? p.properties.rotate = 1 : p.properties.rotate = 0;
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
export const renderItem = (id, items) => {
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
            image={p.subtype} 
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
        (activeType === "furniture" && !["trap", "enemy", "corridor"].includes(overType)) ||
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