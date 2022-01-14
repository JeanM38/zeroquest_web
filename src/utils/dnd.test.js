/* Utils */
import { 
    checkIfAPieceHasAlreadyTheSameParent, getAreaByRotationMode, setRotateToZeroOnDeck
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
    const event = {
        over: { id: 0}
    };
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
    const properties = {
        /* ... */
        rotate: 1
    };
    const overAllowed = {
        /* ... */
        id: "trap"
    };
    const overNotAllowed = {
        /* ... */
        id: "r1"
    }

    it("itemIsDroppedOnADeck", () => {
        const result = setRotateToZeroOnDeck(properties, overAllowed);
        expect(result).toBe(0);
    })
    it("itemIsDroppedOutOfDesk", () => {
        const result = setRotateToZeroOnDeck(properties, overNotAllowed);
        expect(result).toBe(1);
    })
})