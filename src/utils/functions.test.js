import React from 'react';
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/dom'
import { render } from '@testing-library/react';

/* Utils */
import { 
    allEqual, 
    getRoomsFilled, 
    getUnaccessibleSquares, 
    handleDragOver, 
    renderItem, 
    resetBoard, 
    setRotate
} from "./functions";

/* Items */
import enemiesArray from '../items/enemies';
import furnituresArray from '../items/furnitures';
import trapsArray from '../items/traps';
import grid from '../items/grid';


/**
 * Test suites for allEqual(arr) func
 */
describe("isAllEqualFuncTests", () => {
    it("isAllEqualFunctionWorksCorrectlyOnAllEqualArray", () => {
        const testArray = [1, 1, 1, 1, 1, 1, 1, 1, 1];
        expect(typeof(testArray)).toBe("object");
        expect(allEqual(testArray)).toBeTruthy();
    })
    
    it("isAllEqualFunctionWorksCorrectlyOnNonAllEqualArray", () => {
        const testArray = [1, 2, 1, 1, 1, 1, 1, 1, 1]
        expect(allEqual(testArray)).toBeFalsy();
    })
    
    it("isAllEqualFunctionWorksCorrectlyWithTypesChanging", () => {
        const testArray = [1, "1", 1, 1, 1, 1, 1, 1, 1]
        expect(allEqual(testArray)).toBeFalsy();
    })
})

/**
 * Test suites for resetBoard(items) func
 */
describe("resetBoardFunc", () => {
    const items = [
        {type: "furniture", index: "furniture1", parent: ["12", "13", "14"], properties: {rotate: 0}}, 
        {type: "trap", index: "trap1", parent: ["toChange"], properties: {rotate: 1}}, 
        {type: "enemy", index: "enemy1", parent: null, properties: {rotate: 1}}
        /* ... */
    ]
    const testedItems = resetBoard(items);

    /* Test if all parent have been reset */
    it("resetItemToHisNativeParentPosition", () => {
        expect(typeof(testedItems)).toBe("object");
        expect(testedItems[0].parent).toStrictEqual(["furniture"]);
        expect(testedItems[1].parent).toStrictEqual(["trap"]);
        expect(testedItems[2].parent).toStrictEqual(["enemy"]);
    })

    /* Test if all rotates have been set to 0 (excluded items which don't have this property)  */
    it("resetRotatePropertiesOnEachItem", () => {
        expect(testedItems[0].properties.rotate).toBe(0);
        expect(testedItems[1].properties.rotate).toBe(0);
        expect(testedItems[2].properties.rotate).not.toBe(0);
    })
})

/**
 * Test suites for setRotate(key) func
 */
describe("setRotateFunc", () => {
    const items = [
        {type: "furniture", index: "furniture1", parent: ["12", "13", "14"], properties: {rotate: 0}}, 
        {type: "trap", index: "trap1", parent: ["toChange"], properties: {rotate: 1}}, 
        {type: "enemy", index: "enemy1", parent: null}
        /* ... */
    ]
    const doorMinRotate = [{type: "door", index: "door1", parent: ["12", "13"], properties: {rotate: 0}}];
    const doorMaxRotate = [{type: "door", index: "door2", parent: ["12", "13"], properties: {rotate: 3}}];

    it("isAFurnitureRotateGoodWhenItsOnInitialPos", () => {        
        const furnitureTest = setRotate("furniture1", items);
        expect(furnitureTest[0].properties.rotate).toBe(1);
    })

    it("isATrapRotateGoodWhenItsOnInitialPos", () => {
        const trapTest = setRotate("trap1", items);
        expect(trapTest[1].properties.rotate).toBe(0);
    })

    it("isAnEnemyRotateGoodWhenItsOnInitialPos", () => {
        const enemyTest = setRotate("enemy1", items);
        expect(enemyTest).toStrictEqual(items);
    })

    it("isADoorRotateGoodWhenItsOnInitialPos", () => {
        const doorMinTest = setRotate("door1", doorMinRotate);
        expect(doorMinTest[0].properties.rotate).toBe(1);
    })

    it("isADoorRotateToZeroWhenItsOnMaxPos", () => {
        const doorMaxTest = setRotate("door2", doorMaxRotate);
        expect(doorMaxTest[0].properties.rotate).toBe(0);
    })
})

