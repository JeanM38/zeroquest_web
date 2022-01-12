import React from 'react';
import { render } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import { container } from '../setupTests';

import { Draggable } from './Draggable';

it("isDraggableIsRenderedCorrectly", () => {
    act(() => {
        render(<Draggable />, container);
    });
    expect(container).not.toBeNull();
})