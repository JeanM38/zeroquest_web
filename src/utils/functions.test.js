import { allEqual, renderItem, resetBoard, setRotate } from "./functions";
import { act } from "react-dom/test-utils";
import React from 'react';
import {screen} from '@testing-library/dom'

/* Items */
import { enemies } from '../items/enemies';
import { furnitures } from '../items/furnitures';
import { traps } from '../items/traps';
import { decks, grid } from '../items/grid';

import { render } from '@testing-library/react';
import { container } from '../setupTests';

/**
 * Test suite for allEqual(arr) func
 */
describe("isAllEqualFuncTests", () => {
    it("isAllEqualFunctionWorksCorrectlyOnAllEqualArray", () => {
        const testArray = [1, 1, 1, 1, 1, 1, 1, 1, 1]
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
 * Test suite for resetBoard(items) func
 */
describe("resetBoardFunc", () => {
    const items = [
        {type: "furniture", index: "furniture1", parent: ["12", "13", "14"], properties: {rotate: 0}}, 
        {type: "trap", index: "trap1", parent: ["toChange"], properties: {rotate: 1}}, 
        {type: "enemy", index: "enemy1", parent: null, properties: {rotate: 1}}
    ]
    const testedItems = resetBoard(items);

    /* Test if all parent have been reset */
    expect(testedItems[0].parent).toStrictEqual(["furniture"]);
    expect(testedItems[1].parent).toStrictEqual(["trap"]);
    expect(testedItems[2].parent).toStrictEqual(["enemy"]);

    /* Test if all rotates have been set to 0 (excluded items which don't have this property)  */
    expect(testedItems[0].properties.rotate).toBe(0);
    expect(testedItems[1].properties.rotate).toBe(0);
    expect(testedItems[2].properties.rotate).not.toBe(0);
})

/**
 * Test suite for setRotate(key) func
 */
describe("setRotateFunc", () => {
    const items = [
        {type: "furniture", index: "furniture1", parent: ["12", "13", "14"], properties: {rotate: 0}}, 
        {type: "trap", index: "trap1", parent: ["toChange"], properties: {rotate: 1}}, 
        {type: "enemy", index: "enemy1", parent: null}
    ]
    const furnitureTest = setRotate("furniture1", items);
    expect(furnitureTest[0].properties.rotate).toBe(1);

    const trapTest = setRotate("trap1", items);
    expect(trapTest[1].properties.rotate).toBe(0);

    const enemyTest = setRotate("enemy1", items);
    expect(enemyTest).toStrictEqual(items);
})

/**
 * Test suite for renderPiece(key) func
 */
 describe("renderPieceFunc", () => {
    const gridItems = [...traps];
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
    act(() => { <div>{render(decks.map(deck => renderItem(deck.type, gridItemsWithRotateToOne)))}</div>, container });
    expect(screen.queryAllByTestId("draggable").length).toBe(gridItems.length);
    
    const draggableElements = screen.queryAllByTestId("draggable");
    draggableElements.map((e) => {
        expect(e).toHaveStyle("transform: rotate(0deg)")
    })
})