/**
 * Test suites for renderPiece(key) func
 */
 describe("renderPieceFunc", () => {
    const gridItems = [...enemiesArray.enemies, ...furnituresArray.furnitures, ...trapsArray.traps];

    /* Set a rotate 1 to all items */
    const gridItemsWithRotateToOne = gridItems.map(item => {
        if (item.properties) {
            item.properties.rotate = 1;
            return item
        } else {
            return item
        }
    })
    
    /* Check if render method reset all rotate on the deck */
    act(() => { <div>{render(grid.decks.map(deck => renderItem(deck.type, gridItemsWithRotateToOne)))}</div> });
    const draggableElements = screen.queryAllByTestId("draggable");

    it("draggableElementsAreAllRendered", () => {
        expect(draggableElements.length).toBe(gridItems.length);
    })

    it("allDraggableElementsHaveRotateProToZero", () => {
        draggableElements.map((e) => {
            expect(e.style.transform).toEqual("rotate(0deg)")
        })
    })
})

/**
 * Test suites for getRoomsFilled(items, grid, type)
 */
describe("getRoomsFilled", () => {
    let parents = [[292, 293]];

    it("isASinleDoorReturnCorrectFilledRooms", () => {
        expect(getRoomsFilled(parents, grid.tiles, "doors")).toStrictEqual([["r13", "r14"]]);
    })

    it("isMultipleDoorsReturnCorrectFilledRooms", () => {
        parents.push([318, 344]);
        expect(getRoomsFilled(parents, grid.tiles, "doors")).toStrictEqual([["r13", "r14"], ["r13", "r18"]])
    })

    it("isASingleSpawnReturnCorrectFilledRooms", () => {
        let parentSpawn = [{/* ... */ parent: [292]}];
        expect(getRoomsFilled(parentSpawn, grid.tiles, "spawns")).toStrictEqual(["r13"]);
    })
})

/**
 * Test suites for handleDragOver(event)
 */
describe("handleDragOverFunc", () => {
    const eventTestNull = {};
    let event = {
        active: {
            data: {
                current: "enemy"
            }
            /* ... */
        },
        over: {
            data: {
                current: {
                    type: "r1"
                }
            }
            /* ... */
        }
    }

    it("isAnEnemyDraggedOnARoomTileIsReturnGreen", () => {
        expect(handleDragOver(event)).toBe("green");
    })

    it("isATrapDraggedOnACorridorTileIsReturnGreen", () => {
        const trapEvent = {...event};
        trapEvent.active.data.current = "trap";
        trapEvent.over.data.current.type = "corridor";
        expect(handleDragOver(trapEvent)).toBe("green");
    })
    
    it("isAFurnitureDraggedOnACorridorTileIsReturnRed", () => {
        const furnitureEvent = {...event};
        furnitureEvent.active.data.current = "furniture";
        furnitureEvent.over.data.current.type = "corridor";
        expect(handleDragOver(furnitureEvent)).toBe("red");
    })
    
    it("isOverIsNullReturnsNothing", () => {
        expect(handleDragOver(eventTestNull)).toBeUndefined();
    })
})

/**
 * Test suites for getUnaccessibleSquares(types, grid)
 */
describe("getUnaccessibleSquaresFunc", () => {
    it("isReturnAllSquaresOfARoom", () => {
        const types = [["r13"]];
        expect(getUnaccessibleSquares(types, grid.tiles)).toStrictEqual([265, 266, 291, 292, 317, 318]);
    })

    it("isReturnAnEmptyArrayOnUnexistingTypes", () => {
        const types = [["r100"]];
        expect(getUnaccessibleSquares(types, grid.tiles)).toStrictEqual([]);
    })
})