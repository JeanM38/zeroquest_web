/* Utils */
import { 
    checkIfAPieceHasAlreadyTheSameParent, 
    getAreaByRotationMode, 
    setRotateToZeroOnDeck,
    isItemCanBeDropped,
    getLargeObjectArea,
    setParentToItem,
    setNewItems,
    getAllowedRooms,
    isADoorCanBeDropped,
    isASpawnCanBeDropped,
    getRoomsNotProvidedByDoors,
    getItemsPos
} from "./dnd";

import items from '../items/itemstest';
import grid from "../items/grid";

import { spawns } from "../items/spawns";
import { doors } from "../items/doors";
import { enemies } from "../items/enemies";
import { traps } from "../items/traps";
import { furnitures } from "../items/furnitures";

const allItems = [...spawns, ...doors, ...enemies, ...traps, ...furnitures];

const eventTest = {
    active: {
        id: "orc1",
        data: {
            current: "enemy"
        }
        /* ... */
    },
    over: {
        id: 1,
        data: {
            current: {
                type: "r1"
            }
        }
        /* ... */
    }
    /* ... */
}
const eventTestOverNull = {
    active: {
        id: "trap1",
        data: {
            current: "corridor"
        }
        /* ... */
    },
    over: null
    /* ... */
}

let allowedRooms = ["enemy", "door", "trap", "furniture", "spawn"];
let itemsTest = items.items;
const tiles = grid.tiles;

/**
 * Test suites for checkIfAPieceHasAlreadyTheSameParent(items, event)
 */
describe("checkIfAPieceHasAlreadyTheSameParentFunc", () => {

    it("anItemIsAlreadyPresentOnTheOverItem", () => {
        /* On the items test table, an orc is already located in r1, so func will
           will be return 1 */
       const result = checkIfAPieceHasAlreadyTheSameParent(itemsTest, eventTest);
       expect(result).toBe(1);
       expect(typeof(result)).toBe("number");
    });
    it("overElementIsNull", () => {
        const resultUndefined = checkIfAPieceHasAlreadyTheSameParent(itemsTest, eventTestOverNull);
        expect(resultUndefined).toBeUndefined();
    })
})

/**
 * Test suites for getAreaByRotationMode(item, event, grid)
 */
describe("getAreaByRotationModeFunc", () => {
    const event = { over: { id: 0} };
    const item = {
        /* ... */
        properties: {
            width: 3,
            height: 2,
            rotate: 0
        }
    }
    const item2 = {
        /* ... */
        properties: {
            width: 3,
            height: 1,
            rotate: 0
        }
    }
    const item3 = {
        /* ... */
        properties: {
            width: 3,
            height: 1,
            rotate: 1
        }
    }
    /* Generate multiple results for differents drag events */
    const result = getAreaByRotationMode(item, event, tiles);
    const result2 = getAreaByRotationMode(item2, event, tiles);
    const result3 = getAreaByRotationMode(item3, event, tiles);

    /* Expected coveredArea results for differents items props */
    it("getAreaForDifferentsWidthHeighAndRotate", () => {
        expect(typeof(result)).toBe("object");
        expect(result.coveredArea).toStrictEqual([0, 1, 2, 26, 27, 28]);
        expect(result2.coveredArea).toStrictEqual([0, 1, 2]);
        expect(result3.coveredArea).toStrictEqual([0, 26, 52]);
    })

    /* Expected tilesTypesInTheArea results for differents items props */
    it("getDifferentTypeOfTilesInTheItemArea", () => {
        expect(result.tilesTypesInTheArea).toStrictEqual(["corridor", "corridor", "corridor", "corridor", "r1", "r1"]);
        expect(result2.tilesTypesInTheArea).toStrictEqual(["corridor", "corridor", "corridor"]);
        expect(result3.tilesTypesInTheArea).toStrictEqual(["corridor", "corridor", "corridor"]);
    })
})

/**
 * Test suites for setRotateToZeroOnDeck(itemProps, over)
 */
