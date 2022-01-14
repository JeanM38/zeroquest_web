import React from 'react';

/* Utils */
import { 
    checkIfAPieceHasAlreadyTheSameParent
} from "./dnd";
import { itemsTest } from './dnditems';

const eventTest = {
    active: {
        id: "orc1",
        data: {
            current: "enemy"
        }
    },
    over: {
        id: "r1",
        data: {
            current: {
                type: "r1"
            }
        }
    }
}
const eventTestOverNull = {
    active: {
        id: "trap1",
        data: {
            current: "corridor"
        }
    },
    over: null
}

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