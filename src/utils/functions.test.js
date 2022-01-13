import { allEqual } from "./functions";

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