describe("setRotateToZeroOnDeckFunc", () => {
    const properties = { /* ... */ rotate: 1 };
    const overAllowed = { /* ... */ id: "trap" };
    const overNotAllowed = { /* ... */ id: "r1" };

    it("itemIsDroppedOnADeck", () => {
        const result = setRotateToZeroOnDeck(properties, overAllowed);
        expect(result).toBe(0);
        expect(typeof(result)).toBe("number");
    })
    it("itemIsDroppedOutOfDesk", () => {
        const result = setRotateToZeroOnDeck(properties, overNotAllowed);
        expect(result).toBe(1);
    })
})

/**
 * Test suites for isItemCanBeDropped(event, item, isFilled, activeType, overType)
 */
describe("isItemCanBeDroppedFunc", () => {
    const isFilled = 1;
    const isNotFilled = 0;
    const enemy = {/* ... */ index: "orc1"};
    const furniture = {/* ... */ index: "table1"};
    const trap = {/* ... */ index: "trap1"};

    const eventTestFurniture = {
        active: {
            id: "table1",
            data: {
                current: "furniture"
            }
            /* ... */
        },
        over: {
            id: 28,
            data: {
                current: {
                    type: "r28"
                }
            }
            /* ... */
        }
        /* ... */
    }
    const eventTestTrap = {
        active: {
            id: "trap1",
            data: {
                current: "trap"
            }
            /* ... */
        },
        over: {
            id: 28,
            data: {
                current: {
                    type: "r28"
                }
            }
            /* ... */
        }
        /* ... */
    }

    it("isItemCanBeDroppedTrue", () => {
        /* Can be dropped if tile is not filled || if dragged on its deck */
        expect(typeof(isItemCanBeDropped(eventTest, enemy, isNotFilled, "enemy", "r1", allowedRooms))).toBe("boolean");
        /* Push r1 and r27 to allowed rooms temporary */
        const tempAllowedRooms = [...allowedRooms, "r1", "r27"];

        expect(isItemCanBeDropped(eventTest, enemy, isNotFilled, "trap", "r1", tempAllowedRooms)).toBeTruthy();
        expect(isItemCanBeDropped(eventTestFurniture, furniture, isNotFilled, "furniture", "r27", tempAllowedRooms)).toBeTruthy();
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "enemy", tempAllowedRooms)).toBeTruthy();
        expect(isItemCanBeDropped(eventTestTrap, trap, isNotFilled, "trap", "r27", tempAllowedRooms)).toBeTruthy();
    });
    it("isItemCanBeDroppedFalse", () => {
        /* Cannot be dropped when tile is filled and not the deck || not in the good deck */
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "r1", allowedRooms)).toBeFalsy();
        expect(isItemCanBeDropped(eventTestFurniture, furniture, isFilled, "furniture", "r27", allowedRooms)).toBeFalsy();
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "furniture", allowedRooms)).toBeFalsy();
        expect(isItemCanBeDropped(eventTest, furniture, isFilled, "furniture", "corridor", allowedRooms)).toBeFalsy()
        expect(isItemCanBeDropped(eventTest, furniture, isNotFilled, "furniture", "corridor", allowedRooms)).toBeFalsy()
    });
})

/**
 * Test suites for getLargeObjectArea(items, item, event, grid)
 */
describe("getLargeObjectAreaFunc", () => {
    const event = {
        active: {id: "table1"},
        over: {id: 28}
    };

    it("returnAValidLargeObjectArea", () => {
        /* Replace the table to the closest tile */
        const largeObjectArea = getLargeObjectArea(itemsTest, itemsTest[3], event, tiles);
        expect(typeof(largeObjectArea.isAvailable)).toBe("boolean");
        expect(typeof(largeObjectArea.coveredArea)).toBe("object");
        expect(largeObjectArea.isAvailable).toBeTruthy();
        expect(largeObjectArea.coveredArea.length).toBe(itemsTest[3].properties.width * itemsTest[3].properties.height);
        expect(largeObjectArea.coveredArea).toStrictEqual([28, 29, 30, 54, 55, 56]);
    })

    it("returnAnUnvalidLargeObjectArea", () => {
        /* Replace the table in two differents rooms at the same time, an impossible move */
        event.over.id = 29
        const largeObjectArea2 = getLargeObjectArea(itemsTest, itemsTest[3], event, tiles);
        expect(largeObjectArea2.isAvailable).toBeFalsy();

        /* Places the table where an item is already located (f.e. itemsTest[4]) */
        event.over.id = 220;
        const largeObjectArea3 = getLargeObjectArea(itemsTest, itemsTest[3], event, tiles);
        expect(largeObjectArea3.isAvailable).toBeFalsy();
    })

})

