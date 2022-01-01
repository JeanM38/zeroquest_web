import { render } from '@testing-library/react';
import App from './App';

test('isKnightIsRenderedInApp', () => {
  /* 'player' testid corresponds to the Knight Component */
  const { getByTestId } = render(<App />);
  expect(getByTestId('player')).toBeInTheDocument();
})