import React from 'react';
import { act } from "react-dom/test-utils";
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'

/* Utils */
import { container } from '../../setupTests';

/* Grid */
import { decks, grid } from '../../items/grid';

/* Items */
import { enemies } from '../../items/enemies';
import { furnitures } from '../../items/furnitures';
import { traps } from '../../items/traps';

import { Board } from './Board';
import { doors } from '../../items/doors';
import { spawns } from '../../items/spawns';

const BoardIdsToTest = [
  "chaptereditor",
  "deckswrapper",
  "gridwrapper",
  "grid",
  "resestboard"
]

/**
 * Test suites for Board
 */
describe("BoardRendering", () => {
  it("isBoardIsRenderedCorrectly", () => {
    act(() => { render(<Board />, container) });
    expect(container).not.toBeNull();
  })
  
  it("isBoardComponentsAreRenderedCorrectly", () => {
    act(() => { render(<Board />, container) });
    BoardIdsToTest.map(id => { expect(screen.queryAllByTestId(id).length).toBe(1) })
  })
})

/**
 * Test suites for Deck
 */
describe("DecksRendering", () => {
  it("isDecksAreAllRendered", () => {
    act(() => { render(<Board />, container) });
    expect(screen.queryAllByTestId("deck").length).toBe(decks.length);
  })
  
  it("isDecksItemsAreAllRendered", () => {
    act(() => { render(<Board />, container) });
    expect(screen.queryAllByTestId("deckitem").length).toBe(decks.length);
  })
  
  it("isDecksHaveCorrectTitles", () => {
    act(() => { render(<Board />, container) });
    decks.map((deck, index) => { expect(screen.queryAllByTestId("deck")[index]).toHaveTextContent(deck.title) })
  })
})

/**
 * Test suites for DragAndDrop elements
 */
describe("DragAndDropElementsTest", () => {
  it("isDraggableItemsArAllRendered", () => {
    act(() => { render(<Board />, container) });
    expect(screen.queryAllByTestId("draggable").length).toBe(
      enemies.length + furnitures.length + traps.length + doors.length + spawns.length
    )
  })
  
  it("isDroppableItemsArAllRendered", () => {
    act(() => { render(<Board />, container) });
  
    // If DOM has a droppable item for each grid squares AND each decks
    expect(screen.queryAllByTestId("droppable").length).toBe(decks.length + grid.length);
  })
})