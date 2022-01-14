import { allEqual, resetBoard } from "./functions";

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
        {type: "furniture", parent: ["12", "13", "14"], properties: {rotate: 0}}, 
        {type: "furniture", parent: ["toChange"], properties: {rotate: 1}}, 
        {type: "enemy", parent: null, properties: {rotate: 1}}
    ]
    const testedItems = resetBoard(items);

    /* Test if all parent have been reset */
    expect(testedItems[0].parent).toStrictEqual(["furniture"]);
    expect(testedItems[1].parent).toStrictEqual(["furniture"]);
    expect(testedItems[2].parent).toStrictEqual(["enemy"]);

    /* Test if all rotates have been set to 0 (excluded items which don't have this property)  */
    expect(testedItems[0].properties.rotate).toBe(0);
    expect(testedItems[1].properties.rotate).toBe(0);
    expect(testedItems[2].properties.rotate).not.toBe(0);
})