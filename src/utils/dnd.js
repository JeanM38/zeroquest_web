import { allEqual } from "./functions";

/**
 * 
 * @description Loop on all items to see if a parent corresponding to the hovered element
 * @param {Array} items 
 * @param {Object} event 
 * @returns {Boolean} isFilled, to know if user can dropped here or not
 */
export const checkIfAPieceHasAlreadyTheSameParent = (items, event) => {
    let isFilled = 0;

    const activeType = event.active.data.current; /* Type of dragged element */
    const overType = event.over === null ? null : event.over.data.current.type; /* Type of hovered element */
    const overIndex = event.over === null ? null : event.over.id; /* Index of hovered element */

    if (overType) {
        /* Foreach items of the game */
        items.map(p => {
            /* Exclude draggable item */
            if (event.active.id !== p.index && p.type !== "door") {
                /* Check if a item has a same parent */
                if (p.parent.includes(overIndex) || activeType === overType) {
                    ++isFilled;
                }
            }
            return isFilled;
        })
        return isFilled;
    }
}

/**
 * 
 * @param {Array} items 
 * @param {Object} item 
 * @param {Object} event 
 * @param {Array} grid 
 * @returns {Object}
 *  * {Boolean} **isAvailable**: if all tiles types are the same
 *  * {Array} **coveredArea**: index of all item parent's tiles
 */
export const getLargeObjectArea = (items, item, event, grid) =>  {
    let itemsInTheArea = []; /* All items already in coveredArea */
    let area = getAreaByRotationMode(item, event, grid);

    items.map(item => {
        /* Exclude the current active element, so he can move on index he already has on its own parent's indexes */
        if (item.index !== event.active.id) {
            for (const parent of item.parent) {
                if (area.coveredArea.includes(parent)) {
                    /* If a item has already a parent located in this covered area */
                    itemsInTheArea = [...itemsInTheArea, item];
                }
            }
        }
        return itemsInTheArea;
    })

    return {
        isAvailable: itemsInTheArea.length === 0 && allEqual(area.tilesTypesInTheArea),
        coveredArea: area.coveredArea
    };
}

/**
 * 
 * @param {Object} item 
 * @param {Object} event 
 * @param {Array} grid 
 * @returns {Object}
 *  * {Array} **coveredArea**: Tiles covered by the item
 *  * {Array} **tilesTypesInTheArea**: Tile's types covered by the item
 */
export const getAreaByRotationMode = (item, event, grid) => {
    let coveredArea = [];
    let tilesTypesInTheArea = [];

    if (item.properties.rotate === 0) {
        /* Horizontal mode */
        for (let h = 0; h < item.properties.height; ++h) {
            for (let w = 0; w < item.properties.width; ++w) {
                /* Set all tiles covered by the item */
                coveredArea = [...coveredArea, event.over.id + (26 * h) + w]
                /* Set all types will be covered by the item */
                tilesTypesInTheArea = [...tilesTypesInTheArea, grid[event.over.id + (26 * h) + w].type]
            }
        }
    } else {
        /* Vertical mode */
        for (let w = 0; w < item.properties.width; ++w) {
            for (let h = 0; h < item.properties.height; ++h) {
                coveredArea = [...coveredArea, event.over.id + (26 * w) + h]
                tilesTypesInTheArea = [...tilesTypesInTheArea, grid[event.over.id + (26 * w) + h].type]
            }
        }
    }

    return {
        coveredArea,
        tilesTypesInTheArea
    }
}

/**
 * 
 * @description Reset the rotate value of an item depends of the drop target
 * @param {Object} itemProps 
 * @param {Object} over 
 * @returns {number} 0 if item is dragged on the deck, else its last rotate value
 */
export const setRotateToZeroOnDeck = (itemProps, over) => {
    if (
        ["trap", "furniture", "door", "spawn"].includes(over.id) && 
        itemProps.rotate !== 0
    ) {
        return 0;
    } else {
        return itemProps.rotate;
    }
}

/**
 * 
 * @description depends on a type and the position of the hovered element, update the active item
 * @param {Array} items 
 * @param {Object} item 
 * @param {Object} over 
 * @param {Object} event 
 * @param {Array} grid 
 * @returns {Object} item with new/initial parent property
 */
