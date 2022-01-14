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
        if ( ["trap", "furniture"].includes(p.type) && p.properties.rotate !== 0) {
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
      if (["furniture", "trap"].includes(p.type) && p.properties.rotate !== 0 && p.parent[0] === p.type) {
        p.properties.rotate = 0;
      }
      if(p.parent === id || p.parent[0] === id) {
        itemsToRender = [...itemsToRender, 
          <Draggable 
            key={p.index} 
            id={p.index} 
            data={p.type} 
            image={p.subtype} 
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