/**
 * Test suites for setParentToItem(items, item, over, event, grid)
 */
describe("setParentToItemFunc", () => {
    const eventTest = {
        active: {
            data: {
                current: "enemy"
            }
            /* ... */
        },
        over: {
            id: 25,
            data: {
                current: {
                    type: "corridor"
                }
            }
            /* ... */
        }
        /* ... */
    }
    const eventDoor = {
        active: { id: "door1", data: { current: "door" } },
        over: { 
            id: 31,
            data: { current: { type: "r2" } }
        },
    }

    it("itemIsAnEnemy", () =>  {
        const result = setParentToItem(itemsTest, itemsTest[0], eventTest, tiles);
        expect(typeof(result)).toBe("object");
        expect(result.parent[0]).toBe(25);
    })
    it("itemIsADoorAndCanBeDropped", () => {
        const result = setParentToItem(itemsTest, itemsTest[9], eventDoor, tiles);
        expect(result.parent[0]).toBe(31);
    })
    it("itemIsADoorAndCantBeDropped", () => {
        const result = setParentToItem(itemsTest, itemsTest[10], eventDoor, tiles);
        expect(result.parent[0]).toBe("door");
    })
    it("itemIsNotAnEnemyAndAtTheBottomOfTheBoard", () => {
        /* Item is on vertical mode and at the extrem bottom of the board */
        eventTest.over.id = 468;
        itemsTest[3].properties.rotate = 1;
        const result = setParentToItem(itemsTest, itemsTest[3], eventTest, tiles);
        expect(result.parent[0]).toBe(itemsTest[3].type);
    })
    it("itemIsNotAnEnemyAndAtTheRightOfTheBoard", () => {
        /* Item is on horizontal mode and at the extrem right of the board */
        eventTest.over.id = 25;
        const result = setParentToItem(itemsTest, itemsTest[8], eventTest, tiles);
        expect(result.parent[0]).toBe(itemsTest[8].type);
    })
    it("itemIsNotAnEnemyAndAreaIsAvailable", () => {
        /* Item is on an available area */
        eventTest.over.id = 27;
        const result = setParentToItem(itemsTest, itemsTest[8], eventTest, tiles);
        expect(result.parent[0]).toBe(27);
    })
    it("itemIsNotAnEnemyAndAreaIsUnavailable", () => {
        /* Item is on an available area */
        eventTest.over.id = 29;
        const result = setParentToItem(itemsTest, itemsTest[8], eventTest, tiles);
        expect(result.parent[0]).toBe(itemsTest[8].type);
    })
    it("itemIsNotAnEnemyAndDraggedOnTheDeck", () => {
        /* Item is dragged on a desk */
        eventTest.over.id = "trap";
        itemsTest[8].properties.rotate = 1;
        const result = setParentToItem(itemsTest, itemsTest[8], eventTest, tiles);
        expect(result.properties.rotate).toBe(0);
        expect(result.parent[0]).toBe(itemsTest[8].type);
    })
    it("itemIsNotAnEnemyAndObjectAreaIsAvailable", () => {
        eventTest.active.data.current = "spawn";
        eventTest.over.id = 27;
        eventTest.over.data.current.type = "r1";
        const result = setParentToItem(itemsTest, itemsTest[11], eventTest, tiles);
        expect(result.parent).toStrictEqual([27, 28, 53, 54]);
    })
    it("itemIsNotAnEnemyAndDraggedOnAnUnvalidTile", () => {
        /* Insert a spawn in the test items */
        const spawnInsertion = {
            "index": "spawn3",
            "parent": [42],
            "type": "spawn",
            "subtype": "indeSpawn",
            "properties" : {
                "width": 1,
                "height": 1,
                "rotate": 1
            }
        }
        const itemsWithSpawnAdd = [...itemsTest, spawnInsertion];

        /* Create a new event */
        eventTest.active.data.current = "spawn";
        eventTest.over.id = "enemy";
        eventTest.over.data.current.type = "spawn";

        /* Expect to a spawn being dragged on his deck to reset its rotate value */
        const result = setParentToItem(itemsTest, itemsWithSpawnAdd[itemsWithSpawnAdd.length - 1], eventTest, tiles);
        expect(result.properties.rotate).toBe(0);
        expect(result.parent[0]).toBe("spawn");
    })
})

