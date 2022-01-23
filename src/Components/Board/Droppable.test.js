import React from 'react';
import { render } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import { container } from '../../setupTests';

import { Droppable } from './Droppable';


it("isDroppableIsRenderedCorrectly", () => {
    act(() => {
      render(<Droppable />, container);
    });
    expect(container).not.toBeNull();
  })