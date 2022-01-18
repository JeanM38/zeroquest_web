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
    isADoorCanBeDropped
} from "./dnd";

import { enemies } from "../items/enemies";
import { furnitures } from "../items/furnitures";
import { traps } from "../items/traps";
import { doors } from "../items/doors";

import { itemsTest } from './dnditems';
import { grid } from "../items/grid";

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
    const result = getAreaByRotationMode(item, event, grid);
    const result2 = getAreaByRotationMode(item2, event, grid);
    const result3 = getAreaByRotationMode(item3, event, grid);

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
    const eventTesTrap = {
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
        expect(typeof(isItemCanBeDropped(eventTest, enemy, isNotFilled, "enemy", "r1"))).toBe("boolean");
        expect(isItemCanBeDropped(eventTest, enemy, isNotFilled, "enemy", "r1")).toBeTruthy();
        expect(isItemCanBeDropped(eventTestFurniture, furniture, isNotFilled, "furniture", "r27")).toBeTruthy();
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "enemy")).toBeTruthy();
        expect(isItemCanBeDropped(eventTesTrap, trap, isNotFilled, "trap", "r27")).toBeTruthy();
    });
    it("isItemCanBeDroppedFalse", () => {
        /* Cannot be dropped when tile is filled and not the deck || not in the good deck */
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "r1")).toBeFalsy();
        expect(isItemCanBeDropped(eventTestFurniture, furniture, isFilled, "furniture", "r27")).toBeFalsy();
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "furniture")).toBeFalsy();
        expect(isItemCanBeDropped(eventTest, furniture, isFilled, "furniture", "corridor")).toBeFalsy()
        expect(isItemCanBeDropped(eventTest, furniture, isNotFilled, "furniture", "corridor")).toBeFalsy()
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
        const largeObjectArea = getLargeObjectArea(itemsTest, itemsTest[3], event, grid);
        expect(typeof(largeObjectArea.isAvailable)).toBe("boolean");
        expect(typeof(largeObjectArea.coveredArea)).toBe("object");
        expect(largeObjectArea.isAvailable).toBeTruthy();
        expect(largeObjectArea.coveredArea.length).toBe(itemsTest[3].properties.width * itemsTest[3].properties.height);
        expect(largeObjectArea.coveredArea).toStrictEqual([28, 29, 30, 54, 55, 56]);
    })

    it("returnAnUnvalidLargeObjectArea", () => {
        /* Replace the table in two differents rooms at the same time, an impossible move */
        event.over.id = 29
        const largeObjectArea2 = getLargeObjectArea(itemsTest, itemsTest[3], event, grid);
        expect(largeObjectArea2.isAvailable).toBeFalsy();

        /* Places the table where an item is already located (f.e. itemsTest[4]) */
        event.over.id = 220;
        const largeObjectArea3 = getLargeObjectArea(itemsTest, itemsTest[3], event, grid);
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

    it("itemIsAnEnemy", () =>  {
        const result = setParentToItem(itemsTest, itemsTest[0], eventTest.over, eventTest, grid);
        expect(typeof(result)).toBe("object");
        expect(result.parent[0]).toBe(25);
    })

    it("itemIsNotAnEnemyAndAtTheBottomOfTheBoard", () => {
        /* Item is on vertical mode and at the extrem bottom of the board */
        eventTest.over.id = 468;
        itemsTest[3].properties.rotate = 1;
        const result = setParentToItem(itemsTest, itemsTest[3], eventTest.over, eventTest, grid);
        expect(result.parent[0]).toBe(itemsTest[3].type);
    })
    it("itemIsNotAnEnemyAndAtTheRightOfTheBoard", () => {
        /* Item is on horizontal mode and at the extrem right of the board */
        eventTest.over.id = 25;
        const result = setParentToItem(itemsTest, itemsTest[8], eventTest.over, eventTest, grid);
        expect(result.parent[0]).toBe(itemsTest[8].type);
    })
    it("itemIsNotAnEnemyAndAreaIsAvailable", () => {
        /* Item is on an available area */
        eventTest.over.id = 27;
        const result = setParentToItem(itemsTest, itemsTest[8], eventTest.over, eventTest, grid);
        expect(result.parent[0]).toBe(27);
    })
    it("itemIsNotAnEnemyAndAreaIsUnavailable", () => {
        /* Item is on an available area */
        eventTest.over.id = 29;
        const result = setParentToItem(itemsTest, itemsTest[8], eventTest.over, eventTest, grid);
        expect(result.parent[0]).toBe(itemsTest[8].type);
    })
    it("itemIsNotAnEnemyAndDraggedOnTheDeck", () => {
        /* Item is dragged on a desk */
        eventTest.over.id = "trap";
        itemsTest[8].properties.rotate = 1;
        const result = setParentToItem(itemsTest, itemsTest[8], eventTest.over, eventTest, grid);
        expect(result.properties.rotate).toBe(0);
        expect(result.parent[0]).toBe(itemsTest[8].type);
    })
})

/**
 * Test suites for setNewItems(event, items, grid)
 */
describe("setNewItemsFunc", () => {
    it("overIsUnvalid", () => {
        /* If hovered element has an unvalid type */
        expect(setNewItems(eventTestOverNull, itemsTest, grid)).toBe(itemsTest);
    })
    it("overIsValid", () => {
        /* If hovered element has a valid type */
        expect(setNewItems(eventTest, itemsTest, grid)).not.toBe(itemsTest);
    })
})

/**
 * Test suites for getAllowedRooms(items, grid)
 */
describe("getAllowedRoomsFunc", () => {
    it("noRoomIsAllowedByDefault", () => {
        /* By default, all pieces are on the deck, so no room is filled */
        const standardItems = [...enemies, ...furnitures, ...traps, ...doors];
        expect(getAllowedRooms(standardItems, grid).length).toBe(0);
    })
    it("roomIsAllowedAtTheMomentAPieceIsInside", () => {
        const items = [
            {/* ... */ parent: [27], type: "trap"},
            {/* ... */ parent: [105], type: "enemy"}
        ]
        expect(getAllowedRooms(items, grid)).toStrictEqual(["r1", "r7"]);
    })
    it("roomIsAllowedAtTheMomentAPieceIsInsideExcludeDuplicates", () => {
        const items = [
            {/* ... */ parent: [27], type: "trap"},
            {/* ... */ parent: [28], type: "enemy"}
        ]
        expect(getAllowedRooms(items, grid)).toStrictEqual(["r1"]);
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
        active: { id: "door1"}
    }
    
    it("canRenderADoorHere", () => {
        expect(isADoorCanBeDropped(event, 1, grid, [])).toBeTruthy();
    })
    it("cantRenderADoorHereCauseOfRotation", () => {
        expect(isADoorCanBeDropped(event, 0, grid, [])).toBeFalsy();
    })
    it("cantRenderADoorHereCauseOfAnotherDoor", () => {
        expect(isADoorCanBeDropped(event, 0, grid, [{/* ... */parent: [31], type: "door"}])).toBeFalsy();
    })
})