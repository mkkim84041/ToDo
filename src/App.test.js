import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app title', () => {
  render(<App />);
  const title = screen.getByText(/할일 앱/i);
  expect(title).toBeInTheDocument();
});
