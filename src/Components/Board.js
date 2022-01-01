// Native
import React from 'react';
import { useState, useEffect } from 'react';

// Styled components
import styled from 'styled-components';

// React dnd
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Components
import BoardSquare from './BoardSquare'
import Knight from "./Knight";

const BoardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(29, 1fr);
    grid-template-rows: repeat(16, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`;

export default function Board({ game }) {
    const [[knightX, knightY], setKnightPos] = useState(game.knightPosition);
    useEffect(() => game.observe(setKnightPos));

    // const width = 26;
    const height = 19;

    const squares = [];

    const renderPiece = (x, y, [knightX, knightY]) => {
        if (x === knightX && y === knightY) {
          return <Knight />
        }
    }

    const renderSquare = (i) => {
        const x = i % height;
        const y = Math.floor(i / height);
      
        return(
            <div key={i}>
                <BoardSquare x={x} y={y} game={game}>{renderPiece(x, y, game.knightPosition)}</BoardSquare>
            </div>
        )
    }

    // const getEnemies = () => {
    //     const enemies = document.querySelector('.player');
    //     console.log(enemies);
    // }

    for (let i = 0; i < 464; i++) {
        squares.push(renderSquare(i))
    }

    return(
        <DndProvider backend={HTML5Backend}>
            <BoardWrapper knightPosition={game.knightPosition}>
                { squares }
                {/* <button onClick={() => getEnemies()}>Click</button> */}
            </BoardWrapper>
        </DndProvider>
    )
}