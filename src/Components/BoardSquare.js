// Native
import React from 'react'

// Styled components
import styled from 'styled-components'

// React dnd
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../Constants'

const BoardSquareWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    width: 100%;
    height: 100%;
`

export default function BoardSquare({ x, y, children, game }) {
    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ItemTypes.KNIGHT,
        drop: () => game.moveKnight(x, y),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    }), [game]);

    return (
        <BoardSquareWrapper ref={drop} role="Space" data-testid={`${x},${y}`} id={`${x},${y}`}>
            {children}
        </BoardSquareWrapper>
    );
}