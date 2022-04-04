import React from 'react';
import { act } from "react-dom/test-utils";
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'

/* Utils */
import { container } from '../../setupTests';

/* Grid */
import grid from '../../data/grid';

/* Items */
import { Board } from './Board';
import { enemies } from '../../data/enemies';
import { furnitures } from '../../data/furnitures';
import { traps } from '../../data/traps';
import { doors } from '../../data/doors';
import { spawns } from '../../data/spawns';

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
    act(() => { render(<Board />) });
    expect(screen.queryAllByTestId("deck").length).toBe(grid.decks.length);
  })
  
  it("isDecksItemsAreAllRendered", () => {
    act(() => { render(<Board />) });
    expect(screen.queryAllByTestId("deckitem").length).toBe(grid.decks.length);
  })
  
  it("isDecksHaveCorrectTitles", () => {
    act(() => { render(<Board />) });
    grid.decks.map((deck, index) => { expect(screen.queryAllByTestId("deck")[index]).toHaveTextContent(deck.title) })
  })
})

/**
 * Test suites for DragAndDrop elements
 */
describe("DragAndDropElementsTest", () => {
  it("isDraggableItemsArAllRendered", () => {
    act(() => { render(<Board />) });
    expect(screen.queryAllByTestId("draggable").length).toBe(
      enemies.length + furnitures.length + traps.length + doors.length + spawns.length
    )
  })
  
  it("isDroppableItemsArAllRendered", () => {
    act(() => { render(<Board />) });
  
    // If DOM has a droppable item for each grid squares AND each grid.decks
    expect(screen.queryAllByTestId("droppable").length).toBe(grid.decks.length + grid.tiles.length);
  })
})