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