/**
 * Test suites for setNewItems(event, items, grid)
 */
describe("setNewItemsFunc", () => {
    it("overIsUnvalid", () => {
        /* If hovered element has an unvalid type */
        expect(setNewItems(eventTestOverNull, itemsTest, tiles, allowedRooms)).toBe(itemsTest);
    })
    it("overIsValid", () => {
        /* If hovered element has a valid type */
        expect(setNewItems(eventTest, itemsTest, tiles, allowedRooms)).not.toBe(itemsTest);
    })
})

/**
 * Test suites for getAllowedRooms(items, grid)
 */
describe("getAllowedRoomsFunc", () => {

    it("roomIsAllowedAtTheMomentAPieceIsInside", () => {
        const items = [
            {/* ... */ parent: [27], type: "trap"},
            {/* ... */ parent: [105], type: "enemy"},
            {/* ... */ parent: [192], type: "spawn"}
        ]
        expect(getAllowedRooms(items, tiles)).toStrictEqual([...allowedRooms, "r11"]);
    })
    it("roomIsAllowedAtTheMomentAPieceIsInsideExcludeDuplicates", () => {
        const items = [
            {/* ... */ parent: [27], type: "door"},
            {/* ... */ parent: [28], type: "door"}
        ]
        expect(getAllowedRooms(items, tiles)).toStrictEqual([...allowedRooms, "r1"]);
    })
})

/**
 * Test suites for isADoorCanBeDropped(event, rotate, grid, items)
 */
describe("isADoorCanBeDroppedFunc", () => {
    const event = {
        over: { 
            id: 31,
            data: { current: { type: "r2" } }
        },
        active: { id: "door1", data: { current: "r2" } }
    }
    
    it("canRenderADoorHere", () => {
        expect(isADoorCanBeDropped(event, 1, tiles, []).canDrop).toBeTruthy();
    })
    it("canRenderADoorHereRotate2", () => {
        expect(isADoorCanBeDropped(event, 2, tiles, []).canDrop).toBeTruthy();
    })
    it("cantRenderADoorHereRotate3", () => {
        expect(isADoorCanBeDropped(event, 3, tiles, []).canDrop).toBeFalsy();
    })
    it("cantRenderADoorHereCauseOfRotation", () => {
        expect(isADoorCanBeDropped(event, 0, tiles, []).canDrop).toBeFalsy();
    })
    it("cantRenderADoorHereCauseOfAnotherDoor", () => {
        expect(isADoorCanBeDropped(event, 0, tiles, [{/* ... */parent: [31], type: "door"}]).canDrop).toBeFalsy();
    })
    it("cantRenderADoorWithUnvalidRotateValue", () => {
        expect(isADoorCanBeDropped(event, 4, tiles, []).destination).toBeUndefined();
    })
    it("isOverIsEqualToActive", () => {
        const eventEqual = {...event};
        eventEqual.active.data.current = 31;
        expect(isADoorCanBeDropped(eventEqual, 0, grid, []).destination[0]).toBe("door");
    })
})

