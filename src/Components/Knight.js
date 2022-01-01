// Native
import React from "react";

// Styled components
import styled from "styled-components";

// React dnd
import { useDrag } from 'react-dnd'
import { ItemTypes } from '../Constants'

const KnightWrapper = styled.span`
    color: red;
    font-size: 36px;
`;

export default function Knight() {
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.KNIGHT,
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    return <KnightWrapper data-testid="player" ref={drag} className="player">♘</KnightWrapper>
}