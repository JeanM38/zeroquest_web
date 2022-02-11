import { allEqual, getRoomsFilled, getUnaccessibleSquares } from "./functions";

const itemTypes = [
    "trap", 
    "spawn", 
    "door", 
    "furniture", 
    "enemy"
];

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
        itemTypes.includes(over.id) && 
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
export const setParentToItem = (items, item, event, grid) => {
    const over = event.over;
    const iProps = item.properties;

    if (item.type === "enemy") {
        return {...item, parent: [over.id]}
    } else if (item.type === "door") {
        const doorDropped = isADoorCanBeDropped(event, iProps.rotate, grid, items);

        if (doorDropped.canDrop) {
            return {...item, parent: [over.id, doorDropped.destination]}
        } else {
            return {...item, parent: [item.type]}
        }
    } {
        if (
            /* Check if item is not overflow the grid on the horizontal way */
            (over.id < 468 && iProps.rotate === 1) ||
            /* Check if item is not overflow the grid on the vertical way */
            ((over.id + 1) % 26 !== 0 && iProps.rotate === 0)
        ) {
            if(!["trap", "furniture", "spawn"].includes(over.data.current.type)) {
                const objectArea = getLargeObjectArea(items, item, event, grid);

                if (objectArea.isAvailable) {
                    /* If there are no items in the area, and types of tiles are all equal, else return the last parent */
                    if (item.type === "spawn") {
                        return isASpawnCanBeDropped(item, items, over, objectArea.coveredArea);
                    } else {
                        return {...item, parent: objectArea.coveredArea};
                    }
                } else {
                    /* If there items in the area, or types of tiles are not all equal, else return item to its deck */
                    iProps.rotate = 0;
                    return {...item, parent: [item.type]};
                }
            } else {
                iProps.rotate = 0;
                return {...item, parent: [item.type]}
            }
        } else {
            iProps.rotate = 0;
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
export const isItemCanBeDropped = (event, item, isFilled, activeType, overType, allowedRooms) => {
    if (
        event.active.id === item.index && (
            (
                allowedRooms.includes(overType) &&
                activeType === "door" &&
                !itemTypes.filter(i => i !== activeType).includes(overType)
            ) ||
            (
                ((item.subtype === "stairs" && !["corridor", "r13", "r14", "trap", "enemy", "furniture", "door"].includes(overType)) ||
                (item.subtype === "indeSpawn" && !["corridor", "trap", "enemy", "furniture", "door"].includes(overType)))
            ) || 
            (
                /* Enemy/Trap/Furniture */
                allowedRooms.includes(overType) &&
                (isFilled === 0 || activeType === overType) && /* Is not filled or drop target is its own deck */
                ((
                    (activeType === "enemy" || activeType === "trap") && 
                    !itemTypes.filter(i => i !== activeType).includes(overType)
                ) || /* Enemy */
                (activeType === "furniture" && (!itemTypes.filter(i => i !== activeType).includes(overType)) && overType !== "corridor"))  /* Furniture */
            )
        )
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
export const setNewItems = (event, items, grid, allowedRooms) => {
    const {over} = event; /* Hovered element */
    const activeType = event.active.data.current; /* Type of dragged element */
    const overType = over === null ? null : over.data.current.type; /* Type of hovered element */

    /* If hovered element has a valid type */
    if (over) {
        const isFilled = checkIfAPieceHasAlreadyTheSameParent(items, event);

        /* Create a new instance from items */
        return items.map(item => {
            const itemProps = item.properties;

            if (isItemCanBeDropped(event, item, isFilled, activeType, overType, allowedRooms)) {
                /* If item has props, set rotate depends on drop target */
                if (itemProps) {itemProps.rotate = setRotateToZeroOnDeck(itemProps, over)}
                    item = setParentToItem(items, item, event, grid)
                } else {
                    return item
                }
                return item
            }
        )
    } else {
        return items;
    }
}

/**
 * 
 * @description Used to know if a door is places between two rooms and at a good rotate pos
 * @param {Object} event 
 * @param {number} rotate 
 * @param {Array} grid 
 * @param {Array} items 
 * @returns {Boolean} If a door can be dropped here
 */
export const isADoorCanBeDropped = (event, rotate, grid, items) => {
    if (event.over.id !== event.active.data.current) {
        let destinationType;
        let destinationIndex;

        switch(rotate) {
            case 0:
                destinationIndex = event.over.id + 26;
                destinationType = grid[event.over.id + 26].type;
                break;
            case 1:
                destinationIndex = event.over.id - 1;
                destinationType = grid[event.over.id - 1].type;
                break;
            case 2:
                destinationIndex = event.over.id - 26;
                destinationType = grid[event.over.id - 26].type;
                break;
            case 3:
                destinationIndex = event.over.id + 1;
                destinationType = grid[event.over.id + 1].type;
                break;
            default:
                break;
        }
        const doorIsBetweenTwoDifferentRooms = destinationType !== event.over.data.current.type;
        const doorOnTheSameIndex = items.filter(item => item.type === "door" && item.parent[0] === event.over.id).length;

        if (destinationIndex !== null && doorOnTheSameIndex === 0 && doorIsBetweenTwoDifferentRooms) {
            return {
                canDrop: true,
                destination: destinationIndex
            }
        } else {
            return {
                canDrop: false,
                destination: destinationIndex
            }
        }
    } else {
        return {
            canDrop: true,
            destination: ["door"]
        }
    }
}

/**
 * 
 * @description Get all rooms available, so user could see if he can drop an item here.
 * @param {Array} items 
 * @param {Array} grid 
 * @returns {Array} All rooms that are availables
 */
export const getAllowedRooms = (items, grid) => {
    const alwaysAllowedRooms = [    
        "enemy",
        "door",
        "trap",
        "furniture",
        "spawn"
    ];
    return [...alwaysAllowedRooms, ...new Set([...items
        .filter(item => item.type === "spawn" || item.type === "door")
        .filter(item => !item.parent.includes(item.type))
        .map(item => { return item.parent }).flat()
        .map(item => { return grid[item].type })])
    ]             
}

/**
 * 
 * @description Depends on the **subtype** of a spawn point and his dropping point, will tell if he can dropped here or not
 * @param {Object} item 
 * @param {Array} items 
 * @param {Object} over 
 * @returns {Boolean} If a spawn can be dropped here
 */
export const isASpawnCanBeDropped = (item, items, over, area) => {
    const spawns = items.filter(i => i.type === "spawn").filter(i => i.index !== item.index);
    let stairs = spawns.filter(i => i.subtype === "stairs").filter(i => i.index !== item.index);

    if (item.subtype === "stairs") {
        const indeSpawns = spawns.filter(i => i.parent[0] !== "spawn");
        return indeSpawns.length > 0 ? {...item, parent: [item.type]} : {...item, parent: area ? area : over.id};
    } else {
        stairs = stairs.filter(i => i.parent[0] !== "spawn");
        return stairs.length > 0 ? {...item, parent: [item.type]} : {...item, parent: area ? area : over.id};
    }
}

/**
 * 
 * @description Remove items when the room is no longer allowed (unaccessible by a door or a spawn point)
 * @param {Array} items 
 * @param {Array} allowedRooms 
 * @returns {Array} based on items
 */
export const removeItemsOnUnallowedRooms = (items, allowedRooms, grid) => {
    /* Get all types covered by the allowed rooms for example ["r1", "r12", ...] */
    const allowedTypes = [...new Set(grid.filter(square => allowedRooms.includes(square.type)))];

    /* Get all squares covered by these allowed types */
    const squares = allowedTypes.map(i => grid.indexOf(i));

    /* Get spawns and doors positions */
    const itemsPos = getItemsPos(items, grid);

    const doorRooms = getRoomsFilled(itemsPos.doors, grid, "doors");
    
    let unaccessibleRooms = getRoomsNotProvidedByDoors(doorRooms, itemsPos.spawns);
    unaccessibleRooms = getUnaccessibleSquares(unaccessibleRooms, grid);
    
    return items.map(i => {
        if (i.type !== "spawn") {
            if (!i.parent.some(parent => squares.includes(parent) && !unaccessibleRooms.some(room => i.parent.includes(room))) /* Heres come the unnaccessible room condition */ ) {
                return {...i, parent: [i.type]}
            } else {
                return i;
            }
        } else {
            return i;
        }
    })
}

/**
 * 
 * @description get a path between all doors 
 * @param {Array} doorRooms 
 * @param {Array} destinations 
 * @param {String} spawnPos 
 * @returns rooms where path is broken
 */
export const getRoomsNotProvidedByDoors = (doorRooms, spawnPos) => {
    let unaccessibleRooms = [];
    const doorDestinations = doorRooms.map(d => { return d[1] });

    doorRooms.map(door => {
        const tempDestinations = doorDestinations.map(d => {return d !== door[1] ? d : ""});
        if (!tempDestinations.includes(door[0]) && !spawnPos.some(s => door[0].includes(s))) {
            unaccessibleRooms = [...unaccessibleRooms, door];
        }
        return doorRooms;
    })

    return unaccessibleRooms;
}

/**
 * 
 * @description get all doors & spawns positions in all items
 * @param {Array} items 
 * @param {Array} grid 
 * @returns doors & spawns positions (parents)
 */
export const getItemsPos = (items, grid) => {
    /* Position of all spawn points */
    const spawnsPos = 
        items
            .filter(i => i.type === "spawn")
            .filter(i => i.parent[0] !== i.type)
            .map(spawn => { return grid[spawn.parent[0]].type });

    /* Position of all door points */
    const doorsPos = 
        items
            .filter(i => i.type === "door")
            .filter(i => i.parent[0] !== i.type)
            .map(i => { return i.parent });

    return {
        doors:  doorsPos,
        spawns: spawnsPos
    }
}