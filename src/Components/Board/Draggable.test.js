import React from 'react';
import { render } from '@testing-library/react';
import { act } from "react-dom/test-utils";

import { container } from '../../setupTests';

import { Draggable } from './Draggable';
import { enemies } from '../../items/enemies';

it("isDraggableIsRenderedCorrectly", () => {
    const p = enemies[0];
    act(() => {
        render(<Draggable 
            key={p.index} 
            id={p.index} 
            data={p.type} 
            image={p.subtype} 
            parent={p.parent}
            properties={p.properties ? p.properties : null} /* For furnitures & traps not 1*1 item */
            rotate={() => setRotate(p.index, items)} /* Pass rotate func to the draggable element, she will return rotate value's of it at the run time */
          />, container);
    });
    expect(container).not.toBeNull();
})