export const setParentToItem = (items, item, over, event, grid) => {
    if (item.type === "enemy") {
        return {...item, parent: [over.id]}
    } else if (item.type === "door") {
        if (isADoorCanBeDropped(event, item.properties.rotate, grid, items)) {
            return {...item, parent: [over.id]}
        } else {
            return {...item, parent: [item.type]}
        }
    } else {
        if (
            /* Check if item is not overflow the grid on the horizontal way */
            (over.id < 468 && item.properties.rotate === 1) ||
            /* Check if item is not overflow the grid on the vertical way */
            ((over.id + 1) % 26 !== 0 && item.properties.rotate === 0)
        ) {
            if(!["trap", "furniture", "spawn"].includes(over.data.current.type)) {
                const objectArea = getLargeObjectArea(items, item, event, grid);

                if (objectArea.isAvailable) {
                    /* If there are no items in the area, and types of tiles are all equal, else return the last parent */
                    return {...item, parent: objectArea.coveredArea};
                } else {
                    /* If there items in the area, or types of tiles are not all equal, else return item to its deck */
                    item.properties.rotate = 0;
                    return {...item, parent: [item.type]};
                }
            } else {
                item.properties.rotate = 0;
                return {...item, parent: [item.type]}
            }
        } else {
            item.properties.rotate = 0;
            return {...item, parent: [item.type]}
        }
    }
}

/**
 * 
 * @description Used to knows if a specific item can be dropped, depends on its type, target position, etc...
 * @param {Object} event 
 * @param {Object} item 
 * @param {Boolean} isFilled 
 * @param {String} activeType 
 * @param {String} overType 
 * @returns {Boolean} if he's droppable or not
 */
export const isItemCanBeDropped = (event, item, isFilled, activeType, overType) => {
    if (
        activeType === "door" && 
        !["trap", "furniture", "enemy", "spawn"].includes(overType) && 
        event.active.id === item.index
    ) {
        /* Dragged item is a door */
        return true;
    } else if (
        (isFilled === 0 || activeType === overType) && /* Is not filled or drop target is its own deck */
        (event.active.id === item.index) && /* Select the item in the list */
        ((activeType === "enemy" && !["trap", "furniture", "spawn"].includes(overType)) || /* Enemy */
        (activeType === "trap" && !["enemy", "furniture", "spawn"].includes(overType)) || /* Trap */
        (activeType === "furniture" && !["corridor", "trap", "enemy", "spawn"].includes(overType)))  /* Furniture */
    ) {
        return true;
    } else if (
        ((item.subtype === "stairs" && !["corridor", "r13", "r14", "trap", "enemy", "furniture"].includes(overType)) ||
        (item.subtype === "indeSpawn" && !["corridor", "trap", "enemy", "furniture"].includes(overType))) &&
        event.active.id === item.index
    ) {
        return true;
    } else {
        return false;
    }
}

/**
 * 
 * @description Create a new instance of items depends on droppable and draggable elements and other conditions
 * @param {Object} event 
 * @param {Array} items 
 * @param {Array} grid 
 * @returns a new instance of the initial items with all modifications
 */
export const setNewItems = (event, items, grid) => {
    const {over} = event; /* Hovered element */
    const activeType = event.active.data.current; /* Type of dragged element */
    const overType = over === null ? null : over.data.current.type; /* Type of hovered element */

    /* If hovered element has a valid type */
    if (over) {
        const isFilled = checkIfAPieceHasAlreadyTheSameParent(items, event);

        /* Create a new instance from items */
        return items.map(item => {
            const itemProps = item.properties;

            if (isItemCanBeDropped(event, item, isFilled, activeType, overType)) {
                /* If item has props, set rotate depends on drop target */
                if (itemProps) {itemProps.rotate = setRotateToZeroOnDeck(itemProps, over)}
                    item = setParentToItem(items, item, over, event, grid)
                } else {
                    return item
                }
                return item
            }
        )
    } else {
        return items
    }
}

export const isADoorCanBeDropped = (event, rotate, grid, items) => {
    const destination = rotate === 0 ? grid[event.over.id + 26].type : grid[event.over.id - 1].type;
    const doorIsBetweenTwoDifferentRooms = destination !== event.over.data.current.type;
    const doorOnTheSameIndex = items.filter(item => item.type === "door" && item.parent[0] === event.active.id).length;

    if (doorOnTheSameIndex === 0 && doorIsBetweenTwoDifferentRooms) {
        return true
    } else {
        return false;
    }
}

export const getAllowedRooms = (items, grid) => {
    return items
        .filter(item => item.parent[0] !== item.type)
        .map(item => {return item.parent[0]})
        .map(item => grid[item].type);              
}