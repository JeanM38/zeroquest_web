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

// it("isRotateThePieceWhenPressR", () => {
//     const properties = {
//         width: 3,
//         height: 1,
//         rotate: 0
//     }
//     act(() => {
//         render(<Draggable 
//             key={"chest1"}
//             id={'chest1'}
//             data={'furniture'}
//             image={'wardrobe'}
//             properties={properties}
//             rotate={0}
//             cursor={"grab"}
//         />, container);
//     });
// })