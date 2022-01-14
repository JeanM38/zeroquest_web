/* Utils */
import { 
    checkIfAPieceHasAlreadyTheSameParent, 
    getAreaByRotationMode, 
    setRotateToZeroOnDeck,
    isItemCanBeDropped
} from "./dnd";

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
        id: "r1",
        data: {
            current: {
                type: "r1"
            }
        }
        /* ... */
    }
    /* ... */
}

/**
 * Test suites for checkIfAPieceHasAlreadyTheSameParent(items, event)
 */
describe("checkIfAPieceHasAlreadyTheSameParentFunc", () => {
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

    it("anItemIsAlreadyPresentOnTheOverItem", () => {
        /* On the items test table, an orc is already located in r1, so func will
           will be return 1 */
       const result = checkIfAPieceHasAlreadyTheSameParent(itemsTest, eventTest);
       expect(result).toBe(1);
    });
    it("overElementIsNull", () => {
        const resultUndefined = checkIfAPieceHasAlreadyTheSameParent(itemsTest, eventTestOverNull);
        expect(resultUndefined).toBeUndefined();
    })
})

/**
 * Test suites for getLargeObjectArea
 */
// describe("getLargeObjectAreaFunc", () => {
//     it("objectCanBeDroppedHere", () => {

//     })
//     it("objectCantBeDroppedHere", () =>  {

//     })
// })

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
    const furniture = {/* ... */ index: "orc2"};

    it("isItemCanBeDroppedTrue", () => {
        /* Can be dropped if tile is not filled || if dragged on its deck */
        expect(isItemCanBeDropped(eventTest, enemy, isNotFilled, "enemy", "r1")).toBeTruthy();
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "enemy")).toBeTruthy();
    });
    it("isItemCanBeDroppedFalse", () => {
        /* Cannot be dropped when tile is filled and not the deck || not in the good deck */
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "r1")).toBeFalsy();
        expect(isItemCanBeDropped(eventTest, enemy, isFilled, "enemy", "furniture")).toBeFalsy();
        expect(isItemCanBeDropped(eventTest, furniture, isFilled, "furniture", "corridor")).toBeFalsy()
        expect(isItemCanBeDropped(eventTest, furniture, isNotFilled, "furniture", "corridor")).toBeFalsy()
    });
})