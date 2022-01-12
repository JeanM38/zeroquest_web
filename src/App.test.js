import React from 'react';
import { act } from "react-dom/test-utils";
import { render } from '@testing-library/react';
import {screen} from '@testing-library/dom'

import { container } from './setupTests';
import { items } from './items/items';
import { decks } from './items/grid';

import { App } from './App';

const appIdsToTest = [
  "chaptereditor",
  "deckswrapper",
  "gridwrapper",
  "grid",
  "resestboard"
]

it("isAppIsRenderedCorrectly", () => {
  act(() => { render(<App />, container) });
  expect(container).not.toBeNull();
})

it("isAppComponentsAreRenderedCorrectly", () => {
  act(() => { render(<App />, container) })
  appIdsToTest.map(id => { expect(screen.queryAllByTestId(id).length).toBe(1) })
})

it("isDecksAreAllRendered", () => {
  act(() => { render(<App />, container) });

  expect(screen.queryAllByTestId("deck").length).toBe(decks.length);
})

it("isDecksItemsAreAllRendered", () => {
  act(() => { render(<App />, container) });
  expect(screen.queryAllByTestId("deckitem").length).toBe(decks.length);
})

it("isDecksHaveCorrectTitles", () => {
  act(() => { render(<App />, container) });
  decks.map((deck, index) => { expect(screen.queryAllByTestId("deck")[index]).toHaveTextContent(deck.title) })
})