/**
 * Test suites for isASpawnCanBeDropped(item, items, over)
 */
describe("isASpawnCanBeDroppedFunc", () => {
    const indeSpawn = {subtype: "indeSpawn", parent: ["spawn"], type: "spawn"};
    const stairSpawn = {subtype: "stairs", parent: ["spawn"], type: "spawn"};
    const over = {id: 1};

    const itemsWithStairPlaced = allItems.map(i => {
        if (i.subtype === "stairs") {
            return {...i, parent: [28]};
        }
        return i
    })
    const itemsWithIndeSpawnPlaced = allItems.map(i => {
        if (i.subtype === "indeSpawn") {
            return {...i, parent: [28]}
        }
        return i
    })
    it("cantDropAnIndeSpawnIfStairIsPlaced", () => {
        expect(isASpawnCanBeDropped(indeSpawn, itemsWithStairPlaced, over)).toStrictEqual(indeSpawn);
    })
    it("canDropAnIndeSpawnIfStairIsntPlaced", () => {
        expect(isASpawnCanBeDropped(indeSpawn, allItems, over, [27, 28, 53, 54]))
            .toStrictEqual({...indeSpawn, parent: [27, 28, 53, 54]});
    })
    it("cantDropAStairIfIndeSpawnArePlaced", () => {
        expect(isASpawnCanBeDropped(stairSpawn, itemsWithIndeSpawnPlaced, over)).toStrictEqual(stairSpawn);
    })
    it("canDropAStairIfIndeSpawnArentPlaced", () => {
        expect(isASpawnCanBeDropped(stairSpawn, allItems, over, [27, 28, 53, 54]))
            .toStrictEqual({...stairSpawn, parent: [27, 28, 53, 54]});
    })
})

/**
 * Test suites for getItemsPos(items, grid)
 */
describe("getItemsPosFunc", () => {
    const spawnAssertion = {/* ... */ type: "spawn", parent: [32, 33]};
    const doorAssertion = {/* ... */ type: "door", parent: [42, 43]};

    it("isItemsPosReturnsEmptyArraysIfAllItemsAreInTheDeck", () => {
        expect(getItemsPos(itemsTest, tiles)).toStrictEqual({doors: [], spawns: []});
    })
    it("isSpawnPosIsRegisteredIfIsOnTheBoard", () => {
        const itemsPosWithASpawn = [...itemsTest, spawnAssertion];
        expect(getItemsPos(itemsPosWithASpawn, tiles)).toStrictEqual({doors: [], spawns: ["r2"]});
    })
    it("isDoorsPosIsRegisteredIfIsOnTheBoard", () => {
        const itemsPosWithADoor = [...itemsTest, doorAssertion];
        expect(getItemsPos(itemsPosWithADoor, tiles)).toStrictEqual({doors: [[42, 43]], spawns: []});
    })
    it("isDoorsPosAndSpawnPosIsRegisteredIfIsOnTheBoard", () => {
        const itemsPosWithADoorAndASpawn = [...itemsTest, doorAssertion, spawnAssertion];
        expect(getItemsPos(itemsPosWithADoorAndASpawn, tiles)).toStrictEqual({doors: [[42, 43]], spawns: ["r2"]});
    })
})

/**
 * Test suites for getRoomsNotProvidedByDoors(doorRooms, destinations, spawnPos)
 */
describe("getRoomsNotProvidedByDoorsFunc", () => {
    const doorRooms = [["r1", "r2"], ["r2", "r3"], ["r3", "r4"]];
    const doorRoomsCut = [["r1", "r2"], ["r3", "r4"], ["r5", "r6"]];
    
    it("isPathIsNotCut", () => {
        expect(getRoomsNotProvidedByDoors(doorRooms, ["r1"])).toStrictEqual([]);
    })
    it("isPathIsCut", () => {
        expect(getRoomsNotProvidedByDoors(doorRoomsCut, ["r1"])).toStrictEqual([["r3", "r4"], ["r5", "r6"]]);
    })
})