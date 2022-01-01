import { React, useMemo } from 'react';
import styled from 'styled-components';
import Board from './Components/Board';
import { Game } from './Classes/Game';

const AppWrapper = styled.div`
  text-align: center;
`;

function App() {
  const game = useMemo(() => new Game(), []);

  return (
    <AppWrapper className="App">
      <Board game={game}/>
    </AppWrapper>
  );
}

export default App;
